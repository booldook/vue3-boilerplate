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
  padding: {
    type: String,
  },
  borderColor: {
    type: String,
  },
  borderRadius: {
    type: String,
  }
})

const styled = computed(() => {
  return {
    '--padding': props.padding,
    '--border-color': props.borderColor,
    '--radius': props.borderRadius,
  }

})
</script>

<template>
  <div>
    <button :type="type" class="default">
      <slot />
    </button>
  </div>
</template>

<style scoped lang="scss">
.default {

  @if var(--padding) {
    padding: 1px sold var(--padding);
  }
  @else {
    padding: gap(md) gap(lg);
  }

  @if var(--border-color) {
    border: 1px sold var(--border-color);
  }
  @else {
    border: 1px solid color(w80);
  }

  @if var(--radius) {
    border-radius: 1px sold var(--radius);
  }
  @else {
    border-radius: radius(md);
  }

  color: var(--color);
  background-color: var(--bg-color);
}
</style>
