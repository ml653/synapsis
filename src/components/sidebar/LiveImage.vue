<template>
  <canvas style="border: 1px solid red" width="48px" height="48px">
    {{ block }}
  </canvas>
</template>

<script>
import { make2DArr, grabActivations } from '../../utils';

export default {
  name: 'live-image',
  props: ["block", "max", "dim"],
  computed: {
    activations() {
      return make2DArr(grabActivations(this.block), this.dim);
    }
  },
  methods: {
    drawLayer() {
      const grid = this.$el;
      const ctx = grid.getContext("2d");
      console.log(this.activations)
      this.activations.forEach((row, idx) => {
        for (let i = 0; i < row.length; i++) {
          let fill = (row[i] + this.max) * 255;
          ctx.fillStyle = `rgb(${fill}, ${fill}, ${fill})`;
          ctx.fillRect(i * 2, idx * 2, this.dim * 2, this.dim * 2);
        }
      })
    },
  },
  mounted() {
    this.drawLayer();
  },
  watch: {
    block() {
      this.drawLayer();
    }
  }
};
</script>
