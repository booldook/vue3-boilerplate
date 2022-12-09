import { ref, computed, getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'

import { pagerInitData, computePager } from '@/modules/pager'

//% Store Init
export const useTodoStore = defineStore('todo', () => {

  const { proxy: { $isSet } } = getCurrentInstance()

  //% STATE
  const list = ref([])
  const pager = ref({ ...pagerInitData })

  //% GETTER
  //# 전체 리스트 개수
  const getListCnt = computed(() => list.value.length)

  //# 모든 리스트
  const getListAll = computed(() => list.value)

  //# 현재페이지에 보여질 리스트
  const getListPage = computed(() => (_page = 1) => list.value.slice((_page - 1) * pager.value.pageCnt, (_page - 1) * pager.value.pageCnt + pager.value.pageCnt))

  //# pager 모든값 구하기
  const getPager = computed(() => computePager(pager.value.page, list.value.length, pager.value.pageCnt, pager.value.pagerCnt))

  //% ACTION
  //# 리스트 추가
  function actAddList(data) {
    if ($isSet(data)) {
      list.value.unshift(data)
      return true
    }
    else return false
  }

  //# 리스트 삭제
  function actDelList(idx) {
    if (Number(idx)) {
      list.value.splice(idx, 1)
      return true
    }
    else {
      return false
    }
  }

  //# 리스트 수정
  function actChgList(idx, data) {
    if (Number(idx) && typeof data === 'object') {
      list.value.splice(idx, 1, data)
      return true
    }
    else {
      return false
    }
  }

  //# 모든 리스트 삭제
  function actDelListAll() {
    list.value = []
    return true
  }

  //# 현재페이지 지정
  function actChgPage(_page) {
    pager.value.page = Number(_page) || 1
    return pager.value.page
  }

  //# 한페이지에 보여질 리스트 수 지정
  function actChgPageCnt(_pageCnt) {
    pager.value.pageCnt = Number(_pageCnt) || 10
    return pager.value.pageCnt
  }

  //# 페이저 묶음 개수 지정
  function actChgPagerCnt(_pagerCnt) {
    pager.value.pagerCnt = Number(_pagerCnt) || 5
    return pager.value.pagerCnt
  }

  return {
    getListCnt,
    getListPage,
    getListAll,
    actAddList,
    actChgList,
    actDelList,
    actDelListAll,
    getPager,
    actChgPage,
    actChgPageCnt,
    actChgPagerCnt,
  }
})

