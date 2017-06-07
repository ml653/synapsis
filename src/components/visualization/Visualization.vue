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
        <g v-for="(n, col) in layer.width" class="activationContainer" filter="url(#dropshadow)" :data-row="row" :data-col="col">
          <conv-block :layer="layer"></conv-block>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import pojo from '../../../data_structure.js';
import * as d3 from 'd3';
import ConvBlock from './ConvBlock';
export default {
  name: 'visualization',
  data() {
    return {
      convnet: filterPojo(pojo[0])
    };
  },
  mounted: function() {
    window.addEventListener("resize", this.layoutContainers);
    this.layoutContainers();
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
        const a = layer.width;
        // width is the width of each box
        const width = layer.out_sx * 5;
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
        dr += this.convnet[i].out_sy + 150;
      }
      return dr;
    }
  },
  components: {
    ConvBlock
  }
};

// Temporary function
function filterPojo(mPojo) {
  const filtered = mPojo.layers.filter(el => el.layer_type !== "relu");
  const answer = new Array(filtered.length);
  for(let i=0;i<filtered.length;i++) {
    const layer = filtered[i];
    answer.push({
      z: layer.num_inputs || layer.out_depth || layer.in_depth,
      x: layer.out_sx,
      y: layer.out_sy,
      blocks: generateBlocks(x,y,z)
    });
  }
  return answer;
}

function generateBlocks(x, y, z) {
  const blocks = new Array(z);
  for(let i=0;i<blocks.length;i++) {
    blocks[i] = {
      min: 0,
      max: 100,
      neurons: generateNeurons(x,y)
    }
  }
  return blocks;
}

function generateNeurons(x,y) {
  const neurons = new Array(x*y);
  for(let i=0;i<neurons.length;i++) {
    neurons[i] = {
      activation: Math.random() * 100
    };
  }
  return neurons;
}
</script>

