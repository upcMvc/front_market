import Vue from 'vue'
import Router from 'vue-router'
import VueResource from '../../node_modules/vue-resource/dist/vue-resource'
import Hello from '@/components/Hello'
import Nav from '@/components/Nav'
import Test from '@/components/Test'
import index from '@/components/index'
import Login from '@/components/Login'
import Shopcar from '@/components/Shopcar'


Vue.use(Router)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

export default new Router({
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
    }

  ]
})
