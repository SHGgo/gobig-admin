import request from '@/utils/request'

/**
 *
 * @param {JSON} data
 */
export function search(data) {
  return request({
    url: 'search/searchUser',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
