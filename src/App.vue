<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import vuex from "./store";

@Component
export default class App extends Vue {

}
</script>

<style lang="scss" >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(115, 105, 91);
  height: 100vh;
}
body,
html {
  margin: 0;
}

</style>
