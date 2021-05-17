<template>
  <div>
      <Header :data="msg"></Header>
      <div id="map" :style="{width:'100%',height:'100vh'}"></div>
      <div class="clear">
          <img @click="clearProvinceCount"  src="https://cover-file.obs.cn-southwest-2.myhuaweicloud.com/system/img/sys_refrash.png">
      </div>
      
      <!--信息窗体-->
      <div style="display:none">
          <Info  ref="infowindow" @openLocationFn="openLocationFn" :cover="cover"></Info>
      </div>

      <div ref="loadingToast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">加载中</p>
            </div>
      </div>
      
  </div>
</template>

<script>
import Header from '../components/Header2';
import Info from '../components/Info';
import { selectProvinceCount, selectDataCoverByDistrict, getIdentityidByParam } from '../api/user/function';
import {jsValid} from '../api/user/wechat';
import weui from 'weui.js';
import 'weui';
import wx from 'weixin-js-sdk';

export default {
    data(){
        return{
            msg:'井盖分布',
            data:[],
            data2:[],
            markerList:[],
            identityid: null,
            level: 0,
            cluster:null,
            markers:[],
            provinces:[],
            map:{},
            cover:{},
            district:null,
            polygons:[],
            infoWindow:null,
            url: window.location.href,
        }
    },
    components: {
        Header,
        Info
    },
    created(){
        this.selectProvinceCount(this.level, this.identityid, this.identityid)
    },
    mounted(){
        this.initJsApi();
        this.init();
    },
    methods:{
        initJsApi(){
             let self = this;
            if (navigator.userAgent.indexOf('iPhone') !== -1) {
                self.url = sessionStorage.getItem('Url');
                

            }  else {
                const { href } = window.location;
                self.url = href;
            }
            // alert(self.url);
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
        init(){
             this.map = new AMap.Map('map', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom:4, //初始化地图层级
                // center: [119.29779052734375,26.104583740234375] //初始化地图中心点,
            });
            
           
            var that = this;
            that.map.on("zoomchange",function(){
                if (that.infoWindow != undefined || that.infoWindow != null) {
                    that.infoWindow.close();
                }
                
                var zoom = that.map.getZoom();
                // alert('z'+zoom)
                // alert('le'+that.level)

                //  //展示全国各个省总数
                if (zoom < 6 && that.level != '1') {
                    // alert(that.markerList.length)
                    // that.markerList = []
                    // that.map.remove(that.markerList);
                    // alert(that.cluster);
                    if (that.cluster != undefined || that.cluster != null) {
                        that.cluster.removeMarkers(that.markerList);
                    }
                    

                    that.level = '0';
                    that.identityid = null;
                    // alert(that.cluster)
                    that.selectProvinceCount(that.level, that.identityid, that.identityid);
                }

                 //某个省下各个市总数
                // if (7 < zoom && zoom < 11 && that.level > 1 ){
                //     if (that.level ==  '3'){
                //         that.cluster.removeMarkers(that.markerList);
                //     }
                // //    alert(that.identityid);
                //     that.getIdentityidByParam(that.identityid,'1');
                // }

                // //展示区所有井盖--->>>某个市下各个区总数
                // if (8 < zoom && zoom < 18 && nowLevel ==  '3'){
                //     // that.cluster.removeMarkers(that.markerList);
                //     that.getIdentityidByParam(that.identityid,'2');
                // }
  

            })
           
                 
         
        },
        getIdentityidByParam(identityid, needLevel){
            // alert(identityid) //长安
            getIdentityidByParam(identityid, needLevel).then(res =>{
                // alert(res.data.data)
                this.selectProvinceCount(needLevel, res.data.data, res.data.data);
            })
        },
        markerClick(e){
            var marker = e.target;
            var data = marker.getExtData();
            // alert(data.level)
            if (data.level < 3){
                this.selectProvinceCount(data.level, data.identityid, data.identityid)
                // this.selectProvinceCount(queryData,data.level,data.identityid);
            } else {
                //查询所有井盖
                // alert(this)
                this.selectDataCoverByDistrict(data.identityid)
                // selectDataCoverByDistrict(queryData,data.identityid);
                this.map.setCenter(new AMap.LngLat(parseFloat(data.longitude),parseFloat(data.latitude)));
                this.map.setZoom(12);
            }
            //展示区域边界
            // this.drawBounds();
        },
        selectProvinceCount(level0, provinceId, cityId){
            // 总数
            // alert(level0)
            this.level = level0;
            this.identityid = provinceId;
           
            selectProvinceCount(level0, provinceId, cityId).then(res =>{
                
                if (res.data.code == 200) {
                    // alert(this.markerList.length)
                    var data = res.data.data;
                    this.map.remove(this.markerList);
                    this.markerList = [];
                    for (var i = 0; i < data.length; i++) {
                        // 统计Marker样式
                        var content = "<div style='background:#0099FF;width:100px;height:50px;line-height:30px;color:#fff;border-radius:30px;padding-left:5px;'>" +
                        "<div class='layui-row' style='height: 20px;font-size:14px'><p style='text-align: center;'>"+data[i].aliasname+"</p></div>" +
                        "<div class='layui-row' style='height: 20px;font-size:15px'><p style='text-align: center'>"+data[i].count+"</p></div>\n" +
                        "</div>";
                        // 创建一个Marker实例
                        var marker = new AMap.Marker({
                            content: content,
                            position: new AMap.LngLat(parseFloat(data[i].longitude),parseFloat(data[i].latitude)),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                            //offset: new AMap.Pixel(-50, -25),
                            title: data[i].identityid,
                            extData:{
                                "identityid":data[i].identityid,
                                "level":data[i].level,
                                "longitude":data[i].longitude,
                                "latitude":data[i].latitude
                            }
                        });
                        // 点击事件
                        let that = this;
                        var clickHandle = AMap.event.addListener(marker, 'click', function(e) {
                            that.markerClick(e);
                        });
                        this.markerList.push(marker);
                    }
                    this.map.add(this.markerList);
                    //根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别
                    this.map.setFitView();
                    //展示区域边界
                    // if (level0 === '0'){
                    //     if (this.polygons) {
                    //         this.map.remove(this.polygons)//清除上次结果
                    //     }
                    // } else {
                    //     // this.drawBounds();
                    // }
                   

                }else{
                    alert(res.data.message)
                }

            })
        },
        selectDataCoverByDistrict(identityid){
            // 某区县
            //    alert(identityid)
            this.identityid = identityid
            this.level = 3;
            this.$refs.loadingToast.style.display = 'block';
            selectDataCoverByDistrict(identityid).then(res =>{
                this.$refs.loadingToast.style.display = 'none';
                if (res.data.code == 200) {
                    var data = res.data.data;
                    this.map.remove(this.markerList);
                    this.markerList = [];
                   
                    var sts = [{
                            url: require("../assets/images/map_shape_one.png"),
                            size: new AMap.Size(50, 56),
                            offset: new AMap.Pixel(-16, -16),
                            textColor: '#FFFFFF',
                            textSize: 20
                        }, {
                            url: require("../assets/images/map_shape_two.png"),
                            size: new AMap.Size(60, 56),
                            offset: new AMap.Pixel(-16, -16),
                            textColor: '#FFFFFF',
                            textSize: 20
                        }, {
                            url: require("../assets/images/map_shape_three.png"),
                            size: new AMap.Size(72, 56),
                            offset: new AMap.Pixel(-18, -18),
                            textColor: '#FFFFFF',
                            textSize: 20
                        }, {
                            url: require("../assets/images/map_shape_four.png"),
                            size: new AMap.Size(82, 56),
                            offset: new AMap.Pixel(-24, -24),
                            textColor: '#FFFFFF',
                            textSize: 20
                        }, {
                            url: require("../assets/images/map_shape_five.png"),
                            size: new AMap.Size(92, 56),
                            offset: new AMap.Pixel(-24, -24),
                            textColor: '#FFFFFF',
                            textSize: 20
                    }];

                    for (var i = 0; i < data.length; i++) {
                       

                        var coverImg = ["../assets/images/icon_locate_blue_pre.png",
                    "../assets/images/icon_locate_blue_pre.png",
                    "../assets/images/icon_locate_red_pre.png",
                    "../assets/images/icon_locate_grey_pre.png"];

                    if (data[i].coverStatus == 0 || data[i].coverStatus == 1) {
                        var img = require("../assets/images/icon_locate_blue_pre.png");
                    }
                    if (data[i].coverStatus == 2) {
                            var img = require("../assets/images/icon_locate_red_pre.png");
                    }
                    if (data[i].coverStatus == 3) {
                            var img = require("../assets/images/icon_locate_grey_pre.png");
                    }

                    // 创建一个 Marker 实例：
                    var marker = new AMap.Marker({
                        //content: content,
                        position: new AMap.LngLat(parseFloat(data[i].longitude),parseFloat(data[i].latitude)),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        offset: new AMap.Pixel(-18, -32),
                        icon: new AMap.Icon({
                            size: new AMap.Size(40, 40),
                            image: img,
                            imageSize: new AMap.Size(40, 40),
                            imageOffset: new AMap.Pixel(0, 0)
                        }),
                        title: data[i].coverAddress,
                        animation:'AMAP_ANIMATION_DROP',
                        draggable:true,
                        extData:data[i]
                    });
                    //点击事件
                    let that = this;
                    var clickHandle = AMap.event.addListener(marker, 'click', function(e) {
                        that.markerClickCover(e);
                    });
                    this.markerList.push(marker);
                        
                       
                    }

                    //点聚合插件
                    let that = this;
                    this.map.plugin(["AMap.MarkerClusterer"], function () {
                        that.cluster = new AMap.MarkerClusterer(that.map, that.markerList,{
                            maxZoom : 17,
                            gridSize: 80,
                            styles: sts,
                            zoomOnClick: true,
                            averageCenter:true,
                        });
                        
                    });
                    //根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别
                    //map.setFitView();
                    //展示区域边界
                    // this.drawBounds();
                    // setTimeout(function(){
                    //     // this.map.remove(this.markerList);
                    //      that.cluster.removeMarkers(that.markerList);
                    // },1000);

                   

                }else{

                }
            })

        },
        markerClickCover(e){
            
            var marker = e.target;
            var cover = marker.getExtData();
            this.cover = cover;
            this.map.setCenter(e.target.getPosition());

            // 信息窗体的内容
            var content = [
                "<div>111111</div>"
            ];
            var info=[];
            info.push("sn码："+ '0871-5516142' );
            info.push("mcn码："+'650500');

            // 创建 infoWindow 实例	
            var that = this;
            this.infoWindow = new AMap.InfoWindow({
                content: that.$refs.infowindow.$el,
                // content: info.join("<br>"),  //传入 dom 对象，或者 html 字符串
                offset: new AMap.Pixel(0, -20),
                // isCustom:true,
                // autoMove:false
            });
                
            // 打开信息窗体
            this.infoWindow.open(this.map, marker.getPosition());

        },
        clearProvinceCount(){
            window.location.reload();
        },
        openLocationFn(){
            var that = this;
            wx.openLocation({
                latitude: Number(that.cover.latitude), // 纬度，浮点数，范围为90 ~ -90
                longitude: Number(that.cover.longitude), // 经度，浮点数，范围为180 ~ -180。
                scale: 16,
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.input-card {
    width: 50px;
    // width: 25rem;
}

.input-card .btn {
    width: 14px;
    margin-right: 0px;
    // width: 7rem;
    // margin-right: .7rem;
}

.input-card .btn:last-child {
    margin-right: 0;
}

.container{
    // width: 100%;
    height: 100%;
}
#infoWindow{
    width:400px;height:310px;line-height:30px;color:#676767;background-color: #fff;
}
.clear{
    position: absolute;
    right: 20px;
    bottom: 20px;
    background-color: #fff;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    img{
        height: 40px;
        width: 40px;
    }
}


</style>