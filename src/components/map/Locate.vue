<template>
  <div id="locate">
    <div id="allmap"></div>
  </div>
</template>

<script>
  import {MP} from '../../config/map'
  export default {
    name:'locate',
    data(){
      return{
        ak:'IkNYmE8NgxNAGocMLjhAzxH7vfCHQwqU',
        longitude:'',    //经度
        latitude:'',  //纬度
        addComp:''
      }
    },
    mounted () {
      this.$nextTick(function () {
        MP(this.ak).then( BMap => {
          let map = new BMap.Map("allmap");            // 创建Map实例
        })
      })
      this.getLocation()
    },
    methods:{
      getLocation(){
        let options = {
          enableHighAccuracy : true,
          maximumAge : 1000
        }
        if (navigator.geolocation) {
          //浏览器支持geolocation
          navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, options);
        } else {
          //浏览器不支持geolocation
          alert('您的浏览器不支持地理位置定位');
        }
      },
      onSuccess(position){
        let self = this
        self.longitude = position.coords.longitude
        self.latitude = position.coords.latitude
        //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的

        let map = new BMap.Map("allmap")
        let point = new BMap.Point(self.longitude, self.latitude)

        map.centerAndZoom(point,11)
        map.enableScrollWheelZoom()


        //获取地址
        let geoc = new BMap.Geocoder()
        map.addEventListener("click", (e)=>{
          console.log(e.point.lng + "," + e.point.lat)
          let pt = e.point;
          geoc.getLocation(pt, function(rs){
            self.addComp = rs.addressComponents
            self.$emit('mapReturn',pt,self.addComp)
            console.log(self.addComp)
            let addComp = self.addComp
            alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          })
        })
      },
      onError(error){
        switch (error.code) {
          case 1:
            alert("位置服务被拒绝");
            break;
          case 2:
            alert("暂时获取不到位置信息");
            break;
          case 3:
            alert("获取信息超时");
            break;
          case 4:
            alert("未知错误");
            break;
        }
      }
    }
  }
</script>

<style scoped>
  #allmap{
    width: 500px;
    height: 500px;
    margin:0;font-family:"微软雅黑";
  }
</style>
