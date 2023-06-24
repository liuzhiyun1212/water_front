import request from '@/utils/request'

export function getChartData() {
  return request({
    url: '/deal/list',
    method: 'get'
  })
}

export function listFaultDataNoLimit() {
  return request({
    url: '/deal/listFaultDataNoLimit',
    method: 'get'
  })
}