const extractLayers = (net, willExtract) => {
  // Extract the layers, slicing around Relu layers
  const layers = net.layers.slice(0, 2)
                  .concat(net.layers.slice(3, 5))
                  .concat(net.layers.slice(6));

  const extractedLayers = [];
  let prevLayerDim;
  let depthRatio;
  for (let i = 0; i < layers.length; i++) {
    if (i > 0) {
      prevLayerDim = layers[i - 1].out_act.sx;
      depthRatio = layers[i].out_depth / layers[i - 1].out_depth;
      extractedLayers.push(extractLayer(willExtract, i, layers[i], prevLayerDim, depthRatio));
    } else {
      extractedLayers.push(extractLayer(willExtract, i, layers[i]));
    }
  }

  return extractedLayers;
};

const extractLayer = (willExtract, currentIndex, layer, prevLayerDim, depthRatio) => {
  const layerInfo = {
    type: layer.layer_type,
    x: layer.out_act.sx,
    y: layer.out_act.sy,
    z: layer.out_depth
  };

  layerInfo.blocks = extractActivationInfo(
    currentIndex,
    layer,
    prevLayerDim,
    depthRatio,
    willExtract
  );

  return layerInfo;
};

const extractActivationInfo = (currentIndex, layer, prevLayerDim, depthRatio, willExtract=false) => {
  const blocks = [];
  const blockSize = layer.out_act.sx * layer.out_act.sy;
  const recFieldOptions = {
    dimension: layer.sx,
    stride: layer.stride
  };

  // Debugging
  // let copyNeurons = [];

  let block;
  let activationOffset = 0; // Keep track of where we are in the activation array
  for (let depth = 0; depth < layer.out_depth; depth++) {
    // Create a new block
    block = {
      min: layer.out_act.w[0],
      max: layer.out_act.w[0],
      neurons: []
    };

    let activation;
    let inputNeuronsOptions;
    // We need to have this loop so we know when a block is full without
    // disrupting the offset for the whole layer
    for (let neuronIndex = 0; neuronIndex < blockSize; neuronIndex++) {
      activation = layer.out_act.w[activationOffset];

      inputNeuronsOptions = {
        layerInfo: {
          index: currentIndex - 1,
          depth,
          depthRatio,
          pad: layer.pad,
          prevLayerDim,
          dim: layer.out_act.sx
        },
        offset: neuronIndex, // The offset here will refer to the offset of the neuron w/in its block
        recField: recFieldOptions
      };

      block.neurons.push({
        activation,
        input_neurons: willExtract ? getInputNeurons(inputNeuronsOptions) : []
      });

      // if (x < 5) {
      //   console.log('hi', getInputNeurons(inputNeuronsOptions))
      //   x++
      // }
      // console.log('run')

      // Check if max/min has changed
      if (activation < block.min) { block.min = activation; }
      if (activation > block.max) { block.max = activation; }

      activationOffset++;
    }

    blocks.push(block);
  }

  return blocks;
};

const getInputNeurons = options => {
  const inputNeurons = [];

  if (options.layerInfo.index < 0) { return inputNeurons; }

  const realDim = options.layerInfo.prevLayerDim; //+ options.layerInfo.pad * 2;
  const recFieldStart = getPointFromOffset(
    options.offset,
    options.layerInfo.prevLayerDim,
    options.recField.stride
  );

  let coords;
  const rowRecLimit = options.recField.dimension + recFieldStart[0];
  const colRecLimit = options.recField.dimension + recFieldStart[1];
  const rowLimit = realDim - options.recField.dimension;
  const colLimit = realDim - options.recField.dimension;
  for (let row = recFieldStart[0]; row < rowRecLimit; row++) {
    for (let col = recFieldStart[1]; col < colRecLimit; col++) {
      coords = [row, col];
      inputNeurons.push({
        layer: options.layerInfo.index,
        block: Math.floor(options.layerInfo.depth / options.layerInfo.depthRatio),
        neuron: getOffsetFromPoint(
          coords,
          options.layerInfo.prevLayerDim,
          options.layerInfo.pad)
      });
      // if (withinBounds(coords, realDim, options.layerInfo.pad)) {}
    }
  }

  return inputNeurons;
}

// Get the nth receptive field starting point
const getPointFromOffset = (offset, dim, stride) => {
  let strodeOffset = offset * stride;

  if (stride === 1) {
    strodeOffset += Math.floor(strodeOffset / 24) * 4;
  }

  return [Math.floor(strodeOffset / dim) * stride, strodeOffset % dim];
};

// Get the offset of the point within the bounds of the input from the previous
// layer
const getOffsetFromPoint = (coords, prevDim, pad) => {
  return coords[0] * prevDim + coords[1];
};

export default extractLayers;
