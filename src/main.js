import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import VueBus from 'vue-bus';
import axios from 'axios';
import VueSlider from 'vue-slider-component'

import 'vue-slider-component/theme/default.css'
import 'leaflet/dist/leaflet'
import 'leaflet/dist/leaflet.css'
//vue-iclient3d-webgl组件库
import  '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css';
import VueiClient from '@supermap/vue-iclient3d-webgl';


import './assets/fonts/iconfont.css'
import './assets/weatherFonts/qweather-icons.css'
import api from './api/index';
import global from './api/global';

import "@/text/text.css";
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.use(VueiClient);
Vue.use(ElementUI);
Vue.use(VueBus);
Vue.use(dataV)
Vue.component('VueSlider', VueSlider)
import { getToken,setToken } from '@/utils/auth'
// 使用钩子函数对路由进行权限跳转
router.beforeEach(async (to, from, next) => {
  //169端大屏从pc端访问开端，携带token，需要保存token，用来后边接口访问是否过期
  if(to.path.indexOf('169') > -1){
    // let token = to.fullPath.substring(to.fullPath.indexOf('token')+6,to.fullPath.length)
    let token = getToken()
    setToken(token)
  }
  if (getToken() && getToken() != 'undefined' && getToken() != 'null') {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  }else{
    // 没有token
    if (to.path === '/login') {
      // 在免登录白名单，直接进入
      next()
    } else {
      //需要跳转到pc端的登录页面
      if(to.path.indexOf('169') > -1){
        location.href = global.pcLoginURL
      }else{
        next('/login');
      }
      
    }
   
  }
  
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
export const resetPc = () => {
    let wH = window.innerHeight; // 当前窗口的高度
    let wW = window.innerWidth; // 当前窗口的宽度
    let whdef = 100 / 1080; // 表示1920的设计图,使用100PX的默认值
    if(wW > 1400) {
      let rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
      let html = document.documentElement;
      html.style.fontSize = rem + "px"; //适用于PC网站
    } else {
      let rem = 1400 * whdef;
      let html = document.documentElement;
      html.style.fontSize = rem + "px";
    }
  }
