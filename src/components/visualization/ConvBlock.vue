<template>
  <rect :width="mult()" :height="mult()" class="conv-block" style="fill:#a3e09a"></rect>
</template>

<script>
  export default {
    name: "conv-block",
    props: ['layer'],
    methods: {
      mult: function() {
        return this.layer.out_sx * 5;
      }
    }
  }
</script>