<template>
  <div class="app-wrapper">
    <sidebar></sidebar>
    <visualization></visualization>
  </div>
</template>

<script>
import Sidebar from './sidebar/Sidebar';
import Visualization from './Visualization'

export default {
  name: 'hello',
  components: {
    Sidebar,
    Visualization
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>
