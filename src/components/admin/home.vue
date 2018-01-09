<template>
  <div id = "adminHome">
    <adminHead></adminHead>
    <section class="homeContent">
      <div class="menuContent">
        <ul class="menuBox" v-for="(item, index) in menuList" :key="index">
          <li v-for="(menu, id) in item.menuItem" :key="id" @click="menuClick(menu)">
            <div class="textBox">
              <span>{{menu.text}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="routerView">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminHead from 'components/admin/header'
  import MDialog from 'base/dialog/dialog'
  import {userInfo} from 'api/setting'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    props: {
    },
    computed: {
      ...mapGetters([
        'userAdmin'
      ])
    },
    data() {
      return {
        menuList: [
          {
            menuItem:[
              {icon:require('common/image/icon_dingdan.png'),text: '会员管理',type:'member'},
              {icon:require('common/image/icon_shoucang.png'),text: '房源管理',type:'house'},
              {icon:require('common/image/icon_duibi.png'),text: '预租管理',type:'preLease'},
              {icon:require('common/image/icon_qianbao.png'),text: '资金管理',type:'fund'},
              {icon:require('common/image/icon_fankui.png'),text: '广告管理',type:'advertisement'},
              {icon:require('common/image/icon_lianxi.png'),text: '反馈管理',type:'reply'},
              {icon:require('common/image/icon_shezhi.png'),text: '押金管理',type:'deposit'}
            ]
          }
        ]
      }
    },
    mounted() {
      this.checkLogin()
    },
    methods: {
      menuClick( item ) {
        this.$router.push({
          path:`/admin/${item.type}`
        })
      },
      checkLogin(){
        if(!this.userAdmin){
          this.$router.push({
            path:'/admin/login'
          })
        }
      },
      ...mapMutations({
        setUserInfo: 'SET_USER_INFO'
      })
    },
    components: {
      AdminHead,
      MDialog
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #adminHome
    width 100%
    height 100vh
    background-color $color-white
  .homeContent
    display flex
    width 100%
    height calc(100vh - 103px)
    .menuContent
      width 200px
      background-color #3c4254
      .menuBox
        color #cbcbcb
        padding-top 30px
        box-sizing border-box
        line-height: 50px
        position relative
        li
          .iconBox 
            float left
            width 60px
            height 45px
            padding-left 20px
            display flex
            align-items center
            justify-content center 
            img 
              width 25px
              height 25px
          .textBox 
            cursor pointer
            box-sizing border-box
            text-align center
            line-height 50px
            &:hover 
              background-color #272b38
    .routerView
      flex 1
      padding 0px 50px
      overflow-y scroll
      background-color #fafbfd
</style>