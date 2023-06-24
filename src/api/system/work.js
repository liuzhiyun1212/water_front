import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listWork(query) {
  return request({
    url: '/system/work/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getWork(id) {
  return request({
    url: '/system/work/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addWork(data) {
  return request({
    url: '/system/work',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateWork(data) {
  return request({
    url: '/system/work',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delWork(id) {
  return request({
    url: '/system/work/' + id,
    method: 'delete'
  })
}

// 获得当天创建的派工单的列表
export function getWorkListNowDay() {
  return request({
    url: '/system/work/getWorkListNowDay',
    method: 'get',
  })
}
