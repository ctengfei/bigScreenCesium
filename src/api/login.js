import global from './global';
import request from '@/utils/request';
export default {
// 登录方法
login(username, password, code, uuid) {
  return request({
    url: '/auth/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: { username, password, code, uuid }
  })
},
// 获取验证码
getCodeImg() {
  return request({
    url: '/code',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
},
//退出登录
logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
},
getWeatherMonitor(){
  return request({
    method: 'get',
    url: 'https://devapi.qweather.com/v7/weather/now?location=101200601&key=196525e05a9541d39c94f2cb3c359798',
    headers: {
      isToken: false
    },
  });
},
 //天气预报
 getWeather() {
  return request({
    method: 'get',
    url: 'https://devapi.qweather.com/v7/weather/3d?location=101200601&key=196525e05a9541d39c94f2cb3c359798',
    headers: {
      isToken: false
    },
  });
},
}