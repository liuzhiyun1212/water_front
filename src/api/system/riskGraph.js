import request from '@/utils/request'


export function initGraphApi() {
  return request({
    url: '/riskGraph/initGraph',
    method: 'get'
  })
}

