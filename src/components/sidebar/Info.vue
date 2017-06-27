<template>
  <div class="info">
    <a href="https://github.com/ml653/synapsis" target="_blank">
      <i class="fa fa-github"></i>
    </a>
    <i class="fa fa-question-circle-o" v-on:click="handleInfoClick"></i>

    <div v-if="showTooltip" class="info-tooltip" v-on:click="stopPropagation">
      <i class="fa fa-times" v-on:click="handleInfoClick"></i>

        <progress-bar :currentMsg="currentMsg" :messages="messages"></progress-bar>

        <transition-group :name=" direction === 'NEXT' ? 'slide-left' : 'slide-right'">
          <div
            class="tooltip-message"
            :key="idx"
            v-for="(message, idx) in messages"
            v-if="idx === currentMsg"
            v-html="message">
          </div>
        </transition-group>

        <div class="tooltip-arrow"></div>

        <tooltip-buttons
          :currentMsg="currentMsg"
          :length="messages.length"
          :nextMsg="nextMsg"
          :prevMsg="prevMsg">
        </tooltip-buttons>
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar';
import TooltipButtons from './TooltipButtons';

export default {
  name: 'info',
  components: {
    ProgressBar,
    TooltipButtons
  },
  methods: {
    handleInfoClick() {
      this.showTooltip = !this.showTooltip;
    },
    nextMsg() {
      this.currentMsg += 1;
      this.direction = "NEXT"
    },
    prevMsg() {
      this.currentMsg -= 1;
      this.direction = "PREV"
    },
    stopPropagation(e) {
      e.stopPropagation();
    }
  },
  data() {
    return {
      showTooltip: true,
      currentMsg: 0,
      direction: "NEXT",
      messages: [
        `
          <h3>Welcome to Synapsis!</h3>
          <br>
          Watch a
          <a target="_blank" href="https://en.wikipedia.org/wiki/Convolutional_neural_network">
            Convolutional Neural Network
          </a>
          train itself live to recognize
          handwritten numbers!
          <br><br>
          Click next to find out more about what is
          going on behind the scenes.
        `,
        `
          The handwritten numbers on the left were fed into the neural network.
          <br><br>
          This is the dataset that the neural network is using to train itself
          to recognize handwriting.
          <br><br>
        `,
        `
          For each number, 0-9, the neural network outputs a probability.
          The probability is how confident it thinks that this is the correct number.
          <br><br>
          The <strong>histogram</strong> represents these probabilities.
          <br><br>
          The <strong style="color: #f39c12">orange</strong> number represents the neural network's top guess.
        `,
        `
          For each guess, the neural network will strengthen or weaken its neurons.
          <br><br>
          Each neuron that contributed to the
          <strong style="color: #e74c3c">wrong</strong> answer will get weaker.
          <br><br>
          Each neuron that contributed to the
          <strong style="color: #5CB34E">right</strong> answer will get stronger.
        `
      ]
    };
  },
  mounted() {
    document.addEventListener('click', e => {
      // Check for string prevents weird interactions with SVG elements
      if (typeof e.target.className === "string"
        && e.target.className.includes("fa-question-circle-o")) {
        e.stopPropagation();
      } else if (this.showTooltip) {
        this.handleInfoClick();
      }
    });
  }
};
</script>
