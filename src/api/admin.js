import {jsonpAdmin} from 'common/js/jsonp'
// import {jsonpAdmin} from 'common/js/axios'
import { options, HTTPIP } from './config'
import { getDate } from './crypto'

// 用户注册
export function userRegister(mobile, verifycode, password) {
  let url = HTTPIP + '/v1/register'
  let objData = {
    mobile: mobile,
    verifycode: verifycode,
    password: password,
    timestamp: getDate()
  }
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
  return jsonpAdmin(url, objData, options)
}
// 用户注销
export function userLogout(acctoken) {
  let url = HTTPIP + '/v1/outLogin'
  let objData = {
    accesstoken: acctoken,
    timestamp: getDate()
  }
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
  return jsonpAdmin(url, objData, options)
}
// 布草列表 start limit
export function linenList(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/list'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 布草搜索 kindid searchword
export function linenQuery(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/query'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 布草删除 linenid
export function linenDelete(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/delete'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 布草详情 linenid
export function linenDetail(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/detail'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 布草编辑 id
export function linenUpdate(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/update'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 布草种类列表 start limit
export function linenKindList(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/kind/list'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 布草种类删除 kindid
export function linenKindDelete(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/kind/delete'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 布草种类编辑 kindname
export function linenKindUpdate(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/kind/update'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 布草种类搜索 searchword
export function linenKindQuery(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/kind/query'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 系统库存日志列表 start limit
export function linenStockList(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/stock/list'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 系统库存日志搜索 kindid searchword
export function linenStockQuery(obj = {}) {
  let url = HTTPIP + '/sig/v1/linen/stock/query'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 套件列表 start limit searchword
export function packagelinensList(obj = {}) {
  let url = HTTPIP + '/sig/v1/packagelinens/list'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 套件详情 Packagelinensid
export function packagelinensDetail(obj = {}) {
  let url = HTTPIP + '/sig/v1/packagelinens/detail'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 套件新增 name linedids id
export function packagelinensUpdate(obj = {}) {
  let url = HTTPIP + '/sig/v1/packagelinens/update'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// 套件新增 Packagelinensid
export function packagelinensDelete(obj = {}) {
  let url = HTTPIP + '/sig/v1/packagelinens/delete'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}

// RFID列表
export function rfidList(obj = {}) {
  let url = HTTPIP + '/sig/v1/rfid/list'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}
// RFID搜索 searchword
export function rfidQuery(obj = {}) {
  let url = HTTPIP + '/sig/v1/rfid/query'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}
// RFID删除 rfidid
export function rfidDelete(obj = {}) {
  let url = HTTPIP + '/sig/v1/rfid/delete'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}
// RFID新增/编辑 name linenname
export function rfidUpdate(obj = {}) {
  let url = HTTPIP + '/sig/v1/rfid/update'
  let objData = Object.assign({}, obj, {
    timestamp: getDate()
  })
  return jsonpAdmin(url, objData, options)
}
const allFun = {
  userRegister,
  managerLogin,
  userLogout,
  forgetPW,
  managerModifyPW,
  linenList,
  linenQuery,
  linenDelete,
  linenDetail,
  linenUpdate,
  linenKindList,
  linenKindDelete,
  linenKindUpdate,
  linenKindQuery,
  linenStockList,
  linenStockQuery,
  packagelinensList,
  packagelinensDetail,
  packagelinensUpdate,
  packagelinensDelete,
  rfidList,
  rfidQuery,
  rfidDelete,
  rfidUpdate
}

export default allFun

export const managerBeforeList = {}
export const managerBeforeDel = {}
export const managerBeforeDetail = {}