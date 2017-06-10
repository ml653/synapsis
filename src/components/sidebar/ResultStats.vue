<template>
  <div class="result-stat-wrapper">
    <div class="result-stat" v-for="(prediction, idx) in result.predictions">
<!-- If top prediction and is correct, render green bar -->
      <div
        v-if="prediction.p === result.guessedProb"
        class="result-stat-bar correct"
        style="height: 30px; background-color: #f39c12;">
      </div>

      <div
        v-else
        class="result-stat-bar"
        :style="`height: ${ findPercentAcc(prediction) }px;`">
      </div>

      <p :style="prediction.p === result.guessedProb && 'color: #f39c12'">
        {{ prediction.k }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'result-stats',
  props: ["result"],
  methods: {
    findPercentAcc(prediction) {
      return (prediction.p / this.result.guessedProb) * 30;
    },
  }
};
</script>
