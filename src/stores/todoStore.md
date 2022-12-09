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
. actChgPage(_page)
. actAddList(data)
. actDelList(idx)
. actDelListAll()
. actChgList(idx, data)
