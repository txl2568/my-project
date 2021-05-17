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
                      <span>归属业主：</span>
                      <span>{{data.deptIdName}}</span>
                  </div>
                  <div>
                      <span>报修类型：</span>
                      <span>{{data.repairTypeNames}}</span>
                  </div>
                   <div>
                      <span>报修时间：</span>
                      <span>{{data.reportTime}}</span>
                   </div>
                   <div>
                      <span>确认时间：</span>
                      <span>{{data.checkTime}}</span>
                   </div>
                    <div>
                        <span>确认人员：</span>
                        <span>{{data.checkOpenIdName}}</span>
                    </div>
                    <div>
                        <span>确认渠道：</span>
                        <span>{{data.checkChannelName}}</span>
                    </div>
                     <!-- 中 -->
                    <div v-if="IsTab == 1">
                        <span>维修人员：</span>
                        <span>{{data.repairUserName}}</span>
                    </div>
                     <div  v-if="IsTab == 1">
                        <span>开始时间：</span>
                        <span>{{data.repairStarttime}}</span>
                    </div>
                    <!-- 审批中  已维修-->
                     <div  v-if="IsTab == 3">
                        <span>结束时间：</span>
                        <span>{{data.repairEndtime}}</span>
                    </div>
                    <!--  -->
                     <div>
                        <span>维修渠道：</span>
                        <span>{{data.reportChannelName}}</span>
                    </div>
                    <div>
                        <span>维修状态：</span>
                        <span>{{data.repairStateNames}}</span>
                    </div>
                    <div>
                        <span>报修原因：</span>
                        <span>{{data.reportCause}}</span>
                    </div>
                    <div>
                        <span>报修地点：</span>
                        <span>{{data.reportAddr}}</span>
                    </div>
                   
              </div>
          </div>
       </div>
      

        <!-- 维修审批 -->
        <button v-if="IsTab == 0" class="search-btn" @click="goRepair()" >开始维修</button>
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

        <button v-if="IsTab == 1" class="search-btn2" @click="goRepairOver()" >维修结束</button>

        <div ref="loadingToast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">提交中</p>
            </div>
        </div>

        <div class="js_dialog" ref="iosDialog2" style="display: none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
                <div class="weui-dialog__bd">{{message}}</div>
                <div class="weui-dialog__ft">
                    <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel3">取消</a> -->
                    <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm2">确定</a>
                </div>
            </div>
        </div>

        <div class="js_dialog" ref="iosDialog5" style="display: none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
                <div class="weui-dialog__bd">{{message}}</div>
                <div class="weui-dialog__ft">
                    <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel3">取消</a> -->
                    <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm5">确定</a>
                </div>
            </div>
        </div>

  </div>
</template>

<script>
import Header from '../components/Header2';
// import {selectUserReportDetail} from '../api/user/wechat';
import wx from 'weixin-js-sdk';
import {jsValid, transform} from '../api/user/wechat';
import { saveUserReport, repairItemStart, selectUserRepairDetail } from '../api/user/function';
// import { mapState } from 'vuex';

export default {
    data(){
        return{
            msg:'维修详情',
            data:{},
            id: this.$route.params.reportId,
            reportCustom:'',
            reportCustom2:'',
            reportCustom3:'',
            reportCustom4:'',
            reportState:'',
            url: window.location.href,
            IsReportTab:0,
            IsTab:'',
            repairId:'',
            message:''

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

       if (sessionStorage.getItem('repair_id')) {
            this.id = sessionStorage.getItem('repair_id')
       }
       this.selectUserRepairDetail()

       this.IsTab = this.$route.query.tab;
    //    localStorage.setItem('NowTab',this.IsTab)
    //    this.$store.commit('TAB', this.IsTab);


       
    //     if (sessionStorage.getItem('NowTab')) {
    //        this.IsTab = sessionStorage.getItem('NowTab')
            
    //    }
     

    //    if (sessionStorage.getItem('isNowTab')) {
    //        this.IsTab = sessionStorage.getItem('isNowTab')
          
    //    }
      
        
          
    },
    mounted(){
        if(!sessionStorage.getItem("longitude") && !sessionStorage.getItem("latitude")){
            this.initMap(0,0);
        }
        //  console.log('你是个啥2----------------',sessionStorage.getItem('NowTab'));
        //  this.IsTab = this.tab
        // console.log('你是个啥----------------',this.IsTab,this.tab);
       

    },
    methods:{
        selectUserRepairDetail(){
            var param ={
                'repairId':this.id
            }
            selectUserRepairDetail(param).then(res=>{
                this.data = res.data.data;
                this.reportCustom = res.data.data.reportCustom?res.data.data.reportCustom:'';
                this.reportCustom2 = res.data.data.reportCustom2?res.data.data.reportCustom2:'';
                this.reportCustom3 = res.data.data.reportCustom3?res.data.data.reportCustom3:'';
                this.reportCustom4 = res.data.data.reportCustom4?res.data.data.reportCustom4:'';
                this.reportState = res.data.data.reportState;
                this.repairId = res.data.data.repairId;
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
        goRepair(){
            this.$refs.iosDialog3.style.display = 'block';
        },
        confirm3(){
           
            // setTimeout(function () {
                
                this.repairItemStart()
                this.$refs.iosDialog3.style.display = 'none';
            // }, 2000);

           
        },
        cancel3(){
            this.$refs.iosDialog3.style.display = 'none';
        },
        repairItemStart(){
            var sjjwUserRepairParam={
                'repairId':this.$route.params.repairId
            }
             this.$refs.loadingToast.style.display = 'block'
            repairItemStart(sjjwUserRepairParam).then(res =>{
                
                if (res.data.code == 200) {
                    this.$refs.loadingToast.style.display = 'none';
                    //  alert('')
                    this.message = '开始维修成功';
                    this.$refs.iosDialog5.style.display = 'block';
                   
                }
                if (res.data.code == 500) {
                    this.$refs.loadingToast.style.display = 'none';
                    // alert(res.data.message)
                     this.message = res.data.message;
                    this.$refs.iosDialog2.style.display = 'block';
                }
               
            })
        },
        confirm5(){
             this.$router.replace({
                        name:'examinationMainten'
                    })
        },
        confirm2(){
            // this.$router.push({
            //     name:'repair'
            // })
            // this.saveUserReport()
            this.$refs.iosDialog2.style.display = 'none';
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

.weui-toast__content{
    font-size: 33px;
}
.weui-toast{
    top: 50%;
    width: 200px;
    height: 200px;
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
        // background-color: #cccccc;
        background-color: orangered;
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