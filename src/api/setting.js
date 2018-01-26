import {getQuestToken} from 'common/js/jsonp'
import { TEST, HTTPIP } from './config'
// import { getSign, getDate } from './crypto'
import axios from 'axios'

export function uploadImg(token, file) {
  return new Promise(function(resolve, reject) {
    const url = HTTPIP + '/upload/file'
    if (TEST) {
      resolve('https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=1428468521,666057007&fm=85&s=138268A3CE33DFC614B16D2403007050')
      return
    }
    var data = getQuestToken()
    data.then((token) => {
      file.append('token', token)
      axios({
        url: url,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: file
      }).then((res) => {
        resolve(res.data)
      })
    })
  })
}
