<template>
  <section class="content">
    <loading v-show="showloading"></loading>
    <div class="headerBox">
      <img style="width:35px;cursor:pointer" src="~common/image/btn_back.png" alt="返回" @click="_back">
      <p>RFID管理</p>
      <span>{{pageType}}</span>
    </div>
    <div class="formBox">
      <div class="inputBox"><div class="title">RIIF标识 <span>*</span></div> <input type="text" v-model="uploadObj.name" placeholder="请输入名称"></div>
      <div class="inputBox">
        <div class="title">
          布草名称 <span>*</span>
        </div>
        <AutoComplete
          class="inputLike"
          v-model="uploadObj.linenname"
          :data = "kindList"
          @on-search="_serachList"
          placeholder="请输入布草名称"
          ></AutoComplete>
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
      userimg() {
        if(this.imgFile){
          return this.imgFile
        }
        return require('common/image/button_addHouse.png')
      },
    },
    data() {
      return {
        pageType:'',
        uploadObj:{},
        showloading:false,
        files:null,
        imgFiles:null,
        uploadImgs: [],
        kindList:[]
      }
    },
    mounted() {
      if(this.$route.params.id !== 'add') {
        this.pageType = '编辑页面'
        // this._getDetial(this.$route.params.id)
      }else{
        this.pageType = '添加页面'
        
      }
      document.title = this.pageType
      this._serachList('')
    },
    methods: {
      _back() {
        this.$router.back()
      },
      selectImg() {
        this.$refs.uploadFiles.$refs.file.click()
      },
      deleteUploadImg(index) {
        this.uploadImgs.splice(index,1)
      },
      submitClick() {
        this._upload()
        return 
        if(!this.file){
          alert('请选择广告图片')
          return
        }
        this.showloading =true
        this._uploadImg(this.file)
      },
      _serachList(val) {
        apiReq.linenKindQuery({searchword: val}).then((res) => {
          if(!res.code){
            let arr = []
            res.data.list.forEach(element => {
              arr.push(element.kindname)
            });
            if(arr.length){
              this.$set(this, 'kindList', arr)
              // console.log(this.$refs.autoComplete.data)
              // this.$refs.autoComplete.data.push(arr)
            }
          }else{
            alert(res.msg)
          }
        })
      },
      _getDetial(linenid) {
        apiReq.rfidUpdate({linenid: linenid}).then((res) => {
          if(!res.code){
            this.uploadObj = res.data
          }else{
            alert(res.msg)
          }
        })
      },
      _uploadImg(imgObj) {
        let _this = this
        uploadImg('',imgObj).then((res) => {
          if(!res.code){
            _this.showloading =false
            _this.uploadObj.picurl = res.data.headimg
            _this._upload()
          }else{
            alert(res.msg)
            _this.showloading =false
          }
        })
      },
      _upload() {
        let _this = this
        apiReq.rfidUpdate(_this.uploadObj).then((res) => {
          if(!res.code){
            alert('提交成功')
            _this.$router.replace({
              path: '/admin/bucao'
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
          fieldName: 'file'
        }).then(function (rst) {
          _this.uploadImgs.push({
            src: rst.base64,
            file: rst.formData
          })
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
      input
        width 400px
        line-height 35px
        text-indent 10px
        border 1px solid #dddee1
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