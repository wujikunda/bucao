<template>
  <section class="content">
    <div class="headerBox">
      <img style="width:35px;cursor:pointer" src="~common/image/btn_back.png" alt="返回" @click="_back">
      <p>布草套件管理</p>
      <span>{{pageType}}</span>
    </div>
    <div class="formBox">
      <div class="inputBox"><div class="title">RFID标识 <span>*</span></div> <Input class="inputLike" size="large"  type="text" v-model="uploadObj.name" placeholder="请输入名称"></Input></div>
      <div class="inputBox">
        <div class="title">
          套件 <span>*</span>
        </div>
      </div>
      <Form ref="formDynamic" :model="formDynamic" :label-width="110" style="width: 400px" >
      <FormItem
        v-for="(item, index) in formDynamic.items"
        :key="index"
        :size = "'large'"
        :label="'套件名称'"
        :prop="'items.' + index + '.value'"
        :rules="{required: false, message: '', trigger: 'blur'}">
        <Row>
          <Col span="18">
            <AutoComplete
            class="inputLike"
            v-model="item.value"
            :data = "item.kindList"
            @on-search="_serachList($event, index)"
            placeholder="请输入种类名称"
            ></AutoComplete>
          </Col>
          <Col span="4" offset="1">
            <Button type="ghost" @click="handleRemove(index)">Delete</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="handleAdd" icon="plus-round">添加</Button>
          </Col>
        </Row>
      </FormItem>
      <!-- <FormItem>
          <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
          <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
      </FormItem> -->
      </Form>

      
    </div>
    <div class="buttonC" @click="submitClick">确认提交</div>
  </section>
</template>

<script type="text/ecmascript-6">
import {uploadImg} from 'api/setting'
import apiReq from 'api/admin'
import {mapGetters, mapMutations} from 'vuex'
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
        kindList:[],
        kindObject: {},
        index: 1,
        formDynamic: {
          items: [
            {
              value: '',
              index: 1,
              status: 1,
              kindList:[],
              kindObject: {},
            }
          ]
        }
      }
    },
    mounted() {
      if(this.$route.params.id !== 'add') {
          this.pageType = '编辑页面'
        this._getDetial(this.$route.params.id)
      }else{
        this.pageType = '添加页面'
        this._serachList('', 0)
      }
      document.title = this.pageType
    },
    methods: {
      _back() {
        this.$router.back()
      },
      submitClick() {
        
        this._setlinedids()
        if(!this.uploadObj.name || !this.uploadObj.linedids) {
          this.$Message.error('请填写必要数据!');
          return
        }
        this.showloading =true
        this._upload()
      },
      _setlinedids() {
        this.uploadObj.linedids = ''
        let tempArr = []
        this.formDynamic.items.forEach((item, index)=>{
          tempArr.push(item.kindObject[item.value])
        })
        this.uploadObj.linedids = tempArr.join('|')
      },
      _serachList(val, index) {
        if( val === undefined){
          return
        }
        apiReq.linenQuery({searchword: val}).then((res) => {
          if(!res.code){
            let arr = []
            let obj = {}
            res.data.list.forEach(element => {
              arr.push(element.name)
              obj[element.name] = element.linenid
            });
            if(arr.length){
              this.$set(this.formDynamic.items[index], 'kindList', arr)
              this.$set(this.formDynamic.items[index], 'kindObject', obj)
            }
          }else{
            alert(res.msg)
          }
        })
      },
      _getDetial(Packagelinensid) {
        this.uploadObj.id = Packagelinensid
        apiReq.packagelinensDetail({Packagelinensid: Packagelinensid}).then((res) => {
          if(!res.code){
            let keys = Object.keys(res.data)
            keys.forEach(element => {
              if(res.data[element] 
                && element !== 'updateDate'
                && element !== 'createDate'
              ){
                this.$set(this.uploadObj, element, res.data[element])
              }
            })
            console.log(this.uploadObj)
          }else{
            alert(res.msg)
          }
        })
      },
      _upload() {
        let _this = this
        apiReq.packagelinensUpdate(_this.uploadObj).then((res) => {
          if(!res.code){
            alert('提交成功')
            _this.$router.replace({
              path: '/admin/bucao/suite'
            })
          }else{
            alert(res.msg)
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
              this.$Message.success('Success!');
          } else {
              this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      },
      handleAdd () {
          this.index++;
          this.formDynamic.items.push({
              value: '',
              index: this.index,
              status: 1
          });
          
          this.$nextTick(()=>{
            this._serachList('', this.index-1)
          })
      },
      handleRemove (index) {
          this.formDynamic.items.splice(index, 1)
      }
    },
    watch: {
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
      .title
        width 110px
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