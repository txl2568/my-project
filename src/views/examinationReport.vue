<template>
  <div>
      <Header :data="msg"></Header>
      <Tab :value.sync="index" :tabList="tabList" @goOther="goOther"></Tab>
      <Search ref="list" @selectDataCoverMcn="selectDataCoverMcn"></Search>
      <!-- <TodayBasic :obj="obj" @goNot="goNot" @goAlready="goAlready" @goOther="goOther" @selectDataCoverMcn="selectDataCoverMcn" ref="list"></TodayBasic> -->
      <BaseContainer @reachBottom="reachBottom" :isLoading="isLoading" >
      <!-- <List :dataList="list" :noData1="noData"></List> -->
      <div class="list" v-if="code == 0">
            <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail(item)" v-show="item.reportStateName == '待确认'">
                <!-- <div> -->
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span >{{ item.reportStateName}}</span>
                    </div>
                    <div class="content">
                        <div>
                            <span>报修类别：</span>
                            <span>{{item.reportTypeCauseName}}</span>
                        </div>
                        <div>
                            <span>业主单位：</span>
                            <span>{{item.deptIdName}}</span>
                        </div>
                        <div>
                            <span>报修用户：</span>
                            <span v-if="item.reportChannelNo == 0">{{item.reportOpenIdName}}</span>
                            <span v-else>{{item.reportUserName}}</span>
                        </div>
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>报修原因：</span>
                            <span>{{item.reportCause}}</span>
                        </div>
                        <div>
                            <span>报修地址：</span>
                            <span>{{item.reportAddr}}</span>
                        </div>
                    </div>
                <!-- </div> -->
            </div>

                <!-- !dataList && dataList.length===0 -->
            <div class="weui-loadmore weui-loadmore_line" style="margin-top:50px;display:none" v-show="!list  || noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
      </div>
      <div class="list" v-if="code == 1">
            <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail(item)"  v-show="item.reportStateName == '通过'">
                <!-- <div> -->
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span >{{ item.reportStateName}}</span>
                        <!-- <span v-if="code == 0 && item.reportStateName == '待确认'">{{ item.reportStateName}}</span>
                        <span v-if="code == 1 && item.reportStateName == '通过'">{{ item.reportStateName}}</span>
                        <span v-if="code == 2 && item.reportStateName == '未通过'">{{ item.reportStateName}}</span> -->
                    </div>
                    <div class="content">
                        <div>
                            <span>报修类别：</span>
                            <span>{{item.reportTypeCauseName}}</span>
                        </div>
                        <div>
                            <span>业主单位：</span>
                            <span>{{item.deptIdName}}</span>
                        </div>
                        <div>
                            <span>报修用户：</span>
                            <span v-if="item.reportChannelNo == 0">{{item.reportOpenIdName}}</span>
                            <span v-else>{{item.reportUserName}}</span>
                        </div>
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>报修原因：</span>
                            <span>{{item.reportCause}}</span>
                        </div>
                        <div>
                            <span>报修地址：</span>
                            <span>{{item.reportAddr}}</span>
                        </div>
                    </div>
                <!-- </div> -->
            </div>

                <!-- !dataList && dataList.length===0 -->
            <div class="weui-loadmore weui-loadmore_line" style="margin-top:50px;display:none" v-show="!list  || noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
      </div>
       <div class="list" v-if="code == 2">
            <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail(item)"  v-show="item.reportStateName == '未通过'">
                <!-- <div> -->
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span >{{ item.reportStateName}}</span>
                        <!-- <span v-if="code == 0 && item.reportStateName == '待确认'">{{ item.reportStateName}}</span>
                        <span v-if="code == 1 && item.reportStateName == '通过'">{{ item.reportStateName}}</span>
                        <span v-if="code == 2 && item.reportStateName == '未通过'">{{ item.reportStateName}}</span> -->
                    </div>
                    <div class="content">
                        <div>
                            <span>报修类别：</span>
                            <span>{{item.reportTypeCauseName}}</span>
                        </div>
                        <div>
                            <span>业主单位：</span>
                            <span>{{item.deptIdName}}</span>
                        </div>
                        <div>
                            <span>报修用户：</span>
                            <span v-if="item.reportChannelNo == 0">{{item.reportOpenIdName}}</span>
                            <span v-else>{{item.reportUserName}}</span>
                        </div>
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>报修原因：</span>
                            <span>{{item.reportCause}}</span>
                        </div>
                        <div>
                            <span>报修地址：</span>
                            <span>{{item.reportAddr}}</span>
                        </div>
                    </div>
                <!-- </div> -->
            </div>

                <!-- !dataList && dataList.length===0 -->
            <div class="weui-loadmore weui-loadmore_line" style="margin-top:50px;display:none" v-show="!list  || noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
      </div>
      </BaseContainer>
  </div>
</template>

<script>
import Header from '../components/Header';
import TodayBasic from '../components/TodayBasic';
import List from '../components/List';
import { userReportList } from '../api/user/function';
import { selectDataCoverMcn } from "../api/user/wechat";
import repaireMixins from '@/mixins/repaireMixins';
import BaseContainer from '../components/BaseContainer';
import Tab from '../components/Tab';
import Search from '../components/Search';

export default {
    mixins: [repaireMixins(userReportList, 'pool')],
    data(){
        return{
           msg:'报修审批',
           obj:{
               msg1:'未审核',
               msg2:'已通过',
               msg3:'未通过'
           },
           tab:1,
           pages:{
               page:1,
               limit:3
           },
           list:[],
           code:0,
           index:0,
           tabList: ['未审核','已通过','未通过'],
           noData:false
           
        }
    },
    components:{
        Header,
        TodayBasic,
        List,
        BaseContainer,
        Tab,
        Search
    },
    created(){
        // this.userReportList(this.code)
    },
    methods:{
         goDetail(item){ // 报修
            this.$router.push({
                name:'examinationReportDetail',
                params:{
                    isReport: true,
                    reportId: item.reportId,
                    reportState: item.reportState,
                },
                 query:{
                    tab:this.code
                }
            })
            sessionStorage.setItem('reportId',item.reportId)
        },
        goOther(code){
            this.code = code;
            // this.$store.commit('ISREPORTTAB', code)
            this.selectDataCoverMcn()
            
        },
        selectDataCoverMcn(mcn){
            // this.userReportList(mcn)
              var userReport={
                'reportState':this.code,
                'coverMcn':mcn
            }
            userReportList(this.pages.limit, this.pages.page, userReport).then(res =>{
                console.log(res);
                this.list = res.data.data.data
                if (res.data.data.code == 0) {
                    this.noData = true
                }
                console.log(this.noData);
                
                
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.setting{
    display: none;
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