<template>
  <section class="listBox">
    <m-dialog v-show="showDialog">
      <div class="dialog">
        <div class="icon">
          <img src="~common/image/icon_gantanhao.png" alt="删除">
        </div>
        <div class="text">确定要删除吗?</div>
        <div class="btnBox">
          <span class="confirm" @click="confirm">确认</span>
          <span class="cancel" @click="cancel">取消</span>
        </div>
      </div>
    </m-dialog>
    <div class="headerBox">
      <p class="listCount">布草列表 (共{{tabListNumber}}条记录)
        <b class="refresh color-theme" @click="refresh" style="cursor:pointer">刷新</b>
        <b class="_edit" @click="_edit()" style="cursor:pointer">添加</b>
      </p>
      <select v-model="kindType" @change="_serachList">
        <option value='0'>全部种类</option>
        <option :value="item.id" v-html="item.kindname" v-for="item in kindList"></option>
      </select>
      <input-box @serachClick="_serachByWord" class="inputBox" placeholder='搜索...'></input-box>
    </div>
    <table-list 
      :tabData="tabData" 
      :tabTitle="tabTitle" 
      :tabControls="tabControls" 
      :showTabControls="true"
      @control="controls"
      @toPage = "toPage"
      :total="tabListNumber">
    </table-list>
  </section>
</template>

<script type="text/ecmascript-6">
import TableList from 'base/table-list/table-list'
import InputBox from 'components/admin/input-box'
import MDialog from 'base/dialog/dialog'
import apiReq from 'api/admin'
import {tablistMixin} from 'common/js/mixin'

  export default {
    mixins: [
      tablistMixin
    ],
    data() {
      return {
        kindList:[],
        kindType: '0'
      }
    },
    mounted() {
      this.tabTitle = ['ID', '名称', '种类', '规格', 'logo', '库存']
      this.tabControls = [{
        text:'删除',
        icon: require('common/image/btn_trash.png'),
        funname:'delete',
        color :'#ef5b5c'
      },
      {
        text:'详情',
        icon: require('common/image/btn_xiangqing.png'),
        funname:'detial',
        color :'#5cb5f2'
      },
      {
        text:'编辑',
        icon: require('common/image/btn_bianji_blue.png'),
        funname:'edit',
        color :'#5cb5f2'
      },
      {
        text:'入库',
        icon: require('common/image/btn_ruku.png'),
        funname:'instock',
        color :'#ac7a7a'
      },
      {
        text:'出库',
        icon: require('common/image/btn_chuku.png'),
        funname:'outstock',
        color :'#48d66a'
      }]
      this._getDataList(1)
      this._getTypeList()
    },
    methods: {
      _edit(index) {
        index ? this.$router.push(`/admin/bucao/edit/${index}`) : this.$router.push(`/admin/bucao/edit/add`)
      },
      _serachList() {
        let obj = {}
        if(this.serchQuery){
          obj.searchword = this.serchQuery
        }
        if(this.kindType !== '0'){
          obj.kindid = this.kindType
        }
        apiReq.linenQuery(obj).then((res) => {
          if(!res.code){
            this._formTabList(res.data.list)
            this.tabListNumber = parseInt(res.data.listnum)
          }else{
            alert(res.msg)
          }
        })
      },
      confirm() {
        if(this.controlsType === 'delete') {
          apiReq.linenDelete({linenid: this.deleteID}).then((res) => {
            if(!res.code){
              this.refresh()
              alert('删除成功')
              this.showDialog = false
            }else{
              alert(res.msg)
            }
          })
        }
      },
      _toDetial(index, type) {
        this.$router.push(`/admin/bucao/${type}/${index}`)
      },
      controls(type, item, index) {
        if(type==='delete') {
          this.deleteID = item[0].text
          this.controlsType = type
          this.showDialog = true
        }else{
          this.deleteID = item[0].text
          this.controlsType = type
          this._toDetial(this.deleteID,this.controlsType)
        }
        
      },
      _getDataList( page ) {
        let data = {
          start: page,
          limit: 10
        }
        apiReq.linenList(data).then((res) => {
          if(!res.code){
            this._formTabList(res.data.list)
            this.tabListNumber = parseInt(res.data.listnum)
          }else{
            alert(res.msg)
          }
        })
      },
      _formTabList(list) {
        let newList = [];
        // ['ID', '名称', '种类', '规格', 'logo', '库存']
        list.forEach((element, index) => {
          newList.push(
            [
              {
                type:'text',
                id:'linenid',
                text:element.linenid
              },
              {
                type:'text',
                id:'name',
                text:element.name
              },
              {
                type:'text',
                id:'kindname',
                text:element.kindname
              },
              {
                type:'text',
                id:'specification',
                text:element.specification
              },
              {
                type:'img',
                id:'logo',
                text:element.logo
              },
              {
                type:'text',
                id:'stock',
                text:element.stock
              }
            ]
          )
        });
        this.$set(this, 'tabData', newList)
      },
      _getTypeList() {
        let data = {
          start: 1,
          limit: 100
        }
        apiReq.linenKindList(data).then((res) => {
          if(!res.code){
            this.$set(this, 'kindList', res.data.list)
          }else{
            alert(res.msg)
          }
        })
      }
    },
    components: {
      TableList,
      InputBox,
      MDialog
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .listBox
    width 100%
    .dialog
      background-color #fff
      border-radius 10px
      width 350px
      height 200px
      line-height 30px
      display flex
      flex-direction column
      align-items center
      box-sizing border-box
      padding 20px 0
      .icon
        margin-top 10px
        img
          width 50px
    .headerBox
      padding 20px
      display flex
      line-height 50px
      justify-content space-between
      align-items center
      b 
        cursor pointer
        margin-left 20px
        &:hover
          text-decoration underline
      select
        line-height 40px
        min-width 100px
        text-align left
        padding 0 5px
        box-sizing content-box
        height 35px
        border-radius 5px
        border 1px solid $color-border
        background: $color-white
        color: $color-text
      .inputBox
        width 300px
</style>