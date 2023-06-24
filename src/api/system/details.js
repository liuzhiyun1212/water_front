import request from '@/utils/request'

// 查询维保计划费用明细列表
export function listDetails(query) {
  return request({
    url: '/system/details/list',
    method: 'get',
    params: query
  })
}

// 查询维保计划费用明细详细
export function getDetails(id) {
  return request({
    url: '/system/details/' + id,
    method: 'get'
  })
}

// 新增维保计划费用明细
export function addDetails(data) {
  return request({
    url: '/system/details',
    method: 'post',
    data: data
  })
}

// 修改维保计划费用明细
export function updateDetails(data) {
  return request({
    url: '/system/details',
    method: 'put',
    data: data
  })
}

// 删除维保计划费用明细
export function delDetails(id) {
  return request({
    url: '/system/details/' + id,
    method: 'delete'
  })
}
