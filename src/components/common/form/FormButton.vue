<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return ['button', 'submit', 'reset'].includes(value)
    },
  },
  className: {
    type: String,
    default: '',
    validator(value) {
      return ['primary', 'secondary', 'accent', 'info', 'danger', 'warning', 'success', ''].includes(value)
    },
  },
  size: {
    type: String,
    default: '',
    validator(value) {
      return ['lg', 'sm', ''].includes(value)
    },
  },
  padding: {
    type: String,
  },
  borderColor: {
    type: String,
  },
  borderRadius: {
    type: String,
  },
})

const emit = defineEmits(['click'])

const style = computed(() => {
  return {
    '--padding': props.padding,
    '--border-color': props.borderColor,
    '--radius': props.borderRadius,
  }
})
</script>

<template>
  <button class="btn"
    :type="type"
    :class="[
      className ? 'btn-' + className : '',
      size ? 'btn-' + size : '',
      padding ? 'btn-padding' : '',
      borderColor ? 'btn-border-color' : '',
      borderRadius ? 'btn-border-radius' : '',
    ]"
    :style="style"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  &.btn-padding {
    padding: var(--padding) !important;
  }

  &.btn-border-color {
    border: 1px sold var(--border-color) !important;
  }

  &.btn-border-radius {
    border-radius: var(--radius) !important;
  }
}
</style>
