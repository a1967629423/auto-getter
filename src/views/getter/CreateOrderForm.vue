<template lang="pug">
    .form-create-container
        el-form()
            el-form-item(label="待取物地点区域")
              el-cascader(:options="cityOptions",v-model="formData.from.siteCodes")
            el-form-item(label="待取物地点描述")
              el-input(type="textarea",:row="2",placeholder="请输入地点的详细描述",v-model="formData.from.detail")
            el-form-item(label="你的地点区域")
              el-cascader(:options="cityOptions",v-model="formData.to.siteCodes")
            el-form-item(label="你的地点描述")
              el-input(type="textarea",:row="2",placeholder="请输入地点的详细描述",v-model="formData.to.detail")
            el-form-item(label="亲友选择")
              el-button(size="small",style="float:left") 选择
            
              
            

</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { CreateOrder } from "../../header/InterfaceDeclare";
var citys = require("../../header/city/city").default;
@Component
export default class CreaateOrderForm extends Vue {
  citylist: {
    name: string;
    city: { name: string; districtAndCounty: string[] }[];
  }[] = citys;
  selected: this["citylist"] = [];
  formData: CreateOrder = {
    from: { name: "", detail: "", siteCodes: [] },
    to: { name: "", detail: "", siteCodes: [] },
    family: { name: "", phone: "", id: "" },
    type:'sf'
  };
  get cityOptions() {
    return this.citylist.map(v => {
      return {
        value: v.name,
        label: v.name,
        children: v.city.map(c => {
          return {
            value: c.name,
            label: c.name,
            children: c.districtAndCounty.map(d => {
              return { value: d, label: d };
            })
          };
        })
      };
    });
  }
}
</script>
<style lang="scss" scoped>
.form-create-container {
  height: 100%;
    padding: 10px;
}
</style>