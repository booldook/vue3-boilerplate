<script setup>
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const { removeList, setPage, setPageCnt, setPagerCnt } = todoStore
const { getPager } = storeToRefs(todoStore);

const props = defineProps([])

function onPage(_page) {
  setPage(_page)
}

</script>

<template>
<div class="pager-wrapper">
  <ul class="pager-wrap">
    <li class="pager" @click="onPage(1)">←</li>
    <li class="pager" @click="onPage(getPager.pagerPrev)">《</li>
    <li class="pager" @click="onPage(getPager.pagePrev)">〈</li>
    <li v-for="(v, k) in getPager.pagerArr" key="k" class="pager" :class="{ active : v === getPager.page }" @click="onPage(v)">{{ v }}</li>
    <li class="pager" @click="onPage(getPager.pageNext)">〉</li>
    <li class="pager" @click="onPage(getPager.pagerNext)">》</li>
    <li class="pager" @click="onPage(getPager.pageTotal)">→</li>
  </ul>
</div>
</template>


<style scoped lang="scss">
.pager-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
  .pager-wrap {
    display: flex;
    justify-content: center;
    .pager {
      cursor: pointer;
      user-select: none;
      text-align: center;
      width: 30px;
      height: 30px;
      line-height: 28px;
      border: 1px solid #eee;
      &:not(:last-child) {
        border-right: none;
      }
      &.active {
        background-color: darkslategray;
        color: white;
      }
    }
  }
}
</style>
