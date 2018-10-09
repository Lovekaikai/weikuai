const apiMethods = {
    data() {
      return {
        errorStack: [], // 无效请求信息
        retryTime: 3 // 重试次数
      }
    },
    created() {
      if (sessionStorage.errorStack) {
        let errorStack = JSON.parse(sessionStorage.errorStack)
        axios.post('admin/error', errorStack)
      }
    },
    methods: {
      parseHttpHeader(header) {
        let tempHeader = _g.updateHttpHeader()
        for (let key in tempHeader) {
          window.axios.defaults.headers[key] = tempHeader[key]
        }
      },
      resetToken(response) {
        if (response && response.headers && response.headers['relogin-token']) {
          Lockr.set('token', response.headers['relogin-token'], { expires: 7 })
        }
      },
      apiGet(url, data, key) {
        this.parseHttpHeader()
        return new Promise((resolve, reject) => {
          axios.get(url, data).then((response) => {
            this.resetToken(response)
            resolve(response.data)
          }).catch((error) => {
            let response = error.response
            let res = {
              code: response.status ? response.status : 500,
              error: '连接超时，请检查网络连接'
            }
            resolve(res)
            response ? this.errorHandler(response, url) : ''
          })
        })
      },
      apiPost(url, data, key) {
        this.parseHttpHeader()
        return new Promise((resolve, reject) => {
          axios.post(url, data).then((response) => {
            this.resetToken(response)
            resolve(response.data)
          }).catch((error) => {
            console.log('post error')
            let response = error.response
            let res = {
              code: response.status ? response.status : 500,
              error: '连接超时，请检查网络连接'
            }
            resolve(res)
            response ? this.errorHandler(response, url) : ''
          })
        })
      },
      apiDelete(url, id, key) {
        this.parseHttpHeader()
        return new Promise((resolve, reject) => {
          axios.delete(url + id).then((response) => {
            this.resetToken(response)
            resolve(response.data)
          }).catch((error) => {
            let response = error.response
            let res = {
              code: response.status ? response.status : 500,
              error: '连接超时，请检查网络连接'
            }
            resolve(res)
            response ? this.errorHandler(response, url) : ''
          })
        })
      },
      apiPut(url, id, obj, key) {
        this.parseHttpHeader()
        return new Promise((resolve, reject) => {
          axios.put(url + id, obj).then((response) => {
            this.resetToken(response)
            resolve(response.data)
          }).catch((error) => {
            console.log('put error')
            let response = error.response
            let res = {
              code: response.status ? response.status : 500,
              error: '连接超时，请检查网络连接'
            }
            resolve(res)
            response ? this.errorHandler(response, url) : ''
            // alert('连接超时，请检查网络连接')
            // reject(response)
          })
        })
      },
      promiseHandler(defaultVal, result) {
        this.parseHttpHeader()
        // console.log('promiseHandler result = ', result)
        if (result.code == 200) {
          defaultVal = result.data
        } else {
          _g.dealError(this, result)
        }
        return defaultVal
      },
      errorHandler(response, url) { // 上报无效请求
        let date = new Date()
        let postData = [{
          url: url,
          time: date.getTime() / 1000,
          http_code: response.status,
          response: JSON.stringify(response.data)
        }]
        axios.post('admin/error', postData).then((res) => {
          this.errorStack = []
          sessionStorage.errorStack ? sessionStorage.removeItem('errorStack') : ''
        }).catch((error) => {
          // 当无效请求接口无法上报时，同个接口1分钟内缓存一次
          let existError = this.errorStack.filter((item) => {
            return item.url === postData[0].url
          })
          if (_g.isRealEmpty(existError)) {
            this.errorStack.push(postData[0])
            sessionStorage.setItem('errorStack', JSON.stringify(this.errorStack)) // 网络等问题所致先缓存，通了再上报
          } else {
            let jetLag = (postData[0].time - existError[existError.length - 1].time) / 60 // 同个接口请求的时间差(分钟)
            if (jetLag > 1) {
              this.errorStack.push(postData[0])
              sessionStorage.setItem('errorStack', JSON.stringify(this.errorStack))
            };
          };
        })
      }
    }
  }
  
  export default apiMethods
  