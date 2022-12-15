<script setup>
import PagerCp from '@/components/common/PagerCp.vue'
import TodoHeaderWrap from '@/components/page/todo/TodoHeaderWrap.vue'
import TodoFormWrap from '@/components/page/todo/TodoFormWrap.vue'
import TodoListWrap from '@/components/page/todo/TodoListWrap.vue'

import useStore from '@/stores/store'

const { getTodoPager, updateTodoPage } = useStore()

</script>

<template>
  <div class="todo-wrapper">
    <TodoHeaderWrap />
    <TodoFormWrap />
    <TodoListWrap />
    <PagerCp :pager="getTodoPager" @updatePage="updateTodoPage"/>
  </div>
</template>

<style lang="scss" scoped>
.todo-wrapper {


}
</style>
