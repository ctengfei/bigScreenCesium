/**
 *
 * @param time 时间
 * @param format 格式
 * @param code 转化方式（0：Str转Date-Str，1：Date转Date-Str，3：Str转Date-Str）
 */
export function timeConvers(time, format, code) {
  if (time == null || time == undefined || time == '') {
    return ''
  }
  var date = null
  // code为0表示time为时间戳串
  if (code == 0 || code == undefined) {
    date = new Date()
    date.setTime(parseFloat(time))
  } else if (code == 1) {
    date = time
  } else if (code == 3) {
    return format.replace('yyyy', time.substr(0, 4)).replace('MM', time.substr(5, 2)).replace('dd', time.substr(8, 2)).replace('DD', time.substr(8, 2)).replace('HH', time.substr(11, 2)).replace('mm', time.substr(14, 2)).replace('ss', time.substr(17, 2))
  }
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var c = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return format.replace('yyyy', year).replace('MM', month).replace('dd', day).replace('DD', day).replace('HH', h).replace('mm', m).replace('ss', c)
}

export function getLastStartTime() { //获取昨天日期
  let that = this;
  let now = new Date();
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  let time = now.getTime() - 1000 * 60 * 60 * 24;
  let currentTime = new Date(time);
  var o = {
    'M+': currentTime.getMonth() + 1, // 月份
    'd+': currentTime.getDate(), // 日
    'h+': currentTime.getHours(), // 小时
    'm+': currentTime.getMinutes(), // 分
    's+': currentTime.getSeconds(), // 秒
    'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
    'S': currentTime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }

  let startTime = fmt;
  return startTime
}

export function getHourTime(n) { //获取24 48 72 小时数据时候使用
  let that = this;
  let now = new Date();
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  let time = now.getTime() - 1000 * 60 * 60 * 24 * n;
  let currentTime = new Date(time);
  var o = {
    'M+': currentTime.getMonth() + 1, // 月份
    'd+': currentTime.getDate(), // 日
    'h+': currentTime.getHours(), // 小时
    'm+': currentTime.getMinutes(), // 分
    's+': currentTime.getSeconds(), // 秒
    'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
    'S': currentTime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }

  let startTime = fmt;
  return startTime
}

export function getMinutesTime(mytime, ifAdd, n) { //获取分钟数据时候使用
  let that = this;
  let now = new Date();
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  mytime = mytime.replace(new RegExp("-","gm"),"/");
  let timeHM = (new Date(mytime)).getTime(); //得到毫秒数
  let time = now.getTime()
  if (ifAdd) {
    time = timeHM + 1000 * 60 * n;
  } else {
    time = timeHM - 1000 * 60 * n;
  }
  let currentTime = new Date(time);
  var o = {
    'M+': currentTime.getMonth() + 1, // 月份
    'd+': currentTime.getDate(), // 日
    'h+': currentTime.getHours(), // 小时
    'm+': currentTime.getMinutes(), // 分
    's+': currentTime.getSeconds(), // 秒
    'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
    'S': currentTime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }

  let startTime = fmt;
  return startTime
}

export function getOneWeekTime() { //获取前一周日期
  let that = this;
  let now = new Date();
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  let time = now.getTime() - 1000 * 60 * 60 * 24 * 6;
  let currentTime = new Date(time);
  var o = {
    'M+': currentTime.getMonth() + 1, // 月份
    'd+': currentTime.getDate(), // 日
    'h+': currentTime.getHours(), // 小时
    'm+': currentTime.getMinutes(), // 分
    's+': currentTime.getSeconds(), // 秒
    'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
    'S': currentTime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }

  let startTime = fmt;
  return startTime
}

export function getOneYearTime() { //获取12个月时间
  let that = this;
  let now = new Date();
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  let time = now.getTime() - 1000 * 60 * 60 * 24 * 365;
  let currentTime = new Date(time);
  var o = {
    'M+': currentTime.getMonth() + 1, // 月份
    'd+': currentTime.getDate(), // 日
    'h+': currentTime.getHours(), // 小时
    'm+': currentTime.getMinutes(), // 分
    's+': currentTime.getSeconds(), // 秒
    'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
    'S': currentTime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }

  let startTime = fmt;
  return startTime
}

export function getEndTime() { //获取当前时间
  let that = this;
  let now = new Date();
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  let time = now.getTime();
  let currentTime = new Date(time);
  var o = {
    'M+': currentTime.getMonth() + 1, // 月份
    'd+': currentTime.getDate(), // 日
    'h+': currentTime.getHours(), // 小时
    'm+': currentTime.getMinutes(), // 分
    's+': currentTime.getSeconds(), // 秒
    'q+': Math.floor((currentTime.getMonth() + 3) / 3), // 季度
    'S': currentTime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  let endTime = fmt;
  return endTime
}

export function getMonthDays(time) {//获取当前时间所属月份的天数 '2020-01-01'
  let year = parseInt(time.substring(0, 4))//取出年
  let month = parseInt(time.substring(5, 7))//取出月
  let d = new Date(year, month, 0);
  return d.getDate();

}

export function getFormatDate() {//获取一个月前的日期
  var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = nowDate.getMonth() < 10 ? "0" + (nowDate.getMonth()) : nowDate.getMonth();
  var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
  // var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
  // var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
  // var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
  return year + "-" + month + "-" + date;
}

/**
 * 指定时间的小时差
 * @param {*} dt1 开始时间  2020-07-28 15:00:00
 * @param {*} dt2 结束时间  2020-07-30 15:00:00
 */
export function getIntervalHour(dt1, dt2) {
  if (typeof (dt1) == "string") {
    dt1 = new Date(dt1.replace(/-/, '/'));
    dt2 = new Date(dt2.replace(/-/, '/'));
  }
  let res = dt2 - dt1;
  if (isNaN(res))
    throw Error("invalid dates arguments");
  return res / (1000 * 60 * 60);
}


//封装echart用到的方法
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;
 
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;
 
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  }
}

export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}

export function randomString(e) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
      a = t.length,
      n = "";
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}