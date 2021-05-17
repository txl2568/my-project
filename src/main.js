import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$axios = axios

import 'amfe-flexible/index' 


import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// console.log(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: '3677ae9796c79aa20c33cdae66b55c71', //申请的key码需要填写的地方，格式为长串字符数字
//   plugin: ['AMap.Geolocation','AMap.MarkerClusterer','AMap.DistrictSearch','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   v: '1.4.4' // 默认高德 sdk 版本为 1.4.4
// });

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';
// // import { Button } from 'vant';
// Vue.use(Button);


import { List, PullRefresh, Popup, Picker    } from 'vant';
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Picker);

import 'vant/lib/index.css';

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
