<template>
    <div>
       <Header :data="msg"></Header>
       <span class="title">请选择报修类型</span>
       <div class="container">
           <div class="setting column" @click="goLwjg">
                <img class="layui-circle" src="../assets/images/icon_bx_lwjg.png" style="height: 70px; width: 70px;" />
                <p>路网井盖</p>
           </div>
            <div class="setting column numbers" @click="goZmzs">
                <img class="layui-circle"  src="../assets/images/icon_bx_zmzs.png" style="height: 70px; width: 70px;" />
                <p>照明指示</p>
           </div>
            <div class="setting column" @click="goTxza">
                <img class="layui-circle" src="../assets/images/icon_bx_txza.png" style="height: 70px; width: 70px;" />
                <p>通行障碍</p>
           </div>
            <div class="setting column numbers" @click="goHwss">
                <img class="layui-circle"  src="../assets/images/icon_bx_hwss.png" style="height: 70px; width: 70px;" />
                <p>环卫设施</p>
           </div>
            <div class="setting column numbers2" @click="goQtbx">
                <img class="layui-circle"  src="../assets/images/icon_bx_qtlx.png" style="height: 70px; width: 70px;" />
                <p>其他报修</p>
           </div>
       </div>
    </div>
</template>

<script>
import Header from '../components/Header';
export default {
    data(){
        return{
            msg:'报修上报',
            flag:false,
        }
    },
    components: {
        Header
    },
    beforeRouteLeave(to, from, next){
        if(to.name == "photoUpload"){
        this.$router.push({
            name:"IsNotWeChatUser",
             query:{
                token: localStorage.getItem("token")
            }
            });
        }else{
        next();
        }
    },
    methods:{
        goLwjg(){
            this.$router.push({
                path:'myOfReport'
            })
        },
        goZmzs(){
            this.$router.push({
                name:'sendThePosition',
                params:{
                    coverMcn:'LIGHTING',
                }
            })
            sessionStorage.setItem("coverMcn",'LIGHTING')
        },
        goTxza(){
             this.$router.push({
                name:'sendThePosition',
                params:{
                    coverMcn:'BARRIER'
                }
            })
             sessionStorage.setItem("coverMcn",'BARRIER')
        },
        goHwss(){
             this.$router.push({
                name:'sendThePosition',
                params:{
                    coverMcn:'SANITATION'
                }
            })
            sessionStorage.setItem("coverMcn",'SANITATION')
        },
        goQtbx(){
            this.$router.push({
                name:'sendThePosition',
                params:{
                    coverMcn:'RESTS'
                }
            })
            sessionStorage.setItem("coverMcn",'RESTS')
        }
    }
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 40px;
    margin-top: 80px;
    text-align: center;
    display: block;
    color: rgba(70, 70, 70, 0.88);

}
.container{
      background-color:#fff;
        border-radius:15px;
        height: 100%;
        margin-top: 50px;
         border: 1px solid gainsboro;
        // border: 1px #ccc solid;
        margin: 30px 20px 20px 20px;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        .setting{
            border: 1px solid gainsboro;
             width: 49.7%;
              border-top: none;
               border-left: none;
               padding: 15px 0;
            p{
                text-align: center;
                font-size: 30px;
            }
        }
        .column {
            display: flex;
            flex-direction: column;
             img {
                height: 60px;
                width: 60px;
                margin: 0 auto;
            }
        }
           .numbers {
            border-right: none;
            
        }
        .numbers2{
             border-bottom: none;
        }
}
</style>
