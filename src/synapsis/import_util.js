// // evaluate current network on test set
// function test_predict() {
//   console.log('images-demo.js => test_predict()')
//   const num_classes = net.layers[net.layers.length - 1].out_depth;

//   // grab a random test image
//   for (let num = 0; num < 4; num++) {
//     const sample = sample_test_instance();
//     const y = sample.label;  // ground truth label

//     // forward prop it through the network
//     const aavg = new convnetjs.Vol(1, 1, num_classes, 0.0);
//     // ensures we always have a list, regardless if above returns single item or list
//     const xs = [].concat(sample.x);
//     const n = xs.length;
//     for (let i = 0; i < n; i++) {
//       const a = net.forward(xs[i]);
//       aavg.addFrom(a);
//     }
//     const preds = [];
//     for (let k = 0; k < aavg.w.length; k++) { preds.push({k: k, p: aavg.w[k]}); }
//     preds.sort(function(a, b) { return a.p < b.p ? 1 : -1; });

//     const correct = preds[0].k === y;
//     // TODO: Important predictions
//     // console.log(preds)
//     if (correct) {
//       // global_total_correct++;
//     }
//     // global_total_count++;
//     // console.log('percent correct: ', global_total_correct, global_total_count, global_total_correct / global_total_count)
//   }
// }

// // sample a random testing instance
// function sample_test_instance() {
//   const b = test_batch;
//   const k = Math.floor(Math.random() * num_samples_per_batch);
//   const n = b * num_samples_per_batch + k;

//   const p = img_data[b].data;
//   const x = new convnetjs.Vol(image_dimension, image_dimension, image_channels, 0.0);
//   const W = image_dimension * image_dimension;
//   // const j = 0;
//   for (let dc = 0; dc < image_channels; dc++) {
//     let i = 0;
//     for (let xc = 0; xc < image_dimension; xc++) {
//       for (let yc = 0; yc < image_dimension; yc++) {
//         const ix = ((W * k) + i) * 4 + dc;
//         x.set(yc, xc, dc, p[ix] / 255.0 - 0.5);
//         i++;
//       }
//     }
//   }

//   // distort position and maybe flip
//   const xs = [];

//   if (random_flip || random_position) {
//     for (let k = 0; k < 6; k++) {
//       let test_variation = x;
//       if (random_position) {
//         const dx = Math.floor(Math.random() * 5 - 2);
//         const dy = Math.floor(Math.random() * 5 - 2);
//         test_variation = convnetjs.augment(test_variation, image_dimension, dx, dy, false);
//       }

//       if (random_flip) {
//         test_variation = convnetjs.augment(test_variation, image_dimension, 0, 0, Math.random() < 0.5);
//       }

//       xs.push(test_variation);
//     }
//   } else {
//     xs.push(x, image_dimension, 0, 0, false); // push an un-augmented copy
//   }

//   // return multiple augmentations, and we will average the network over them
//   // to increase performance
//   return {x: xs, label: labels[n]};
// }

const path = require("path")
const convnetjs = require('convnetjs')
const labels = require('../../static/mnist/mnist_labels')

class ImportUtil {
  constructor(num_batches,
              test_batch,
              num_samples_per_batch,
              use_validation_data,
              img_data,
              image_channels,
              image_dimension,
              random_flip,
              random_position,
              loaded,
              loaded_train_batches,
              data_img_elts) {
    this.num_batches = num_batches
    this.test_batch = test_batch
    this.num_samples_per_batch = num_samples_per_batch
    this.use_validation_data = use_validation_data
    this.img_data = img_data
    this.image_channels = image_channels
    this.image_dimension = image_dimension
    this.random_flip = random_flip
    this.random_position = random_position
    this.loaded = loaded
    this.loaded_train_batches = loaded_train_batches
    this.data_img_elts = data_img_elts
  }

