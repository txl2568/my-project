<template>
  <div>
      <Header :data="msg"></Header>
      <Tab ref="tab" :value.sync="index" :tabList="tabList" @goOther="goOther"></Tab>
      <Search ref="list2" @selectDataCoverMcn="selectDataCoverMcn"></Search>
      <!-- <TodayBasic :obj="obj"  @goNot="goNot" @goAlready="goAlready" @goOther="goOther" @selectDataCoverMcn="selectDataCoverMcn" ref="list"></TodayBasic> -->
      <BaseContainer @reachBottom="reachBottom" :isLoading="isLoading" >
        <!-- <List :MaintenList="list" :noData2="noData"></List> -->
         <div class="list" v-if="code == 0">
            <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail2(item)" v-show="item.repairStateName == '未维修'">
                <div class="card-title">
                    <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                    <span>{{item.repairStateName}}</span>
                </div>
                <div class="content">
                    <div>
                        <span>业主单位：</span>
                        <span>{{item.deptIdName}}</span>
                    </div>
                    <div>
                        <span>报修类型：</span>
                        <span>{{item.repairTypeName}}</span>
                    </div>
                    <!-- 0 -->
                    <div v-show="code == 0">
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>确认用户：</span>
                            <span v-if="item.check_channel_no == 0">{{item.checkOpenIdName}}</span>
                            <span v-else>{{item.check_user_name}}</span> 
                        </div>
                        <div>
                            <span>确认时间：</span>
                            <span>{{item.check_time}}</span>
                        </div>
                    </div>
                    <!-- 1 -->
                    <div v-show="code == 1">
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>开始时间：</span>
                            <span>{{item.repair_starttime}}</span>
                        </div>
                        <div>
                            <span>维修用户：</span>
                            <span v-if="item.repair_channel_no == 0">{{item.repairOpenIdName}}</span>
                            <span v-else>{{item.repair_user_name}}</span> 
                        </div>
                    </div>
                    <!-- 3审批中 -->
                    <div v-show="code == 3 || code == 2">
                        <div>
                            <span>维修用户：</span>
                            <span v-if="item.repair_channel_no == 0">{{item.repairOpenIdName}}</span>
                            <span v-else>{{item.repair_user_name}}</span> 
                        </div>
                         <div>
                            <span>开始时间：</span>
                            <span>{{item.repair_starttime}}</span>
                        </div>
                        <div>
                            <span>结束时间：</span>
                            <span>{{item.repair_endtime}}</span>
                        </div>
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
            </div>

                <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line" style="display:none" v-show="!list || noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
        </div>
         <div class="list" v-if="code == 1">
            <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail2(item)"  v-show="item.repairStateName == '维修中'">
                <div class="card-title">
                    <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                    <span>{{item.repairStateName}}</span>
                </div>
                <div class="content">
                    <div>
                        <span>业主单位：</span>
                        <span>{{item.deptIdName}}</span>
                    </div>
                    <div>
                        <span>报修类型：</span>
                        <span>{{item.repairTypeName}}</span>
                    </div>
                    <!-- 0 -->
                    <div v-show="code == 0">
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>确认用户：</span>
                            <span v-if="item.check_channel_no == 0">{{item.checkOpenIdName}}</span>
                            <span v-else>{{item.check_user_name}}</span> 
                        </div>
                        <div>
                            <span>确认时间：</span>
                            <span>{{item.check_time}}</span>
                        </div>
                    </div>
                    <!-- 1 -->
                    <div v-show="code == 1">
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>开始时间：</span>
                            <span>{{item.repair_starttime}}</span>
                        </div>
                        <div>
                            <span>维修用户：</span>
                            <span v-if="item.repair_channel_no == 0">{{item.repairOpenIdName}}</span>
                            <span v-else>{{item.repair_user_name}}</span> 
                        </div>
                    </div>
                    <!-- 3审批中 -->
                    <div v-show="code == 3 || code == 2">
                        <div>
                            <span>维修用户：</span>
                            <span v-if="item.repair_channel_no == 0">{{item.repairOpenIdName}}</span>
                            <span v-else>{{item.repair_user_name}}</span> 
                        </div>
                         <div>
                            <span>开始时间：</span>
                            <span>{{item.repair_starttime}}</span>
                        </div>
                        <div>
                            <span>结束时间：</span>
                            <span>{{item.repair_endtime}}</span>
                        </div>
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
            </div>

                <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line" style="display:none" v-show="!list || noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
        </div>
         <div class="list" v-if="code == 3">
            <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail2(item)" v-show="item.repairStateName == '审批中'">
                <div class="card-title">
                    <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                    <span>{{item.repairStateName}}</span>
                </div>
                <div class="content">
                    <div>
                        <span>业主单位：</span>
                        <span>{{item.deptIdName}}</span>
                    </div>
                    <div>
                        <span>报修类型：</span>
                        <span>{{item.repairTypeName}}</span>
                    </div>
                    <!-- 0 -->
                    <div v-show="code == 0">
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>确认用户：</span>
                            <span v-if="item.check_channel_no == 0">{{item.checkOpenIdName}}</span>
                            <span v-else>{{item.check_user_name}}</span> 
                        </div>
                        <div>
                            <span>确认时间：</span>
                            <span>{{item.check_time}}</span>
                        </div>
                    </div>
                    <!-- 1 -->
                    <div v-show="code == 1">
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>开始时间：</span>
                            <span>{{item.repair_starttime}}</span>
                        </div>
                        <div>
                            <span>维修用户：</span>
                            <span v-if="item.repair_channel_no == 0">{{item.repairOpenIdName}}</span>
                            <span v-else>{{item.repair_user_name}}</span> 
                        </div>
                    </div>
                    <!-- 3审批中 -->
                    <div v-show="code == 3 || code == 2">
                        <div>
                            <span>维修用户：</span>
                            <span v-if="item.repair_channel_no == 0">{{item.repairOpenIdName}}</span>
                            <span v-else>{{item.repair_user_name}}</span> 
                        </div>
                         <div>
                            <span>开始时间：</span>
                            <span>{{item.repair_starttime}}</span>
                        </div>
                        <div>
                            <span>结束时间：</span>
                            <span>{{item.repair_endtime}}</span>
                        </div>
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
            </div>

                <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line" style="display:none" v-show="!list || noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
        </div>
         <div class="list" v-if="code == 2">
            <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail2(item)" v-show="item.repairStateName == '维修完成'">
                <div class="card-title">
                    <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                    <span>{{item.repairStateName}}</span>
                </div>
                <div class="content">
                    <div>
                        <span>业主单位：</span>
                        <span>{{item.deptIdName}}</span>
                    </div>
                    <div>
                        <span>报修类型：</span>
                        <span>{{item.repairTypeName}}</span>
                    </div>
                    <!-- 0 -->
                    <div v-show="code == 0">
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>确认用户：</span>
                            <span v-if="item.check_channel_no == 0">{{item.checkOpenIdName}}</span>
                            <span v-else>{{item.check_user_name}}</span> 
                        </div>
                        <div>
                            <span>确认时间：</span>
                            <span>{{item.check_time}}</span>
                        </div>
                    </div>
                    <!-- 1 -->
                    <div v-show="code == 1">
                        <div>
                            <span>报修时间：</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div>
                            <span>开始时间：</span>
                            <span>{{item.repair_starttime}}</span>
                        </div>
                        <div>
                            <span>维修用户：</span>
                            <span v-if="item.repair_channel_no == 0">{{item.repairOpenIdName}}</span>
                            <span v-else>{{item.repair_user_name}}</span> 
                        </div>
                    </div>
                    <!-- 3审批中 -->
                    <div v-show="code == 3 || code == 2">
                        <div>
                            <span>维修用户：</span>
                            <span v-if="item.repair_channel_no == 0">{{item.repairOpenIdName}}</span>
                            <span v-else>{{item.repair_user_name}}</span> 
                        </div>
                         <div>
                            <span>开始时间：</span>
                            <span>{{item.repair_starttime}}</span>
                        </div>
                        <div>
                            <span>结束时间：</span>
                            <span>{{item.repair_endtime}}</span>
                        </div>
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
            </div>

                <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line" style="display:none"  v-show="!list || noData">
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
import { userRepairList } from '../api/user/function';
import maintenMixins from '@/mixins/maintenMixins';
import BaseContainer from '../components/BaseContainer';
import Tab from '../components/Tab';
import Search from '../components/Search';
import { selectDataCoverMcn } from "../api/user/wechat";

