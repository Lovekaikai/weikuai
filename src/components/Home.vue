<template>
	<div>
    <div class="main-header" v-if="showBackTab && workplaceType == 20">
      <x-header>{{ documentTitle }}</x-header>
    </div>
    <div :style="viewStyle">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && showRouterView"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && showRouterView"></router-view>
    </div>
    <toast>
      v-model="toastShow"
      type="text"
      width="12em"
      :time="toastTime"
      :position="toastPos">{{ toastMsg }}
    </toast>
    <loading v-model="loadingShow" :text="loadingText"></loading>
  </div>
</template>
<script>
  import { XHeader, Toast, Loading } from 'vux'
  import dingtalk from 'assets/js/dingtalk'
  export default {
    data () {
      return {
        pageType: 1, // 1:获取appid，2:根据code登录
        url: '',
        redirect_uri: 'login;', // 重定向的地址
        path: '',
        appid: '',
        agentid: '',
        code: '',
        corpid: '',
        agentid: '',
        showRouterView: false,
        showBackTab: false,
        title: ''
      }
    },
    computed: {
      toastShow() {
        return store.state.toast.show
      },
      toastTime() {
        return store.state.toast.time
      },
      toastPos() {
        return store.state.toast.position
      },
      toastMsg() {
        return store.state.toast.msg
      },
      loadingShow() {
        return store.state.loading.show
      },
      loadingText() {
        return store.state.loading.text
      },
      workplaceType() {
        return store.state.workplaceType
      },
      documentTitle() {
        return store.state.documentTitle
      },
      viewStyle() {
        let obj = {}
        if (this.showBackTab && this.workplaceType == 20) {
          obj.marginTop = '56px'
        }
        return obj
      }
    },
    components: {
      XHeader,
      Toast,
      Loading
    },
    watch: {
      '$route' (to, from) {								// 监听路由改变
        if (to.meta.showBackTab) {
          this.showBackTab = true
        } else {
          this.showBackTab = false
        }
        if (to.meta.title !== from.meta.title) {
          _g.changeTitle(to.meta.title || '')
        }
      }
    },
    created() {
      if (this.$route.query.loginType == 'dingtalk') {
        this.dingtalkAutoLogin()
      } else if (this.$route.query.agentid) {
        this.weChatAutoLogin()
      } else {
        this.showRouterView = true
      }
      if (this.$route.query.workplaceType) {
        store.dispatch('setWorkplaceType', this.$route.query.workplaceType)
      }
      if (this.$route.meta.showBackTab) {
        this.showBackTab = true
      } else {
        this.showBackTab = false
      }
    },
    methods: {
      handleSuccess(res) {
        _g.openToast('登录成功')
        Cookie.set('token', res.token)            // 接口认证凭证
        Cookie.set('userInfo', res.userInfo)      // 用户信息
        var base64 = window.btoa((new Date()).getTime())
        var token = Cookie.get('token') + '%' + base64
        http.headers.token = token
        setTimeout(() => {
          // 如果从推送入口进入则需要跳回推送入口
          if (this.relogin) {
            let newPath = Base64.decode(this.path)
            location.href = newPath
          } else {
            router.push({ name: this.path })
          }
        }, 200)
      },
      /**
       * 判断是否是重定向后的页面
       */
      checkCode() {
        // 判断方式需要优化
        this.code = this.$route.query.code
        // [this.path, this.agentid] = this.$route.query.info.split('')
        let temp = this.$route.query.info.split('')
        this.path = temp[0]
        this.agentid = temp[1]
        this.relogin = !!temp[2]
        if (this.code) {
          this.pageType = 2
          let oldCode = Cookie.get('code')
          // 证明是点了返回按钮进入到授权页
          if (oldCode === this.code) {
            _g.closeWindow()
            return false
          } else {
            Cookie.set('code', this.code)
            return true
          }
        } else {
          _g.openToast('获取参数失败！')
          return false
        }
      },
      /**
       * 通过企业微信授权码登录
       */
      weChatLogin() {
        let params = {
          code: this.code,
          agentid: this.agentid
        }
        this.goAjax('get', 'admin/base/wechat', {code: this.code, agentid: this.agentid}).then((res) => {
          this.handleSuccess(res)
          this.showRouterView = true
        }).catch((err) => {
          console.log('err = ', err)
        })
      },
      /**
       * [weChatAutoLogin 企业微信自动登录的逻辑]
       */
      weChatAutoLogin() {
        // this.url = window.location.href
        let domain = window.location.host

        let params = this.$route.query
        this.appid = params.appid
        this.agentid = params.agentid
        this.path = params.path
        this.relogin = params.relogin
        if (this.path && this.appid && this.agentid) {
          // 重定向的链接不能有&符号
          if (this.relogin) {
            this.redirect_uri = `http://${domain}/login?info=${this.path}${this.agentid}relogin`
          } else {
            this.redirect_uri = `http://${domain}/login?info=${this.path}${this.agentid}`
          }
        } else if (!this.checkCode()) {
          return false
        }

        // 根据appid获取code
        if (this.pageType === 1) {
          let new_uri = `http://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&agentid=${this.agentid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=snsapi_base#wechat_redirect`
          window.location.href = new_uri
        } else if (this.pageType === 2) {
          this.weChatLogin()
        } else {
          _g.openToast('未知的路由类型')
        }
      },
      /**
       * [dingtalkAutoLogin 钉钉自动登录的逻辑]
       */
      async dingtalkAutoLogin() {
        this.corpid = dingtalk.getDingtalkCorpId(this)
        this.agentid = dingtalk.getDingtalkAgentId(this)
        dingtalk.getDingAuthCode(this.corpid, async (result) => {
          this.code = result.code
          let postData = {
            code: this.code,
            agentid: this.agentid
          }
          await dingtalk.dingtalkLogin(this, postData)
          this.showRouterView = true
        })
      }
    }
  }
</script>

<style scoped>
  .main-header {
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 10px solid #ECECF2;
    z-index: 2;
  }
</style>