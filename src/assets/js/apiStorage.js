/**
 * storage.js
 * @author Ryan
 */
import Cookie from 'js-cookie'
var ApiStorage = function () { }
ApiStorage.prototype = {
  set: function (key, value) {
    Cookie.set(key, value)
  },
  get: function (key) {
    return Cookie.get(key)
  },
  rm: function (key) {
    Cookie.remove(key)
  },
  clear: function () {
    let all = Cookie.get()
    for (var key in all) {
      Cookie.set(key, '')
    }
  }
}

module.exports = new ApiStorage()

