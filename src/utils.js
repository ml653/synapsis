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
