import { scaleLinear } from 'd3';

export const make2DArr = (arr, dim) => {
  let newArr = [];

  for (let i = 0; i < dim; i++) {
    newArr.push(arr.splice(0, dim));
  }

  return newArr;
}

export const grabActivations = block => {
  let arr = [];

  block.neurons.forEach(neuron => {
    arr.push(neuron.activation);
  })

  return arr;
}

export const findTopGuess = predictions => {
  let guessedProb = null;
  let guessedNumber = null;

  predictions.forEach(prediction => {
    if (guessedProb) {
      if (prediction.p > guessedProb) {
        guessedProb = prediction.p;
        guessedNumber = prediction.k;
      }
    } else {
      guessedProb = prediction.p;
      guessedNumber = prediction.k;
    }
  });

  return { guessedProb, guessedNumber };
}

export const interpolatorSpec = (min, max, colorA, colorB) => {
  let lerp = scaleLinear()
    .domain([min, max])
    .range([colorA, colorB]);
  lerp.clamp(true);
  return lerp;
}

export const interpolator = (min, max) => {
  // .range(['#f8f8f8', '#39952B']);
  return interpolatorSpec(min, max, '#f8f8f8', 'rgb(25, 97, 39)');
}

