import request from '../../router/request'

export function userReportList(limit, page, userReport) {
    return request({
     url: '/api/wechat/userReport/list',
     method: 'post',
     params:{
        limit, 
        page,
     },
     data: userReport

 })
}