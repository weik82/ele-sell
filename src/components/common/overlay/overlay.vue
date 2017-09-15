<template>
  <transition name="fade">
    <div class="overlay" :style="overStyle" @click="overlayAction" v-if="overlayShow"></div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'overlay',
    props: {
      zIndex: {
        type: Number
      },
      overlayShow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      overStyle() {
        return {
          'z-index': this.zIndex
        }
      }
    },
    methods: {
      overlayAction() {
        this.$emit('action');
      }
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus" type="text/stylus">
  .overlay {
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0
      background: rgba(7, 17, 27, 0)
    }
  }
</style>
