<template>
  <div class="splash-modal" @click="handleModalClick">
    <div class="splash-content" @click="handleContentClick">
      <h1>Welcome to Synapsis</h1>
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
