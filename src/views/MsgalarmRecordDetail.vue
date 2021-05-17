<template>
  <div>
      <Header :data="msg"></Header>
      <div class="model">
          <p>事件详情</p>
          <div class="card">
              <div class="content">
                  <div>
                      <span class="p1">芯片编码：</span>
                      <span class="p2">{{dataEvent.deviceSn}}</span>
                  </div>
                  <div>
                      <span class="p1">事件类型：</span>
                      <span class="p2">{{dataEvent.eventCodeName}}</span>
                  </div>
                   <div>
                      <span class="p1">是否推送：</span>
                      <span class="p2">{{dataEvent.isPushName}}</span>
                   </div>
                   <div>
                      <span class="p1">送达状态：</span>
                      <span class="p2">{{dataEvent.pushResName}}</span>
                   </div>
                   <div>
                      <span class="p1">系统时间：</span>
                      <span class="p2">{{createTime1}}</span>
                   </div>
                   <div style="display:flex;align-items: center;justify-content: space-between;" @click="detailFn">
                        <span class="p1">事件数据：</span>
                        <i class="iconfont icon-left" ref="iconleft" ></i>
                    </div>
                    <!-- <pre style="display:none" ref="eventbody">
                        {{eventBody}}
                    </pre> -->
                    <textarea placeholder="无数据" disabled="disabled"  style="display:none" ref="eventbody" class="textarea" v-model="eventBody">
                    </textarea>
              </div>
          </div>
       </div>
       <div class="model">
          <p>推送详情</p>
          <div class="card">
              <div class="content">
                  <div>
                      <span class="p1">井盖编码：</span>
                      <span class="p2">{{dataPush.deviceMcn}}</span>
                  </div>
                  <div>
                      <span class="p1">推送事件：</span>
                      <span class="p2">{{dataPush.eventCode}}</span>
                  </div>
                   <div>
                      <span class="p1">推送结果：</span>
                      <span class="p2">{{dataPush.pushResultMsg}}</span>
                   </div>
                   <div>
                      <span class="p1">系统时间：</span>
                      <span class="p2">{{createTime2}}</span>
                   </div>
                   <div style="display:flex;align-items: center;justify-content: space-between;" @click="detailFn2">
                        <span class="p1">推送数据：</span>
                        <i class="iconfont icon-left" ref="iconleft2" ></i>
                        <!-- <span>{{dataPush.pushBody}}</span> -->
                    </div>
                    <textarea placeholder="无数据" disabled="disabled"  style="display:none" ref="pushBody" class="textarea" v-model="pushBody">
                    </textarea>
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
      
 
  </div>
</template>

<script>
import Header from '../components/Header2';
import wx from 'weixin-js-sdk';
import {jsValid, transform} from '../api/user/wechat';
import { selectSysEventDetail } from '../api/user/function';
import { mapState } from 'vuex';
import weui from 'weui.js';
import 'weui';

export default {
    data(){
        return{
            msg:'告警记录详情',
            data:{},
            dataEvent:{},
            dataPush:{},
            uuid: this.$route.params.uuid,
            // reportState:'',
            url: window.location.href,
            IsReportTab:0,
            IsTab:0,
            message:'',
            eventBody:'',
            pushBody:'',
            Time1:'',
            Time2:''

        }
    },
    components: {
        Header
    },
    computed:{
        createTime1(){
            return this.getMyDate(this.Time1)
        },
        createTime2(){
            return this.getMyDate(this.Time2)
        }
    },
    watch:{
        id:{
           handler(newVal, oldVal) {
               if (newVal) { 
                   this.id = newVal
               }
           }
        },
   
    },
    created(){
       
        this.selectSysEventDetail()
          
    },
    methods:{
        selectSysEventDetail(){
            var sysEventParam ={
                'uuid': this.uuid
            }
            selectSysEventDetail(sysEventParam).then(res =>{
                console.log(res.data.code);
                if (res.data.code == 200) {
                    this.data = JSON.parse(res.data.data) ;
                    console.log(this.data);
                    this.dataEvent = this.data.dataEvent;
                    this.dataPush = this.data.dataPush;
                    this.eventBody = JSON.stringify(JSON.parse(this.dataEvent.eventBody), null, 4);
                    this.pushBody = JSON.stringify(JSON.parse(this.dataPush.pushBody), null, 4);
                    this.Time1 = this.dataEvent.createTime;
                    this.Time2 = this.dataPush.createTime;
                }
                if (res.data.code == 500) {
                    this.message = res.data.message;
                    this.$refs.iosDialog2.style.display = 'block';
                }
               
            }).catch(error =>{
                alert(error)
            })

        },
        confirm2(){
            this.$refs.iosDialog2.style.display = 'none';
            this.$router.back()
        },
        detailFn(){
            if (this.$refs.eventbody.style.display == 'block') {
                this.$refs.eventbody.style.display = 'none';
                this.$refs.iconleft.style.transform = 'rotate(-90deg)'
            }else{
                this.$refs.eventbody.style.display = 'block';
                this.$refs.iconleft.style.transform = 'rotate(90deg)'
            }

        },
        detailFn2(){
            if (this.$refs.pushBody.style.display == 'block') {
                this.$refs.pushBody.style.display = 'none';
                this.$refs.iconleft2.style.transform = 'rotate(-90deg)'
            }else{
                this.$refs.pushBody.style.display = 'block';
                this.$refs.iconleft2.style.transform = 'rotate(90deg)'
            }
        },
        //时间锉转时间
        getMyDate(str) {
            console.log(JSON.stringify(str));
            var oDate = new Date(str * 1000);

            if(JSON.stringify(str).length == 13){
                oDate = new Date(str);
            }

            var oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds(),
                oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen);//最后拼接时间
            return oTime;
        },
        //补0操作
        getzf(num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        }


    
      
    
        

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

.icon-left{
    transform: rotate(-90deg);
    display: inline-block;
}

.model{
    background-color: #fff;
    margin-bottom: 15px;
    padding: 20px 0;
    p{
        font-size: 30px;
        padding: 15px 0 15px 20px;
        border-bottom: 1px #e5e5e5 solid;
        // margin-bottom: 20px;
    }
    .model-img{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        img{
            width: 48%;
            height: 200px;
            margin: 5px 0;
        }
    }
    .card{
        .content{
            padding: 20px;
            &>div{
                font-size: 28px;
                padding: 10px 0;
                color: #666;
                border-bottom: #e5e5e5 1px solid;
            }
            .p1{
                color: #666;
            }
            .p2{
                color: #999;
            }
        }
    }
    .textarea{
        height: 550px;
        width: 100%;
        background-color: transparent;
        border-top: none !important;
        border: #e5e5e5 1px solid;
        font-size: 28px;
        // margin-top: 5px;
    }
}
.setting-btn{
    display: flex;
    justify-content: center;
}
 .search-btn2{
        // border: 1px #ccc solid;
        text-align: center;
        width: 30%;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
        background-color: #cccccc;
        color: #fff;
        margin-left: 10px;
        font-size: 30px;
        display: block;
        // margin: auto;
        margin: 30px auto;
        
    }
    .search-btn{
        // border: 1px #ccc solid;
        text-align: center;
        width: 30%;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
        background-color: #1890ff;
        color: #fff;
        margin-left: 10px;
        font-size: 30px;
        display: block;
        // margin: auto;
        margin: 30px auto;
        
    }
    button{
    border: none;
    background-color: transparent;
    outline: none;  
}
</style>