<template>
  <div>
      <Header :data="msg"></Header>
      <div class="model">
          <p>地图信息</p>
          <div id="map" :style="{width:'100%',height:'300px'}"></div>
      </div>
        <!-- 已处理 查看 -->
       <div class="model" v-if="code == 2"> 
            <p>处理图片</p> 
            <div class="model-img" >
                <div class="border-img">
                     <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+beforeImg" v-show="beforeImg"  @click="imgDetail11"/>
                </div>
               <div class="border-img">
                   <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+afterImg" v-show="afterImg" @click="imgDetail12" />
               </div>
            </div>
        </div>
           <!-- 待处理 处理中 可上传 -->
       <div class="model" v-else> 
            <p>处理图片</p> 
            <div class="model-img" >
                <div class="border-img">
                     <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+beforeImg" v-show="beforeImg"  @click="imgDetail11"/>
                </div>
            </div>
        </div>
      <div class="model">
          <p>基本信息</p>
          <div class="card">
              <div class="content">
                  <div>
                      <span>井盖编码：</span>
                      <span>{{data.coverMcn?data.coverMcn:'无编码'}}</span>
                  </div>
                  <div>
                      <span>终端编码：</span>
                      <span>{{data.sn}}</span>
                  </div>
                  <div>
                      <span>归属业主：</span>
                      <span>{{data.deptName}}</span>
                  </div>
                   <div>
                      <span>告警类型：</span>
                      <span>{{data.eventName}}</span>
                   </div>
                     <!-- 待处理 处理中 -->
                    <div v-if="code == 0 || code == 1">
                      <span>创建用户：</span>
                      <span>{{data.createUserName}}</span>
                   </div>
                    <div v-if="code == 0 || code == 1">
                      <span>创建时间：</span>
                      <span>{{data.createTime}}</span>
                   </div>
                   <!-- 手写 -->
                    <div v-if="code == 0 || code == 1"> 
                        <span>处理备注：</span> 
                        <span>{{data.remark}}</span>
                    </div>
                     <!-- 已处理 -->
                    <div style="display:none" v-if="code == 2">
                      <span>创建用户：</span>
                      <span>{{data.createUserName}}</span>
                   </div>
                   <div style="display:none" v-if="code == 2">
                      <span>处前用户：</span>
                      <span>{{data.beforeUserName}}</span>
                   </div>
                    <div style="display:none" v-if="code == 2">
                        <span>处前时间：</span>
                        <span>{{data.beforeTime}}</span>
                    </div>
                    <div style="display:none" v-if="code == 2">
                        <span>处后用户：</span>
                        <span>{{data.afterUserName}}</span>
                   </div>
                    <div style="display:none" v-if="code == 2">
                        <span>处后时间：</span>
                        <span>{{data.afterTime}}</span>
                    </div>
                    <div style="display:none" v-if="code == 2">
                      <span>创建用户：</span>
                      <span>{{data.createUserName}}</span>
                   </div>
                    <div style="display:none" v-if="code == 2">
                      <span>创建时间：</span>
                      <span>{{data.createTime}}</span>
                   </div>
                    <!--  -->
                    <div>
                        <span>处理状态：</span>
                        <span>{{data.disposeStatusName}}</span>
                    </div>
                    <div>
                        <span>处理备注：</span>
                        <span>{{data.remark}}</span>
                    </div>
                    <div>
                        <span>告警地点：</span>
                        <span>{{coverData.coverAddress}}</span>
                    </div>

                   
              </div>
          </div>
       </div>

        <!-- 待处理   按钮 开始处理 图片必传-->
        <!-- 处理中   按钮 结束处理 图片必传-->

      

  
  </div>
</template>

<script>
import Header from '../components/Header2';
// import {selectUserReportDetail} from '../api/user/wechat';
import wx from 'weixin-js-sdk';
import {jsValid, transform} from '../api/user/wechat';
import { dataWorkListDetail } from '../api/user/function';
// import { mapState } from 'vuex';

