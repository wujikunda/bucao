<template>
  <div class="search-box">
    <div class="box" >
       <i class="icon-search"></i>
      <input ref="query" v-model="query"  :placeholder="placeholder"/>
    </div>
    <button class="searchBtn"  @click="serachClick">搜索</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      serachClick() {
        this.$emit('serachClick', this.query)
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    height: 50px
    .box
      flex: 1
      line-height: 50px
      border-radius: 6px
      margin-right: 15px
      position relative
      .icon-search
        font-size: 24px
        color: $color-text-9
        position absolute
        left 0
        top 0
        margin 13px
      input
        line-height: 35px
        width:100%
        text-indent: 40px
        background: $color-white
        color: $color-text
        border-radius: 6px
        border 2px solid $color-border
        font-size: $font-size-medium-x
        &::placeholder
          color: $color-text-d
    .searchBtn
      width 80px;
      height 35px;
      line-height: 30px
      background-color $color-theme
      color $color-white
      text-align center
      font-size $font-size-medium
      border none 
      border-radius 6px
</style>