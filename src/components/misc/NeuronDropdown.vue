<template>
  <div class="neuron-dropdown">
    {{ neuronData.activation }}
  </div>
</template>

<script>
export default {
  name: 'neuron-dropdown',
  props: ["neuronData"],
  watch: {
    neuronData() {
      this.$el.style.left = `${this.neuronData.pos.x + 100}px`;
      this.$el.style.top = `${this.neuronData.pos.y + 20}px`;
    }
  }
}
</script>
