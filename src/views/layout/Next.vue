<template lang="pug">
    el-container.next-container
        el-header.next-header
        el-main
            router-view
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'

@Component
export default class Next extends Vue{

}
</script>