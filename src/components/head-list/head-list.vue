<template>
  <div class="header">
    <section class="headCont">
      <div class="logoBox">
        <img class="logo" src="~common/image/logo_index.png">
        <drop-menu  
          class="dropmenu"
          ref="dropMenu"
          :singleTitle ="cityname"
          @switch="switchItem" 
          :isSingle = "true"
          :dropData="cityList">
        </drop-menu>
      </div>
      <div class="tab" >
        <div v-for="(item,index) in routerObj" :key="index"  class="tab-items">
          <router-link tag="div" class="tab-item" :to="item.path" style="cursor:pointer">
            <span class="tab-link">{{item.title}}</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {changeImage} from 'common/js/dom'
  import DropMenu from 'base/drop-menu/drop-menu'
  import {getCityList,getCityWithLng,getAreaList} from 'api/home'
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data() {
      return {
        routerObj: [
          {path: '/pc/home', incoPath: 'tab_home', title: '首页'},
          {path: '/pc/compareList', incoPath: 'tab_compare', title: '房源对比'},
          {path: '/pc/myPublish', incoPath: 'tab_fabu', title: '我的发布'},
          {path: '/pc/setting/member', incoPath: 'tab_center', title: '个人中心'}
        ],
        tabIconList: [],
        cityList:[]
      }
    },
    computed: {
      cityname(){
        return this.homeCity.cityname
      },
      ...mapGetters([
        'areaList',
        'homeCity'
      ])
    },
    mounted() {
      this.initIconlist()
      this._initLocalCity()
      this._initCityList()
      if(localStorage.getItem('cityid') && localStorage.getItem('cityname')){
        return
      }
      let _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          _this._getCityWithLng({
            longitude: r.point.lng,
            latitude: r.point.lat
          })
        }
        else {
          alert('failed'+this.getStatus());
        }        
      },{enableHighAccuracy: true})
      
    },
    updated() {
      this._getAreaList(this.homeCity.cityid)
    },
    watch: {
      '$route': 'initIconlist'
    },
    methods: {
      gets() {
      },
      switchItem(type, index, id, text) {
        this.setHomeCity({
            cityname: text,
            cityid: id
          })
      },
      _initLocalCity() {
        if(localStorage.getItem('cityid') && localStorage.getItem('cityname')) {
          this.setHomeCity({
            cityname: localStorage.getItem('cityname'),
            cityid: localStorage.getItem('cityid')
          })
        }else{
          this.setHomeCity({
            cityname: '厦门市',
            cityid: "350200"
          })
          this._getAreaList(this.homeCity.cityid)
        }
        
      },
      _getAreaList(cirtyId){
        let _this = this
        getAreaList(localStorage.getItem('usertoken'), cirtyId).then((res) => {
          if(!res.code){
            let arealist = {}
            res.data.forEach(element => {
              arealist[element.areaid] = {}
              arealist[element.areaid]['areaname'] = element.areaname
              arealist[element.areaid]['areaid'] = element.areaid
            });
            _this.setAreaList(arealist)
          }else{
            alert(res.msg)
          }
          // console.log('getCityList',res)
        })
      },
      _getCityWithLng(obj) {
        let _this = this
        getCityWithLng(localStorage.getItem('usertoken'), obj).then((res) => {
          if(!res.code){
            _this.setHomeCity(res.data)
            localStorage.setItem('cityid', res.data.cityid)
            localStorage.setItem('cityname', res.data.cityname)
          }else{
            alert(res.msg)
          }
        })
      },
      _initCityList() {
        let _this = this
        getCityList(localStorage.getItem('usertoken')).then((res) => {
          if(!res.code){
            let dlist = []
            res.data.forEach(element => {
              dlist.push({text:element.cityname,id:element.cityid})
            });
            _this.cityList =[{ 
              title: _this.homeCity.cityname,
              data: dlist,
              currentIndex: -1,
              funParam: 'cityid'
            }]
          }else{
            alert(res.msg)
          }
        })

      },
      initIconlist() {
        let arr = [];
        for(let i = 0; i < 4; i++) {
          let type = 'normal'
          if(this.$route.path === this.routerObj[i].path){
            type = 'checked'
          }
          arr.push( changeImage(this.routerObj[i].incoPath, type) )
        }
        this.tabIconList = arr
      },
      ...mapMutations({
        setHomeCity: 'SET_HOME_CITY',
        setAreaList: 'SET_AREA_LIST'
      })
    },
    components: {
      DropMenu
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
.header
  background-color: $color-white
  box-shadow 0px 3px 3px -3px #bbb
  margin-bottom 3px
.headCont 
  width 1200px
  display flex
  height 100px
  align-items center
  
  justify-content space-between
  margin 0 auto
  .logoBox
    display flex
    height 100px
    align-items center
    justify-content space-between
    .dropmenu
      width 100px
      text-align center
  .logo
    margin-right 10px
    width 143px
    height 35px
.tab 
  width 300px
  display flex
  font-size: $font-size-medium;
  .tab-items 
    &>.router-link-active 
      .tab-link 
        color: $color-theme;
  .tab-item 
    display block
    padding 10px
    box-sizing border-box
    text-align center
    .tab-link 
      color: $color-text-l
      line-height: 20px
      display : block
</style>