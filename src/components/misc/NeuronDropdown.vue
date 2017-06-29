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
<<<<<<< HEAD
      this.$el.style.left = `${this.neuronData.x + 25}px`;
      this.$el.style.top = `${this.neuronData.y - 10}px`;
=======
      this.$el.style.left = `${this.neuronData.x + 30}px`;
      this.$el.style.top = `${this.neuronData.y - 7}px`;
>>>>>>> 232014f25b9b346deecf789d63fa61abeaaee7c0
    }
  }
}
</script>
