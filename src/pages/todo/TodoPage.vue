<script setup>
import PagerCp from '@/components/common/PagerCp.vue'
import TodoHeaderWrap from '@/components/page/todo/TodoHeaderWrap.vue'
import TodoFormWrap from '@/components/page/todo/TodoFormWrap.vue'
import TodoListWrap from '@/components/page/todo/TodoListWrap.vue'

</script>

<template>
  <div class="todo-wrapper">
    <TodoHeaderWrap />
    <TodoFormWrap />
  </div>
  <div class="todo-body">
    <TodoListWrap />
    <PagerCp />
  </div>
</template>

<style lang="scss" scoped>
.todo-wrapper {


}
</style>
