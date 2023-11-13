<script setup>
import TodoListItem from '@/components/page/todo/TodoListItem.vue'
import useStore from '@/stores/store'
import {onMounted} from "vue";

const { getTodoPage, list } = useStore()

// const props = defineProps({})
// const emit = defineEmits([])
// watch(() => getTodoAll, (nv, ov) => { console.log(nv, ov) })
// watch(() => listTest, (nv, ov) => { console.log(nv, ov) })
// const comp = computed(() => {})

onMounted(() => {
  console.log(list?.value, getTodoPage.value)
})

function handleViewList(_data) {
  console.log(_data)
}
</script>

<template>
  <ul class="list-wrap">
    <TodoListItem v-for="(v, i) in list" :key="i" :data="v" @click="handleViewList(v)" />
  </ul>
</template>

<style scoped lang="scss">
.list-wrap {
  width: 100%;
  margin: 2em 0;
}
</style>
