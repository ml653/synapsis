<template>
  <div class="current-status">
    <div v-if="isTraining">
      <div class="training-status">
        Training Live
        <i class="fa fa-circle"></i>
      </div>
      <i @click="toggleTraining" class="fa fa-pause"></i>
    </div>

    <div v-else>
      <h4>Training Paused</h4>
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
