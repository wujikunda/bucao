<template>
  <div class="loading">
    <div class="loadingbox">
      <img class="Rotation" width="50" height="50" src="./loading.png">
      <p class="desc">{{title}}</p>
    </div>
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
  .loading
    width: 100%
    position fixed
    height 100%
    z-index 205
    display flex
    align-items center
    flex-direction column
    justify-content center
    text-align: center
  .loadingbox
    width 150px
    height 150px
    display flex
    align-items center
    flex-direction column
    justify-content center
    border-radius 20px
    background-color $color-background-d
    .desc
      margin-top 20px
      font-size: $font-size-large
      color: $color-white
  @keyframes rotation 
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
  .Rotation
    animation: rotation 3s linear infinite;
  
</style>
