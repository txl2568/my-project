<template>
  <div>
    <div class="wx-container">
        <div class="wx-user">
            <img class="layui-circle" :src="headimgurl"  />
            <div>
                <p class="head-title" >{{nicknameName}}</p>
            </div>
        </div>
        <div class="wx-myRepair">
            <span @click="goMyRepair">我的报修</span>
            <span style="color:#ccc">|</span>
            <span @click="goMyRedEnvelope">我的红包</span>
        </div>
        <div class="wx-Repair" @click="goRepair">
            <div>
                <i class="iconfont icon-baoxiu"></i>
                <span class="icon-span">我要报修</span>
            </div>
             <i class="iconfont icon-right" style="font-size: 12px;"></i>
        </div>
        <div class="wx-owner" @click="goBind">
            <div>
                <i class="iconfont icon-zhanghu"></i>
                <span class="icon-span">绑定账户</span>
            </div>
            <i class="iconfont icon-right" style="font-size: 12px;"></i>
        </div>
        <div class="wx-owner" @click="goInstall">
            <div>
                <i class="iconfont icon-baoxiu"></i>
                <span class="icon-span">安装录入</span>
            </div>
            <i class="iconfont icon-right" style="font-size: 12px;"></i>
        </div>
    </div>
  </div>
</template>

<script>
import {selectWeChatUser, isNotWeChatUser} from '../api/user/user'

export default {
  data () {
    return {
        statusUrl:'/api/wechat/user/selectWeChatUser',
        data:[],
        headimgurl:'',
        nicknameName:'',
        flag:false
    }
  },
  created(){
      let token = this.$route.query.token
      console.log(1,window.location.href)
    //   console.log(1,window.location.href.split('&').pop())
      console.log(2,this.$route.query.status)
    //   this.$store.commit('token',this.token)
    //   console.log(this.$store.state.user.token)
     localStorage.setItem("token", token);
    //    this.isNotWeChatUser()
      this.selectWeChatUser()


     

  },
  methods:{
      goRepair(){
           this.$router.push({
              name:'repair'
           })
      },
      goBind(){
          this.$router.push({
              name:'owner'
          })
      },
      goInstall(){
          this.$router.push({
              name:'installEntryNotUser'
          })
      },
      selectWeChatUser(){
           selectWeChatUser().then(res=>{
                console.log('res',res)
                this.data = res.data.data;
                this.headimgurl = res.data.data.headimgurl?res.data.data.headimgurl:'';
                this.nicknameName = res.data.data.nicknameName?res.data.data.nicknameName:'';
            }).catch(error => {
                // alert(error)
            });
      },
      goMyRepair(){
           this.$router.push({
              name:'myRepair'
          })
      },
      goMyRedEnvelope(){
           this.$router.push({
              name:'myRedEnvelope'
          })
      },
      isNotWeChatUser(){
          isNotWeChatUser().then(res =>{
              if (res.data.data) {
                  sessionStorage.setItem('isNotWeChatUser',res.data.data)
                     this.$router.replace({
                            path: "home",
                            query:{
                                token: localStorage.getItem("token")
                            }
                    });
              }
            //   else{
            //        this.$router.replace({
            //                 path: "Index",
            //         });
            //   }
          })
      }


  }
}
</script>
<style lang="scss" scoped>
 @import "../common/css/iconfont.css";
 .iconfont {
    font-size: 40px;
    color:#999;
    }
.wx-container{
    margin:20px;
    .icon-span{
         margin-left:10px;
         font-size:33px;
    }
    .wx-user{
        background-color:#fff;
        height:300px;
        border-radius:10px;
        margin-bottom:20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .layui-circle{
            height: 150px; 
            width: 150px;
        }
        .head-title{
            text-align: center;
            font-size: 30px; 
            margin-top: 20%;
            font-weight: bold;
        }
    
    }
    .wx-myRepair{
        background-color:#fff;
        height:120px;
        border-radius:10px;
        display:flex;
        align-items: center;
        margin-bottom:20px;
        justify-content: space-between;
        padding:0 110px;
        span{
            font-size:33px;
        }

        
    }
    .wx-Repair{
        background-color:#fff;
        height:100px;
        border-radius:10px;
        display:flex;
        margin-bottom:20px;
        align-items: center;
        justify-content: space-between;
        padding:0 20px;
    }
    .wx-owner{
        background-color:#fff;
        height:100px;
        border-radius:10px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding:0 20px;
        margin-bottom:20px;
    }
}

</style>