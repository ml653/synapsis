<template>
  <div :class="neuronDropdown ? 'neuron-dropdown visible' : 'neuron-dropdown hidden'">
    <div class="neuron-stats">
      {{ neuronData.layerType }}
      <br>
      Neuron: {{ neuronData.neuron }}
      <br>
      Filter: {{ neuronData.block }}
      <br>
      <br>
      <div v-if="neuronDropdown">
        {{ renderActivation() }}
      </div>
    </div>

    <div class="arrow"></div>
  </div>
</template>

<script>
export default {
  name: 'neuron-dropdown',
  props: [ "neuronDropdown", "neuronData", "layers"],
  watch: {
    neuronData() {
      this.$el.style.left = `${this.neuronData.x + 25}px`;
      this.$el.style.top = `${this.neuronData.y - 10}px`;
    }
  },
  methods: {
    renderActivation() {
      const { layers, neuronData } = this;
      const block = layers[neuronData.layer].blocks[neuronData.block];
      const neuron = block.neurons[neuronData.neuron];
      if (neuron) {
        return "Activation: " + neuron.activation.toFixed(5);
      }
    }
  }
}
</script>
