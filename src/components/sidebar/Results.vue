<template>
  <div class="results">
    <h4>Predicted Results:</h4>
    <predicted-result
      v-for="(result, idx) in results"
      :key="'result' + idx"
      :result="result"
    >
    </predicted-result>
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
