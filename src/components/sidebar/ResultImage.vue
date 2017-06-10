<template>
  <canvas width="48px" height="48px">
  </canvas>
</template>

<script>
import { make2DArr, grabActivations } from '../../utils';

export default {
  name: 'result-image',
  props: ["result"],
  methods: {
    drawLayer() {
      const grid = this.$el;
      const ctx = grid.getContext("2d");
      const { activations, max } = this.result;
      const dim = activations.length

      this.result.activations.forEach((row, idx) => {
        for (let i = 0; i < row.length; i++) {
          let fill = (row[i] + max) * 255;
          ctx.fillStyle = `rgb(${fill}, ${fill}, ${fill})`;
          ctx.fillRect(i * 2, idx * 2, dim * 2, dim * 2);
        }
      })
    },
  },
  mounted() {
    this.drawLayer();
  },
  watch: {
    result() {
      this.drawLayer();
    }
  }
};
</script>
