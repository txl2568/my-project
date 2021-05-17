<template>
  <div>
      <Header :data="msg"></Header>
      <Search ref="list2" @selectDataCoverMcn="selectDataCoverMcn" style="margin-top:38px"></Search>
       <BaseContainer @reachBottom="reachBottom" :isLoading="isLoading" >
        <!-- <List :BindingLogList="list" :noData4="noData" style="margin-top:-38px"></List> -->
         <div class="list" >
            <div class="card" v-for="(item,i) in list" :key="i" >
                <!-- <div class="card-title">
                    <span>{{item.logMcn?item.logMcn:'无编码'}}</span>
                    <span>{{item.repairStateName}}</span>
                </div> -->
                <div class="content">
                    <div>
                        <span>MCN：</span>
                        <span>{{item.logMcn}}</span>
                    </div>
                <div>
                        <span>SN码：</span>
                        <span>{{item.logSn}}</span>
                    </div>
                    <div>
                        <span>指令：</span>
                        <span>{{item.logInstruct}}</span>
                    </div>
                    <div>
                        <span>替换：</span>
                        <span>{{item.isReplace}}</span>
                    </div>
                    <div>
                        <span>时间：</span>
                        <span>{{item.createTime}}</span>
                    </div>
                </div>
            </div>

                <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line" v-show="!list || noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
        </div>
      </BaseContainer>
  </div>
</template>

<script>
import Header from '../components/Header';
import Search from '../components/Search';
import { selectBingdingLog } from "../api/user/function";
import BaseContainer from '../components/BaseContainer';
import List from '../components/List';
import { selectDataCoverMcn } from "../api/user/wechat";
import MsgBindingLog from '@/mixins/MsgBindingLog';

export default {
   mixins: [MsgBindingLog(selectBingdingLog, 'pool')],
  data(){
    return{
      msg:'绑定日志',
      pages:{
        limit:10,
        page:1
      },
      noData:false
    }
  },
  components:{
      Header,
      Search,
      BaseContainer,
      List
  },
  created(){
    // this.selectBingdingLog()
  },
  methods:{
    selectDataCoverMcn(logMcn){
      //  selectDataCoverMcn(this.$refs.list2.mcn).then(res =>{
      //       console.log(res);
      //       if (res.data.code == 200) {
      //               this.list = res.data.data.data
      //       }
      //       if (res.data.code == 500) {
      //           this.list = []
      //           this.noData  = true
      //           alert(res.data.message)
      //       }
            
      //   }).catch(error =>{
      //         console.log(error);
      //   })
       var param = {
         'logMcn':logMcn
       }
      selectBingdingLog(this.pages.limit, this.pages.page, param ).then(res =>{
        console.log(res.data.data);
        this.list = res.data.data.data;
        if (res.data.data.code == 0) {
            this.noData = true
        }
        console.log( this.noData);

        // if (typeof(res.data.data) == object && Object.keys(res.data.data).length == 0) {
        //   this.noData = true
        // }
        // if (Object.keys(res.data.data).length = 0) {
        //   this.noData = true
        // }
      })
    },
    // selectBingdingLog(){
    //   var param = {}
    //   selectBingdingLog(this.pages.limit, this.pages.page, param ).then(res =>{
    //     console.log(res);
    //     this.list = res.data.data
    //     if (!res.data.data) {
    //       this.noData = true
    //     }
    //   })
      
    // }
  }
}
</script>

<style lang="scss" scoped>
.list{
    padding:0 20px;
    margin-top: 230px;
    height: 75vh;
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
            height: 80px;
            span{
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
            }
            
        }
    }

}
</style>