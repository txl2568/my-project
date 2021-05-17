<template>
  <div>
      <Header :data="msg"></Header>
      <div class="model">
          <p>地图信息</p>
          <div id="map" :style="{width:'100%',height:'300px'}"></div>
      </div>
       <div class="model" v-if="reportCustom || reportCustom2 || reportCustom3 || reportCustom4">
            <p>报修图片</p>
            <div class="model-img" >
                <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom" v-show="reportCustom"  @click="imgDetail11"/>
                <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom2" v-show="reportCustom2" @click="imgDetail12" />
                <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom3" v-show="reportCustom3"  @click="imgDetail13" />
                <img :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom4" v-show="reportCustom4"  @click="imgDetail14"/>
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
                      <span>业主单位：</span>
                      <span>{{data.deptIdName}}</span>
                  </div>
                  <div>
                      <span>报修类型：</span>
                      <span>{{data.reportTypeCauseName}}</span>
                  </div>
                   <div>
                      <span>报修时间：</span>
                      <span>{{data.reportTime}}</span>
                   </div>
                   <div>
                      <span>报修人员：</span>
                      <span>{{data.reportOpenIdName}}</span>
                   </div>
                   <div>
                      <span>报修状态：</span>
                      <span>{{data.reportStateName}}</span>
                   </div>
                    <div>
                      <span>报修渠道：</span>
                      <span>{{data.reportChannelName}}</span>
                   </div>
                     <!-- 已通过 未通过 -->
                    <div v-if="IsTab == 1 || IsTab == 2">
                        <span>确认时间：</span>
                        <span>{{data.checkTime}}</span>
                    </div>
                     <div v-if="IsTab == 1 || IsTab == 2">
                        <span>确认人员：</span>
                        <span>{{data.checkUserName}}</span>
                    </div>
                     <div v-if="IsTab == 1 || IsTab == 2">
                        <span>确认渠道：</span>
                        <span>{{data.checkChannelName}}</span>
                    </div>
                    <!-- 已通过 未通过 -->
                    <div>
                      <span>报修原因：</span>
                      <span>{{data.reportCause}}</span>
                   </div>
                   <div>
                        <span>报修地址：</span>
                        <span>{{data.reportAddr}}</span>
                    </div>
                  
              </div>
          </div>
      </div>
      
      <!-- 报修审批 -->
      <div v-if="IsTab == 0" class="setting-btn">
            <button  class="search-btn" @click="goPass()"   >确认通过</button>
            <button  class="search-btn2" @click="goFail()"   >确认否决</button>
      </div>

      
      <div class="js_dialog" ref="iosDialog" style="display: none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
                <div class="weui-dialog__bd">确定通过并提交吗？</div>
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
                <div class="weui-dialog__bd">确定否决并提交吗？</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel2">取消</a>
                    <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm2">确定</a>
                </div>
            </div>
        </div>

  </div>
</template>

<script>
import Header from '../components/Header2';
import wx from 'weixin-js-sdk';
import {jsValid, transform} from '../api/user/wechat';
import { saveUserReport, repairItemStart, selectUserRepairDetail, selectUserReportDetail } from '../api/user/function';
import { mapState } from 'vuex';

