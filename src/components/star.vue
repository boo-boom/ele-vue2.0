<template>
  <div class="star" :class="starType">
    <span class="star-item" :class="item" v-for="item in itemClasses"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default{
    props: ['size', 'score'],
    created: function () {},
    computed: {
      starType: function () {
        return 'star-' + this.size;
      },
      itemClasses: function () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;      //计算总评分
        let hasDecimal = score % 1 !== 0;         //计算出是否有0.5分
        let integer = Math.floor(score);          //计算整数
        for(let i=0;i<integer;i++){
            result.push(CLS_ON);
        }
        if(hasDecimal){
            result.push(CLS_HALF);
        }
        for(let i=0;i<LENGTH-result.length;i++){      //添加空的星星
            result.push(CLS_OFF);
        }
        return result;
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "./../assets/less/common";

  .star {
    display: inline-block;
    background-repeat: no-repeat;
    &.star-48 {
      .star-item {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 1rem;
        background-size: 1rem 1rem;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-img('star48_on');
        }
        &.half {
          .bg-img('star48_half');
        }
        &.off {
          .bg-img('star48_off');
        }
      }
    }
    &.star-36 {
      .star-item {
        display: inline-block;
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.3rem;
        background-size: 0.75rem 0.75rem;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-img('star36_on');
        }
        &.half {
          .bg-img('star36_half');
        }
        &.off {
          .bg-img('star36_off');
        }
      }
    }
    &.star-24 {
      .star-item {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.15rem;
        background-size: 0.6rem 0.6rem;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-img('star24_on');
        }
        &.half {
          .bg-img('star24_half');
        }
        &.off {
          .bg-img('star24_off');
        }
      }
    }
  }
</style>
