<template>
  <div class="visualization">
    <canvas id="cnn-viz" @mousemove="mousemove"></canvas>
    <div id="compatibility-message" v-if="workerType === undefined">
      <h3>Sorry, but this experiment requires a modern browser</h3>
      <p>Please download a more recent version of your browser</p>
      <p>Thank you for your time</p>
    </div>
  </div>
</template>

<script>
import CnnVisualizer from '../../visualizer/cnn_visualizer.js';
export default {
  name: 'visualization',
  props: ['layers'],
  watch: {
    layers: function(newLayers) {
      if(!this.visualizer) {
        this.visualizer = new CnnVisualizer(this.canvasEl, newLayers);
        window.addEventListener("resize", this.layoutContainers);
        this.layoutContainers();
      }
      this.visualizer.update(newLayers);
    }
  },
  mounted: function() {
    this.canvasEl = document.getElementById("cnn-viz");
  },
  destroyed: function() {
    window.removeEventListener("resize", this.layoutContainers);
  },
  methods: {
    layoutContainers: function(e) {
      const bbox = this.canvasEl.getBoundingClientRect();
      this.visualizer.setSize(bbox.width, bbox.height);
    },
    mousemove: function(e) {
      if(this.visualizer) {
        this.visualizer.mousemove(
          e.pageX - this.canvasEl.offsetLeft,
          e.pageY - this.canvasEl.offsetTop
        );
      }
    },
    workerType: function() {
      return typeof(Worker);
    },
  }
};
</script>

