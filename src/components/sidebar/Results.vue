<template>
  <div class="results">
    <h4>Predicted Results:</h4>
    <svg id="chart"></svg>
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
import d3 from "d3";
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
  },
  mounted() {
    d3.select('#chart')
    .selectAll("span")
    .data([4, 8, 15, 16, 23, 42])
    .enter()
    .append("span")
    .style("height", (d)=> d + "px")
    .style("width", "20px")
    .style("background", "blue")
  }
};
</script>
