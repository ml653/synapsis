import MNISTNeuralNetwork from './mnist_neural_network';
import ImportUtil from './import_util';

// get port from connection
var port = self;

// create function callback for when steps occur
const post = (stats) => {
  port.postMessage(stats);
};

// Fail console log method
const failCB = (e) => {
  port.postMessage({error: e.stack});
};

// Print console log method
const printCB = (e) => {
  port.postMessage({type: "MESSAGE", e});
}

// Debugger callbacks
self.logCB = printCB;
self.errorCB = failCB;

// listen in on the other thread for when messages are sent
port.addEventListener("message", function (e) {
  try {
    if (e.data.type === "INITIALIZE") {
      // init network
      const importUtil = new ImportUtil(e.data.params);
      this.network = new MNISTNeuralNetwork(post, importUtil, printCB, failCB);
      this.network.run();
    } else if (e.data.type === "RUN") {
      this.network.run();
    } else if (e.data.type === "PAUSE") {
      this.network.pause();
    }
  } catch (e) {
    port.postMessage({error: e.stack});
  }
}, false);
