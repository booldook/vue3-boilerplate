import { ref, computed, getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'

import Define, { isSet, isEmpty } from '@/modules'

export const useUserStore = defineStore('user', () => {

  //% STATE
  const user = ref({})

  //% GETTER
  /**
   * ! user 정보 가져오기
   * @returns {object} 페이저를 구성하는 모든값
   */
  const getUser = computed(() => user.value)


  //% ACTION
  /**
   * ! user 정보수정
   * @param {object} _user
   * @returns {object} user
   */
  function updateUser(_user) {
    user.value = _user
    return user.value
  }

  /**
   * ! user 로그아웃
   * @param {object} user
   * @returns {object} 초기화 객체
   */
  function logoutUser(user) {
    user.value = {}
    return user.value
  }

  return {
    getUser,
    updateUser,
    logoutUser,
  }
})

