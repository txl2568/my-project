<template>
  
</template>

<script>
import wx from 'weixin-js-sdk';
import {jsValid, transform} from '../api/user/wechat';

export default {
    props:{
        url:{
            type:String
        },
        reportCustom:{
            type:String
        },
         reportCustom2:{
            type:String
        },
        reportCustom21:{
            type:String
        },
         reportCustom22:{
            type:String
        },
        coverImgpath:{
            type:String
        },
         coverImgpath2:{
            type:String
        },
        img:{
            type:Number
        },
        
        // ChipCode:{
        //      type:String
        // }
    },
    data(){
        return{
            localIds2:'',
            ChipCode:''
        }
    },
    created(){
        this.init();
    },
    mounted(){
        if(!sessionStorage.getItem("longitude") && !sessionStorage.getItem("latitude")){
            this.initMap(0,0);
        }
    },
    methods:{
         init(){
            let self = this;
            console.log('url',self.url,this.url);
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
                 self.resetPointFn()
                //  self.imgDetail()


              

            });
           
            wx.error(function (res) {
                console.log("===="+res);
                // $("#loadingToast").hide();
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                alert("验证出错");
                return false;
            });

          
        },
        imgDetail(){
            wx.previewImage({
                current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom, // 当前显示图片的http链接
                urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom,'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom2] // 需要预览的图片http链接列表
            });
        },
        imgDetail2(){
            wx.previewImage({
                current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom2, // 当前显示图片的http链接
                urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom,'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom2] // 需要预览的图片http链接列表
            });
        },
         imgDetail21(){
            wx.previewImage({
                current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom21, // 当前显示图片的http链接
                urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom21,'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom22] // 需要预览的图片http链接列表
            });
        },
        imgDetail22(){
            wx.previewImage({
                current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom22, // 当前显示图片的http链接
                urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom21,'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.reportCustom22] // 需要预览的图片http链接列表
            });
        },
        gochakan(){
            // let self = this;
            console.log('你是什么',this.img);
            if (this.img == 1) {
                wx.previewImage({
                    current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath, // 当前显示图片的http链接
                    urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath] // 需要预览的图片http链接列表
                });
            }
             if (this.img == 2) {
                wx.previewImage({
                    current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2, // 当前显示图片的http链接
                    urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2] // 需要预览的图片http链接列表
                });
            }
           
        },
        goxiugai(){
              let self = this;
            console.log('this1---------',self);

            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log('res+++++++++++++:',res);
                    // $("#photolist").html(""); //每次选择图片完成后都清空之前已经添加的html节点  

                     self.localIds = res.localIds;
                     console.log('res1--------:',res.localIds);

                   
                    wx.getLocalImgData({
                        localId: res.localIds[0], // 图片的localID
                        success: function (res) {
                            // this.localData = res.localData;
                            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示

                            // console.log('获取到的值=====',localData);

                            self.localIds2 ='data:image/png;base64,'+res.localData

                        }
                    });

                     // 上传图片
                    wx.uploadImage({
                        localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            // $("#loadingToasts").hide();
                            // this.serverId = res.serverId; // 返回图片的服务器端ID
                            // custom = serverId;
                            
                            self.serverId = res.serverId;
                            
                            console.log('self.serverId==========', self.serverId);
                            // console.log('res.serverId2=====::::', res);
                            sessionStorage.setItem("serverId",res.serverId);
                           
    

                        },
                        fail: function (error) {
                            // $("#loadingToasts").hide();
                            alert('上传错误,请稍候重试!');
                        }
                    });

                   
                }
            });
        },
        resetPointFn(){
            let self = this;
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    // console.log('---------getLocation--------',res);
                    this.locations =  res.longitude + ','+  res.latitude 
                    // this.center = [res.latitude ,res.longitude];

                    
                    transform('gps',this.locations,'JSON').then(res =>{

                            // console.log('=======self======',self)
                        
                        self.latitude = res.data.data.lat;
                        self.longitude = res.data.data.log;
                        // console.log('transform==',this.latitude);
                        // console.log('transform',this.longitude);
                        sessionStorage.setItem("longitude",res.data.data.log);
                        sessionStorage.setItem("latitude",  res.data.data.lat);

                        self.initMap(res.data.data.log,res.data.data.lat) //
                        
                
                        
                        
                    }).catch(error => {
                    });

                    
                }
            });
        },
        initMap(longitude,latitude){
            // console.log(longitude+"===="+latitude)
            // var img = "../assets/images/icon_locate_blue_pre.png";
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
                    size: new AMap.Size(100, 100),  //图标大小 
                    imageSize: new AMap.Size(40,40)
                })
                });
                map.add(marker);
        },

   
    }
}
</script>

<style>

</style>