let storage = {}

/**
 * putLocalStorage 把数据放到本地存储
 * @param {*} key
 * @param {*} value
 */
storage.putLocalStorage = function (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * getLocalStorage 获取本地存储数据
 * @param {*} key
 */
storage.getLocalStorage = function (key) {
  let obj = window.localStorage.getItem(key)
  if (obj && obj !== 'undefined' && obj !== 'null') {
    return JSON.parse(obj)
  }
  return ''
}

/**
 * removeLocalStorage 清除本地数据
 * @param {*} key
 */

storage.removeLocalStorage = function (key) {
  if (key) {
    window.localStorage.removeItem(key)
  } else {
    console.log(arguments)
    for (let i in arguments) {
      window.localStorage.removeItem(arguments[i])
    }
  }
}
export default storage
