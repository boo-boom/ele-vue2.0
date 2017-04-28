<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
          <span class="text">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="foods-list" v-for="item in goods" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item" v-for="food in item.foods" @click="selectFood(food,$event)">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now"><small>￥</small>{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice"><small>￥</small>{{food.oldPrice}}</span>
                  </div>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></Shopcart>
    </div>
    <Food :food="selectedFood" ref="food"></Food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Shopcart from './shopcart.vue';
  import Cartcontrol from './cartcontrol.vue';
  import Food from './food.vue';
  export default{
    components: {Shopcart, Cartcontrol, Food},
    props: ['seller'],
    data(){
      return {
        goods: [],          //数据
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],    //类型class
        scrollY: 0,         //Y轴滚动距离
        listHeight: [],     //列表的高度
        selectedFood: {}    //详情
      }
    },
    created: function () {
      this.getGoodsInfo();
    },
    computed: {
      //当前滚动到的index
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      //将添加count字段的foods数组传参给子组件
      selectFoods(){
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      getGoodsInfo: function () {
        const $url = apiURL + '/data.json';
        this.$http.get($url).then((response) => {
          this.goods = response.body.goods;
          this.$nextTick(function () {
            this._initScroll();
            this._calculateHeight();
          });
        });
      },
      //点击切换滚动距离
      selectMenu: function (index, event) {
        //在pc中会触发2次事件
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      //滚动监听
      _initScroll: function () {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      //滚动总距离
      _calculateHeight: function () {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      //获取商品信息
      selectFood(food,event){
        if(!event._constructed){
          return;
        }
        this.selectedFood = food;
        //执行子组件下的函数
        this.$refs.food.show();
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "./../assets/less/common";

  .goods {
    display: flex;
    position: absolute;
    top: 8.7rem;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 90px;
      width: 90px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        width: 90px;
        height: 54px;
        line-height: 14px;
        padding: 0 10px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          & > span {
            font-weight: bold;
          }
          .text {
            .border-none();
          }
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 14px;
          height: 14px;
          &.decrease {
            .bg-img('decrease_3');
          }
          &.discount {
            .bg-img('discount_3');
          }
          &.guarantee {
            .bg-img('guarantee_3');
          }
          &.invoice {
            .bg-img('invoice_3');
          }
          &.special {
            .bg-img('special_3');
          }
        }
        .text {
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
          .border-1px(rgba(7, 17, 27, 0.2));
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .foods-list {
        .title {
          padding-left: 0.6rem;
          line-height: 1.3rem;
          font-size: 0.6rem;
          border-left: 2px solid #d9dde1;
          color: rgb(147, 153, 159);
          background: #f3f5f7;
        }
        .food-item {
          display: flex;
          //使用padding时在手机中会出现无法切换左侧菜单class
          margin: 0.9rem;
          padding-bottom: 0.9rem;
          .border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            padding-bottom: 0;
            .border-none();
            .cartcontrol-wrapper{
              margin-bottom: -0.9rem;
            }
          }
          .icon {
            flex: 0 0 3rem;
            width: 3rem;
            height: 3rem;
            margin-right: 0.5rem;
            border-radius: 0.1rem;
            overflow: hidden;
            & > img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .content {
            .name {
              font-weight: normal;
              font-size: 0.7rem;
            }
            .desc, .extra {
              font-size: 0.5rem;
              color: rgb(147, 153, 159);
            }
            .desc {
              line-height: 1rem;
            }
            .price {
              .now {
                font-size: 0.8rem;
                font-weight: bold;
                color: rgb(240, 20, 20);
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
          }
          .cartcontrol-wrapper {
            position: absolute;
            bottom: 10px;
            right: 0;
          }
        }
      }
    }
  }
</style>
