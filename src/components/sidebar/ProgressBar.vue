<template>
  <ul class="progress-bar">
    <li
      v-for="(_, idx) in messages"
      v-bind:class="currentMsg >= idx && 'active'">
    </li>
  </ul>
</template>

<script>
export default {
  name: 'progress-bar',
  props: ["messages", "currentMsg"]
};
</script>
