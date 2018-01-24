import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'common/stylus/index.styl'
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
/* eslint-disable no-unused-vars */
// import Console from 'vconsole'
// var vConsole = new Console()
// axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
//

axios.interceptors.request.use(function(config) { // 配置发送请求的信息
  // store.dispatch('showLoading')
  return config
}, function(error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response) { // 配置请求回来的信息
  // store.dispatch('hideLoading')
  return response
}, function(error) {
  return Promise.reject(error)
})
Vue.prototype.$http = axios // 其他页面在使用axios的时候直接  this.$http就可以了

// axios.defaults.baseURL='http://localhost:8082/';

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default_house.png'),
  error: require('common/image/default_house.png'),
  attempt: 2
})
// Vue.component('Modal', Modal)
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})