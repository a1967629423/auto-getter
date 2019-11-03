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
            el-form-item(label="希望送达时间")
              el-date-picker(v-model="deadLine",type="datetime",placeholder="选择送达最晚时间",:picker-options="pickerOptions")
            .confirm-btn(@click="confirm")
              span 提交

            
              
            

</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { CreateOrder, CreateOrderResult } from "../../header/InterfaceDeclare";
import vuex from '../../store'
import {Message} from 'element-ui'
var citys = require("../../header/city/city").default;
@Component
export default class CreaateOrderForm extends Vue {
  citylist: {
    name: string;
    city: { name: string; districtAndCounty: string[] }[];
  }[] = citys;
  selected: this["citylist"] = [];
  formData: CreateOrder = {
    from: { name: "来源", detail: "", siteCodes: [] },
    to: { name: "目标", detail: "", siteCodes: [] },
    family: { name: "家人", phone: "15390000008", id: "011110001" },
    type: "sf",
    deadLine: new Date().toISOString(),
    object:{name:"某个物品",description:'12'}
  };
  get deadLine(){
    return new Date(this.formData.deadLine);
  }
  set deadLine(v){
    this.formData.deadLine = v.toISOString();
  }
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
  async confirm() {
    let reuslt = await vuex.dispatch('createOrder',this.formData);
    let {value,error} = CreateOrderResult.validate(reuslt);
    if(error){
      console.log(error);
      Message.error({message:'提交失败',showClose:true});
      return;
    }
    Message({type:'success',message:'提交成功',showClose:true})

    
  }
  pickerOptions = {
    disabledDate(now: Date) {
      let current = new Date();
      if (now > current) return false;
      return true;
    }
  };
}
</script>
<style lang="scss" scoped>
@import "../../element-variables";
.form-create-container {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  .confirm-btn {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80%;
    height: 40px;
    border-radius: 20px;
    background-color: scale-color(
      $color: $--color-primary,
      $saturation: -40%,
      $lightness: 40%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    &:active {
      background-color: scale-color(
        $color: $--color-primary,
        $saturation: -40%,
        $lightness: 60%
      );
    }
    span {
      color: scale-color(
        $color: $--color-primary,
        $saturation: 10%,
        $lightness: -20%
      );
    }
  }
}
</style>