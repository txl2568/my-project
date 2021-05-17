<template>
    <div>
        <Header :data="msg"></Header>
        <div id="map" :style="{width:'100%',height:'300px'}"></div>
        <label class="resetPoint" @click="resetPointFn" >更新位置</label>
        <span class="address-span" v-if="address" >{{address}}</span>
        <button type="button" class="code-btn" v-if="address" @click="sendLocation">发送</button>
        <!-- <Toast :message="message"   ref="toast"></Toast> -->
        <div id="textToast" ref="textToast" style="display:none">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast weui-toast_text">
                <p class="weui-toast__content">更新成功</p>
            </div>
        </div>

        <div ref="loadingToast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">发送中</p>
            </div>
        </div>

  </div>
</template>


<script>
// import wx from 'weixin-js-sdk';
import wx from 'jweixin-1.6.0';
import {jsValid, transform, getAddres, reportLocation} from '../api/user/wechat';
import Header from '../components/Header2';
// import Toast from '../components/Toast';
import weui from 'weui.js';
import 'weui';

export default {
    data(){
 
        return {
            lng: 0,
            lat: 0,
            loaded: false,
            url: window.location.href,
            latitude:'',
            longitude:'',
            locations:'',
            address:sessionStorage.getItem("getAddres"),
            coverMcn:'',
            message: '更新位置成功',
            status:null,
            msg:'发送位置',
            loading:false,
            
        }
    },
    components:{
        Header
    },
    watch:{
        coverMcn:{
            handler(newVal, oldVal) {
                if (newVal) {
                    // console.log('当前值=====',newVal);
                    this.coverMcn = newVal
                }
            }
        }
    },
    created(){
    //    sessionStorage.setItem('url',window.location.href)
         this.init();
        //  this.coverMcn = this.$route.params.coverMcn;
         
         
          
    },
    mounted(){
        if(!sessionStorage.getItem("longitude") && !sessionStorage.getItem("latitude")){
            this.initMap(0,0);
        }
        // if (sessionStorage.getItem("coverMcn")) {
            this.coverMcn = sessionStorage.getItem("coverMcn")
        // }
    },
    methods:{
        init(){
            let self = this;
           
            

            
             if (navigator.userAgent.indexOf('iPhone') !== -1) {
                self.url = sessionStorage.getItem('Url');
                

            }  else {
                const { href } = window.location;
                self.url = href;
            }
            

            jsValid(self.url).then(res =>{
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.data.timestame, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名
                    jsApiList: ['checkJsApi','openLocation','getLocation'] // 必填，需要使用的JS接口列表
                });
            }).catch(error => {
            });

           


            wx.checkJsApi({
                jsApiList: ['openLocation','getLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    if (res.checkResult.getLocation == false) {
                        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                        return false;
                    }
                }
            });
            console.log('this',this);
            // this.resetPointFn()

            wx.ready(function() {
            //config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            // _map();
            // resetPointFn(function () {
            //    alert(self);
                 self.resetPointFn()

            });
           
            wx.error(function (res) {
                console.log("===="+res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                // alert("验证出错");
                return false;
            });

          
        },
        initMap(longitude,latitude){
            console.log(longitude+"===="+latitude)
              var img = "../assets/images/icon_locate_blue_pre.png";
            // if (this.status == 1) {
            //     img = "../assets/images/icon_locate_red_pre.png";
            // }
             var map = new AMap.Map('map', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom:16, //初始化地图层级
                    center: [longitude,latitude] //初始化地图中心点,
                });
                var marker = new AMap.Marker({
                    position: new AMap.LngLat(longitude,latitude),
                    offset: new AMap.Pixel(-10, -10),
                    icon: new AMap.Icon({
                    image: require("../assets/images/icon_locate_blue_pre.png"),
                    // image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
                    size: new AMap.Size(100, 100),  //图标大小 
                    imageSize: new AMap.Size(40,40)
                })
                });
                map.add(marker);
        },
        sendLocation(){
                this.reportLocation()
           
        },
        reportLocation(){
            reportLocation(sessionStorage.getItem("getAddres"), sessionStorage.getItem("latitude"), sessionStorage.getItem("longitude"), this.coverMcn).then(res =>{

                if (res.data.code == 500) {
                    alert(res.data.message)
                }
                if (res.data.code == 200) {
                    this.loading = true
                    this.$router.push({
                        name:'photoUpload'
                    })
                }
                
            }).catch(error =>{
            })
        },
        resetPointFn(){
            // alert(122)
             let self = this;
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log('---------getLocation--------',res);
                    self.locations =  res.longitude + ','+  res.latitude 
                    // this.center = [res.latitude ,res.longitude];
                    
                    transform('gps',self.locations,'JSON').then(res =>{

                         console.log('=======self======',self)
                        
                        self.latitude = res.data.data.lat;
                        self.longitude = res.data.data.log;

                        self.status = res.data.data.status;
                        // console.log('transform==',this.latitude);
                        // console.log('transform',this.longitude);
                        sessionStorage.setItem("longitude",res.data.data.log);
                        sessionStorage.setItem("latitude",  res.data.data.lat);

                        self.initMap(res.data.data.log,res.data.data.lat) //
                        
                        

                         getAddres( res.data.data.lat, res.data.data.log).then(res =>{
                            

                             if (res.data.code == 200) {
                                    sessionStorage.setItem("getAddres", res.data.data);
                                    self.address =res.data.data //
                                    
                                   
                                    self.$refs.textToast.style.display = 'block'

                                    window.setTimeout(function () {
                                        self.$refs.textToast.style.display = 'none'
                                    }, 1000);
                             }
                             if (res.data.code == 500) {
                                 alert('定位失败，请重新更新位置')
                             }
                           
                            

                        })
                        this.initMap(res.data.data.log, res.data.data.lat)
                       
                        
                    }).catch(error => {
                    });

                   
                },
                 fail: res => {
                    //接口调用失败，提示用户打开定位功能
                    self.wetoast.toast({ title: '获取定位失败，请打开定位，重新进入！' });
                }
            });

            
           
        },
        showToast() {
            this.$refs.toast.show()
        }
 
        
    }
   }
</script>

<style lang="scss" scoped>
.weui-toast__content{
    font-size: 33px;
}
.weui-toast{
    top: 50%;
    width: 200px;
    height: 200px;
}

.resetPoint{
    color: #007aff;
    text-align: center;
    font-size: 30px;
    display: block;
    margin-top: 20px;
}
button{
  border: none;
background-color: transparent;
outline: none;    
}
.code-btn{
    width:200px;
    height:70px;
    background-color:#1890ff;
    border-radius:15px;
    color:#fff;
    font-size:30px;
    margin-left:50px;
    line-height:70px;
    text-align: center;
    margin: auto;
    display: block;
    margin-top: 90px;
}
.address-span{
     font-size:30px;
     text-align: center; 
     display: block;
     margin: 50px 20px 0 20px;
}
</style>