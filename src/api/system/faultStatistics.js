import request from '@/utils/request'

// 查询faultStatistics列表
export function listFaultStatistics(query) {
    return request({
        url: '/statistics/fault/list',
        method: 'get',
        params: query
    })
}

// 根据某个属性进行统计
export function countData(query) {
    return request({
        url: '/statistics/fault/count',
        method: 'get',
        params: query
    })
}

// 根据设备编号和发生时间查找维保记录
export function getMaintenanceName(query) {
    return request({
        url: '/statistics/fault/getMaintenanceName',
        method: 'get',
        params: query
    })
}

//获取设备故障类型
export function getFaultList() {
    return request({
        url: '/statistics/fault/getFaultList',
        method: 'get'
    })
}