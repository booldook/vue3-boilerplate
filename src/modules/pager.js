export const pagerInitData = {
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
}

export function computePager(page, total, pageCnt, pagerCnt) {
  const pager = { page, total, pageCnt, pagerCnt }
  pager.pageTotal = Math.ceil(pager.total / pager.pageCnt) || 1
  pager.startIdx = (pager.page - 1) * pager.pageCnt
  pager.pageStart = Math.floor((pager.page - 1) / pager.pagerCnt) * pager.pagerCnt + 1
  pager.pageEnd = pager.pageStart + pager.pagerCnt - 1 > pager.pageTotal ? pager.pageTotal : pager.pageStart + pager.pagerCnt - 1
  pager.pagePrev = pager.page === 1 ? 1 : pager.page - 1
  pager.pageNext = pager.page === pager.pageTotal ? pager.pageTotal : pager.page + 1
  pager.pagerPrev = pager.pageStart === 1 ? 1 : pager.pageStart - 1
  pager.pagerNext = pager.pageEnd === pager.pageTotal ? pager.pageTotal : pager.pageEnd + 1
  pager.pagerArr = []
  for (let i = pager.pageStart; i <= pager.pageEnd; i++) pager.pagerArr.push(i)

  return pager
}
