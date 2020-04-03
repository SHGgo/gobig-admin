import request from '@/utils/request'

export function login(data) {
  console.log(data)
  return request({
    url: '/admin/adminLogin',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/getAdminInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/admin/adminLogout',
    method: 'post'
  })
}
