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

  console.log(arr);
  return arr;
}
