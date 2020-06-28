<template>
  <nav class="nav" :class="aClass">
    <section class="list" v-for="(item, index) in data.list" :key="index" :style="liStyle">
      <template v-if="item.sort==5">
        <div @click="handleClick(item)" class="handle-click"></div>

        <!-- <a href="javascript:;" @click="merchantsChange"></a> -->
        <!-- <a v-href="{sUrl:item.url,preview:preview}"></a> -->
      </template>
      <template v-else>
        <a v-href="{sUrl:item.url,preview:preview}"></a>
      </template>
      <img class="icon" :src="item.img" v-lazy="item.img" v-if="bIcon && item.img" />
      <img class="icon" src="../../assets/img/default-img.jpg" v-if="bIcon && !item.img" />
      <div class="txt" v-if="bDesc">
        <template v-if="item.desc">{{ item.desc }}</template>
        <template v-else>[{{$t('lang.describe')}}]</template>
      </div>
      <i class="iconfont icon-more"></i>
    </section>

    <!-- 进入供应链 -->

    <DscLoading :dscLoading="supplierLoading">
      <div class="text">
        <!-- <p>{{$t('lang.supplier_authority_propmt')}}<router-link :to="{name:'home'}" class="color-289">{{$t('lang.home_back')}}</router-link></p> -->
        <!-- <div class="wrapper" v-if="!flag">
          <p class="wrapper-title">{{'权限不足'}}</p>

          <p class="wrapper-content">{{'您的权限不足，不能访问供应链！'}}</p>
          <div class="color-289" @click="merchantsChange">{{$t('确定')}}</div>
        </div>-->
      </div>
    </DscLoading>
    <van-popup v-model="show" class="merchantsPopup">
      <div class="title">{{$t('lang.my_merchants')}}</div>
      <div class="content">
        <van-radio-group v-model="result">
          <van-radio name="0">{{$t('lang.merchants_store')}}</van-radio>
          <van-radio name="1">{{$t('lang.supplier_apply')}}</van-radio>
        </van-radio-group>
        <van-button type="danger" class="mButton" @click="onConfirm">{{$t('lang.confirm')}}</van-button>
      </div>
    </van-popup>
  </nav>
</template>

<script>
// custom componentsuser-function-listuser-function-list

// third party components
import { Radio, RadioGroup, Popup, Button } from "vant";
//供应链
// import {  RadioGroup, } from "vant";
import DscLoading from "@/components/DscLoading";

import { mapState } from "vuex";
import store from "@/store/index";

