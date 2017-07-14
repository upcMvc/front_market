import Vue from 'vue'
import Router from 'vue-router'
import VueResource from '../../node_modules/vue-resource/dist/vue-resource'
import Hello from '@/components/Hello'
import Nav from '@/components/Nav'
import Test from '@/components/Test'
import index from '@/components/index'
import Login from '@/components/Login'
import Shopcar from '@/components/Shopcar'
import Reg from '@/components/Reg'
import Buyed from '@/components/Buyed'
import Perinfo from '@/components/Perinfo'
import History from '@/components/History'
import Sell from '@/components/Sell'
import Heart from '@/components/Heart'


Vue.use(Router)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    console.log('to', to)
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    //侧边栏做测试用
    {
      path: '/nav',
      name: 'Nav',
      component: Nav
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/Login',
      name: 'Login',
      component:Login
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component:Shopcar
    },
    {
      path: '/reg',
      name: 'reg',
      component:Reg
    },
    {
      path: '/perinfo',
      name: 'perinfo',
      component: Perinfo
    },
    {
      path: '*',
      redirect:'/index'
    },
    {
      path: '/buyed',
      name: 'buyed',
      component: Buyed
    },
    {
      path:'/history',
      name:'history',
      component:History
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell
    },
    {
      path: '/heart',
      name: 'heart',
      component:Heart
    }
  ]
})
