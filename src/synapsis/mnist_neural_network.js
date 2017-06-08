import ImportUtil from "./import_util";
import extractLayers from "./extract_layers";
const cnnutil = require("./cnnutil");
const convnetjs = require("convnetjs");

const defaultOptions = {
  num_batches: 21,
  test_batch: 19,
  num_samples_per_batch: 3000,
  image_dimension: 28,
  image_channels: 1,
  use_validation_data: 1,
  random_flip: false,
  random_position: false
};

class MNISTNeuralNetwork {
  constructor(updateStats, options = defaultOptions) {
    this.updateStats = updateStats.bind(this);
    this.isRunning = false;

    this.num_batches = options.num_batches;
    this.test_batch = options.test_batch;
    this.num_samples_per_batch = options.num_samples_per_batch;
    this.image_dimension = options.image_dimension;
    this.image_channels = options.image_channels;
    this.use_validation_data = options.use_validation_data;
    this.random_flip = options.random_flip;
    this.random_position = options.random_flip;
    this.step_num = 0;

    this.data_img_elts = new Array(this.num_batches);
    this.img_data = new Array(this.num_batches);
    this.loaded = new Array(this.num_batches).map(_ => false);
    this.loaded_train_batches = [];

    this.xLossWindow = new cnnutil.Window(100);
    this.wLossWindow = new cnnutil.Window(100);
    this.trainAccWindow = new cnnutil.Window(100);
    this.valAccWindow = new cnnutil.Window(100);

    // Set up layers and trainer
    const layer_defs = [];
    layer_defs.push({ type: "input", out_sx: 24, out_sy: 24, out_depth: 1 });
    layer_defs.push({
      type: "conv",
      sx: 5,
      filters: 8,
      stride: 1,
      pad: 2,
      activation: "relu"
    });
    layer_defs.push({ type: "pool", sx: 2, stride: 2 });
    layer_defs.push({
      type: "conv",
      sx: 5,
      filters: 16,
      stride: 1,
      pad: 2,
      activation: "relu"
    });
    layer_defs.push({ type: "pool", sx: 3, stride: 3 });
    layer_defs.push({ type: "softmax", num_classes: 10 });

    this.net = new convnetjs.Net();
    this.net.makeLayers(layer_defs);
    this.trainer = new convnetjs.SGDTrainer(this.net, {
      method: "adadelta",
      batch_size: 20,
      l2_decay: 0.001
    });

    this.importUtil = new ImportUtil(
      this.num_batches,
      this.test_batch,
      this.num_samples_per_batch,
      this.use_validation_data,
      this.img_data,
      this.image_channels,
      this.image_dimension,
      this.random_flip,
      this.random_position,
      this.loaded,
      this.loaded_train_batches,
      this.data_img_elts
    );

    this.run = this.run.bind(this);
    this.load = this.load.bind(this);
    this.emit = this.emit.bind(this);
    this.step = this.step.bind(this);
    this.test_predict = this.test_predict.bind(this);

    this.load();
  }

  load() {
    this.importUtil.load_data_batch(0); // async load train set batch 0
    this.importUtil.load_data_batch(this.test_batch); // async load test set
  }

  run() {
    if (this.loaded[0] && this.loaded[this.test_batch] && this.isRunning) {
      setInterval(this.step, 25);
    } else {
      setTimeout(this.run, 200);
    }
  }

  emit() {
    this.updateStats({
      valAcc: this.valAccWindow.get_average(),
      trainAcc: this.trainAccWindow.get_average(),
      examples: this.step_num
    });
    // this.renderStats({
    //   valAcc: this.valAccWindow.get_average(),
    //   trainAcc: this.trainAccWindow.get_average(),
    //   examples: this.step_num,
    // });
  }

  updateView(net) {
    // console.log(extractLayers(net));
    // extractLayers(net);
  }

  step() {
    const sample = this.importUtil.sample_training_instance();
    var x = sample.x;
    var y = sample.label;

    if (sample.isval) {
      // use x to build our estimate of validation error
      this.net.forward(x);
      let yhat = this.net.getPrediction();
      var val_acc = yhat === y ? 1.0 : 0.0;
      this.valAccWindow.add(val_acc);
      return; // get out
    }

    // train on it with network
    var stats = this.trainer.train(x, y);
    var lossx = stats.cost_loss;
    var lossw = stats.l2_decay_loss;

    // keep track of stats such as the average training error and loss
    let yhat = this.net.getPrediction();
    var train_acc = yhat === y ? 1.0 : 0.0;
    this.xLossWindow.add(lossx);
    this.wLossWindow.add(lossw);
    this.trainAccWindow.add(train_acc);

    // visualize activations
    if (this.step_num % 100 === 0) {
      // console.log(this.net);
      this.updateView(this.net);
    }

    // run prediction on test set
    if (
      (this.step_num % 100 === 0 && this.step_num > 0) ||
      this.step_num === 100
    ) {
      this.test_predict();
    }
    this.step_num++;
    this.emit();
  }

  // evaluate current network on test set
  test_predict() {
    const num_classes = this.net.layers[this.net.layers.length - 1].out_depth;

    // grab a random test image
    for (let num = 0; num < 4; num++) {
      const sample = this.importUtil.sample_test_instance();
      const y = sample.label; // ground truth label

      // forward prop it through the network
      const aavg = new convnetjs.Vol(1, 1, num_classes, 0.0);

      // ensures we always have a list, regardless if above returns single item or list
      const xs = [].concat(sample.x);
      const n = xs.length;
      for (let i = 0; i < n; i++) {
        const a = this.net.forward(xs[i]);
        aavg.addFrom(a);
      }
      const preds = [];
      for (let k = 0; k < aavg.w.length; k++) {
        preds.push({ k: k, p: aavg.w[k] });
      }
      preds.sort(function(a, b) {
        return a.p < b.p ? 1 : -1;
      });

      const correct = preds[0].k === y;
      if (correct) {
        // global_total_correct++;
      }
      // global_total_count++;
    }
  }
}

// const nn = new MNISTNeuralNetwork();
// nn.run();

export default MNISTNeuralNetwork;
