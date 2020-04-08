
export function userManageSearchFix(keyWord, condition, pageStart = 0, pageItemNum = 0) {
  let json = {}
  // keyWord存在搜索关键字，不存在列出所有
  if (keyWord) {
    if (condition === 'uid') {
      json = {
        uid: keyWord
      }
    } else if (condition === 'nickName') {
      json = {
        nickName: keyWord
      }
    }
  }
  if (pageItemNum) {
    json.pageStart = pageStart
    json.pageItemNum = pageItemNum
  }
  return json
}
