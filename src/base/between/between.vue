<template>
  <div class="inputBox">
    <b v-html="title"></b>
    <input @click.stop.prevent="" type="text" @change.stop="pricenameIn($event,'min')"> - <input  @click.stop.prevent=""  type="text" @change.stop="pricenameIn($event,'max')">
    <span v-show="confirmBtn" style="margin-top:5px"  class="inputBtn" @click.stop="pricenameIn($event,'confirm')">确认</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      confirmBtn: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        pricename:{
          min:'',
          max:'',
        },
      }
    },
    methods: {
      pricenameIn(event,id){
        this.pricename[id] = event.target.value
        if(this.pricename.max && this.pricename.min ){
          let text = this.pricename.min + '-' + this.pricename.max 
          this.$emit('getValue', text)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
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
</style>