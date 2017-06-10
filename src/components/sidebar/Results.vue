<template>
  <div>
    <h4>Predictions:</h4>
    <transition-group name="fade" class="results">
      <predicted-result
        v-for="(result, idx) in results"
        :key="result.guessedNumber + result.guessedProb"
        :result="result"
      >
      </predicted-result>
    </transition-group>
  </div>
</template>

<script>
import PredictedResult from './PredictedResult';

export default {
  name: 'results',
  props: ["results"],
  components: {
    PredictedResult
  }
};
</script>
