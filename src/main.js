import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueRouter);
Vue.use(VueResource);

import App from './App'

/*
 import Goods from './components/goods.vue'
 import Ratings from './components/ratings.vue'
 import Seller from './components/seller.vue'
*/

//路由懒加载
const Goods = resolve => require(['./components/goods.vue'], resolve);
const Ratings = resolve => require(['./components/ratings.vue'], resolve);
const Seller = resolve => require(['./components/seller.vue'], resolve);

const router = new VueRouter({
  //mode: 'history',                  //html5模式 去掉锚点
  linkActiveClass: 'active',      //设置active-class，默认router-link-active
  routes: [
    { path: '/', component: Goods, meta:{title: 'sell'}},
    { path: '/goods', component: Goods, meta:{title: '商品'}},
    { path: '/ratings', component: Ratings, meta:{title: '评价'}},
    { path: '/seller', component: Seller, meta:{title: '商家'}},
    { path: '/*', component: Goods }
  ]
});

//修改title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

new Vue({
  el: '#app',
  created: function () {
    this.$router.push({path: '/goods'});
  },
  router: router,
  template: '<App/>',
  components: {App}
});
