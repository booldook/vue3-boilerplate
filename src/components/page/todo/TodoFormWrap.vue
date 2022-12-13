<script setup>
import { useStores } from '@/stores'
import { storeToRefs } from 'pinia'
import { getCurrentInstance, ref } from 'vue'

const { proxy: { $isSet } } = getCurrentInstance()
const stores = useStores()
const { addTodo, removeTodoAll } = stores

const todo = ref('')

function onSave() {
  if ($isSet(todo.value)) {
    addTodo(todo.value)
    todo.value = ''
  }
}

function changeTodo(str) {
  todo.value = str
}
</script>

<template>
  <div class="todo-form">
    <form @submit.prevent="onSave">
      할일 등록 : <input type="text" v-model="todo" class="input-default" autofocus />
      <button type="submit" class="btn-default">데이터 추가</button>
      <button type="button" class="btn-default" @click="removeTodoAll(), changeTodo('')">데이터 삭제</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.todo-form {
  padding: 1em;
  @include border(w90, bottom);

  .input-default {
    padding: gap-sm(lg);
  }

  .btn-default {
    padding: gap-sm(lg);
    margin-left: gap-sm(md);
  }
}
</style>
