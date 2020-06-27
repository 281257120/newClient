<template>
  <div class="home">
    <!-- <transition name="fade">
          <v-splash v-show="splash"></v-splash>
    </transition>-->

    <template v-if="bType == 'store'">
      <ec-search :preview="false" :data="searchStoreData"></ec-search>
      <ec-shop-signs :preview="false"></ec-shop-signs>
      <ec-line :preview="false" :data="lineData"></ec-line>
    </template>
    <template v-else-if="bType == 'home'">
      <app-down></app-down>
    </template>
    <component
      v-for="(item,index) in modules"
      :key="index"
      :is="'ec-'+item.module"
      :data="item.data"
      :preview="false"
      :modules-index="index"
    >{{ item }}</component>
    <template v-if="bType == 'store'">
      <ec-shop-menu :preview="false"></ec-shop-menu>
      <CommonNav></CommonNav>
    </template>
    <template v-else>
      <ec-tab-down v-if="bType !='store'"></ec-tab-down>

      <!--天降红包-->
      <van-popup v-model="bonusShow" class="bonus-show" v-if="bonusData" style="width: 80%;">
        <a :href="bonusData.ad_link">
          <img :src="bonusData.popup_ads" class="img" v-if="bonusData.popup_ads" />
        </a>
      </van-popup>
    </template>
    <ec-filter-top :preview="false" v-if="bType != 'store'"></ec-filter-top>

   
  </div>
</template>

<script>
//node library
import url from "url";
import qs from "qs";

// mapActions mapState
import { mapActions, mapState } from "vuex";

// custom components
import EcSlide from "@/components/slide/Frontend";
import EcTitle from "@/components/title/Frontend";
import EcAnnouncement from "@/components/announcement/Frontend";
import EcNav from "@/components/nav/Frontend";
import EcLine from "@/components/line/Frontend";
import EcBlank from "@/components/blank/Frontend";
import EcJigsaw from "@/components/jigsaw/Frontend";
import EcProduct from "@/components/product/Frontend";
import EcCoupon from "@/components/coupon/Frontend";
import EcCountDown from "@/components/count-down/Frontend";
import EcButton from "@/components/button/Frontend";
import EcSearch from "@/components/search/Frontend";
import EcStore from "@/components/store/Frontend";
import EcShopSigns from "@/components/shop-signs/Frontend";
import EcShopMenu from "@/components/shop-menu/Frontend";
import EcTabDown from "@/components/tab-down/Frontend";
import EcFilterTop from "@/components/element/FilterTop";
import AppDown from "@/components/element/AppDown";
import CommonNav from "@/components/CommonNav";


// third party components
import { Button } from "element-ui";

//data-conversion
import { conversion } from "@/assets/js/data-conversion";

import { Radio, RadioGroup, Popup } from "vant";


