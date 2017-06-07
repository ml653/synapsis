<template>
  <div class="app-wrapper">
    <sidebar></sidebar>
    <visualization></visualization>
  </div>
</template>

<script>
import Sidebar from './sidebar/Sidebar';
import Visualization from './visualization/Visualization.vue';

export default {
  name: 'hello',
  components: {
    Sidebar,
    Visualization
  }
};
</script>
