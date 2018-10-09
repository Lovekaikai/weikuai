const _g = {
  closeLoading() {
    setTimeout(() => {
      store.dispatch('closeLoading')
    }, 300)
  },
  goback() {
    router.go(-1)
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
  }
}

export default _g
