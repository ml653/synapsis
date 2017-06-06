<template>
  <div class="results">
    <h4>Predicted Results:</h4>
    <div class="prediction-result" v-for="(dataVals, idx) in dataset" :key="'result'+idx">
      <result-image :dataVals="dataVals"></result-image>
    </div>
  </div>
</template>

<script>
import dataset from '../../../inputDataset';
import ResultImage from './ResultImage';

export default {
  name: 'results',
  components: {
    ResultImage
  },
  data() {
    return {
      dataset
    };
  }
};
</script>
