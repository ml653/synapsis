<template>
  <div class="visualization">
    <svg id="cnn-viz" width="100%" height="100%">
      <defs xmlns="http://www.w3.org/2000/svg">
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
          <feOffset dx="2" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
          </feComponentTransfer>
          <feMerge> 
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/> 
          </feMerge>
        </filter>
      </defs>
      <g v-for="(layer, row) in convnet">
        <g v-for="(n, col) in layer.z" class="activationContainer" filter="url(#dropshadow)" :data-row="row" :data-col="col">
          <conv-block :width="layer.x" :height="layer.y" :block="layer.blocks[col]">
          </conv-block>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import pojo from '../../../data_structure.js';
import * as d3 from 'd3';
import ConvBlock from './ConvBlock';
const SCALE = 8;
export default {
  name: 'visualization',
  data() {
    return {
      convnet: pojo[0]
    };
  },
  mounted: function() {
    window.addEventListener("resize", this.layoutContainers);
    this.layoutContainers();
    this.idx = 1;
    window.setInterval(el => {
      this.convnet = pojo[this.idx];
      this.idx = (this.idx + 1) % pojo.length;
      console.log("switched");
    }, 5000);
  },
  destroyed: function() {
    window.removeEventListener("resize", this.layoutContainers);
  },
  methods: {
    formatLayer: function(layer) {
      return layer;
    },
    layoutContainers: function(e) {
      const bbox = document.getElementById("cnn-viz").getBoundingClientRect();
      const activations = document.querySelectorAll(".activationContainer");
      for(let i=0;i<activations.length;i++) {
        const activation = activations[i];
        const row = parseInt(activation.getAttribute("data-row"));
        const col = parseInt(activation.getAttribute("data-col"));
        const layer = this.convnet[row];
        // a is the width of the layer
        const a = layer.z;
        // width is the width of each box
        const width = layer.x * SCALE;
        const dx = this.getDeltaX(bbox.width, width, a, col);
        activation.setAttribute("transform", `translate(${dx},${this.getDeltaY(row)})`);
      }
    },
    getDeltaX: function(totalW, w, a, c) {
      let s = totalW / a - w;
      return (c * w + c * s + s / 2);
    },
    getDeltaY: function(row) {
      let dr = 50;
      for(let i=0;i<row;i++) {
        dr += this.convnet[i].y * SCALE + 150;
      }
      return dr;
    }
  },
  components: {
    ConvBlock
  }
};
</script>

