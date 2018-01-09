function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function formatDate(date) {
  let newdDate = new Date(date)
  return formatD('yyyy-MM-dd', newdDate)
}
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export function deepCopy(obj) {
  var newObj = {}
  if (obj instanceof Array) {
    newObj = []
  }
  for (var key in obj) {
    var val = obj[key]
    newObj[key] = typeof val === 'object' ? deepCopy(val) : val
  }
  return newObj
}

export function clone(origin) { //深拷贝
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
export function formatD(format, dateT) {
  // formatD('yyyy-MM-dd hh:mm:ss', Date)
  let $1
  let o = {
    'M+': dateT.getMonth() + 1,
    'd+': dateT.getDate(),
    'h+': dateT.getHours(),
    'm+': dateT.getMinutes(),
    's+': dateT.getSeconds(),
    'q+': Math.floor((dateT.getMonth() + 3) / 3),
    'S': dateT.getMilliseconds()
  }
  var key, value
  if (/(y+)/.test(format)) {
    $1 = RegExp.$1,
    format = format.replace($1, String(dateT.getFullYear()).substr(4 - $1))
  }
  for (key in o) {
    if (new RegExp('(' + key + ')').test(format)) {
      $1 = RegExp.$1,
        value = String(o[key]),
        value = $1.length === 1 ? value : ('00' + value).substr(value.length),
        format = format.replace($1, value)
    }
  }
  return format
}

export function getPlatform() {
  let sUserAgent = navigator.userAgent
  let mobileAgents = ['Android', 'iPhone', 'Symbian', 'WindowsPhone', 'iPod', 'BlackBerry', 'Windows CE'];
  let platform = 0
  for (let i = 0; i < mobileAgents.length; i++) {
    if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
      platform = 1
      break
    }
  }
  return platform
}
