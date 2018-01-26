import {mapGetters, mapMutations, mapActions} from 'vuex'
import {shuffle, formatD} from 'common/js/util'
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      console.log(mapMutations, shuffle)
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}

export const tablistMixin = {
  data() {
    return {
      serchQuery: '',
      showDialog: false,
      tabListNumber: 0,
      tabData: [],
      tabTitle: [],
      tabControls: [],
      page: 1,
      deleteID: -1,
      controlsType: ''
    }
  },
  computed: {
  },
  methods: {
    refresh() {
      this._getDataList(this.page)
    },
    _getDataList() {
      throw new Error('component must implement _getDataList method')
    },
    _serachList() {
      throw new Error('component must implement _serachList method')
    },
    _formatD(format, date) {
      return formatD(format, date)
    },
    _serachByWord(query) {
      this.serchQuery = query
      this._serachList()
    },
    cancel() {
      this.showDialog = false
    },
    toPage(index) {
      this.page = index
      this._getDataList(this.page)
    }
  }
}
