<template>
  <div id="app" @touchmove.prevent>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getPlatform
  } from 'api/login'
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    watch: {
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  footer
    position: fixed
    width:100%
    bottom: 0
    
</style>