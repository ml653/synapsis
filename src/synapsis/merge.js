const extracted = require('../extracted')

export default function merge(layers) {
  extracted.forEach((layer, i) => {
    layer.blocks.forEach((block, j) => {
      block.neurons.forEach((neuron, k) => {
        neuron.activation = layers[i].blocks[j].neurons[k].activation
      })
    })
  })
  return extracted
}
