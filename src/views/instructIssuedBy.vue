<template>
  <div>
       <Header :data="msg"></Header>
       <div class="card">
            <div class="inner">
                <div class="weui-cell weui-cell_active active">
                    <div class="weui-cell__hd"><label class="weui-label">SN码</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input chipSN" placeholder="请输入SN码"  v-model="ChipCode" />
                    </div>
                    <span><i class="iconfont icon-saomiao icon1" @click="getCode2"></i></span>
                </div>
            </div>
      </div>
      <div class="card" >
        <div class="inner2">
             <div class="model" v-for="(item,i) in data" :key="i" @click="selectItem(item)" style="display:flex;justify-content: space-between;align-items: center;border-bottom:1px #e5e5e5 solid;padding-bottom:10px;margin-top:10px">
                <label class="label">{{item.label}}</label>
                <input type="radio" class="radio" name="SetWorkState" :value="item.value" >
            </div>
        </div>
      </div>
      <button class="search-btn" @click="goSearch">下发指令</button>

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
       <div class="js_dialog" ref="iosDialog2" style="display: none;">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
              <div class="weui-dialog__bd">是否下发指令？</div>
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
            <p class="weui-toast__content">指令下发中</p>
        </div>
      </div>

  </div>
</template>

<script>
import Header from '../components/Header2';
import { selectChipsetBySn, commandItem } from "../api/user/function";
import weui from 'weui.js';
import 'weui';
import wx from 'weixin-js-sdk';
import {jsValid} from '../api/user/wechat';

export default {
    data(){
        return{
            msg:'指令下发',
            ChipCode:'',
            data:[
                {
                    'label':'工作模式',
                    'value':'working',
                },
                {
                    'label':'休眠模式',
                    'value':'sleeping',
                },
                {
                    'label':'铺设模式',
                    'value':'laying',
                }
            ],
            value:'',
            message:'',
            url: window.location.href,
        }
    },
    components: {
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
                    // self.$store.commit('CODE2', chipSN)
                    //  alert(chipSN);
                    // alert(self.ChipCode)
                }
            });
        },
        goSearch(){
            if (this.ChipCode) {
                this.selectChipsetBySn()
            }else{
                 this.message = '请输入SN码';
                 this.$refs.iosDialog.style.display = 'block';
            }
            
        },
        selectItem(item){
            this.value = item.value;
        },
        selectChipsetBySn(){
            // this.$refs.loadingToast.style.display = 'block';
            selectChipsetBySn(this.base64encode(this.ChipCode)).then(res =>{
                // this.$refs.loadingToast.style.display = 'none';
                if (res.data.code == 200) {
                    // 
                    if (this.value) {
                         this.$refs.iosDialog2.style.display = 'block';
                    }else{
                        this.message = '请选择工作模式';
                        this.$refs.iosDialog.style.display = 'block';
                    }


                }else{
                    this.message = res.data.message;
                    this.$refs.iosDialog.style.display = 'block';
                }
            })
        },
        confirm(){
            this.$refs.iosDialog.style.display = 'none';
            
        },
        cancel2(){
            this.$refs.iosDialog2.style.display = 'none';
        },
        confirm2(){
             this.$refs.iosDialog2.style.display = 'none';
             this.commandItem()
             
        },
        commandItem(){
            this.$refs.loadingToast.style.display = 'block';
            commandItem(this.base64encode(this.ChipCode), this.value).then(res =>{
                this.$refs.loadingToast.style.display = 'none';
                 if (res.data.code == 200) {
                        this.message = '指令下发成功';
                        this.$refs.iosDialog.style.display = 'block';
                 }else{
                    this.message = res.data.message;
                    this.$refs.iosDialog.style.display = 'block';
                 }
            })
        },
        base64encode(str){
            var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },
       
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
    width: 100px;
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
        padding: 25px 40px;
         .model{
            //  display:flex;justify-content: space-between;align-items: center;border-bottom:1px #e5e5e5 solid;padding-bottom:10px;margin:10px 0;
            .label{
                font-size: 30px;
                color: #666;
            }
            // input{
            //     width: 30px;
            //     height: 30px;
            //     border-radius: 15px;
            //      border: 2px #e5e5e5 solid;
            // }
         }
           
       
     }
     
}

input{
    border: none;
    background-color:transparent;
    outline: none;
    // box-sizing: border-box;
    // border: 2px #e5e5e5 solid;
    // -webkit-appearance: none;
    
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