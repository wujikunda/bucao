export const userToken = state => state.userToken

export const userInfo = state => state.userInfo

export const homeCity = state => state.homeCity

export const homeList = state => state.homeList

export const homeDetial = state => state.homeDetial

export const areaList = state => state.areaList

export const selectList = state => state.selectList

export const userAdmin = state => state.userAdmin

export const advertisement = state => state.advertisement

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
