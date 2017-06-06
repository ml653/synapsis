// Demo training for ConvNetJS
const convnetjs = require('convnetjs')

const classes_txt = ['0','1','2','3','4','5','6','7','8','9']
const dataset_name = "mnist"
const num_batches = 21 // 20 training batches, 1 test
const test_batch = 20
const num_samples_per_batch = 3000
const image_dimension = 28
const image_channels = 1
const use_validation_data = true
const random_flip = false
const random_position = false

const t = layer_defs = []
layer_defs.push({type:'input', out_sx:24, out_sy:24, out_depth:1})
layer_defs.push({type:'conv', sx:5, filters:8, stride:1, pad:2, activation:'relu'})
layer_defs.push({type:'pool', sx:2, stride:2})
layer_defs.push({type:'conv', sx:5, filters:16, stride:1, pad:2, activation:'relu'})
layer_defs.push({type:'pool', sx:3, stride:3})
layer_defs.push({type:'softmax', num_classes:10})

const net = new convnetjs.Net()
net.makeLayers(layer_defs)
trainer = new convnetjs.SGDTrainer(net, {method:'adadelta', batch_size:20, l2_decay:0.001})

console.log(trainer)
