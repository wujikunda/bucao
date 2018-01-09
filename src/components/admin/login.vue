<template>
  <div id = "adminLogin">
    <section class="loginCont">
      <div class="leftCont">
        <h1>云租平台</h1>
        <h3>后台登录系统</h3>
      </div>
      <div class="rightConts">
        <div class="rightCont">
          <p class="loginTitle">登录</p>
          <div>
            <div class="box">
              <span>用户名</span>
              <div class="inputBox">
                <input ref="phoneInput" v-model="userphone"  placeholder="输入用户名"/>
              </div>
            </div>
            <div class="box">
              <span>密码</span>
              <div class="inputBox">
                <input @keyup.enter="login" ref="passWord" type="password" v-model="password"  placeholder="请输入密码"/>
              </div>
            </div>
            <!-- <div class="box">
              <span>验证码</span>
              <div class="inputBox">
                <input ref="verifiction" type="text" v-model="verifiction"  placeholder="请输入验证码"/>
                <div class="verifiction">发送</div>
              </div>
            </div> -->
            <!-- <router-link tag="div" class="forgetBtn" to="/register/2">忘记密码</router-link> -->
          </div>
          <div class="buttonC" @click="login">登录</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {managerLogin} from 'api/admin'
  import {getPlatform} from 'common/js/util'
  import {mapMutations} from 'vuex'
  export default {
    props: {
    },
    data() {
      return {
        userimg: require('common/image/tab_center_normal.png'),
        password: '',
        userphone: '',
        verifiction:''
      }
    },
    methods: {
      login() {
        managerLogin(this.userphone, this.password, this.verifiction).then((res) => {
          if(!res.code){
            this.setUserAdmin(true) 
            this.userphone = "" 
            this.password = ""
            this.$router.push({
              path:'/admin/member'
            })
            
          }else{
            alert(res.msg)
          }
        })
      },
      testPhone(phone) {
        let re = /^1\d{10}$/
        return re.test(phone)
      },
      ...mapMutations({
        setUserAdmin: 'SET_USER_ADMIN'
      })
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  #adminLogin
    width 100%
    background-color $color-white
    height 100vh
    .loginCont
      position relative
      width 100%
      height 100%
      display flex
      .leftCont
        flex 1
        bg-image-n('admin_bg')
        background-size 100% 100%
        color white
        text-align center
        position relative
        h1
          font-size 60px
          top 30%
          width 100%
          position absolute
         h3 
          position absolute
          width 100%
          font-size 30px
          bottom 100px
      .rightConts
        flex 1
        .rightCont
          display flex
          box-sizing border-box
          height 100%
          padding 100px
          flex-direction column
          justify-content center
        .loginTitle
          font-size 34px
          color $color-theme
          text-align center
          margin 50px 0
        .forgetBtn
          line-height 50px
          color #ff8850
          padding 0 20px
        .box
          background: $color-white
          padding 0 20px
          box-sizing border-box
          line-height: 30px
          border-radius: 6px
          position relative
          .inputBox 
            padding 10px 0
            position relative
            display flex
            align-items center
            line-height 50px
            width 100%
            span 
              display block
              width 100%
              color #b4b4b4
              font-weight bold
            .verifiction
              width 100px
              border-radius 5px
              background-color #ff8850
              text-align center
              margin-left 30px
              color white
            input
              outline none
              flex 1
              text-indent 20px
              background: #fef3ee
              line-height 50px
              border-radius 5px
              color: $color-text
              font-size: $font-size-medium-x
              &::placeholder
                color: $color-text-d
  .buttonC
    color $color-white
    buttonD()
    background-color #ff8850
    line-height 50px
    height 50px
    margin-top 50px
    margin-bottom 50px
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