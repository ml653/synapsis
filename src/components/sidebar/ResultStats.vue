<template>
  <div>
    <div class="result-stat" v-for="(prediction, idx) in predictions">
      {{ prediction.k }}
      <div v-if="idx === 0 && prediction.k === num" class="result-stat-bar" style="width: 100px; background-color: #39952B;"></div>
      <div v-else-if="idx === 0 && prediction.k !== num" class="result-stat-bar" style="width: 100px; background-color: #c0392b;"></div>
      <div v-else-if="prediction.k === num" class="result-stat-bar" v-bind:style="`width: ${(prediction.p / highestProb ) * 100 }px; background-color: #39952B;`"></div>
      <div v-else="prediction.k === num" class="result-stat-bar" v-bind:style="`width: ${(prediction.p / highestProb ) * 100 }px; background-color: #c0392b;`"></div>
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
  mounted() {
    console.log(this.predictions)
  }
};
</script>
