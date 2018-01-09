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
      <p class="listCount">反馈列表 (共{{tabListNumber}}条记录) <b class="refresh" @click="refresh">刷新</b></p>
      <input-box @serachClick="_serachByPhone" class="inputBox" placeholder='请输入内容...'></input-box>
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
import {managerFeedbackList, managerFeedbackDel, managerFeedbackState} from 'api/admin'
import {formatD} from 'common/js/util'
import {mapGetters, mapMutations} from 'vuex'
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
      this.tabTitle = ['ID', '反馈内容', '是否处理', '反馈时间','处理时间']
      this.tabControls = [{
        text:'删除',
        icon: require('common/image/btn_trash.png'),
        funname:'delete',
        color :'#ef5b5c'
      },{
        text:'编辑',
        icon: require('common/image/btn_bianji_blue.png'),
        funname:'edit',
        color :'#5cb5f2'
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
          managerFeedbackDel(this.deleteID).then((res) => {
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
      _add() {
        this.setAdvertisement({})
        this.$router.push('/admin/addAdvertisement')
      },
      controls(type,item) {
        if(type==='delete') {
          this.deleteID = item[0].text
          this.controlsType = type
          this.showDialog = true
        }else if(type==='edit'){
          let obj = {}
          obj.id = item[0].text
          obj.content = item[1].text
          obj.dealstate = item[2].realVal
          obj.dealText = item[2].text
          this.setAdvertisement(obj)
          this.$router.push('/admin/replyDetial')
        }
        
      },
      _getDataList( page ) {
        let obj = {}
        obj.start = page
        obj.limit = 10
        if(this.searchMobile){
          obj.content = this.searchMobile
        }
        managerFeedbackList(obj).then((res) => {
          if(!res.code){
            this._formTabList(res.data.list)
            this.tabListNumber = parseInt(res.data.feedbacknum)
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
                id:'id',
                text:element.id
              },
              {
                type:'text',
                id:'content',
                text:element.content
              },
              {
                type:'text',
                id:'dealstate',
                text:this.getDealState(element.dealstate)
              },
              {
                type:'text',
                id:'create_date',
                text:formatD('yyyy.MM.dd',new Date(element.create_date)) || '--'
              },
              {
                type:'text',
                id:'dealdate',
                text:element.dealdate ? formatD('yyyy.MM.dd',new Date(element.dealdate)) : '--'
              }
            ]
          )
        });
        this.tabData = newList
      },
      getDealState( dealstate) {
        let str = ''
        switch (dealstate) {
          case '0':
            str = '未处理'
            break;
          case '1':
            str = '不处理'
            break;
          case '2':
            str = '已处理'
            break;
          default:
            str = '未处理'
            break;
        }
        return str
      },
      ...mapMutations({
        setAdvertisement: 'SET_ADVERTISEMENT'
      })
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