import Vue from 'vue';
import Router from 'vue-router';
import Goods from '../components/page/goods/goods.vue';
import Ratings from '../components/page/ratings/ratings.vue';
import Seller from '../components/page/seller/seller.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
