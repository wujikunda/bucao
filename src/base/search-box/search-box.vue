<template>
  <div class="search-box">
    <div class="box" >
       <i class="icon-search"></i>
      <input ref="query" v-model="query" @change="queryAccept" :placeholder="placeholder"/>
    </div>
    <button class="shaixuan"  @click="serachPage">筛选</button>
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
      serachPage() {
        if(this.$route.path.indexOf('/searchPage') < 0){
          this.$router.push({
            path:'/searchPage'
          })
          return
        }
        this.$router.replace({
          path:'/searchPage'
        })
      },
      queryAccept() {
        if(this.query){
          this.$emit('change', this.query)
        }
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
    padding: 0 15px
    height: 50px
    background: $color-white
      
    .box
      flex: 1
      background: $color-background
      line-height: 35px
      border-radius: 6px
      margin-right: 15px
      position relative
      .icon-search
        font-size: 24px
        color: $color-text-9
        position absolute
        left 0
        top 0
        margin 8px
      input
        line-height: 35px
        width:100%
        text-indent: 40px
        background: $color-background
        color: $color-text
        border-radius: 6px
        font-size: $font-size-medium
        &::placeholder
          color: $color-text-d
    .shaixuan
      width 60px;
      height 30px;
      line-height: 30px
      background-color $color-theme
      color $color-white
      text-align center
      font-size $font-size-medium
      border none 
      border-radius 6px
</style>