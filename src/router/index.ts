import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../views/layout/Base.vue'
import vuex from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Base,
    children: [
      {
        path: '/',
        name:'home',
        component: () => import('../views/Home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/order',
        component: () => import('../views/Order.vue'),
        meta: {
          title: '订单'
        }
      },
      {
        path: '/me',
        component: () => import('../views/Me.vue'),
        meta: {
          title: '我的'
        }
      }
    ]

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/getter',
    name: 'getter',
    component: () => import('../views/layout/Getter.vue'),
    children: [
      {
        path: 'create',
        name: 'createOrder',
        component:()=>import('../views/getter/CreateOrderForm.vue'),
        meta:{
          title:"我要取物"
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404Page.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    vuex.dispatch('changeTitle', to.meta.title);
  }
  next();
})
export default router
