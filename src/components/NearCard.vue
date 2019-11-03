<template lang="pug">
    .near-card-container
        Card.near-card
            .near-card-header(slot="header")
                .id 订单编号:
                    .num {{order.id}}
                    i.fa.fa-angle-right
                .distance 距离您:
                    .num {{OrderDistance}} 米
            .order-site-body
                .from-site
                    span 取物地:
                    .site {{order.from.detail}}
                .middle-content
                    .predicted-container
                        span 最迟
                        .time {{deadLineTime}}
                        span 到达
                    .arrows-container
                        i.fa.fa-angle-left.arrows
                        .middle-bar
                        i.fa.fa-angle-right.arrows
                .dist-site
                    span 目的地:
                    .site {{order.to.detail}}
            .near-card-op
                el-button(size="mini") 不感兴趣
                el-button(size="mini",type="primary") 我来帮忙
            
            
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Card from "./Card.vue";
import { OrderInfo } from "../header/InterfaceDeclare";
@Component({ components: { Card } })
export default class NearCard extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  order!: OrderInfo;
  get OrderDistance() {
    return Math.floor(Math.random() * 500 + 300);
  }
  get deadLineTime(){
      let deadLine:Date = this.order.deadLine;
      return `${deadLine.getHours().toString().padStart(2,'0')}:${deadLine.getMinutes().toString().padStart(2,'0')}`
  }
}
</script>
<style lang="scss" scoped>
@import "../element-variables";
.near-card-container {
  .near-card {
    .near-card-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .id {
        flex-grow: 0;
        color: scale-color(
          $color: $--color-primary,
          $saturation: 30%,
          $lightness: -60%
        );
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: baseline;
        * {
          margin: 0 3px;
        }
        .num {
          display: inline-block;
          font-size: 0.7em;
          vertical-align: middle;
        }
        .distance {
          font-weight: 600;
          font-size: 12px;
          color: scale-color(
            $color: $--color-primary,
            $saturation: 20%,
            $lightness: -10%
          );
          flex-grow: 0;
        }
      }
    }
    .order-site-body {
      display: flex;
      flex-direction: row;
      .from-site,
      .dist-site {
        width: 20%;
        font-size: 14px;
        color: scale-color(
          $color: $--color-primary,
          $saturation: 30%,
          $lightness: -60%
        );
        .site {
          color: rgb(20, 20, 20);
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .middle-content {
        width: 60%;
        display: flex;
        flex-direction: column;
        .predicted-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          .time {
            font-size: 24px;
          }
        }
        .arrows-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .arrows {
            margin: 0 4px;
          }
          .middle-bar {
            height: 8px;
            width: 60%;
            border-radius: 4px;
            flex-grow: 1;
            background-color: scale-color(
              $color: $--color-primary,
              $saturation: -30%,
              $lightness: 60%
            );
          }
        }
      }
    }
    .near-card-op {
      display: flex;
      flex-direction: column;
      align-items: right;
      justify-content: right;
      * {
        margin: 5px;
      }
    }
  }
}
</style>