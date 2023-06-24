import request from '@/utils/request'

// 查询collector列表
export function listCollector(query) {
  return request({
    url: '/system/collector/list',
    method: 'get',
    params: query
  })
}

// 查询collector详细
export function getCollector(id) {
  return request({
    url: '/system/collector/' + id,
    method: 'get'
  })
}

//返回采集器数量
export function getCount() {
  return request({
    url: '/system/collector/count',
    method: 'get'
  })
}


// 新增collector
export function addCollector(data) {
  return request({
    url: '/system/collector',
    method: 'post',
    data: data
  })
}

// 修改collector
export function updateCollector(data) {
  return request({
    url: '/system/collector',
    method: 'put',
    data: data
  })
}

// 删除collector
export function delCollector(id) {
  return request({
    url: '/system/collector/' + id,
    method: 'delete'
  })
}
