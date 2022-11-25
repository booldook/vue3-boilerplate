<script setup>
import { ref, computed } from "vue"
import { onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount, onActivated, onDeactivated, onServerPrefetch } from "vue"
import { useTodoStore } from '@/stores/todoStore-ref'
import { storeToRefs } from 'pinia'

// pinia load
const todoStore = useTodoStore()
const { lists, getCount, getList, addList, removeList, updateList } = storeToRefs(todoStore)

const hotList = ref('')
const datas = computed(() => {
  return true;
})

function onSave() {
  addList(hotList);
  hotList.value = '';
}

function handleViewList() {
  console.log('click')
}

// with SSR
// 구성 요소 인스턴스가 서버에서 렌더링되기 전에 확인할 비동기 함수를 등록합니다.
onServerPrefetch(async () => {
  console.log('=== onServerPrefetch ===')
})

onBeforeMount(() => {
  console.log('=== BeforeMount ===')
})

onMounted(() => {
  console.log('=== Mounted ===')
})

// with keepAlive
onActivated(() => {
  console.log('=== Activated ===')
})

// with keepAlive
onDeactivated(() => {
  console.log('=== Deactivated ===')
})

onBeforeUpdate(() => {
  console.log('=== BeforeUpdate ===')
})

onUpdated(() => {
  console.log('=== Updated ===')
})

onBeforeUnmount(() => {
  console.log('=== BeforeUnmount ===')
})

onUnmounted(() => {
  console.log('=== Unmounted ===')
})


</script>

<template>
  <div class="about">
    <h1>PINIA</h1>
    <div>
      <div>리스트: {{ todoStore.getCount.value }}</div>
      <div>
        할일 등록 : <input type="text" v-model="hotList" class="input-default">
        <button @click="onSave" class="btn-default">데이터 추가</button>
      </div>
      <ul>
        <li v-for="(data, key) in todoStore.getList" :key="key" @click="handleViewList">
          {{ data.value }}
        </li>
      </ul>
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
