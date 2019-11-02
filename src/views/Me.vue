<template lang="pug">
    .me-container
        .info-plan
            el-button(type="text",icon="fa fa-cog fa-2x").setting-btn
            el-avatar(,:src="userInfo.headimgurl").avatar
            .text-info
                .nickname 用户昵称: {{userInfo.nickname}}
                .id ID: {{userInfo.id}}
        .main-cards
            Card.order-card
                .header(slot="header")
                    span 我的订单
                .order-btns
                    router-link(tag="li",to="/order")
                        i(class="fa fa-credit-card-alt fa-lg fa-2x")
                        span 待付款
                    router-link(tag="li",to="/order")
                        i(class="fa fa-gift fa-lg fa-2x")
                        span 取物中
                    router-link(tag="li",to="/order")
                        i(class="fa fa-truck fa-lg fa-2x")
                        span 运送中
                    router-link(tag="li",to="/order")
                        i(class="fa fa-bookmark fa-lg fa-2x")
                        span 待评价
            Card.order-history
                .header(slot="header")
                    span 订单历史

                
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { GetUserInfo } from "../header/InterfaceDeclare";
import Card from "../components/Card.vue";
import vuex from "../store";
@Component({ components: { Card } })
export default class Me extends Vue {
  get userInfo(): GetUserInfo["data"] {
    return vuex.state.currentUserInfo.value;
  }
  async mounted() {
    await vuex.dispatch("updateUserInfo");
  }
}
</script>
<style lang="scss" scoped>
@import "../element-variables";
.me-container {
  height: 100%;
  .info-plan {
    padding: 30px 10px;
    height: 200px;
    background-color: rgb(255, 193, 7);
    border-radius: 0 0 20px 20px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
    text-align: left;
    position: relative;
    .setting-btn{
        position: absolute;
        right: 30px;
        top: 30px;
        transform: translate(50%,-50%);
    }
    .avatar {
      width: 100px;
      height: 100px;
      vertical-align: middle;
    }
    .text-info {
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;
      .id,
      .nickname {
        display: block;
        margin-top: 10px;
      }
      .nickname {
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
  .main-cards {
    .header {
      text-align: left;
    }
    .order-btns {
        display: flex;
        justify-content: space-around;
      li {
        display: inline-block;
        color: $--color-primary;
        span {
          display: block;
          font-size: 1em;
        }
      }
    }
  }
}
</style>