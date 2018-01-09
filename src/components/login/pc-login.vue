<template>
  <div id = "userCenter">
    <div class="pcbox">
      <wave class="waveBox">
        <div class="warpContent">
          <div class="imgBox">
            <img :src="userimg" alt="">
          </div>
        </div>
      </wave>
      <div class="box">
        <div class="inputBox">
          <span>手机号</span>
          <input ref="phoneInput" v-model="userphone"  placeholder="输入手机号"/>
        </div>
        <div class="inputBox">
          <span>密码</span>
          <input @keyup.enter="login" ref="passWord" type="password" v-model="password"  placeholder="请输入密码"/>
        </div>
      </div>
      <div class="buttonC" @click="login">登录</div>
      <div class="linkto">
        <router-link tag="span" to="/pc/register/1">立即注册</router-link>
        <span>|</span>
        <router-link tag="span" to="/pc/register/2">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Wave from 'base/wave/wave'
  import {userLogin, checkLogin} from 'api/login'
  import {userInfo} from 'api/setting'
  import {getPlatform} from 'common/js/util'
  import {mapMutations} from 'vuex'
  export default {
    props: {
    },
    data() {
      return {
        userimg: require('common/image/tab_center_normal.png'),
        password: '',
        userphone: ''
      }
    },
    mounted() {
    },
    methods: {
      login() {
        if(!this.testPhone(this.userphone)){
          alert("请输入正确的手机号")
          return  
        }
        userLogin(this.userphone, this.password).then((res) => {
          if(!res.code){
            this.setUserToken(res.data.accesstoken) 
            localStorage.setItem('usertoken',res.data.accesstoken)
            localStorage.setItem('__paycash__',res.data.paycash)
            this._toHomePage(res.data.accesstoken)
          }else{
            alert(res.msg)
          }
        })
      },
      _toHomePage(token){
        userInfo(token).then((res) => {
          if(!res.code){
            this.setUserInfo(res.data)
            if(getPlatform()){
              location.assign('/#/home')
            }else{
              location.assign('/#/pc/home')
            }
          }else{
            alert('请重新登录')
          }
        })
      },
      testPhone(phone) {
        let re = /^1\d{10}$/
        return re.test(phone)
      },
      ...mapMutations({
        setUserToken: 'SET_USER_TOKEN',
        setUserInfo:'SET_USER_INFO'
      })
    },
    components: {
      Wave
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #userCenter
    width 100%
    background-color $color-background
    z-index 2
    position absolute
    top 0
    height 100vh
  .pcbox
    width 1000px
    overflow hidden
    margin 0 auto
  .waveBox
    .warpContent
      height 100px
      top 25px
      width 50%
      color white
      .imgBox
        position relative
        left 50%
        width 60px
        margin 10px 0px 10px -30px
        background-color #fff
        border-radius 50%
        img
          width 60px
          height 60px
  .box
    background: $color-white
    padding 50px 20px
    width 100%
    box-sizing border-box
    line-height: 50px
    border-radius: 6px
    position relative
    .inputBox 
      border 1px solid $color-border
      padding 10px
      margin 30px 0
      position relative
      display flex
      align-items center
      line-height 50px
      span 
        display inline-block
        width 95px
        font-weight bold
      input
        outline none
        flex 1
        line-height 50px
        height 50px
        text-align right
        background: $color-white
        color: $color-text
        font-size: $font-size-medium-x
        &::placeholder
          color: $color-text-d
  .buttonC
    color $color-white
    background-color $color-theme
    buttonD()
    width 500px
    left 0
    margin 30px auto
  .linkto
    color $color-theme
    cursor pointer
    margin-top 10px
    display flex
    text-align center
    align-items center
    width 100%
    justify-content center
    span
      padding 5px
        

</style>