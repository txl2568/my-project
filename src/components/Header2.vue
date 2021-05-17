<template>
  <div>
     <div class="header">
         <i class="iconfont icon-left" @click="goBack"></i>
         <span >{{data}}</span>
         <span > </span>
    </div>
  </div>
</template>

<script>


export default {
  props:{
      data: {
          type: String
      }
  },
  data () {
    return {
    }
  },
  components: {
    // HelloWorld
  },
  created(){

  },
  mounted(){

  },
  methods:{
      goBack(){
          this.$router.back();
      }

  }
}
</script>
<style lang="scss" scoped>
 @import "../common/css/iconfont.css";
  .iconfont {
    font-size: 30px;
    }
.header{
         display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1890ff;
    color: #fff;
    height:80px;
    padding:0 10px;
    //     position: fixed;
    // width: 100%;
    // box-sizing: border-box;
    // top: 0;
    // width: 100%;
    // position: fixed;
    // top: 0;
    span{
      display:block;
      text-align:center;
      // margin:auto;
      margin-right: 2%;
       font-size: 38px;

    }
}
</style>