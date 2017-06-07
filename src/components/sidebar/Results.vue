<template>
  <div class="results">
    <h4>Predicted Results:</h4>
    <div class="prediction-result" v-for="(dataVals, idx) in dataset" :key="'result'+idx">
      <result-image :dataVals="dataVals"></result-image>
      <result-stats :dataVals="dataVals"></result-stats>
    </div>
  </div>
</template>

<script>
import dataset from '../../../inputDataset';
import ResultImage from './ResultImage';
import ResultStats from './ResultStats';

export default {
  name: 'results',
  components: {
    ResultImage,
    ResultStats
  },
  data() {
    return {
      dataset
    };
  }
};
</script>
