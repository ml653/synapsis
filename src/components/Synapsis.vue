<template>
  <div class="app-wrapper">
    <div class="visualization-wrapper">
      <sidebar :fixed="fixedSidebar"></sidebar>
      <visualization></visualization>
    </div>
    <neural-net></neural-net>
  </div>
</template>

<script>
import Sidebar from './sidebar/Sidebar';
import Visualization from './visualization/Visualization.vue';
import NeuralNet from './neural-net/NeuralNet';

export default {
  name: 'hello',
  components: {
    Sidebar,
    Visualization,
    NeuralNet
  },
  mounted() {
    document.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight) {
        if (this.fixedSidebar) {
          this.fixedSidebar = false;
        }
      } else {
        if (!this.fixedSidebar) {
          this.fixedSidebar = true;
        }
      }
    })
  },
  data() {
    return {
      fixedSidebar: true
    }
  }
};
</script>
