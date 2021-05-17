<template>
  <div>

  </div>
</template>

<script>
import {selectWeChatUser, isNotWeChatUser} from '../api/user/user'

export default {
  data () {
    return {
        statusUrl:'/api/wechat/user/selectWeChatUser',
        data:[]
        // headimgurl:'',
        // nicknameName:''
    }
  },
  components: {
    // HelloWorld
  },
  beforeRouteEnter(to, from, next) {
       next(vm => {
            isNotWeChatUser().then(res =>{
                if (vm.$route.query.status == 1) {
                    if (res.data.data) {
                        sessionStorage.setItem('isNotWeChatUser',res.data.data)
                            vm.$router.replace({
                                    path: "home",
                                    query:{
                                        token: localStorage.getItem("token")
                                    }
                            });
                    }
                   else{
                        vm.$router.replace({
                                    path: "isNotWeChatUser",
                                    query:{
                                        token: localStorage.getItem("token")
                                    }
                            });

                    }
                }
                if (vm.$route.query.status == 2) {
                    vm.$router.replace({
                            name:'repair',
                            query:{
                                token: localStorage.getItem("token")
                            }
                    });
                }
            })
        })
       
  },
  created(){
        let token = this.$route.query.token;
        localStorage.setItem("token", token);
        sessionStorage.setItem('Url', window.location.href);
        this.selectWeChatUser()
        console.log(this.$route.query.token, this.$route.query.status);
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
      selectWeChatUser(){
           selectWeChatUser().then(res=>{
                console.log('res',res)
                this.data = res.data.data
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
    }
}

</style>