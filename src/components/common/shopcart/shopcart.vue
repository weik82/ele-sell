<template>
  <div>
    <div class='shopcart'>
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrap">
            <div class="logo" :class="{'highlight':totalCount}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount}"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div v-for="(ball,index) in balls" class="ball-container" :key="index">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop" :css="false">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="overlayShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrap">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <overlay :z-index="40" :overlay-show="overlayShow" @action="hideOverlay"></overlay>
  </div>

</template>
<script type="text/ecmascript-6">
  import Velocity from 'velocity-animate';
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import overlay from '../overlay/overlay.vue';

  export default {
    name: 'shopcart',
    components: {
      overlay,
      cartcontrol
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
        dropBalls: [],
        droppingBall: null,
        overlayShow: false,
        scroll: null
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.overlayShow = !this.overlayShow;
        if (this.overlayShow) {
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
      },
      hideOverlay() {
        this.overlayShow = false;
      },
      drop(el) {
        for (let i = 0, ball; ball = this.balls[i++];) {
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            this.droppingBall = ball;
            return;
          }
        }
      },
      addFood(target) {
        this.drop(target);
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
        this.overlayShow = false;
      },
      beforeDrop(el) {
        let ball = this.droppingBall;
        let rect = ball.el.getBoundingClientRect(),
          inner = el.getElementsByClassName('inner-hook')[0],
          x = rect.left - 32,
          y = -(document.documentElement.clientHeight - rect.top - 32);
        Velocity(el, {opacity: 1, translateY: y, translateZ: 0,}, {duration: 0});
        Velocity(inner, {opacity: 1, translateX: x, translateZ: 0,}, {duration: 0});
      },
      dropping(el, done) {
        let inner = el.getElementsByClassName('inner-hook')[0];
        Velocity(el, {translateY: 0, opacity: 0}, {duration: 400, easing: [0.49, -0.29, 0.75, 0.41]});
        Velocity(inner, {translateX: 0, opacity: 0}, {duration: 410, easing: 'linear', complete: done});
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
        }
      }
    },
    watch: {
      totalCount(val) {
        if (!val) {
          this.overlayShow = false;
        }
      }
    },
    computed: {
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      totalPrice() {
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += food.price * food.count;
        });
        return price;
      },
      payClass() {
        return this.totalPrice < this.minPrice ? 'not-enough' : 'enough';
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      }
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus" type="text/stylus">
  @import "../../../assets/stylus/mixin.styl"
  .shopcart {
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    z-index: 50
    .content {
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      .content-left {
        flex: 1
        font-size: 0
        .logo-wrap {
          inline-block(top)
          position: relative
          top: -8px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          border-radius: 50%
          background: #141d27
          .logo {
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight {
              background: rgb(0, 160, 220)
            }
            .icon-shopping_cart {
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight {
                color: #fff
              }
            }
          }
          .num {
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 8px
            font-size: 10px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          }
        }
        .price {
          inline-block(top)
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight {
            color: #fff
          }
        }
        .desc {
          inline-block(top)
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
        }
      }
      .content-right {
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        .pay {
          flex: 0 0 105px
          width: 105px
          &.not-enough {
            background: #2b333b
          }
          &.enough {
            background: #00b43c
            color: #fff
            font-weight: 700
          }
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        .inner {
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
        }
      }
    }
    .shopcart-list {
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active {
        transition: all 0.5s
      }
      &.fold-enter, &.fold-leave-to {
        transform: translate3d(0, 0, 0)
      }
      .list-header {
        display: flex
        justify-content space-between
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title {
          font-size: 14px
          color: rgb(7, 17, 27)
        }
        .empty {
          font-size: 12px
          color: rgb(0, 160, 220)
        }
      }
      .list-content {
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food {
          position: relative
          padding: 12px 0
          border-down-1px(rgba(7, 17, 27, 0.1))
          display: flex
          align-items: center
          .name {
            flex: 0 0 70%;
            font-size: 14px
            color: rgb(7, 17, 27)
          }
          .price {
            flex: 0 0 10%;
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          }
          .cartcontrol-wrap {
            flex: 1
            text-align: right
          }
        }
      }
    }
  }
</style>
