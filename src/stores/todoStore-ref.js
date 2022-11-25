import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const lists = ref([])
  const getCount = computed(() => lists.value.length)

  function addList(data) {
    lists.value.push(data)
  }

  function removeList(idx) {
    lists.value.splice(idx, 1)
  }

  function removeListAll() {
    lists.value = [];
  }

  function updateList(idx, data) {
    lists.value.splice(idx, 1, data)
  }

  return { lists, getCount, addList, removeList, removeListAll, updateList }
})
