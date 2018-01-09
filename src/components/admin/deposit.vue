<template>
  <section class="content">
    <div class="headerBox">
      <img style="width:35px;cursor:pointer" src="~common/image/btn_back.png" alt="返回" @click="_back">
      <p>押金管理</p>
    </div>
    <div class="formBox">
      <div class="inputBox"> <span>当前押金</span><b>¥{{payCash}}</b></div>
      <div class="inputBox"> <span>押金设置<b style="color:#ff5000">*</b></span> <input  v-model="upPayCash" placeholder="请输入要设置的押金" ></div>
    </div>
    <div class="buttonC" @click="_managerCashUpdate">确认提交</div>
  </section>
</template>

<script type="text/ecmascript-6">
import {managerCashGet, managerCashUpdate} from 'api/admin'
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
        payCash:0,
        upPayCash:""
      }
    },
    mounted() {
      this._managerCashGet()
    },
    methods: {
      _back() {
        this.$router.back()
      },
      _managerCashGet() {
        managerCashGet().then((res) => {
          if(!res.code){
            this.payCash = (parseFloat(res.data)/100).toFixed(2) 
          }else{
            alert(res.msg)
          }
        })
      },
      _managerCashUpdate() {
        if(!this.upPayCash ){
          alert('请输入设置金额')
        }
        let carsh = (parseFloat(this.upPayCash)*100)
        if(!carsh) {
          alert('只能输入数字和小数点')
          return
        }
        managerCashUpdate(carsh).then((res) => {
          if(!res.code){
            this._managerCashGet()
            this.upPayCash = ""
            alert("提交成功")
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
        width 400px
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
    height 40px
    left 160px
    line-height 40px
    margin 20px 0
</style>