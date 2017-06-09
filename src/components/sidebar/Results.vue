<template>
  <div class="results">
    <h4>Predicted Results:</h4>
    <div class="prediction-result" v-for="(dataVals, idx) in dataset" :key="'result'+idx">
      <result-image :dataVals="dataVals"></result-image>
      <result-stats :dataVals="dataVals"></result-stats>
    </div>
    <div v-if="layers[0]">
      <live-image
        v-for="block in layers[0].blocks"
        :block="block"
        :max="block.max"
        :dim="layers[0].x"
      ></live-image>
    </div>
  </div>
</template>

<script>
import dataset from '../../../inputDataset';
import ResultImage from './ResultImage';
import ResultStats from './ResultStats';
import LiveImage from './LiveImage';

export default {
  name: 'results',
  props: ["layers"],
  components: {
    ResultImage,
    ResultStats,
    LiveImage
  },
  data() {
    return {
      dataset
    };
  }
};
</script>
