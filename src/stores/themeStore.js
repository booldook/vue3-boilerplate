import { ref, computed, getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'

import Define from '@/modules/define'

export const useThemeStore = defineStore('theme', () => {

  const { proxy: { $isSet } } = getCurrentInstance()

  //% STATE
  const theme = ref('dark')

  //% GETTER
  /**
   * ! theme 정보 가져오기
   * @returns {string} 페이저를 구성하는 모든값
   */
  const getTheme = computed(() => theme.value)

  //% ACTION
  /**
   * ! theme 정보수정
   * @param {string} _theme
   * @returns {string} theme.value
   */
  function updateTheme(_theme) {
    theme.value = _theme
    return theme.value
  }

  return {
    getTheme,
    updateTheme,
  }
})

