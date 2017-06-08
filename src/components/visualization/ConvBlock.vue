<template>
  <g>
  <rect v-for="n in (width * height)" :x="getCol(n)" :y="getRow(n)" :width="scale()" :height="scale()" fill="limegreen"></rect> 
  </g>
</template>

<script>
  import * as d3 from 'd3';
  const SCALE = 8;
  export default {
    name: "conv-block",
    props: ['block', 'width', 'height'],
    mounted: function() {
      const me = d3.select(this.$el);
      this.rekts = me.selectAll("rect");
      this.cLerp = d3.scaleLinear()
        .domain([this.block.min, this.block.max])
        .range(['limegreen', 'darkgreen']);
      this.dThree(this.block);
    },
    watch: {
      block: function(newValue) {
        this.dThree(newValue);
      }
    },
    methods: {
      mult: function() {
        return this.width * SCALE;
      },
      getRow: function(n) {
        return Math.floor((n - 1) / this.width) * SCALE;
      },
      getCol: function(n) {
        return (n - 1) % this.width * SCALE;
      },
      scale: function() {
        return SCALE;
      },
      dThree: function(blk) {
        this.rekts.data(blk.neurons);
        var t = d3.transition()
          .duration(2000)
          .ease(d3.easeLinear);

        this.rekts
          .transition(t)
          .attr("fill", d => this.cLerp(d.activation));
      }
    }
  }
</script>