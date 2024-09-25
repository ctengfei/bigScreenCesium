import axios from 'axios';
import global from '../api/global';
import { getToken,removeToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { tansParams } from '@/utils/tools'
import cache from '@/plugins/cache'
import login from '@/api/login';
import { Message,Notification,MessageBox } from "element-ui";

let headers = {
  'Content-Type': 'application/json'
};
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: global.baseURL,
  // 超时
  timeout: 22000
})
// 是否显示重新登录
export let isRelogin = { show: false };
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // let temptoken  = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjIxZTJiNWU1LTFmYmEtNGY5Mi1iNTdjLTVjNzY3NzljMjVmYiIsInVzZXJuYW1lIjoiYWRtaW4ifQ.xqhGkq2kp8CjrsS-zJQGb2NvIlYdl3-cOmCIhoVt1uaJfYXWjN6n-LivMomQSbbOWdGV6A2mE-SDDcvKdaUecA'
    // config.headers['Authorization'] = 'Bearer ' + temptoken // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url;                // 请求地址
      const s_data = sessionObj.data;              // 请求数据
      const s_time = sessionObj.time;              // 请求时间
      const interval = 1000;                       // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交';
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
      return res
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          isRelogin.show = false;
          let token = getToken()
          login.logout().then(() => {
              removeToken()
              // Promise.resolve()
              //需要跳转到pc端的登录页面
            if(location.href.indexOf('169') > -1){
              location.href = global.pcLoginURL
            }else{
              location.href = global.dpLoginURL;
            }
            }).catch(error => {
              Notification.error({
                title: '错误',
                message: '系统错误！'
              });
              Promise.reject('error')
            })
        }).catch((erro) => {
          console.log(erro)
          isRelogin.show = false;        
        });
    }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      });
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      Message({
        message: msg,
        type: 'warning'
      });
      return Promise.reject(new Error(msg))
    } else if (parseInt(code) !== 200) {
      // Notification.error({ title: msg });
      return Promise.reject('error')
    } else {
      return  Promise.resolve(res.data)
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)


const http = {
  request({ url, data = {}, method = 'GET', responseType }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, responseType);
    });
  },
  _request(url, resolve, reject, data = {}, method = 'GET', responseType) {
    const format = method.toLocaleLowerCase() == 'get' ? 'params' : 'data';
    let token = localStorage.getItem('token');
    if (token) {
      headers.token = token;
      //headers.Authorization = token;
    } else {
      headers = {};
    }
    axios({
      url: url,
      method: method,
      [format]: data,
      headers: headers,
      responseType
    })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.code == -1 || res.data.code == 400) {
            //resolve(res);
            console.log('-1,400', res);
            // if (res.data.msg.indexOf('Token') > -1) {
            //   localStorage.clear();
            //   window.location.href = 'https://hbdc.nanhai.gov.cn/#/';
            // }
            reject(res.data);
          } else {
            resolve(res.data);
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  }
};

// export { http };
export default service
