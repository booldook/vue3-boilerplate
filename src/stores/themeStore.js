import { ref, computed, getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'

import Define, { isSet, isEmpty } from '@/modules'

export const useThemeStore = defineStore('theme', () => {

  //% STATE
  const theme = ref('default')

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