export default {
  name: "nav-head",
  props: ["data", "preview"],
  components: {
    [Popup.name]: Popup,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Button.name]: Button,
    DscLoading
    // [Radio.name]: Radio,
    // [RadioGroup.name]: RadioGroup,
  },
  data() {
    return {
      show: false,
      result: "0",
      sort: ""
    };
  },

  created() {},
  computed: {
    ...mapState({
      supplierLoading: state => state.supplierLoading
    }),
    liStyle() {
      if (this.showStyle == 0) return false;
      let nWidth = 100 / this.showNumber;
      return {
        width: nWidth + "%"
      };
    },
    bIcon() {
      return this.data.isIconSel == "0" ? true : false;
    },
    bDesc() {
      if (this.showStyle == "1") {
        return this.data.isDescSel == "0" ? true : false;
      } else {
        return true;
      }
    },
    listStyle() {
      return this.showStyle == "0" ? "list-style1" : "list-style2";
    },
    showStyle() {
      return this.data.isStyleSel;
    },
    showNumber() {
      return this.data.isNumberSel;
    },
    aClass() {
      let arr = [];
      arr.push(this.listStyle);
      if (this.listStyle == "list-style2") {
        this.data.styleSelList.map((v, i) => {
          switch (v) {
            case "0":
              arr.push("whole-margin");
              break;
            case "1":
              arr.push("all-padding");
              break;
            case "2":
              arr.push("all-border");
              break;
            default:
              break;
          }
        });
      }
      return arr;
    }
  },
  methods: {
    mAlertToSupplier() {
      //弹窗去选择框
      const content = window.confirm("您的权限不足，无法访问！");
      if (content) {
        console.log("弹窗去选择");
        this.choose();
      }
    },
    alertToHome() {
      //弹窗去首页
      const content = window.alert("您的权限不足，无法访问！");
      if (content) {
        console.log(111)
        this.$router.push({
          name: "home"
        });
      }
    },
    choose() {
      //选择页
      this.show = true;
    },
    handleClick(item) {
      // let url = item.url.split("#")[1];
      // this.$router.push({ path: url });

      if (store.state.token !== null) {
        //  debugger
        // 判断是否已经登录,已登录
        // if (!this.supplierLoading) {
        //   //判断是否需要供应链权限,需要
        //   this.mAlertToSupplier();
        //   // console.log(this.show);
        // }else{
            //判断是否需要供应链权限
              store.dispatch('setSupplier').then(res=>{
                  if(res.status == 'success'){
                      if(res.data){
                          this.mAlertToSupplier();
                      }else{
                          this.$router.push({
                              name:"supplier"
                          })
                      }
                  }
              })
        }
       else {
        //未登录
        this.alertToHome();
      }
    },
    merchantsChange() {
      if (this.suppliers > 0) {
        this.show = true;
      } else {
        this.$router.push({
          name: "merchants"
        });
      }
    },
    onConfirm() {
      //选择入住类型并跳转
      if (this.result == 0) {
        this.$router.push({
          name: "merchants"
        });
      } else {
        this.$router.push({
          name: "supplier-apply"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/config.scss";
@import "../../assets/style/mixins/common.scss";
.nav {
  background: #fff;
  overflow: hidden;
}

.nav .list {
  overflow: hidden;
  box-sizing: content-box;
  position: relative;
}

.nav .list img {
  display: block;
}

.nav .txt {
  font-size: 1.5rem;
  color: $text-title-color;
  @include flex1-1();
  min-width: auto;
  min-height: auto;
}

.list a {
  border-left: 0;
  @include urlAbsolute();
}

.list-style1 {
  padding-bottom: 0;
  padding: 0 $padding-all;
}

.list-style1 .list {
  height: 4.8rem;
  border-bottom: 1px solid $border-color-split;
  @include box-pack(center, start);
  @include direction(center, initial);
}

.list-style1 .list .icon-more {
  color: $title-color;
  font-size: 1.2rem;
}

.list-style1 .list:last-of-type {
  border-bottom: 0;
}

.list-style1 .list img {
  height: 64%;
  width: auto;
  margin-right: 0.5rem;
}

.list-style2 .list {
  width: 20%;
  float: left;
  text-align: center;
  /*border-bottom: 0 !important;*/
  /*padding-top: $padding-all*1.2;*/
  overflow: hidden;
}

.list-style2 .list img {
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}

.list-style2 .list .txt {
  margin-top: 0.2rem;
  font-size: 1.3rem;
  height: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.list-style2 .list .icon-more {
  display: none;
}

.list-style2.whole-margin {
  padding: $padding-all 0;
}

.list-style2.all-padding section {
  box-sizing: border-box;
  padding: 0.4rem;
}

.list-style2.all-border {
}

.list-style2.all-border section {
  box-sizing: border-box;
  margin-bottom: -1px;
  border: 1px solid $body-background;
  border-right: 0;
}
.merchantsPopup {
  width: 70%;
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.merchantsPopup .title {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  color: #000;
  font-size: 20px;
  border-bottom: 1px solid #000000;
  padding: 0 0 2rem;
}
.merchantsPopup .content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.merchantsPopup .van-radio-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3rem 0;
}
.merchantsPopup .van-radio {
  margin-right: 10px;
}
.merchantsPopup .van-radio__input {
  font-size: 18px;
}
.handle-click {
  position: absolute;
  width: 100%;
  height: 8rem;
  // border:1px solid black
}
.handle-click:hover {
  cursor: pointer;
}
</style>