export default {
    data(){
        return{
            msg:'报修详情',
            data:{},
            id: this.$route.params.reportId,
            reportCustom:'',
            reportCustom2:'',
            reportCustom3:'',
            reportCustom4:'',
            reportState:'',
            url: window.location.href,
            IsReportTab:0,
            IsTab:''

        }
    },
    components: {
        Header
    },
    computed:{
        ...mapState({
                // isReportTab: state => state.user.isReportTab,
                tab: state => state.user.tab,
        }),
    },
    watch:{
        id:{
           handler(newVal, oldVal) {
               if (newVal) { 
                   this.id = newVal
               }
           }
        },
        // isReportTab:{
        //         handler (newVal, oldVal) {
        //             // if (!newVal) {
        //                this.IsReportTab = 0 
        //             // }
        //             if (newVal) {
        //                 this.IsReportTab = newVal
        //             }
                   
        //         },
        //         deep: true
        //     },
            //  tab:{
            //     handler (newVal, oldVal) {
            //         if (!newVal) {
            //            this.IsTab = 0 
            //         }
            //         if (newVal) {
            //             console.log('--------------------------------');
            //             this.IsTab = newVal
            //         }
            //     }
            // }
    },
    created(){
        
       
      
       
         this.selectUserReportDetail();
        //  this.id = sessionStorage.getItem("id");

         if (sessionStorage.getItem('reportId')) {
            this.id = sessionStorage.getItem('reportId')
       }

       this.IsTab = this.$route.query.tab;
        
       
        
          
    },
    mounted(){
        if(!sessionStorage.getItem("longitude") && !sessionStorage.getItem("latitude")){
            this.initMap(0,0);
        }

    },
    methods:{
        selectUserReportDetail(){
             var param ={
                'reportId':this.id
            }
             selectUserReportDetail(param).then(res=>{
                this.data = res.data.data;
                this.reportCustom = res.data.data.reportCustom?res.data.data.reportCustom:'';
                this.reportCustom2 = res.data.data.reportCustom2?res.data.data.reportCustom2:'';
                this.reportCustom3 = res.data.data.reportCustom3?res.data.data.reportCustom3:'';
                this.reportCustom4 = res.data.data.reportCustom4?res.data.data.reportCustom4:'';
                this.reportState = res.data.data.reportState;
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
                    // image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
                    size: new AMap.Size(100, 100),  //图标大小 
                    imageSize: new AMap.Size(40,40)
                })
                });
                map.add(marker);
        },
        imgDetail11(){
            var imgUrl = 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/';
            var newUrls = [];
            var newImg;
            if (this.reportCustom) {
               newUrls.push(imgUrl+this.reportCustom)
               newImg = imgUrl + this.reportCustom
            }
            if (this.reportCustom2) {
               newUrls.push(imgUrl+this.reportCustom2)
            }
             if (this.reportCustom3) {
               newUrls.push(imgUrl+this.reportCustom3)
            }
            if (this.reportCustom4) {
               newUrls.push(imgUrl+this.reportCustom4)
            }

            wx.previewImage({
                current: newImg, // 当前显示图片的http链接
                urls: newUrls// 需要预览的图片http链接列表
            });

             
        },
        imgDetail12(){
            //  alert(this.reportCustom3)
             var imgUrl = 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/';
            var newUrls = [];
            var newImg;
            if (this.reportCustom) {
               newUrls.push(imgUrl+this.reportCustom)
            }
            if (this.reportCustom2) {
               newUrls.push(imgUrl+this.reportCustom2)
               newImg = imgUrl + this.reportCustom2
            }
             if (this.reportCustom3) {
               newUrls.push(imgUrl+this.reportCustom3)
            }
            if (this.reportCustom4) {
               newUrls.push(imgUrl+this.reportCustom4)
            }

            wx.previewImage({
                current: newImg, // 当前显示图片的http链接
                urls: newUrls// 需要预览的图片http链接列表
            });
        },
        imgDetail13(){
             var imgUrl = 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/';
            var newUrls = [];
            var newImg;
            if (this.reportCustom) {
               newUrls.push(imgUrl+this.reportCustom)
            }
            if (this.reportCustom2) {
               newUrls.push(imgUrl+this.reportCustom2)
            }
             if (this.reportCustom3) {
               newUrls.push(imgUrl+this.reportCustom3)
               newImg = imgUrl + this.reportCustom3
            }
            if (this.reportCustom4) {
               newUrls.push(imgUrl+this.reportCustom4)
            }

            wx.previewImage({
                current: newImg, // 当前显示图片的http链接
                urls: newUrls// 需要预览的图片http链接列表
            });
        },
        imgDetail14(){
            var imgUrl = 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/';
            var newUrls = [];
            var newImg;
            if (this.reportCustom) {
               newUrls.push(imgUrl+this.reportCustom)
              
            }
            if (this.reportCustom2) {
               newUrls.push(imgUrl+this.reportCustom2)
            }
             if (this.reportCustom3) {
               newUrls.push(imgUrl+this.reportCustom3)
            }
            if (this.reportCustom4) {
               newUrls.push(imgUrl+this.reportCustom4)
               newImg = imgUrl + this.reportCustom4
            }

            wx.previewImage({
                current: newImg, // 当前显示图片的http链接
                urls: newUrls// 需要预览的图片http链接列表
            });
        },
        goPass(){ //通过
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
                this.$router.replace({
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
            this.saveUserReport2()
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
                this.$router.replace({
                    name:'examinationReport'
                })
            })
        },
        goRepair(){
            this.$refs.iosDialog3.style.display = 'block';
        },
        confirm3(){
            this.repairItemStart()
            this.$refs.iosDialog3.style.display = 'none';
        },
        cancel3(){
            this.$refs.iosDialog3.style.display = 'none';
        },
        repairItemStart(){
            var sjjwUserRepairParam={
                'reportId':this.$route.params.reportId
            }
            repairItemStart(sjjwUserRepairParam).then(res =>{
                alert('开始维修成功')
                this.$router.replace({
                    name:'examinationMainten'
                })
            })
        },
        goRepairOver(){
            this.$router.push({
                name:'examinationMaintenOver',
                params:{
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
        img{
            width: 48%;
            height: 200px;
            margin: 5px 0;
        }
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
        text-align: center;
        width: 30%;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
        background-color: orangered;
        // background-color: #cccccc;
        color: #fff;
        margin-left: 10px;
        font-size: 30px;
        display: block;
        margin: 30px auto;
        
    }
    .search-btn{
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