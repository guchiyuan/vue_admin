import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Dwxx from '@/pages/xtbwh/Dwxx'
import Cplx from '@/pages/xtbwh/Cplx'
import Jsxx from '@/pages/xtbwh/Jsxx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dwxx',
      name: 'Dwxx',
      component: Dwxx
    },
    {
      path: '/cplx',
      name: 'Cplx',
      component: Cplx
    },
    {
      path: '/jsxx',
      name: 'Jsxx',
      component: Jsxx
    }
  ]
})
