<script setup>
// import { computed, defineProps, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const { actDelList } = todoStore
const { getListPage, getPager } = storeToRefs(todoStore)

// const props = defineProps([])
// watch(() => getListAll, (nv, ov) => { console.log(nv, ov) })
// watch(() => listTest, (nv, ov) => { console.log(nv, ov) })
// const comp = computed(() => {})

function handleViewList(_data) {
  console.log(_data)
}
</script>

<template>
  <ul class="list-wrap">
    <li class="list" v-for="(v, i) in getListPage(getPager.page)" :key="i" @click="handleViewList(v)">
      {{ v }}
      <span class="btn-close" @click.stop="actDelList(i)">x</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.list-wrap {
  width: 100%;
  margin: 2em 0;
  .list {
    margin: 0;
    padding: 6px;
    display: flex;
    justify-content: space-between;
    @include border(w100, bottom);
    cursor: pointer;
    .btn-close {
      user-select: none;
    }
  }
}
</style>
