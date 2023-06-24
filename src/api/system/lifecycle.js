import request from '@/utils/request'

//查询相关设备总数
export function relationSummary(query) {
  return request({
    url: '/system/lifecycle/relationSummary',
    method: 'post',
    data: query
  })
}


// 查询lifecycle列表
export function listLifecycle(query) {
  return request({
    url: '/system/lifecycle/list',
    method: 'get',
    params: query
  })
}

// 查询lifecycle详细
export function getLifecycle(id) {
  return request({
    url: '/system/lifecycle/' + id,
    method: 'get'
  })
}

// 新增lifecycle
export function addLifecycle(data) {
  return request({
    url: '/system/lifecycle',
    method: 'post',
    data: data
  })
}

// 修改lifecycle
export function updateLifecycle(data) {
  return request({
    url: '/system/lifecycle',
    method: 'put',
    data: data
  })
}

// 删除lifecycle
export function delLifecycle(id) {
  return request({
    url: '/system/lifecycle/' + id,
    method: 'delete'
  })
}
