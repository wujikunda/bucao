<template>
  <div class="mask">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '加载中'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .mask
    position fixed
    width 100%
    left 0
    top 0
    height 100%
    z-index 999
    display flex
    background-color $color-background-d
    align-items center
    justify-content center
    .dialog
      background-color #fff
      .btnBox
        display flex
      .confirm,.cancel 
        cursor pointer
        padding 0 20px
        margin 10px
        border 1px solid $color-border
        line-height 35px
        height 35px
        display block
        border-radius 10px
        &:hover
          opacity 0.8
      .confirm 
        background-color $color-theme
        color white
</style>
