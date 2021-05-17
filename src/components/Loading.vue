<!--
 * @ Description:loading组件
 -->

<template>
  <div class="loading-content">
    <div class="loader"></div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: '加载中'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-content {
  position: fixed;
  width: 250px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.45);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  .title {
    position: absolute;
    left: 50%;
    top: 76%;
    color: #ffffff;
    transform: translate(-50%, -76%);
    font-size: 30px;
  }
}

.loader {
  width: 2.5em;
  height: 2.5em;
  position: absolute;
  top: calc(40% - 1.25em);
  left: calc(50% - 1.25em);
  transform: rotate(165deg);
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}
.loader:before {
  animation: before 2s infinite;
}
.loader:after {
  animation: after 2s infinite;
}

@keyframes before {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
      -1em 0.5em rgba(111, 202, 220, 0.75);
  }
  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75),
      0 0.5em rgba(111, 202, 220, 0.75);
  }
  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75),
      1em 0.5em rgba(111, 202, 220, 0.75);
  }
  100% {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
      -1em 0.5em rgba(111, 202, 220, 0.75);
  }
}
@keyframes after {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
      -0.5em -1em rgba(233, 169, 32, 0.75);
  }
  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75),
      -0.5em 0 rgba(233, 169, 32, 0.75);
  }
  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75),
      -0.5em 1em rgba(233, 169, 32, 0.75);
  }
  100% {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
      -0.5em -1em rgba(233, 169, 32, 0.75);
  }
}
/**
 * Attempt to center the whole thing!
 */
html,
body {
  height: 100%;
}
</style>