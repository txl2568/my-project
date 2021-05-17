<template>
  <div>
     <Header :data="msg"></Header>
     <div class="container" ref="container" style="display:none">
        <p class="title">账户名称</p>
        <input type="text" placeholder="请输入账户名称/手机号" class="input-text set" v-model="name" ref="inputVal"  @blur="blurFn">
        <input type="text" placeholder="请输入手机号" class="input-text set" v-model="phone"  @blur="blurPhone">

        <input type="text" placeholder="请输入验证码" class="input-text set2"  v-model="verification">
      
        <span v-if="showtime" class="captcha-button">{{showtime}}</span>
        <span class="code-span" v-else @click="validatemobile(phone)">获取验证码</span>
        <div class="submit-btn" @click="submit">提交绑定</div>
     </div>



      <div class="container2" ref="container2" style="display:none">
          <List :ownerList="data" :noData5="noData" style="margin-top:-120px"></List>
      </div>
       
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

      <div ref="loadingToast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">绑定中</p>
            </div>
      </div>

      <div class="js_dialog" ref="Dialog" style="display: none;">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示信息</strong></div>
            <div class="weui-dialog__bd">{{message}}</div>
            <div class="weui-dialog__ft">
                <!-- <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_default default" @click="cancel">取消</a> -->
                <a href="javascript:" class="weui-dialog__btn weui-dialog__btn_primary primary" @click="DialogConfirm">确定</a>
            </div>
        </div>
      </div>

  </div>
</template>

<script>
import Header from '../components/Header2';
// import Search from '../components/Search';
// import moment from "moment";
import {getCode, selectUsetPhone, saveBind, isNoBinding, selectBind} from '../api/user/user';
// import maskModel from '../components/maskModel';
import List from '../components/List';
import weui from 'weui.js';
import 'weui';
import { transform } from '../api/user/wechat';

export default {
  data () {
    return {
      msg:'绑定账户',
      phone:'',
      timeCounter: null,// 计时器,注意需要进行销毁
      showtime: null,
      name:'',
      saveBindUrl:'/api/wechat/user/saveBind',
      verification:'',
      account:'',
      isAccount:false,
      message: '',
      isBinding: undefined,
      pages:{
          page:1,
          limit:3
      },
      data:[],
      noData:undefined,
    }
  },
  components: {
    Header,
    List,
    // Search
    // maskModel
  },
  watch:{
    name:{
      handler(newVal, oldVal) {
        if(newVal){
            this.name = newVal
            sessionStorage.setItem("account",  newVal);
        }
        console.log(newVal,oldVal)
      }
    }
  },
  mounted () {
    // this.$refs.inputVal.focus();
  },
  created(){
    this.isNoBinding();
    this.selectBind();
    if (sessionStorage.getItem('isBinding') ) {
      this.isBinding = sessionStorage.getItem('isBinding')
      // alert(this.isBinding)
    }
  },
  methods:{
        // 倒计时显示处理
      countDownText(s) {
        this.showtime = `${s}s后重新获取`
      },
      // 倒计时 60秒 不需要很精准
      countDown(times) {
        const self = this;
        // 时间间隔 1秒
        const interval = 1000;
        let count = 0;
        self.timeCounter = setTimeout(countDownStart, interval);
        function countDownStart() {
        if (self.timeCounter == null) {
        return false;
        }
        count++
        self.countDownText(times - count + 1);
        if (count > times) {
        clearTimeout(self.timeCounter)
        self.showtime = null;
        } else {
        self.timeCounter = setTimeout(countDownStart, interval)
        }
        }
      },
      send() {
        this.countDown(120);
      },
      validatemobile(mobile) { 
        // let mobile = event.currentTarget.value
        console.log(mobile)
        
        // if(mobile.length==0) 
        // { 
        // // alert('手机号码不能为空！');
        // return false; 
        // } 
        if(mobile.length!=11) 
        { 
        // alert('请输入有效的手机号码，需是11位！');
          this.message ='请输入有效的手机号码，需是11位';
          this.$refs.Dialog.style.display = 'block';
          return false; 
        } 

        var myreg = /^1(3[0-9]|4[579]|5[0-35-9]|6[6]|7[0-35-9]|8[0-9]|9[89])\d{8}$/;

        // var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        if(!myreg.test(mobile)) 
        { 
        // alert('请输入有效的手机号码！'); 
          this.message ='请输入有效的手机号码！';
          this.$refs.Dialog.style.display = 'block';
          return false; 
        } 
        getCode(this.phone).then(res=>{
              console.log('getCode',res)
        })
        this.send()

      },
      selectUsetPhone(){
        selectUsetPhone(this.name).then(res=>{
          //  let isAccount = res.data.data
          //  console.log(isAccount)
          this.isAccount = res.data.data
            
          //  if(this.isAccount){
          //    this.isAccount = this.name
          //  }
          //  else{
          //    alert('该账户名称不存在！')
          //  }

          //  let params = {
          //     account: isAccount?this.name:'',
          //   }
          // this.account = isAccount?this.name:'';
          // if(!isAccount){
          //      alert('该账户名称不存在！')
          // }
 
          //  console.log('account=',this.account)


        }).catch(error => {
        });
      },
      blurFn(){
        
        if (this.name) {
          this.selectUsetPhone()
        }else{
          this.message ='请输入账户名称';
          this.$refs.Dialog.style.display = 'block';
        }
      },
      DialogConfirm(){
        this.$refs.Dialog.style.display = 'none';
        this.$router.back();
      },
      blurPhone(){
        // if (this.phone) {
        //    if(!(/^1(3[0-9]|4[579]|5[0-35-9]|6[6]|7[0-35-9]|8[0-9]|9[89])\d{8}$/.test(this.phone))){ 
        //       this.message ='请输入正确的手机号';
        //       this.$refs.Dialog.style.display = 'block'; 
        //     }

        // }else{
        //   this.message ='请输入手机号';
        //   this.$refs.Dialog.style.display = 'block';
        // }
        if (!this.phone) {
           this.message ='请输入手机号';
           this.$refs.Dialog.style.display = 'block';
        }
      },
      submit(){

        //需表单验证
        if (!this.name) {
          alert('请输入账户名称/手机号')
          return
        }
        //  if (!this.phone) {
        //   alert('请输入手机号')
        //   return
        // }
        // if(!(/^1(3[0-9]|4[579]|5[0-35-9]|6[6]|7[0-35-9]|8[0-9]|9[89])\d{8}$/.test(this.phone))){ 
        //   alert("请输入正确的手机号"); 
        //   // document.mobileform.mobile.focus(); 
        //   return  
        // } 
         if (!this.verification) {
          alert('请输入验证码')
          return
        }

        this.selectUsetPhone()
        let account =  sessionStorage.getItem("account");

        this.$refs.loadingToast.style.display = 'block';


        saveBind( account, this.phone, this.verification).then(res=>{
            if (res.data.code == 500) {
              this.message = res.data.message;
              this.$refs.Dialog.style.display = 'block';
              this.$refs.loadingToast.style.display = 'none';
            }
             if (res.data.code == 200) {
              this.message = res.data.message;
              this.$refs.Dialog.style.display = 'block';
              this.$refs.loadingToast.style.display = 'none';
            }

        }).catch(error => {
        });

      },
      cancel(){
            this.$refs.iosDialog.style.display = 'none';
      },
      confirm(){
            this.$refs.iosDialog.style.display = 'none';
            this.$router.back()
      },
      isNoBinding(){
        isNoBinding().then(res =>{
          this.isBinding = res.data.data;
          if (res.data.data) {
             this.$refs.container2.style.display = "block";
          }else{
            this.$refs.container.style.display = "block";
          }
         
          sessionStorage.setItem('isBinding',this.isBinding)
        })
      },
      selectBind(){
        selectBind(this.pages.limit, this.pages.page).then(res =>{
          console.log(res);
          this.data = res.data.data.data
          if (res.data.code == 500) {
            this.noData = true
          }
        })
      }

  }
}
</script>

