<template>
  <div class='header'>
    <div class="content-wrap">
      <img class="avatar" width="64" height="64" :src="seller.avatar">
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="delivery">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[mapType.type]"></span>
          <span class="text">{{mapType.description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="toggleDetail(0)">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="notice-wrap" @click="toggleDetail(0)">
      <span class="notice-title"></span>
      <span class="notice-text"><span class="text">{{seller.bulletin}}</span></span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background" :style="bgImage"></div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrap">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrap">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="support">
            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="notice">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="toggleDetail(1)"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star.vue'

  export default {
    name: 'vHeader',
    components: {
      star
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    methods: {
      toggleDetail(flag) {
        this.detailShow = !flag;
      }
    },
    computed: {
      mapType() {
        let type = this.seller.supports ? this.seller.supports[0] : {};
        return {
          type: type.type,
          description: type.description
        }
      },
      bgImage() {
        return {
          background: 'url("' + this.seller.avatar + '") center/cover no-repeat'
        }
      }
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus" type="text/stylus">
  @import "../../../assets/stylus/mixin.styl"
  .header {
    position: relative
    height: 134px;
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrap {
      position: relative
      height: 106px
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar, .content {
        inline-block(top)
      }
      .avatar {
        border-radius: 2px
      }
      .content {
        margin-left: 16px
        .title {
          margin: 2px 0 8px 0
          .brand {
            inline-block(top)
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
          }
          .name {
            margin-left: 6px
            font-size: 1.6rem
            line-height: 18px
            font-weight: bold
          }
        }
        .delivery {
          margin-bottom: 8px
          line-height: 14px
          font-size: 1.2rem
        }
        .support {
          position: relative
          .icon {
            inline-block(top)
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            &.decrease {
              bg-image('decrease_1')
            }
            &.discount {
              bg-image('discount_1')
            }
            &.guarantee {
              bg-image('guarantee_1')
            }
            &.invoice {
              bg-image('invoice_1')
            }
            &.special {
              bg-image('special_1')
            }
          }
          .text {
            position: absolute
            height: 200%;
            width: 200%
            left: 16px
            top: 50%
            transform: translateY(-50%) scale(.5)
            transform-origin: 0 50%
            font-size: 2rem
            line-height: 24px
          }
        }
      }
      .support-count {
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        height: 22px
        line-height: 22px
        border-radius: 12px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count {
          line-height: 22px
          font-size: 10px
        }
        .icon-keyboard_arrow_right {
          line-height: 22px
          font-size: 10px
        }
      }
    }
    .background {
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    }
    .notice-wrap {
      height: 28px
      line-height: 28px
      display: flex
      align-items: center
      padding: 0 12px
      background: rgba(7, 17, 27, 0.2)
      .notice-title {
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
      }
      .notice-text {
        flex: 1
        height: 28px
        position: relative
        .text {
          position: absolute
          height: 200%;
          width: 200%
          left: 4px
          top: 50%
          transform: translateY(-50%) scale(.5)
          transform-origin: 0 50%
          font-size: 2rem
          line-height: 56px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        }
      }
      .icon-keyboard_arrow_right {
        font-size: 1rem;
      }
    }
    .detail {
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.9)
      display: flex
      flex-direction: column
      &.fade-enter-active, &.fade-leave-active {
        transition: opacity .5s
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0
      }
      .detail-wrap {
        width: 100%
        flex: 1
        padding: 60px 10%
        .name {
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        }
        .star-wrap {
          width: 200px
          margin: 18px auto 0 auto
          padding: 2px 0
          text-align: center
        }
        .title {
          display: flex
          align-items: center
          margin: 20px auto 16px auto
          .line {
            flex: 1
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          }
          .text {
            padding: 0 12px
            font-weight: 700
            font-size: 14px
          }
        }
        .support {
          .support-item + .support-item {
            margin-top: 10px
          }
          .support-item {
            padding: 0 12px
            font-size: 0
            .icon {
              display: inline-block
              width: 14px
              height: 14px
              vertical-align: top
              margin-right: 4px
              background-size: 14px 14px
              background-repeat: no-repeat
              &.decrease {
                bg-image('decrease_2')
              }
              &.discount {
                bg-image('discount_2')
              }
              &.guarantee {
                bg-image('guarantee_2')
              }
              &.invoice {
                bg-image('invoice_2')
              }
              &.special {
                bg-image('special_2')
              }
            }
            .text {
              line-height: 14px
              font-size: 12px
            }
          }
        }
        .notice {
          margin: 0 auto
          .content {
            text-align: justify
            text-indent: 2em
            padding: 0 12px
            line-height: 20px
            font-size: 12px
          }
        }
      }
      .detail-close {
        width: 100%
        height 32px
        flex: 0 0 32px
        text-align: center
        font-size: 32px
        margin-bottom: 32px
      }
    }
  }
</style>
