<template>
  <section class="content">
    <loading v-show="showloading"></loading>
    <div class="headerBox">
      <img style="width:35px;cursor:pointer" src="~common/image/btn_back.png" alt="返回" @click="_back">
      <p>布草管理</p>
      <span>{{pageType}}</span>
    </div>
    <div class="formBox">
      <div class="inputBox"><div class="title">名称 <span>*</span></div> <Input class="inputLike" size="large"  type="text" v-model="uploadObj.name" placeholder="请输入名称"></Input></div>
      <div class="inputBox">
        <div class="title">
          种类名称 <span>*</span>
        </div>
        <AutoComplete
          class="inputLike"
          :size = "'large'"
          v-model="uploadObj.kindname"
          :data = "kindList"
          @on-search="_serachList"
          placeholder="请输入种类名称"
          ></AutoComplete>
      </div>
      <div class="inputBox"><div class="title">规格 <span>*</span></div><Input class="inputLike" size="large" type="text" v-model="uploadObj.specification" placeholder="请输入规格(mm)"></Input></div>
      <div class="inputBox"><div class="title">布草单价 <span></span></div> <Input class="inputLike" size="large" type="text" v-model="uploadObj.price" placeholder="请输入布草单价"></Input></div>
      <div class="inputBox"><div class="title">租赁单价 <span>*</span></div><Input class="inputLike" size="large" type="text" v-model="uploadObj.rentprice" placeholder="请输入租赁单价"></Input></div>
      <div class="inputBox"><div class="title">洗涤单价 <span>*</span></div><Input class="inputLike" size="large" type="text" v-model="uploadObj.washprice" placeholder="请输入洗涤单价"></Input></div>
      <div class="inputBox"><div class="title">库存 <span></span></div><Input class="inputLike" size="large" type="text" v-model="uploadObj.stock" placeholder="请输入数量"></Input></div>
      <div class="inputBox"><div class="title">总量 <span></span></div><Input class="inputLike" size="large" type="text" v-model="uploadObj.totalnum" placeholder="请输入数量"></Input></div>
      <div class="inputBox">
        <p class="title">logo<span>*</span></p>
        <div class="img">
          <img :src="userimg"  @click="selectImg2" class="needsclick" >
        </div> 
        <uploader ref="uploadFiles2"  @selectFinish="selectDone2" v-show="false"></uploader>
      </div>
      <div class="inputBox imgsBox">
        <div class="title">详情图 <span></span></div>
        <div class="picList">
          <div class="listBox">
            <div class="uploadImgBox" v-for="(item, index) in uploadImgs" :key="index">
              <img class="uploadItem" :src="item.src" >
              <img class="deletBtn" @click="deleteUploadImg(index)" style="cursor:pointer" src="~common/image/button_shanchu.png" alt="删除">
            </div>
            <div class="addButton"><img @click="selectImg" class="needsclick" style="cursor:pointer" src="~common/image/button_addHouse.png" alt="上传照片"></div>
          </div>
          <uploader ref="uploadFiles"  @selectFinish="selectDone" v-show="false" :hideImg="true"></uploader>
        </div>
      </div>
      <div class="inputBox"><div class="title">押金 <span>*</span></div><Input class="inputLike" size="large" type="text" v-model="uploadObj.cash" placeholder="请输入押金"></Input></div>
      <div class="inputBox"><div class="title">床体 <span>*</span></div><Input class="inputLike" size="large" type="text" v-model="uploadObj.body" placeholder="请输入质量标准"></Input></div>
      <div class="inputBox"><div class="title">质量标准 <span>*</span></div><Input class="inputLike" size="large" type="text" v-model="uploadObj.qualitystandard" placeholder="请输入质量标准"></Input></div>
      <div class="inputBox"></span></div>
        <input type="hidden" v-model="uploadObj.detail" placeholder="详情">
        <ueditor :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue1"></ueditor>
      </div>
    </div>
    <div class="buttonC" @click="submitClick">确认提交</div>
  </section>
</template>

<script type="text/ecmascript-6">
import {uploadImg} from 'api/setting'
import Ueditor from 'base/ue/ue'
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
        uploadObj:{
        },
        showloading:false,
        file:null,
        imgFile:null,
        uploadImgs: [],
        kindList:[],
        kindObject: {},
        defaultMsg: '请输入详细说明',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        ue1: "ue1"
      }
    },
    mounted() {
      if(this.$route.params.id !== 'add') {
        if(this.$route.path.indexOf('detial') < 0){
          this.pageType = '编辑页面'
        }else{
          this.pageType = '详情页面'
        }
        this._getDetial(this.$route.params.id)
      }else{
        this.pageType = '添加页面'
        this._serachList('')
      }
      document.title = this.pageType

    },
    methods: {
      _back() {
        this.$router.back()
      },
      selectImg() {
        this.$refs.uploadFiles.$refs.file.click()
      },
      selectImg2() {
        this.$refs.uploadFiles2.$refs.file.click()
      },
      deleteUploadImg(index) {
        this.uploadImgs.splice(index,1)
      },
      submitClick() {
        if(!this.uploadObj.kindname){
          alert('输入种类名称')
          return
        }
        if(!this.file && !this.uploadObj.logo){
          alert('请选择logo图片')
          return
        }
        this.uploadObj.kindid = this.kindObject[this.uploadObj.kindname]
        console.log(this.kindObject[this.uploadObj.kindname],this.uploadObj.kindname,this.uploadObj.kindid)
        this.showloading =true
        this._uploadImg(this.file)
      },
      _serachList(val) {
        if( val === undefined){
          return
        }
        apiReq.linenKindQuery({searchword: val}).then((res) => {
          if(!res.code){
            let arr = []
            let obj = {}
            res.data.list.forEach(element => {
              arr.push(element.kindname)
              obj[element.kindname] = element.id
              
            });
            if(arr.length){
              this.$set(this, 'kindList', arr)
              this.$set(this, 'kindObject', obj)
            }
          }else{
            alert(res.msg)
          }
        })
      },
      _getDetial(linenid) {
        apiReq.linenDetail({linenid: linenid}).then((res) => {
          if(!res.code){
            let keys = Object.keys(res.data)
            keys.forEach(element => {
              if(res.data[element] 
                && element !== 'updateDate'
                && element !== 'createDate'
              ){
                this.uploadObj[element] = res.data[element]
              }
            })
            console.log(this.uploadObj)
            this.imgFile = res.data.logo
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
            _this.uploadObj.logo = res
            _this._upload()
          }else{
            alert(res.msg)
            _this.showloading =false
          }
        })
      },
      _upload() {
        let _this = this
        apiReq.linenUpdate(_this.uploadObj).then((res) => {
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
      },
      selectDone2(file) {
        let _this = this
        lrz(file,{
          quality:0.7,
          fieldName: 'file'
        }).then(function (rst) {
          _this.file = rst.formData
          _this.imgFile = rst.base64
          _this.$refs.uploadFiles2.finished()
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
      loading,
      Ueditor
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
      img
        width 80px
        height 80px
        border 1px solid $color-theme
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
    cursor pointer
    height 50px
    left 50px
    line-height 50px
    margin 30px 0
</style>