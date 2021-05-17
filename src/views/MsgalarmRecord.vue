<template>
  <div>
      <Header :data="msg"></Header>
      <Tab :value.sync="index" :tabList="tabList" @goOther="goOther"></Tab>
      <Search ref="list2" @selectDataCoverMcn="selectDataCoverMcn"></Search>
      <BaseContainer @reachBottom="reachBottom" :isLoading="isLoading" >
        <!-- <List :MsgalarmRecordList="list" :noData3="noData"></List> -->
        <div class="list" v-show="list">
            <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail1(item)">
                <div class="card-title">
                    <span>{{item.eventName}}</span>
                    <span @click.stop="goInside(item)" :class=" item.eventStatusName == '待处理'?'over':item.eventStatusName == '已接单'?'lower':'other' ">
                        <i class="iconfont icon-gantanhao1 over" v-if="item.eventStatusName == '待处理'"></i>
                        <i class="iconfont icon-gantanhao lower" v-if="item.eventStatusName == '已接单'"></i>
                        <i class="iconfont icon-chenggong other" v-if="item.eventStatusName == '已处理'"></i>
                        {{item.eventStatusName == '待处理'?'接警': item.eventStatusName == '已接单'?'待处理':'已处理'}}</span>
                </div>
                <div class="content">
                    <div>
                        <span>MCN码：</span>
                        <span>{{item.coverMcn}}</span>
                    </div>
                    <div>
                        <span>芯片编码：</span>
                        <span>{{item.eventSn}}</span>
                    </div>
                    <div>
                        <span>告警类型：</span>
                        <span>{{item.eventType}}</span>
                    </div>
                    <div>
                        <span>业主单位：</span>
                        <span>{{item.deptName}}</span>
                    </div>
                    <div>
                        <span>告警时间：</span>
                        <span>{{item.eventTime}}</span>
                    </div>
                </div>
            </div>

                <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line" v-show="!list || noData3">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
        </div>
      </BaseContainer>

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
import Tab from '../components/Tab';
import Search from '../components/Search';
import { sysEventList, updateStateByMcn } from "../api/user/function";
import MsgalarmRecord from '@/mixins/MsgalarmRecord';
import BaseContainer from '../components/BaseContainer';
import List from '../components/List';
import { selectDataCoverMcn } from "../api/user/wechat";
import weui from 'weui.js';
import 'weui';

export default {
    mixins: [MsgalarmRecord(sysEventList, 'pool')],
    data(){
        return{
            msg:'告警记录',
            index:0,
            tabList: ['未处理','处理中','已处理'],
            code:0,
            pages:{
               page:1,
               limit:3
           },
           isReplace: 'no',
           coverMcn:'',
           eventType:'',
           uuid:'',
           message:'',
           noData3:''
        }
    },
    components:{
        Header,
        Tab,
        Search,
        BaseContainer,
        List

    },
    created(){
        // this.sysEventList(this.code)
    },
    methods:{
        goDetail1(item){ //告警
            if (!item.uuid) {
                this.message = '没有事件记录';
                this.$refs.iosDialog2.style.display = 'block';
            }else{
                this.$router.push({
                    name:'MsgalarmRecordDetail',
                    params:{
                        isRecord:true,
                        uuid:item.uuid,
                        tab:this.isTab
                    }
                })
            }
           
        },
        goOther(code){
            this.code = code;
            this.selectDataCoverMcn()
        },
        selectDataCoverMcn(mcn){
            var sysEventParam={
                'eventStatus':this.code,
                'coverMcn':mcn
            }
            sysEventList(this.pages.limit, this.pages.page, sysEventParam).then(res =>{
                if (res.data.code == 200) {
                        this.list = res.data.data.data
                }
                 if (!res.data.data) {
                    this.noData = true
                }
            }).catch(error =>{
                alert(error)
            })
        },
        goInside(item){
            console.log('item',item);
            this.coverMcn = item.coverMcn;
            this.eventType = item.eventType;
            this.uuid = item.uuid;
            
            if (item.eventStatusName == '待处理') {
                if (item.uuid && item.uuid.length>0) {
                    this.message = '是否进行接警？';
                    this.$refs.iosDialog.style.display = 'block';
                }else{
                    this.message = 'uuid为空，无法接警！';
                    this.$refs.iosDialog2.style.display = 'block';
                }
            }
             if (item.eventStatusName == '已接单') {
                if (!item.uuid) {
                    this.message = 'uuid为空，无法接警！';
                    this.$refs.iosDialog2.style.display = 'block';
                }
            }
           
        },
        cancel(){
             this.$refs.iosDialog.style.display = 'none';
        },
        confirm(){
            this.isReplace = 'yes';
            this.$refs.iosDialog.style.display = 'none';
            this.updateStateByMcn()
        },
        confirm2(){
            this.$refs.iosDialog2.style.display = 'none';
        },
        updateStateByMcn(){
            if (this.uuid) {
                updateStateByMcn(this.coverMcn, this.eventType, this.uuid).then(res =>{
                    if (res.data.code == 200) {
                        this.message = '接警成功！';
                        this.$refs.iosDialog2.style.display = 'block';
                        this.selectDataCoverMcn()
                    }else{
                        this.message = res.data.message;
                        this.$refs.iosDialog2.style.display = 'block';
                    }
                })
            }
           
        },
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

.list{
    padding:0 20px;
    margin-top: 300px;
    // height: 1100px;
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
                .p2{
                    padding-left: 10px;
                }
            }
            
        }
    }

}
</style>