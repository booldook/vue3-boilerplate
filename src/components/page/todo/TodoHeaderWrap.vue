<script setup>
import useStore from '@/stores/store'

const { getTodoCount } = useStore()
</script>

<template>
  <div class="todo-header">
    <h1 class="todo-title">PINIA</h1>
    <div>리스트: {{ getTodoCount }} 개</div>
  </div>

</template>

<style scoped lang="scss">
.todo-header {
  .todo-title {
    font-size: 2em;
  }

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1em 0.5em 0.5em 0.5em;
  @include border(w90, bottom);
  @include themed() {
    border-bottom-color: t(border)
  }
}
</style>
