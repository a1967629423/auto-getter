<template lang="pug">
    el-container.getter-container
        el-header(height="40px").getter-header
            i(@click="back").fa.fa-angle-left.back
            p {{headerText}}
        el-main.getter-main
            router-view
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import vuex from "../../store";
@Component
export default class GetterLayerout extends Vue {
  get headerText(): string {
    return vuex.state.headerText.value;
  }
  back(){
    this.$router.back();
  }
}
</script>
<style lang="scss" scoped>
.getter-container {
  height: 100%;
  .getter-header {
    position: relative;
    background-color: rgb(240, 240, 240);
    color: rgb(20, 20, 20);
    font-weight: 800;
    box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.4);
    p {
      margin: 0;
      vertical-align: middle;
      display: inline-block;
    }
    .back{
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translate(-50%,-50%);
    }
    &:before {
      height: 100%;
      width: 0;
      display: inline-block;
      vertical-align: middle;
      content: "";
    }
  }
  .getter-main {
    background-color: rgb(240, 240, 240);
    padding: 0;
  }
}
</style>