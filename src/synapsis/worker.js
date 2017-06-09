// this.importScripts('./worker_bundle.js')
const path = require('path')
console.log(path)
import NN from './mnist_neural_network'
// const nn = new NN(cb)
// nn.run()

// const cb = (e) => {
//   console.log(e);
//   document.getElementById('test').innerHTML = (new Date()).getTime();
// }

onmessage = function(e){
  console.log(NN)
  console.log('worker.js', e.data)
  this.postMessage('b')
}
