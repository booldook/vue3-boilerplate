import { defineStore, storeToRefs } from 'pinia'

import { useTodoStore } from '@/stores/todoStore'
import { useUserStore } from '@/stores/userStore'
import { useThemeStore } from '@/stores/themeStore'

export const useStores = defineStore('root', () => {

  const todoStore = useTodoStore()
  const userStore = useUserStore()
  const themeStore = useThemeStore()

  const todoGetter = storeToRefs(todoStore)
  const userGetter = storeToRefs(userStore)
  const themeGetter = storeToRefs(themeStore)

  return {
    ...todoStore,
    ...userStore,
    ...themeStore,
    ...todoGetter,
    ...userGetter,
    ...themeGetter,
  }
})

