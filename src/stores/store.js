import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useTodoStore } from '@/stores/todoStore'
import { useUserStore } from '@/stores/userStore'
import { useThemeStore } from '@/stores/themeStore'

/**
 * ! 스토어 가져오기
 * @returns {object} store
 */
export default function useStore() {

  return {
    ...useThemeStore(),
    ...useTodoStore(),
    ...useUserStore(),
    ...storeToRefs(useThemeStore()),
    ...storeToRefs(useTodoStore()),
    ...storeToRefs(useUserStore()),
  }
}
