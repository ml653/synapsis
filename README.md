# Synapsis

## Background and Overview

Machine learning and neural networks are topics that seem daunting from a layman's point of view. We aim to demystify these topics by showing what machine learning & neural networks are capable of followed by a walkthrough of what is going on behind the scenes.

In Synapsis, a convoluted neural network will be trained live to recognize handwritten digits from 0-9. The training process will be visualized with interesting, interactive, and informative visual animations.

## Functionality and MVP
##### MVPs:

CNN = Convoluted Neural Network

- Train CNN live in browser
- Display every layer of the CNN
- Display connections between each layer of the CNN
- CNN is able to predict handwritten numbers with at least 90% accuracy within the first 2 minutes

##### Bonus:
ANN = Artificial Neural Network
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

- Utilize ConvNet to train on and learn MNIST dataset
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

### Timeline

###### Day 1
- **Jin** - Make the basic user interface / layout of the app.
- **Ahmed** - Make D3 components basic layout w/i the app. Component spacing and layout
setup.
- **Steven** - Build architecture free ANN, capable of arbitrary number of nodes and layers. Part I
- **Trevor** - Set up simple version of the ConvNet architecture.

###### Day 2
- **Jin** - Work on architecting the data store and hierarchy of Vue components.
- **Ahmed** - Render Input field box in D3. Ensure Input component is bound to data (aka store) as the single-source-of-truth.
- **Steven** - Build architecture free ANN, capable of arbitrary number of nodes and layers. Part II
- **Trevor** - Set up handling of MNIST data (pre-training).

###### Day 3
- **Jin** - Style the sticky sidebar and make basic visual representations of training stats and results.
- **Ahmed** - Render Convolution field box in D3. Ensure convolution boxes are bound to data (aka store) as the single-source-of-truth.
- **Steven** - Add in neural network visualization data sets.
- **Trevor** - Configure network to specifically learn on MNIST data. Part I

###### Day 4
- **Jin** - Connect the sticky sidebar to use the stats data and results data coming in from the 'backend' logic.
- **Ahmed** - Render pooling field boxes. Ensure Pooling boxes are bound to data (aka store) as the single-source-of-truth.
- **Steven** - Work with Jin to connect the ANN w/ the frontend rendering; start adding in breakpoint capabilities in neural network training.
- **Trevor** - Configure network to specifically learn on MNIST data. Part II

###### Day 5
- **Jin** - Style up the sidebar and help out with D3 visualization if applicable.
- **Ahmed** - Connection diagrams, mouse-over neuron connections, and color gradients.
- **Steven** - Work w/ more frontend integration and work on project polishing.
- **Trevor** - Set up periodic calls to send network snapshot to the frontend.

###### Day 6
- **Jin** - Finish up styling and smooth out the user experience.
- **Ahmed** - saved for polish, critique, and last-minute changes.
- **Steven** - Help w/ project polishing.
- **Trevor** - Troubleshoot issues with connecting with the frontend.
