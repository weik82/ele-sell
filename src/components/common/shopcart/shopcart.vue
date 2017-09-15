<template>
  <div>
    <div class='shopcart'>
      <div class="content">
        <div class="content-left" @click="show">
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
    </div>
    <overlay :z-index="40" :overlay-show="overlayShow" @action="hideOverlay"></overlay>
  </div>

</template>
<script type="text/ecmascript-6">
  import overlay from '../overlay/overlay.vue'

  export default {
    name: 'shopcart',
    components: {
      overlay
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
        overlayShow: false
      }
    },
    methods: {
      show() {
        this.overlayShow = true;
      },
      hideOverlay() {
        this.overlayShow = false;
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
  }
</style>