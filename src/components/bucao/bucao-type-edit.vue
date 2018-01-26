<template>
  <section class="content">
    <loading v-show="showloading"></loading>
    <div class="headerBox">
      <img style="width:35px;cursor:pointer" src="~common/image/btn_back.png" alt="返回" @click="_back">
      <p>布草种类管理</p>
      <span>{{pageType}}</span>
    </div>
    <div class="formBox">
      <div class="inputBox">
        <div class="title">名称 <span>*</span></div> 
        <Input v-model="uploadObj.kindname" placeholder="请输入名称" class="inputLike" :size = "'large'" ></Input>
      </div>
    </div>
    <div class="buttonC" @click="submitClick">确认提交</div>
  </section>
</template>

<script type="text/ecmascript-6">
import {uploadImg} from 'api/setting'
import apiReq from 'api/admin'
import loading from 'base/loading/loading'
import uploader from 'base/uploader/uploader'
import {mapGetters, mapMutations} from 'vuex'
import iMlrz from 'lrz'
  export default {
    props: {
    },
    computed: {
    },
    data() {
      return {
        pageType:'',
        uploadObj:{},
        showloading:false,
        uploadImgs: []
      }
    },
    mounted() {
      if(this.$route.params.id !== 'add') {
        this.pageType = '编辑页面'
        this._getDetial(this.$route.params.id)
      }else{
        this.pageType = '添加页面'
        
      }
      document.title = this.pageType

    },
    methods: {
      _back() {
        this.$router.back()
      },
      submitClick() {
        this._upload()
      },
      _getDetial(linenid) {
        this.uploadObj.id = this.$route.params.id
        this.uploadObj.kindname = sessionStorage.getItem('__kindname__')
      },
      _upload() {
        let _this = this
        apiReq.linenKindUpdate(_this.uploadObj).then((res) => {
          if(!res.code){
            alert('提交成功')
            this.$router.back()
          }else{
            alert(res.msg)
          }
        })
      }
    },
    watch: {
    },
    components: {
      uploader,
      loading
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
      .title
        width 100px
      .picList
        padding 10px 0
        .listBox
          .addButton
            display inline-block
            img
              width 80px
              height 80px
              border-radius 3px
              border 1px solid $color-theme
          .uploadImgBox
            position relative
            display inline-block
            padding 10px 10px 10px 0
            .uploadItem
              width 80px
              height 80px
              border-radius 3px
              border 1px solid $color-theme
            .deletBtn
              position absolute
              top 2px
              right 2px
              width 16px
              height 16px
      span 
        display inline-block
        color $color-theme
        font-weight bold
        margin-right 20px
      .icon
        width 15px
        height 15px
      .inputLike
        height 40px
        width 400px
  .buttonC
    color $color-white
    background-color $color-theme
    buttonD()
    width 200px
    cursor pointer
    height 50px
    left 50px
    line-height 50px
    margin 30px 0
</style>