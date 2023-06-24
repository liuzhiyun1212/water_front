import request from '@/utils/request'

// 查询列表
export function listDictionary(query) {
  return request({
    url: '/system/dictionary/list',
    method: 'get',
    params: query
  })
}
//树形表格查询
export function listDictionary1(query) {
  return request({
    url: '/system/dictionary/list1',
    method: 'get',
    params: query
  })
}
// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/system/dictionary/treeselect',
    method: 'get'
  })
}
// 查询详细
export function getDictionary(dictId) {
  return request({
    url: '/system/dictionary/' + dictId,
    method: 'get'
  })
}

// 新增
export function addDictionary(data) {
  return request({
    url: '/system/dictionary',
    method: 'post',
    data: data
  })
}

// 修改
export function updateDictionary(data) {
  return request({
    url: '/system/dictionary',
    method: 'put',
    data: data
  })
}

// 删除
export function delDictionary(dictId) {
  return request({
    url: '/system/dictionary/' + dictId,
    method: 'delete'
  })
}
