const structure = [{
  type: 'input',
  x: 28,
  y: 28,
  z: 1
}, {
  type: 'conv',
  x: 24,
  y: 24,
  z: 8,
  stride: 1,
  filterSize: 5
}, {
  type: 'pooling',
  x: 12,
  y: 12,
  z: 8,
  stride: 2
}, {
  type: 'conv',
  x: 12,
  y: 12,
  z: 16,
  stride: 1,
  filterSize: 5,
  zeroPadding: 2
}, {
  type: 'pooling',
  x: 4,
  y: 4,
  z: 16,
  stride: 3
}, {
  type: 'fc',
  x: 1,
  y: 1,
  z: 10
}, {
  type: 'softmax',
  x: 1,
  y: 1,
  z: 10
}]

export default (layer, block, neuron) => {
  // Given neuron number,
  // block number,
  // and layer number,
  // calculate previous input
  if (layer === 1 || layer === 3) {
    const previousLayer = structure[layer - 1]
    const currentLayer = structure[layer]
    const neuronX = Math.floor(neuron / currentLayer.x)
    const neuronY = neuron % currentLayer.y
    const input_neurons = []

    const zeroPadding = currentLayer.zeroPadding || 0

    const leftStart = neuronX * currentLayer.stride - zeroPadding
    const topStart = neuronY * currentLayer.stride - zeroPadding

    for (let i = leftStart; i < leftStart + currentLayer.filterSize; i++) {
      for (let j = topStart; j < topStart + currentLayer.filterSize; j++) {
        for (let z = 0; z < previousLayer.z; z++) {
          if (i >= 0 && j >= 0 && i < previousLayer.x && j < previousLayer.y) {
            input_neurons.push({
              layer: layer - 1,
              block: z,
              neuron: i * previousLayer.x + j
            })
          }
        }
      }
    }
    return input_neurons
  }

  if (layer === 2 || layer === 4) {
    const previousLayer = structure[layer - 1]
    const currentLayer = structure[layer]
    const neuronX = Math.floor(neuron / currentLayer.x)
    const neuronY = neuron % currentLayer.y
    const input_neurons = []

    const leftStart = neuronX * currentLayer.stride
    const topStart = neuronY * currentLayer.stride

    for (let i = leftStart; i < leftStart + currentLayer.stride; i++) {
      for (let j = topStart; j < topStart + currentLayer.stride; j++) {
        input_neurons.push({
          layer: layer - 1,
          block,
          neuron: i * previousLayer.x + j
        })
      }
    }
    return input_neurons
  }

  if (layer === 5) {
    const input_neurons = []
    for (let i = 0; i < 256; i++) {
      input_neurons.push({
        layer: 4,
        block: Math.floor(i / 16),
        neuron: i % 16
      })
    }
    return input_neurons
  }

  if (layer === 6) {
    const input_neurons = [{
      layer: 5,
      block: 0,
      neuron
    }]
    return input_neurons
  }
}
