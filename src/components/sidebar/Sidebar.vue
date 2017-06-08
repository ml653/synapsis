<template>
  <div v-bind:class="fixed ? 'sidebar fixed' : 'sidebar unfixed'">
    <div class="top-sidebar">
      <brand></brand>
      <info></info>
    </div>
    <current-layer></current-layer>
    <stats :stats="stats"></stats>
    <results></results>
  </div>
</template>

<script>
import Brand from './Brand';
import Info from './Info';
import CurrentLayer from './CurrentLayer';
import Stats from './Stats';
import Results from './Results';

export default {
  name: 'sidebar',
  props: ["fixed", "stats"],
  components: {
    Brand,
    Info,
    CurrentLayer,
    Stats,
    Results
  }
};
</script>
