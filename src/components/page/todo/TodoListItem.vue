<script setup>
import useStore from '@/stores/store'

const { removeTodo } = useStore()

const props = defineProps({
  data: Object,
  key: Number,
})

const emit = defineEmits(['click'])
</script>

<template>
  <li class="list" @click="$emit('click')">
    {{ data.title }}
    <span class="btn-close ml-auto" @click.stop="removeTodo(data.id)">x</span>
  </li>
</template>

<style lang="scss" scoped>
.list {
  margin: 0;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  @include border(w100, bottom);
  @include themed() {
    border-color: t(border)
  }
  cursor: pointer;
  .btn-close {
    user-select: none;
  }
}
</style>
