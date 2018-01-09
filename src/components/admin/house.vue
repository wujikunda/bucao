<template>
  <section class="listBox">
    <m-dialog v-show="showDialog">
      <div class="dialog">
        <div class="icon">
          <img src="~common/image/icon_gantanhao.png" alt="删除">
        </div>
        <div class="text">{{dialogText}}</div>
        <div class="btnBox">
          <span class="confirm" @click="confirm">确认</span>
          <span class="cancel" @click="cancel">取消</span>
        </div>
      </div>
    </m-dialog>
    <div class="headerBox">
      <p class="listCount">房源列表 (共{{tabListNumber}}条记录) <b class="refresh" @click="refresh">刷新</b></p>
      <select v-model="houseState" @change="refresh">
        <option value="-1">查看所有审核类别</option>
        <option value="0">{{getStateText('0')}}</option>
        <option value="1">{{getStateText('1')}}</option>
        <option value="2">{{getStateText('2')}}</option>
      </select>
      <select v-model="houseType" @change="refresh" >
        <option value="-1">查看所有类型</option>
        <option value="1">{{getHouseTypeText('1')}}</option>
        <option value="2">{{getHouseTypeText('2')}}</option>
        <option value="3">{{getHouseTypeText('3')}}</option>
        <option value="4">{{getHouseTypeText('4')}}</option>
      </select>
      <input-box @serachClick="_serach" class="inputBox" placeholder='请输入搜索内容...'></input-box>
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
import {managerHouseList, managerDelHouse, managerHouseState} from 'api/admin'
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
        selectHouseID:-1,
        controlsType:"",
        houseState:"-1",
        houseType:"-1",
        searchkey:"",
        dialogText:""
      }
    },
    mounted() {
      this.tabTitle = ['ID', '房源名称', '分类', '地址', '审核']
      this.tabControls = [{
        text:'删除',
        icon: require('common/image/btn_trash.png'),
        funname:'delete',
        color :'#ef5b5c'
      },{
        text:'详情',
        icon: require('common/image/btn_xiangqing.png'),
        funname:'detial',
        color :'#5cb5f2'
      },{
        text:'通过',
        icon: require('common/image/btn_tongguo.png'),
        funname:'adopt',
        color :'#48d66a'
      },{
        text:'不通过',
        icon: require('common/image/btn_butongguo.png'),
        funname:'unadopt',
        color :'#ac7a7a'
      }]
      this._getDataList(1)
    },
    methods: {
      refresh() {
        this._getDataList( this.page )
      },
      _serach(query) {
        this.searchkey = query
        this.refresh()
      },
      cancel() {
        this.showDialog = false
      },
      confirm() {
        if(this.controlsType === 'delete') {
          this._managerDelHouse()
        }else if(this.controlsType === 'adopt') {
          this._managerHouseState('1')
        }else if(this.controlsType === 'unadopt') {
          this._managerHouseState('2')
        }
      },
      _managerDelHouse() {
        managerDelHouse(this.selectHouseID).then((res) => {
            if(!res.code){
              this.refresh()
              this.showDialog = false
              alert('删除成功')
            }else{
              alert(res.msg)
            }
          })
      },
      _managerHouseState(state) {
        managerHouseState(this.selectHouseID,state).then((res) => {
          if(!res.code){
            this.refresh()
            this.showDialog = false
            alert('操作成功')
          }else{
            alert(res.msg)
          }
        })
      },
      toPage(index) {
        this.page = index
        this._getDataList( this.page )
      },
      controls(type,item,index) {
        if (type==='detial') {
          let obj = {}
          obj.listid = item[0].text
          obj.housetype = item[2].realVal
          this.selcetHome(obj)
          this.controlsType = type
        } else {
          this.selectHouseID = item[0].text
          switch(type){
            case 'delete':
              this.dialogText = `确定要删除吗?`
            break
            case 'adopt':
              this.dialogText = `确定要通过审核吗?`
            break
            case 'unadopt':
              this.dialogText = `确定不通过审核吗?`
            break
            default: 
              this.showDialog = false
              break
          }
          this.controlsType = type
          this.showDialog = true
        }
        
      },
      selcetHome(item) {
        this.$router.push({
          path:`/admin/houseDetial/${item.listid}`
        })
        this.setHomeDetial(item)
      },
      _getDataList( page ) {
        let obj = {}
        if(this.houseType !== "-1"){
          obj.housetype = this.houseType
        }
        if(this.houseState !== "-1"){
          obj.state = this.houseState
        }
        if(this.searchkey !== ""){
          obj.searchkey = this.searchkey
        }
        obj.start = page
        managerHouseList(obj).then((res) => {
          if(!res.code){
            this._formTabList(res.data.list)
            this.tabListNumber = parseInt(res.data.housenum)
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
                id:'houseid',
                text:element.houseid
              },
              {
                type:'text',
                id:'title',
                text:element.title
              },
              {
                type:'text',
                id:'housetype',
                text:this.getHouseTypeText(element.housetype),
                realVal:element.housetype
              },
              {
                type:'text',
                id:'address',
                text:element.address
              },
              {
                type:'text',
                id:'state',
                text:this.getStateText(element.state),
                realVal:element.state,
                color: element.state === '2' ? '#ef5b5c' : '#333',
                controlsLimit:element.state === '0' ? [0,1,2,3] : [0,1]
              }
            ]
          )
        });
        this.tabData = newList
      },
      getHouseTypeText(id) {
        switch (id) {
          case '1':
            return '厂房仓库'
            break;
          case '2':
            return '办公写字楼'
            break;
          case '3':
            return '店面'
            break;
          case '4':
            return '住房'
            break;
          default: return ''
            break;
        }
      },
      getStateText(id) {
        switch (id) {
          case '0':
            return '未审核'
            break;
          case '1':
            return '审核通过'
            break;
          case '2':
            return '审核未通过'
            break;
          default: return ''
            break;
        }
      },
      ...mapMutations({
        setHomeDetial: 'SET_HOME_DETIAL',
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
      align-items center
      justify-content space-between
      .refresh
        color $color-theme
        cursor pointer
        margin-left 20px
        &:hover
          text-decoration underline
      select
        line-height 50px
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