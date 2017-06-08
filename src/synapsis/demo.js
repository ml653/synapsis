module.exports = function(){
  const Worker = require("worker-loader!./worker.js");
  const worker = new Worker()
  worker.postMessage('message to worker')

  worker.onmessage = function(e) {
    console.log('Message received from worker', e.data);
  }
}
