<template lang="pug">
  .home-container
    .background
    .begin-btn(@click="toGetterForm()")
      .anim-child(v-for="(value,idx) in child" :key="value")
      .title 点击立刻取物
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Server } from "../service";
@Component
export default class Home extends Vue {
  child: number[] = [0, 1, 2];
  toGetterForm(){
    this.$router.push({path:'/getter/create'})
  }
}
</script>
<style lang="scss" scoped>
@keyframes wave {
  from {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  to {
    width: 150%;
    height: 150%;
    opacity: 0;
  }
}
.home-container {
  height: 100%;
  position: relative;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .begin-btn {
    position: absolute;
    width: 40vw;
    height: 40vw;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #e6e65b;
    .title{
      display: inline-block;
      vertical-align: middle;
    }
    &:after{
      content:'';
      display: inline-block;
      height: 100%;
      width: 0;
      vertical-align: middle;
    }
    .anim-child {
      @for $ia from 1 through 3 {
        &:nth-child(#{$ia}) {
          animation-delay: ($ia - 1) * 0.25s;
        }
      }
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: inherit;
      border-radius: inherit;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      animation: wave 1s infinite;
      z-index: -10;
    }
  }
}
</style>
