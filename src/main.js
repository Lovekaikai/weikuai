require('es6-promise').polyfill()
import Vue from 'vue'
import VueRouter from 'vue-router'
import vuex from 'vuex'
import VueScroller from 'vue-scroller'
import _ from 'lodash'
import Cookie from 'js-cookie'
import moment from 'moment'
import store from './vuex/store'
import routes from './routes'
import App from './App'
import { AjaxPlugin } from 'vux'
import _g from 'assets/js/global.js'
import http from 'assets/js/http.js'
import filter from 'assets/js/filter.js'
import jsbase64 from 'js-base64'
import echarts from 'echarts'
import httpMixins from 'assets/mixins/httpMixin'
import Lockr from 'assets/js/apiStorage.js'
import axios from 'axios'
import base64 from 'base-64'
import utf8 from 'utf8'

import _verify from 'assets/js/verify.js'
import stack from 'assets/js/stack.js'
import './assets/css/aui/aui.css'
import './assets/css/aui/aui-flex.css'
import './assets/css/global.css'

import 'assets/css/common.css'

import fastclick from 'fastclick'

Vue.use(VueRouter)
Vue.use(vuex)
Vue.use(VueScroller)
Vue.use(AjaxPlugin)

// 注册全局混合
Vue.mixin({
  methods: http
})
Vue.mixin(httpMixins)

var HOST = API_HOST
if (!API_HOST || process.env.NODE_ENV == 'development') {
  Vue.http.defaults.baseURL = HOST
  window.HOST = HOST
} else {
  Vue.http.defaults.baseURL = API_HOST
  window.HOST = API_HOST
}
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000000

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

window.axios = axios
window.http = Vue.http.defaults
window.router = router
window.store = store
window.Cookie = Cookie
window.moment = moment
window._g = _g
window.filter = filter
window.echarts = echarts
window.Base64 = jsbase64.Base64
window.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
window.Lockr = Lockr
window.base64 = base64
window.utf8 = utf8
window._verify = _verify
window.stack = stack

fastclick.attach(document.body)

// 解决x-input组件清除按钮无效的bug
document.addEventListener('input', (event) => {
  var target = event.target || event.srcElement
  if (target && target.className == 'weui-input') {
    let clearIcon = target.parentNode.nextSibling.nextSibling.querySelector('.weui-icon-clear')
    if (clearIcon && !target.disabled && !target.readonly) {
      if (target.value) {
        if (clearIcon.className && clearIcon.className.indexOf('honray-clear_btn') == -1) {
          clearIcon.className += ' honray-clear_btn'
        }
      } else if (clearIcon.className) {
        clearIcon.className = clearIcon.className.replace('honray-clear_btn', '')
      }
    }
  }
})

// router加载刷新
router.beforeEach((to,from, next) => {
  next()
})



new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
}).$mount('#app')
