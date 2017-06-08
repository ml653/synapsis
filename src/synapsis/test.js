const fs = require('fs')
const path = require('path')

console.log(__dirname)
fs.readFile(path.join(__dirname, '../../static/mnist/mnist_batch_0.png'), function(err, data) {
  console.log(err)
  console.log(data)
})
