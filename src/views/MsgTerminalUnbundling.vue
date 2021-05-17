<template>
  <div>
      <Header :data="msg"></Header>
      <div class="card">
        <div class="inner">
            <div class="weui-cell weui-cell_active active">
                <div class="weui-cell__hd"><label class="weui-label">MCN码/SN码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input chipSN" placeholder="请输入MCN码/SN码"  v-model="ChipCode" />
                </div>
                <span><i class="iconfont icon-saomiao icon1" @click="getCode2"></i></span>
            </div>
        </div>
      </div>
      <div class="card" v-show="coverMcn && sn">
        <div class="inner">
          <div>
               <span>MCN:</span>
              <span>{{coverMcn}}</span>
          </div>
          <div>
               <span>SN码:</span>
              <span>{{sn}}</span>
          </div>
        </div>
      </div>
      <button class="search-btn" @click="goSubmit">提交</button>
 

       <div class="js_dialog" ref="iosDialog" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">{{message}}</div>
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
                <p class="weui-toast__content">解绑中</p>
            </div>
        </div>
      

  </div>
</template>

<script>
import Header from '../components/Header2';
import { selectDataCoverMcnBySnUnbind, saveChipUnbind } from "../api/user/function";
import { mapState } from 'vuex';
import weui from 'weui.js';
import 'weui';
import wx from 'weixin-js-sdk';
import {jsValid} from '../api/user/wechat';
// import { Button } from 'vant';


export default {
  data(){
    return{
      msg:'设备解绑',
      url: window.location.href,
      ChipCode:'',
      Mcn:'',
      isReplace:'yes',
      message:'',
      coverMcn:'',
      sn:'',
      status:''
    }
  },
  components:{
      Header,
      // [Button.name]:Button
  },
  created(){
      // this.ChipCode = sessionStorage.getItem('ChipCode')
      // this.Mcn = this.code2;
      this.init();
      // this.selectDictionariesCode()
      // alert(this.code);
  },
  methods:{
    // getCode2(){
    //   this.$refs.jsValid.getCode2()
    //   // alert(this.$refs.jsValid.ChipCode)
    //   this.Mcn = this.$refs.jsValid.ChipCode;
    // },
    init(){
          let self = this;
          if (navigator.userAgent.indexOf('iPhone') !== -1) {
              self.url = sessionStorage.getItem('Url');
              

          }  else {
              const { href } = window.location;
              self.url = href;
          }
          // console.log('url',self.url,this.url);
          jsValid(self.url).then(res =>{
              console.log('res==',res)
              wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: res.data.data.appId, // 必填，公众号的唯一标识
                  timestamp: res.data.data.timestame, // 必填，生成签名的时间戳
                  nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                  signature: res.data.data.signature,// 必填，签名
                  jsApiList: ['checkJsApi','scanQRCode'] // 必填，需要使用的JS接口列表
              });
          }).catch(error => {
          });

          


          wx.checkJsApi({
              jsApiList: ['chooseImage','scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
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
    getCode2(){
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
                // sessionStorage.setItem('ChipCode', chipSN)
                self.$store.commit('CODE2', chipSN)
                //  alert(chipSN);
                // alert(self.ChipCode)
            }
        });
    },
    goSubmit(){
      if (!this.ChipCode) {
        // this.$refs.loadingToast.style.display = 'none';
        this.message = '请输入芯片/井盖编码'
        this.$refs.iosDialog2.style.display = 'block';
      }
      if (this.ChipCode) {
          // this.message = '是否解除绑定？';
          // this.$refs.iosDialog.style.display = 'block';
          this.selectDataCoverMcnBySnUnbind()
      }
    
    },
    selectDataCoverMcnBySnUnbind(){
       selectDataCoverMcnBySnUnbind(this.ChipCode).then(res =>{
              // alert(res.data.data.dataCoverList.coverMcn)
            //  alert(111)
            // console.log(res);
             
              // alert(this.sn)
              if (res.data.code == 200) {
                this.coverMcn = res.data.data.dataCoverList.coverMcn;
                this.sn = res.data.data.dataCoverList.chipCode;
                // if (this.coverMcn == '' || this.coverMcn == undefined) {
                //     this.message = '该设备已解绑!'
                //     this.$refs.iosDialog2.style.display = 'block';
                // }
                 if (this.sn == '' || this.sn == undefined) {
                    this.message = '该设备已解绑!'
                    this.$refs.iosDialog2.style.display = 'block';
                }
                if (this.coverMcn && this.sn) {
                    this.message = '是否解除绑定？';
                    this.$refs.iosDialog.style.display = 'block';
                    // this.saveChipUnbind()
                }

                
              
              }else{
                  this.message = res.data.message;
                  this.$refs.iosDialog2.style.display = 'block';
              }
            
            }).catch(error =>{
              // alert(error)
            })
    },
    cancel(){
       this.$refs.iosDialog.style.display = 'none';
    },
    confirm(){
      this.$refs.loadingToast.style.display = 'block';
      this.$refs.iosDialog.style.display = 'none';
      this.saveChipUnbind();
      
    },
     saveChipUnbind(){
       saveChipUnbind(this.coverMcn, this.ChipCode,  this.isReplace).then(res =>{
            this.$refs.loadingToast.style.display = 'none';
            if (res.data.code == 500) {
              this.message = res.data.message;
              this.$refs.iosDialog2.style.display = 'block';
              this.$refs.loadingToast.style.display = 'none';
            }
            if (res.data.code == 200) {
              this.$refs.loadingToast.style.display = 'none';
              this.status = res.data.code;
              this.message = '解绑成功!'
              this.$refs.iosDialog2.style.display = 'block';
              this.isReplace = 'yes';
            }
        }).catch(error =>{
          alert(error)
        })
    },
    confirm2(){
      this.$refs.iosDialog2.style.display = 'none';
      this.sn = '';
      this.coverMcn = '';

    },
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
    padding-left: 50px;
  }
  .icon1{
    font-size: 40px;
    color: #1890ff;
  }

  .card{
    background-color: #fff;
    //  height: 430px;
     height: 100%;
     margin-bottom: 20px;
      .inner{
         padding: 10px 25px;
         span{
           font-size: 30px;
         }
     }
      .inner2{
         padding: 30px;
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
</style>