<style lang="scss">
.van-cell{
  padding: 30px 10px;
}

.van-field__control{
  font-size: 30px !important;
}
</style>
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

.weui-toast{
    width: 25%;
    height: 100px;
}
.weui-toast__content{
     font-size: 30px;
}



.container{
    height:100%;
    background-color:#fff;
    border-radius:20px;
    margin:60px 20px 20px 20px;
    padding:20px;
    position: relative;
    .title{
    text-align: center;
    margin-top:20px;
    font-size:40px;
    color:#1890ff;
}
}
.container2{
    height:100%;
    border-radius:20px;
    // margin:20px 20px 20px 20px;
    // padding:20px;
     .title{
    font-size:40px;
    color:#1890ff;
    margin-bottom: 20px;
}
}
input{
     border: none;  
    -webkit-appearance: none;
     outline: none; 
     font-size:32px;
     color:#666;
}

.input-text{
    width: 80%;
    height: 60px;
    margin: auto;
    // text-align: center;
    display: block;
    border-bottom:1px #e5e5e5 solid;
}
input::-webkit-input-placeholder { 

    color: #ccc; 

}
.set{
    margin-top:50px;
}
.set2{
     margin-top:50px;
    // margin-top:100px;
    // position: relative;
}
.input-text2{
    width: 40%;
    height: 60px;
    text-align: center;
     border:1px #e5e5e5 solid;
}
.code{
     display: flex;
    margin-top: 50px;
    justify-content: space-around;
    align-items: center;
}
button{
  border: none;
background-color: transparent;
outline: none;    
}
.code-span{
  font-size:30px;
  color: #1890ff;
  position: absolute;
  display: inline-block;
  right: 15%;
  bottom: 150px;

}
 .captcha-button {
  display:none;
  font-size:30px;
  color: #1890ff;
  position: absolute;
  display: inline-block;
  right: 15%;
  bottom: 150px;
 }
.code-btn{
    width:200px;
    height:60px;
    background-color:#1890ff;
    border-radius:15px;
    color:#fff;
    font-size:30px;
    margin-left:50px;
    line-height:60px;
    text-align: center;
}
.setting{
   background-color: #ccc;
}
.submit-btn{
     width:80%;
    height:80px;
    background-color:#1890ff;
    border-radius:15px;
    color:#fff;
    line-height:80px;
    text-align: center;
    margin: auto;
    margin-top:50px;
     font-size:34px;
}


</style>