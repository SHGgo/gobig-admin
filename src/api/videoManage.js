import request from '@/utils/request'

/**
 *
 * @param {JSON} data
 */
export function search(data) {
  return request({
    url: 'search/searchVideoByAdmin',
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
 * @param {Function} progressFix
 */
export function uploadVideoFile(data, progressFix) {
  return request({
    url: 'video/uploadVideoFile',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8'
    },
    onUploadProgress: progressEvent => {
      // TODO:进度条
      // progressFix(progressEvent)
    }
  })
}

/**
 *
 * @param {JSON} data
 */
export function uploadVideoContent(data) {
  // console.log(data)
  return request({
    url: 'video/uploadVideoContent',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

/**
 *
 * @param {JSON} data
 */
export function deleteVideo(data) {
  // console.log(data)
  return request({
    url: 'video/deleteVideoContent',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
