import request from '@/utils/request'

// 查询inspect列表
export function listInspection(query) {
  return request({
    url: '/system/inspection/list',
    method: 'get',
    params: query
  })
}

//查询当前登录用户的巡检记录
export function listInspectiononly(query) {
  return request({
    url: '/system/inspection/listonly',
    method: 'get',
    params: query
  })
}


// 查询inspect详细
export function getInspection(id) {
  return request({
    url: '/system/inspection/' + id,
    method: 'get'
  })
}

// 新增inspect
export function addInspection(data) {
  return request({
    url: '/system/inspection',
    method: 'post',
    data: data
  })
}

// 修改inspect
export function updateInspection(data) {
  return request({
    url: '/system/inspection',
    method: 'put',
    data: data
  })
}

// 删除inspect
export function delInspection(id) {
  return request({
    url: '/system/inspection/' + id,
    method: 'delete'
  })
}
