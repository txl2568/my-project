import request from '../../router/request'

export function selectRoleIdAppMenu() {
    return request({
     url: '/api/wechat/weChatMenu/selectRoleIdAppMenu',
     method: 'get',
 })
}