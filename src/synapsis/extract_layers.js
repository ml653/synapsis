const extractLayers = net => {
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
      extractedLayers.push(extractLayer(i, layers[i], prevLayerDim, depthRatio));
    } else {
      extractedLayers.push(extractLayer(i, layers[i]));
    }
  }

  return extractedLayers;
};

const extractLayer = (currentIndex, layer, prevLayerDim, depthRatio) => {
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
    depthRatio
  );

  return layerInfo;
};

const extractActivationInfo = (currentIndex, layer, prevLayerDim, depthRatio) => {
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
          pad: (currentIndex === 1 ? 0 : layer.pad),
          prevLayerDim,
          dim: layer.out_act.sx
        },
        offset: neuronIndex, // The offset here will refer to the offset of the neuron w/in its block
        recField: recFieldOptions
      };

      if (currentIndex === 1) { console.log(inputNeuronsOptions); }

      block.neurons.push({
        activation,
        input_neurons: getInputNeurons(inputNeuronsOptions)
      });

      // Check if max/min has changed
      if (activation < block.min) { block.min = activation; }
      if (activation > block.max) { block.max = activation; }

      activationOffset++;
    }

    blocks.push(block);
    // copyNeurons = copyNeurons.concat(buildActivationArr(block.neurons));
    // console.log(copyNeurons);
    // debugger;
  }
  // console.log(equalArrays(layer.out_act.w, copyNeurons));
  // logDiffs(layer.out_act.w, copyNeurons);
  // console.log(`Layer length: ${layer.out_act.w.length}`);
  // console.log(`My length: ${copyNeurons.length}`);
  return blocks;
};

// Debugging function
const buildActivationArr = neuronList => {
  const copyW = [];
  neuronList.forEach(el => {
    copyW.push(el.activation);
    // console.log(el.activation);
  });
  // console.log(`list size: ${neuronList.length}`);
  // console.log(copyW);
  return copyW;
};

// Debugging function
const equalArrays = (array1, array2) => {
  if (array1.length !== array2.length) { return false; }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) { return false; }
  }

  return true;
}

// Debugging function
const logDiffs = (array1, array2) => {
  if (array1.length !== array2.length) {
    console.log('DIFFERENT LENGTHS');
  } else {
    for (let i = 0; i < array1.length; i++) {
      console.log(array1[i] - array2[i]);
    }
  }
};

const getInputNeurons = options => {
  const inputNeurons = [];

  if (options.layerInfo.index < 0) { return inputNeurons; }

  const realDim = options.layerInfo.prevLayerDim + options.layerInfo.pad * 2;
  const recFieldStart = getPointFromOffset(
    options.offset,
    options.layerInfo.prevLayerDim,
    options.recField.stride
  );

  let coords;
  const rowLimit = options.recField.dimension + recFieldStart[0];
  const colLimit = options.recField.dimension + recFieldStart[1];
  for (let row = recFieldStart[0]; row < rowLimit; row++) {
    for (let col = recFieldStart[1]; col < colLimit; col++) {
      coords = [row, col];
      if (withinBounds(coords, realDim, options.layerInfo.pad)) {
        inputNeurons.push({
          layer: options.layerInfo.index,
          block: Math.floor(options.layerInfo.depth / options.layerInfo.depthRatio),
          neuron: getOffsetFromPoint(
            coords,
            options.layerInfo.prevLayerDim,
            options.layerInfo.pad)
        });
      }
    }
  }

  return inputNeurons;
}

// Get the nth receptive field starting point
const getPointFromOffset = (offset, dim, stride) => {
  const strodeOffset = offset * stride;
  return [Math.floor(strodeOffset / dim), strodeOffset % dim];
};

// Get the offset of the point within the bounds of the input from the previous
// layer
const getOffsetFromPoint = (coords, prevDim, pad) => {
  return (coords[0] - pad) * prevDim + coords[1];
};

// Check if the given point is within the bounds of the original input i.e. not
// from padding
const withinBounds = (coords, paddedDim, pad) => {
  return withinBound(coords[0], paddedDim, pad) &&
         withinBound(coords[1], paddedDim, pad);
};

// Check that a single coordinate is within the bounds of the original input
const withinBound = (coord, paddedDim, pad) => {
  return (coord - pad) >= 0 && (coord + pad) < paddedDim;
}

export default extractLayers;
