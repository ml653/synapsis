<template>
  <div>
    <div v-if="currentMsg === length - 1" class="tooltip-button prev full" v-on:click="prevMsg">
          <h4>
            << Prev</h4>
        </div>

        <div v-else class="tooltip-button prev half" v-on:click="prevMsg">
          <h4>
            << Prev</h4>
        </div>

        <div v-if="currentMsg === 0" class="tooltip-button next full" v-on:click="nextMsg">
          <h4>Next >></h4>
        </div>

        <div v-else-if="currentMsg !== length - 1" class="tooltip-button next half" v-on:click="nextMsg">
          <h4>Next >></h4>
        </div>
  </div>
</template>

<script>
export default {
  name: 'tooltip-buttons',
  props: ["currentMsg", "length", "nextMsg", "prevMsg"]
};
</script>
