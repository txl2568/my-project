<template>
  <div>
       <div class="card">
            <p>告警位置</p>
            <div class="model-map">
                <div id="map" :style="{width:'100%',height:'300px'}"></div>
            </div>
            <div class="navgat" @click="goNavigation">
                <p>导航</p>
            </div>
       </div>

        <div class="card">
            <p>告警类型</p>
            <div class="inner">
                <div class="inner-title">
                    <div class="title" v-if="dataCoverList.gateState == 'OPENED'">
                        <img src="../assets/images/icon_gjlx_qj.png" />
                        <span class="title-span">撬警</span>
                    </div>
                    <div class="title" v-if="dataCoverList.ksdstatus == 'ABNORMAL'">
                        <img src="../assets/images/icon_gjlx_gw.png" />
                        <span class="title-span">高温</span>
                    </div>
                    <div class="title" v-if="dataCoverList.wlm1Status == 'ABNORMAL' || 
                    dataCoverList.wlm2Status == 'ABNORMAL' || dataCoverList.wlm3Status == 'ABNORMAL'"> 
                        <img src="../assets/images/icon_gjlx_yw.png" />
                        <span class="title-span">液位</span>
                    </div>
                    <div class="title" v-if="dataCoverList.bombDetected == 'YES'">
                        <img src="../assets/images/icon_gjlx_rb.png" />
                        <span class="title-span">燃爆</span>
                    </div>
                     <div class="title" v-if="dataCoverList.coverStatus == 1">
                        <span class="title-span2">【该井盖已消警】</span>
                    </div>
                </div>
                <div class="jiejin-btn" v-if="dataCoverList.gateState == 'OPENED'" @click="goJiej">
                    <span>接警</span>
                </div>
            </div>
        </div>

        <div class="card">
            <p>基本信息</p>
            <div class="list2" >
                <div class="set">
                    <span class="p1">终端编码：</span>
                    <span class="p2">{{dataCoverList.chipCode}}</span>
                </div>
                <div class="set">
                    <span class="p1">井盖编码：</span>
                    <span class="p2">{{dataCoverList.coverMcn}}</span>
                </div>
                <div class="set">
                    <span class="p1">井盖型号：</span>
                    <span class="p2">{{dataCoverList.coverTypeName}}</span>
                </div>
                <div class="set">
                    <span class="p1">井盖类型：</span>
                    <span class="p2">{{dataCoverList.coverWelltypeName}}</span>
                </div>
                 <div class="set">
                    <span class="p1">归属单位：</span>
                    <span class="p2">{{dataCoverList.deptName}}</span>
                </div>
                <div class="set">
                    <span class="p1">归属厂商：</span>
                    <span class="p2">{{dataCoverList.businessName}}</span>
                </div>
                <div class="set">
                    <span class="p1">水位深度：</span>
                    <span class="p2">{{dataCoverList.waterLevelValue}}</span>
                    <span class="p2" v-if="dataCoverList.waterLevelValue">cm</span>
                </div>
                <div class="set">
                    <span class="p1">探头类型：</span>
                    <span class="p2">{{dataCoverList.probeTypeName}}</span>
                </div>
                <div class="set">
                    <span class="p1">安装地址：</span>
                    <span class="p2">{{dataCoverList.coverAddress}}</span>
                </div>
            </div>
        </div>

        <div class="js_dialog" ref="iosDialog" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">是否进行撬警接警？</div>
              <div class="weui-dialog__ft">
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a>
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm">确定</a>
              </div>
          </div>
      </div>

       <div class="js_dialog" ref="iosDialog2" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">{{message}}</div>
              <div class="weui-dialog__ft">
                  <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a> -->
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm2">确定</a>
              </div>
          </div>
      </div>

       <div ref="loadingToast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">接警中</p>
            </div>
       </div>


  </div>
</template>

<script>
// import {  } from "";
import axios from 'axios';
import wx from 'weixin-js-sdk';
import weui from 'weui.js';
import 'weui';

