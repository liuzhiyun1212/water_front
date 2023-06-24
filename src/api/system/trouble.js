import request from '@/utils/request'

// 查询trouble列表
export function listTrouble(query) {
  return request({
    url: '/system/trouble/list',
    method: 'get',
    params: query
  })
}

// 查询trouble详细
export function getTrouble(troubleId) {
  return request({
    url: '/system/trouble/' + troubleId,
    method: 'get'
  })
}

// 新增trouble
export function addTrouble(data) {
  return request({
    url: '/system/trouble',
    method: 'post',
    data: data
  })
}

// 修改trouble
export function updateTrouble(data) {
  return request({
    url: '/system/trouble',
    method: 'put',
    data: data
  })
}

// 删除trouble
export function delTrouble(troubleId) {
  return request({
    url: '/system/trouble/' + troubleId,
    method: 'delete'
  })
}
