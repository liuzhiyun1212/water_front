import request from '@/utils/request'

// 查询planAndEquipment列表
export function listEquipment(query) {
  return request({
    url: '/system/equipment/list',
    method: 'get',
    params: query
  })
}


//查询故障预测数据
export function predict() {
  return request({
    url: '/system/equipment/predict',
    method: 'get',
  })
}

//总预测
export function predictByAll() {
  return request({
    url: '/system/equipment/predictByAll',
    method: 'get',
  })
}

// 查询planAndEquipment详细
export function getEquipment(id) {
  return request({
    url: '/system/equipment/' + id,
    method: 'get'
  })
}

// 新增planAndEquipment
export function addEquipment(data) {
  return request({
    url: '/system/equipment',
    method: 'post',
    data: data
  })
}

// 修改planAndEquipment
export function updateEquipment(data) {
  return request({
    url: '/system/equipment',
    method: 'put',
    data: data
  })
}

// 删除planAndEquipment
export function delEquipment(id) {
  return request({
    url: '/system/equipment/' + id,
    method: 'delete'
  })
}
  // 查询lifeCycle
export function listLifeCycle(query) {
    return request({
      url: '/system/equipment/listLifeCycle',
      method: 'get',
      params: query
    })
}

// 查询维保记录每个设备
export function listRepair(query) {
  return request({
    url: '/system/equipment/listRepair',
    method: 'get',
    params: query
  })
}

// 查询维保记录每个设备个数
export function listRepairNum(query) {
  return request({
    url: '/system/equipment/listRepairNum',
    method: 'get',
    params: query
  })
}


