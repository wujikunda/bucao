<template>
  <div class="list-box">
    <ul class="tab-list">
      <li class="tab-title" >
        <div  :class="{'mincel': index===0 }" :key="index" v-for="(item, index) in tabTitle" class="cel">{{item}}</div>
         <div class="cel controlsBox" v-if="showTabControls" :style="`flex: 0 0 ${100*tabControls.length}px`"><div class="cel">操作</div></div>
      </li>
      <li :key="i" class="tab-item" @click="selectItem(item)" v-for="(item, i) in tabData">
        <div class="cel" :class="{'mincel': index===0 }" :key="index" v-for="(ele, index) in item">
          <span v-if="ele.type === 'text'"  :style="ele.color ? 'color:'+ele.color : '' ">{{ele.text || '--'}}</span>
          <span v-else><img class="cel-icon" :src="ele.text" alt="--"></span>
        </div>
        <div class="cel controlsBox" v-if="showTabControls" :style="`flex: 0 0 ${100*tabControls.length}px`">
          <div @click.stop="control(ele, item, i)" class="cel btnBox" v-for="(ele,index) in tabControls" :key="index" v-show="stateNeedShow(item,index)">
            <img :src="ele.icon">
            <span :style="'color:'+ele.color">{{ele.text}}</span>
          </div>
        </div>
      </li>
    </ul>
    <ul class="page-list" v-if="total">
      <li @click="toPage('prev')"><</li>
      <li :class="{'active' : item === currentPage}" @click="toPage(item)" v-for="item in pageCount" :key="item">{{item}}</li>
      <li @click="toPage('next')">></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tabData: {
        type: Array,
        default: []
      },
      tabTitle: {
        type: Array,
        default: []
      },
      showTabControls: {
        type: Boolean,
        default: false
      },
      tabControls: {
        type: Array,
        default: []
      },
      total: {
        type: Number,
        default: 0
      },
      onePageNumber: {
        type: Number,
        default: 10
      },
    },
    computed:{
      pageCount() {
        if(this.total){
          return Math.ceil(this.total/this.onePageNumber)
        }else{
          return 0
        }
      }
    },
    data() {
      return {
        currentPage:1
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      toPage(index) {
        if(index === 'prev' && this.currentPage !== 1){
          this.currentPage--
        }else if(index === 'next' && this.currentPage !== this.pageCount){
          this.currentPage++
        }else if(typeof index === 'number'){
          this.currentPage = index
        }
        this.$emit('toPage', this.currentPage)
      },
      control(fun,item, index){
        this.$emit('control', fun.funname, item, index)
      },
      stateNeedShow(item, index) {
        if(!item[4] || !item[4].controlsLimit){
          return true
        }
        return item[4].controlsLimit.indexOf(index) > -1
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .list-box
    .tab-list
      border 2px solid $color-border
      background-color #fff
    .tab-item
      &:hover 
        background-color #efeffe
    .tab-title
      .cel
        font-weight bold
    .tab-item,.tab-title
      display: flex
      border-bottom 1px solid $color-border
      box-sizing border-box
      align-items: center
      height: 50px
      text-align center
      overflow: hidden
      color: $color-text
      .cel
        flex: 1
        span
          display block
          line-height 20px
          max-height 50px
          overflow hidden
          text-overflow ellipsis
          display: -webkit-box;
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .cel-icon
          height 40px
          margin-bottom -2px
      .mincel
        flex 0 0 50px
      .controlsBox
        align-items: center
        height 100%
        display flex
        .btnBox
          cursor pointer
          display flex
          flex 0 0 100px
          height 100%
          align-items center
          justify-content center
          img
            width 18px
            margin-right 10px
          &:hover
            text-decoration underline
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
    .page-list
      display flex
      width 100%
      margin-top 10px
      align-items center
      justify-content center
      li
        width 35px
        line-height 35px
        cursor pointer
        text-align center
        margin 5px
        box-sizing border-box
        background-color #fff
        border-radius 10px
        border 1px solid $color-border
        &.active,&:hover 
          background-color $color-theme
          color $color-white
</style>