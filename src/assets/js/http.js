const apiMethods = {
  // @params method: 请求方法，如get、post
  // @params url: 请求地址
  // @params params: 请求参数
  // @params isList: loading类型。如果是列表加载的请求，不需要弹窗的loading
  // @params defaultVal: 默认值，设置ajax返回的默认值
  goAjax(method, url, params, isList, defaultVal) {
    this.updateToken()
    if (!isList) {
      _g.openLoading()
    }
    return new Promise((resolve, reject) => {
      const obj = this.makeRequestBody(method, url, params)
      let defaultValue = defaultVal || null
      setTimeout(() => {
        this.$http.request(obj).then((response) => {
          _g.closeLoading()
          resolve(this.promiseHandler(defaultValue, response.data))
        }, (response) => {
          _g.closeLoading()
          if (response.statusText) {
            _g.openToast(response.statusText)
          } else {
            _g.openToast('unknown error')
          }
          resolve(defaultValue)
        })
      }, 300)
    })
  },
  updateToken() {
    var base64 = window.btoa((new Date()).getTime())
    var token = Cookie.get('token') + '%' + base64
    http.headers.token = token
  },
  handleError(res) {
    setTimeout(() => {
      _g.openToast(res.error)
    }, 300)
  },
  makeRequestBody(method, url, params) {
    let obj = obj = {method: method, url: url}
    if (method == 'get') {
      obj.params = params
    } else {
      obj.data = params
    }
    return obj
  },
  promiseHandler(defaultVal, result) {
    if (result.code == 200) {
      defaultVal = result.data
    } else if (result.code == 101) { // 登录过期
      if (this.checkLogin()) {
        _g.openToast('登录过期，准备重新登录...')
        setTimeout(() => {
          this.reLogin()
        }, 2000)
      } else {
        _g.openToast('登录过期，请点击底部菜单登录')
        setTimeout(() => {
          _g.closeWindow()
        }, 2000)
      }
    } else {
      this.handleError(result)
    }
    return defaultVal
  },
  /**
   * [checkLogin 查看链接是否带有重新登录需要的参数]
   * @return {[Boolean]} []
   */
  checkLogin() {
    let query = this.$route.query
    if ((query.appid && query.agentid) || query.loginType == 'dingtalk') {
      return true
    } else {
      return false
    }
  },
  /**
   * [reLogin 登录失效后准备重新登录]
   * @return {[type]} [description]
   */
  reLogin() {
    let query = this.$route.query
    let initURI = Base64.encode(location.href)
    
    // relogin 用来区分和菜单入口进入
    router.push({ name: 'login', query: { appid: query.appid, agentid: query.agentid, path: initURI, relogin: true } })
  }
}

export default apiMethods
