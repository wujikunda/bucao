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
      <p class="listCount">资金列表 (共{{tabListNumber}}条记录) <b class="refresh" @click="refresh">刷新</b></p>
      <input-box @serachClick="_serachByPhone" class="inputBox" placeholder='请输入手机号...'></input-box>
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
import {managerAccountList} from 'api/admin'
import {formatD} from 'common/js/util'

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
        searchMobile:""
      }
    },
    mounted() {
      this.tabTitle = ['ID', '金额', '时间', '流向', '用户手机']
      this.tabControls = [{
        text:'删除',
        icon: require('common/image/btn_trash.png'),
        funname:'delete',
        color :'#ef5b5c'
      }]
      this._getDataList(1)
    },
    methods: {
      refresh() {
        this._getDataList( this.page )
      },
      _serachByPhone(query) {
        this.searchMobile = query
        this.refresh()
      },
      cancel() {
        this.showDialog = false
      },
      confirm() {
        if(this.controlsType === 'delete') {
          managerDelUser(this.deleteID).then((res) => {
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
      toPage(index) {
        this.page = index
        this._getDataList( this.page )
      },
      controls(type,item) {
        if(type==='delete') {
          this.deleteID = item[0].text
          this.controlsType = type
        }
        this.showDialog = true
      },
      _getDataList( page ) {
        let obj = {}
        if(this.searchMobile){
          obj.mobile = this.searchMobile
        }
        obj.start = page
        obj.limit = 10
        managerAccountList(obj).then((res) => {
          if(!res.code){
            this._formTabList(res.data.list)
            this.tabListNumber = parseInt(res.data.billnum)
          }else{
            alert(res.msg)
          }
        })
      },
      _formTabList(list) {
        let newList = [];
        list.forEach(element => {
          newList.push(
            [
              {
                type:'text',
                id:'billid',
                text:element.billid
              },
              {
                type:'text',
                id:'money',
                text:parseFloat(element.money/100).toFixed(2) 
              },
              {
                type:'text',
                id:'createdate',
                text:formatD('yyyy.MM.dd hh:mm',new Date(element.createdate))
              },
              {
                type:'text',
                id:'way',
                text:element.way
              },
              {
                type:'text',
                id:'mobile',
                text:element.mobile
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
        color $color-theme
        cursor pointer
        margin-left 20px
        &:hover
          text-decoration underline
      .inputBox
        width 400px
</style>