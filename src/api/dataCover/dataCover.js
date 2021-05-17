import request from '../../router/request'


export function selectHomePage() {
       return request({
        url: '/api/wechat/dataCover/selectHomePage',
        method: 'get',
    })
}
 
export function selcteMonthly() {
    return request({
     url: '/api/wechat/dataCover/selcteMonthly',
     method: 'get',
 })
}