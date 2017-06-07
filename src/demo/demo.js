// Demo training for ConvNetJS
import convnetjs from 'convnetjs';

const classes_txt = ['0','1','2','3','4','5','6','7','8','9'];
const dataset_name = "mnist";
const num_batches = 21; // 20 training batches, 1 test
const test_batch = 20;
const num_samples_per_batch = 3000;
const image_dimension = 28;
const image_channels = 1;
const use_validation_data = true;
const random_flip = false;
const random_position = false;