export default {
  name: "home",
  components: {
    EcButton: Button,
    EcSlide,
    EcTitle,
    EcAnnouncement,
    EcNav,
    EcLine,
    EcBlank,
    EcJigsaw,
    EcProduct,
    EcCoupon,
    EcCountDown,
    EcSearch,
    EcStore,
    EcShopSigns,
    EcShopMenu,
    EcTabDown,
    EcFilterTop,
    AppDown,
    CommonNav,
    [Popup.name]: Popup,
  

  },
  data() {
    return {
      fromId: "",
      share: "",
      shop_title: "",
      initial: "",
      bonusShow: false,
      bonusData: "",
      show: false,
      // result: 0
    };
  },
  created() {
    let load = "";
    if (this.bType == "index") {
      load = localStorage.getItem("modules") ? 0 : "";
    } else {
      load = this.$route.params.id;
    }

    let modulesType = JSON.parse(localStorage.getItem("modulesType"));
    if (modulesType == null) {
      this.setModulesType();
    }

    this.init(load);
  },
  
  mounted() {
    if (this.bType == "index") {
      this.shopConfig();
    }
  },
  methods: {
    init(id) {
      let modulesType = JSON.parse(localStorage.getItem("modulesType"));
      let codeurl = this.$route.query.codeurl; //从后台扫码进入前台标识
      if (this.bType == "home") {
        if (
          modulesType.type != window.shopInfo.type ||
          modulesType.name != this.bType ||
          this.bStore != id ||
          this.modules == null ||
          codeurl === "true"
        ) {
          this.getModule({
            ru_id: this.bStore,
            type: this.bType
          });

          //更新缓存modulesType
          this.setModulesType();

          //更新判断是否使用缓存
          this.initial = true;
          return;
        } else {
          this.initial = false;
        }
      } else {
        this.initial = true;
        //判断是否是专题首页
        if (this.bType == "topic") {
          this.$store.dispatch("setModuleInfo", {
            id: this.$route.params.id,
            type: this.bType
          });
        } else {
          this.getModule({
            ru_id: this.bStore,
            type: this.bType
          });
        }
      }
    },
  

    setModulesType() {
      let newModulesType = {
        type: window.shopInfo.type,
        name: this.bType
      };

      localStorage.setItem("modulesType", JSON.stringify(newModulesType));
    },
    getModule(o) {
      this.modules = [];
      this.$http
        .post(`${window.ROOT_URL}api/v4/visual/default`, qs.stringify(o))
        .then(({ data }) => {
          if (data.data) {
            this.$store.dispatch("setModuleInfo", {
              id: data.data,
              type: o.type
            });
          } else {
            Toast({
              message: data.errors.message,
              duration: 1000
            });
            this.$router.push({
              name: "home"
            });
          }
        });
    },
    shopConfig() {
      let configData = JSON.parse(sessionStorage.getItem("configData"));
      if (!configData) {
        this.$http
          .get(`${window.ROOT_URL}api/v4/shop/config`)
          .then(({ data: { data } }) => {
            //首页天降红包广告
            this.bonusData = data.bonus_ad;

            //单独设置微信分享信息
            this.$wxShare.share({
              title: data.shop_title,
              desc: data.shop_desc,
              link: window.location.href,
              imgUrl: data.wap_logo
            });

            //设置title
            document.title = data.shop_title;
            sessionStorage.setItem("configData", JSON.stringify(data));
          });
      } else {
        //单独设置微信分享信息
        this.$wxShare.share({
          title: configData.shop_title,
          desc: configData.shop_desc,
          link: window.location.href,
          imgUrl: configData.wap_logo
        });

        //首页天降红包广告
        //this.bonusData = configData.bonus_ad;

        //设置title
        document.title = configData.shop_title;
      }
    },

    //供应链弹窗回调
    merchantsChange() {
      this.flag = true;
    },
    onConfirm() {
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
  },
  computed: {
    ...mapState({
      searchStoreData: state => state.shopInfo.searchStoreData,
      lineData: state => state.shopInfo.lineData,
      titleData: state => state.shopInfo.titleData,
      productData: state => state.shopInfo.productData,
      // supplierLoading: state => state.supplierLoading
    }),
    bStore() {
      return this.$route.params.id ? this.$route.params.id : 0;
    },
    bType() {
      let type = "index";
      if (this.$route.name == "home") {
        type = "index";
      } else if (this.$route.name == "shopHome") {
        type = "store";
      } else if (this.$route.name == "topicHome") {
        type = "topic";
      }
      return type;
    },
    bMoudles() {
      return 0 < this.modules.length ? true : false;
    },
    modules: {
      get() {
        return this.$store.state.modules;
      },
      set(val) {
        this.$store.state.modules = val;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.fromId = from.params.id ? parseInt(from.params.id) : 0;
      this.init(this.fromId);
    },
    bonusData() {
      if (this.bonusData && this.bonusData.open == 1) {
        this.bonusShow = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.bonus-show {
  background: none;
}
</style>
<style lang="stylus" rel="stylesheet/stylus">
#splash {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.3s ease;
  box-sizing: border-box;

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }
}
</style>
<style lang="scss" scoped>
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
  padding: 4rem 0;
  
}
.merchantsPopup .van-radio {
  margin-right: 10px;
}
.merchantsPopup .van-radio__input {
  font-size: 18px;
}
.merchantsPopup .mButton{
    color: #fff;
    background-color: #f44;
    border: 1px solid #f44;
    position: relative;
    padding: 0;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
    text-align: center;
    -webkit-appearance: none;
    -webkit-text-size-adjust: 100%;
}

</style>

