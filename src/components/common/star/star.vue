<template>
  <div class='star' :class="starType">
    <span v-for="(item, index) in starItems" class="star-item" :class="item" :key="index"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const FULL_CREDIT = 5;
  const TYPE_ON = 'on';
  const TYPE_OFF = 'off';
  const TYPE_HALF = 'half';
  export default {
    name: '',
    props: {
      size: {
        type: Number,
        default: 48
      },
      score: {
        type: Number
      }
    },
    methods: {},
    computed: {
      starType() {
        return 'star-' + this.size
      },
      starItems() {
        let result = [];
        let hasDecimal = this.score % 1 >= 0.5;
        let integer = Math.floor(this.score);
        for (let i = 0; i < integer; i++) {
          result.push(TYPE_ON);
        }
        if (hasDecimal) {
          result.push(TYPE_HALF);
        }
        while (result.length < FULL_CREDIT) {
          result.push(TYPE_OFF);
        }
        return result;
      }
    }
  }
</script>
<style lang='stylus' rel="stylesheet/stylus" type="text/stylus">
  @import "../../../assets/stylus/mixin.styl"
  .star {
    display: flex;
    justify-content space-between
    &.star-48 {
      .star-item {
        width: 20px
        height: 20px
        background-size: 20px 20px
        &.on {
          bg-image('star48_on')
        }
        &.half {
          bg-image('star48_half')
        }
        &.off {
          bg-image('star48_off')
        }
      }
    }
  }
</style>
