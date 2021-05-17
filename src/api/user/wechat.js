import request from '../../router/request'


export function jsValid(url) {
       return request({
        url: '/api/wechat/jsValid',
        method: 'post',
        params: { 
            url,
        }
    })
}


export function transform(coordsys,locations,output) {
    return request({
     url: '/api/wechat/transform',
     method: 'post',
     params: { 
        coordsys,
        locations,
        output
    }
 })
}

export function getAddres(latitude,longitude) {
    return request({
     url: '/api/wechat/getAddres/'+latitude+'/'+longitude,
     method: 'post',
 })
}

export function reportLocation(address, lat, log, mcn) {
    return request({
     url: '/api/wechat/userReport/reportLocation/'+address+'/'+lat+'/'+log+'/'+mcn,
     method: 'get',
 })
}

export function repairsSave(row) {
    return request({
     url: '/api/wechat/userReport/repairsSave',
     method: 'post',
     data: row
 })
}

export function selectDataCoverMcn(mcn) {
    return request({
     url: '/api/wechat/userReport/selectDataCoverMcn/'+mcn,
     method: 'get',
 })
}

export function filtrate() {
    return request({
     url: '/api/wechat/userReport/filtrate',
     method: 'get',
 })
}

export function myUserReport(limit, page, userReport) {
    return request({
     url: '/api/wechat/userReport/myUserReport',
     method: 'post',
     params: {
        limit,
        page
    },
    data: userReport 
 })
}




