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
      convnet: pojo
    };
  },
  mounted: function() {
  },
  components: {

  }

};
</script>
