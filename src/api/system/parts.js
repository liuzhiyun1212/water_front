import request from '@/utils/request'

// 查询planAndParts列表
export function listParts(query) {
  return request({
    url: '/system/parts/list',
    method: 'get',
    params: query
  })
}

// 查询planAndParts详细
export function getParts(maintennanceId) {
  return request({
    url: '/system/parts/' + maintennanceId,
    method: 'get'
  })
}

// 新增planAndParts
export function addParts(data) {
  return request({
    url: '/system/parts',
    method: 'post',
    data: data
  })
}

// 修改planAndParts
export function updateParts(data) {
  return request({
    url: '/system/parts',
    method: 'put',
    data: data
  })
}

// 删除planAndParts
export function delParts(maintennanceId) {
  return request({
    url: '/system/parts/' + maintennanceId,
    method: 'delete'
  })
}
