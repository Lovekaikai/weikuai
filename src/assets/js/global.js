const _g = {
  closeLoading() {
    setTimeout(() => {
      store.dispatch('closeLoading')
    }, 300)
  },
  goback() {
    if (history.length <= 1) {
      _g.closeWindow()
    } else {
      router.go(-1)
    }
  },
  j2s(data) {
    return JSON.stringify(data)
  },
  s2j(data) {
    return JSON.parse(data)
  },
  openToast(msg, time, pos) {
    const obj = {
      show: true,
      time: time || 2000,
      position: pos || 'middle',
      msg: msg
    }
    store.dispatch('showToast', obj)
    setTimeout(() => {
      store.dispatch('closeToast')
    }, obj.time)
  },
  openLoading(text) {
    const obj = {
      show: true,
      text: text || 'Loading'
    }
    store.dispatch('showLoading', obj)
  },
  isEmpty(obj) {
    for (let name in obj) {
      return false
    }
    return true
  },
  isRealEmpty(value) { // 判断是否真的为空
    // value为以下值时返回true：undefined,null,'',空数组,空对象
    return value === '' ||
      _.isUndefined(value) ||
      _.isNull(value) ||
      ((_.isArray(value) || _.isObject(value)) && _.isEmpty(value))
  },
  changeTitle(title) {
    document.title = title
    store.dispatch('setDocmentTitle', title)

    var mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
      var iframe = document.createElement('iframe')
      iframe.style.visibility = 'hidden'
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      iframe.setAttribute('src', '/favicon.png')
      var iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  },
  /**
   * 关闭微信窗口
   */
  closeWindow() {
    // 考虑刚进入页面就返回的情况，需要一定的延迟，否则WeixinJSBridge还未定义
    let onBridgeReady = () => {
      WeixinJSBridge.call ? WeixinJSBridge.call('closeWindow') : WeixinJSBridge.invoke('closeWindow')
    }
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady()
    }
  },
  catchError(obj, func, msg) {
    try {
      func()
    } catch (e) {
      console.error('error in compoment: ' + obj.componentName)
      console.error(e)
      if (!msg) {
        msg = '系统异常，请联系开发人员进行修复'
      }
      this.openToast(msg)
      return true
    }
    return false
  },
  parseMathFormula(str) { // 解析数学公式
    str = str.replace(/\s/g, '').replace(/\"/g, '')
    var stack = new Stack.Stack()
    var outStack = []
    var cutIndex = 0
    for (var i = 0; i < str.length; ++i) {
      if (str[i] == ')') {
        let cut = str.substring(cutIndex, i)
        if (cut) {
          outStack[outStack.length] = cut
        }
        cutIndex = i + 1
        while (true) {
          var top = stack.peek()
          stack.pop()
          if (top != '(') {
            outStack[outStack.length] = top
          } else {
            break
          }
        }
      } else if (['-', '+'].indexOf(str[i]) > -1) {
        let cut = str.substring(cutIndex, i)
        if (cut) {
          outStack[outStack.length] = cut
        }
        cutIndex = i + 1
        if (['*', '/'].indexOf(stack.peek()) > -1) {
          while (['*', '/'].indexOf(stack.peek()) > -1) {
            outStack[outStack.length] = stack.peek()
            stack.pop()
          }
          // outStack[outStack.length] = str[i]
        } else if (['+', '-'].indexOf(stack.peek()) > -1) {
          while (['+', '-'].indexOf(stack.peek()) > -1) {
            outStack[outStack.length] = stack.peek()
            stack.pop()
          }
        }
        stack.push(str[i])
      } else if (['(', '*', '/'].indexOf(str[i]) > -1) {
        let cut = str.substring(cutIndex, i)
        if (cut) {
          outStack[outStack.length] = cut
        }
        cutIndex = i + 1
        stack.push(str[i])
      }
      if (i == str.length - 1) {
        let cut = str.substring(cutIndex, str.length)
        if (cut) {
          outStack[outStack.length] = (cut)
        }
      }
    }
    while (stack.length()) {
      outStack[outStack.length] = stack.pop()
    }
    return outStack
  },
  getOnlyKey(symbol) {
    if (!symbol) {
      symbol = 'key'
    }
    return `${symbol}_${moment().unix()}_${parseInt(Math.random() * 1000) * parseInt(Math.random() * 1000)}`
  },
  handleCompute(a, b, type) {
    // js浮点数运算有bug，需转化成整形数运算再还原
    let result = 0
    let multiA = 1
    let multiB = 1
    if (!_g.isRealEmpty(a) && a.toString().indexOf('.') > -1) {
      let string = Math.abs(a).toString().replace(/\d+./, '')
      if (string) {
        multiA *= Math.pow(10, string.length)
      }
    }
    if (!_g.isRealEmpty(b) && b.toString().indexOf('.') > -1) {
      let string = Math.abs(b).toString().replace(/\d+./, '')
      if (string) {
        multiB *= Math.pow(10, string.length)
      }
    }
    let multi = Math.max(multiA, multiB)
    if (multiA == 1) {
      a *= multi
    } else {
      a = parseFloat(a.toString().replace('.', ''))
      a = a * multi / multiA
    }
    if (multiB == 1) {
      b *= multi
    } else {
      b = parseFloat(b.toString().replace('.', ''))
      b = b * multi / multiB
    }
    switch (type) {
      case '+':
        result = (a + b) / multi
        break
      case '-':
        result = (a - b) / multi
        break
      case '*':
        result = (a * b) / (multi * multi)
        break
      case '/':
        result = a / b
        break
    }
    return result
  },
  /**
   * [setLoginResult 登录成功后，处理返回的登录信息]
   * @param {[Object]} data [返回的登录数据]
   */
  setLoginResult(data) {
    _g.openToast('登录成功')
    Cookie.set('token', data.token)            // 接口认证凭证
    Cookie.set('userInfo', data.userInfo)      // 用户信息
    var base64 = window.btoa((new Date()).getTime())
    var token = Cookie.get('token') + '%' + base64
    http.headers.token = token
  },
  loginApi: 'admin/base/login',
  isDev: process.env.NODE_ENV == 'development',
  // isIOS: process.env.NODE_ENV != 'development' ? api.systemType == 'ios' : false,
  toastMsg(msg) {
    this.openToast(msg)
  },
  // 提交成功后的处理
  goback() {
    router.go(-1)
  },
  showJsonData(target) {
    console.log('target = ', this.j2s(target))
  },
  dealError(obj, res) {
    switch (res.code) {
      case 101:
        console.log('登录失效')
        // 当失效时，清空ls中的tokenKey,防止其他设备自动登录
        Lockr.rm('token')
        this.toastMsg(res.error)
        // 重新登录
        this.login(obj)
        break
      case 103:
        this.toastMsg(res.error)
        break
      case 104:
        this.toastMsg(res.error)
        break
      default:
        this.toastMsg(res.error)
    }
  },
  catchError(obj, func, msg) {
    try {
      func()
    } catch (e) {
      console.error('error in compoment: ' + obj.componentName)
      console.error(e)
      if (!msg) {
        msg = '系统异常，请联系开发人员进行修复'
      }
      this.toastMsg(msg)
      return true
    }
    return false
  },
  reAjax(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response)
        alert('连接超时，请检查网络连接')
      })
    })
  },
  updateHttpHeader() { // 更新http头部信息
    let headerObject = {}
    // 给当前token加上当前时间，base解析
    let base64 = window.btoa(this.getServerTimeStamp())
    if (Lockr.get('token') != undefined) {
      let token = Lockr.get('token') + '%' + base64
      // 组成对象数据返回
      headerObject.token = token
    } else {
      headerObject.token = null
    }
    return headerObject
  },
  isRealEmpty(value) { // 判断是否真的为空
    // value为以下值时返回true：undefined,null,'',空数组,空对象
    return value === '' ||
      _.isUndefined(value) ||
      _.isNull(value) ||
      ((_.isArray(value) || _.isObject(value)) && _.isEmpty(value))
  },
  /**
   * [handleCompute 执行浮点数四则运算]
   * @param  {[Number]} a         [前置算数]
   * @param  {[Number]} b         [后置算数]
   * @param  {[String]} type      [运算类型（+、-、*、／）]
   * @return {[Number]} result    [运算结果]
   */
  handleCompute(a, b, type) {
    // js浮点数运算有bug，需转化成整形数运算再还原
    let result = 0
    let multiA = 1
    let multiB = 1
    if (!_g.isRealEmpty(a) && a.toString().indexOf('.') > -1) {
      let string = Math.abs(a).toString().replace(/\d+./, '')
      if (string) {
        multiA *= Math.pow(10, string.length)
      }
    }
    if (!_g.isRealEmpty(b) && b.toString().indexOf('.') > -1) {
      let string = Math.abs(b).toString().replace(/\d+./, '')
      if (string) {
        multiB *= Math.pow(10, string.length)
      }
    }
    let multi = Math.max(multiA, multiB)
    if (multiA == 1) {
      a *= multi
    } else {
      a = parseFloat(a.toString().replace('.', ''))
      a = a * multi / multiA
    }
    if (multiB == 1) {
      b *= multi
    } else {
      b = parseFloat(b.toString().replace('.', ''))
      b = b * multi / multiB
    }
    switch (type) {
      case '+':
        result = (a + b) / multi
        break
      case '-':
        result = (a - b) / multi
        break
      case '*':
        result = (a * b) / (multi * multi)
        break
      case '/':
        result = a / b
        break
    }
    return result
  },
  parseToTimeStamp(value) { // 转化为时间戳（毫秒）
    let stamp = moment(value).unix()
    if (isNaN(stamp)) {
      stamp = ''
    } else {
      stamp *= 1000
    }
    return stamp
  },
  /**
   * [getServerTimeStamp 转化时间为服务器时间]
   * @param  {[String/Number]} time [传入时间]
   * @return {[Number]}      [时间戳（毫秒）]
   */
  getServerTimeStamp(time) {
    let date = null
    if (!this.isRealEmpty(time)) {
      date = new Date(time)
    } else {
      date = new Date()
    }
    if (date === 'Invalid Date') {
      date = new Date()
    }
    let result = this.parseToTimeStamp(date)
    return result
  },
  fixBase64(value) {  // 不知为何+号会变成空格，转码回来
    return value.replace(/\s/g, '+')
  },
  checkHost(url) { // 检查链接的域名是否是当前域名
    return url.indexOf(window.imgUrl) > -1 || url.indexOf(window.HOST) > -1
  },
  /**
   * [vaildTime 验证是否时间格式]
   * @param  {[String]} value [需要验证的值]
   * @param  {[String]} unit  [单位]
   * @return {[Boolean]}       [验证结果]
   */
  vaildTime(value, unit) {
    if (unit == 'm') {
      // 验证格式：00:00
      return (/^\d{2}\:\d{2}$/).test(value)
    } else if (unit == 's') {
      // 验证格式：00:00:00
      return (/^\d{2}\:\d{2}\:\d{2}$/).test(value)
    }
  },
  /**
   * [parseFormula 解析公式]
   * @param  {[String]} str [数学公式]
   * @return {[Array]}     [解析成后缀表达式的公式数组]
   */
  parseMathFormula(str) { // 解析数学公式
    str = str.replace(/\s/g, '').replace(/\"/g, '')
    var stack = window.stack
    var outStack = []
    var cutIndex = 0
    for (var i = 0; i < str.length; ++i) {
      if (str[i] == ')') {
        let cut = str.substring(cutIndex, i)
        if (cut) {
          outStack[outStack.length] = cut
        }
        cutIndex = i + 1
        while (true) {
          var top = stack.peek()
          stack.pop()
          if (top != '(') {
            outStack[outStack.length] = top
          } else {
            break
          }
        }
      } else if (['-', '+'].indexOf(str[i]) > -1) {
        let cut = str.substring(cutIndex, i)
        if (cut) {
          outStack[outStack.length] = cut
        }
        cutIndex = i + 1
        if (['*', '/'].indexOf(stack.peek()) > -1) {
          while (['*', '/'].indexOf(stack.peek()) > -1) {
            outStack[outStack.length] = stack.peek()
            stack.pop()
          }
          // outStack[outStack.length] = str[i]
        } else if (['+', '-'].indexOf(stack.peek()) > -1) {
          while (['+', '-'].indexOf(stack.peek()) > -1) {
            outStack[outStack.length] = stack.peek()
            stack.pop()
          }
        }
        stack.push(str[i])
      } else if (['(', '*', '/'].indexOf(str[i]) > -1) {
        let cut = str.substring(cutIndex, i)
        if (cut) {
          outStack[outStack.length] = cut
        }
        cutIndex = i + 1
        stack.push(str[i])
      }
      if (i == str.length - 1) {
        let cut = str.substring(cutIndex, str.length)
        if (cut) {
          outStack[outStack.length] = (cut)
        }
      }
    }
    while (stack.length()) {
      outStack[outStack.length] = stack.pop()
    }
    return outStack
  },
  changeMoneyToChinese(obj, money) {
    let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'] // 汉字的数字
    let cnIntRadice = ['', '拾', '佰', '仟'] // 基本单位
    let cnIntUnits = ['', '万', '亿', '兆']// 对应整数部分扩展单位
    let cnDecUnits = ['角', '分', '毫', '厘'] // 对应小数部分单
    // let cnInteger = "整" // 整数金额时后面跟的字符
    let cnIntLast = '元' // 整型完以后的单位
    let maxNum = 999999999999999.9999 // 最大处理的数字
    let IntegerNum // 金额整数部分
    let DecimalNum // 金额小数部分
    let ChineseStr = '' // 输出的中文金额字符串
    let parts // 分离金额后用的数组，预定义
    let intLen
    if (money == '') {
      return ''
    }
    money = parseFloat(money)
    if (money >= maxNum) {
      this.toastMsg(obj, 'info', '超出最大处理数字')
      return ''
    }
    if (money == 0) {
      // ChineseStr = cnNums[0]+cnIntLast+cnInteger
      ChineseStr = cnNums[0] + cnIntLast
      // document.getElementById("show").value=ChineseStr
      return ChineseStr
    }
    money = money.toString() // 转换为字符串
    if (money.indexOf('.') == -1) {
      IntegerNum = money
      DecimalNum = ''
    } else {
      parts = money.split('.')
      IntegerNum = parts[0]
      DecimalNum = parts[1].substr(0, 4)
    }
    if (parseInt(IntegerNum, 10) > 0) { // 获取整型部分转换
      let zeroCount = 0
      // let intLen = IntegerNum.length
      for (let i = 0; i < IntegerNum.length; i++) {
        let n = IntegerNum.substr(i, 1)
        let p = IntegerNum.length - i - 1
        let q = p / 4
        let m = p % 4
        if (n == '0') {
          zeroCount++
        } else {
          if (zeroCount > 0) {
            ChineseStr += cnNums[0]
          }
          zeroCount = 0 // 归零
          ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
        }
        if (m == 0 && zeroCount < 4) {
          ChineseStr += cnIntUnits[q]
        }
      }
      ChineseStr += cnIntLast
      // 整型部分处理完毕
    }
    if (DecimalNum != '') { // 小数部分
      for (let i = 0; i < DecimalNum.length; i++) {
        let n = DecimalNum.substr(i, 1)
        if (n != '0') {
          ChineseStr += cnNums[Number(n)] + cnDecUnits[i]
        }
      }
    }
    if (ChineseStr == '') {
      // ChineseStr += cnNums[0]+cnIntLast+cnInteger
      ChineseStr += cnNums[0] + cnIntLast
    }
    /* else if( DecimalNum == '' ){
        ChineseStr += cnIntegerChineseStr += cnInteger
    } */
    return ChineseStr
  },
  uniqueArray(arr, key) {
    let result = []
    if (arr.length != 0) {
      result.push(arr[0])
      for (let i = 1; i < arr.length; i++) {
        let item = arr[i]
        let repeat = false
        for (let j = 0; j < result.length; j++) {
          if (item[key] == result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
    }
    return result
  },
  login(obj) {
    let data = {
      username: 'user1',
      password: base64.encode(utf8.encode('1'))
    }
    obj.apiPost(this.loginApi, data).then((res) => {
      if (res.code != 200) {
        alert('登录失败')
      } else {
        Lockr.set('token', res.data.token)
        Lockr.set('userInfo', res.data.userInfo)
        // 给当前token加上当前时间，base解析
        let base64 = window.btoa(this.getServerTimeStamp())
        let token = res.data.token + '%' + base64
        window.axios.defaults.headers.token = token
        console.log('登录成功')
      }
    }, (res) => {
      console.log(res)
    })
  },
  getOnlyKey() { // 获取唯一key
    return `key_${moment().unix()}_${parseInt(Math.random() * 1000) * parseInt(Math.random() * 1000)}`
  },
  // 上传文件 apicloud 专用
  ac_upload: function (opts, callback) {
    // 拼接url
    opts.url = window.HOST + opts.url
    // 设置token
    opts.headers = this.updateHttpHeader() || {}

    api.ajax(opts, function (ret, err) {
      if (typeof callback == 'function') {
        callback(ret, err)
      } else {
        throw new Error('ac_upload needs a callback  --- global')
      }
    })
  }
}

export default _g
