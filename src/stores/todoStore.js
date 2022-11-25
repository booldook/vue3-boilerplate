import { ref, computed, getCurrentInstance } from 'vue';
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', () => {

  const { proxy: { $isSet } } = getCurrentInstance()

  const list = ref([])
  const pager = ref({
    page: 1,
    total: 0,
    pageCnt: 10,
    pagerCnt: 5,
    pageTotal: 1,
    startIdx: 0,
    pageStart: 1,
    pageEnd: 1,
    pagePrev: 1,
    pageNext: 1,
    pagerPrev: 1,
    pagerNext: 1,
    pagerArr: [],
  })

  // # list - getter
  const listCnt = computed(() => list.value.length);
  const listPage = computed(() => (_page = 1) => list.value.slice((_page - 1) * pager.value.pageCnt, (_page - 1) * pager.value.pageCnt + pager.value.pageCnt));
  const listAll = computed(state => list.value);

  // # pager - getter
  const getPager = computed(setPager)


  // # list - action
  function addList(data) {
    if ($isSet(data)) {
      list.value.unshift(data)
      return true
    }
    else return false
  }

  function removeList(idx) {
    if (Number(idx)) {
      list.value.splice(idx, 1)
      return true
    }
    else {
      return false
    }
  }

  function removeListAll() {
    list.value = [];
    return true;
  }

  function updateList(idx, data) {
    if (Number(idx) && typeof data === 'object') {
      list.value.splice(idx, 1, data);
      return true;
    }
    else {
      return false;
    }
  }

  // # pager - action
  function setPage(_page) {
    pager.value.page = Number(_page) || 1;
    return true;
  }

  function setPageCnt(_pageCnt) {
    pager.value.pageCnt = Number(_pageCnt) || 10;
    return true;
  }

  function setPagerCnt(_pagerCnt) {
    pager.value.pagerCnt = Number(_pagerCnt) || 5;
    return true;
  }

  function setPager() {
    pager.value.pageTotal = Math.ceil(list.value.length / pager.value.pageCnt) || 1;
    pager.value.startIdx = (pager.value.page - 1) * pager.value.pageCnt;
    pager.value.pageStart = Math.floor((pager.value.page - 1) / pager.value.pagerCnt) * pager.value.pagerCnt + 1;
    pager.value.pageEnd = pager.value.pageStart + pager.value.pagerCnt - 1 > pager.value.pageTotal ? pager.value.pageTotal : pager.value.pageStart + pager.value.pagerCnt - 1;
    pager.value.pagePrev = pager.value.page === 1 ? 1 : pager.value.page - 1;
    pager.value.pageNext = pager.value.page === pager.value.pageTotal ? pager.value.pageTotal : pager.value.page + 1;
    pager.value.pagerPrev = pager.value.pageStart === 1 ? 1 : pager.value.pageStart - 1;
    pager.value.pagerNext = pager.value.pageEnd === pager.value.pageTotal ? pager.value.pageTotal : pager.value.pageEnd + 1;
    pager.value.pagerArr = [];
    for (let i = pager.value.pageStart; i <= pager.value.pageEnd; i++) {
      pager.value.pagerArr.push(i);
    }

    return {
      page: pager.value.page,
      total: pager.value.total,
      pageCnt: pager.value.pageCnt,
      pagerCnt: pager.value.pagerCnt,
      pageTotal: pager.value.pageTotal,
      startIdx: pager.value.startIdx,
      pageStart: pager.value.pageStart,
      pageEnd: pager.value.pageEnd,
      pagePrev: pager.value.pagePrev,
      pageNext: pager.value.pageNext,
      pagerPrev: pager.value.pagerPrev,
      pagerNext: pager.value.pagerNext,
      pagerArr: pager.value.pagerArr,
    }
  }

  return {
    listCnt,
    listPage,
    listAll,
    pager,
    addList,
    removeList,
    removeListAll,
    updateList,
    getPager,
    setPager,
    setPage,
    setPageCnt,
    setPagerCnt,
  };
});

