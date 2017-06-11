<template>
  <div class="predicted-result">
    <div class="predicted-result-num">
      <p>#{{ result.exampleNum }}: </p>
      <p>{{ Math.floor(result.percentAccurate * 100) }}% Accuracy</p>
    </div>
    <i v-if="result.label === result.guessedNumber" class="fa fa-check"></i>
    <i v-else class="fa fa-times"></i>
    <result-image :result="result"></result-image>
    <result-stats :result="result"></result-stats>
  </div>
</template>

<script>
import ResultImage from './ResultImage';
import ResultStats from './ResultStats';

export default {
  name: 'predicted-result',
  props: ["result"],
  components: {
    ResultStats,
    ResultImage
  }
};
</script>
