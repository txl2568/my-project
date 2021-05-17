<template>
  <div>
     
       <!-- <my-scroll ref="myScroll" :on-refresh="onRefresh" :on-pull="onPull" :get-scroll-top="getTop" :scroll-state="scrollState"> -->
       <!-- <scroller
            delegate-id="myScroller"
            :on-refresh="refresh"
            ref="myscroller"
            class="scroller-box"
            > -->
        <!-- <waterfall :col='col'  :data="dataList" @loadmore="loadmore" @scroll="scroll"> -->

        <Header :data="msg"></Header>
      
        <div class="search">
            <!-- <form action=""  onsubmit="return false;">   -->
                <input type="search" value='搜索' class="input" placeholder="请输入MCN码" v-model="mcn" id="txt" @keyup.enter="selectDataCoverMcn" />  
            <!-- </form>   -->
            <!-- <button class="search-btn" @click="popUp" :disabled="mcn"  :class="{ 'setting':mcn }">筛选</button> -->
            <button class="search-btn" @click="popUp"  v-if="!mcn">筛选</button>
            <button class="search-btn" @click="selectDataCoverMcn"   v-if="mcn">搜索</button>
        </div>

         <BaseContainer @reachBottom="reachBottom" :isLoading="isLoading">
    
            <div class="list" v-if="code1 == 0">
                <div class="card" v-for="(item,i) in list" :key="i" @click="goMyRepairDetail(item.reportId)" v-show="item.reportStateName == '待确认'">
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span>{{item.reportStateName}}</span>
                    </div>
                    <div class="content">
                        <div>
                            <span>报修类别：</span>
                            <span>{{item.reportTypeCauseName}}</span>
                        </div>
                        <div>
                            <span>报修类型：</span>
                            <span>{{item.reportTypeName}}</span>
                        </div>
                         <div>
                            <span>业主单位：</span>
                            <span>{{item.deptIdName}}</span>
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


            </div>
             <div class="list" v-if="code1 == 1">
                <div class="card" v-for="(item,i) in list" :key="i" @click="goMyRepairDetail(item.reportId)" v-show="item.reportStateName == '通过'">
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span>{{item.reportStateName}}</span>
                    </div>
                    <div class="content">
                        <div>
                            <span>报修类别：</span>
                            <span>{{item.reportTypeCauseName}}</span>
                        </div>
                        <div>
                            <span>报修类型：</span>
                            <span>{{item.reportTypeName}}</span>
                        </div>
                         <div>
                            <span>业主单位：</span>
                            <span>{{item.deptIdName}}</span>
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

            </div>
             <div class="list" v-if="code1 == 2">
                <div class="card" v-for="(item,i) in list" :key="i" @click="goMyRepairDetail(item.reportId)" v-show="item.reportStateName == '未通过'">
                    <div class="card-title">
                        <span>{{item.coverMcn?item.coverMcn:'无编码'}}</span>
                        <span>{{item.reportStateName}}</span>
                    </div>
                    <div class="content">
                        <div>
                            <span>报修类别：</span>
                            <span>{{item.reportTypeCauseName}}</span>
                        </div>
                        <div>
                            <span>报修类型：</span>
                            <span>{{item.reportTypeName}}</span>
                        </div>
                         <div>
                            <span>业主单位：</span>
                            <span>{{item.deptIdName}}</span>
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

                
            </div>
            <!-- <div >没有更多</div> -->
            <div class="weui-loadmore weui-loadmore_line" style="margin-top:136px;display:none" v-show="noData">
                <span class="weui-loadmore__tips">没有更多数据</span>
            </div>

        </BaseContainer>

         <n-transition ref="pop" speed="ease-in-out" :style="{ height: '500px' }"  :maskVal="0.5" :data="value" @ensure="ensure" ></n-transition>



  </div>
</template>

<script>
import Header from '../components/Header';
import nTransition from '../components/n-transition';
// import waterfall from '../components/waterfall';
// import Paging from '../components/Paging';
import {filtrate, myUserReport, selectDataCoverMcn} from '../api/user/wechat';
// import VueScroller from 'vue-scroller';
// import myScroll from "../components/myScroll";
import listMixins from '@/mixins/listMixins';
import BaseContainer from '../components/BaseContainer';
import weui from 'weui.js';
import 'weui';

