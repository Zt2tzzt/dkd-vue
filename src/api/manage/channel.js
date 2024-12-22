import request from '@/utils/request'

// 查询售货机货道列表
export function listChannel(query) {
  return request({
    url: '/manage/channel/list',
    method: 'get',
    params: query
  })
}

// 查询售货机货道详细
export function getChannel(id) {
  return request({
    url: '/manage/channel/' + id,
    method: 'get'
  })
}

// 新增售货机货道
export function addChannel(data) {
  return request({
    url: '/manage/channel',
    method: 'post',
    data: data
  })
}

// 修改售货机货道
export function updateChannel(data) {
  return request({
    url: '/manage/channel',
    method: 'put',
    data: data
  })
}

// 删除售货机货道
export function delChannel(id) {
  return request({
    url: '/manage/channel/' + id,
    method: 'delete'
  })
}

// 查询货道列表
export function getGoodsList(innerCode) {
  return request({
    url: '/manage/channel/list/' + innerCode,
    method: 'get',
  });
}
// 查询设备类型
export function getGoodsType(typeId) {
  return request({
    url: '/manage/vmType/' + typeId,
    method: 'get',
  });
}
// 提交获取的货道
export function channelConfig(data) {
  return request({
    url: '/manage/channel/config',
    method: 'put',
    data: data,
  });
}
