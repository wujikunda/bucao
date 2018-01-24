import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_TOKEN](state, token) {
    state.userToken = token
  },
  [types.SET_USER_ADMIN](state, flag) {
    state.userAdmin = flag
  }
}

export default mutations