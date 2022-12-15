<script setup>
import { ref } from 'vue'
import { isSet } from '@/modules'
import useStore from '@/stores/store'

const { addTodo, removeTodoAll, getTodoLastId } = useStore()

const todo = ref('')

function onSave() {
  if (isSet(todo.value)) {
    addTodo({ id: getTodoLastId.value + 1, title: todo.value, createdAt: new Date() })
    todo.value = ''
  }
}

function changeTodo(str) {
  todo.value = str
}
</script>

<template>
  <form class="todo-form" @submit.prevent="onSave">
    할일 등록 : <input type="text" v-model="todo" class="input-default" autofocus />
    <FormButton type="submit" class-name="primary">데이터 추가</FormButton>
    <FormButton type="button" class-name="danger" @click="removeTodoAll(), changeTodo('')">데이터 삭제</FormButton>
  </form>
</template>

<style scoped lang="scss">
.todo-form {
  padding: 1em;
  @include border(w90, bottom);
  @include themed() {
    border-color: t(border)
  }

  .input-default {
    padding: 0.75em;
  }
}
</style>
