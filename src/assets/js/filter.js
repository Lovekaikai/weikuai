import Vue from 'vue'
export default (function () {
  Vue.filter('rules', function (value) {
    return value
  })
  Vue.filter('toDate', function (value) {
    return moment.unix(value).format('YYYY-MM-DD')
  })
  Vue.filter('toTime', function (value) {
    return moment.unix(value).format('YYYY-MM-DD HH:mm')
  })
  Vue.filter('spendTime', function (value) {
    if (typeof value != 'number') {
      return '无效时间'
    }
    if (value > 3600) {
      let time = (value / 3600).toString()
      let index_ = time.indexOf('.')
      const hour = time.substr(0, index_)
      const min = parseInt(parseFloat('0' + time.substr(index_, 3)) * 60)
      return '耗时' + hour + '小时' + min + '分钟'
    } else {
      return '耗时' + parseInt(value / 60) + '分钟'
    }
  })
  Vue.filter('pastTime', function (value) {
    if (typeof value != 'number') {
      return '无效时间'
    }
    let now = moment()
    let time = moment(1000*value)
    let minuteDiff = now.diff(time, 'minutes')
    let hourDiff = now.diff(time, 'hours')
    if (minuteDiff <= 30) {
      return "刚刚"
    } else if (minuteDiff < 60){
      return "半小时前"
    } else {
      return `${hourDiff}小时前`
    }
  })
  Vue.filter('anyDate', function(value, unit) {
    let dateType = ''
    switch (unit) {
      case 10:
        dateType = 'YYYY'
        break
      case 20:
        dateType = 'YYYY-MM'
        break
      case 30:
        dateType = 'YYYY-MM-DD'
        break
      case 40:
        dateType = 'YYYY-MM-DD HH'
        break
      case 50:
        dateType = 'YYYY-MM-DD HH:mm'
        break
      case 60:
        dateType = 'YYYY-MM-DD HH:mm:ss'
        break
    }
    return moment.unix(value).format(dateType)
  })
})()
