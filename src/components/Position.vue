<template>
    <div class="position">
        <!--<van-area title="标题" :area-list="areaList" />-->
        <van-area title="选择城市" :area-list="areaList" value="110101" @confirm="confirm"  @cancel="cancel" />

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
                areaList,
                city: ''
            }
        },


        methods:{
            confirm(e){
                this.city = e[2].name
                // console.log(this.city)
                this.$emit('changeCity',this.city)
                this.$store.state.positionShow = false;
            },
            cancel() {
                this.$store.state.positionShow = false;
            }

        }


    }
</script>

<style scoped>

</style>
