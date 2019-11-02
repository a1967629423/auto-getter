<template lang="pug">
    .nearby-container
        .order-search
            el-input(placeholder="搜索订单")
                el-button(slot="append",icon="el-icon-search")
        .content
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NearbyTask extends Vue {}
</script>
<style lang="scss" scoped>
.nearby-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  width: 80%;
  margin: auto;
  .order-search {
    margin: 20px;
    width: 100%;
    display: inline-block;
  }
}
</style>