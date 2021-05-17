<template>
  <div>
      <Header :data="msg"></Header>
      <div class="model">
          <p>地图信息</p>
          <div id="map" :style="{width:'100%',height:'300px'}"></div>
      </div>
       <div class="model">
            <p>报修图片</p>
            <div class="model-img" >
                <div class="border-img" v-show="reportCustom">
                    <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom"   @click="imgDetail11"/>
                </div>
                <div class="border-img" v-show="reportCustom2">
                    <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom2"  @click="imgDetail12" />
                </div>
                <div class="border-img" v-show="reportCustom3">
                    <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom3"   @click="imgDetail13" />
                </div>
                <div class="border-img" v-show="reportCustom4">
                    <img :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+reportCustom4"   @click="imgDetail14"/>
                </div>
            </div>
        </div>
      <div class="model">
          <p>基本信息</p>
          <div class="card">
              <div class="content">
                  <div>
                      <span>报修时间：</span>
                      <span>{{data.reportTime}}</span>
                  </div>
                  <div>
                      <span>报修人员：</span>
                      <span>{{data.reportOpenIdName}}</span>
                  </div>
                   <div>
                      <span>报修类别：</span>
                      <span>{{data.reportTypeCauseName}}</span>
                   </div>
                   <div>
                      <span>报修类型：</span>
                      <span>{{data.reportTypeName}}</span>
                   </div>
                   <div>
                      <span>报修原因：</span>
                      <span>{{data.reportCause}}</span>
                   </div>
                    <div v-if="this.$route.params.isReport">
                      <span>报修状态：</span>
                      <span v-if="reportState == 0">待确认</span>
                      <span v-if="reportState == 1">已通过</span>
                      <span v-if="reportState == 2">未通过</span>
                    </div>
                    <div v-if="this.$route.params.isMainten">
                      <span>维修状态：</span>
                      <span v-if="reportState == 0">待确认</span>
                      <span v-if="reportState == 1">已通过</span>
                      <span v-if="reportState == 2">未通过</span>
                    </div>
                   <div v-if="reportState != 0">
                       <div>
                            <span>确认时间：</span>
                            <span>{{data.checkTime}}</span>
                       </div>
                       <div>
                            <span>确认人员：</span>
                            <span>{{data.checkUsername}}</span>
                       </div>
                  </div>
                   <div>
                        <span>报修地点：</span>
                        <span>{{data.reportAddr}}</span>
                    </div>
              </div>
          </div>
      </div>
      
      <!-- 报修审批 -->
      <div v-if="this.$route.params.isReport && IsReportTab == 0" class="setting-btn">
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

        <!-- 维修审批 -->
        <button v-if="this.$route.params.isMainten && IsTab == 0" class="search-btn" @click="goRepair()"   >开始维修</button>
        <div class="js_dialog" ref="iosDialog3" style="display: none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
                <div class="weui-dialog__bd">确定开始维修吗？</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel3">取消</a>
                    <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm3">确定</a>
                </div>
            </div>
        </div>

        <button v-if="this.$route.params.isMainten && IsTab == 1" class="search-btn2" @click="goRepairOver()"   >维修结束</button>
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
            msg:'我的报修详情',
            data:{},
            id: this.$route.params.reportId,
            reportCustom:'',
            reportCustom2:'',
            reportCustom3:'',
            reportCustom4:'',
            reportState:'',
            url: window.location.href,
            IsReportTab:0,
            IsTab:0

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

    },
    created(){

        // this.IsReportTab = this.isReportTab;
        // this.IsTab = this.tab;
        this.IsReportTab = this.$route.params.isReportTab;
        this.IsTab = this.$route.params.tab;
        if (!this.$route.params.isReportTab) {
            // this.IsReportTab = 0
        }
        if (!this.$route.params.tab) {
            // this.IsTab = 0
        }
        if (sessionStorage.getItem('report_id')) {
            this.id = sessionStorage.getItem('report_id')
        }
        
       
        console.log('IsReportTab++++++++++++----------------------------------',this.IsReportTab);
        console.log('IsTab++++++++++++----------------------------------',this.IsTab);
       
        //  this.init();
        //  this.id = sessionStorage.getItem("id");
         var param ={
             'reportId':this.id
         }
         selectUserReportDetail(param).then(res=>{
            this.data = res.data.data;
            console.log(this.data);
            this.reportCustom = res.data.data.reportCustom?res.data.data.reportCustom:'';
            this.reportCustom2 = res.data.data.reportCustom2?res.data.data.reportCustom2:'';
            this.reportCustom3 = res.data.data.reportCustom3?res.data.data.reportCustom3:'';
            this.reportCustom4 = res.data.data.reportCustom4?res.data.data.reportCustom4:'';
            this.reportState = res.data.data.reportState;
            this.initMap(res.data.data.longitude,res.data.data.latitude);
        }).catch(error =>{
        })
       
        
          
    },
    mounted(){
        if(!sessionStorage.getItem("longitude") && !sessionStorage.getItem("latitude")){
            this.initMap(0,0);
        }

    },
    methods:{
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
                    image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
                    size: new AMap.Size(100, 100),  //图标大小 
                    imageSize: new AMap.Size(30,30)
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
                this.$router.push({
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
         .border-img{
            width: 48%;
            height: 230px;
            border: 1px #e5e5e5 solid;
            border-radius: 15px;
             margin: 5px 0;
            
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