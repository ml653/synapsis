module.exports = {
  //  Array of blocks
  layers: [
    { //  Layer
      layer: type,
      x: 24,
      y: 24,
      z: 8 // Block number
      blocks: [ 
        { // Block
          min: 'total possible',
          max: 'total possible',
          neurons: [
            { // Neuron
              activation: 0.5,
              input_neurons: [
                { // Adress
                  layer: 0,
                  block: 1,
                  neuron: 2,
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}