<template lang="pug">
    el-container.base-container
        el-header(height="40px").base-header
            p {{headerText}}
        el-main.base-content
            router-view
        el-footer.base-footer
            .warpper
                router-link(to="/",tag="li")
                    i(class="fa fa-home") 
                        .linkText 首页
                router-link(to="/order",tag="li")
                    i(class="fa fa-list") 
                        .linkText 订单
                router-link(to="/me",tag="li")
                    i(class="fa fa-user") 
                        .linkText 我的
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import vuex from "../../store";
@Component
export default class Base extends Vue {
  get headerText(): string {
    return vuex.state.headerText.value;
  }
  get footerState(): number {
    return vuex.state.footer.value;
  }
}
</script>
<style lang="scss" scoped>
.base-container {
  height: 100%;
  .base-content{
      background-color: rgb(240, 240, 240);
  }
  .base-header{
      background-color: rgb(240, 240, 240);
      color: rgb(20, 20, 20);
      font-weight: 800;
      box-shadow: 0 4px 6px -4px rgba(0,0,0,.4);
      p{
          margin: 0;
          vertical-align: middle;
          display: inline-block;
      }
      &:before{
          height: 100%;
          width: 0;
          display: inline-block;
          vertical-align: middle;
          content: '';
      }
  }
  .base-footer{
    background-color: rgb(240, 240, 240);
    box-shadow: 0 -4px 6px -4px rgba(0,0,0,.4);
    .warpper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li{
            color:rgb(115, 105, 91);
            display: inline-block;
            &.router-link-exact-active{
                i{
                    text-shadow: 0 0 3px,0 0 6px;
                }
            }
        }
    }
}
}

</style>