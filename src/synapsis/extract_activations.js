const extractActivations = (net) => {
  const layers = net.layers.slice(0, 2)
                  .concat(net.layers.slice(3, 5))
                  .concat(net.layers.slice(6));

  const extractedLayers = [];
  for (let i = 0; i < layers.length; i++) {
    extractedLayers.push(extractLayer(i, layers[i]));
  }

  return extractedLayers;
};

const extractLayer = (currentIndex, layer) => {
  const layerInfo = {
    type: layer.layer_type,
    x: layer.out_act.sx,
    y: layer.out_act.sy,
    z: layer.out_depth
  }

  layerInfo.blocks = currentIndex === 0
    ? extractActivationInfoOfInput(layer)
    : extractActivationInfo(layer)

  return layerInfo;
};

const extractActivationInfo = (layer) => {
  const blocks = [];

  for (let d = 0; d < layer.out_depth; d++) {
    let block = {
      min: 0,
      max: 0,
      neurons: []
    };

    for (let x = 0; x < layer.out_sx; x++) {
      for (let y = 0; y < layer.out_sy; y++) {
        let activation = get(layer.out_act.w, y, x, d,
          layer.out_act.sy, layer.out_act.dx, layer.out_act.depth)
        block.neurons.push({
          activation,
          input_neurons: []
        });

        if (activation < block.min) { block.min = activation; }
        if (activation > block.max) { block.max = activation; }
      }
    }
    blocks.push(block)
  }

  return blocks;
};

function extractActivationInfoOfInput(layer) {
  const block = {
    min: 0,
    max: 0,
    neurons: []
  }
  layer.out_act.w.forEach(activation => {
    if (activation < block.min) { block.min = activation; }
    if (activation > block.max) { block.max = activation; }

    block.neurons.push({
      activation,
      input_neurons: []
    })
  })
  const blocks = []
  blocks.push(block)
  return blocks;
}

function get(arr, x, y, d, sx, sy, depth) {
  let ix = ((sx * y) + x) * depth + d;
  return arr[ix];
}

export default extractActivations;
