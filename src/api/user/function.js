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

export function userRepairList(limit, page, userRepairParam) {
    return request({
     url: '/api/wechat/userRepair/list',
     method: 'post',
     params:{
        limit, 
        page,
     },
     data: userRepairParam

 })
}

export function selectDataCoverMcnOrSn(mcnOrSn) {
    return request({
     url: '/api/wechat/dataCover/selectDataCoverMcnOrSn/'+mcnOrSn,
     method: 'get',
 })
}


export function sysEventList(limit, page, sysEventParam) {
    return request({
     url: '/api/wechat/sysEvent/list',
     method: 'post',
     params:{
        limit, 
        page,
     },
     data: sysEventParam
 })
}


export function updateStateByMcn(coverMcn, eventType, uuid) {
    return request({
     url: '/api/wechat/sysEvent/updateStateByMcn',
     method: 'post',
     data: {
        coverMcn, 
        eventType, 
        uuid
     }
 })
}


export function selectDictionariesCode(text,value,list) {
    return request({
     url: '/api/wechat/dataCover/selectDictionariesCode',
     method: 'post',
     params:{
        text,
        value,
        list
     },
 })
}


export function saveChipBinding(mcn,sn,res,isReplace) {
    return request({
     url: '/api/wechat/dataCover/saveChipBinding/'+ mcn + '/' + sn +  '/' + res +  '/' + isReplace,
     method: 'post',
 })
}


export function selectDataCoverMcn(coverMcn) {
    return request({
     url: '/api/wechat/dataCover/selectDataCoverMcn/'+coverMcn,
     method: 'get',
 })
}

export function selectDataCoverMcnBySnUnbind(coverMcn) {
    return request({
     url: '/api/wechat/dataCover/selectDataCoverMcnBySnUnbind/'+coverMcn,
     method: 'get',
 })
}


export function selectBingdingLog(limit, page, param) {
    return request({
     url: '/api/wechat/dataCover/selectBingdingLog',
     method: 'post',
     params:{
        limit,
        page,
     },
     data: param
 })
}


export function saveChipUnbind(mcn, sn, isReplace) {
    return request({
     url: '/api/wechat/dataCover/saveChipUnbind/'+ mcn + '/' + sn + '/' + isReplace,
     method: 'post',
 })
}


export function saveUserReport(param) {
    return request({
     url: '/api/wechat/userReport/saveUserReport',
     method: 'post',
     data: param
 })
}


export function repairItemStart(sjjwUserRepairParam) {
    return request({
     url: '/api/wechat/userRepair/repairItemStart',
     method: 'post',
     data: sjjwUserRepairParam
 })
}


export function repairItemEnd(sjjwUserRepairParam) {
    return request({
     url: '/api/wechat/userRepair/repairItemEnd',
     method: 'post',
     data: sjjwUserRepairParam
 })
}


export function selectUserRepairDetail(param) {
    return request({
     url: '/api/wechat/userRepair/selectUserRepairDetail',
     method: 'post',
     data: param
 })
}

export function selectUserReportDetail(param) {
    return request({
     url: '/api/wechat/userReport/selectUserReportDetail',
     method: 'post',
     data: param
 })
}


export function selectSysEventDetail(sysEventParam) {
    return request({
     url: '/api/wechat/sysEvent/selectSysEventDetail',
     method: 'post',
     data: sysEventParam
 })
}


export function dataWorkList(limit, page, param) {
    return request({
     url: '/api/wechat/dataWork/list',
     method: 'post',
     params:{
        limit,
        page,
     },
     data: param
 })
}


export function dataWorkListDetail(id) {
    return request({
     url: '/api/wechat/dataWork/detail',
     method: 'get',
     params:{
        id,
     },
 })
}


export function selectCoverMcnOrSn(mcn) {
    return request({
     url: '/api/wechat/dataCover/selectCoverMcnOrSn/'+ mcn,
     method: 'get',
 })
}


export function saveCoverWellMcn(row) {
    return request({
     url: '/api/wechat/dataCover/saveCoverWellMcn',
     method: 'post',
     data: row
 })
}


export function selectProvinceCount(level0, provinceId, cityId) {
    return request({
     url: '/api/wechat/dataCoverMap/selectProvinceCount',
     method: 'post',
     data: {
        level0, 
        provinceId, 
        cityId
     }
 })
}

export function selectDataCoverByDistrict(areaid) {
    return request({
     url: '/api/wechat/dataCoverMap/selectDataCoverByDistrict',
     method: 'post',
     data: {
        areaid
     }
 })
}


export function selectChipsetBySn(sn) {
    return request({
     url: '/api/wechat/dataCover/selectChipsetBySn/'+sn,
     method: 'get',
 })
}


export function commandItem(sn, configWorkState) {
    return request({
     url: '/api/wechat/dataCover/commandItem',
     method: 'post',
     params:{
        sn, 
        configWorkState
     }
 })
}


export function selectChipsetSn(sn) {
    return request({
     url: '/api/wechat/dataCover/selectChipsetSn/'+sn,
     method: 'get',
 })
}


export function getIdentityidByParam(identityid, needLevel) {
    return request({
     url: '/api/wechat/dataCoverMap/getIdentityidByParam',
     method: 'post',
     params:{
        identityid, 
        needLevel
     }
 })
}


export function selectDeptName(deptName) {
    return request({
     url: '/api/wechat/dataInstall/selectDeptName/'+deptName,
     method: 'get',
 })
}


export function dataEventStatisticsList(limit, page, snOrMcn) {
    return request({
     url: '/api/wechat/dataEventStatistics/list',
     method: 'get',
     params:{
        limit, 
        page,
        snOrMcn
     }
 })
}


//业主
export function installEntry(param) {
    return request({
     url: '/api/wechat/dataInstall/installEntry',
     method: 'post',
     data: param
 })
}

//非业主
export function installEntryOwner(param) {
    return request({
     url: '/api/wechat/dataInstall/installEntryOwner',
     method: 'post',
     data: param
 })
}


//业主
export function selectIsNotInstallByMcnOrSn(mcnOrSn) {
    return request({
     url: '/api/wechat/dataInstall/selectIsNotInstallByMcnOrSn/'+mcnOrSn,
     method: 'get',
 })
}


//非业主
export function selectIsNotInstallByMcnOrSnOwner(mcnOrSn) {
    return request({
     url: '/api/wechat/dataInstall/selectIsNotInstallByMcnOrSnOwner/'+mcnOrSn,
     method: 'get',
 })
}