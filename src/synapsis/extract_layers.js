const extractLayers = net => {
  // Extract the layers, slicing around Relu layers
  const layers = net.layers.slice(0, 2)
                  .concat(net.layers.slice(3, 5))
                  .concat(net.layers.slice(6));

  return layers.map(layer => extractLayer(layer));
};

const extractLayer = layer => {
  const layerInfo = {
    layer: layer.layer_type,
    x: layer.out_act.sx,
    y: layer.out_act.sy,
    z: layer.out_depth
  };

  layerInfo.blocks = extractFilterInfo(layer);
  return layerInfo;
};

const extractFilterInfo = layer => {
  const blocks = [];
  const blockSize = layer.out_act.sx * layer.out_act.sy;

  let block;
  let activationOffset = 0; // Keep track of where we are in the activation array
  for (let depth = 0; depth < layer.out_depth; depth++) {
    // Create a new block
    block = {
      min: 99999,
      max: -99999,
      neurons: []
    };

    let activation;
    // We need to have this loop so we know when a block is full without
    // disrupting the offset for the whole layer
    for (let neuronIndex = 0; neuronIndex < blockSize; neuronIndex++) {
      // console.log(layer);
      activation = layer.in_act.w[activationOffset];

      block.neurons.push({
        activation,
        input_neurons: [] // TODO: Extract input neurons
      });

      // Check if max/min has changed
      if (activation < block.min) { block.min = activation; }
      if (activation > block.max) { block.max = activation; }

      activationOffset++;
    }

    blocks.push(block);
  }

  return blocks;
};

export default extractLayers;
