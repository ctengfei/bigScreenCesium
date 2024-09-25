import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Gqjc from '@/pages/Gqjc'
import Szydd from '@/pages/Szydd'
import Fxxs from '@/pages/Fxxs'
//PC端
import HomePC from '@/pages/HomePC'
import GqjcPC from '@/pages/GqjcPC'
import SzyddPC from '@/pages/SzyddPC'
import FxxsPC from '@/pages/FxxsPC'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:'/gqjc',
      meta: {
        //路由参数配置
        title: "首页",
        navTitle: "首页"
      },
      children:[
        {
          path: "/gqjc",
          name: "Gqjc",
          component: Gqjc,
          meta: {
            //路由参数配置
            title: "灌区监测",
            navTitle: "灌区监测"
          }
        },{
          path: "/szydd",
          name: "Szydd",
          component: Szydd,
          meta: {
            //路由参数配置
            title: "水资源调度",
            navTitle: "水资源调度"
          }
        },{
          path: "/fxxs",
          name: "Fxxs",
          component: Fxxs,
          meta: {
            //路由参数配置
            title: "防汛形势",
            navTitle: "防汛形势"
          }
        }
      ]
    },{
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        //路由参数配置
        title: "登录",
        navTitle: "登录"
      },
    },{
      path: '/169',
      name: 'homepc',
      component: HomePC,
      redirect:'/169/gqjc',
      meta: {
        //路由参数配置
        title: "首页",
        navTitle: "首页"
      },
      children:[
        {
          path: "/169/gqjc",
          name: "GqjcPC",
          component: GqjcPC,
          meta: {
            //路由参数配置
            title: "灌区监测",
            navTitle: "灌区监测"
          }
        },{
          path: "/169/szydd",
          name: "SzyddPC",
          component: SzyddPC,
          meta: {
            //路由参数配置
            title: "水资源调度",
            navTitle: "水资源调度"
          }
        },{
          path: "/169/fxxs",
          name: "FxxsPC",
          component: FxxsPC,
          meta: {
            //路由参数配置
            title: "防汛形势",
            navTitle: "防汛形势"
          }
        }
      ]
    }
  ]
})
