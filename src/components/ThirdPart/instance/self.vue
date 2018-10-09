<template>
  <div class="self-body">
    <grid :show-lr-borders="false">
      <grid-item label="客户家族">
        <img slot="icon" :src="CustomerFamily" alt="" srcset="">
      </grid-item>
      <grid-item label="我的客户">
        <img slot="icon" :src="myClient" alt="" srcset="">
      </grid-item>
      <grid-item label="代理人">
        <img slot="icon" :src="Agent" alt="" srcset="">
      </grid-item>
      <grid-item label="客户保单">
        <img slot="icon" :src="policy" alt="" srcset="">
      </grid-item>
    </grid>
  </div>
</template>
<i18n>
Grid:
  zh-CN: 九宫格
Go to Cell:
  zh-CN: 跳转到Cell
Custom content:
  zh-CN: 自定义内容
Custom col:
  zh-CN: 自定义列
</i18n>
<script>
import { Grid, GridItem } from "vux";
const CustomerFamily = require("assets/images/客户家族@2x.png");
const Agent = require("assets/images/代理人@2x.png");
const policy = require("assets/images/客户保单@2x.png");
const myClient = require("assets/images/我的客户@2x.png");
export default {
  data() {
    return {
      CustomerFamily: CustomerFamily,
      myClient:myClient,
      Agent:Agent,
      policy:policy
    };
  },
  components: {
    Grid,
    GridItem
  },
  methods: {},
  created() {
    // 需验证用户信息请求接口 this.apiGet / apiPost / apiDelete; / apiPut
    // 详情可参考src/assets/mixins/httpMixins.js
    // let url = ''
    // this.apiGet(url).then((res) => {
    //   console.log(res)
    // })
  }
};
</script>

<style scoped>
/*引入外部样式*/
@import "../../../assets/self/css/self.css";

/* 深度作用 */
.weui-cell {
  background-color: #5876a6;
}

.self-bg {
  background-color: #2e1454;
}
* {
  touch-action: none;
}
.weui-grids{
  margin-top: 20px !important;
}
.grid-center {

  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
</style>