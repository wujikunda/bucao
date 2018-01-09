import {jsonpAdmin} from 'common/js/jsonp'
import { options, HTTPIP } from './config'
import { getSign, getDate } from './crypto'

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
  return jsonpAdmin(url, objData, options)
}
// 用户登录
export function managerLogin(account, password) {
  let url = HTTPIP + '/v1/managerLogin'
  let objData = {
    account: account,
    password: password,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
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
  return jsonpAdmin(url, objData, options)
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
  return jsonpAdmin(url, objData, options)
}

// 用户修改密码
export function managerModifyPW(account, oldpw, password) {
  let url = HTTPIP + '/v1/managerModifyPW'
  let objData = {
    account: account,
    oldpw: oldpw,
    password: password,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
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
  return jsonpAdmin(url, objData, options)
}
// 用户列表
export function managerUserList(start, limit) {
  let url = HTTPIP + '/v1/managerUserList'

  let objData = {
    start: start,
    limit: limit,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 用户搜索
export function managerSearchUser(mobile) {
  let url = HTTPIP + '/v1/managerSearchUser'

  let objData = {
    mobile: mobile,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}

// 用户删除
export function managerDelUser(userid) {
  let url = HTTPIP + '/v1/managerDelUser'

  let objData = {
    userid: userid,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}

// 房源列表
export function managerHouseList(obj) {
  let url = HTTPIP + '/v1/managerHouseList'

  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 删除房源
export function managerDelHouse(houseid) {
  let url = HTTPIP + '/v1/managerDelHouse'

  let objData = {
    houseid: houseid,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 设置房源状态
export function managerHouseState(houseid, state) {
  let url = HTTPIP + '/v1/managerHouseState'

  let objData = {
    houseid: houseid,
    state: state,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 资金管理列表
export function managerAccountList(obj) {
  let url = HTTPIP + '/v1/managerAccountList'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 广告列表
export function managerAdvertList() {
  let url = HTTPIP + '/v1/managerAdvertList'

  let objData = {
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 添加/更新广告
export function managerAdvertAdd(obj) {
  let url = HTTPIP + '/v1/managerAdvertAdd'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 删除广告
export function managerAdvertDel(advertid) {
  let url = HTTPIP + '/v1/managerAdvertDel'

  let objData = {
    advertid: advertid,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 意见列表
export function managerFeedbackList(obj) {
  let url = HTTPIP + '/v1/managerFeedbackList'

  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 删除建议
export function managerFeedbackDel(feedbackid) {
  let url = HTTPIP + '/v1/managerFeedbackDel'

  let objData = {
    feedbackid: feedbackid,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 更新建议
export function managerFeedbackState(feedbackid, dealstate) {
  let url = HTTPIP + '/v1/managerFeedbackState'

  let objData = {
    feedbackid: feedbackid,
    dealstate: dealstate,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 获取押金
export function managerCashGet() {
  let url = HTTPIP + '/v1/managerCashGet'

  let objData = {
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}

// 更改押金
export function managerCashUpdate(cashmoney) {
  let url = HTTPIP + '/v1/managerCashUpdate'

  let objData = {
    cashmoney: cashmoney,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}

// 我要预租列表
export function managerBeforeList(start, limit) {
  let url = HTTPIP + '/v1/managerBeforeList'
  let objData = {
    start: start,
    limit: limit,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 删除预租
export function managerBeforeDel(beforeid) {
  let url = HTTPIP + '/v1/managerBeforeDel'

  let objData = {
    beforeid: beforeid,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
// 预租详情
export function managerBeforeDetail(beforeid) {
  let url = HTTPIP + '/v1/managerBeforeDetail'

  let objData = {
    beforeid: beforeid,
    timestamp: getDate()
  }
  let sign = getSign(objData)
  objData.sign = sign
  return jsonpAdmin(url, objData, options)
}