export default {
    mixins: [maintenMixins(userRepairList, 'pool')],
    data(){
        return{
           msg:'维修审批',
           obj:{
               msg1:'未维修',
               msg2:'维修中',
               msg3:'维修结束'
           },
           dataList:[],
           code:0,
           pages:{
               page:1,
               limit:3
           },
           index:0,
           tabList: ['待维修','维修中','审批中','已维修'],
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
    mounted(){
        // this.userRepairList(this.code)
        
    },
    methods:{
        tabChanged(value){
            console.log(value);

        },
        goNot(code){
           this.userRepairList(code)
        },
        goAlready(code){
           this.userRepairList(code)
        },
        goOther(code){
             
             if (code == 2) {
                 this.code = 3
             }
             else if (code == 3) {
                 this.code = 2
             }
             else{
                this.code = code;
             }
            //  console.log('获取到是啥---------------',this.$refs.tab.isNowTab);

            //  this.$store.commit('TAB', this.code)
             this.selectDataCoverMcn()
        },
        selectDataCoverMcn(mcn){
             // this.userReportList(mcn)
              var userRepairParam={
                'repairState':this.code,
                'coverMcn':mcn
            }
            userRepairList(this.pages.limit, this.pages.page, userRepairParam).then(res =>{
                console.log(res);
                this.list = res.data.data.data
                if (res.data.data.code == 0) {
                    this.noData = true
                }
                 console.log( this.noData);
            })
        },
        userRepairList(code){
            var userRepairParam={
                'repairState':code
            }
            userRepairList(this.pages.limit, this.pages.page, userRepairParam).then(res =>{
                this.list = res.data.data.data
            })
        },
        goDetail2(item){ //维修
            this.$router.push({
                name:'examinationMaintenDetail',
                params:{
                    isMainten:true,
                    repairId:item.repair_id,
                    
                },
                query:{
                    tab:this.code
                }
            })
            sessionStorage.setItem('repair_id',item.repair_id)
            // this.$store.commit('REPORT_ID', item.report_id)
        },
    }
}
</script>

<style lang="scss" scoped>
.list{
    padding:0 20px;
    margin-top: 300px;
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