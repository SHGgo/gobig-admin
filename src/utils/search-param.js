
export function searchFix(keyWord, condition, pageStart = 0, pageItemNum = 0) {
  let json = {}
  // keyWord存在搜索关键字，不存在列出所有
  console.log(condition)
  switch (condition) {
    case 'uid':
      json = {
        uid: keyWord
      }
      break
    case 'nickName':
      json = {
        nickName: keyWord
      }
      break
    case 'vid':
      json = {
        vid: keyWord
      }
      break
    case 'author':
      json = {
        author: keyWord
      }
      break
    case 'title':
      json = {
        title: keyWord
      }
      break
  }
  if (pageItemNum) {
    json.pageStart = pageStart
    json.pageItemNum = pageItemNum
  }
  return json
}
