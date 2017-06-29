<template>
  <div class="neuron-dropdown">
    {{ neuronData.activation }}
    <div class="arrow"></div>
  </div>
</template>

<script>
export default {
  name: 'neuron-dropdown',
  props: ["neuronData"],
  watch: {
    neuronData() {
      this.$el.style.left = `${this.neuronData.x + 25}px`;
      this.$el.style.top = `${this.neuronData.y - 10}px`;
    }
  }
}
</script>
