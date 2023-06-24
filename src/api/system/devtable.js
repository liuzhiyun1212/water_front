import request from '@/utils/request'

// 查询devtable列表
export function listDevtable(query) {
  return request({
    url: '/system/devtable/list',
    method: 'get',
    params: query
  })
}

//查询所有设备的名称
export function namelist(query) {
  return request({
    url: '/system/devtable/namelist',
    method: 'get',
    params: query
  })
}




export function listAllDevtable(query) {
  return request({
    url: '/system/devtable/listAll',
    method: 'get',
    params: query
  })
}

// 查询devtable列表
export function listLevelButLeaf(query) {
  return request({
    url: '/system/devtable/listLevelButLeaf',
    method: 'get',
    params: query
  })
}

// 查询devtable详细
export function getDevtable(id) {
  return request({
    url: '/system/devtable/' + id,
    method: 'get'
  })
}

// 新增devtable
export function addDevtable(data) {
  return request({
    url: '/system/devtable',
    method: 'post',
    data: data
  })
}

// 修改devtable
export function updateDevtable(data) {
  return request({
    url: '/system/devtable',
    method: 'put',
    data: data
  })
}

// 删除devtable
export function delDevtable(id) {
  return request({
    url: '/system/devtable/' + id,
    method: 'delete'
  })
}

// 将pdfFile传到后台
export function saveFile(data) {
  return request({
    url: '/system/devtable/saveFile',
    method: 'post',
    data: data,
  })
}

// 新增test
export function addTest(data) {
  return request({
    url: '/system/test',
    method: 'post',
    data: data
  })
}

// 传文件
export function uploadFile(data) {
  return request({
    url: '/system/test/file',
    method: 'post',
    data: data
  })
}

// 统计主页设备状态总数
export function equsCount(query) {
  return request({
    url: '/system/devtable/equsCount',
    method: 'get',
    params: query
  })
}
