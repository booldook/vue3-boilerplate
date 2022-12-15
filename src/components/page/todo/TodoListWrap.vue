<script setup>
import useStore from '@/stores/store'

const { removeTodo, getTodoPage } = useStore()

// const props = defineProps([])
// watch(() => getTodoAll, (nv, ov) => { console.log(nv, ov) })
// watch(() => listTest, (nv, ov) => { console.log(nv, ov) })
// const comp = computed(() => {})

function handleViewList(_data) {
  console.log(_data)
}
</script>

<template>
  <ul class="list-wrap">
    <li class="list" v-for="(v, i) in getTodoPage" :key="i" @click="handleViewList(v)">
      {{ v.title }}
      <span class="btn-close" @click.stop="removeTodo(i)">x</span>
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
