import request from '@/utils/request'

// 查询tree列表
export function listTree(query) {
  return request({
    url: '/system/tree/list',
    method: 'get',
    params: query
  })
}

export function getlistTree(query) {
  return request({
    url: '/system/devtable/listAll2',
    method: 'get',
    params: query
  })
}

//用于查询设备详情 返回设备编码
export function getTreecode(id) {
  return request({
    url: '/system/devtable/treecode/'+id,
    method: 'get',
  })
}
//返回故障设备的所有祖先结点的id
export function getAncfla() {
  return request({
    url: '/system/devtable/ancfla',
    method: 'get',
  })
}

//返回维护设备的所有祖先结点的id
export function getAncrep() {
  return request({
    url: '/system/devtable/ancrep',
    method: 'get',
  })
}


//返回报废设备的所有祖先结点的id
export function getAncbad() {
  return request({
    url: '/system/devtable/ancbad',
    method: 'get',
  })
}


//统计不同状态的设备的数量
export function getEqus() {
  return request({
    url: '/system/devtable/equs',
    method: 'get',
  })
}





// 查询tree详细
export function getTree(id) {
  return request({
    url: '/system/devtable/' + id,
    method: 'get'
  })
}

// 查询设备树列表
export function listAllTree(query) {
  return request({
    url: '/system/tree/listAll',
    method: 'get',
    params: query
  })
}
// 获取设备树节点层级关系 以供级联下拉框使用
export function listLevelNode(query) {
  return request({
    url: '/system/devtable/listLevel',
    method: 'get',
    params: query
  })
}
// 获取设备树节点层级关系 以供级联下拉框使用 不包含叶子结点
export function listLevelButLeaf(query) {
  return request({
    url: '/system/devtable/listLevelButLeaf',
    method: 'get',
    params: query
  })
}

// 新增tree
export function addTree(data) {
  return request({
    url: '/system/tree',
    method: 'post',
    data: data
  })
}

// 修改tree
export function updateTree(data) {
  return request({
    url: '/system/tree',
    method: 'put',
    data: data
  })
}

// 删除tree
export function delTree(id) {
  return request({
    url: '/system/tree/' + id,
    method: 'delete'
  })
}
