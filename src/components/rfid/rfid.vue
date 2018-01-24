<template>
  <section class="listBox">
    <router-view></router-view>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {},
    computed: {},
    data() {
      return {}
    },
    mounted() {},
    methods: {
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .bucaoMenu
    background-color #fafbfd
    li
      font-size $font-size-medium-x
</style>