<template>
    <div class="mapBox">
      <div id="div1" :style="style"></div>
      <div class="btnc" @click="toHere">去导航</div>
    </div>
</template>
<script type="text/ecmascript-6">
export default{
  data() {
    return{
      style:{
        width:'100%',
        height:this.height+'px'
      }
    }
  },
  props:{	//里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
    height:{
      type:Number,
      default:300
    },
    mapTitle: {
      type: String,
      default: '我的位置'
    },
    longitude:{},	//定义经度
    latitude:{}	//定义纬度
  },
  mounted(){
    this.updateMap()
  },
  methods: {
    updateMap() {
      var map = new BMap.Map("div1");
      var point = new BMap.Point(this.longitude,this.latitude);
      map.centerAndZoom(point, 12);
      var marker = new BMap.Marker(point);// 创建标注
      map.addOverlay(marker);
      
    },
    toHere() {
      let hrefLi = `http://api.map.baidu.com/marker?location=${this.latitude},${this.longitude}&title=${this.mapTitle}&content=${this.mapTitle}&output=html`
      location.href = hrefLi
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.mapBox
  position relative
  .btnc
    border-radius 10px
    padding 5px 10px
    cursor pointer
    font-size $font-size-medium-x
    right 3px
    position absolute
    color white
    bottom 3px
    text-align center
    background-color $color-theme
</style>