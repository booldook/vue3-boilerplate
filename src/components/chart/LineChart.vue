<script setup>
defineProps({
  width: {
    type: String,
    required: false,
    default: 500
  },
  height: {
    type: String,
    required: false,
    default: 500
  },
  data: {
    type: Array,
    default() {
      return []
    }
  }
})
</script>

<template>
  <svg :width="width" :height="height" />
</template>

<style scoped lang="scss">

</style>
