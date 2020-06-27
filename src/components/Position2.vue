<template>
 <div class="rlink_linkage">
   <div class="outer">
     <select name="province"
             ref="province"
             id="province">
       <option value="请选择">请选择</option>
     </select>
     <select name="city"
             ref="city"
             id="city">
       <option value="请选择">请选择</option>
     </select>
     <select name="town"
             ref="town"
             id="town">
       <option value="请选择">请选择</option>
     </select>
   </div>
 </div>
</template>
<script>
import $ from 'jquery'
import mixin from './select/address'  //minxin数据地址
export default {
 mixins: [mixin],
 name: 'Position',
 data () {
   return {}
 },
 mounted: function () {
   this.select()
 },
 methods: {
   select () {
     let self = this
     let [province, city, town] = [$('#province'), $('#city'), $('#town')]
     for (var i = 0; i < self.provinceList.length; i++) {
       addEle(province, self.provinceList[i].name)
     }
     function addEle (ele, value) {
       var optionStr = ''
       optionStr = '<option value=' + value + '>' + value + '</option>'
       ele.append(optionStr)
     }
     function removeEle (ele) {
       ele.find('option').remove()
       var optionStar = '<option value=' + '请选择' + '>' + '请选择' + '</option>'
       ele.append(optionStar)
     }
     var provinceText, cityText, cityItem
     province.on('change', function () {
       provinceText = $(this).val()
       $.each(self.provinceList, function (i, item) {
         if (provinceText === item.name) {
           cityItem = i
           return cityItem
         }
       })
       removeEle(city)
       removeEle(town)
       $.each(self.provinceList[cityItem].cityList, function (i, item) {
         addEle(city, item.name)
       })
     })
     city.on('change', function () {
       cityText = $(this).val()
       removeEle(town)
       $.each(self.provinceList, function (i, item) {
         if (provinceText === item.name) {
           cityItem = i
           return cityItem
         }
       })
       $.each(self.provinceList[cityItem].cityList, function (i, item) {
         if (cityText === item.name) {
           for (var n = 0; n < item.areaList.length; n++) {
             console.log=(this)
             addEle(town, item.areaList[n])
           }
         }
       })
     })
   }
 }
}
</script>
<style lang="less" scope>
.rlink_linkage {
 display: flex;
 justify-content: center;
 margin-top: 44px;
}
select {
 padding: 5px 0;
}
.outer {
 width: 500px;
 margin: 20px auto;
 display: flex;
 justify-content: center;
 select {
   width: 100px;
   padding: 5px 0;
   margin: 0px 5px;
 }
}
.detail-address {
 margin-left: 87px;
 height: 100px;
 width: 322px;
 padding: 5px 5px;
}
</style>


