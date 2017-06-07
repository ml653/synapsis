<template>
  <rect :width="mult()" :height="mult()" class="conv-block" style="fill:#a3e09a"></rect>
</template>

<script>
  const SCALE = 5;
  export default {
    name: "conv-block",
    props: ['block', 'width', 'height'],
    mounted() {
    },
    methods: {
      mult: function() {
        return this.width * SCALE;
      }
    }
  }
</script>