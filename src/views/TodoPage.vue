<script setup>
import { ref, computed, reactive, inject, getCurrentInstance } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'

import TodoList from '@/components/common/TodoList.vue'
import Pager from '@/components/common/Pager.vue'

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
  <div class="about">
    <h1>PINIA</h1>
    <div>
      <div>리스트: {{ listCnt }} 개</div>
      <form @submit.prevent="onSave">
        할일 등록 : <input type="text" v-model="todo" class="input-default">
        <button class="btn-default">데이터 추가</button>
        <button type="button" class="btn-default" @click="removeListAll">데이터 삭제</button>
      </form>
      <todo-list />
      <pager />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
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
