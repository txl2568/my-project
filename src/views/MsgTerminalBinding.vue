<template>
  <div>
      <Header :data="msg"></Header>
      <div class="card">
        <div class="inner">
          <div class="weui-cell weui-cell_active active setting">
            <div class="weui-cell__hd"><label class="weui-label">芯片编码</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" placeholder="请输入芯片编码" ref="getValue"  v-model="ChipCode" />
                
            </div>
            <span><i class="iconfont icon-saomiao icon1" @click="getCode"></i></span>
            <!-- <span><img src="/Static/swfbt/image/icon_scan.png" height="20px" style="position: absolute;right: 15px;top: 10px" id="img"></span> -->
          </div>
          <div class="weui-cell weui-cell_active active">
              <div class="weui-cell__hd"><label class="weui-label">井盖编码</label></div>
              <div class="weui-cell__bd">
                  <input class="weui-input chipMcn" placeholder="请输入井盖编码" v-model="Mcn"  />
              </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="inner2">
             <div v-for="(item,i) in data" :key="i" @click="selectItem(item)" style="display:flex;justify-content: space-between;align-items: center;border-bottom:1px #e5e5e5 solid;padding-bottom:10px;margin-top:10px">
                <label class="label">{{item.label}}</label>
                <input type="radio" name="SetWorkState" :value="item.value" >
            </div>
        </div>
      </div>
      <button class="search-btn" @click="goBind">提交绑定</button>

      <n-transition ref="pop" speed="ease-in-out" :style="{ height: '500px' }"  :maskVal="0.5" :data="data" @ensure="ensure" ></n-transition>

      <div class="js_dialog" ref="iosDialog" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">{{message}}</div>
              <div class="weui-dialog__ft">
                  <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a> -->
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm">确定</a>
              </div>
          </div>
      </div>

       <div class="js_dialog" ref="iosDialog3" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">{{message}}</div>
              <div class="weui-dialog__ft">
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel3">取消</a>
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="confirm3">确定</a>
              </div>
          </div>
      </div>

       <div class="js_dialog" ref="iosDialog2" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">确定提交绑定信息吗？</div>
              <div class="weui-dialog__ft">
                  <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel2">取消</a>
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
            <p class="weui-toast__content">正在绑定中</p>
        </div>
      </div>



      
  </div>
</template>

<script>
import Header from '../components/Header2';
import { selectDictionariesCode, selectDataCoverMcn, saveChipBinding } from "../api/user/function";
import { mapState } from 'vuex';
import weui from 'weui.js';
import 'weui';
import wx from 'weixin-js-sdk';
import {jsValid} from '../api/user/wechat';
import nTransition from '../components/n-transition2';

export default {
  data(){
    return{
      msg:'设备绑定',
      Mcn:'',
      url: window.location.href,
      ChipCode: '',
      data:[],
      text:'',
      value:'',
      message:'',
      isReplace: 'no',
      status:''
    }
  },
  components:{
      Header,
      nTransition
  },
  created(){
      this.selectDictionariesCode()
      this.init();
      // alert(this.code);
      
  },
  methods:{
    selectItem(item){
      this.value = item.value;
    },
    popUp () {
      selectDictionariesCode('label', 'value','config_work_state').then(res =>{
         this.data = res.data.data.config_work_state_list;
         this.$refs['pop'].show()
      }).catch(error =>{
      })
       
    },
    ensure(item){
      this.value = item.value;
      this.text = item.label;
      this.$refs['pop'].hide()
    },
    init(){
          let self = this;
            if (navigator.userAgent.indexOf('iPhone') !== -1) {
                self.url = sessionStorage.getItem('Url');
                

            }  else {
                const { href } = window.location;
                self.url = href;
            }
          // alert(self.url)
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
    selectDictionariesCode(){
      selectDictionariesCode('label', 'value','config_work_state').then(res =>{
          this.data = res.data.data.config_work_state_list;
          this.data.pop()
      })
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
    goBind(){
      
      
      if (!this.value) {
        // alert('请选择模式')
        // return
         this.message = '请选择模式'
        this.$refs.iosDialog.style.display = 'block';
      }
      if (!this.Mcn) {
        // alert('请输入mcn码')
        // return
        this.message = '请输入井盖编码'
        this.$refs.iosDialog.style.display = 'block';
      }
      if (!this.ChipCode) {
        // alert('请输入sn码')
        // return
        this.message = '请输入芯片编码'
        this.$refs.iosDialog.style.display = 'block';
      }
     
      if (this.ChipCode && this.Mcn && this.value) {
         selectDataCoverMcn(this.Mcn).then(res =>{
            console.log('查询====',res);
            if (res.data.code == 500) {
              this.message = res.data.message;
              this.$refs.iosDialog.style.display = 'block';
            }
            if (res.data.code == 200) {
               this.$refs.iosDialog2.style.display = 'block';

            }
       
          })
      }
     
    },
    confirm(){
      
      this.$refs.iosDialog.style.display = 'none';
      if (this.status) {
            this.Mcn = '';
            this.ChipCode = '';
            // this.value = '';
            this.isReplace = 'no';
      }
        
    },
    confirm2(){
      this.$refs.iosDialog2.style.display = 'none';
      // this.isReplace = 'yes';
      this.saveChipBinding();
 

    },
    cancel2(){
       this.$refs.iosDialog2.style.display = 'none';
    },
    confirm3(){
      this.isReplace = 'yes';
      this.saveChipBinding();
       this.$refs.iosDialog3.style.display = 'none';
    },
    cancel3(){
       this.$refs.iosDialog3.style.display = 'none';
    },
    saveChipBinding(){
      this.$refs.loadingToast.style.display = 'block'
        saveChipBinding(this.Mcn, this.ChipCode, this.value, this.isReplace).then(res =>{
          
          if (res.data.code == 500) {
            this.message = res.data.message;
            this.$refs.iosDialog.style.display = 'block';
            this.$refs.loadingToast.style.display = 'none';
          }
          if (res.data.code == 503) {
              this.message = res.data.message;
              this.$refs.iosDialog3.style.display = 'block';
              this.$refs.loadingToast.style.display = 'none';
          }
          if (res.data.code == 200) {
            this.status = true;
            this.$refs.loadingToast.style.display = 'none';
            this.message = '绑定成功!';
            this.$refs.iosDialog.style.display = 'block';
            
           

          }


       })
    }
    
  }
}
</script>

<style >
.weui-half-screen-dialog__hd{
  font-size: 30px !important;
  height: 180px !important;
}
.weui-half-screen-dialog__bd{
  font-size: 30px !important;
}
.weui-half-screen-dialog__title{
   font-size: 30px !important;
}
.weui-btn{
   font-size: 28px !important;
   line-height: 28px !important;
}
.weui-btn_primary{
  background-color: #1890ff;
}

</style>

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


.icon1{
  font-size: 40px;
  color: #1890ff;
}
.icon2{
  font-size: 25px !important;
  position: absolute;
  right: 0;
}

// .setting{
//   display: flex;
//   align-items: center;
// }
.card{
    background-color: #fff;
    //  height: 430px;
     height: 100%;
     margin-bottom: 20px;
      .inner{
         padding: 10px 25px;
     }
      .inner2{
         padding: 20px 40px;
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