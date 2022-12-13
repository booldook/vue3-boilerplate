import { ref, computed, getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'

import Define, { computePager, computedPageNumber } from '@/modules/define'

export const useTodoStore = defineStore('todo', () => {

  const { proxy: { $isSet } } = getCurrentInstance()

  //% STATE
  const list = ref([])
  const pager = ref({ ...Define.PAGER_INIT })

  //% GETTER
  /**
   * ! 전체 리스트 개수
   * @returns {number} count
   */
  const getTodoCount = computed(() => {
    console.log('%c ===== list =====', 'background: #222; color: #ea6947')
    console.log(list)
    console.log(list.value)
    return list.value.length
  })

  /**
   * ! 모든 리스트
   * @returns {array} list
   */
  const getTodoAll = computed(() => list.value)

  /**
   * ! 현재페이지에 보여질 리스트
   * @param {number}
   * @returns {array} list
   */
  const getTodoPage = computed(() => (_page = 1) => list.value.slice((_page - 1) * pager.value.pageCount, (_page - 1) * pager.value.pageCount + pager.value.pageCount))

  /**
   * ! pager 모든값 구하기
   * @returns {object} 페이저를 구성하는 모든값
   */
  const getPager = computed(() => computePager(pager.value.page, list.value.length, pager.value.pageCount, pager.value.pagerCount))

  //% ACTION
  /**
   * ! 리스트 추가
   * @param {object} data
   * @returns {object} 추가된 리스트 값
   */
  function addTodo(data) {
    if ($isSet(data)) {
      list.value.unshift(data)
      return data
    }
    else return null
  }

  /**
   * ! 리스트 삭제
   * @param {number} idx
   * @returns {object} 삭제된 data
   */
  function removeTodo(idx) {
    if (Number(idx)) {
      const removeData = { ...list.value[idx] }
      list.value.splice(idx, 1)
      return removeData
    }
    else return null
  }

  /**
   * ! 리스트 수정
   * @param {number} idx
   * @param {object} data
   * @returns {object} 삭제된 data
   */
  function updateTodo(idx, data) {
    if (Number(idx) && typeof data === 'object') {
      list.value.splice(idx, 1, data)
      return list.value[idx]
    }
    else return null
  }

  /**
   * ! 모든 리스트 삭제
   * @returns {array} 빈 배열
   */
  function removeTodoAll() {
    list.value = []
    return []
  }

  /**
   * ! 현재페이지 지정
   * @param {number} page
   * @returns {number} page
   */
  function updatePage(page) {
    pager.value.page = computedPageNumber(page, 1)
    return pager.value.page
  }

  /**
   * ! 한페이지에 보여질 리스트 수 지정
   * @param {number} pageCount
   * @returns {number} pageCount
   */
  function updatePageCount(pageCount) {
    pager.value.pageCount = computedPageNumber(pageCount, 10)
    return pager.value.pageCount
  }

  /**
   * ! 페이저 묶음 개수 지정
   * @param {number} pagerCount
   * @returns {number} pagerCount
   */
  function updatePagerCount(pagerCount) {
    pager.value.pagerCount = computedPageNumber(pagerCount, 5)
    return pager.value.pagerCount
  }

  return {
    getTodoCount,
    getTodoPage,
    getTodoAll,
    getPager,
    addTodo,
    removeTodo,
    removeTodoAll,
    updateTodo,
    updatePage,
    updatePageCount,
    updatePagerCount,
  }
})

