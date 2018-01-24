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
      <p class="listCount">布草库存列表 (共{{tabListNumber}}条记录)
        <b class="refresh color-theme" @click="refresh">刷新</b>
      </p>
      <select v-model="kindType">
        <option value="0">全部种类</option>
        <option :value="item.id" v-html="item.kindname" v-for="item in kindList">种类</option>
      </select>
      <input-box @serachClick="_serachByWord" class="inputBox" placeholder='搜索...'></input-box>
    </div>
    <table-list 
      :tabData="tabData" 
      :tabTitle="tabTitle" 
      :tabControls="tabControls" 
      :showTabControls="false"
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

  export default {
    props: {
    },
    computed: {
   
    },
    data() {
      return {
        showDialog:false,
        tabListNumber:0,
        tabData:[],
        tabTitle:[],
        tabControls:[],
        page:1,
        deleteID:-1,
        controlsType:"",
        kindType:'0',
        kindList:[]
      }
    },
    mounted() {
      this.tabTitle = ['ID', '名称', '种类', '库存类型', '数量', '时间', '操作人']
      this.tabControls = []
      this._getDataList(1)
      // this._getTypeList()
    },
    methods: {
      refresh() {
        this._getDataList( this.page )
      },
      _serachByWord(query) {
        if(!query) {
          this.refresh()
          return
        }
        this._serachList({searchword: query})
      },
      _serachList(obj) {
        apiReq.linenStockQuery(obj).then((res) => {
          if(!res.code){
            this._formTabList(res.data.list)
            this.tabListNumber = parseInt(res.data.listnum)
          }else{
            alert(res.msg)
          }
        })
      },
      cancel() {
        this.showDialog = false
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
      _toDetial(index) {
        this.$router.push(`/admin/bucao/edit/${index}`)
      },
      toPage(index) {
        this.page = index
        this._getDataList( this.page )
      },
      controls(type, item, index) {
        if(type==='delete') {
          this.deleteID = item[0].text
          this.controlsType = type
          this.showDialog = true
        }else if(type==='detial') {
          this.deleteID = item[0].text
          this.controlsType = type
          this._toDetial(this.deleteID)
        }else if(type==='edit') {
          this.deleteID = item[0].text
          this.controlsType = type
          this._toDetial(this.deleteID)
        }else if(type==='instock') {
          this.deleteID = item[0].text
          this.controlsType = type
          console.log(this.deleteID, this.controlsType)
        }else if(type==='outstock') {
          this.deleteID = item[0].text
          this.controlsType = type
          console.log(this.deleteID, this.controlsType)
        }else{
          this._toDetial(item[0].text)
        }
        
      },
      _getDataList( page ) {
        let data = {
          start: page,
          limit: 10
        }
        apiReq.linenStockList(data).then((res) => {
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
                id:'stocktype',
                text:element.stocktype === 1 ? "出库" : "入库",
                realVal:element.stocktype
              },
              {
                type:'text',
                id:'num',
                text:element.num
              },
              {
                type:'text',
                id:'linenid',
                text:element.linenid
              },
              {
                type:'text',
                id:'username',
                text:element.username,
                realVal:element.userid
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
            console.log('this',this)
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