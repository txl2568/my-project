import request from '../../router/request'


export function selectWeChatUser() {
       return request({
        url: '/api/wechat/user/selectWeChatUser',
        method: 'post',
    })
}

export function getCode(phone) {
    return request({
     url: '/api/wechat/user/getCode/'+ phone,
     method: 'post',
    })
}

export function selectUsetPhone(param) {
    return request({
     url: '/api/wechat/user/selectUsetPhone/'+ param,
     method: 'post',
    })
}

export function saveBind(account, phone, verification) {
    return request({
     url: '/api/wechat/user/saveBind',
     method: 'post',
     params: { 
         account,
         phone,
         verification
     }
    })
}

export function selectAccount() {
    return request({
     url: '/api/wechat/user/selectAccount',
     method: 'get',
    })
}

export function myUserAccount(accountId,limit,page) {
    return request({
     url: '/api/wechat/user/myUserAccount',
     method: 'post',
     params: {
        accountId, //取出params所有可遍历属性，复制到当前
        limit,
        page,
      }
    })
}


export function isNoBinding() {
    return request({
     url: '/api/wechat/user/isNoBinding',
     method: 'get',
    })
}


export function selectBind(limit, page) {
    return request({
     url: '/api/wechat/user/selectBind',
     method: 'post',
     params: {
        limit,
        page,
      }
    })
}


export function isNotWeChatUser() {
    return request({
     url: '/api/wechat/user/isNotWeChatUser',
     method: 'post',
    })
}

