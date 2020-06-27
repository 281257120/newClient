<template>
  <div :class="['choose-wrap', disabled ? 'disabled' : '']" @click="showWrapper" v-document-click="documentClick">
    <div class="choose">
      <span>{{value}}</span>
      <i class="el-icon-caret-bottom"></i>
      <div :class="{'mt-content': true, 'active': showWrapperActive}">
          <h2>{{title}}</h2>
          <div :class="['wrapper', className]">
              <div class="col" v-for="(listData, index) in renderList" :key="index">
                  <span :class="{'mt-item': true, 'active': item.name === value}" v-for="(item, index) in listData" :key="index" @click="changeValue(item)"> {{item.name}}</span>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
//下拉列表组件：
export default {
    data() {
        return {
            // showWrapperActive: false
        }
    },
    props: ['list', 'value', 'title', 'showWrapperActive','disabled','className'],
    computed: {  //数据一共成几列展示：
        renderList : function () {
            let col = Math.ceil(this.list.length / 12)
            let resultList = []
            for (let i = 0; i < col; i++){
                let data = this.list.slice(i * 12, i * 12 + 12)
                resultList.push(data)
            }
            return resultList
        }
    },
    methods: {
        showWrapper(e) {
            e.stopPropagation();
            // this.showWrapperActive = true
            if (!this.disabled) {  //当选择省份后才可以点击更改：
                this.$emit('change_active', true)
            }

        },
        documentClick() {
            // this.showWrapperActive = false;
            this.$emit('change_active', false)
            // console.log('documentClick')
        },
        changeValue(item) {
            this.$emit('change', item)
        }
    }
};
</script>
<style lang="scss">
@import "@/assets/css/changeCity/select.scss";
</style>
