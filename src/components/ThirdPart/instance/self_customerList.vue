<template>
    <div class="cus_list">
         <div class="list_item">
            <p>客户名称</p>
            <div class="l_c_t">手机号码：13535586464</div>
            <div class="l_c_t">更新时间：2017/07/15 10:03</div>
            <group>
                <cell-box is-link>
                    <span class="user">创建人：<img :src="imgs" alt="" srcset=""> <span>小明</span></span>
                </cell-box>
            </group>
        </div>
        <div class="list_item">
            <p>客户名称</p>
            <div class="l_c_t">手机号码：13535586464</div>
            <div class="l_c_t">更新时间：2017/07/15 10:03</div>
            <group>
                <cell-box is-link>
                    <span class="user">创建人：<img :src="imgs" alt="" srcset=""> <span>小明</span></span>
                </cell-box>
            </group>
        </div>
      <div class="list_item">
            <p>客户名称</p>
            <div class="l_c_t">手机号码：13535586464</div>
            <div class="l_c_t">更新时间：2017/07/15 10:03</div>
            <group>
                <cell-box is-link>
                    <span class="user">创建人：<img :src="imgs" alt="" srcset=""> <span>小明</span></span>
                </cell-box>
            </group>
        </div>
      <div class="list_item">
            <p>客户名称</p>
            <div class="l_c_t">手机号码：13535586464</div>
            <div class="l_c_t">更新时间：2017/07/15 10:03</div>
            <group>
                <cell-box is-link>
                    <span class="user">创建人：<img :src="imgs" alt="" srcset=""> <span>小明</span></span>
                </cell-box>
            </group>
        </div>
      <div class="list_item">
            <p>客户名称</p>
            <div class="l_c_t">手机号码：13535586464</div>
            <div class="l_c_t">更新时间：2017/07/15 10:03</div>
            <group>
                <cell-box is-link>
                    <span class="user">创建人：<img :src="imgs" alt="" srcset=""> <span>小明</span></span>
                </cell-box>
            </group>
        </div>
    </div>
</template>
<script>
import { CellBox, Group } from "vux";
const imgs = require("assets/images/代理人@2x.png");
export default {
  data() {
    return {
      imgs: imgs
    };
  },
  components: {
    CellBox,
    Group
  }
};
</script>
<style lang="less" scoped>
.cus_list {
  .list_item {
    height: 137px;
    background: #fff;
    margin-bottom: 20px;
    p {
      font-family: PingFangSC-Regular;
      font-size: 17px;
      color: #000000;
      line-height: 24px;
      padding: 10px 0 3px 15px;
    }
    .l_c_t {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #9b9b9b;
      line-height: 22px;
      padding: 3px 0 3px 15px;
    }
    .user {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #9b9b9b;
      img {
        width: 20px;
        height: 20px;
        border-radius: 22px;
        display:inline-block;
        vertical-align:middle;
      }
    }
  }
}
</style>

