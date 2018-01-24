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
              {icon:require('common/image/btn_back.png'),text: '布草管理',type:'bucao/list'},
              {icon:require('common/image/btn_back.png'),text: 'RFID管理',type:'rfid'},
              // {icon:require('common/image/btn_back.png'),text: '订单管理',type:'order'},
              // {icon:require('common/image/btn_back.png'),text: '酒店管理',type:'hotel'},
              // {icon:require('common/image/btn_back.png'),text: '洗涤厂管理',type:'washing'},
              // {icon:require('common/image/btn_back.png'),text: '用户管理',type:'member'},
              // {icon:require('common/image/btn_back.png'),text: '资金管理',type:'fund'},
              // {icon:require('common/image/btn_back.png'),text: '系统管理',type:'system'}
            ]
          }
        ]
      }
    },
    mounted() {
      // this.checkLogin()
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
      }
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