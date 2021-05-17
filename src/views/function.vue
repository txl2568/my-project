<template>
  <div>
        <div class="container">
            <div class="icon">
                <i class="iconfont icon-left" @click="goBack"></i>
            </div>
            <div class="header">
                <div>
                    <img class="layui-circle header-img" :src="webchatUserinfo.headimgurl"  />
                </div>
                <span class="header-span">{{webchatUserinfo.deptIdName}}</span>
                <span class="header-span2">您好，{{webchatUserinfo.nicknameName}}</span>
            </div>
            <div class="model" v-for="(items,i) in jsonObject" :key="i">
                <div class="model-title">
                    <img  :src="url+items.icon" style="height: 17px; width: 17px;" />
                    <span>{{items.name}}</span>
                </div>
                <div class="model-content" >
                    <div class="module" v-for="(item,index) in items.seed" :key="index" @click="goItem(item)">
                        <img  :src="url+item.icon" style="height: 70px; width: 70px;" />
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {selectRoleIdAppMenu} from '../api/user/weChatMenu';
import {selectHomePage} from '../api/dataCover/dataCover';

export default {
  data () {
    return {
        url:'http://coverimage.oss-cn-hangzhou.aliyuncs.com/image/',
        jsonObject:[],
        webchatUserinfo:{}
    }
  },
  components: {
    // HelloWorld
  },
  created(){
      this.selectRoleIdAppMenu();
      this.selectHomePage();
  },
  mounted(){

  },
  methods:{
      goItem(item){
          this.$router.push({
              name: item.url
          })
        //   window.location.href = item.url
        //   if (item.status == 'ENABLE') {
              
        //   }
        //   if (item.status == 'ENABLE') {
              
        //   }
        //   if (item.status == 'ENABLE') {
              
        //   }
          

      },
      goBack(){
          this.$router.back();
      },
      selectRoleIdAppMenu(){
          selectRoleIdAppMenu().then(res =>{
              this.jsonObject = res.data.data.jsonObject
              if ( res.data.code == 500) {
                  alert(res.data.message)
              }
          }).catch(error => {
          });
      },
      selectHomePage(){
		selectHomePage().then(res =>{
			this.webchatUserinfo = res.data.data.webchatUserinfo
		}).catch(error => {
        });
	},

  }
}
</script>
<style lang="scss" scoped>
 .iconfont {
    font-size: 30px;
    }
.container{
    margin:20px;
    .icon{
        padding: 10px;
    }
    .header{
        background-color:#fff;
        border-radius:15px;
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-top:20px;
        height:230px;
        padding-bottom:20px;
        // position: relative;
        .header-img{
            margin-top: -50%;
            height: 140px; 
            width: 140px;
            // position: relative;
            // top: -30%;
        }
        .header-span{
            margin: 25px 0 15px 0;
            font-size: 35px;
            font-weight:bold;
        }
         .header-span2{
            font-size: 30px;
        }

    }
    .model{
        margin-top:20px;
        .model-title{
             margin:10px 0;
             display: flex;
             align-items: center;
             span{
                 margin-left:10px;
                 font-size: 30px;
                 font-weight: bold;
             }
        }
        .model-content{
            background-color:#fff;
            border-radius:15px;
            padding:20px;
            display: flex;
            flex-wrap: wrap;
             .module{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 10px;
            width: 31.5%;
            span{
                font-size: 28px;
                text-align: center;
            }
        }
 
        }
       
    }
   
  
}

</style>