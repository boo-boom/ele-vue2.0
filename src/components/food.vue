<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="cartcontrol-wrapper">
            <Cartcontrol :food="food"></Cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">
              加入购物车
            </div>
          </transition>
          <div class="price">
            <span class="now"><small>￥</small>{{food.price}}</span>
            <span class="old" v-show="food.oldPrice"><small>￥</small>{{food.oldPrice}}</span>
          </div>
        </div>
        <Split v-show="food.info"></Split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <Ratingselect :desc="desc" :selectType="selectType" :onlyContent="onlyContent" :ratings="food.ratings"
                        @select="selectRating" @toggle="toggleContent"></Ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import Cartcontrol from './cartcontrol.vue';
  import Split from './split.vue';
  import Ratingselect from './ratingselect.vue';
  import {formatDate} from './../assets/js/date';
  export default{
    components: {Cartcontrol, Split, Ratingselect},
    props: {
      food: {
        type: Object
      }
    },
    data(){
      return {
        showFlag: false,
        selectType: 2,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show(){
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide(){
        this.showFlag = false;
      },
      addFirst(event){
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      },
      selectRating(type){
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent(){
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === 2) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "./../assets/less/common";

  .food {
    position: fixed;
    top: 0;
    bottom: 48px;
    left: 0;
    z-index: 50;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition: all 0.2s linear;
    }
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%, 0, 0);
    }
    .food-content {
      .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        & > img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
    .content {
      padding: 0.9rem;
      background: #ffffff;
      position: relative;
      .title {
        margin-bottom: 0.4rem;
        line-height: 0.7rem;
        font-size: 0.7rem;
        color: rgb(7, 17, 27);
        font-weight: 700;
      }
      .detail {
        margin-bottom: 0.8rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.5rem;
        .sell-count, .rating {
          font-size: 0.5rem;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 0.6rem;
        }
      }
      .price {
        .now {
          font-size: 0.8rem;
          font-weight: bold;
          color: rgb(240, 20, 20);
          padding-right: 0.3rem;
          & > small {
            font-size: 0.6rem;
          }
        }
        .old {
          text-decoration: line-through;
          font-size: 0.5rem;
          color: rgb(147, 153, 159);
        }
      }
      .buy {
        position: absolute;
        right: 0.9rem;
        bottom: 0.9rem;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 0.6rem;
        box-sizing: border-box;
        border-radius: 0.6rem;
        background: rgb(0, 160, 220);
        color: #ffffff;
        font-size: 0.5rem;
        opacity: 1;
        &.fade-enter-active, &.fade-leave-active {
          transition: all 0.2s linear;
        }
        &.fade-enter, &.fade-leave-active {
          opacity: 0;
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 0.9rem;
        bottom: 0.55rem;
      }
    }
    .info {
      padding: 0.9rem;
      .title {
        line-height: 0.7rem;
        margin-bottom: 0.3rem;
        font-size: 0.7rem;
        color: rgb(7, 17, 27);
      }
      .text {
        line-height: 1.2rem;
        padding: 0 0.4rem;
        font-size: 0.6rem;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding: 0.9rem 0;
      .title {
        line-height: 0.7rem;
        margin-bottom: 0.3rem;
        padding: 0 0.9rem;
        font-size: 0.7rem;
        color: rgb(7, 17, 27);
      }
      .rating-wrapper{
        .border-1px(rgba(7, 17, 27, 0.1),top,before);
        .rating-item{
          position: relative;
          padding: 0.8rem 0.9rem;
          .border-1px(rgba(7, 17, 27, 0.1),bottom,after);
          .time{
            line-height: 0.5rem;
            font-size: 0.5rem;
            color: rgb(147, 153, 159);
          }
          .user{
            position: absolute;
            right: 0.9rem;
            top: 0.8rem;
            font-size: 0;
            .name{
              display: inline-block;
              line-height: 0.5rem;
              margin: 0.05rem 0.3rem 0 0;
              font-size: 0.5rem;
              color: rgb(147, 153, 159);
            }
            .avatar{
              display: inline-block;
              vertical-align: top;
              width: 0.6rem;
              height: 0.6rem;
              border-radius: 50%;
            }
          }
          .text{
            line-height: 0.8rem;
            font-size: 0.6rem;
            margin-top: 0.4rem;
            color: rgb(7,17,27);
            .icon-thumb_up, .icon-thumb_down{
              margin-right: 0.2rem;
              line-height: 0.8rem;
              font-size: 0.6rem;
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down{
              color: rgb(147, 153, 159);
            }
          }
        }
        .no-rating{
          padding: 0.8rem 0.9rem;
          font-size: 0.6rem;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
</style>
