<template>
  <rect :width="mult()" :height="mult()" class="conv-block" style="fill:#a3e09a"></rect>
</template>

<script>
  export default {
    name: "conv-block",
    props: ['block'],
    mounted() {
    },
    methods: {
      mult: function() {
        return this.layer.y * 5;
      }
    }
  }
</script>