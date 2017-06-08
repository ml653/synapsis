<template>
  <div class="stats">
    <h4>Training Stats:</h4>
    <div>Training accuracy: {{ stats.trainAcc > 0 ? Math.round(stats.trainAcc * 100) / 100 : 0 }}</div>
    <div>Validation accuracy: {{ stats.valAcc > 0 ? Math.round(stats.valAcc * 100) / 100 : 0 }}</div>
    <div>Examples seen: {{ stats.examples }}</div>
  </div>
</template>

<script>
export default {
  name: 'stats',
  props: ["stats"]
};
</script>
