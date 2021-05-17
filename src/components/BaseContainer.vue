<!--
 * @ Author: hongjiazhun
 * @ Create Time: 2020-11-03 15:56:55
 * @ Modified by: hongjiazhun
 * @ Modified time: 2020-11-16 16:51:39
 * @ Description:列表外层容器组件，用于监听滚动条，设置高度等
 -->

<template>
  <div ref="wrap" class="base-container">
    <!-- 内容 -->
    <slot></slot>

    <!-- 加载动画 -->
    <transition name="fade">
      <Loading v-show="$attrs.isLoading" />
    </transition>

    <!-- 无数据提示 -->
    <!-- <transition name="fade">
      <EmptyDataTips v-if="$attrs.isEmpty&&!$attrs.isLoading" />
    </transition> -->
  </div>
</template>

<script>
import Loading from '../components/Loading';
// import EmptyDataTips from '../components/EmptyDataTips';

export default {
  name: 'BaseContainer',
  components: {
    // 加载组件
    Loading: () => import('@/components/Loading.vue')
  },
  data() {
    return {
      scrollTimer: null
    }
  },
  components:{
    Loading,
    // EmptyDataTips
  },
  methods: {
    // 滚动
    scrollHandle() {
      var _that = this

      // 如果返回箭头函数，有bug，监听次数会累加
      // 使用function 则不会
      return function(e) {
        if (this.scrollTimer) clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          // 获取距离顶部的距离
          let scrollTop = e.target.scrollTop
          // 获取可视区的高度
          let wrapHeight = e.target.clientHeight
          // 获取滚动条的总高度
          let scrollHeight = e.target.scrollHeight
          // 把距离顶部的距离加上可视区域的高度
          // 等于或者大于滚动条的总高度就是到达底部
          if (scrollTop + wrapHeight >= scrollHeight) {
            _that.$emit('reachBottom')
          }
        }, 400)
      }
    }
  },
  mounted() {
    // 监听
    window.addEventListener('scroll', this.scrollHandle(), true)
  },
  destroyed() {
    // 移除
    window.removeEventListener('scroll', this.scrollHandle(), true)
  }
}
</script>

<style scoped>
.base-container {
  width: 100vw;
  height: 100%;
  /* height: 100vh; */
  /* height: calc(100vh - 93px); */
  margin-top: 3px;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>