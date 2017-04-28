<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">
          {{seller.bulletin}}
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="background">
      <img width="100%" height="100%" src="./../assets/img/seller_avatar_256px.jpg">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Star from "./star";
  export default{
    components: {Star},
    props: ['seller'],
    data(){
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow: false
      }
    },
    methods: {
      showDetail: function () {
        this.detailShow = true;
      },
      hideDetail: function () {
        this.detailShow = false;
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "./../assets/less/common";

  .header {
    position: relative;
    overflow: hidden;
    background: rgba(7, 17, 27, 0.5);
    .content-wrapper {
      padding-top: 1.2rem;
      line-height: 1;
      .avatar {
        display: inline-block;
        margin: 0 0 0.8rem 1.2rem;
        width: 3.5rem;
        height: 3.5rem;
        & > img {
          display: block;
          border-radius: 0.2rem;
          width: 100%;
          height: 100%;
        }
      }
      .content {
        display: inline-block;
        vertical-align: top;
        margin-left: 0.5rem;
        color: @white;
        .title {
          margin-bottom: 0.6rem;
          .brand {
            display: inline-block;
            vertical-align: top;
            margin-right: 0.1rem;
            width: 1.2rem;
            height: 0.8rem;
            .bg-img('brand');
          }
          .name {
            font-size: 0.8rem;
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 0.4rem;
          font-size: 0.7rem;
        }
        .support {
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 0.7rem;
            height: 0.7rem;
            margin-top: 0.1rem;
            &.decrease {
              .bg-img('decrease_1');
            }
            &.discount {
              .bg-img('discount_1');
            }
            &.guarantee {
              .bg-img('guarantee_1');
            }
            &.invoice {
              .bg-img('invoice_1');
            }
            &.special {
              .bg-img('special_1');
            }
          }
          .text {
            font-size: 0.7rem;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 0.5rem;
        bottom: 2rem;
        height: 1.5rem;
        line-height: 1.5rem;
        padding: 0 0.5rem;
        border-radius: 0.75rem;
        color: @white;
        background: rgba(0, 0, 0, 0.2);
      }
      .bulletin-wrapper {
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 1.5rem 0 0.5rem;
        color: #ffffff;
        font-size: 0.6rem;
        letter-spacing: 1px;
        background: rgba(7, 17, 27, 0.3);
        .bulletin-title {
          display: inline-block;
          vertical-align: top;
          margin-top: 0.3rem;
          width: 1rem;
          height: 0.6rem;
          .bg-img('bulletin');
        }
        .icon-keyboard_arrow_right {
          position: absolute;
          top: 0.3rem;
          right: 0.3rem;
        }
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      filter: blur(10px);
      width: 100%;
      min-height: 100%;
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.9);
      opacity: 1;
      &.fade-enter-active,
      &.fade-leave-active{
        transition: all 0.5s;
      }
      &.fade-enter,
      &.fade-leave-active{
        opacity: 0;
      }
      .detail-wrapper {
        width: 100%;
        min-height: 100%;
        .detail-main {
          margin-top: 3rem;
          margin-bottom: 3rem;
          color: @white;
          .name {
            text-align: center;
            font-size: 0.8rem;
          }
          .star-wrapper {
            text-align: center;
            padding: 0.8rem 0 1rem 0;
          }
          .title {
            width: 80%;
            margin: auto;
            display: flex;
            .line {
              flex: 1;
              .border-1px();
              &:after {
                bottom: 0.5rem;
              }
            }
            .text {
              padding: 0 0.5rem;
              font-size: 0.75rem;
              font-weight: bold;
            }
          }
          .supports{
            width: 80%;
            margin: 1.2rem auto;
            .support {
              padding-bottom: 0.6rem;
              .icon {
                display: inline-block;
                vertical-align: top;
                width: 0.7rem;
                height: 0.7rem;
                margin-top: 0.3rem;
                &.decrease {
                  .bg-img('decrease_2');
                }
                &.discount {
                  .bg-img('discount_2');
                }
                &.guarantee {
                  .bg-img('guarantee_2');
                }
                &.invoice {
                  .bg-img('invoice_2');
                }
                &.special {
                  .bg-img('special_2');
                }
              }
              .text {
                font-size: 0.7rem;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin: auto;
            .content{
              padding: 1.2rem 0.6rem 0 0.6rem;
              line-height: 1.2rem;
              color: rgba(255,255,255,0.8);
            }
          }
        }
      }
      .detail-close {
        margin-top: -3rem;
        line-height: 3rem;
        text-align: center;
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
</style>
