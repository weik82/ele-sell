<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="main">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getData} from './config/api';
  import vHeader from './components/common/header/header.vue';

  export default {
    name: 'app',
    components: {vHeader},
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.getSeller();
    },
    methods: {
      getSeller() {
        getData('seller').then((result) => {
          result = result.data;
          if (result.code === 0) {
            console.log(result);
            this.seller = result.data;
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import './assets/stylus/mixin.styl';

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-down-1px(rgba(7, 17, 27, 0.1));
      .tab-item {
        flex: 1;
        text-align: center;
        a {
          font-size: 1.4rem;
          &.link-active {
            color: rgb(240, 20, 20)
          }
        }
      }
    }
    .main {
      width: 100%
      flex: 1
    }
  }
</style>