export default {
    // name: 'taskPool',
    mixins: [listMixins(myUserReport, 'pool')],
    data(){
        return{
            msg:'我的报修',
            tab:1,
            value:{},
            pages:{
                limit:3,
                page:1,
                total:2,
            },
            total:1,
            pageSize:10,
            currentPage:1,
            mcn:'',
            data:[],
            obj:{},
            obj2:{},
            id:'',
            dataList:[], 
            col:1, 
            page:1,
            loading:false,
            scrollState: true, //是否可以滑动
            indexScrollTop:0,
            listdata:[],
            noData:false,
            code1:'',
            code2:''
            // isload:false
        }
    },
    components: {
        Header,
        nTransition,
        // myScroll,
        BaseContainer
        // waterfall
        // Paging
    },
    watch:{
        mcn:{
           handler(newVal, oldVal) {
               if (newVal) {
                   this.mcn = newVal
               }
           }
        },
        obj:{
            handler(newVal, oldVal) {
                //  console.log('typeof',typeof(newVal), typeof(oldVal), typeof(this.data));
                 console.log('obj------------------------------',newVal, oldVal);
                //  var obj = Object.assign(newVal,oldVal)
                // //  var obj = JSON.parse((JSON.stringify(newVal) + JSON.stringify(oldVal)).replace(/}{/, ','));
                //  console.log('当前=====================',obj );

                
                // if (newVal) {
                    // this.data = newVal
                    //  this.data = newVal).join(oldVal);
                    // JSON.stringify(newVal).join(JSON.stringify(oldVal))
                    // var a = JSON.stringify(newVal);
                    // var b = JSON.stringify(oldVal);
                    // var c = a.concat(b)
                    //  console.log('typeof2',typeof(a),typeof(b),typeof(c), c  );
                    //  var str = JSON.stringify(this.data);
                    //  str = c
                    //  console.log('------------------------------',str);
                    //  object.toString()

                     
                     
                   
                    
                    //  this.data = c;
                    //  JSON.stringify(this.data) = c
                // }
                // if (oldVal.length>0) {
                //       console.log('new',newVal);
                //  console.log('old',oldVal);
                // //  var obj = {};
                // //    obj =  Object.assign(newVal,oldVal) 
                // //     // var obj1 =  Object.assign(newVal,oldVal)
                //      console.log('当前=====================',Object.assign(newVal,newVal) );
                // }
               
            }
        },
        data:{
             handler(newVal, oldVal) {
                 console.log('data------------------------------',newVal, oldVal);
                
                //  if (oldVal) {
                //       this.data = newVal.concat(oldVal)
                //  }
             }
        }
    },
    methods:{
        onRefresh(mun) { // 刷新
            
            var userReport ={
                "coverMcn": this.mcn?this.mcn:'',
                "reportState": sessionStorage.getItem('code1')?sessionStorage.getItem('code1'):'',
                "reportTypeCause": sessionStorage.getItem('code2')?sessionStorage.getItem('code2'):'',
            }
            // this.listParams.p = 1;
           myUserReport(this.pages.limit,this.pages.page, userReport)
                .then(res => {
                    if (res.code == 200) {
                        this.pages.page++;
                        this.data = res.data.data.data;
                        this.$refs.myScroll.setState(3);
                    } else {
                        this.$refs.myScroll.setState(3);
                    }
                });
        },
        onPull(mun) { //加载
           var userReport ={
                "coverMcn": this.mcn?this.mcn:'',
                "reportState": sessionStorage.getItem('code1')?sessionStorage.getItem('code1'):'',
                "reportTypeCause": sessionStorage.getItem('code2')?sessionStorage.getItem('code2'):'',
            }
           myUserReport(this.pages.limit,this.pages.page, userReport)
                .then(res => {
                    if (res.code == 200 && res.data.length > 0) {
                        this.pages.page++;
                        res.data.map((v, k) => {
                            this.data.push(v);
                           
                        });
                         console.log(this.data);
                        this.$refs.myScroll.setState(5);
                    } else {
                        this.$refs.myScroll.setState(7);
                    }
                });
        },
        getTop(y) {//滚动条位置
            this.indexScrollTop = y;
        },
        getNum(e){
            console.log("选中的页面是-->",e)  
            this.currentPage=e;
        },
        selectDataCoverMcn(){
            this.ensure()
        },
        goMcnRepaire(){      
            this.tab = 1
        },
        goRepaire(){
            this.tab = 2
        },
        popUp () {
            filtrate().then(res =>{
                this.value = res.data.data
                this.$refs['pop'].show()
            }).catch(error =>{
            })
        },
        ensure(code1,code2){
            this.code1 = code1;
            this.code2 = code2;
            sessionStorage.setItem('code1',code1);
            sessionStorage.setItem('code2',code2);
            var userReport ={
                "coverMcn": this.mcn?this.mcn:'',
                "reportState": code1?code1:'',
                "reportTypeCause": code2?code2:'',
            }
            myUserReport(this.pages.limit,this.pages.page, userReport).then(res =>{
                // this.data = JSON.stringify(res.data.data.data);
                console.log('初始化this.obj2=========',res.data.data.code);
                this.list = res.data.data.data;
                 this.obj = {};
                this.obj = res.data;
                this.total = this.data.count;
                this.$refs.pop.hide();
                // console.log('初始化this.obj2=========',this.obj2);
                  if (res.data.data.code == 0) {
                    this.noData = true
                }

               
               
                // console.log('++++++++',this.obj,this.obj2,res.data.data.data.concat(this.obj2.data.data),typeof(res.data.data.data.concat(this.obj2.data.data)));
                // // console.log('++++++++------',JSON.stringify(this.data),typeof(JSON.stringify(this.data)));
                // // console.log('++++++++2------',JSON.stringify(this.data).concat(JSON.stringify(this.data2)));
                // // var list = []
                // // list =  res.data.data.data.concat(this.obj2.data.data);
                // this.dataList = res.data.data.data.concat(this.obj2.data.data);
                // console.log('this.data__________________',this.dataList);
                // if (this.dataList.length < this.pages.limit) {
                //     //没有更多数据
                //     this.loading = true;
                //     this.showmore = true;
                // }else{
                //     this.pages.page++;
                //     this.loading = false;
                // }



               
                // var jsonstr = JSON.stringify(this.data).concat(JSON.stringify(this.data2));
                //  console.log('++++++++2======',jsonstr,typeof(jsonstr));
                // // var jsonArr = JSONArray.fromObject(jsonstr);
                // var obj = JSON.parse(jsonstr)
              
                // console.log('++++++++22======',obj,typeof(obj));
               
//                 console.log('++++++++3======',typeof(jsonstr));
// var jsonStr = '[{"id":"01","open":false,"pId":"0","name":"A部门"},{"id":"01","open":false,"pId":"0","name":"A部门"},{"id":"011","open":false,"pId":"01","name":"A部门"},<br>{"id":"03","open":false,"pId":"0","name":"A部门"},{"id":"04","open":false,"pId":"0","name":"A部门"}, {"id":"05","open":false,"pId":"0","name":"A部门"}, {"id":"06","open":false,"pId":"0","name":"A部门"}]';
//    var jsonObj =  JSON.parse(jsonStr)
//      console.log('++++++++4======',jsonObj);
//      var jsonStr1 = JSON.stringify(jsonObj)
//                 console.log('++++++++5======',jsonStr1);






            }).catch(error =>{})
           
        },
        goMyRepairDetail(id){
           this.id = id;
           this.$router.push({
               name:'myRepairDetail',
                params:{
                    reportId:id,
                }
           })
            
           
        },
         // 下拉刷新
        refresh() {
            this.pages.page = 1;
            setTimeout(
                function() {
                    this.ensure()
                    // this.allOrderList();
                    console.log("我是上拉加载0");
                    this.$refs.myscroller.finishPullToRefresh(); //刷新完毕关闭刷新的转圈圈
                }.bind(this),
                700
            );
        },
        // 上拉加载
        infinite(done) {
          let self = this;
          console.log(self);
            // var data = sessionStorage.getItem('data');
            // console.log(this.data,this.data2);
        

            // var array = Object.assign(self.data,self.data2)
            //  this.data = this.data.concat(this.data)
            // console.log(this.data,this.data2)
            //  console.log('array--------------------------',array);


            if (this.pages.page >= this.pages.total) {
                //若当前页码大于或等于总页码，则不再加载数据，提示没有更多数据
                this.$refs.myscroller.finishInfinite(true); //这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
            } else {
                    setTimeout(() => {
                        this.pages.page++; //下拉一次页数+1
                        // this.allOrderList();
                        console.log('下拉一次======',this.pages.page);
                       var userReport ={
                            "coverMcn": this.mcn?this.mcn:'',
                            "reportState": '',
                            "reportTypeCause": '',
                        }

                        // this.pages.page++;
                        myUserReport(this.pages.limit,this.pages.page, userReport).then(res =>{
                            //    
                            // let self = this;
                            // sessionStorage.setItem('data2',res.data.data.data);
                            // var data = data.concat(res.data.data.data);
                            // this.total = this.data.count;
                            // this.$refs.pop.hide();
                            var arr = JSON.stringify(res.data.data.data);
                            console.log('再次判断是啥===============',res);
                            
                            // data.concat(arr)
                            
                        
                            // this.data = Object.toString(arr);
                            // this.data = arr;
                            // this.data = res.data.data.data;
                             console.log('array1--------------------------',this.data);

                            this.obj = res.data;
                            this.data = this.data.concat(res.data.data.data);
                            console.log('array2--------------------------',this.data);
                            // console.log('self.data===',this.data);
                            // sessionStorage.setItem('data',data.concat(arr));

                            // var array = sessionStorage.getItem('data').concat(arr);
                            //
                            // console.log('array2--------------------------',typeof(array));
                            // var obj = JSON.parse(array);
                            // // obj = array;
                            // console.log('array3--------------------------',typeof(obj));


                        }).catch(error =>{})
                        done(); //进行下一次加载操作

                    }, 1500);
            }
        },
         scroll(scrollData) {

            // console.log('scrollData==============',scrollData)
            // scrollData.scrollHeight
            // scrollData.scrollTop

          },
         loadmore(index) {
            console.log('index============',index);
            // this.page++;
            this.pages.page++
            this.ensure()

            //这里是当滑动到底部时，再次请求接口，并且传page，返回的数据给dataList赋值

            //简单粗暴的有了分页功能

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
._v-container>._v-content>.loading-layer{
    color: #fff !important;
}
</style>
<style lang="scss" scoped>
input{
    font-size: 30px;
    border: none;
    -webkit-appearance: none;
    background-color: #fff;
    outline: none;
    border: 1px #999 solid;  
}
button{
    border: none;
    background-color: transparent;
    outline: none;  
}
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    height: 80px;
    .inner-title{
        width: 50%;
        height: 100%;
        border: 1px #ccc solid;
        text-align: center;
        line-height: 80px;
        &.on{
            background-color: #ccc;
        }
        span{
            font-size: 30px;
        }
    }

}
.search{
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-top: 20px;
    padding:  20px;
    background-color: #fff;
    position: fixed;
    width: 95%;
    top: 80px;
    margin: auto;

    .input{
            width: 75%;
            height: 60px;
    }
    .search-btn{
        // border: 2px #999 solid;
        text-align: center;
        width: 20%;
        height: 65px;
        line-height: 65px;
        border-radius: 30px;
        background-color: #1890ff;
        color: #fff;
        margin-left: 10px;
        font-size: 30px;
        // margin-top: 5px;
    }

}
.setting{
        background-color: #ccc !important;
}
.list{
    margin: 250px 20px 20px 20px;
    height: 75vh;
    overflow-y: scroll;
    .card{
        background-color: #fff;
        // width: 95%;
        padding: 20px;
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