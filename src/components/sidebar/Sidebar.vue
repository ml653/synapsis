<template>
  <div v-bind:class="fixed ? 'sidebar fixed' : 'sidebar unfixed'">
    <div class="top-sidebar">
      <div id='test'></div>
      <brand></brand>
      <info></info>
    </div>
    <stats
      :stats="stats"
      :isTraining="isTraining"
      :toggleTraining="toggleTraining"
    ></stats>
    <results :results="results"></results>
  </div>
</template>

<script>
import Brand from './Brand';
import Info from './Info';
import Stats from './Stats';
import Results from './Results';

export default {
  name: 'sidebar',
  props: ["fixed", "stats", "results", "isTraining", "toggleTraining"],
  components: {
    Brand,
    Info,
    Stats,
    Results
  }
};
</script>
