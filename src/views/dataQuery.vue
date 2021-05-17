<template>
  <div>
      <Header :data="msg"></Header>
      <div class="card">
            <p>搜索内容</p>
            <div class="inner">
                <input type="text" class="input-mcn"  placeholder="请输入MCN码" v-model="mcn" >
                <button class="search-btn" @click="Search">查询</button>
            </div>
      </div>
      <div v-show="Object.keys(data).length > 0">
        <div class="card">
            <p>井盖信息</p>
            <div class="list2" >
                <div class="set">
                    <span class="p1">井盖编码：</span>
                    <span class="p2">{{dataCoverList.coverMcn?dataCoverList.coverMcn:'无编码'}}</span>
                </div>
                <div class="set">
                    <span class="p1">设备编码：</span>
                    <span class="p2">{{dataCoverList.chipCode}}</span>
                </div>
                <div class="set">
                    <span class="p1">设备状态：</span>
                    <span class="p2">{{dataCoverList.coverStatusName}}</span>
                </div>
                <div class="set">
                    <span class="p1">工作模式：</span>
                    <span class="p2">{{dataCoverList.configWorkStateName}}</span>
                </div>
                <div class="set">
                    <span class="p1">生产厂商：</span>
                    <span class="p2">{{dataCoverList.businessName}}</span>
                </div>
                <div class="set">
                    <span class="p1">生产时间：</span>
                    <span class="p2">{{dataCoverList.createTime}}</span>
                </div>
                <div class="set">
                    <span class="p1">归属业主：</span>
                    <span class="p2">{{dataCoverList.deptName}}</span>
                </div>
                <div class="set">
                    <span class="p1">井盖类型：</span>
                    <span class="p2">{{dataCoverList.coverTypeName}}</span>
                </div>
                <div class="set">
                    <span class="p1">井类型：</span>
                    <span class="p2">{{dataCoverList.coverWelltypeName}}</span>
                </div>
               <div class="set">
                    <span class="p1">安装时间：</span>
                    <span class="p2">{{dataCoverList.installTime}}</span>
                </div>
                <div class="set">
                    <span class="p1">安装地址：</span>
                    <span class="p2">{{dataCoverList.coverAddress}}</span>
                </div>
            </div>
        </div>
         <div class="card">
            <p>井内信息</p>
            <div class="list2" >
                <div class="set">
                    <span class="p1">设计单位：</span>
                    <span class="p2">{{dataCoverWellList.coverwellSzdw}}</span>
                </div>
                <div class="set">
                    <span class="p1">施工单位：</span>
                    <span class="p2">{{dataCoverWellList.coverwellSgdw}}</span>
                </div>
                <div class="set">
                    <span class="p1">管道类别：</span>
                    <span class="p2">{{dataCoverWellList.coverwellJngdlbName}}</span>
                </div>
                <div class="set">
                    <span class="p1">管道材质：</span>
                    <span class="p2">{{dataCoverWellList.coverwellGdczName}}</span>
                </div>
               <div class="set">
                    <span class="p1">管道口径：</span>
                    <span class="p2">{{dataCoverWellList.coverwellGdkjName}}</span>
                </div>
                <div class="set">
                    <span class="p1">离地深度：</span>
                    <span class="p2">{{dataCoverWellList.coverwellGdldsdName}}</span>
                </div>
                <div class="set">
                    <span class="p1">流向：</span>
                    <span class="p2">{{dataCoverWellList.coverwellLxName}}</span>
                </div>
                <div class="set">
                    <span class="p1">井深：</span>
                    <span class="p2">{{dataCoverWellList.coverwellJsName}}</span>
                </div>
            </div>
        </div>
         <div class="card" v-show="Object.keys(dataChipset).length > 0">
            <p>终端信息</p>
            <div class="list2" >
                  <div class="set">
                      <span class="p1">终端编码：</span>
                      <span class="p2">{{dataChipset.deviceSn}}</span>
                  </div>
                  <div class="set">
                      <span class="p1">运行模式：</span>
                      <span class="p2">{{dataChipset.configWorkStateName}}</span>
                  </div>
                   <div class="set">
                      <span class="p1">探头类型：</span>
                      <span class="p2">{{dataChipset.probeTypeName}}</span>
                   </div>
                   <div class="set">
                      <span class="p1">信号强度：</span>
                      <span class="p2">{{dataChipset.signalStrength}}</span>
                   </div>
                    <div class="set">
                        <span class="p1">电池电量：</span>
                        <span class="p2">{{dataChipset.cell}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">水位深度：</span>
                        <span class="p2">{{dataChipset.waterLevelValue}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">布防状态：</span>
                        <span class="p2">{{dataChipset.armingStateName}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">在线状态：</span>
                        <span class="p2">{{dataChipset.onlineStateName}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">设备状态：</span>
                        <span class="p2">{{dataChipset.deviceStateName}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">门磁状态：</span>
                        <span class="p2">{{dataChipset.gateStateName}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">水浸状态：</span>
                        <span class="p2">{{dataChipset.floodingStateName}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">GPS状态：</span>
                        <span class="p2">{{dataChipset.configGpsName}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">燃爆状态：</span>
                        <span class="p2">{{dataChipset.bombDetectedName}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">内核版本：</span>
                        <span class="p2">{{dataChipset.deviceKernelVersion}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">更新时间：</span>
                        <span class="p2">{{dataChipset.lastUpdateTime}}</span>
                    </div>
            </div>
        </div>
        <div class="card" v-show="reportCustom && reportCustom2">
                <p>井盖图片</p>
                <div class="model-img">
                    <div class="border-img" >
                        <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom"   @click="imgDetail"/>
                    </div>
                    <div class="border-img" >
                        <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom2"  @click="imgDetail2" />
                    </div>
                </div>
        </div>
         <div class="card" v-show="reportCustom21 && reportCustom22">
                <p>井内图片</p>
                <div class="model-img">
                    <div class="border-img" >
                        <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom21"   @click="imgDetail21"/>
                    </div>
                    <div class="border-img" >
                        <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom22"  @click="imgDetail22" />
                    </div>
                </div>
        </div>
        <div class="card">
                <div class="map-title">
                    <p>地图</p>
                    <p style="color:#1890ff" @click="goNavigation">导航</p>
                </div>
                <div class="model-map">
                    <div id="map" :style="{width:'100%',height:'300px'}"></div>
                </div>
               <!-- <div>这里显示位置</div> -->
        </div>
      </div>
    
      <!-- <JsValid :url="url" ref="jsValid"
       :reportCustom="reportCustom" 
       :reportCustom2="reportCustom2"
       :reportCustom21="reportCustom21" 
       :reportCustom22="reportCustom22"
        @initMap="initMap"></JsValid> -->

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
                <p class="weui-toast__content">查询中</p>
            </div>
       </div>

  </div>
</template>

<script>
import Header from '../components/Header2';
import { selectDataCoverMcnOrSn } from '../api/user/function';
import List from '../components/List';
// import JsValid from '../components/JsValid';
// import wx from 'weixin-js-sdk';
import {jsValid, transform} from '../api/user/wechat';
import weui from 'weui.js';
import 'weui';
import wx from 'weixin-js-sdk';
import { mapState } from 'vuex';

export default {
    data(){
        return{
           msg:'数据查询',
           data:{},
           dataCoverList:{},
           dataCoverWellList:{},
           dataChipset:{},
           mcn:'',
           chartValue:'',
           reportCustom:'',
           reportCustom2:'',
           reportCustom21:'',
           reportCustom22:'',
           url: window.location.href,
           longitude:'',
           latitude:'',
           message:''
        }
    },
    components:{
        Header,
        List,
        // JsValid
    },
    watch:{
        mcn:{
            handler(newVal, oldVal){
                if (newVal) {
                    sessionStorage.setItem('MCN', newVal);
                }
            }
        },
    },
    //  computed:{
    //     ...mapState({
    //             dataQueryMcn: state => state.user.dataQueryMcn
    //         }),
    // },
    created(){
        
        this.init()
        // if (sessionStorage.getItem('MCN')) {
        //     this.mcn = sessionStorage.getItem('MCN')
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
            // alert(self.url);
            jsValid(self.url).then(res =>{
                console.log('res==',res)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.data.timestame, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名
                    jsApiList: ['checkJsApi','chooseImage','uploadImage','getLocalImgData','previewImage','openLocation','getLocation','scanQRCode'] // 必填，需要使用的JS接口列表
                });
            }).catch(error => {
            });

           


            wx.checkJsApi({
                jsApiList: ['chooseImage','uploadImage','getLocalImgData','previewImage','openLocation','getLocation','scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    if (res.checkResult.getLocation == false) {
                        // $("#loadingToast").hide();
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
            //    console.log('ready+++++++++++++++++',self);
                //  self.resetPointFn()
                //  self.goNavigation()


              

            });
           
            wx.error(function (res) {
                console.log("===="+res);
                // $("#loadingToast").hide();
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                alert("验证出错");
                return false;
            });
        },
        selectDataCoverMcnOrSn(){
            selectDataCoverMcnOrSn(this.mcn).then(res =>{
                this.$refs.loadingToast.style.display = 'none';

                if (res.data.code == 200) {
                    this.data = res.data.data;
                    this.dataCoverList = res.data.data.dataCoverList;
                    this.dataCoverWellList = res.data.data.dataCoverWellList;
                    this.dataChipset = res.data.data.dataChipset?res.data.data.dataChipset:{};
                    console.log('2========================',this.data.length);
                    this.reportCustom = res.data.data.dataCoverList.coverImgpath?res.data.data.dataCoverList.coverImgpath:'';
                    this.reportCustom2 = res.data.data.dataCoverList.coverImgpath2?res.data.data.dataCoverList.coverImgpath2:'';

                    this.reportCustom21 = res.data.data.dataCoverWellList.coverwellImgpath?res.data.data.dataCoverWellList.coverwellImgpath:'';
                    this.reportCustom22 = res.data.data.dataCoverWellList.coverwellImgpath2?res.data.data.dataCoverWellList.coverwellImgpath2:'';
                    
                    this.longitude = res.data.data.dataCoverList.longitude?res.data.data.dataCoverList.longitude:'0';
                    this.latitude = res.data.data.dataCoverList.latitude?res.data.data.dataCoverList.latitude:'0';
                    this.initMap(this.longitude, this.latitude)
                }else{
                    this.message = res.data.message;
                    this.$refs.iosDialog2.style.display = 'block';
                    this.data = {};
                }
                   
            })
        },
        confirm2(){
            this.$refs.iosDialog2.style.display = 'none';
        },
        Search(){
            this.$refs.loadingToast.style.display = 'block';
            if (!this.mcn) {
                // alert('请输入MCN码')
                this.message = '请输入MCN码';
                this.$refs.iosDialog2.style.display = 'block';
                this.$refs.loadingToast.style.display = 'none';
            }else{
                this.selectDataCoverMcnOrSn()
            }
            
        },
        imgDetail(){
            // this.$refs.jsValid.imgDetail()
             wx.previewImage({
                current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom, // 当前显示图片的http链接
                urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom,'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom2] // 需要预览的图片http链接列表
            });
        },
        imgDetail2(){
            //  this.$refs.jsValid.imgDetail2()
             wx.previewImage({
                current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom2, // 当前显示图片的http链接
                urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom,'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom2] // 需要预览的图片http链接列表
            });
        },
         imgDetail21(){
            // this.$refs.jsValid.imgDetail21()
            wx.previewImage({
                current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom21, // 当前显示图片的http链接
                urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom21,'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom22] // 需要预览的图片http链接列表
            });
        },
        imgDetail22(){
            //  this.$refs.jsValid.imgDetail22()
             wx.previewImage({
                current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom22, // 当前显示图片的http链接
                urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom21,'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom22] // 需要预览的图片http链接列表
            });
        },
        initMap(longitude,latitude){
            console.log(longitude+"===="+latitude)
             var map = new AMap.Map('map', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom:16, //初始化地图层级
                    center: [longitude,latitude] //初始化地图中心点,
                });
                if (this.dataCoverList.coverStatus == 0 || this.dataCoverList.coverStatus == 1) {
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(longitude,latitude),
                        offset: new AMap.Pixel(-10, -10),
                        icon: new AMap.Icon({
                        image: require("../assets/images/icon_locate_blue_pre.png"),
                        size: new AMap.Size(100, 100),  //图标大小 
                        imageSize: new AMap.Size(40,40)
                    })
                    });
                }
                if (this.dataCoverList.coverStatus == 2) {
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(longitude,latitude),
                        offset: new AMap.Pixel(-10, -10),
                        icon: new AMap.Icon({
                        image: require("../assets/images/icon_locate_red_pre.png"),
                        size: new AMap.Size(100, 100),  //图标大小 
                        imageSize: new AMap.Size(40,40)
                    })
                    });
                }
                 if (this.dataCoverList.coverStatus == 3) {
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(longitude,latitude),
                        offset: new AMap.Pixel(-10, -10),
                        icon: new AMap.Icon({
                        image: require("../assets/images/icon_locate_grey_pre.png"),
                        size: new AMap.Size(100, 100),  //图标大小 
                        imageSize: new AMap.Size(40,40)
                    })
                    });
                }
               
                map.add(marker);
        },
        goNavigation(){
            // this.$router.push({
            //     name:'dataQueryNavigation'
            // })
            // alert()

             wx.openLocation({
                latitude: Number(this.latitude), // 纬度，浮点数，范围为90 ~ -90
                longitude: Number(this.longitude), // 经度，浮点数，范围为180 ~ -180。
                // name: '', // 位置名
                // address: '', // 地址详情说明
                scale: 17, // 地图缩放级别,整形值,范围从1~28。默认为最大
                // infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        }
        // resetPointFn(){
        //     this.$refs.jsValid.resetPointFn()
        // }
    }
}
</script>

<style lang="scss" scoped>
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

.weui-toast__content{
    font-size: 33px;
}
.weui-toast{
    top: 50%;
    width: 200px;
    height: 200px;
}

input{
     border: none;  
     outline: none; 
     font-size:32px;
     color:#666;
     -webkit-appearance: none;
}
button{
    border: none;
    background-color: transparent;
    outline: none;  
}
 .input-mcn{
     width: 60%;
    height: 60px;
    margin: auto;
    text-align: center;
    display: block;
    border:2px #e5e5e5 solid;
    border-radius: 50px;
    margin-top: 10px;
    }
    .search-btn{
        text-align: center;
        width: 60%;
        height: 0.88rem;
        line-height: 0.88rem;
        border-radius: 0.4rem;
        background-color: #1890ff;
        color: #fff;
        font-size: 0.4rem;
        display: block;
        margin: auto;
        margin-top: 30px;
    }


.card{
    background-color: #fff;
    //  height: 430px;
     height: 100%;
     margin-bottom: 20px;
      .inner{
         padding: 20px;
     }
     p{
         font-size: 30px;
         height: 80px;
         line-height: 80px;
         border-bottom: 1px #e5e5e5 solid;
         padding-left: 10px;
     }
     .list2{
          padding: 0px 20px 30px 20px;
           height: 100%;
         .set{
            // height: 28px;
            margin-bottom: 5px;
         }
        
         .p1{
             font-size: 28px;
             line-height: 28px;
             color: #666;
             letter-spacing:10px;
            //  width: 200px;
             text-align: justify;
             text-align-last: justify;
             display: inline-block;
         }
         .p2{
             font-size: 28px;
             line-height: 28px;
             color: #999;
             padding-left: 20px;
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
.set2{
      height: 430px;
}
</style>