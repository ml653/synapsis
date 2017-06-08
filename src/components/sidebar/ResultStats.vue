<template>
  <div>
    <div class="result-stat" v-for="(prediction, idx) in predictions">
      {{ prediction.k }}

<!-- If top prediction and is correct, render green bar -->
      <div
        v-if="idx === 0 && prediction.k === num"
        class="result-stat-bar"
        style="width: 100px; background-color: #39952B;">
      </div>

<!-- If top prediction and is incorrect, render red bar -->
      <div
        v-else-if="idx === 0 && prediction.k !== num"
        class="result-stat-bar"
        style="width: 100px; background-color: #c0392b;">
      </div>

<!-- If not top prediction and is correct, render green bar thats proportional to top prediction -->
      <div
        v-else-if="prediction.k === num"
        class="result-stat-bar"
        v-bind:style="`width: ${ findPercentAcc(prediction) }px; background-color: #39952B;`">
      </div>

<!-- If not top prediction and is incorrect, render red bar thats proportional to top prediction -->
      <div
        v-else="prediction.k === num"
        class="result-stat-bar"
        v-bind:style="`width: ${ findPercentAcc(prediction) }px; background-color: #c0392b;`">
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'result-stats',
  props: ["dataVals"],
  data() {
    return {
      num: this.dataVals.num,
      predictions: [
        this.dataVals.predictions[0],
        this.dataVals.predictions[1],
        this.dataVals.predictions[2]
      ],
      highestProb: this.dataVals.predictions[0].p
    };
  },
  methods: {
    findPercentAcc(prediction) {
      return (prediction.p / this.highestProb) * 100;
    }
  }
};
</script>
