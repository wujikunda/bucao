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
        <b class="refresh color-theme" @click="refresh">刷新</b>
        <b class="_edit" @click="refresh">添加</b>
      </p>
      <select>
        <option value="-1">种类</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <input-box @serachClick="_serachByPhone" class="inputBox" placeholder='搜索...'></input-box>
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
      }
    },
    mounted() {
      this.tabTitle = ['ID', '名称', '种类', '规格', 'logo', '库存']
      this.tabControls = [{
        text:'删除',
        icon: require('common/image/btn_trash.png'),
        funname:'delete',
        color :'#ef5b5c'
      },{
        text:'详情',
        icon: require('common/image/btn_xiangqing.png'),
        funname:'edit',
        color :'#5cb5f2'
      },
      ,{
        text:'编辑',
        icon: require('common/image/btn_xiangqing.png'),
        funname:'edit',
        color :'#5cb5f2'
      },
      ,{
        text:'入库',
        icon: require('common/image/btn_xiangqing.png'),
        funname:'edit',
        color :'#5cb5f2'
      },
      ,{
        text:'出库',
        icon: require('common/image/btn_xiangqing.png'),
        funname:'edit',
        color :'#5cb5f2'
      }]
      this._getDataList(1)
    },
    methods: {
      refresh() {
        this._getDataList( this.page )
      },
      _edit() {
        this.$router.push(`/admin/bucao/edit/${index}`)
      },
      _serachByPhone(query) {
        if(!query) {
          this.refresh()
          return
        }
      },
      cancel() {
        this.showDialog = false
      },
      confirm() {
        if(this.controlsType === 'delete') {
          return
          managerBeforeDel(this.deleteID).then((res) => {
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
        }else {
          this._toDetial(item[0].text)
        }
        
      },
      _getDataList( page ) {
        return
        managerBeforeList(page, 10).then((res) => {
          if(!res.code){
            this._formTabList(res.data.list)
            this.tabListNumber = parseInt(res.data.beforenum)
          }else{
            alert(res.msg)
          }
        })
      },
      _formTabList(list) {
        let newList = [];
        list.forEach((element, index) => {
          newList.push(
            [
              {
                type:'text',
                id:'beforeid',
                text:element.beforeid
              },
              {
                type:'text',
                id:'nickname',
                text:element.name
              },
              {
                type:'text',
                id:'phone',
                text:element.phone
              },
              {
                type:'text',
                id:'business',
                text:element.business
              },
              {
                type:'text',
                id:'areaname',
                text:element.areaname
              },
              {
                type:'text',
                id:'pricename',
                text:element.pricename
              },
              {
                type:'text',
                id:'address',
                text:element.address
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
      .refresh
        cursor pointer
        margin-left 20px
        &:hover
          text-decoration underline
      select
        line-height 50px
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