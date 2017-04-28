<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{'active':selectType===2}" @click="selectBtn(2,$event)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{'active':selectType===0}" @click="selectBtn(0,$event)">
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" :class="{'active':selectType===1}" @click="selectBtn(1,$event)">
        {{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      selectType: {
        type: Number,
        default: 2
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      ratings: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === 0;
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === 1;
        })
      }
    },
    methods: {
      selectBtn(type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);   //给父级事件传参并执行
      },
      toggleContent(event){
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "./../assets/less/common";

  .ratingselect {
    .rating-type {
      font-size: 0;
      margin: 0 0.9rem;
      padding: 0.3rem 0 0.9rem 0;
      .border-1px(rgba(7, 17, 27, 0.1));
      .block {
        display: inline-block;
        padding: 0.4rem 0.6rem;
        margin-right: 0.4rem;
        line-height: 0.8rem;
        border-radius: 1px;
        font-size: 0.6rem;
        color: rgb(77, 85, 93);
        &.active {
          color: #fff;
        }
        &:last-child {
          margin-right: 0;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            background: rgb(0, 160, 220);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 0.6rem 0.9rem;
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        margin-right: 0.2rem;
        font-size: 1.2rem;
      }
      .text {
        display: inline-block;
        line-height: 0.6rem;
        vertical-align: top;
        margin-top: 0.3rem;
        font-size: 0.6rem;
      }
    }
  }
</style>
