import request from '@/utils/request'

// 查询拆除作业风险分析列表
export function listDemolitionAnalysis(query) {
  return request({
    url: '/system/demolitionAnalysis/list',
    method: 'get',
    params: query
  })
}

// 查询拆除作业风险分析详细
export function getDemolitionAnalysis(projectId) {
  return request({
    url: '/system/demolitionAnalysis/' + projectId,
    method: 'get'
  })
}

// 新增拆除作业风险分析
export function addDemolitionAnalysis(data) {
  return request({
    url: '/system/demolitionAnalysis',
    method: 'post',
    data: data
  })
}

// 修改拆除作业风险分析
export function updateDemolitionAnalysis(data) {
  return request({
    url: '/system/demolitionAnalysis',
    method: 'put',
    data: data
  })
}

// 删除拆除作业风险分析
export function delDemolitionAnalysis(projectId) {
  return request({
    url: '/system/demolitionAnalysis/' + projectId,
    method: 'delete'
  })
}
