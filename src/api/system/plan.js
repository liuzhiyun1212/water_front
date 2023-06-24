import request from '@/utils/request'

// 查询plan列表
export function listPlan(query) {
  return request({
    url: '/system/plan/list',
    method: 'get',
    params: query
  })
}
// 查询plan列表(name模糊查询)
export function listPlanName(query) {
  return request({
    url: '/system/plan/listName',
    method: 'get',
    params: query
  })
}
// 不分页查询plan列表
export function listAllPlan(query) {
  return request({
    url: '/system/plan/listAll',
    method: 'get',
    params: query
  })
}
// 统计执行阶段总数
export function countState(query) {
  return request({
    url: '/system/plan/stateCount',
    method: 'get',
    params: query
  })
}
// 统计等级总数
export function levelState(query) {
  return request({
    url: '/system/plan/levelCount',
    method: 'get',
    params: query
  })
}

// 统计临时计划总数
export function plantTypeCount(query) {
  return request({
    url: '/system/plan/plantTypeCount',
    method: 'get',
    params: query
  })
}

//李馨专用不得更改

export function getListreverse(query) {
  return request({
    url: '/system/plan/listreverse',
    method: 'get',
    params: query
  })
}

// 查询plan详细
export function getPlan(id) {
  return request({
    url: '/system/plan/' + id,
    method: 'get'
  })
}

// 新增plan
export function addPlan(data) {
  return request({
    url: '/system/plan',
    method: 'post',
    data: data
  })
}

// 新增plan
export function addPlanAndSaveOther(data) {
  return request({
    url: '/system/plan/addPlan',
    method: 'post',
    data: data
  })
}

// 修改plan
export function updatePlan(data) {
  return request({
    url: '/system/plan',
    method: 'put',
    data: data
  })
}
// 维保记录页面的修改
// 修改plan
export function planMain(data) {
  return request({
    url: '/system/plan/updatePlan',
    method: 'put',
    data: data
  })
}

// 删除plan
export function delPlan(id) {
  return request({
    url: '/system/plan/' + id,
    method: 'delete'
  })
}
// 统计执行阶段总数
export function state(query) {
  return request({
    url: '/system/plan/countState',
    method: 'get',
    params: query
  })
}

// 统计种类计划总数
export function planeCount(query) {
  return request({
    url: '/system/plan/planeCount',
    method: 'get',
    params: query
  })
}

// 统计种类计划总数
export function level(query) {
  return request({
    url: '/system/plan/level',
    method: 'get',
    params: query
  })
}
