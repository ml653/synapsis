<template>
  <div class="app-wrapper">
    <div class="visualization-wrapper">
      <sidebar :stats="stats" :fixed="fixedSidebar"></sidebar>
      <visualization></visualization>
    </div>
    <neural-net></neural-net>
  </div>
</template>

<script>
import Sidebar from './sidebar/Sidebar';
import Visualization from './visualization/Visualization.vue';
import NeuralNet from './neural-net/NeuralNet';

export default {
  name: 'hello',
  components: {
    Sidebar,
    Visualization,
    NeuralNet
  },
  mounted() {
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
    });

    // const nn = new MNISTNeuralNetwork(this.updateStats);

    var myWorker = new Worker('/static/synapsis/bundle_neural_network.js');
    myWorker.postMessage("");

  },
  data() {
    return {
      fixedSidebar: true,
      stats: {
        trainAcc: 0,
        valAcc: 0,
        examples: 0
      }
    }
  },
  methods: {
    updateStats(stats) {
      this.stats = stats;
    }
  }
};
</script>
