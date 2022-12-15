<script setup>
import TodoListItem from '@/components/page/todo/TodoListItem.vue'
import useStore from '@/stores/store'

const { getTodoPage } = useStore()

// const props = defineProps({})
// const emit = defineEmits([])
// watch(() => getTodoAll, (nv, ov) => { console.log(nv, ov) })
// watch(() => listTest, (nv, ov) => { console.log(nv, ov) })
// const comp = computed(() => {})

function handleViewList(_data) {
  console.log(_data)
}
</script>

<template>
  <ul class="list-wrap">
    <TodoListItem v-for="(v, i) in getTodoPage" :key="i" :data="v" @click="handleViewList(v)" />
  </ul>
</template>

<style scoped lang="scss">
.list-wrap {
  width: 100%;
  margin: 2em 0;
}
</style>
