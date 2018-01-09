import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_TOKEN](state, token) {
    state.userToken = token
  },
  [types.SET_USER_INFO](state, obj) {
    state.userInfo = obj
  },
  [types.SET_HOME_LIST](state, list) {
    state.homeList = list
  },
  [types.SET_HOME_DETIAL](state, detial) {
    state.homeDetial = detial
  },
  [types.SET_HOME_CITY](state, value) {
    state.homeCity = value
  },
  [types.SET_SELECT_LIST](state, list) {
    state.selectList = list
  },
  [types.SET_AREA_LIST](state, list) {
    state.areaList = list
  },
  [types.SET_USER_ADMIN](state, flag) {
    state.userAdmin = flag
  },
  [types.SET_ADVERTISEMENT](state, flag) {
    state.advertisement = flag
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  }
}

export default mutations