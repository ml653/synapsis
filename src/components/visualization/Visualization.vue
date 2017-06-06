<template>
  <div class="visualization">
    <svg id="cnn-viz" width="100%" height="100%">
    </svg>
  </div>
</template>

<script>
import pojo from '../../../data_structure.js';
import * as d3 from 'd3';
export default {
  name: 'visualization',
  data() {
    return {
      convnet: pojo[0].layers.filter(el => el.layer_type !== "relu")
    };
  },
  mounted: function() {
    let rowPadding = 20;
    const vizDom = document.getElementById("cnn-viz");
    const viz = d3.select("#cnn-viz");
    const bbox = vizDom.getBoundingClientRect();
    let dr = 50;
    for(let r=0;r<this.convnet.length;r++) {
      console.log(layer);
      const g = viz.append("g")
        .attr("transform", `translate(0, ${dr})`);
      const layer = this.convnet[r];
      // a is the width of the layer
      const a =  layer.num_inputs || layer.out_depth || layer.in_depth;
      // width is the width of each box
      const width = layer.out_sx * 5;
      const dx = this.getPositions(bbox.width, width, a);
      for(let c=0;c<a;c++) {
        const mg = g.append("g")
          .attr("transform", `translate(${dx(c)},0)`);
        mg.append("rect")
            .attr("width", width)
            .attr("height", width)
            .attr("style", "fill:rgb(0,255,0);");
      }
      dr += width + 100;
    }
  },
  methods: {
    getWidths: function() {
      return this.convnet.map(el => el.out_depth || el.in_depth);
    },
    getHeight: function() {
      return this.convnet.length;
    },
    getPositions: function(totalW, w, a) {
      let s = totalW / a - w;
      return (i) => (i*w + i*s + s/2);
    }
  },
  components: {
  }
};
</script>
