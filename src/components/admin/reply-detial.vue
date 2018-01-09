<template>
  <section class="content">
    <div class="headerBox">
      <img style="width:35px;cursor:pointer" src="~common/image/btn_back.png" alt="返回" @click="_back">
      <p>反馈详情</p>
    </div>
    <div class="formBox">
      <div class="inputBox"> <span>反馈详情</span> <textarea style="height:250px"  v-model="adverObj.content" disabled></textarea></div>
      <div class="inputBox"> <span>反馈状态</span><b>{{adverObj.dealText}}</b></div>
    </div>
    <div class="iconBox">
      <div class="btnBox green" @click="submitClick('2')"><img src="~common/image/btn_tongguo.png"> 处理 </div>
      <div class="btnBox regg" @click="submitClick('1')"><img src="~common/image/btn_butongguo.png" >不处理</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {managerFeedbackState} from 'api/admin'
import {mapGetters, mapMutations} from 'vuex'
  export default {
    props: {
    },
    computed: {
      ...mapGetters([
        'advertisement'
      ])
    },
    data() {
      return {
        adverObj:{},
      }
    },
    mounted() {
      this.$set(this.adverObj, 'content', this.advertisement.content)
      this.$set(this.adverObj, 'dealText', this.advertisement.dealText)
    },
    methods: {
      _back() {
        this.$router.back()
      },
      selectImg() {
        this.$refs.uploadFiles.$refs.file.click()
      },
      submitClick(type) {
        this._managerFeedbackState(type)
      },
      _managerFeedbackState(type) {
        let _this = this
        managerFeedbackState(_this.advertisement.id, type).then((res) => {
          if(!res.code){
            alert('操作成功')
            _this.$router.replace({
              path: '/admin/reply'
            })
          }else{
            alert(res.msg)
          }
        })
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .content
    width 100%
    .headerBox
      display flex
      align-items center
      margin 20px 0
      p
        margin 0 20px
      span
        color #909090
    .formBox
      margin-left 50px
    .inputBox 
      color #909090
      padding 10px 0
      position relative
      display flex
      line-height 35px
      width 100%
      span 
        display inline-block
        font-weight bold
        margin-right 20px
        width 95px
      .img
        text-align center
        line-height 50px
        img
          display block
          width 100px
          height 100px
      .icon
        width 15px
        height 15px
      input,textarea
        width 600px
        line-height 35px
        text-indent 10px
        border 1px solid $color-text-d
        background: $color-white
        border-radius 5px
        color: $color-text
        font-size: $font-size-medium-x
        &::placeholder
          color: $color-text-d
  .iconBox
    display flex
    align-items center
    margin-left 165px
    .btnBox
      cursor pointer
      display flex
      align-items center
      margin-right 30px
    .green
      color #48d663
    .regg
      color #ac7a7a
  .buttonC
    color $color-white
    background-color $color-theme
    buttonD()
    width 200px
    height 50px
    left 140px
    line-height 50px
    margin 0
</style>