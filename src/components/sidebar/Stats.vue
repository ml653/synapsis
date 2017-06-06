<template>
  <div class="stats">
    <h4>Training Stats:</h4>
    <div>Training accuracy: {{ trainingAcc }}</div>
    <div>Validation accuracy: {{ validationAcc }}</div>
    <div>Examples seen: {{ numExamples }}</div>
  </div>
</template>

<script>
export default {
  name: 'stats',
  data() {
    return {
      trainingAcc: 0.76,
      validationAcc: 0.67,
      numExamples: 258
    };
  }
};
</script>
