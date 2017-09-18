<template>
  <div class="goods">
    <div class="menu-wrap" ref="menuWrap">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item border-1px" :key="index" ref="menuItem"
            @click="selectMenu(index,$event)" :class="{'current':currentIndex===index}">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <ul>
        <li v-for="(item, index) in goods" class="food-list" :key="index" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" class="food-item border-1px" :key="index">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrap">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>
<script>
  import {getData} from '../../../config/api';
  import BScroll from 'better-scroll'
  import cartcontrol from '../../common/cartcontrol/cartcontrol.vue'
  import shopcart from '../../common/shopcart/shopcart.vue'

  export default {
    name: 'goods',
    components: {
      cartcontrol,
      shopcart
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        scrollY: 0,
        foodsHeight: []
      }
    },
    created() {
      this.getGoods();
    },
    methods: {
      getGoods() {
        getData('goods').then((result) => {
          result = result.data;
          if (result.code === 0) {
            this.goods = result.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            })
          }
        })
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let el = this.$refs.foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrap, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        for (let i = 0, item; item = foodList[i++];) {
          height += item.getBoundingClientRect().height;
          this.foodsHeight.push(height);
        }
      },
      _followScroll(index) {
        let el = this.$refs.menuItem[index];
        this.meunScroll.scrollToElement(el, 300);
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        this.$refs.shopcart.drop(target)
      }
    },
    computed: {
      currentIndex() {
        if (!this.foodsHeight.length) return 0;
        let index = this.foodsHeight.findIndex((element) => {
          return this.scrollY <= element - 2;
        });
        this._followScroll(index);
        return index;
      },
      selectFoods() {
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
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../../../assets/stylus/mixin.styl"
  .goods {
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrap, .foods-wrap {
      height: 100%
    }
    .menu-wrap {
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item {
        height: 54px
        padding: 0 12px
        line-height: 14px
        display: flex
        align-items center
        border-down-1px(rgba(7, 17, 27, 0.1))
        &.current {
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
        }
        .text {
          flex: 1
          font-size: 12px
          .icon {
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease {
              bg-image('decrease_3')
            }
            &.discount {
              bg-image('discount_3')
            }
            &.guarantee {
              bg-image('guarantee_3')
            }
            &.invoice {
              bg-image('invoice_3')
            }
            &.special {
              bg-image('special_3')
            }
          }
        }
      }
    }
    .foods-wrap {
      flex: 1
      .title {
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      }
      .food-item {
        display: flex
        padding: 18px
        border-down-1px(rgba(7, 17, 27, 0.1))
        &:last-child {
          border-none()
        }
        .icon {
          flex: 0 0 57px
          margin-right: 8px
        }
        .content {
          flex: 1
          position: relative
          .name {
            margin-bottom: 8px
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          }
          .desc, .extra {
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          }
          .desc {
            margin-bottom: 6px
          }
          .extra {
            .count {
              margin-right: 10px
            }
          }
          .price {
            font-weight: 700
            line-height: 22px
            .now {
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            }
            .old {
              text-decoration: line-through
              font-size: 12px
              color: rgb(147, 153, 159)
            }
          }
          .cartcontrol-wrap {
            position: absolute
            right: 0
            bottom: 0
          }
        }
      }
    }
  }
</style>
