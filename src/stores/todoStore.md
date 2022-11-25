# store 일람표

## todoStore


### state
. (Array)   list
. (Number)  page
. (Number)  pageCnt
. (Number)  pagerCnt

### getter
. (Number)  getListCnt
. (Array)   getListPage(page)
. (Array)   getListAll
. (Number)  getPageTotal

### action
. setPage(_page)
. addList(data)
. removeList(idx)
. removeListAll()
. updateList(idx, data)
