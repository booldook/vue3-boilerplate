<script setup>
import { ref, computed, reactive, inject, getCurrentInstance } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'

import TodoList from '@/components/pages/todo/TodoList.vue'

const { proxy: { $isSet } } = getCurrentInstance()
const todoStore = useTodoStore()
const { listCnt } = storeToRefs(todoStore);
const { addList, removeListAll } = todoStore

const todo = ref('')

function onSave() {
  if ($isSet(todo.value)) {
    addList(todo.value);
    todo.value = '';
  }
}
</script>

<template>
  <div class="todo-wrapper">
    <div class="todo-header">
      <h1 class="todo-title">PINIA</h1>
      <div>리스트: {{ listCnt }} 개</div>
    </div>
    <div class="todo-form">
      <form @submit.prevent="onSave">
        할일 등록 : <input type="text" v-model="todo" class="input-default">
        <button class="btn-default">데이터 추가</button>
        <button type="button" class="btn-default" @click="removeListAll">데이터 삭제</button>
      </form>
    </div>
    <div class="todo-body">
      <todo-list />
      <pager />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.todo-wrapper {
  .todo-header {
    .todo-title {
      font-size: 2em;
    }
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1em 0.5em 0.5em 0.5em;
    @include border(w90, bottom);
  }
  .todo-form {
    padding: 1em;
    @include border(w90, bottom);
    .input-default {
      padding: 8px;
    }
    .btn-default {
      padding: 6px;
      margin-left: 6px;
    }
  }
}

</style>
