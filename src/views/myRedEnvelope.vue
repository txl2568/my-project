<template>
  <div>
      <Header :data="msg"></Header>
      <div class="content">
          <p class="title">总金额</p>
          <p class="sum">{{amount}}</p>
          <div class="withdrawal">提现</div>
      </div>
      <!-- <div v-for="(item,i) in data" :key="i">
          <div>
              <span>余额</span>
              <span>{{data.amount}}</span>
          </div>
           <div>
              <span>{{data.createTime}}</span>
          </div>
          <div>
              <span>rType</span>
          </div>
      </div> -->
        <BaseContainer @reachBottom="reachBottom"  >
        <div class="list">
            <div class="card" v-for="(item,i) in data" :key="i">
                <!-- <div  > -->
                    <div class="card-content">
                        <span class="span" v-if="item.rType == 1">奖励</span>
                        <span class="span" v-else>提现</span>
                        <span class="balance" v-if="item.rType == 1">+{{item.amount}}</span>
                        <span class="balance" v-else>-{{item.amount}}</span>
                    </div>
                        <div class="card-content">
                        <span class="time">{{item.createTime}}</span>
                        <span></span>
                    </div>
                <!-- </div> -->
               
            </div>

                  <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line"  v-show="data.length===0 || noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>
        </div>

      
        </BaseContainer>

  </div>
</template>

<script>
import Header from '../components/Header';
import {selectAccount, myUserAccount} from '../api/user/user';
import BaseContainer from '../components/BaseContainer';
import dataMixins from '@/mixins/dataMixins';
import weui from 'weui.js';
import 'weui';

export default {
    mixins: [dataMixins(selectAccount,myUserAccount, 'pool')],
    data(){
        return{
            msg:'我的钱包',
            pages:{
                pageSize:6,
                page:1
            },
            data:[],
            noData:false,
            amount:''
        }
    },
    components: {
        Header,
        BaseContainer
    },
    created(){
        // this.selectAccount()
       
    },
    methods:{
        selectAccount(){
           selectAccount().then(res =>{
             
              myUserAccount( res.data.data.accountId, this.pages.pageSize, this.pages.page).then(res =>{
                  console.log(res);
                  this.data =  res.data.data.cashrecord.data;
                 

                

              })
          })
        }
          
    }
}
</script>

<style lang="scss">
.weui-loadmore__tips{
    font-size: 30px;
}
.weui-loadmore_line .weui-loadmore__tips {
    background-color: #ececec;
}
// body{
//     overflow-y: hidden;
// }
</style>
<style lang="scss" scoped>

.content{
    background-color: #fff;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0 40px 0;
    position: fixed;
    top: 80px;
    width: 100%;
    // border-bottom: 1px #e5e5e5 solid;
    p{
        margin-top: 20px;
    }
    .title{
        font-size: 30px;
    }
    .sum{
        font-size: 40px;
        font-weight: bold;
    }
    .withdrawal{
        width: 150px;
        height: 60px;
        color: #fff;
        text-align: center;
        line-height: 60px;
        border-radius: 15px;
        background-color:#1890ff;
        margin-top: 10px;
        font-size: 28px;
    }
}
.list{
    margin-top: 380px;
    padding-bottom: 50px;
     
     height: 100%;
.card{
        background-color: #fff;
        // width: 95%;
        border-bottom: 1px #e5e5e5 solid;
        // height: 100%;
        padding: 20px 85px;
        .card-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            .span{
                font-size: 30px;
            }
            .balance{
                font-size: 35px;
                font-weight: bold;
                color: #eab032;
            }
            .time{
                color: #666;
                font-size: 28px;
            }
        }
}
}

</style>