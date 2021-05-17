<template>
  <div>
        <Header :data="msg"></Header>
        <Tab :value.sync="index" :tabList="tabList" @goOther="goOther"></Tab>
        <Search ref="list" @selectDataCoverMcn="selectDataCoverMcn"></Search>
        <BaseContainer @reachBottom="reachBottom" :isLoading="isLoading" >
            <!-- <List :RepairOrderList="list" :noData6="noData"></List> -->
            <div class="list" v-if="code == 0">
                <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail2(item)" v-show="item.disposeStatusName == '待处理'">
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span>{{item.disposeStatusName}}</span>
                    </div>
                    <div class="content">
                        <div>
                            <span>终端编码：</span>
                            <span>{{item.sn}}</span>
                        </div>
                        <div>
                            <span>告警类型：</span>
                            <span>{{item.eventName}}</span>
                        </div>
                        <div>
                            <span>归属单位：</span>
                            <span>{{item.deptName}}</span>
                        </div>
                        <div>
                            <span>处理前时间：</span>
                            <span>{{item.beforeTime}}</span>
                        </div>
                        <div>
                            <span>处理后时间：</span>
                            <span>{{item.afterTime}}</span>
                        </div>
                        <div>
                            <span>创建时间：</span>
                            <span>{{item.createTime}}</span>
                        </div>
                        <div>
                            <span>地址：</span>
                            <span>{{JSON.parse(item.coverData).coverAddress}}</span>
                        </div>
                    </div>
                </div>

                    <!-- <div >没有更多</div> -->
                <div class="weui-loadmore weui-loadmore_line" v-show="!list  || noData">
                    <span class="weui-loadmore__tips">没有更多数据</span>
                </div>
            </div>
            <div class="list" v-if="code == 1">
                <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail2(item)" v-show="item.disposeStatusName == '处理中'">
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span>{{item.disposeStatusName}}</span>
                    </div>
                    <div class="content">
                        <div>
                            <span>终端编码：</span>
                            <span>{{item.sn}}</span>
                        </div>
                        <div>
                            <span>告警类型：</span>
                            <span>{{item.eventName}}</span>
                        </div>
                        <div>
                            <span>归属单位：</span>
                            <span>{{item.deptName}}</span>
                        </div>
                        <div>
                            <span>处理前时间：</span>
                            <span>{{item.beforeTime}}</span>
                        </div>
                        <div>
                            <span>处理后时间：</span>
                            <span>{{item.afterTime}}</span>
                        </div>
                        <div>
                            <span>创建时间：</span>
                            <span>{{item.createTime}}</span>
                        </div>
                        <div>
                            <span>地址：</span>
                            <span>{{JSON.parse(item.coverData).coverAddress}}</span>
                        </div>
                    </div>
                </div>

                    <!-- <div >没有更多</div> -->
                <div class="weui-loadmore weui-loadmore_line" v-show="!list || noData">
                    <span class="weui-loadmore__tips">没有更多数据</span>
                </div>
            </div>
            <div class="list" v-if="code == 2">
                <div class="card" v-for="(item,i) in list" :key="i" @click="goDetail2(item)" v-show="item.disposeStatusName == '已处理'">
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span>{{item.disposeStatusName}}</span>
                    </div>
                    <div class="content">
                        <div>
                            <span>终端编码：</span>
                            <span>{{item.sn}}</span>
                        </div>
                        <div>
                            <span>告警类型：</span>
                            <span>{{item.eventName}}</span>
                        </div>
                        <div>
                            <span>归属单位：</span>
                            <span>{{item.deptName}}</span>
                        </div>
                        <div>
                            <span>处理前时间：</span>
                            <span>{{item.beforeTime}}</span>
                        </div>
                        <div>
                            <span>处理后时间：</span>
                            <span>{{item.afterTime}}</span>
                        </div>
                        <div>
                            <span>创建时间：</span>
                            <span>{{item.createTime}}</span>
                        </div>
                        <div>
                            <span>地址：</span>
                            <span>{{JSON.parse(item.coverData).coverAddress}}</span>
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
import Tab from '../components/Tab';
import Search from '../components/Search';
import BaseContainer from '../components/BaseContainer';
import { dataWorkList } from "../api/user/function";
import repairOrder from '@/mixins/repairOrder';

export default {
    mixins: [repairOrder(dataWorkList, 'pool')],
    data(){
        return{
            msg:'工单审批',
            index:0,
            tabList: ['待处理','处理中','已处理'],
            noData: false,
            code:0,
            pages:{
               page:1,
               limit:3
            },
        }
    },
    components:{
        Header,
        Tab,
        Search,
        BaseContainer,
    },
    methods:{
        goOther(code){
            this.code = code;
            this.selectDataCoverMcn()
        },
        selectDataCoverMcn(mcn){
            var param ={
                'disposeStatus':this.code,
                'coverMcn':mcn
            }
            dataWorkList(this.pages.limit, this.pages.page, param).then(res =>{
                // if (res.data.code == 200) {
                        this.list = res.data.data.data
                // }
                // console.log(res.data.code);
                if (res.data.data.code == 0) {
                    this.noData = true
                    // this.list =[]
                    
                }
            })
        },
        goDetail2(item){ //工单
            this.$router.push({
                name:'examinationRepairOrderDetail',
                params:{
                    // isRecord:true,
                    code:this.code,
                    id: item.id
                }
            })
        }
    }
}
</script>

<style lang="scss">
.weui-loadmore__tips{
    font-size: 30px;
    // margin-top: 200px;
}
.weui-loadmore_line .weui-loadmore__tips {
    background-color: #ececec;
   
}
</style>
<style lang="scss" scoped>
.list{
    padding:0 20px;
    margin-top: 300px;
    .card{
        background-color: #fff;
        width: 95%;
        height: 100%;
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