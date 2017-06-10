<template>
  <div v-bind:class="fixed ? 'sidebar fixed' : 'sidebar unfixed'">
    <div class="top-sidebar">
      <div id='test'/>
      <brand></brand>
      <info></info>
    </div>
    <current-status
      :isTraining="isTraining"
      :toggleTraining="toggleTraining"
    ></current-status>
    <stats :stats="stats"></stats>
    <results :results="results"></results>
  </div>
</template>

<script>
import Brand from './Brand';
import Info from './Info';
import CurrentStatus from './CurrentStatus';
import Stats from './Stats';
import Results from './Results';

export default {
  name: 'sidebar',
  props: ["fixed", "stats", "results", "isTraining", "toggleTraining"],
  components: {
    Brand,
    Info,
    CurrentStatus,
    Stats,
    Results
  }
};
</script>
