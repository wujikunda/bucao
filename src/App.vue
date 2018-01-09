<template>
  <div id="app" @touchmove.prevent>

      <keep-alive>
        <router-view></router-view>
      </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
import {getPlatform} from 'api/login'
export default {
  data() {
    return {
      Platform: 1,
      type:''
    }
  },
  mounted() {
    this.Platform = getPlatform()
    if(this.$route.path.indexOf('admin') < 0 && this.$route.path !== '/'){
      this.type = 'app'
    }else{
      this.type = 'admin'
    }
  },
  watch: {
    $route(to, from){
      if(to.path.indexOf('admin') < 0){
        this.type = 'app'
      }else{
        this.type = 'admin'
      }
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus" >
  @import "~common/stylus/variable"
  footer
    position: fixed
    width:100%
    bottom: 0
    
</style>