<template>
  <section class="content">
    <loading v-show="showloading"></loading>
    <div class="headerBox">
      <img style="width:35px;cursor:pointer" src="~common/image/btn_back.png" alt="返回" @click="_back">
      <p>广告管理</p>
      <span>{{pageType}}</span>
    </div>
    <div class="formBox">
      <div class="inputBox">广告名称 <span>*</span> <input type="text" v-model="adverObj.title" placeholder="输入名称"></div>
      <div class="inputBox">广告链接 <span>&nbsp</span><input type="text" v-model="adverObj.adverturl" placeholder="输入链接"></div>
      <div class="inputBox">
        <p>广告照片<span>*</span></p>
        <div class="img">
          <img :src="userimg"  @click="selectImg" class="needsclick" >
          <b>(1张)</b>
        </div> 
        <uploader ref="uploadFiles"  @selectFinish="selectDone" v-show="false"></uploader>
      </div>
    </div>
    <div class="buttonC" @click="submitClick">确认提交</div>
  </section>
</template>

<script type="text/ecmascript-6">
import {uploadImg} from 'api/setting'
import {managerAdvertAdd} from 'api/admin'
import loading from 'base/loading/loading'
import uploader from 'base/uploader/uploader'
import {mapGetters, mapMutations} from 'vuex'
import iMlrz from 'lrz'
  export default {
    props: {
    },
    computed: {
      userimg() {
        if(this.imgFile){
          return this.imgFile
        }
        return this.advertisement.picurl || require('common/image/button_addHouse.png')
      },
      ...mapGetters([
        'advertisement'
      ])
    },
    data() {
      return {
        pageType:'',
        adverObj:{},
        showloading:false,
        file:null,
        imgFile:null,
      }
    },
    mounted() {
      console.log(this.advertisement)
      if(this.advertisement.advertid) {
        this.pageType = '编辑页面'
        this.$set(this.adverObj, 'advertid', this.advertisement.advertid)
        this.$set(this.adverObj, 'title', this.advertisement.title)
        this.$set(this.adverObj, 'adverturl', this.advertisement.adverturl)
      }else{
        this.pageType = '添加页面'
        
        
      }
    },
    methods: {
      _back() {
        this.$router.back()
      },
      selectImg() {
        this.$refs.uploadFiles.$refs.file.click()
      },
      submitClick() {
        if(!this.file){
          alert('请选择广告图片')
          return
        }
        this.showloading =true
        this._uploadImg(this.file)
      },
      _uploadImg(imgObj) {
        let _this = this
        uploadImg('',imgObj).then((res) => {
          if(!res.code){
            _this.showloading =false
            _this.adverObj.picurl = res.data.headimg
            _this._managerAdvertAdd()
          }else{
            alert(res.msg)
            _this.showloading =false
          }
        })
      },
      _managerAdvertAdd() {
        let _this = this
        managerAdvertAdd(_this.adverObj).then((res) => {
          if(!res.code){
            alert('提交成功')
            _this.$router.replace({
              path: '/admin/advertisement'
            })
          }else{
            alert(res.msg)
          }
        })
      },
      selectDone(file) {
        let _this = this
        lrz(file,{
          quality:0.7,
          fieldName: 'headimg'
        }).then(function (rst) {
          _this.file = rst.formData
          _this.imgFile = rst.base64
          _this.$refs.uploadFiles.finished()
        }).catch(function (err) {
          alert('浏览器不支持上传图片')
        });
      }
    },
    watch: {
      advertisement(to, from) {
        console.log(to)
      }
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
      span 
        display inline-block
        color $color-theme
        font-weight bold
        margin-right 20px
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
      input
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