import jsonp from 'common/js/jsonp'
import { commonParams, options, HTTPIP } from './config'
import { getSign, getDate } from './crypto'
import axios from 'axios'

// 用户获取验证码
export function getVerifycode(phone) {
  let url = HTTPIP + '/v1/verifycode'
  let objData = {
    mobile: phone,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonp(url, objData, options)
}
// 用户注册
export function userRegister(mobile, verifycode, password) {
  let url = HTTPIP + '/v1/register'
  let objData = {
    mobile: mobile,
    verifycode: verifycode,
    password: password,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonp(url, objData, options)
}
// 用户登录
export function userLogin(phone, password) {
  let url = HTTPIP + '/v1/login'
  let objData = {
    account: phone,
    password: password,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonp(url, objData, options)
}
// 用户注销
export function userLogout(acctoken) {
  let url = HTTPIP + '/v1/outLogin'
  let objData = {
    accesstoken: acctoken,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonp(url, objData, options)
}
// 用户忘记密码
export function forgetPW(phone, vfcode, password) {
  let url = HTTPIP + '/v1/forgetPW'
  let objData = {
    mobile: phone,
    verifycode: vfcode,
    password: password,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonp(url, objData, options)
}

// 用户修改密码
export function modifyPW(mobile, oldpw, password) {
  let url = HTTPIP + '/v1/modifyPW'
  let objData = {
    mobile: mobile,
    oldpw: oldpw,
    password: password,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonp(url, objData, options)
}
// 用户忘记密码
export function bindPhone(token, phone, vfcode, type) {
  let url = HTTPIP + '/v1/bindPhone'
  if (type === 1) {
    url = HTTPIP + '/v1/releasePhone'
  }
  let objData = {
    accesstoken: token,
    mobile: phone,
    verifycode: vfcode,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonp(url, objData, options)
}
export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function checkLogin() {
  if (!localStorage.getItem('usertoken')) {
    location.href = '/'
    return false
  }
  return true
}

export function singleLogin(data) {
  if (data.code === 10001) {
    localStorage.setItem('usertoken', '')
    alert('用户在别处登录')
    location.href = '/'
    return false
  }
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
