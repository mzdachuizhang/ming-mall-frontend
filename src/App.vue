<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view class="router-view" v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router'
  import { reactive, toRefs } from "vue"
  export default {
    setup() {
      const router = useRouter()
      const state = reactive({
        transitionName: 'slide-left'
      })
      router.beforeEach((to, from) => {
        if (to.meta.index > from.meta.index) {
          state.transitionName = 'slide-left' // 向左滑动
        } else if (to.meta.index < from.meta.index) {
          // 由次级到主级
          state.transitionName = 'slide-right'
        } else {
          state.transitionName = ''   // 同级无过渡效果
        }
      })
      return {
        ...toRefs(state)
      }
    }
  }
</script>

<style lang="less">
  html, body {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .router-view{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
  }

  #nav {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 1000;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .router-view{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active{
    height: 100%;
    will-change: transform;
    transition: all 300ms;
    position: absolute;
    backface-visibility: hidden;
  }
  .slide-left-enter-from{
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-to{
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-enter-from{
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-to{
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
</style>
