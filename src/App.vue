<template>
  <div id="app">
    <el-container class="base-container">
      <el-header>
        <p>{{headerText}}</p>
      </el-header>
      <el-main>
        <router-view />
      </el-main>

      <el-footer>
        <div class="page-icons">
          <div :class="{home:true,active:footerState===0}"></div>
          <div :class="{order:true,active:footerState===1}"></div>
          <div :class="{me:true,active:footerState===2}"></div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import vuex from "./store";
@Component
export default class App extends Vue {
  get headerText(): string {
    return vuex.state.headerText.value;
  }
  get footerState():number{
    return vuex.state.footer.value;
  }
}
</script>

<style lang="scss" >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
body,
html {
  margin: 0;
}
.base-container {
  height: 100%;
}
</style>
