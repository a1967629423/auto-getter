<template lang="pug">
    .error-container
        h1.title 404 NotFound!
        el-button(type="primary",@click="$router.back()").error-btn 返回上一页
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'

@Component
export default class NotFound extends Vue{

}
</script>
<style lang="scss" scoped>
.error-container{
    height: 100%;
    position: relative;
    .error-btn{
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%,0);
    }
}
</style>