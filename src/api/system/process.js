import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listProcess(query) {
  return request({
    url: '/system/process/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】列表 不分页查询
export function listAllProcess(query) {
  return request({
    url: '/system/process/listAll',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getProcess(auditId) {
  return request({
    url: '/system/process/' + auditId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addProcess(data) {
  return request({
    url: '/system/process',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateProcess(data) {
  return request({
    url: '/system/process',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delProcess(auditId) {
  return request({
    url: '/system/process/' + auditId,
    method: 'delete'
  })
}
