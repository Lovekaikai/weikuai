<template>
    <section class="cu_f">
        <div class="title">
            邓xxx家族
        </div>
        <tab :line-width=2 active-color='#0082EF' v-model="index">
            <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper  v-if="index===0" :show-dots="false">
            <family-detail style="padding:0 15px" class="family_detail"></family-detail>
        </swiper>
        <swiper v-if="index===1" :show-dots="false">
            <p class="all_cu">共3个客户</p>
            <customer-list></customer-list>
        </swiper>
        <swiper v-if="index===2" :show-dots="false">
            {{index}}
        </swiper>
        <swiper v-if="index===3" :show-dots="false">
            {{index}}
        </swiper>
    </section>

</template>
<script>
import { Tab, TabItem, Swiper, SwiperItem } from "vux";
const list = () => ["家族详情", "客户列表", "保单列表", "服务记录"];
import customerList from "./self_customerList.vue";
import familyDetail from "./self_familyDetail.vue";
export default {
  data() {
    return {
      list2: list(),
      demo2: "家族详情",
      index: 0
    };
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    familyDetail,
    customerList
  },
  methods: {
    handler(index) {
      this.index = index;
    }
  }
};
</script>
<style lang="less" scoped>
section {
  .title {
    background: #ebf9ff;
    height: 43px;
    line-height: 43px;
    text-align: center;
  }
  .all_cu {
    margin: 10px 0 8px 15px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: 0;
  }
}
* {
  touch-action: none;
}
</style>
<style lang="less">
.cu_f {
  .family_detail {

      background: #fff !important;

  }
  .vux-swiper {
    height: 100% !important;
  }
}
</style>




