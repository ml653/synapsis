<template>
  <div class="visualization">
    <canvas id="cnn-viz" @mousemove="mousemove"></canvas>
  </div>
</template>

<script>
import pojo from '../../../data_structure.js';
import CnnVisualizer from '../../visualizer/cnn_visualizer.js';
export default {
  name: 'visualization',
  data() {
    return {
      convnet: pojo[0]
    };
  },
  mounted: function() {
    this.canvasEl = document.getElementById("cnn-viz");
    this.visualizer = new CnnVisualizer(this.canvasEl, this.convnet);
    window.addEventListener("resize", this.layoutContainers);
    this.layoutContainers();
    let idx = 1;
    window.setInterval(el => {
      this.visualizer.update(pojo[idx]);
      idx = (idx + 1) % pojo.length;
    }, 5000);
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
      this.visualizer.mousemove(
        e.pageX - this.canvasEl.offsetLeft,
        e.pageY - this.canvasEl.offsetTop
      );
    }
  }
};
</script>

