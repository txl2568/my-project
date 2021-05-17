<template>
  <div style="height:100%;overflow: hidden;">
      <Header :data="msg"></Header>
      <Search @selectDataCoverMcn="selectDataCoverMcn" ></Search>

      <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
       <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list" v-show="list">
            <div class="card" v-for="(item,i) in list" :key="i">
                <div class="card-title">
                    <span v-if="item.deptName">{{item.deptName}}</span>
                    <span v-else>无业主单位</span>
                    <span style="color:red" v-if="item.alarmTag == 1">已推送</span>
                </div>
                <div class="content">
                    <div>
                        <span class="content-title">MCN码：</span>
                        <span>{{item.coverMcn}}</span>
                    </div>
                    <div>
                        <span class="content-title">芯片编码：</span>
                        <span>{{item.deviceSn}}</span>
                    </div>
                    <div>
                        <span class="content-title">统计日期：</span>
                        <span>{{item.dateTime}}</span>
                    </div>
                    <div>
                        <span class="content-title">上报次数：</span>
                        <span>{{item.num}}</span>
                    </div>
                </div>
            </div>

                <!-- <div >没有更多</div> -->
            <!-- <div class="weui-loadmore weui-loadmore_line" v-show="!list || chipsetNoData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div> -->
        </div>
         </van-list>
         <!-- </van-pull-refresh> -->


       <div ref="loadingToast" style="display: none;">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <span class="weui-primary-loading weui-primary-loading_transparent weui-icon_toast">
                <span class="weui-primary-loading__dot"></span>
                </span>
                <p class="weui-toast__content">查询中</p>
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
import Header from '../components/Header';
import Search from '../components/Search2';
import BaseContainer from '../components/BaseContainer';
import { dataEventStatisticsList } from "../api/user/function";
import MsgAbnormalChipset from '@/mixins/MsgAbnormalChipset';
import weui from 'weui.js';
import 'weui';

export default {
    mixins: [MsgAbnormalChipset(dataEventStatisticsList, 'pool')],
    data(){
        return{
            msg:'异常终端',
            chipsetNoData:false,
            pages:{
               page:1,
               limit:30
            },
            message:'',
             loading: false,
             finished: false,
             refreshing: false,
            // list:[
            //     {
            //         deptName:'福州电力',
            //         coverMcn:'AF0558',
            //         eventSn:'81410A0390',
            //         dateTime:'2020-02-02',
            //         num:410
            //     },
            //     {
            //         deptName:'福州电力2',
            //         coverMcn:'AF0558',
            //         eventSn:'81410A0390',
            //         dateTime:'2020-02-22',
            //         num:412
            //     }
            // ]
        }
    },
    components: {
        Header,
        Search,
        BaseContainer,
    
    },
    created(){
        console.log('========',this.pages.page);
    },
    methods:{
        selectDataCoverMcn(snOrMcn){
            this.$refs.loadingToast.style.display = 'block';
            if (snOrMcn) {
                this.pages.page = 1
                 var sysEventParam= snOrMcn
                 this.list =[]
                 this.getList(sysEventParam)
                 
            }else{
                 this.pages.page = 1
                var sysEventParam = null
                 this.list =[]
                this.getList(sysEventParam)
               
                
            }
         
        },
        getList(sysEventParam){
   
            dataEventStatisticsList(this.pages.limit, this.pages.page, sysEventParam).then(res =>{
                this.$refs.loadingToast.style.display = 'none';
                if (res.data.code == 200) {
                        this.list = res.data.data.data
                        if (res.data.data.data.length == 0) {
                             this.chipsetNoData = true
                        }
                }else{
                    this.message = res.data.data.msg
                    this.$refs.iosDialog2.style.display = 'block';
                }
                
            }).catch(error =>{
                alert(error)
            })
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad2();
        },
        onLoad2(){
            // if (this.refreshing) {
            //     this.list = [];
            //     this.refreshing = false;
            // }
             dataEventStatisticsList(this.pages.limit, this.pages.page, null).then(res =>{
                this.$refs.loadingToast.style.display = 'none';
                if (res.data.code == 200) {
                        this.list = res.data.data.data
                        if (res.data.data.data.length == 0) {
                             this.chipsetNoData = true
                        }
                }else{
                    this.message = res.data.data.msg
                    this.$refs.iosDialog2.style.display = 'block';
                }
                
            }).catch(error =>{
                alert(error)
            })
        },
         confirm2(){
            this.$refs.iosDialog2.style.display = 'none';
        },
    }
}
</script>

<style>
.van-list__error-text, .van-list__finished-text, .van-list__loading{
    font-size: 28px !important;
}
.van-loading__text{
     font-size: 25px !important;
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
.weui-toast__content{
    font-size: 33px;
}
.weui-toast{
    top: 50%;
    width: 200px;
    height: 200px;
}
.weui-loadmore__tips{
    font-size: 30px;
}
.weui-loadmore_line .weui-loadmore__tips {
    background-color: #ececec;
}

.list{
    padding:0 20px;
    margin-top: 200px;
    // height: 100%;
    // height: 80vh;
    overflow-y: scroll;
    .card{
        background-color: #fff;
        width: 95%;
        // height: 100%;
        padding: 20px;
        margin-bottom: 25px;
        border-radius: 15px;
        .card-title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px  #e5e5e5 solid;
            height: 50px;
            span{
                display: inline-block;
                line-height: 50px;
                font-size: 29px;
            }
        }
        .content{
            div{
                margin-top: 5px;
                span{
                    font-size: 28px;
                    color: #666;
                }
                .p2{
                    padding-left: 10px;
                }
            }
            
        }
        .content-title{
            width: 140px;
            text-align: justify;
            text-align-last: justify;
            display: inline-block;
        }
    }

}
</style>