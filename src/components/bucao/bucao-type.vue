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
      <p class="listCount">布草种类列表 (共{{tabListNumber}}条记录)
        <b class="refresh color-theme" @click="refresh">刷新</b>
        <b class="_edit" @click="_edit()">添加</b>
      </p>
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
    mixins: [tablistMixin],
    data() {
      return {
      }
    },
    mounted() {
      this.tabTitle = ['ID', '名称', '创建时间', '更新时间']
      this.tabControls = [{
        text:'删除',
        icon: require('common/image/btn_trash.png'),
        funname:'delete',
        color :'#ef5b5c'
      },
      {
        text:'编辑',
        icon: require('common/image/btn_xiangqing.png'),
        funname:'edit',
        color :'#5cb5f2'
      }]
      this._getDataList(1)
    },
    methods: {
      _edit(index) {
        index ? this.$router.push(`/admin/bucao/type/edit/${index}`) : this.$router.push(`/admin/bucao/type/edit/add`)
      },
      _serachList() {
        let obj = {}
        if(this.serchQuery){
          obj.searchword = this.serchQuery
        }
        apiReq.linenKindQuery(obj).then((res) => {
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
          apiReq.linenKindDelete({kindid: this.deleteID}).then((res) => {
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
      _toDetial(index) {
        this.$router.push(`/admin/bucao/type/edit/${index}`)
      },
      controls(type, item, index) {
        if(type==='delete') {
          this.deleteID = item[0].text
          this.controlsType = type
          this.showDialog = true
        }else if(type==='edit') {
          this.deleteID = item[0].text
          this.controlsType = type
          sessionStorage.setItem('__kindname__', item[1].text)
          this._toDetial(this.deleteID)
        }
        
      },
      _getDataList( page ) {
        let data = {
          start: page,
          limit: 10
        }
        apiReq.linenKindList(data).then((res) => {
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
                id:'id',
                text:element.id
              },
              {
                type:'text',
                id:'kindname',
                text:element.kindname
              },
              {
                type:'text',
                id:'createDate',
                text:element.createDate ? _this._formatD('yyyy.MM.dd hh:mm', new Date(element.createDate)) : '--'
              },
              {
                type:'text',
                id:'updateDate',
                text:element.updateDate ? _this._formatD('yyyy.MM.dd hh:mm', new Date(element.updateDate)) : '--'
              }
            ]
          )
        });
        this.tabData = newList
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