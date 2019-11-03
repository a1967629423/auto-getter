import Vue from 'vue'
import Vuex from 'vuex'
import { GetUserInfo, GetOrdersInfo, OrderInfo, CreateOrder } from '@/header/InterfaceDeclare';
import {Server} from '../service'
Vue.use(Vuex)
let DefaultUserInfo:GetUserInfo['data'] ={id:'',nickname:'',headimgurl:'',sex:0}; 
let DefaultOrderList:GetOrdersInfo['data'] = [];
let DeafultNearOrderList:GetOrdersInfo['data'] = []
let server = new Server();
export default new Vuex.Store({
  state: {
    headerText: { value: '无人机' },
    footer:{value:0},
    currentUserInfo:{value:DefaultUserInfo},
    currentOrderList:{value:DefaultOrderList},
    currentNearOrder:{value:DeafultNearOrderList}
  },
  mutations: {
    changeHeaderText(s, v) {
      if (typeof v === 'string') {
        s.headerText.value = v;
      }
    },
    changeFooterState(s,v){
      if(typeof v === 'number'){
        s.footer.value = v;
      }
    },
    changeUserInfo(s,v){
      s.currentUserInfo.value = v;
    },
    changeOrderList(s,v){
      s.currentOrderList.value = v;
    },
    changeNearOrderList(c,v){
      c.currentNearOrder.value = v;
    }
  },
  actions: {
    changeTitle(ctx, title) {
      if (typeof title === 'string') {
        ctx.commit('changeHeaderText', title);
        document.title = `无人机-${title}`;
      }
    },
    changeFooter(ctx,n){
      if(typeof n ==='number'){
        ctx.commit('changeFooterState',n);
      }
    },
    async updateUserInfo(ctx,id){
      let result = await server.getUserInfo(id);
      let {error,value} = GetUserInfo.validate(result)
      if(error)return error;
      ctx.commit('changeUserInfo',value.data);
      return value;
    },
    async updateOrderList(ctx){
      let reuslt = await server.getOrderList();
      let {error,value} = GetOrdersInfo.validate(reuslt)
      if(error)return error;
      ctx.commit('changeOrderList',value.data);
    },
    async updateNearOrderList(ctx){
      let reuslt = await server.getNearOrder();
      let {error,value} = GetOrdersInfo.validate(reuslt);
      if(error)return error;
      ctx.commit('changeNearOrderList',value.data); 
    },
    async createOrder(ctx,order:CreateOrder){
      let {value,error} = CreateOrder.validate(order)
      if(error)return error;
      let reuslt = await server.createOrder(value)
      await ctx.dispatch('updateOrderList');
      return reuslt;
    }
  },
  modules: {
  }
})
