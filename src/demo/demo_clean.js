console.log('loading demo.js :)')
import ImportUtil from './import_util'
const convnetjs = require('convnetjs')
const labels = require('./mnist/mnist_labels')
const cnnutil = require('./cnnutil')
const num_batches = 21 // 20 training batches, 1 test
const test_batch = 19
const num_samples_per_batch = 3000
const image_dimension = 28
const image_channels = 1
const use_validation_data = true
const random_flip = false
const random_position = false
let step_num = 0;
// const util = require('./util')
// const maxmin = cnnutil.maxmin;
// const f2t = util.f2t;

const xLossWindow = new cnnutil.Window(100);
const wLossWindow = new cnnutil.Window(100);
const trainAccWindow = new cnnutil.Window(100);
const valAccWindow = new cnnutil.Window(100);
// const lossGraph = new cnnvis.Graph();
// const testAccWindow = new cnnutil.Window(50, 1);

// Set up layers and trainer
const layer_defs = []
layer_defs.push({type: 'input', out_sx: 24, out_sy: 24, out_depth: 1})
layer_defs.push({type: 'conv', sx: 5, filters: 8, stride: 1, pad: 2, activation: 'relu'})
layer_defs.push({type: 'pool', sx: 2, stride: 2})
layer_defs.push({type: 'conv', sx: 5, filters: 16, stride: 1, pad: 2, activation: 'relu'})
layer_defs.push({type: 'pool', sx: 3, stride: 3})
layer_defs.push({type: 'softmax', num_classes: 10})

const net = new convnetjs.Net()
net.makeLayers(layer_defs)
const trainer = new convnetjs.SGDTrainer(net, {method: 'adadelta', batch_size: 20, l2_decay: 0.001})

const data_img_elts = new Array(num_batches);
const img_data = new Array(num_batches);
const loaded = new Array(num_batches).map(_ => false);
const loaded_train_batches = [];

const importUtil = new ImportUtil(
    convnetjs,
    num_batches,
    test_batch,
    num_samples_per_batch,
    use_validation_data,
    img_data,
    image_channels,
    image_dimension,
    labels,
    random_flip,
    random_position,
    loaded,
    loaded_train_batches,
    data_img_elts)

// Set up
window.addEventListener('DOMContentLoaded', initialize)

function initialize() {
  importUtil.load_data_batch(0); // async load train set batch 0
  importUtil.load_data_batch(test_batch); // async load test set
  run()
}

function run() {
  if (loaded[0] && loaded[test_batch]) {
    setInterval(step, 0); // lets go!
  } else {
    setTimeout(run, 200);
  }
}

function step() {
  const sample = importUtil.sample_training_instance();
  console.log('training accuracy', trainAccWindow.get_average())
  var x = sample.x;
  var y = sample.label;

  if (sample.isval) {
    // use x to build our estimate of validation error
    net.forward(x);
    let yhat = net.getPrediction();
    var val_acc = yhat === y ? 1.0 : 0.0;
    valAccWindow.add(val_acc);
    return; // get out
  }

  // train on it with network
  var stats = trainer.train(x, y);
  var lossx = stats.cost_loss;
  var lossw = stats.l2_decay_loss;

  // keep track of stats such as the average training error and loss
  let yhat = net.getPrediction();
  var train_acc = yhat === y ? 1.0 : 0.0;
  xLossWindow.add(lossx);
  wLossWindow.add(lossw);
  trainAccWindow.add(train_acc);

  // visualize activations
  if (step_num % 100 === 0) {
    console.log(net)
  }

  // // log progress to graph, (full loss)
  // if (step_num % 200 === 0) {
  //   const xa = xLossWindow.get_average();
  //   const xw = wLossWindow.get_average();
  //   if (xa >= 0 && xw >= 0) { // if they are -1 it means not enough data was accumulated yet for estimates
  //     // lossGraph.add(step_num, xa + xw);
  //     // lossGraph.drawSelf(document.getElementById("lossgraph"));
  // }
  // }

  // run prediction on test set
  if ((step_num % 100 === 0 && step_num > 0) || step_num === 100) {
    test_predict();
  }
  step_num++;
}

// evaluate current network on test set
function test_predict() {
  console.log('images-demo.js => test_predict()')
  const num_classes = net.layers[net.layers.length - 1].out_depth;

  // grab a random test image
  for (let num = 0; num < 4; num++) {
    const sample = importUtil.sample_test_instance();
    const y = sample.label;  // ground truth label

    // forward prop it through the network
    const aavg = new convnetjs.Vol(1, 1, num_classes, 0.0);
    // ensures we always have a list, regardless if above returns single item or list
    const xs = [].concat(sample.x);
    const n = xs.length;
    for (let i = 0; i < n; i++) {
      const a = net.forward(xs[i]);
      aavg.addFrom(a);
    }
    const preds = [];
    for (let k = 0; k < aavg.w.length; k++) { preds.push({k: k, p: aavg.w[k]}); }
    preds.sort(function(a, b) { return a.p < b.p ? 1 : -1; });

    const correct = preds[0].k === y;
    if (correct) {
      // global_total_correct++;
    }
    // global_total_count++;
  }
}

