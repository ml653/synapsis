<template>
  <div class="sidebar">
  <brand></brand>
  <info></info>
  <stats></stats>
  <results></results>
  </div>
</template>

<script>
import Brand from './Brand';
import Info from './Info';
import Stats from './Stats';
import Results from './Results';

export default {
  name: 'sidebar',
  components: {
    Brand,
    Info,
    Stats,
    Results
  }
};
</script>
