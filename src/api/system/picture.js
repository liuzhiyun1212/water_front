import request from '@/utils/request'


// 新增planAndParts
export function upload(data) {
  return request({
    url: '/system/picture/upload',
    method: 'post',
    data: data
  })
}
