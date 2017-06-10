<template>
  <div class="app-wrapper">
    <div class="visualization-wrapper">
      <sidebar
        :stats="stats"
        :fixed="fixedSidebar"
        :isTraining="isTraining"
        :toggleTraining="toggleTraining"
        :results="results"
      ></sidebar>
      <visualization></visualization>
    </div>
    <!--<neural-net></neural-net>-->
  </div>
</template>

<script>
import Sidebar from './sidebar/Sidebar';
import Visualization from './visualization/Visualization.vue';
import NeuralNet from './neural-net/NeuralNet';
import ImportUtil from '../synapsis/import_util';
import extractLayers from "../synapsis/extract_layers";
import { make2DArr, grabActivations, findTopGuess } from '../utils';

export default {
  name: 'synapsis',
  components: {
    Sidebar,
    Visualization,
    NeuralNet
  },
  mounted() {
    // this.addSidebarListener();
    this.worker = new SharedWorker('/static/synapsis/bundle_neural_network.js');
    async function startWebworker(){
      const importUtil = new ImportUtil();
      await importUtil.loadAll();

      this.worker.port.addEventListener("message", (e) => {
        if (e.data.type === 'STATS'){
          this.updateStats(e.data.message);
        } else if (e.data.type === "NET") {
          this.updateLabel(e.data.message.label);
          this.updateLayers(extractLayers(e.data.message.net))
          this.updateResults(e.data.message.predictions)
        } else if (e.data.type === "MESSAGE") {
          console.log(e.data.e);
        }
        if (e.data.error) {
          console.error(e.data);
        }
      }, false);


      console.log(importUtil.getParams());

      this.worker.port.start();

      // post a message to the shared web this.worker
      this.worker.port.postMessage({
        type: "INITIALIZE",
        params: importUtil.getParams()
      });
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
      label: null,
      layers: [],
      isTraining: true,
      results: []
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
    updateLabel(label) {
      this.label = label;
    },
    updateResults(predictionData) {
      const inputLayerBlock = this.layers[0].blocks[0];
      const inputLayerDim = this.layers[0].x
      const guessed = findTopGuess(predictionData);

      const result = {
        label: this.label,
        activations: make2DArr(grabActivations(inputLayerBlock), inputLayerDim),
        predictions: predictionData,
        max: inputLayerBlock.max,
        guessedProb: guessed.guessedProb,
        guessedNumber: guessed.guessedNumber
      };

      if (this.results.length >= 5) {
        this.results.pop();
      }

      this.results.unshift(result);
    },
    // addSidebarListener() {
    //   // 'Unfixes' the sidebar when it hits the 2nd part of the page
    //   document.addEventListener('scroll', () => {
    //     if (window.scrollY > window.innerHeight) {
    //       if (this.fixedSidebar) {
    //         this.fixedSidebar = false;
    //       }
    //     } else {
    //       if (!this.fixedSidebar) {
    //         this.fixedSidebar = true;
    //       }
    //     }
    //   })
    // },
    toggleTraining() {
      // Passed down to > sidebar > current-status
      this.isTraining = !this.isTraining;
      if (this.isTraining) {
        this.worker.port.postMessage({ type: "RUN" });
      } else {
        this.worker.port.postMessage({ type: "PAUSE" });
      }
    }
  }
};
</script>
