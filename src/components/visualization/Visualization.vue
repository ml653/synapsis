<template>
  <div class="visualization">
    <svg id="cnn-viz" width="100%" height="100%">
      <g></g>
    </svg>
  </div>
</template>

<script>
import pojo from '../../../data_structure.js';
export default {
  name: 'visualization',
  data() {
    return {
      convnet: pojo[0]
    };
  },
  mounted: function() {
  },
  methods: {
    getWidths: function() {
      return this.convnet.layers.filter(el => el.layer_type !== "relu").map(el => el.out_depth || el.in_depth);
    }
  },
  components: {
  }
};
</script>
