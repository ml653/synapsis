<template>
  <rect :width="mult()" :height="mult()" class="conv-block" style="fill:#a3e09a"></rect>
</template>

<script>
  export default {
    name: "conv-block",
    props: ['layer'],
    mounted() {
      // temporary code is intended to demo the inputs
      this.layer.x = this.layer.out_sx;
      this.layer.y = this.layer.out_sy;
      this.layer.z = this.layer.width;
      this.layer.blocks = new Array(this.layer.x * this.layer.y);
    },
    methods: {
      mult: function() {
        return this.layer.out_sx * 5;
      }
    }
  }
</script>