const extracted = require('../extracted')

export default function merge(layers) {
  layers.forEach((layer, i) => {
    layer.blocks.forEach((block, j) => {
      block.neurons.forEach((neuron, k) => {
        neuron.input_neurons = extracted[i].blocks[j].neurons[k].input_neurons
      })
    })
  })
  return layers
}
