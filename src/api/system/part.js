import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listPart(query) {
  return request({
    url: '/system/part/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】列表 不分页查询
export function listAllPart(query) {
  return request({
    url: '/system/part/listAll',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPart(sparepartId) {
  return request({
    url: '/system/part/' + sparepartId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPart(data) {
  return request({
    url: '/system/part',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePart(data) {
  return request({
    url: '/system/part',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPart(sparepartId) {
  return request({
    url: '/system/part/' + sparepartId,
    method: 'delete'
  })
}
// 根据备件进行预测
export function predictByParts() {
  return request({
    url: '/system/part/predictByParts',
    method: 'get'
  })
}
