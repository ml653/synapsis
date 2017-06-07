<template>
  <canvas width="48px" height="48px">
  </canvas>
</template>

<script>
import { make2DArr } from '../../utils';

export default {
  name: 'result-image',
  props: ["dataVals"],
  data() {
    return {
      dim: this.dataVals.sx,
      vals: make2DArr(Object.values(this.dataVals.w), this.dataVals.sx)
    };
  },
  methods: {
    drawImg() {
      const grid = this.$el;
      const ctx = grid.getContext("2d");
      this.vals.forEach((row, idx) => {
        for (let i = 0; i < row.length; i++) {
          let fill = row[i] * 255;
          ctx.fillStyle = `rgb(${fill}, ${fill}, ${fill})`;
          ctx.fillRect(i * 2, idx * 2, this.dim * 2, this.dim * 2);
        }
      })
    }
  },
  mounted() {
    this.drawImg();
  }
};
</script>
