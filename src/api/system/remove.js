import request from '@/utils/request'

// 查询拆除报废列表
export function listRemove(query) {
  return request({
    url: '/system/remove/list',
    method: 'get',
    params: query
  })
}

export function listAllRemove(query) {
  return request({
    url: '/system/remove/listAll',
    method: 'get',
    params: query
  })
}

// 查询拆除报废详细
export function getRemove(equipId) {
  return request({
    url: '/system/remove/' + equipId,
    method: 'get'
  })
}

// 新增拆除报废
export function addRemove(data) {
  return request({
    url: '/system/remove',
    method: 'post',
    data: data
  })
}

// 修改拆除报废
export function updateRemove(data) {
  return request({
    url: '/system/remove',
    method: 'put',
    data: data
  })
}

// 删除拆除报废
export function delRemove(equipId) {
  return request({
    url: '/system/remove/' + equipId,
    method: 'delete'
  })
}
