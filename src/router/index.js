import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import IsNotWeChatUser from '../views/isNotWeChatUser'
import Home from '../views/Home'
import MyOfReport from '../views/myOfReport'
import alarm from '../views/alarm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/isNotWeChatUser',
    name: 'IsNotWeChatUser',
    component: IsNotWeChatUser,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title:'首页'
    }
  },
  {
    path: '/owner',
    name: 'owner',
    component: () => import(/* webpackChunkName: "owner" */ '../views/owner')
  },
  {
    path: '/function',
    name: 'function',
    component: () => import(/* webpackChunkName: "function" */ '../views/function')
  },
  {
    path: '/repair',
    name: 'repair',
    component: () => import(/* webpackChunkName: "repair" */ '../views/repair')
  },
  {
    path:'/myOfReport',
    name: 'MyOfReport',
    component: MyOfReport
    // component: () => import(/* webpackChunkName: "myOfReport" */ '../views/myOfReport')
  },
  {
    path:'/myRepair',
    name: 'myRepair',
    component: () => import(/* webpackChunkName: "myRepair" */ '../views/myRepair')
  },
  {
    path:'/myRepairDetail',
    name: 'myRepairDetail',
    component: () => import(/* webpackChunkName: "myRepairDetail" */ '../views/myRepairDetail')
  },
  {
    path:'/myRedEnvelope',
    name: 'myRedEnvelope',
    component: () => import(/* webpackChunkName: "myRedEnvelope" */ '../views/myRedEnvelope')
  },
  {
    path:'/sendThePosition',
    name: 'sendThePosition',
    component: () => import(/* webpackChunkName: "sendThePosition" */ '../views/sendThePosition')
  },
  {
    path:'/photoUpload',
    name: 'photoUpload',
    component: () => import(/* webpackChunkName: "photoUpload" */ '../views/photoUpload')
  },
  {
    path:'/examinationReport',
    name: 'examinationReport',
    component: () => import(/* webpackChunkName: "examinationReport" */ '../views/examinationReport')
  },
  {
    path:'/examinationMainten',
    name: 'examinationMainten',
    component: () => import(/* webpackChunkName: "examinationMainten" */ '../views/examinationMainten')
  },
  {
    path:'/dataQuery',
    name: 'dataQuery',
    component: () => import(/* webpackChunkName: "dataQuery" */ '../views/dataQuery')
  },
  {
    path:'/dataQueryNavigation',
    name: 'dataQueryNavigation',
    component: () => import(/* webpackChunkName: "dataQueryNavigation" */ '../views/dataQueryNavigation')

  },
  {
    path:'/MsgalarmRecord',
    name: 'MsgalarmRecord',
    component: () => import(/* webpackChunkName: "MsgalarmRecord" */ '../views/MsgalarmRecord')
  },
  {
    path:'/MsgalarmRecordDetail',
    name: 'MsgalarmRecordDetail',
    component: () => import(/* webpackChunkName: "MsgalarmRecordDetail" */ '../views/MsgalarmRecordDetail')
  },
  {
    path:'/MsgDataCollection',
    name: 'MsgDataCollection',
    component: () => import(/* webpackChunkName: "MsgDataCollection" */ '../views/MsgDataCollection')
  },
  {
    path:'/MsgBindingLog',
    name: 'MsgBindingLog',
    component: () => import(/* webpackChunkName: "MsgBindingLog" */ '../views/MsgBindingLog')
  },
  {
    path:'/MsgTerminalBinding',
    name: 'MsgTerminalBinding',
    component: () => import(/* webpackChunkName: "MsgTerminalBinding" */ '../views/MsgTerminalBinding')
  },
  {
    path:'/MsgTerminalUnbundling',
    name: 'MsgTerminalUnbundling',
    component: () => import(/* webpackChunkName: "MsgTerminalUnbundling" */ '../views/MsgTerminalUnbundling')
  },
  {
    path:'/examinationMaintenOver',
    name: 'examinationMaintenOver',
    component: () => import(/* webpackChunkName: "examinationMaintenOver" */ '../views/examinationMaintenOver')
  },
  {
    path:'/examinationMaintenDetail',
    name: 'examinationMaintenDetail',
    component: () => import(/* webpackChunkName: "examinationMaintenDetail" */ '../views/examinationMaintenDetail')
  },
  {
    path:'/examinationReportDetail',
    name: 'examinationReportDetail',
    component: () => import(/* webpackChunkName: "examinationReportDetail" */ '../views/examinationReportDetail')
  },
  {
    path:'/examinationRepairOrder',
    name: 'examinationRepairOrder',
    component: () => import(/* webpackChunkName: "examinationRepairOrder" */ '../views/examinationRepairOrder')
  },
  {
    path:'/examinationRepairOrderDetail',
    name: 'examinationRepairOrderDetail',
    component: () => import(/* webpackChunkName: "examinationRepairOrderDetail" */ '../views/examinationRepairOrderDetail')
  },
  {
    path:'/alarm',
    name: 'alarm',
    component: alarm,
    // component: () => import(/* webpackChunkName: "alarm" */ '../views/alarm')
  },
  {
    path:'/coverMap',
    name: 'coverMap',
    component: () => import(/* webpackChunkName: "coverMap" */ '../views/coverMap')
  },
  {
    path:'/instructIssuedBy',
    name: 'instructIssuedBy',
    component: () => import(/* webpackChunkName: "instructIssuedBy" */ '../views/instructIssuedBy')
  },
  {
    path:'/terminal',
    name: 'terminal',
    component: () => import(/* webpackChunkName: "terminal" */ '../views/terminal')
  },
  {
    path:'/terminalDetail',
    name: 'terminalDetail',
    component: () => import(/* webpackChunkName: "terminalDetail" */ '../views/terminalDetail')
  },
  {
    path:'/installEntry',
    name: 'installEntry',
    component: () => import(/* webpackChunkName: "installEntry" */ '../views/installEntry')
  },
  {
    path:'/installEntryNotUser',
    name: 'installEntryNotUser',
    component: () => import(/* webpackChunkName: "installEntryNotUser" */ '../views/installEntryNotUser')
  },
  {
    path:'/MsgAbnormalChipset',
    name: 'MsgAbnormalChipset',
    component: () => import(/* webpackChunkName: "MsgAbnormalChipset" */ '../views/MsgAbnormalChipset')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.meta.title){
//     window.document.title = to.meta.title
//   } else {
//  next()
// }
// })

export default router
