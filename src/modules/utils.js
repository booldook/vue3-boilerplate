/**
 * ! Pager 값 생성기
 * @param {number} page
 * @param {number} total
 * @param {number} pageCount
 * @param {number} pagerCount
 * @returns {object} pager
 */
export function computePager(page = 1, total, pageCount = 10, pagerCount = 5) {
  const pager = { page, total, pageCount, pagerCount }
  pager.pageTotal = Math.ceil(pager.total / pager.pageCount) || 1
  pager.startIdx = (pager.page - 1) * pager.pageCount
  pager.pageStart = Math.floor((pager.page - 1) / pager.pagerCount) * pager.pagerCount + 1
  pager.pageEnd = pager.pageStart + pager.pagerCount - 1 > pager.pageTotal ? pager.pageTotal : pager.pageStart + pager.pagerCount - 1
  pager.pagePrev = pager.page === 1 ? 1 : pager.page - 1
  pager.pageNext = pager.page === pager.pageTotal ? pager.pageTotal : pager.page + 1
  pager.pagerPrev = pager.pageStart === 1 ? 1 : pager.pageStart - 1
  pager.pagerNext = pager.pageEnd === pager.pageTotal ? pager.pageTotal : pager.pageEnd + 1
  pager.pagerArr = []
  for (let i = pager.pageStart; i <= pager.pageEnd; i++) pager.pagerArr.push(i)
  return pager
}

/**
 * ! Number 변환 -> 문자열 숫자를 숫자로, 없거나 isNan 이면 initialValue 리턴
 * @param {(number|string)} value
 * @param {(number|null)} initialValue
 * @returns {(number|null)} page
 */
export function computedPageNumber(value, initialValue = null) {
  const num = Number(value || initialValue)
  return isNaN(num) ? (initialValue && typeof initialValue === 'number' ? initialValue : null) : num
}

/**
 * ! isEmpty
 * @param {any} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    typeof value === 'undefined' ||
    value === '' ||
    value === false ||
    String(value).toLowerCase() === 'false' ||
    value === 0 ||
    value === '0'
  )
}

/**
 * ! isSet
 * @param {any} value
 * @returns {boolean}
 */
export function isSet(value) {
  return !isEmpty(value)
}
