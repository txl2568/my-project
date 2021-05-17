<template>
  <div>
      <Header :data="msg"></Header>
  </div>
</template>

<script>
import Header from '../components/Header2';
export default {
    data(){
        return{
            msg:'维修已办任务'
        }
    },
    components: {
        Header,
    
    },
}
</script>

<style>

</style>