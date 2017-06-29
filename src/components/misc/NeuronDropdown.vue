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
      console.log('hey')
      this.$el.style.left = `${this.neuronData.x + 30}px`;
      this.$el.style.top = `${this.neuronData.y - 7}px`;
    }
  }
}
</script>
