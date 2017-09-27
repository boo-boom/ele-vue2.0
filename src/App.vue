<template>
  <div class="app">
    <Vheader :seller="seller"></Vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" >评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import Vheader from './components/header.vue';
  //import axios from 'axios';
  export default {
    name: 'app',
    data(){
      return {
        seller: {}
      }
    },
    components: {
      Vheader
    },
    created: function () {
      this.getStoreInfo();
    },
    methods: {
      getStoreInfo: function () {
        const $url = apiURL + '/data.json';
        this.$http.get($url).then(function (response) {
          this.seller = response.body.seller;
        });
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import "./assets/less/common";

  .tab {
    display: flex;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    position: relative;
    z-index: 30;
    .border-1px(#ddd);
    .tab-item {
      flex: 1;
      background: @white;
      text-align: center;
      & > a {
        display: block;
        font-size: 0.7rem;
        color: @gray-dark;
        &.active {
          color: @red;
        }
      }
    }
  }
</style>