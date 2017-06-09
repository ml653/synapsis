import extractLayers from "./extract_layers";
const cnnutil = require("./cnnutil");
const convnetjs = require("convnetjs");

class MNISTNeuralNetwork {
  constructor(post, importUtil, printCallback, failCallback) {
    this.post = post.bind(this);
    this.importUtil = importUtil
    this.step_num = 0;
    this.isRunning = false;
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

    this.run = this.run.bind(this);
    this.load = this.load.bind(this);
    this.emit = this.emit.bind(this);
    this.step = this.step.bind(this);
    this.test_predict = this.test_predict.bind(this);

    if (printCallback)
      this.printCallback = printCallback.bind(this);
    if (failCallback)
      this.failCallback = failCallback.bind(this);

    this.load();
  }

  load() {
    // this.importUtil.load_data_batch(0); // async load train set batch 0
    // this.importUtil.load_data_batch(this.test_batch); // async load test set
  }

  run() {
    this.isRunning = true;
    let intervalCB;
    if (this.failCallback) {
      intervalCB = () => {
        try {
          this.step();
        } catch (e) {
          this.failCallback(e);
        }
      };
    } else {
      intervalCB = this.step;
    }
    setInterval(intervalCB, 100);
  }

  emit() {
    this.post({
      type: 'STATS',
      message: {
        valAcc: this.valAccWindow.get_average(),
        trainAcc: this.trainAccWindow.get_average(),
        examples: this.step_num
      }
    });
  }

  updateView(net) {
    this.post({
      type: 'NET',
      message: extractLayers(net)
    });
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
