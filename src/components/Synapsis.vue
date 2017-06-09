<template>
  <div class="app-wrapper">
    <div class="visualization-wrapper">
      <sidebar
        :stats="stats"
        :fixed="fixedSidebar"
        :layers="layers"
        :isTraining="isTraining"
        :toggleTraining="toggleTraining"
      ></sidebar>
      <visualization></visualization>
    </div>
    <neural-net></neural-net>
  </div>
</template>

<script>
import Sidebar from './sidebar/Sidebar';
import Visualization from './visualization/Visualization.vue';
import NeuralNet from './neural-net/NeuralNet';
import MNISTNeuralNetwork from '../synapsis/mnist_neural_network';

export default {
  name: 'hello',
  components: {
    Sidebar,
    Visualization,
    NeuralNet
  },
  mounted() {
    this.addSidebarListener();

    // Initialize and run the neural network
    const nn = new MNISTNeuralNetwork(this.updateStats, this.updateLayers);
    nn.run();
  },
  data() {
    return {
      fixedSidebar: true,
      stats: {
        trainAcc: 0,
        valAcc: 0,
        examples: 0
      },
      layers: [],
      isTraining: true
    }
  },
  methods: {
    // These methods are used by the neural network to feed data back up
    updateStats(stats) {
      this.stats = stats;
    },
    updateLayers(layers) {
      this.layers = layers;
    },
    addSidebarListener() {
      // 'Unfixes' the sidebar when it hits the 2nd part of the page
      document.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
          if (this.fixedSidebar) {
            this.fixedSidebar = false;
          }
        } else {
          if (!this.fixedSidebar) {
            this.fixedSidebar = true;
          }
        }
      })
    },
    toggleTraining() {
      // Passed down to > sidebar > current-status
      console.log('training status = ', this.isTraining)
      this.isTraining = !this.isTraining;
    }
  }
};
</script>
