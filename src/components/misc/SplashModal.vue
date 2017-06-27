<template>
  <div class="splash-modal" @click="handleModalClick">
    <div class="splash-content" @click="handleContentClick">
      <h1>Synapsis</h1>
      <div class="skew-bg"></div>
      <div class="machine-layer-wrapper">
        <div class="machine-layer layer-1">
          <img src="/static/brain.svg"></img>
        </div>
        <div class="machine-layer layer-2"></div>
        <div class="machine-layer layer-3"></div>
        <div class="machine-layer layer-4"></div>
        <div class="machine-layer layer-5"></div>
      </div>

      <h2>
        Machine learning in your browser!
        <br>
        <br>
        Sit back and relax,
        <br>
        watch your machine learn handwriting!
      </h2>

      <div class="button-wrapper">
        <div class="exit-modal-button" @click="handleModalClick">
          Start
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'splash-modal',
  props: ["handleModalClick"],
  methods: {
    handleContentClick(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
</script>
