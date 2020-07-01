<template>
 <div class="m-map">

     <p @click="showPopup">{{LocationCity}}</p>


     <!--城市搜索：-->
     <van-popup
     v-model= $store.state.positionShow
     position="left"
     :style="{height:'42%',width:'100%'}"
     round
     >
     <m-position class="position-list" @changeCity="changeCity" />
     </van-popup>
 </div>
</template>
<script>
// import BMap from "BMap";  //定位
import MPosition from "@/components/Position"
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);
export default {
    name:"m-map",
    components: {
       Popup,
        MPosition,

    },
  data() {
    return {
      LocationCity: "正在定位", //给渲染层定义一个初始值
      show:false,
    };
  },
  mounted() {
    this.city(); //触发获取城市方法
  },
  methods: {
    city() {
      //定义获取城市方法
      const geolocation = new BMap.Geolocation();
      var _this = this;
      geolocation.getCurrentPosition(
        function getinfo(position) {
          let city = position.address.city; //获取城市信息
          let province = position.address.province; //获取省份信息
          _this.LocationCity = city;
        },
        function(e) {
          _this.LocationCity = "定位失败";
        },
        { provider: "baidu" }
      );
    },
      handleClick() {
        this.flag = true
      },
      showPopup() {
          this.$store.state.positionShow = !this.$store.state.positionShow
          // console.log(this.$store.state.positionShow)
      },
      changeCity(e){
          console.log(e)
          this.LocationCity = e
      },
  },
};
</script>
<style  scoped>

.position-list{
  /*positive: relative;*/
  /*display: flex;*/
  /*width: 800px*/
}
    p{
        color: #fff;
        text-align: left;
        font-size: 1.2rem;
        display: -moz-flex !important;
        display: -ms-flex !important;
        display: -webkit-box !important;
        display: -ms-flexbox !important;
        display: flex !important;
        display: flex;
        display: -webkit-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-top: 0.4rem;
    }
</style>


