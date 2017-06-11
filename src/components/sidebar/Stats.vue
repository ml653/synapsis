<template>
  <div class="stats-wrapper">
    <div class="training-header">
      <div class="live-blinker">
        <i v-if="isTraining" class="fa fa-circle"></i>
      </div>
      <h4>Training Stats:</h4>
    </div>
    <div class="stats">
      <div class="training-status">

        <div v-if="isTraining">
          <i @click="toggleTraining" class="fa fa-pause"></i>
        </div>

        <div v-else>
          <i @click="toggleTraining" class="fa fa-play"></i>
        </div>
      </div>

      <div>
        <div>Training accuracy: {{ stats.trainAcc > 0 ? Math.round(stats.trainAcc * 100) / 100 : 0 }}</div>
        <div>Validation accuracy: {{ stats.valAcc > 0 ? Math.round(stats.valAcc * 100) / 100 : 0 }}</div>
        <div>Examples seen: {{ stats.examples }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stats',
  props: ["stats", "isTraining", "toggleTraining"]
};
</script>
