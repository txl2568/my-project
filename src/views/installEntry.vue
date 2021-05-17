<template>
  <div>
      <Header :data="msg"></Header>
      <div class="card">
        <div class="inner">
          <div class="weui-cell weui-cell_active active setting">
            <div class="weui-cell__hd"><label class="weui-label">SN/MCN</label></div>
            <div class="weui-cell__bd">
                <!-- <form action="" onsubmit="return false;"> -->
                    <input class="weui-input" placeholder="请输入SN或MCN" ref="getValue"  v-model="ChipCode" maxlength="20"  oninput = "value=value.replace(/[^\w_]/g,'')"  />
                <!-- </form> -->
            </div>
            <span><i class="iconfont icon-saomiao icon1" @click="getCode"></i></span>
          </div>
        </div>
      </div>
      <div  v-if="Object.keys(dataCover).length > 0">
            <div class="card">
                <p>基本信息</p>
                <div class="list2" >
                    <div class="set">
                        <span class="p1">芯片编码：</span>
                        <span class="p2">{{dataCover.chipCode}}</span>
                    </div>
                    <div class="set">
                        <span class="p1">井盖编码：</span>
                        <span class="p2">{{dataCover.coverMcn}}</span>
                    </div>
                    <div class="set" v-if="data.administrator">
                        <span class="p1">单位：</span>
                        <input type="text" placeholder="请输入单位" v-model="Name" @keyup="search" class="input" />
                        <div class="input-container" v-show="nameArr">
                            <div v-for="(item,i) in nameArr" :key="i">
                                <p class="span" @click="getItem(item.fullName)">{{item.fullName}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="set" v-if="!data.administrator">
                        <span class="p1">单位：</span>
                        <span class="p2">{{dataCover.deptName}}</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <p>井盖图片</p>
                <div class="model-img">
                    <div class="border-img" >
                        <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+coverImgpath" v-show="!localIds"  @click="imgDetail('img11')" />
                        <img  :src="localIds"  @click="imgDetail('img11')"  v-show="localIds"  />
                        <!-- <i class="iconfont icon-xiangji" style=" font-size: 70px;color: #666;"></i> -->
                    </div>
                    <div class="border-img" >
                        <img  :src="'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+coverImgpath2" v-show="!localIds2" @click="imgDetail('img12')" />
                        <img  :src="localIds2"  @click="imgDetail('img12')"  v-show="localIds2"  />
                    </div>
                </div>
            </div>
            <button class="search-btn" @click="goBind">提交</button>
      </div>
        
      <button class="search-btn"  @click="goSearch"  v-else>查询</button>
        

        <div ref="Toast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">查询中</p>
            </div>
        </div>

        
        <div class="weui-skin_android" ref="androidActionsheet" style="display: none;">
            <div class="weui-mask"></div>
            <div class="weui-actionsheet">
                <div class="weui-actionsheet__menu">
                    <div class="weui-actionsheet__cell chakan" @click="gochakan">查看图片</div>
                    <div class="weui-actionsheet__cell xiugai" @click="goxiugai">修改图片</div>
                    <div class="weui-actionsheet__cell quxiao" style="color: #1890ff" @click="goquxiao">取消</div>
                </div>
            </div>
        </div>

        <div class="js_dialog" ref="iosDialog2" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">{{message}}</div>
              <div class="weui-dialog__ft">
                  <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel2">取消</a> -->
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm2">确定</a>
              </div>
          </div>
       </div>

       <div class="js_dialog" ref="iosDialog" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">确定要提交吗？</div>
              <div class="weui-dialog__ft">
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a>
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm">确定</a>
              </div>
          </div>
       </div>

       <div ref="Toast2" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">提交中</p>
            </div>
        </div>

         <div id="textToast" ref="textToast" style="display:none">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast weui-toast_text">
                <p class="weui-toast__content">保存成功</p>
            </div>
        </div>

  </div>
</template>

<script>
import Header from '../components/Header2';
import weui from 'weui.js';
import 'weui';
import wx from 'weixin-js-sdk';
import { jsValid, transform} from '../api/user/wechat';
import { selectIsNotInstallByMcnOrSn, selectDeptName, installEntry } from "../api/user/function";

export default {
    data(){
        return{
             msg:'安装录入',
             ChipCode:'',
             Name:'',
             nameArr:[],
             coverImgpath:'',
             coverImgpath2:'',
             longitude:'',
             latitude:'',
             nowImg:'',
             serverId:'',
             serverId2:'',
             localIds:'',
             localIds2:'',
             data:{},
             dataCover:{},
             message:'',
             coverMcn:''
        }
    },
    components:{
        Header
    },
    created(){
        this.init()
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
                    jsApiList: ['checkJsApi','chooseImage','uploadImage','getLocalImgData','previewImage','getLocation','scanQRCode'] // 必填，需要使用的JS接口列表
                });
            }).catch(error => {
            });

           


            wx.checkJsApi({
                jsApiList: ['chooseImage','uploadImage','getLocalImgData','previewImage','getLocation','scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
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
                self.getLonLat()


            });
           
            wx.error(function (res) {
                console.log("===="+res);
                // $("#loadingToast").hide();
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                alert("验证出错");
                return false;
            });
        },
        getCode(){
            let self = this;
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: function (res) {
              //    alert(res.resultStr);
                  var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                  var chipSN;
                  if(result.indexOf(",")!=-1){
                      var array= new Array(); //定义一数组
                      array=result.split(","); //字符分割
                      chipSN = array[1];
                      // alert(chipSN);
                  }else {
                      chipSN = result;
                  }
                  // $(".chipSN").val("");
                  // $(".chipSN").val(chipSN);
                  self.ChipCode = chipSN

              }
          });
        },
        search(){
            selectDeptName(this.Name).then(res =>{
                console.log(res);
                if (res.data.code == 200) {
                    this.nameArr = res.data.data;
                }else{
                    this.nameArr = []
                }
                
            }).catch(err =>{ this.nameArr = [] })
        },
        getItem(name){
            
            this.Name = name
            this.nameArr = []
        },
        goSearch(){
            this.localIds = ''
            this.localIds2 = ''
            this.serverId = ''
            this.serverId2 = ''
            if(!this.ChipCode){
                this.$refs.iosDialog2.style.display = 'block';
                this.message = '请输入SN/MCN码'
            }else{
                this.$refs.Toast.style.display = 'block';
                selectIsNotInstallByMcnOrSn(this.ChipCode).then(res =>{  
                    this.$refs.Toast.style.display = 'none';
                    if (res.data.code == 200) {
                        this.data = res.data.data;
                        this.dataCover = res.data.data.dataCover;
                        this.deptName = this.dataCover.deptName;
                        this.coverMcn = this.dataCover.coverMcn;
                        this.coverImgpath = this.dataCover.coverImgpath?this.dataCover.coverImgpath:'';
                        this.coverImgpath2 = this.dataCover.coverImgpath2?this.dataCover.coverImgpath2:'';
                        this.getLonLat()
                        
                    }else{
                        this.dataCover = {}
                        this.$refs.iosDialog2.style.display = 'block';
                        this.message = res.data.message
                        // this.$refs.Toast.style.display = 'none';
                    }
                })
            }
       
        },
        confirm2(){
            this.$refs.iosDialog2.style.display = 'none';
            if (this.message == '安装录入成功！') {
                 this.dataCover = {}
            }
           
        },
        getLonLat(){
            let self = this;
            wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {

                        var locations =  res.longitude + ','+  res.latitude 

                        transform('gps',locations,'JSON').then(res =>{
                            self.longitude = res.data.data.log;
                            self.latitude = res.data.data.lat;
                        })
                        
                    },
                    fail: res => {
                        //接口调用失败，提示用户打开定位功能
                        self.wetoast.toast({ title: '获取定位失败，请打开定位，重新进入！' });
                    }
                });
        },
        imgDetail(nowImg){
            this.nowImg = nowImg;
            this.$refs.androidActionsheet.style.display = 'block';

        },
        goBind(){
            // this.$refs.iosDialog.style.display = 'block';
             if (this.data.administrator && !this.Name) {
                // this.$refs.Toast2.style.display = 'none';
                this.$refs.iosDialog2.style.display = 'block';
                this.message = '请输入单位';
            }
            // alert(this.data.administrator)
            if ((this.data.administrator && this.Name) || (this.data.administrator == '' || this.data.administrator == undefined)) {
                this.$refs.iosDialog.style.display = 'block';
            }

            
        },
        confirm(){
            this.$refs.iosDialog.style.display = 'none';
            this.$refs.Toast2.style.display = 'block';
            this.installEntry()
          
        },
        cancel(){
            this.$refs.iosDialog.style.display = 'none';
        },
        installEntry(){
                var param = {
                    "coverImgpath": this.serverId?this.serverId:'',
                    "coverImgpath2":  this.serverId2?this.serverId2:'',
                    "installMcn": this.coverMcn,
                    "installRearDeptName": this.Name?this.Name:'',
                    "installRearLat": this.latitude,
                    "installRearLong": this.longitude,
                }
                installEntry(param).then(res =>{
                    this.$refs.Toast2.style.display = 'none';
                    if (res.data.code == 200) {
                        this.$refs.iosDialog2.style.display = 'block';
                        this.message = '安装录入成功！';
                        
                    }else{
                        this.$refs.iosDialog2.style.display = 'block';
                        this.message = res.data.message
                    }
                })
        },
        gochakan(){
            this.$refs.androidActionsheet.style.display = 'none';
            if (this.nowImg == 'img11') {
                wx.previewImage({
                    current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath, // 当前显示图片的http链接
                    urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath,
                    'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2] // 需要预览的图片http链接列表
                });
            }else{
                 wx.previewImage({
                    current: 'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2, // 当前显示图片的http链接
                    urls: ['http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath,
                    'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/'+this.coverImgpath2] // 需要预览的图片http链接列表
                });
            }
        },
        goxiugai(){
            this.$refs.androidActionsheet.style.display = 'none';
            let self = this;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log('res+++++++++++++:',res);
                    // self.$refs.androidActionsheet.style.display = 'none';
                    // $("#photolist").html(""); //每次选择图片完成后都清空之前已经添加的html节点  
                    // self.localIds = '';
                    // self.localIds2 = '';
                    if (self.nowImg == 'img11') {
                        self.localIds = res.localIds;
                        // self.localIds22  = res.localIds;
                    }
                    if (self.nowImg == 'img12') {
                        self.localIds2 = res.localIds;
                    }
                
                    
                    wx.getLocalImgData({
                        localId: res.localIds[0], // 图片的localID
                        success: function (res) {
                            // this.localData = res.localData;
                            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示

                            if (navigator.userAgent.indexOf('iPhone') !== -1) {
                                if (self.nowImg == 'img11') {
                                    self.localIds = res.localData;
                                }else {
                                    self.localIds2 = res.localData;
                                }

                         
                            }  else {
                                if (self.nowImg == 'img11') {
                                    self.localIds ='data:image/png;base64,'+res.localData;
                                // self.coverImgpath = self.localIds;
                                }else{
                                    self.localIds2 ='data:image/png;base64,'+res.localData;
                                // self.coverImgpath2 = self.localIds2;
                                }
                                
                            }

                        
                            
                            

                        }
                    });

                    // 上传图片
                    wx.uploadImage({
                        localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            
                            if (self.nowImg == 'img11') {
                                self.serverId = res.serverId;
                            }else{
                                self.serverId2 = res.serverId;
                            }
                          


                        },
                        fail: function (error) {
                            // $("#loadingToasts").hide();
                            alert('上传错误,请稍候重试!');
                        }
                    });

                    
                }
            });
        },
        goquxiao(){
            this.$refs.androidActionsheet.style.display = 'none';
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

.label{
  font-size: 30px;
  color: #666;
}
input{
    border: none;
    background-color:transparent;
    outline: none;
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

.weui-label{
  width: 200px;
  color: #666;
  font-size: 30px;
}
.weui-cell_select-after.weui-cell_access .weui-cell__bd{
   color: #999;
    font-size: 30px;
}
.weui-cell_select .weui-cell__bd:after{
  display: none;
}
.weui-cell_select-after{
  padding-left: 0;
}
.weui-input{
  font-size: 30px;
}

.weui-skin_android .weui-actionsheet{
    width: 55%;
    border-radius: 8px;
}
.chakan,.xiugai, .quxiao{
  font-size: 30px;
}
.weui-skin_android .weui-actionsheet__cell{
  line-height: 30px;
  padding: 35px 20px;
  text-align: center;
}


.icon1{
  font-size: 40px;
  color: #1890ff;
}
.icon2{
  font-size: 25px !important;
  position: absolute;
  right: 0;
}


.card{
    background-color: #fff;
    //  height: 430px;
     height: 100%;
     margin-bottom: 20px;
     p{
         font-size: 30px;
         height: 80px;
         line-height: 80px;
         border-bottom: 1px #e5e5e5 solid;
         padding-left: 10px;
     }
     .list2{
          padding: 20px;
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
             width: 190px;
             text-align: justify;
             text-align-last: justify;
             display: inline-block;
         }
         .p2{
             font-size: 28px;
             line-height: 28px;
             color: #999;
            //  padding-left: 20px;
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

button{
    border: none;
    background-color: transparent;
    outline: none;  
}
.search-btn{
      text-align: center;
      width: 95%;
      height: 80px;
      line-height: 80px;
      border-radius: 15px;
      background-color: #1890ff;
      color: #fff;
      font-size: 30px;
      display: block;
      margin: auto;
      margin-top: 30px;
  }
  .input-container{
           background-color: #fff;
            width: 66%;
            height: auto;
            margin-left: 2.53333rem;
            border: 0.01333rem #e5e5e5 solid;
            position: absolute;
            z-index: 99;
  }
  .input{
      font-size: 30px;
  }
  .span{
      font-size: 30px;
  }
</style>