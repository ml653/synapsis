<template>
  <div class="app-wrapper">
    <splash-modal v-if="showModal" :handleModalClick="handleModalClick"></splash-modal>
    <div class="visualization-wrapper">
      <sidebar
        :handleInfoClick="handleInfoClick"
        :showTooltip="showTooltip"
        :stats="stats"
        :fixed="fixedSidebar"
        :isTraining="isTraining"
        :toggleTraining="toggleTraining"
        :results="results"
      ></sidebar>
      <visualization :layers="layers"></visualization>
    </div>
  </div>
</template>

<script>
import SplashModal from './misc/SplashModal';
import Sidebar from './sidebar/Sidebar';
import Visualization from './visualization/Visualization.vue';
import NeuralNet from './neural-net/NeuralNet';
import ImportUtil from '../synapsis/import_util';
import extractActivations from "../synapsis/extract_activations";
import * as SynapsisUtils from '../utils';
import merge from '../synapsis/merge'

export default {
  name: 'synapsis',
  components: {
    SplashModal,
    Sidebar,
    Visualization,
    NeuralNet
  },
  mounted() {
    let x = 0
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
          const layers = extractActivations(e.data.message.net)
          this.updateLayers(merge(layers))
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
      showModal: true,
      showTooltip: false,
      fixedSidebar: true,
      stats: {
        trainAcc: 0,
        valAcc: 0,
        examples: 0
      },
      label: null,
      layers: [],
      isTraining: true,
      results: [],
      exampleNum: 1
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
      const guessed = SynapsisUtils.findTopGuess(predictionData);

      const result = {
        label: this.label,
        activations: SynapsisUtils.make2DArr(
          SynapsisUtils.grabActivations(inputLayerBlock),
          inputLayerDim
        ),
        predictions: predictionData,
        min:inputLayerBlock.min,
        max: inputLayerBlock.max,
        guessedProb: guessed.guessedProb,
        guessedNumber: guessed.guessedNumber,
        percentAccurate: predictionData[this.label].p,
        exampleNum: this.exampleNum
      };

      this.updateResultsLength(result);
      this.incrementExampleNum();
    },
    updateResultsLength(result) {
      if (this.results.length >= 5) {
        this.results.pop();
      }
      this.results.unshift(result);
    },
    incrementExampleNum() {
      if (this.exampleNum === 1) {
        this.exampleNum = 100;
      } else {
        this.exampleNum += 100;
      }
    },
    handleModalClick(e) {
      if (this.showModal) {
        e.preventDefault();
        e.stopPropagation();
        this.showModal = false;
        this.handleInfoClick();
      }
    },
    handleInfoClick() {
      this.showTooltip = !this.showTooltip;
    },
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
