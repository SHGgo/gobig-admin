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

/**
 *
 * @param {FormData} data
 */
export function uploadUserFigure(data) {
  return request({
    url: 'user/uploadUserFigure',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8'
    }
  })
}

/**
 *
 * @param {JSON} data
 */
export function insertUserContent(data) {
  return request({
    url: 'user/insertUserContent',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
