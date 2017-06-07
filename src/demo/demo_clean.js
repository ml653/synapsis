console.log('loading demo.js :)')
// Parameters
const convnetjs = require('convnetjs')
const labels = require('./mnist/mnist_labels')
const cnnutil = require('./cnnutil')
const num_batches = 21 // 20 training batches, 1 test
const test_batch = 20
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

// const lossGraph = new cnnvis.Graph();
const xLossWindow = new cnnutil.Window(100);
const wLossWindow = new cnnutil.Window(100);
const trainAccWindow = new cnnutil.Window(100);
const valAccWindow = new cnnutil.Window(100);
// const testAccWindow = new cnnutil.Window(50, 1);
// trainAccWindow.add(train_acc)
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
console.log(trainer)

const data_img_elts = new Array(num_batches);
const img_data = new Array(num_batches);
const loaded = new Array(num_batches);
const loaded_train_batches = [];

// Set up
window.addEventListener('DOMContentLoaded', () => {
  update_net_param_display();

  for (let k = 0; k < loaded.length; k++) {
    loaded[k] = false;
  }

  load_data_batch(0); // async load train set batch 0
  load_data_batch(test_batch); // async load test set
  start_fun();
})

// Function definitions; only function definitions are hoisted
function update_net_param_display() {
  console.log('a', trainer.learning_rate);
}

function load_data_batch(batch_num) {
  // Load the dataset with JS in background
  data_img_elts[batch_num] = new Image();
  console.log('load_data_batch', data_img_elts)
  const data_img_elt = data_img_elts[batch_num];
  data_img_elt.onload = function() {
    const data_canvas = document.createElement('canvas');
    data_canvas.width = data_img_elt.width;
    data_canvas.height = data_img_elt.height;
    const data_ctx = data_canvas.getContext('2d');
    data_ctx.drawImage(data_img_elt, 0, 0); // copy it over... bit wasteful :(
    img_data[batch_num] = data_ctx.getImageData(0, 0, data_canvas.width, data_canvas.height);
    loaded[batch_num] = true;
    if (batch_num < test_batch) { loaded_train_batches.push(batch_num); }
    console.log(
      'finished loading data batch => batch_num(): ' + batch_num,
      'loaded_train_batches(): ', loaded_train_batches,
      'loaded: ', loaded);
  };
  data_img_elt.src = `mnist/mnist_batch_${batch_num}.png`;
}

// NOTES: keep looking to run start_fun until two batches are loaded.
function start_fun() {
  if (loaded[0] && loaded[test_batch]) {
    console.log('starting!');
    setInterval(load_and_step, 0); // lets go!
  } else {
    setTimeout(start_fun, 200);
  } // keep checking
}

// loads a training image and trains on it with the network
const paused = false;
const load_and_step = function() {
  if (paused) return;

  const sample = sample_training_instance();
  // console.log('step sample => ', sample)
  step(sample); // process this image

  // setTimeout(load_and_step, 0); // schedule the next iteration
}

function step(sample) {
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
    // console.log(net)
    // TODO: Pull data from here.
    // const vis_elt = document.getElementById("visnet");
    // visualize_activations(net, vis_elt); // TODO: Important
  }

  // log progress to graph, (full loss)
  if (step_num % 200 === 0) {
    const xa = xLossWindow.get_average();
    const xw = wLossWindow.get_average();
    if (xa >= 0 && xw >= 0) { // if they are -1 it means not enough data was accumulated yet for estimates
      // lossGraph.add(step_num, xa + xw);
      // lossGraph.drawSelf(document.getElementById("lossgraph"));
    }
  }

  // run prediction on test set
  if ((step_num % 100 === 0 && step_num > 0) || step_num === 100) {
    // TODO: Write test_predict()
    test_predict();
  }
  step_num++;
}

// NOTES: Returns random unseen training instance.
function sample_training_instance() {
  // find an unloaded batch
  const bi = Math.floor(Math.random() * loaded_train_batches.length);
  const b = loaded_train_batches[bi];
  const k = Math.floor(Math.random() * num_samples_per_batch); // sample within the batch
  const n = b * num_samples_per_batch + k;

  // load more batches over time
  if (step_num % (2 * num_samples_per_batch) === 0 && step_num > 0) {
    for (let i = 0; i < num_batches; i++) {
      if (!loaded[i]) {
        // load it
        load_data_batch(i);
        break; // okay for now
      }
    }
  }

  // fetch the appropriate row of the training image and reshape into a Vol
  const p = img_data[b].data;
  let x = new convnetjs.Vol(image_dimension, image_dimension, image_channels, 0.0);
  const W = image_dimension * image_dimension;
  // const j = 0;
  for (let dc = 0; dc < image_channels; dc++) {
    let i = 0;
    for (let xc = 0; xc < image_dimension; xc++) {
      for (let yc = 0; yc < image_dimension; yc++) {
        const ix = ((W * k) + i) * 4 + dc;
        x.set(yc, xc, dc, p[ix] / 255.0 - 0.5);
        i++;
      }
    }
  }

  if (random_position) {
    const dx = Math.floor(Math.random() * 5 - 2);
    const dy = Math.floor(Math.random() * 5 - 2);
    x = convnetjs.augment(x, image_dimension, dx, dy, false); // maybe change position
  }

  if (random_flip) {
    x = convnetjs.augment(x, image_dimension, 0, 0, Math.random() < 0.5); // maybe flip horizontally
  }

  const isval = use_validation_data && n % 10 === 0;
  return {x: x, label: labels[n], isval: isval};
}

// evaluate current network on test set
function test_predict() {
  console.log('images-demo.js => test_predict()')
  const num_classes = net.layers[net.layers.length - 1].out_depth;

  // grab a random test image
  for (let num = 0; num < 4; num++) {
    const sample = sample_test_instance();
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
    // TODO: Important predictions
    // console.log(preds)
    if (correct) {
      // global_total_correct++;
    }
    // global_total_count++;
    // console.log('percent correct: ', global_total_correct, global_total_count, global_total_correct / global_total_count)
  }
}

// sample a random testing instance
function sample_test_instance() {
  const b = test_batch;
  const k = Math.floor(Math.random() * num_samples_per_batch);
  const n = b * num_samples_per_batch + k;

  const p = img_data[b].data;
  const x = new convnetjs.Vol(image_dimension, image_dimension, image_channels, 0.0);
  const W = image_dimension * image_dimension;
  // const j = 0;
  for (let dc = 0; dc < image_channels; dc++) {
    let i = 0;
    for (let xc = 0; xc < image_dimension; xc++) {
      for (let yc = 0; yc < image_dimension; yc++) {
        const ix = ((W * k) + i) * 4 + dc;
        x.set(yc, xc, dc, p[ix] / 255.0 - 0.5);
        i++;
      }
    }
  }

  // distort position and maybe flip
  const xs = [];

  if (random_flip || random_position) {
    for (let k = 0; k < 6; k++) {
      let test_variation = x;
      if (random_position) {
        const dx = Math.floor(Math.random() * 5 - 2);
        const dy = Math.floor(Math.random() * 5 - 2);
        test_variation = convnetjs.augment(test_variation, image_dimension, dx, dy, false);
      }

      if (random_flip) {
        test_variation = convnetjs.augment(test_variation, image_dimension, 0, 0, Math.random() < 0.5);
      }

      xs.push(test_variation);
    }
  } else {
    xs.push(x, image_dimension, 0, 0, false); // push an un-augmented copy
  }

  // return multiple augmentations, and we will average the network over them
  // to increase performance
  return {x: xs, label: labels[n]};
}