  // sample a random testing instance
  sample_test_instance() {
    const b = this.test_batch;
    const k = Math.floor(Math.random() * this.num_samples_per_batch);
    const n = b * this.num_samples_per_batch + k;

    const p = this.img_data[b].data;
    const x = new convnetjs.Vol(this.image_dimension, this.image_dimension, this.image_channels, 0.0);
    const W = this.image_dimension * this.image_dimension;
    // const j = 0;
    for (let dc = 0; dc < this.image_channels; dc++) {
      let i = 0;
      for (let xc = 0; xc < this.image_dimension; xc++) {
        for (let yc = 0; yc < this.image_dimension; yc++) {
          const ix = ((W * k) + i) * 4 + dc;
          x.set(yc, xc, dc, p[ix] / 255.0 - 0.5);
          i++;
        }
      }
    }

    // distort position and maybe flip
    const xs = [];

    if (this.random_flip || this.random_position) {
      for (let k = 0; k < 6; k++) {
        let test_variation = x;
        if (this.random_position) {
          const dx = Math.floor(Math.random() * 5 - 2);
          const dy = Math.floor(Math.random() * 5 - 2);
          test_variation = convnetjs.augment(test_variation, this.image_dimension, dx, dy, false);
        }

        if (this.random_flip) {
          test_variation = convnetjs.augment(test_variation, this.image_dimension, 0, 0, Math.random() < 0.5);
        }

        xs.push(test_variation);
      }
    } else {
      xs.push(x, this.image_dimension, 0, 0, false); // push an un-augmented copy
    }

    // return multiple augmentations, and we will average the network over them
    // to increase performance
    return {x: xs, label: labels[n]};
  }

    // NOTES: Returns random unseen training instance.
  sample_training_instance(step_num) {
    // find an unloaded batch
    const bi = Math.floor(Math.random() * this.loaded_train_batches.length);
    const b = this.loaded_train_batches[bi];
    const k = Math.floor(Math.random() * this.num_samples_per_batch); // sample within the batch
    const n = b * this.num_samples_per_batch + k;

    // load more batches over time
    if (step_num % (2 * this.num_samples_per_batch) === 0 && step_num > 0) {
      for (let i = 0; i < this.num_batches; i++) {
        if (!this.loaded[i]) {
          // load it
          this.load_data_batch(i);
          break; // okay for now
        }
      }
    }

    // fetch the appropriate row of the training image and reshape into a Vol
    const p = this.img_data[b].data;
    let x = new convnetjs.Vol(this.image_dimension, this.image_dimension, this.image_channels, 0.0);
    const W = this.image_dimension * this.image_dimension;
    // const j = 0;
    for (let dc = 0; dc < this.image_channels; dc++) {
      let i = 0;
      for (let xc = 0; xc < this.image_dimension; xc++) {
        for (let yc = 0; yc < this.image_dimension; yc++) {
          const ix = ((W * k) + i) * 4 + dc;
          x.set(yc, xc, dc, p[ix] / 255.0 - 0.5);
          i++;
        }
      }
    }

    if (this.random_position) {
      const dx = Math.floor(Math.random() * 5 - 2);
      const dy = Math.floor(Math.random() * 5 - 2);
      x = convnetjs.augment(x, this.image_dimension, dx, dy, false); // maybe change position
    }

    if (this.random_flip) {
      x = convnetjs.augment(x, this.image_dimension, 0, 0, Math.random() < 0.5); // maybe flip horizontally
    }

    const isval = this.use_validation_data && n % 10 === 0;
    return {x: x, label: labels[n], isval: isval};
  }

  load_data_batch(batch_num) {
    // Load the dataset with JS in background
    this.data_img_elts[batch_num] = new Image();
    const data_img_elt = this.data_img_elts[batch_num];
    data_img_elt.onload = function() {
      const data_canvas = document.createElement('canvas');
      data_canvas.width = data_img_elt.width;
      data_canvas.height = data_img_elt.height;
      const data_ctx = data_canvas.getContext('2d');
      data_ctx.drawImage(data_img_elt, 0, 0); // copy it over... bit wasteful :(
      this.img_data[batch_num] = data_ctx.getImageData(0, 0, data_canvas.width, data_canvas.height);
      this.loaded[batch_num] = true;
      if (batch_num < this.test_batch) { this.loaded_train_batches.push(batch_num); }
      console.log(
        'finished loading data batch => batch_num(): ' + batch_num,
        'loaded_train_batches(): ', this.loaded_train_batches,
        'loaded: ', this.loaded);
    }.bind(this);
    data_img_elt.src = `/static/mnist/mnist_batch_${batch_num}.png`;
  }
}

export default ImportUtil
