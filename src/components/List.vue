<template>
    <div>

        <!-- 绑定账户记录列表 -->
        <div class="list" v-show="ownerList">
            <div class="card" v-for="(item,i) in ownerList" :key="i" >
                <!-- <div class="card-title">
                    <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                    <span>{{item.statusName}}</span>
                </div> -->
                <div class="content">
                    <div>
                        <span style="width:90px;display:inline-block">绑定用户：</span>
                        <span>{{item.userName}}</span>
                    </div>
                    <div>
                        <span style="width:90px;display:inline-block">手机号码：</span>
                        <span>{{item.phone}}</span>
                    </div>
                     <div>
                        <span style="width:90px;display:inline-block">绑定状态：</span>
                        <span>{{item.statusName}}</span>
                    </div>
                    <div>
                        <span style="width:90px;display:inline-block">绑定时间：</span>
                        <span>{{item.createTime}}</span>
                    </div>
                </div>
            </div>

                <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line" v-show="!ownerList || noData5">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
        </div>

  
        
       

    </div>
  
    
</template>

<script>
import weui from 'weui.js';
import 'weui';
 import { mapState } from 'vuex';
// import repaireMixins from '@/mixins/repaireMixins';

export default {
    // mixins:[repaireMixins],
    data(){
        return{
            // noData:false,
            message:'',
            isTab:0
        }
    },
    props:{ 
        dataList: {
          type: Array, //数组
          default: function () {
            return []
          }
        },
        MaintenList:{
            type: Array,
            default: function(){
                return []
            }
        },
        MsgalarmRecordList:{
            type: Array,
            default: function(){
                return []
            }
        },
        BindingLogList:{
             type: Object, //对象
            default: function () {
                return {}
            }
        },
        ownerList:{
             type: Array,
            default: function(){
                return []
            }
        },
        RepairOrderList:{
             type: Array,
            default: function(){
                return []
            }
        },
        noData1:{
            type: Boolean,
            default: false,
        },
         noData2:{
            type: Boolean,
            default: false,
        },
         noData3:{
            type: Boolean,
            default: false,
        },
        noData4:{
            type: Boolean,
            default: false,
        },
        noData5:{
            type: Boolean,
            default: false,
        },
         noData6:{
            type: Boolean,
            default: false,
        }
    },
     computed:{
            ...mapState({
                tab: state => state.user.tab
            }),
    },
     watch:{
            tab:{
                handler (val, oldVal) {
                    this.isTab = val
                    if (!val) {
                        this.isTab = 0;
                    }
                    if (val) {
                        this.isTab = this.tab;
                         
                    }
                },
                deep: true
            }
    },
    created(){
        this.isTab = 0;
        // this.isTab = this.tab;
        console.log('tab+++++++=======', this.isTab);
       
    },
    methods:{
        goDetail(item){ // 报修
            this.$router.push({
                name:'myRepairDetail',
                params:{
                    isReport: true,
                    reportId: item.reportId,
                    reportState: item.reportState,
                    isReportTab:this.isTab
                }
            })
        },
        // goInside(item){
        //    this.$emit('goInside',item); 
        // },
   
       
    }

}
</script>

<style lang="scss">
.over{
    color: red;
}
.lower{
    color: orangered;
}
.other{
    color: green;
}
.iconfont{
    font-size: 25px;
}
.weui-loadmore__tips{
    font-size: 30px;
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
.list2{
     padding:0 20px;
    // margin-top: 20px;
      .card2{
        // background-color: #fff;
        width: 95%;
        height: 100%;
        // padding: 20px;
        margin-bottom: 25px;
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