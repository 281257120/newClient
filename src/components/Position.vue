<template>
    <div class="position">
        <!--<van-area title="标题" :area-list="areaList" />-->
        <van-area title="选择城市" :area-list="areaList" value="110101"/>

        <!--<van-area title="标题" :area-list="areaList" :columns-num="2" />-->
        <!--<van-area-->
                <!--title="标题"-->
                <!--:area-list="areaList"-->
                <!--:columns-placeholder="['请选择', '请选择', '请选择']"-->
        <!--/>-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Area } from 'vant';
    import  areaList from './select/area.js'
    // console.log(areaList)
    Vue.use(Area);
    export default {
        name: "Position",
        data () {
            return{
                areaList
            }
        },

        mounted(){
            this.$refs.checkbox.toggle();
        },
        methods:{
            confirm(e){
                console.log(e,111)
            },
        }


    }
</script>

<style scoped>
    .position{
        width: 50rem
    }
</style>
