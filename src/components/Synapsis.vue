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
import ImportUtil from '../synapsis/import_util';

export default {
  name: 'hello',
  components: {
    Sidebar,
    Visualization,
    NeuralNet
  },
  mounted() {
    this.addSidebarListener();

    async function startWebworker(){
      const importUtil = new ImportUtil();
      await importUtil.loadAll();

      var worker = new SharedWorker('/static/synapsis/bundle_neural_network.js');

      worker.port.addEventListener("message", (e) => {
        if(e.data.type === 'STATS'){
          this.updateStats(e.data.message);
        } else if (e.data.type === "NET") {
          console.log('somethingsomething')
          console.log(e.data.message);
        }
        console.log(e.data);
      }, false);


      console.log(importUtil.getParams());

      worker.port.start();

      // post a message to the shared web worker

      worker.port.postMessage(importUtil.getParams());
    }
    startWebworker = startWebworker.bind(this);
    startWebworker();
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