export default {
    data(){
        return{
            msg:'工单详情',
            url: window.location.href,
            data:{},
            coverData:{},
            beforeImg:'',
            afterImg:'',
            id: '',
            reportCustom:'',
            reportCustom2:'',
            reportCustom3:'',
            reportCustom4:'',
            reportState:'',
            // url: window.location.href,
            IsReportTab:0,
            IsTab:'',
            repairId:'',
            code:''

        }
    },
    components: {
        Header
    },
    // computed:{
    //     ...mapState({
    //             // isReportTab: state => state.user.isReportTab,
    //             tab: state => state.user.tab,
    //     }),
    // },
    watch:{
        id:{
           handler(newVal, oldVal) {
               if (newVal) { 
                   this.id = newVal
               }
           }
        },

    },
    created(){
        this.init()

       if (sessionStorage.getItem('repair_id')) {
            this.id = sessionStorage.getItem('repair_id')
       }
       this.id = this.$route.params.id;
       this.code = this.$route.params.code;
    //    alert(this.code)
       this.dataWorkListDetail()
       console.log(this.id, this.$route.params.id);

      
        
          
    },
    mounted(){
        if(!sessionStorage.getItem("longitude") && !sessionStorage.getItem("latitude")){
            this.initMap(0,0);
        }

       

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
            // var item = _this;
             jsValid(self.url).then(res =>{
                console.log('res==',res)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.data.timestame, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名
                    jsApiList: ['checkJsApi','chooseImage','uploadImage','previewImage','getLocalImgData'] // 必填，需要使用的JS接口列表
                });
            }).catch(error => {
                alert('请重新授权')
            });

             wx.checkJsApi({
                jsApiList: ['chooseImage','uploadImage','previewImage','getLocalImgData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    if (res.checkResult.getLocation == false) {
                        // $("#loadingToast").hide();
                        alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                        return false;
                    }
                }
            });
            
            wx.ready(function() {
            //config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            // _map();
            // resetPointFn(function () {
            //    console.log('item=',item);
                //  item.upLoadImg()
               

            });
        },
        dataWorkListDetail(){

            dataWorkListDetail(this.id).then(res=>{
                this.data = res.data.data;
                this.beforeImg = res.data.data.beforeImg;
                this.afterImg = res.data.data.afterImg;
                this.coverData = JSON.parse(res.data.data.coverData);

             


                this.initMap(res.data.data.longitude,res.data.data.latitude);
            }).catch(error =>{
            })
        },
        initMap(longitude,latitude){
            console.log(longitude+"===="+latitude)
             var map = new AMap.Map('map', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom:16, //初始化地图层级
                    center: [longitude,latitude] //初始化地图中心点,
                });
                var marker = new AMap.Marker({
                    position: new AMap.LngLat(longitude,latitude),
                    offset: new AMap.Pixel(-10, -10),
                    icon: new AMap.Icon({
                    image: require("../assets/images/icon_locate_red_pre.png"),
                    size: new AMap.Size(100, 100),  //图标大小 
                    imageSize: new AMap.Size(40,40)
                })
                });
                map.add(marker);
        },
        imgDetail11(){
              wx.previewImage({
                    current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.beforeImg, // 当前显示图片的http链接
                    urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.beforeImg,
                    'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.afterImg] // 需要预览的图片http链接列表
                } );
        },
         imgDetail12(){
             wx.previewImage({
                    current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.afterImg, // 当前显示图片的http链接
                    urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.beforeImg,
                    'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.afterImg] // 需要预览的图片http链接列表
                } );
        },
        goPass(){
            this.$refs.iosDialog.style.display = 'block';
        },
        confirm(){
            // this.$router.push({
            //     name:'repair'
            // })
            this.saveUserReport()
            this.$refs.iosDialog.style.display = 'none';
        },
        cancel(){
            this.$refs.iosDialog.style.display = 'none';
        },
        saveUserReport(){
            var param = {
                'reportState': 1,
                'reportId': this.$route.params.reportId
            }
            saveUserReport(param).then(res =>{
                alert('报修确认成功')
                this.$router.push({
                    name:'examinationReport'
                })
            })
        },
        goFail(){
            this.$refs.iosDialog2.style.display = 'block';
        },
        confirm2(){
            // this.$router.push({
            //     name:'repair'
            // })
            this.saveUserReport()
            this.$refs.iosDialog2.style.display = 'none';
        },
        cancel2(){
            this.$refs.iosDialog2.style.display = 'none';
        },
        saveUserReport2(){
            var param = {
                'reportState': 2,
                'reportId': this.$route.params.reportId
            }
            saveUserReport(param).then(res =>{
                alert('报修否决成功')
                this.$router.push({
                    name:'examinationReport'
                })
            })
        },
        goRepair(){
            this.$refs.iosDialog3.style.display = 'block';
        },
        confirm3(){
            this.$refs.loadingToast.style.display = 'block'
            setTimeout(function () {
                this.$refs.loadingToast.style.display = 'none';
                this.repairItemStart()
                this.$refs.iosDialog3.style.display = 'none';
            }, 2000);

           
        },
        cancel3(){
            this.$refs.iosDialog3.style.display = 'none';
        },
        repairItemStart(){
            var sjjwUserRepairParam={
                'repairId':this.$route.params.repairId
            }
            repairItemStart(sjjwUserRepairParam).then(res =>{
                if (res.data.code == 200) {
                     alert('开始维修成功')
                    this.$router.push({
                        name:'examinationMainten'
                    })
                }
                if (res.data.code == 500) {
                    alert(res.data.message)
                }
               
            })
        },
        goRepairOver(){
            this.$router.push({
                name:'examinationMaintenOver',
                params:{
                    repairId: this.repairId,
                    reportCustom: this.reportCustom,
                    reportCustom2: this.reportCustom2,
                    reportCustom3: this.reportCustom3,
                    reportCustom4: this.reportCustom4
                }
            })
        }
    
        

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

// .weui-toast{
//     // width: 100%;
//     height: 90px;
// }
// .weui-toast_text .weui-toast__content{
//     font-size: 30px;
// }

.model{
    background-color: #fff;
    margin-bottom: 15px;
    padding: 20px;
    p{
        font-size: 30px;
        padding: 10px 0;
        border-bottom: 1px #e5e5e5 solid;
        margin-bottom: 20px;
    }
    .model-img{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
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
        // img{
        //     width: 48%;
        //     height: 200px;
        //     margin: 5px 0;
        // }
    }
    .card{
        .content{
            &>div{
                font-size: 28px;
                margin: 15px 0;
                color: #666;
            }
        }
    }
}
.setting-btn{
    display: flex;
    justify-content: center;
}
 .search-btn2{
        // border: 1px #ccc solid;
        text-align: center;
        width: 30%;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
        background-color: #cccccc;
        color: #fff;
        margin-left: 10px;
        font-size: 30px;
        display: block;
        // margin: auto;
        margin: 30px auto;
        
    }
    .search-btn{
        // border: 1px #ccc solid;
        text-align: center;
        width: 30%;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
        background-color: #1890ff;
        color: #fff;
        margin-left: 10px;
        font-size: 30px;
        display: block;
        // margin: auto;
        margin: 30px auto;
        
    }
    button{
    border: none;
    background-color: transparent;
    outline: none;  
}
</style>