import { storeToRefs } from 'pinia'

import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()

const todoGetter = storeToRefs(todoStore)

console.log(todoGetter)

export default todoGetter
