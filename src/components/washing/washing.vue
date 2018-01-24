<template>
  <section class="listBox">
    <Menu mode="horizontal" active-name="list" class="bucaoMenu" @on-select="_menuOnselect">
      <MenuItem name="list">
      <Icon type="ios-list"></Icon>
      布草列表
      </MenuItem>
      <MenuItem name="type">
      <Icon type="grid"></Icon>
      布草类别
      </MenuItem>
      <MenuItem name="store">
      <Icon type="clipboard"></Icon>
      库存日志
      </MenuItem>
    </Menu>
    <br>
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
      _menuOnselect(name) {
        this.$router.push(`/admin/bucao/${name}`)
      }
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