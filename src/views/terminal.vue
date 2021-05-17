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
       <div >
        <div class="card" v-for="(item,i) in data" :key="i" @click="goDetail(item)">
            <!-- <p>井盖信息</p> -->
            <div class="list2" >
               <div class="set">
                    <span class="p1">创建时间:</span>
                    <span class="p2" style="font-weight:bold">{{item.createTime}}</span>
                </div>
              <div class="set">
                    <span class="p1">事件类型:</span>
                    <span class="p2">{{item.eventCodeName}}</span>
                </div>
                <div class="set">
                    <span class="p1">是否推送:</span>
                    <span class="p2">{{item.isPushName}}</span>
                </div>
                <div class="set">
                    <span class="p1">是否送达:</span>
                    <span class="p2">{{item.pushResName}}</span>
                </div>
                <div class="set">
                    <span class="p1">单位名称:</span>
                    <span class="p2">{{item.deptName}}</span>
                </div>
                 <div class="set">
                    <span class="p1">井盖编码:</span>
                    <span class="p2">{{item.mcn}}</span>
                </div>
            </div>
        </div>

      </div>
      <button class="search-btn" @click="goSearch">查询</button>

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

        <div ref="loadingToast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">查询中</p>
            </div>
        </div>

        
  
  
  
  


  </div>
</template>

<script>
import Header from '../components/Header2';
import { selectChipsetSn } from "../api/user/function";
import weui from 'weui.js';
import 'weui';
import wx from 'weixin-js-sdk';
import {jsValid} from '../api/user/wechat';

export default {
    data(){
        return{
            msg:'终端查询',
            ChipCode:'',
            data:[],
            url: window.location.href,
            message:''
        }
    },
    components: {
        Header
    },
    watch:{
        ChipCode:{
            handler(newVal, oldVal){
                if (newVal) {
                    this.ChipCode = newVal
                    this.$store.commit('CHIPCODE', newVal)

                }
            }
        }
    },
    created(){
        this.init();
        // if (this.$store.state.user.chipcode) {
        //      this.ChipCode = this.$store.state.user.chipcode
        //      this.selectChipsetSn()
        // }
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
            this.$refs.loadingToast.style.display = 'block';
            if (this.ChipCode) {
                 this.selectChipsetSn()
            }else{
                this.$refs.loadingToast.style.display = 'none';
                this.message = '请输入SN码';
                this.$refs.iosDialog.style.display = 'block';
            }
           
        },
        selectChipsetSn(){
            selectChipsetSn(this.base64encode(this.ChipCode)).then(res =>{
                this.$refs.loadingToast.style.display = 'none';
                if (res.data.code == 200) {
                    this.data = res.data.data.layuiPageInfo.data
                }else{
                    this.data = []
                    this.message = res.data.message;
                    this.$refs.iosDialog.style.display = 'block';
                }
            })
        },
        confirm(){
            this.$refs.iosDialog.style.display = 'none';
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
        goDetail(item){
            this.$router.push({
                name:'terminalDetail',
                params:{
                    sn: item.deviceSn
                }
            })
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
         padding: 0px 30px;
         span{
           font-size: 30px;
         }
     }
      .inner2{
         padding: 30px;
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
             letter-spacing:5px;
            //  letter-spacing:10px;
            //  width: 200px;
            //  text-align: justify;
            //  text-align-last: justify;
            //  display: inline-block;
         }
         .p2{
             font-size: 28px;
             line-height: 28px;
             color: #999;
             padding-left: 20px;
         }
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