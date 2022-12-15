import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import Define, { computePager, computedPageNumber, isSet } from '@/modules'

export const useTodoStore = defineStore('todo', () => {

  //% STATE
  const list = ref([])
  const pager = ref({ ...Define.PAGER_INIT })

  //% GETTER
  /**
   * ! 전체 리스트 개수
   * @returns {number} count
   */
  const getTodoCount = computed(() => list.value.length)

  /**
   * ! 마지막 리스트 idx
   * @returns {number} count
   */
  const getTodoLastId = computed(() => list.value.length ? list.value[0]['id'] : 0)

  /**
   * ! 모든 리스트
   * @returns {object[]} list
   */
  const getTodoAll = computed(() => list.value)

  /**
   * ! 현재페이지에 보여질 리스트
   * @param {number}
   * @returns {array} list
   */
  const getTodoPage = computed(() => {
    const { page, pageCount } = getTodoPager.value
    const startIdx = (page - 1) * pageCount
    const endIdx = startIdx + pageCount
    return list.value.slice(startIdx, endIdx)
  })

  /**
   * ! pager 모든값 구하기
   * @returns {object} 페이저를 구성하는 모든값
   */
  const getTodoPager = computed(() => computePager(pager.value.page, list.value.length, pager.value.pageCount, pager.value.pagerCount))

  //% ACTION
  /**
   * ! 리스트 추가
   * @param {object} data
   * @returns {object} 추가된 리스트 값
   */
  function addTodo(data) {
    if (isSet(data)) {
      list.value.unshift(data)
      return data
    }
    else return null
  }

  /**
   * ! 리스트 삭제
   * @param {number} id
   * @returns {object} 삭제된 data
   */
  function removeTodo(id) {
    if (Number(id)) {
      const removedTodo = list.value.filter(v => v.id === id)
      list.value = list.value.filter(v => v.id !== id)
      return removedTodo
    }
    else return null
  }

  /**
   * ! 리스트 수정
   * @param {number} id
   * @param {object} data
   * @returns {object} 삭제된 data
   */
  function updateTodo(id, data) {
    if (Number(id) && typeof data === 'object') {
      list.value.splice(id, 1, data)
      return list.value[id]
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
  function updateTodoPage(page) {
    pager.value.page = computedPageNumber(page, 1)
    return pager.value.page
  }

  /**
   * ! 한페이지에 보여질 리스트 수 지정
   * @param {number} pageCount
   * @returns {number} pageCount
   */
  function updateTodoPageCount(pageCount) {
    pager.value.pageCount = computedPageNumber(pageCount, 10)
    return pager.value.pageCount
  }

  /**
   * ! 페이저 묶음 개수 지정
   * @param {number} pagerCount
   * @returns {number} pagerCount
   */
  function updateTodoPagerCount(pagerCount) {
    pager.value.pagerCount = computedPageNumber(pagerCount, 5)
    return pager.value.pagerCount
  }

  return {
    getTodoCount,
    getTodoLastId,
    getTodoPager,
    getTodoPage,
    getTodoAll,
    addTodo,
    removeTodo,
    removeTodoAll,
    updateTodo,
    updateTodoPage,
    updateTodoPageCount,
    updateTodoPagerCount,
  }
})

