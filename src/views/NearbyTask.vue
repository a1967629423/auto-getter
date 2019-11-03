<template lang="pug">
    .nearby-container
        .order-search
            el-input(placeholder="搜索订单")
                el-button(slot="append",icon="el-icon-search")
        .content
          NearCard(v-for="(item,idx) in NearCards",:key="idx",:order="item")
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NearCard from '../components/NearCard.vue'
import vuex from '../store'
@Component({components:{NearCard}})
export default class NearbyTask extends Vue {
  get NearCards(){
    return vuex.state.currentNearOrder.value;
  }
  mounted(){
    vuex.dispatch('updateNearOrderList');
  }
}
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
  .content{
    width: 100%;
    flex-grow: 1;
    overflow: auto;
  }
}
</style>