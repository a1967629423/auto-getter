<template lang="pug">
    .wrj-card-container
        el-card.wrj-card-border
            .wrj-card-header(slot="header")
                slot(name="header")
            slot() 没有信息
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Card extends Vue {}
</script>
<style lang="scss">
.wrj-card-container {
  .wrj-card-border {
    border-radius: 10px;
    margin: 20px 10px;
    .el-card__header {
      padding: 8px 20px;
    }
  }
}
</style>