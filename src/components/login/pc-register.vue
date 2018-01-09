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
          <input ref="phoneInput" v-model="username"  :placeholder="input1"/>
          <span @click="getVeri" ref="veriT" v-show="showR">{{getVercode?'发送验证码':'重新发送('+count+')'}}</span>
        </div>
        <div class="inputBox">
          <input ref="verification" type="text" v-model="verification"  :placeholder="input2"/>
        </div>
        <div class="inputBox">
          <input ref="passWord" type="password" v-model="password"  :placeholder="input3"/>
        </div>
      </div>
      <div class="buttonC" @click="register">{{type}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from 'components/tab/tab'
  import Wave from 'base/wave/wave'
  import {userRegister,getVerifycode,forgetPW,modifyPW} from 'api/login'
  export default {
    props: {
    },
    data() {
      return {
        userimg: require('common/image/tab_center_normal.png'),
        username: '',
        verification: '',
        password: '',
        input1: '请输入手机号',
        input2: '',
        input3: '',
        type: '立即注册',
        showR: true,
        getVercode: true,
        count:60
      }
    },
    mounted() {
      this.change()
    },
    methods: {
      change() {
        this.showR = true
        this.username =''
        this.verification =''
        this.password =''
        if(this.$route.params.type === '1'){
          this.input2 = '请输入验证码'
          this.input3 = '请输入密码'
          this.type = '立即注册'
          this.$setTitle('立即注册')
        }else if(this.$route.params.type === '2'){
          this.input2 = '请输入验证码'
          this.input3 = '请输入密码'
          this.type = '立即修改'
          this.$setTitle('忘记密码')
        }else if(this.$route.params.type === '3'){
          this.input2 = '请输入旧密码'
          this.input3 = '请输入新密码'
          this.type = '立即修改'
          this.showR = false
          this.$setTitle('修改密码')
        }
      },
      getVeri() {
        if(!this.getVercode){
          return
        }
        var that = this
        
        if(!this.testPhone(this.username)){
          alert('请输入正确的手机号')
          return
        }
        getVerifycode(this.username).then((res) => {
          if(!res.code){
            alert('验证码已发送')
            that.getVercode = false
            let timer = setInterval(updateCount,1000)
            function updateCount() {
              that.count--
              if(that.count<1){
                clearInterval(timer)
                that.getVercode = true
                that.count = 60
              }
            }
          }
        })
      },
      testPhone(phone) {
        let re = /^1\d{10}$/
        return re.test(phone)
      },
      modifyPassword() {
        if(!this.testPhone(this.username)){
          alert('请输入正确的手机号')
          return
        }
        if(!this.verification){
          alert('请输入旧密码')
          return
        }
        if(!this.password){
          alert('请输入新密码')
          return
        }
        modifyPW(this.username,this.verification,this.password).then((res) => {
          if(!res.code){
            alert('修改成功')
            this.$router.back()
          }else{
            alert(res.msg)
          }
        })
      },
      register(){
        if(this.$route.params.type === '3'){
          this.modifyPassword()
          return
        }
        if(!this.testPhone(this.username)){
          alert('请输入正确的手机号')
          return
        }
        if(!this.verification){
          alert('请输入验证码')
          return
        }
        if(!this.password){
          alert('请输入密码')
          return
        }
        if(this.$route.params.type === '2'){
          forgetPW(this.username,this.verification,this.password).then((res) => {
            if(!res.code){
              alert('成功修改')
              this.$router.replace({
                path:'/login'
              })
            }else{
              alert(res.msg)
            }
            console.log('forgetPW',res)
          })
          return
        }
        userRegister(this.username,this.verification,this.password).then((res) => {
          if(!res.code){
            localStorage.setItem('usertoken',res.data.accesstoken)
            alert('成功注册')
            this.$router.replace({
              path:'/pc/login'
            })
          }else{
            alert(res.msg)
          }
          console.log('userRegister',res)
        })
      }
    },
    watch: {
      '$route': ['change']
    },
    components: {
      Wave,
      Tab
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
    position absolute
    height 100%
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