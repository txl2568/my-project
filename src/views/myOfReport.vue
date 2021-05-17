<template>
  <div>
    <Header :data="msg"></Header>
    <div class="container">
       <h2>MCN码</h2>
       <input type="text" class="input-mcn"  placeholder="请输入MCN码" v-model="mcn">
       <div class="mcn_next" @click="goMcnNext"></div>
       <div class="no_mcn" @click="goNoMcn"></div>
       <!-- <img class="mcn_next" src="../assets/images/icon_btn_mcn_next.png" alt="">
       <img class="no_mcn" src="../assets/images/icon_btn_no_mcn.png" alt=""> -->
    </div>
  </div>
</template>

<script>
import Header from '../components/Header2';
import {selectDataCoverMcn} from '../api/user/wechat';

export default {
  data(){
    return{
      msg:'报修有奖',
      mcn:''
    }
  },
  components: {
        Header
  },
  // beforeRouteEnter(to, from, next) {
  //      next(vm => {
  //        if (condition) {
           
  //        }
  //      })
  // },
  methods:{
    goMcnNext(){
      if (!this.mcn) {
        alert('MCN码不允许为空')
      }
      else{
          selectDataCoverMcn(this.mcn).then(res =>{
            console.log(res);
            if (res.data.code == 200) {
                this.$router.replace({
                  name:'sendThePosition',
                  params:{
                      coverMcn: this.mcn,
                  }
                })
                sessionStorage.setItem("coverMcn", this.mcn)
            }
            if (res.data.code == 500) {
              alert(res.data.message)
            }
          
          })
        
      }
     
    },
    goNoMcn(){
      this.$router.replace({
        name:'sendThePosition',
        params:{
            coverMcn:'NOMCN',
        }
      })
      sessionStorage.setItem("coverMcn", 'NOMCN')
    },
    // selectDataCoverMcn(){
    //   selectDataCoverMcn(this.mcn).then(res =>{
    //     this.$router.push({
    //       name:'sendThePosition',
    //       params:{
    //           coverMcn: this.mcn,
    //       }
    //     })
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.container{
   background-image: url("../assets/images/icon_mcn_bg.png");
    background-repeat: no-repeat;
    /* background-size:300px 400px; */
    background-size: 90%  100%;
    text-align: center;
    height: 700px;
    background-position:center;
    margin-top: 50px;
    // position: relative;
    // top: 200px;
    h2{
      padding-top: 50px;
      color: #4BB2FF;
      font-weight: bold;
    }
    .input-mcn{
     width: 60%;
    height: 60px;
    margin: auto;
    text-align: center;
    display: block;
    border:2px #e5e5e5 solid;
    border-radius: 50px;
    margin-top: 40px;
    }
    .mcn_next{
      background-image: url("../assets/images/icon_btn_mcn_next.png");
      background-repeat: no-repeat;
      background-size: 60%  100%;
      text-align: center;
      height: 80px;
      background-position:center;
      margin-top: 120px;
    }
    .no_mcn{
       background-image: url("../assets/images/icon_btn_no_mcn.png");
      background-repeat: no-repeat;
      background-size: 60%  100%;
      text-align: center;
      height: 80px;
      background-position:center;
      margin-top: 70px;
    }
}
input{
     border: none;  
     outline: none; 
     font-size:32px;
     color:#666;
}
</style>