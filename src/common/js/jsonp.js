import originJsonp from 'jsonp'
import {getPlatform} from 'api/login'

const debug = process.env.NODE_ENV !== 'production'
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  let urlindx = url.substring(url.indexOf('v1/'), url.indexOf('?'))
  if (debug) {
    console.log('send', urlindx, data)
  }
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        if (debug) {
          console.log('get', urlindx, data)
        }
        if (data.code === 10001) {
          if (!localStorage.getItem('usertoken', '')) {
            getPlatform() ? location.href = '/#/login' : location.href = '/#/pc/login'
            return
          }
          alert('请重新登录')
          localStorage.setItem('usertoken', '')
          getPlatform() ? location.href = '/#/login' : location.href = '/#/pc/login'
          return false
        }
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function jsonpAdmin(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  let urlindx = url.substring(url.indexOf('v1/'), url.indexOf('?'))
  if (debug) {
    console.log('send', urlindx, data)
  }
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        if (debug) {
          console.log('get', urlindx, data)
        }
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
