<template>
  <section class="content">
    <div class="headerBox">
      <img style="width:35px;cursor:pointer" src="~common/image/btn_back.png" alt="返回" @click="_back">
      <p>预租详情</p>
    </div>
    <div class="formBox" v-if="adverObj">
      <div class="inputBox"><span>客户姓名</span> <input type="text" v-model="adverObj.name" readonly ></div>
      <div class="inputBox"><span>电话号码</span> <input type="text" v-model="adverObj.phone" readonly></div>
      <div class="inputBox"><span>业务范围</span> <input type="text" v-model="adverObj.business" readonly></div>
      <div class="inputBox"><span>预租面积</span> <input type="text" v-model="adverObj.areaname" readonly></div>
      <div class="inputBox"> <span>地址</span><input type="text" v-model="adverObj.address" readonly></div>
      <div class="inputBox"> <span>交通/车流量</span><input type="text" v-model="adverObj.transportation" readonly></div>
      <div class="inputBox"><span>楼层</span> <input type="text" v-model="adverObj.floor" readonly></div>
      <div class="inputBox"><span>层高</span> <input type="text" v-model="adverObj.floorheight" readonly></div>
      <div class="inputBox"><span>结构</span> <input type="text" v-model="adverObj.structure" readonly></div>
      <div class="inputBox"><span>价格</span> <input type="text" v-model="adverObj.pricename" readonly></div>
      <div class="inputBox"><span>租期</span> <input type="text" v-model="adverObj.tenancy" readonly></div>
      <div class="inputBox"><span>其他要求</span> <textarea type="text" v-model="adverObj.desc" disabled></textarea></div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {uploadImg} from 'api/setting'
import {managerBeforeDetail} from 'api/admin'
  export default {
    props: {
    },
    computed: {
    },
    data() {
      return {
        adverObj:{},
        showloading:false,
        file:null,
        imgFile:null,
      }
    },
    mounted() {
      this._managerBeforeDetail()
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
      _managerBeforeDetail() {
        let id = this.$route.params.id
        managerBeforeDetail(id).then((res) => {
          if(!res.code){
             this.$set(this, 'adverObj', res.data)
          }else{
            alert(res.msg)
          }
        })
      },
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
        width 100px
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
      input,textarea
        width 400px
        line-height 35px
        text-indent 10px
        border 1px solid $color-text-d
        background: $color-white
        border-radius 5px
        color: #909090
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