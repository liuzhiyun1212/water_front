import request from '@/utils/request'

// 查询collaborator列表
export function listCollaborator(query) {
  return request({
    url: '/system/collaborator/list',
    method: 'get',
    params: query
  })
}

// 查询collaborator列表
export function listCollaboratorAnyone(query) {
  return request({
    url: '/system/collaborator/listAnyone',
    method: 'get',
    params: query
  })
}

// 查询collaborator详细
export function getCollaborator(companyId) {
  return request({
    url: '/system/collaborator/' + companyId,
    method: 'get'
  })
}

export function getCollaboratorByPost(data) {
  return request({
    url: '/system/getCollaborator',
    method: 'post',
    data: data
  })
}

// 通过公司名查
// 查询collaborator详细
export function getListByCompany(companyName) {
  return request({
    url: '/system/collaborator/selectMaintenanceList/' + companyName,
    method: 'get'
  })
}

// 新增collaborator
export function addCollaborator(data) {
  return request({
    url: '/system/collaborator',
    method: 'post',
    data: data
  })
}

// 修改collaborator
export function updateCollaborator(data) {
  return request({
    url: '/system/collaborator',
    method: 'put',
    data: data
  })
}

// 删除collaborator
export function delCollaborator(companyId) {
  return request({
    url: '/system/collaborator/' + companyId,
    method: 'delete'
  })
}
