import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Dwxx from '@/pages/xtbwh/Dwxx'
import Cplx from '@/pages/xtbwh/Cplx'
import Jsxx from '@/pages/xtbwh/Jsxx'
import Jscy from '@/pages/jscygl/Jscy'
import Djxx from '@/pages/djxxgl/Djxx'
import Rzjl from '@/pages/rzjlgl/Rzjl'
import Swlxr from '@/pages/xtbwh/Swlxr'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/jscyxx',
      // name: 'Home',
      // component: Home,
      // meta: {
      //   title: '南京国图授权管理系统'
      // }
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
    },
    {
      path: '/jscyxx',
      name: 'Jscy',
      component: Jscy
    },
    {
      path: '/djxx',
      name: 'Djxx',
      component: Djxx
    },
    {
      path: '/rzjl',
      name: 'Rzjl',
      component: Rzjl
    }, 
    {
      path: '/swlxr',
      name: 'Swlxr',
      component: Swlxr
    }
  ]
})
