import request from '@/utils/request'

// 查询图谱列表
export function listGraph(query) {
  return request({
    url: '/system/graph/list',
    method: 'get',
    params: query
  })
}

// 查询图谱详细
export function getGraph(graphId) {
  return request({
    url: '/system/graph/' + graphId,
    method: 'get'
  })
}

// 新增图谱
export function addGraph(data) {
  return request({
    url: '/system/graph',
    method: 'post',
    data: data
  })
}

// 修改图谱
export function updateGraph(data) {
  return request({
    url: '/system/graph',
    method: 'put',
    data: data
  })
}

// 删除图谱
export function delGraph(graphId) {
  return request({
    url: '/system/graph/' + graphId,
    method: 'delete'
  })
}
