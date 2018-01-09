<template>
  <div class="sortBox">
    <ul class="sortMenuBox" >
      <li class="menu" v-for="(item,index) in dropData" :key="index" @click.stop='select(index)' style="cursor:pointer">
        <span v-if="singleTitle">{{singleTitle}}</span>
        <span v-else>{{item.title}}</span>
        <img v-show="selectIndex!==index || !showContent" src="~common/image/icon_arror_bottom.png" alt="">
        <img v-show="selectIndex===index && showContent" src="~common/image/icon_arror_top.png" alt="">
        <div class="sortContentBoxSingle" v-if="isSingle"  v-show="showContent && selectIndex===index" ref="singleMenu">
          <li class="content" v-for="(ele,i) in item.data" :key="i"  @click.stop="switchItem(item['funParam'],i,ele.id,ele.text)">
            <span :class="{ 'active' : i===item['currentIndex']}">{{ele.text}}</span>
          </li>
          <div class="inputBox" v-if="selectIndex == 2">
            <div>自定义:</div>
            <input @click.stop.prevent="" type="number" @change.stop="pricenameIn($event,'min')"> - <input  @click.stop.prevent=""  type="number" @change.stop="pricenameIn($event,'max')">
            <span style="margin-top:5px"  class="inputBtn" @click.stop="pricenameIn($event,'confirm')">确认</span>
          </div>
        </div>
      </li>
    </ul>
    <ul class="scrollBox">
      <scroll ref="scroll" :data="sortContentData.data" class="searchType-content" v-if="!isSingle"  v-show="showContent">
        <ul class="sortContentBox">
          <li class="content" v-for="(item,index) in sortContentData.data" :key="index">
            <span :class="{ 'active' : index===dropData[selectIndex]['currentIndex']}" @click="switchItem(dropData[selectIndex]['funParam'],index,item.id,item.text)">{{item.text}}</span>
          </li>
        </ul>
        <div class="inputBox" v-if="selectIndex == 2">
          自定义: <input @click.stop type="number" @change="pricenameIn($event,'min')"> - <input  type="number" @change="pricenameIn($event,'max')">
          <span class="inputBtn" @click="pricenameIn($event,'confirm')">确认</span>
        </div>
      </scroll>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
  export default {
    props: {
      dropData: {
        type: Array,
        default: {
          title: '',
          data: ['不限'],
          currentIndex: 0
        }
      },
      currentIndex: {
        type: Number,
        default: 0
      },
      singleTitle: {
        type: String,
        default: ''
      },
      isSingle:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        sortContentData: {},
        selectIndex: -1,
        showContent: false,
        pricename:{
          min:'',
          max:'',
        },
      }
    },
    methods: {
      switchItem(type, index, id, text) {
        
        this.dropData[this.selectIndex].currentIndex = index
        // this.showContent = false
        this.select(this.selectIndex)
        this.$emit('switch', type, index, id, text)
      },
      select(index) {
        if(index === this.selectIndex){
          this.showContent = !this.showContent
          return
        }
        this.selectIndex = index
        if(this.isSingle){
          this.changePos(index)
        }else{
          this.showContent = true
        }
        this.sortContentData = this.dropData[index]
      },
      pricenameIn(event,id){
        let data = this.dropData[this.selectIndex]
        let index = data.data.length 
        let type = data.funParam
        let nomb = index+1
        this.pricename[id] = event.target.value
        if(this.pricename.max && this.pricename.min && id =='confirm'){
          let text = this.pricename.min + '-' + this.pricename.max + '元/㎡'
          this.switchItem(type, index, nomb, text)
        }
      },
      changePos(index) {
        this.showContent = true
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .sortBox
    position relative
    background-color #fff
    .sortMenuBox
      display flex
      align-items center
      justify-content center
      .menu
        flex: 1
        position relative
        display: flex
        align-items: center
        justify-content center
        height 40px
        
        span 
          font-size: $font-size-medium
        img
          width: 12px
          margin 0 6px
  .scrollBox 
    max-height calc(100vh - 140px)
    overflow hidden
    position absolute
    z-index 101
    background-color #fff
    left 0
    top 40px
    width 100%
    box-shadow $box-shadow
    text-align center
  .searchType-content
    max-height calc(100vh - 140px)
    overflow hidden
  .sortContentBox
    .content
      display flex
      justify-content center
      align-items center
      height 30px
      .active
        color: $color-theme
  .inputBox
    color #909090
    padding 5px
    line-height 30px
    input
      width 60px
      text-indent 5px
      border 1px solid $color-border
      line-height 30px
      border-radius 3px
    .inputBtn
      background-color $color-theme
      color white
      display inline-block
      line-height 30px
      padding 0 10px
      border-radius 5px
  .sortContentBoxSingle
    position absolute
    z-index 101
    background-color #fff
    left 0
    top 50px
    left calc(50% - 100px)
    width 200px
    box-shadow $box-shadow
    text-align center
    .content
      display flex
      justify-content center
      align-items center
      height 40px
      .active
        color: $color-theme
</style>