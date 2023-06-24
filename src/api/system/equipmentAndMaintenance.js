import request from '@/utils/request'

// 查询维保设备关联列表
export function listEquipmentAndMaintenance(query) {
  return request({
    url: '/system/equipmentAndMaintenance/list',
    method: 'get',
    params: query
  })
}

// 查询维保设备关联详细
export function getEquipmentAndMaintenance(equipmentId) {
  return request({
    url: '/system/equipmentAndMaintenance/' + equipmentId,
    method: 'get'
  })
}

// 新增维保设备关联
export function addEquipmentAndMaintenance(data) {
  return request({
    url: '/system/equipmentAndMaintenance',
    method: 'post',
    data: data
  })
}

// 修改维保设备关联
export function updateEquipmentAndMaintenance(data) {
  return request({
    url: '/system/equipmentAndMaintenance',
    method: 'put',
    data: data
  })
}

// 删除维保设备关联
export function delEquipmentAndMaintenance(equipmentId) {
  return request({
    url: '/system/equipmentAndMaintenance/' + equipmentId,
    method: 'delete'
  })
}
