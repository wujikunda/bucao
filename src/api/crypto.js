import md5 from 'js-md5'
import {formatD} from 'common/js/util'
export function getSign(obj) {
  let arr = Object.keys(obj)
  arr.sort()
  let stringA = ''
  arr.forEach(function(item, index) {
    if (!obj[item]) {
      return
    }
    stringA += item + '=' + obj[item]
    if (index !== arr.length - 1) {
      stringA += '&'
    }
  })
  var url = stringA + `&key=c4ca4238a0b923820dcc509a6f75849b`
  return md5(url).toLocaleUpperCase()
}
export function getDate() {
  let date = new Date()
  date = format('yyyy-MM-dd hh:mm:ss', date)
  return date
}

export function format(format, dateT) {
  return formatD(format, dateT)
}