import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  userToken: '',
  userInfo: {},
  homeCity: '',
  homeDetial: {},
  userAdmin: false,
  advertisement: {},
  homeList: [],
  areaList: {},
  selectList: [],
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state