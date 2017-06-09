<template>
  <div class="current-status">
    <div v-if="isTraining">
      <h4>Status: Training Live</h4>
      <i @click="toggleTraining" class="fa fa-pause"></i>
    </div>

    <div v-else>
      <h4>Status: Training Paused</h4>
      <i @click="toggleTraining" class="fa fa-play"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'current-status',
  props: ["isTraining", "toggleTraining"]
};
</script>
