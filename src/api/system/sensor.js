import request from '@/utils/request'

// 查询传感器列表
export function listSensor(query) {
  return request({
    url: '/system/sensor/list',
    method: 'get',
    params: query
  })
}
// 获取完整传感器列表
export function listAllSensor(){
  return request({
    url: '/system/sensor/listSensor',
    method: 'get',
  })
}
// 获取传感器总数
export function getSensorCount() {
  return request({
    url: '/system/sensor/count',
    method: 'get',
  })
}
// 查询传感器详细
export function getSensor(sensorId) {
  return request({
    url: '/system/sensor/' + sensorId,
    method: 'get'
  })
}
// 新增传感器
export function addSensor(data) {
  return request({
    url: '/system/sensor',
    method: 'post',
    data: data
  })
}


