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
    this.emit = this.emit.bind(this);
    this.step = this.step.bind(this);
    this.test_predict = this.test_predict.bind(this);

    if (printCallback)
      this.printCallback = printCallback.bind(this);
    if (failCallback)
      this.failCallback = failCallback.bind(this);
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
    this.interval = setInterval(intervalCB, 50);
  }

  pause() {
    clearInterval(this.interval);
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

  updateView(net, predictions, label) {
    this.post({
      type: 'NET',
      message: {
        net: net,
        predictions: predictions,
        label
      }
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

    // run prediction on test set
    if (this.step_num % 100 === 0) {
      this.test_predict();
    }
    this.step_num++;
    this.emit();
  }

  // evaluate current network on test set
  test_predict() {
    const num_classes = this.net.layers[this.net.layers.length - 1].out_depth;
    const sample = this.importUtil.sample_training_instance();
    const label = sample.label

    // // forward prop it through the network
    let predictions = new convnetjs.Vol(1, 1, num_classes, 0.0);

    // // ensures we always have a list, regardless if above returns single item or list
    const xs = [].concat(sample.x);
    const n = xs.length;
    for (let i = 0; i < n; i++) {
      const a = this.net.forward(xs[i]);
      predictions.addFrom(a);
    }

    const preds = [];
    for (let k = 0; k < predictions.w.length; k++) {
      preds.push({ k: k, p: predictions.w[k] });
    }
    // preds.sort(function(a, b) {
    //   return a.p < b.p ? 1 : -1;
    // });
    this.updateView(this.net, preds, label)
  }
}

export default MNISTNeuralNetwork;
