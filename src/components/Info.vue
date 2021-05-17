<template>
  <div>
      <div class="content">
          <span class="p1">{{cover.deptName}}</span>
      </div>
      <div class="content">
          <span class="p1">sn码：</span>
          <span class="p2">{{cover.chipCode}}</span>
      </div>
       <div class="content">
          <span class="p1">mcn码：</span>
          <span class="p2">{{cover.coverMcn}}</span>
      </div>
      <button class="location-btn" @click="openLocationFn()">导航</button>
  </div>
</template>

<script>
export default {
    props: ["cover"],
    watch:{
        cover:{
            handler (val, oldVal) {
                this.cover = val
            },
            deep: true
        },
    },
    methods:{
         openLocationFn(){
            this.$emit('openLocationFn');
        }
    }

}
</script>

<style lang="scss" scoped>
.content{
    margin-bottom: 10px;
    span{
        font-size: 28px;
    }
    .p1{
        color: #666;
    }
    .p2{
        color: #999;
    }

}
button{
    border: none;
    background-color: transparent;
    outline: none;  
}
.location-btn{
    border: 2px #666 solid;
    text-align: center;
    width: 200px;
    height: 60px;
    line-height: 60px;
    border-radius: 10px;
    color: #666;
    font-size: 30px;
}
</style>