export default {
    data(){
        return{
            coverUrl: "/api/wechat/dataCover/selectDataCoverMcn/",
            coverMcn: this.$route.query.coverMcn,
            openId: this.$route.query.openId,
            jsValidUrl:'/api/wechat/jsValidOpenId?',
            url: window.location.href,
            dataCoverList:{},
            longitude:'',
            latitude:'',
            stateByMcnUrl:'/api/wechat/sysEvent/stateByMcnOpenId/',
            eventType:'PryWell',
            message:''

        }
    },
    created(){
        this.init();
        this.selectDataCoverMcn();
    },
    methods:{
        init(){
            //  let self = this;
            // if (navigator.userAgent.indexOf('iPhone') !== -1) {
            //     self.url = sessionStorage.getItem('Url');
                

            // }  else {
            //     const { href } = window.location;
            //     self.url = href;
            // }
            axios({
                    method: "post",

                    url: this.jsValidUrl + 'url=' + this.base64encode(this.url) + '&openIds=' + this.openId
                    
                }).then(res => {
                    if (res.data.code === 200) {
                        var that = this;
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.data.data.appId, // 必填，公众号的唯一标识
                            timestamp: res.data.data.timestame, // 必填，生成签名的时间戳
                            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                            signature: res.data.data.signature,// 必填，签名
                            jsApiList: ['checkJsApi','openLocation'] // 必填，需要使用的JS接口列表
                        });

                        wx.checkJsApi({
                            jsApiList: ['openLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: function (res) {
                                if (res.checkResult.getLocation == false) {
                                    // $("#loadingToast").hide();
                                    alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                                    return false;
                                }
                            }
                        });

                        // this.resetPointFn()
                        // alert()
                        wx.ready(function() {
                            //  that.goNavigation()
                        });
                        
                        wx.error(function (res) {
                            console.log("===="+res);
                            // $("#loadingToast").hide();
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                            alert("验证出错");
                            return false;
                        });
                       

                   
                    } else {
                        alert(res.data.message)
                    }
            }).catch(error =>{})
        },
        goNavigation(){
             wx.openLocation({
                latitude: Number(this.latitude), // 纬度，浮点数，范围为90 ~ -90
                longitude: Number(this.longitude), // 经度，浮点数，范围为180 ~ -180。
                // name: '', // 位置名
                // address: '', // 地址详情说明
                scale: 17, // 地图缩放级别,整形值,范围从1~28。默认为最大
                // infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });

        },
        base64encode(str){
            var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },
        selectDataCoverMcn(){
            axios({
                    method: "get",
                    url: this.coverUrl + this.coverMcn + "/" + this.openId
                }).then(res => {
                    if (res.data.code === 200) {
                        this.dataCoverList =  res.data.data.dataCoverList;
                        this.longitude = res.data.data.dataCoverList.longitude;
                        this.latitude = res.data.data.dataCoverList.latitude;
                        this.initMap(res.data.data.dataCoverList.longitude, res.data.data.dataCoverList.latitude)
                    } else {
                        // alert(res.data.message)   
                        this.message = res.data.message
                        this.$refs.iosDialog2.style.display = 'block';
                    }
            });
        },
        initMap(longitude,latitude){
            var map = new AMap.Map('map', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom:16, //初始化地图层级
                center: [longitude,latitude] //初始化地图中心点,
            });

            if (this.dataCoverList.coverStatus == 0 || this.dataCoverList.coverStatus == 1) {
                var img = require("../assets/images/icon_locate_blue_pre.png");
                }
            if (this.dataCoverList.coverStatus == 2) {
                    var img = require("../assets/images/icon_locate_red_pre.png");
            }
            if (this.dataCoverList.coverStatus == 3) {
                    var img = require("../assets/images/icon_locate_grey_pre.png");
            }

            var marker = new AMap.Marker({
                position: new AMap.LngLat(longitude,latitude),
                offset: new AMap.Pixel(-10, -10),
                icon: new AMap.Icon({
                    image: img,
                    size: new AMap.Size(100, 100),  //图标大小 
                    imageSize: new AMap.Size(40,40)
                })
            });
            map.add(marker);
        },
        goJiej(){
            this.$refs.iosDialog.style.display = 'block';
        },
        cancel(){
            this.$refs.iosDialog.style.display = 'none';
        },
        confirm(){
            this.$refs.iosDialog.style.display = 'none';
            this.$refs.loadingToast.style.display = 'block';

             axios({
                    method: "post",
                    url: this.stateByMcnUrl,
                    params:{
                        'coverMcn':this.coverMcn,
                        'eventType':this.eventType,
                        'openId':this.openId
                    },
                    // data:this.openId
                }).then(res => {
                    // console.log(res.data.code)
                    if (res.data.code == 200) {
                        // console.log(res.data.data);
                        // this.dataCoverList =  res.data.data.dataCoverList;
                        // this.longitude = res.data.data.dataCoverList.longitude;
                        // this.latitude = res.data.data.dataCoverList.latitude;
                        // this.initMap(this.longitude, this.latitude)
                        this.$refs.loadingToast.style.display = 'none';
                        this.message = res.data.data;
                        this.$refs.iosDialog2.style.display = 'block';
                    } else {
                        this.$refs.loadingToast.style.display = 'none';
                        this.message = res.data.message
                        this.$refs.iosDialog2.style.display = 'block';
                    }
            }).catch(error =>{
                //    alert(error)
            })
        },
        confirm2(){
            this.$refs.iosDialog2.style.display = 'none';
            this.selectDataCoverMcn()
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

.weui-dialog{
  width: 70%;
}
.weui-dialog__title{
  font-size: 28px;
}
.weui-dialog__bd{
  font-size: 33px;
  margin-bottom: 30PX;
}
.weui-dialog__ft {
  line-height: 90px;
}
.weui-dialog__hd{
    padding-bottom: 30px;
}
.default{
  font-size: 30px;
}
.primary{
   font-size: 30px;
}

.card{
    background-color: #fff;
    //  height: 430px;
     height: 100%;
     margin-bottom: 20px;
     .navgat{
         background-color:rgba(255, 153, 0,0.3);
         position: relative;
         bottom: 0;
         border-bottom: 1px #e5e5e5 solid;
         p{
             font-size: 28px;
             text-align: center;
             color: #666;
         }
     }
      .inner{
         padding: 20px 35px;
         display: flex;
         justify-content: space-between;
         align-items: center;
         .inner-title{
              display: flex;
               align-items: center;
         }
         .title{
                display: flex;
                align-items: center;
                margin-right: 20px;
                img{
                    width: 40px;
                    height: 40px;
                }
                .title-span{
                    font-size: 28px;
                    color: #666;
                }
                 .title-span2{
                    font-size: 28px;
                    color: red;
                }
         }
         .jiejin-btn{
            background-color: #1890ff;
            border-radius: 10px;
            width: 120px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                font-size: 28px;
                color: #fff;
            }
         }
     }
     p{
         font-size: 30px;
         height: 80px;
         line-height: 80px;
         border-bottom: 1px #e5e5e5 solid;
         padding-left: 10px;
     }
     .list2{
          padding: 20px;
        //    height: 100%;
         .set{
            // height: 28px;
            margin-bottom: 5px;
         }
        
         .p1{
             font-size: 28px;
             line-height: 28px;
             color: #666;
             letter-spacing:5px;
            //  letter-spacing:10px;
            //  width: 200px;
            //  text-align: justify;
            //  text-align-last: justify;
            //  display: inline-block;
         }
         .p2{
             font-size: 28px;
             line-height: 28px;
             color: #999;
             padding-left: 10px;
         }
     }
    .model-img{
        padding: 20px;
        display: flex;
        justify-content: space-around;
        .border-img{
            width: 48%;
            height: 230px;
            border: 1px #e5e5e5 solid;
            border-radius: 15px;
            
        }
        img{
            width: 100%;
            height: 230px;
            border-radius: 15px;
        }
    }
    .map-title{
        display: flex;
        justify-content: space-between;
        padding-right: 25px;
    }
}

</style>