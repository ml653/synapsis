# Synapsis: Neural Networks Made E-Z-P-Z :)

## Background and Overview

Machine learning and neural networks are topics that seem daunting from a layman's point of view. We aim to demystify these topics by showing what machine learning & neural networks are capable of followed by a walkthrough of what is going on behind the scenes.

In Neural Networks Made E-Z-P-Z :), a convoluted neural network will be trained live to recognize handwritten digits from 0-9. The training process will be visualized with interesting, interactive, and informative visual animations. A separate more simple neural network will also be trained live which will display an informative and interactive step by step walkthrough of what is going on during the training process.

## Functionality and MVP
- CNN = Convoluted Neural Network
- ANN = Artificial Neural Network

##### Phase A
- Train CNN live in browser
- Display every layer of the CNN
- Display connections between each layer of the CNN
- CNN is able to predict handwritten numbers with at least 90% accuracy within the first 2 minutes

##### Phase B
- Functioning ANN built from scratch
- Train ANN live in browser
- Each step of ANN training is explained
	- Initializing random weights
	- Forward propagation
	- Back propagation / Gradient descent

## Technologies and Technical Challenges
- ConvNetJS
- Vue.js
- D3.js
- JavaScript
- HTML
- CSS

#### Primary technical challenges:

- Setting up the CNN using ConvNetJS and extracting useful data for visualization
- Parsing data coming in from the CNN and visualizing all of the connections using D3.js
- Building the ANN from scratch

## Things Accomplished Over the Weekend

- Learned how neural networks work, specifically convoluted neural networks
- Researched libraries for machine learning/learn basics of ConvNetJS
- Learned basic Vue.js and D3.js
- Understood how to pull neural net information from ConvNetJS

## Group Members and Work Breakdown

- Ahmed: Phase A Animation
- Trevor: ‘Backend’ magic for Phase A MNIST Set Recognition
- Jin: Frontend layout & Phase B ANN Walkthrough
- Steven: ‘Backend’ logic for Phase B ANN Walkthrough

## Logic
#### Part B: Small lightweight architecture free neural network
Capable of adding and removing nodes and layers
Multiple types of activation functions (Sigmoid, ReLU, Linear)

#### Utilize ConvNet to train on and learn MNIST dataset
- Build Convolutional Neural Network
- Layers:
  - Input Layer
  - Convolutional Layer 1
  - ReLU Layer 1
  - Pooling Layer 1
  - Convolutional Layer 2
  - ReLU Layer 2
  - Pooling Layer 2
  - Fully Connected Layer
  - SoftMax Layer
- Reach 90% accuracy in <5 min

## Visual
- App
- Sidebar
  - PredictionSet
  - NetworkStats
- ConvVisualizer
  - InputLayer
  - ConvLayer1
  - PoolLayer1 (Pooling)
  - ConvLayer2
  - PoolLayer2 (Pooling)
  - ConnectLayer1
  - ConnectLayer2
  - Softmax / OutputLayer
- NeuralNet
  - NeuralNetInput
  - NeuralNetHiddenLayer
  - Neuron
  - NeuralNetOutput
  - Tooltip

### Timeline

###### Day 1
- **Jin** - Make the basic user interface / layout of the app
- **Ahmed** - Make D3 components basic layout w/i the app. Component spacing and layout
setup.
- **Steven** - Build architecture free ANN, capable of arbitrary number of nodes and layers. Part I

###### Day 2
- **Jin** - Add basic visual representation of the ANN (inputs, hidden layers, neurons, outputs, synapses)
- **Ahmed** - Render Input field box in D3. Ensure Input component is bound to data (aka store) as the single-source-of-truth.
- **Steven** - Build architecture free ANN, capable of arbitrary number of nodes and layers. Part II

###### Day 3
- **Jin** - Connect visual representations of the ANN to the actual ANN logic
- **Ahmed** - Render Convolution field box in D3. Ensure convolution boxes are bound to data (aka store) as the single-source-of-truth.
- **Steven** - Add in neural network visualization data sets.

###### Day 4
- **Jin** - Continue connecting visual representations of the ANN to the actual ANN logic. Add
predicted results to phase A sidebar.
- **Ahmed** - Render pooling field boxes. Ensure Pooling boxes are bound to data (aka store) as the single-source-of-truth.
- **Steven** - Work with Jin to connect the ANN w/ the frontend rendering; start adding in breakpoint capabilities in neural network training.

###### Day 5
- **Jin** - Add visual tooltips for each step of the ANN, make breakpoints for each step of the walkthrough
- **Ahmed** - Connection diagrams, mouse-over neuron connections, and color gradients.
- **Steven** - Work w/ more frontend integration and work on project polishing;

###### Day 6
- **Jin** - Finish up styling and smooth out the user experience of the walkthrough
- Ahmed  - saved for polish, critique, and last-minute changes.
- **Steven** - Help w/ project polishing;
