<template lang="pug">
    .order-container
        .order-search
            el-input(placeholder="搜索订单")
                el-button(slot="append",icon="el-icon-search")
        .order-filter-btns
            li(v-for="(item,idx) in filterBtns",:key="item.type",:class="{active:item.type === activeBtnType}",@click="orderFilterChange(item)").filter-btn
                span {{item.title}}
        .order-filter-container
            Card(v-for="(item,idx) in displayOrder",:key="idx").order-card
                .order-header(slot="header")
                    .id 订单编号:
                        .num {{item.id}}
                        i.fa.fa-angle-right
                    .state {{getStateTitle(item.state)}}
                .order-site-body
                    .from-site
                        span 取物地:
                        .site {{item.from.name?item.from.name:item.from.detail}}
                    .middle-content
                        .predicted-container
                            span 预计
                            .time {{getFutureTime(item.createdAt,1000*60*60*3)}}
                            span 到达
                        .arrows-container
                            i.fa.fa-angle-left.arrows
                            .middle-bar
                            i.fa.fa-angle-right.arrows
                    .dist-site
                        span 目的地:
                        .site {{item.to.name?item.to.name:item.to.detail}}
                .order-total-price
                    span 合计: 
                    .total  {{item.totalPrice}}元
                .order-call
                    el-button(round,size="mini").call-btn 联系家人
                    

</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Card from "../components/Card.vue";
import { GetOrdersInfo } from "../header/InterfaceDeclare";
import vuex from "../store";
@Component({ components: { Card } })
export default class Order extends Vue {
  filterBtns: { title: string; type: number; state: string }[] = [
    { title: "全部", type: 0, state: "" },
    { title: "待付款", type: 1, state: "created" },
    { title: "待接单", type: 2, state: "payed" },
    { title: "取物中", type: 3, state: "getting" },
    { title: "运送中", type: 4, state: "transiting" },
    { title: "已完成", type: 5, state: "compleate" }
  ];
  activeBtnType: number = 0;
  getFutureTime(time: Date, add: number) {
    let added = new Date(time.getTime() + add);
    let addDay = add > 86400000 ? Math.floor(add / 86400000) : 0;
    return `${addDay > 0 ? `${addDay}天后` : ""}${added.getHours()}:${added
      .getMinutes()
      .toString()
      .padStart(2, "0")
      .toString()
      .padStart(2, "0")}`;
  }
  getStateTitle(state: string) {
    let stateFilter = this.filterBtns.find(v => v.state === state);
    return stateFilter ? stateFilter.title : "";
  }
  get displayOrder(): GetOrdersInfo["data"] {
    if (!this.allOrder) return [];
    let activeFilter = this.filterBtns.find(v => v.type === this.activeBtnType);
    if (!activeFilter) return [];
    if (activeFilter.type === 0) return this.allOrder;
    return this.allOrder.filter(v =>
      activeFilter ? v.state === activeFilter.state : false
    );
  }
  get allOrder() {
    return vuex.state.currentOrderList.value;
  }

  orderFilterChange(btn: { title: string; type: number }) {
    this.activeBtnType = btn.type;
  }
  async mounted() {
    await vuex.dispatch("updateOrderList");
  }
}
</script>
<style lang="scss" scoped>
@import "../element-variables";
.order-container {
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
  .order-filter-btns {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    li {
      display: inline-block;
      font-size: .9em;
      &.active {
        color: scale-color(
          $color: $--color-primary,
          $saturation: 35%,
          $lightness: 50%,
          $alpha: 1
        );
        &:after {
          content: "";
          width: 100%;
          height: 6px;
          border-radius: 3px;
          color: inherit;
          background-color: scale-color(
            $color: $--color-primary,
            $saturation: 35%,
            $lightness: 50%,
            $alpha: 1
          );
          display: block;
        }
      }
    }
  }
  .order-filter-container {
    flex-grow: 1;
    overflow: auto;
    width: 100%;
    .order-card {
      .order-header {
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
        }
        .state {
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
      .order-total-price {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 10px 0;
        span {
          font-size: 0.8em;
        }
        .total {
          margin-left: 5px;
          font-size: 0.6em;
        }
      }
      .order-call {
        text-align: right;
        .call-btn {
          margin-top: 10px;
          font-size: 0.8em;
        }
      }
    }
  }
}
</style>