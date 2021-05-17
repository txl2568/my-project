<template>
  <div class="search">
        <form action="" style="width: 80%;" onsubmit="return false;">  
            <input type="search" value='搜索' class="input" placeholder="请输入井盖编码 / 芯片编码" v-model="mcn" id="txt" @keyup.enter="selectDataCoverMcn" />  
        </form>  
        <!-- <button class="search-btn" @click="popUp" :disabled="mcn"  :class="{ 'setting':mcn }">筛选</button> -->
        <button class="search-btn" @click="selectDataCoverMcn()"   >搜索</button>
    </div>
</template>

<script>
export default {
     data(){
        return{
           mcn:''
        }
    },
    methods:{
         selectDataCoverMcn(){
            this.$emit('selectDataCoverMcn',this.mcn);
        }
    }
}
</script>

<style lang="scss" scoped>
input{
    font-size: 30px;
    border: none;
    background-color: #ecedf2;
    outline: none;
    padding-left: 20px;
    // border: 1px #ccc solid;  
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
    margin-top: 0;
    padding:0  20px;
    background-color: #fff;
    height: 100px;
    // width: 96%;
    // position: fixed;
    border-top: 1px #e5e5e5 solid;
    border-bottom: 1px #e5e5e5 solid;
    z-index: 999;
    top: 80px;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    


    .input{
            width: 100%;
            height: 60px;
            border-radius: 30px;
    }
    .search-btn{
        // border: 1px #ccc solid;
        text-align: center;
        width: 20%;
        height: 60px;
        line-height: 60px;
        border-radius: 30px;
        background-color: #1890ff;
        color: #fff;
        margin-left: 10px;
        font-size: 30px;
    }

}
.setting{
    border-right:1px #fff solid;
}
</style>