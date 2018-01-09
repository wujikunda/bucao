<template>
  <div class="header">
    <m-dialog v-show="showDialog">
      <div class="dialog">
        <p>修改密码</p>
        <div><input type="password" v-model="oldpw" placeholder="请输入原密码"></div>
        <div><input type="password" v-model="password" placeholder="请输入新密码"></div>
        <div><input type="password" v-model="repassword" placeholder="请确认密码"></div>
        <div class="btnBox">
          <span class="confirm" @click="confirm">确认</span>
          <span class="cancel" @click="cancel">取消</span>
        </div>
      </div>
    </m-dialog>
    <section class="headCont">
      <div class="logoBox">
        <img class="logo" src="~common/image/login_admin.png">
      </div>
      <div class="tab" >
        <div v-for="(item,index) in routerObj" :key="index"  class="tab-items">
          <div class="tab-item" style="cursor:pointer" @click="tabClick(item)">
            <img class="tab-icon" :src="item.incoPath">
            <span class="tab-link">{{item.title}}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import MDialog from 'base/dialog/dialog'
  import {managerModifyPW} from 'api/admin'
  import {mapMutations} from 'vuex'
  export default{
    data() {
      return {
        routerObj: [
          {path: '/pc/home', incoPath: require('common/image/icon_xiugai.png'), title: '修改密码',funParams:'midify'},
          {path: '/pc/compareList', incoPath: require('common/image/btn_logout.png'), title: '安全退出',funParams:'logout'}
        ],
        tabIconList: [],
        showDialog:false,
        account:"admin",
        oldpw:"",
        password:"",
        repassword:""
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      tabClick(item){
        if(item.funParams === 'midify') {
          this.showDialog = true
          // managerModifyPW() {
            
          // }
        }else if( item.funParams === 'logout'){
          this._logout()
        }
      },
      _logout() {
        this.setUserAdmin(false) 
        this.$router.push({
          path:'/admin/login'
        })
      },
      confirm() {
        this._managerModifyPW()
        
      },
      cancel() {
        this.showDialog = false
      },
      _managerModifyPW() {
        if(!this.repassword || !this.password || !this.oldpw) {
          alert('请完整输入')
          return
        }
        if(this.repassword !== this.password) {
          alert('新密码和旧密码不一致')
          return
        }
        managerModifyPW(this.account,this.oldpw,this.password).then((res) => {
          if(!res.code){
            alert('修改成功')
            this.showDialog = false
          }else{
            alert(res.msg)
          }
        })
      },
      ...mapMutations({
        setUserAdmin: 'SET_USER_ADMIN'
      })
    },
    components: {
      MDialog
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
.header
  background-color: $color-white
  box-shadow 0px 3px 3px -3px #bbb
  margin-bottom 3px
.dialog
  width 400px
  height 320px
  line-height 35px
  border-radius 10px
  display flex
  flex-direction column
  align-items center
  box-sizing border-box
  padding 20px 0
  font-size $font-size-medium-x
  p
    font-size $font-size-large
    margin 10px 0
  input
    border 1px solid #cbcbcb
    width 250px
    border-radius 3px
    text-indent 15px
    line-height 35px
    margin 10px auto
    &::placeholder
      color: $color-text-d
.headCont 
  width 100%
  box-sizing border-box
  padding 0 30px
  display flex
  height 100px
  align-items center
  justify-content space-between
  .logoBox
    display flex
    height 100px
    margin-left 20px
    align-items center
  .logo
    height 28px
.tab 
  display flex
  font-size: $font-size-medium;
  .tab-items 
    &>.router-link-active 
      .tab-link 
        color: $color-theme;
  .tab-item 
    display block
    padding 10px
    box-sizing border-box
    text-align center
    .tab-link 
      color: $color-text-l
      line-height: 20px
      display : block
    .tab-icon 
      width 25px
      margin 5px
</style>