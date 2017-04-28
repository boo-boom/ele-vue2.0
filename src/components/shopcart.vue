<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass" @click.stop.prevent="pay">
            {{payDesc}}
          </div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-title">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.count * food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-if="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Cartcontrol from './cartcontrol.vue';
  export default{
    components: {Cartcontrol},
    props: {
      deliveryPrice: {
        type: Number,                 //指定数据类型
        default: 0                    //设置默认值
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,                  //对象与数组类型的默认值需写return
        default(){
          return [
            {price: 10, count: 1}
          ]
        }
      }
    },
    data(){
      return {
        foldShow: false
      }
    },
    computed: {
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((e) => {
          total += e.price * e.count;
        });
        return total;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((e) => {
          count += e.count;
        });
        return count;
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      payDesc(){
        if (this.totalPrice === 0) {
          //return '￥' + this.minPrice + '起送';
          return `￥${this.minPrice}起送`;               //ES6拼接字符串
        } else if (this.totalPrice < this.minPrice) {
          return '还差￥' + (this.minPrice - this.totalPrice) + '起送';
        } else {
          return '去结算';
        }
      },
      listShow(){
        if (!this.totalCount) {         //监听数据变化时计算属性（即时执行）
          return false;
        }
        let show = this.foldShow;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      toggleList(){
        if (!this.totalCount) {
          this.foldShow = false;
          return;
        }
        this.foldShow = !this.foldShow;
      },
      hideList(){
        this.foldShow = false;
      },
      empty(){
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay(){
        if(this.totalPrice < this.minPrice){
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "./../assets/less/common";

  .shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 70;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10px;
          width: 56px;
          height: 56px;
          margin: 0 5px 0 10px;
          padding: 6px;
          border-radius: 50%;
          box-sizing: border-box;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            text-align: center;
            border-radius: 50%;
            background: #2b343c;
            &.highlight {
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight {
                color: #ffffff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            min-width: 24px;
            height: 16px;
            line-height: 16px;
            border-radius: 16px;
            text-align: center;
            font-size: 10px;
            font-weight: bold;
            color: #ffffff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
          font-weight: 700;
          &.highlight {
            color: #ffffff;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin: 12px 0 0 12px;
          font-size: 10px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .shopcart-list {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      overflow: hidden;
      background: #ffffff;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active, &.fold-leave-active {
        transition: all 0.2s linear;
      }
      &.fold-enter, &.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .list-title {
        height: 2rem;
        line-height: 2rem;
        padding: 0 0.9rem;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 0.7rem;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 0.6rem;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 0.9rem;
        max-height: 10.5rem;
        overflow: hidden;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          .border-1px(rgba(7, 17, 27, 0.1));
          .name {
            line-height: 1.2rem;
            font-size: 0.7rem;
            font-weight: 700;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 4.5rem;
            bottom: 0.6rem;
            line-height: 1.2rem;
            font-size: 0.7rem;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            bottom: 0.3rem;
            right: 0;
          }
        }
      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 60;
    background: rgba(7, 17, 27, 0.6);
    opacity: 1;
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.2s linear;
    }
    &.fade-active, &.fade-leave-active {
      opacity: 0;
    }
  }
</style>
