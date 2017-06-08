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
import MNISTNeuralNetwork from '../synapsis/mnist_neural_network';
import ImportUtil from '../synapsis/import_util';

export default {
  name: 'hello',
  components: {
    Sidebar,
    Visualization,
    NeuralNet
  },
  mounted() {
    // document.addEventListener('scroll', () => {
    //   if (window.scrollY > window.innerHeight) {
    //     if (this.fixedSidebar) {
    //       this.fixedSidebar = false;
    //     }
    //   } else {
    //     if (!this.fixedSidebar) {
    //       this.fixedSidebar = true;
    //     }
    //   }
    // })

    console.log('Synapsis.vue => mounted :)')

    async function startWebworker(){
      const importUtil = new ImportUtil()
      await importUtil.loadAll()
      console.log(importUtil.img_data)
    }
    startWebworker()
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
