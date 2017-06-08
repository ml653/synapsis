const path = require("path")
const convnetjs = require('convnetjs')
const labels = require('../../static/mnist/mnist_labels')

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

class ImportUtil {
  constructor(options=defaultOptions) {
    this.num_batches = options.num_batches;  // Import Util only
    this.test_batch = options.test_batch;   // Import Util only
    this.num_samples_per_batch = options.num_samples_per_batch;  // Import Util only
    this.image_dimension = options.image_dimension;  // Import Util only
    this.image_channels = options.image_channels;  // Import Util only
    this.use_validation_data = options.use_validation_data;  // Import Util only
    this.random_flip = options.random_flip;  // Import Util only
    this.random_position = options.random_flip;  // Import Util only

    this.data_img_elts = options.data_img_elts || new Array(this.num_batches)
    this.img_data = options.img_data || new Array(this.num_batches);  // Import Util Only
    this.loaded = options.loaded || new Array(this.num_batches).map(_ => false);  // Also mainly import util
    this.loaded_train_batches = options.loaded_training_batches || []; // Import Util only
  }

  getParams(){
    return {
      num_batches: this.num_batches,
      test_batch: this.test_batch,
      num_samples_per_batch: this.num_samples_per_batch,
      image_dimension: this.image_dimension,
      image_channels: this.image_channels,
      use_validation_data: this.use_validation_data,
      random_flip: this.random_flip,
      random_position: this.random_flip,

      data_img_elts: this.data_img_elts,
      img_data: this.img_data,
      loaded: this.loaded,
      loaded_training_batches: this.loaded_train_batches
    }
  }

  loadAll() {
    return new Promise((res, _) => {
      for(let i = 0; i < this.num_batches; i++){
        this.load_data_batch(i, res)
      }
    })
  }

  finishedLoading() {
    for(let i = 0; i < this.num_batches; i++){
      console.log(this.img_data[i])
      if(!this.img_data[i]) return false
    } return true
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
    for (let dc = 0; dc < this.image_channels; dc++) { // For each image channel
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
    const bi = Math.floor(Math.random() * this.loaded_train_batches.length);  // Random batch
    const b = this.loaded_train_batches[bi]; // b = batch
    const k = Math.floor(Math.random() * this.num_samples_per_batch); // sample within the batch
    const n = b * this.num_samples_per_batch + k;

    // // load more batches over time
    // if (step_num % (2 * this.num_samples_per_batch) === 0 && step_num > 0) {
    //   for (let i = 0; i < this.num_batches; i++) {
    //     if (!this.loaded[i]) {
    //       // load it
    //       this.load_data_batch(i);
    //       break; // okay for now
    //     }
    //   }
    // }

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

    // if (this.random_position) {
    //   const dx = Math.floor(Math.random() * 5 - 2);
    //   const dy = Math.floor(Math.random() * 5 - 2);
    //   x = convnetjs.augment(x, this.image_dimension, dx, dy, false); // maybe change position
    // }

    // if (this.random_flip) {
    //   x = convnetjs.augment(x, this.image_dimension, 0, 0, Math.random() < 0.5); // maybe flip horizontally
    // }

    const isval = this.use_validation_data && n % 10 === 0;
    return {x: x, label: labels[n], isval: isval};
  }

  load_data_batch(batch_num, resolve) {
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
      if (batch_num < this.test_batch) this.loaded_train_batches.push(batch_num);
      if (this.finishedLoading) resolve('finished');
    }.bind(this);
    data_img_elt.src = `/static/mnist/mnist_batch_${batch_num}.png`;
  }
}

export default ImportUtil
