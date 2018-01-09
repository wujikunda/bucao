<template>
  <div id = "userCenter">
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
        <input ref="passWord" type="password" v-model="password"  placeholder="请输入密码"/>
      </div>
    </div>
    <div class="buttonC" @click="login">登录</div>
    <div class="linkto">
      <router-link tag="span" to="/register/1">立即注册</router-link>
      <span>|</span>
      <router-link tag="span" to="/register/2">忘记密码</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Wave from 'base/wave/wave'
  import {userLogin} from 'api/login'
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
            if(getPlatform()){
              this.$router.replace({
                path:'/home'
              })
            }else{
              this.$router.replace({
                path:'/pc/home'
              })
            }
            
          }else{
            alert(res.msg)
          }
          console.log('login',res)
        })
      },
      testPhone(phone) {
        let re = /^1\d{10}$/
        return re.test(phone)
      },
      ...mapMutations({
        setUserToken: 'SET_USER_TOKEN'
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
    top 0
    position fixed
    height 100%
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
    padding 0 20px
    width 100%
    box-sizing border-box
    line-height: 30px
    border-radius: 6px
    position relative
    .inputBox 
      border-bottom 1px solid $color-border
      padding 10px 0
      position relative
      display flex
      align-items center
      line-height 30px
      width 100%
      span 
        display inline-block
        width 95px
        font-weight bold
      input
        outline none
        flex 1
        line-height 30px
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
  .linkto
    color $color-theme
    margin-top 10px
    display flex
    text-align center
    align-items center
    width 100%
    justify-content center
    span
      padding 5px
        

</style>