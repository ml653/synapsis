<template>
  <div class="info">
    <a href="https://github.com/ml653/synapsis" target="_blank">
      <i class="fa fa-github" />
    </a>
    <i class="fa fa-question-circle-o" v-on:click="handleInfoClick" />
    <div v-if="showTooltip" class="info-tooltip" v-on:click="stopPropagation">
      <i class="fa fa-times" v-on:click="handleInfoClick" />
      <div v-html="messages[currentMsg]"></div>
      <div class="tooltip-arrow"></div>
      <div class="tooltip-next-button" v-on:click="nextMsg">
        <h4 v-if="currentMsg !== messages.length - 1">Next >></h4>
        <h4 v-else>
          << Prev</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  methods: {
    handleInfoClick: function () {
      this.showTooltip = !this.showTooltip;
    },
    nextMsg: function () {
      if (this.currentMsg !== this.messages.length - 1) {
        this.currentMsg += 1;
      }
    },
    stopPropagation: function (e) {
      e.stopPropagation();
    }
  },
  data() {
    // temporary for my sake
    return {
      showTooltip: false,
      currentMsg: 0,
      messages: [
        `
          <h3>Welcome to Synapsis</h3>
          Watch a Convoluted Neural Network train itself live to recognize
          handwritten numbers!
        `,
        `
          This demo trains a Convolutional Neural Network on the MNIST digits
          dataset in your browser, with nothing but Javascript. The dataset is
          fairly easy and one should expect to get somewhere around 99% accuracy
          within few minutes. I used this python script to parse the original files
          into batches of images that can be easily loaded into page DOM with img tags.
        `,
        `
          This network takes a 28x28 MNIST image and crops a random 24x24 window before
          training on it (this technique is called data augmentation and improves generalization).
          Similarly to do prediction, 4 random crops are sampled and the probabilities
          across all crops are averaged to produce final predictions.
        `
      ]
    };
  },
  mounted() {
    document.addEventListener('click', e => {
      if (e.target.className.includes("fa-question-circle-o")) {
        e.stopPropagation();
      } else if (this.showTooltip) {
        this.handleInfoClick();
      }
    });
  }
};
</script>
