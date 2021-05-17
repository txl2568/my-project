<template>
  <div>
       <div class="title">
          <div :class="{on:tab===0}" @click="goNot" >
              <p>{{obj.msg1}}</p>
          </div>
          <div :class="{on:tab===1}" @click="goAlready"  style="border-left:1px #fff solid">
               <p>{{obj.msg2}}</p>
          </div>
           <div :class="{on:tab===2}" @click="goOther" v-show="obj.msg3" style="border-left:1px #fff solid">
               <p>{{obj.msg3}}</p>
          </div>
        </div>
        <div class="search">
            <form action="" style="width: 80%;" onsubmit="return false;">  
                <input type="search" value='搜索' class="input" placeholder="请输入MCN码" v-model="mcn" id="txt" @keyup.enter="selectDataCoverMcn" />  
            </form>  
            <!-- <button class="search-btn" @click="popUp" :disabled="mcn"  :class="{ 'setting':mcn }">筛选</button> -->
            <button class="search-btn" @click="selectDataCoverMcn()"   >搜索</button>
        </div>
            

  </div>
</template>

<script>
export default {
    props:{
        obj: {
            type: Object,
            default: function () {
                return {  }
            }
        }
    },
    data(){
        return{
           tab:0,
           mcn:''
        }
    },
    methods:{
        goNot(){
            this.tab = 0
            this.$emit('goNot',this.tab);
        },
         goAlready(){
            this.tab = 1
            this.$emit('goAlready',this.tab);
        },
        goOther(){
            this.tab = 2
            this.$emit('goOther',this.tab);
        },
        selectDataCoverMcn(){
            this.$emit('selectDataCoverMcn');
        }
    }

}
</script>

<style lang="scss" scoped>
input{
    font-size: 30px;
    border: none;
    // background-color: #fff;
    outline: none;
    border: 1px #ccc solid;  
}
button{
    border: none;
    background-color: transparent;
    outline: none;  
}
.title{
    display: flex;
    &>div{
        background-color: #ccc;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        &.on{
            background-color: #fff;

        }
        p{
            font-size: 30px;
        }
    }
}
.search{
    display: flex;
    align-items: center;
    // margin-top: 20px;
    // padding:  20px;
    // background-color: #fff;

    .input{
            width: 100%;
            height: 60px;
    }
    .search-btn{
        border: 1px #ccc solid;
        text-align: center;
        width: 20%;
        height: 60px;
        line-height: 60px;
        // border-radius: 30px;
        background-color: #fff;
        color: #666;
        // margin-left: 10px;
        font-size: 30px;
    }

}
.setting{
    border-right:1px #fff solid;
}
</style>