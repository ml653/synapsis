<template>
  <g>
  <rect v-for="n in (width * height)" :x="getCol(n)" :y="getRow(n)" :width="scale()" :height="scale()" fill="green"></rect> 
  </g>
</template>

<script>
  const SCALE = 8;
  export default {
    name: "conv-block",
    props: ['block', 'width', 'height'],
    watch: {
      block: function(newValue) {
        console.log("CHANGE DETECTED");
      }
    },
    methods: {
      mult: function() {
        return this.width * SCALE;
      },
      getRow: function(n) {
        return (n - 1) % this.width * SCALE;
      },
      getCol: function(n) {
        return Math.floor((n - 1) / this.width) * SCALE;
      },
      scale: function() {
        return SCALE;
      }
    }
  }
</script>