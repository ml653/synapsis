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
  props: ['layers', 'updateNeuronData'],
  watch: {
    layers: function(newLayers) {
      if(!this.visualizer) {
        this.visualizer = new CnnVisualizer(this.canvasEl, newLayers, this.updateNeuronData);
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
        const data = this.visualizer.mousemove(
          e.pageX - this.canvasEl.offsetLeft,
          e.pageY - this.canvasEl.offsetTop
        );
        if (data) {
          data.x = e.pageX - window.scrollX;
          data.y = e.pageY - window.scrollY;
          switch (data.layer) {
            case 1:
              data.layerType = "Convolutional Layer 1";
              break;
            case 2:
              data.layerType = "Pooling Layer 1";
              break;
            case 3:
              data.layerType = "Convolutional Layer 2";
              break;
            case 4:
              data.layerType = "Pooling Layer 2";
              break;
            case 5:
              data.layerType = "Fully Connected Layer";
              break;
            case 6:
              data.layerType = "Softmax Layer";
              break;
          }
        };

        this.updateNeuronData(data);
      }
    },
    workerType: function() {
      return typeof(Worker);
    },
  }
};
</script>

