import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerText: { value: '无人机' },
    footer:{value:0}
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
    }
  },
  actions: {
    changeTitle(ctx, title) {
      if (typeof title === 'string') {
        ctx.commit('changeHeaderText', title);
        document.title = title;
      }
    },
    changeFooter(ctx,n){
      if(typeof n ==='number'){
        ctx.commit('changeFooterState',n);
      }
    }
  },
  modules: {
  }
})
