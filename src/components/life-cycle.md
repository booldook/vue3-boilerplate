# vue3 LifeCycle

```js

import { onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount, onActivated, onDeactivated, onServerPrefetch } from "vue"
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
```
