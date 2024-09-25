// 配置后端项目的地址和端口
export default {
  baseURL: process.env.VUE_APP_BASE_API, //服务武器地址
  imgUrl:'http://ctyoss.chutianyun.gov.cn:8060/slt-wfwgl',//图片地址

  //楚天云正式地址内网
  // pcLoginURL:'http://10.10.3.99:32068/wygq/#/login',
  // dpLoginURL:'http://10.10.3.99:32068/bigScreen/#/login',

  //水利专网正式服务器
  // pcLoginURL:'http://10.42.6.99:32068/wygq/#/login',
  // dpLoginURL:'http://10.42.6.99:32068/bigScreen/#/login',
  // sanweiUrl:"http://10.42.6.90:8090/iserver/services/3D-WangYingGuanQuSanWei/rest/realspace",
  // dituUrl:"http://10.42.6.90:8090/iserver/services/3D-hbtin/rest/realspace",
  // bimUrl:'http://10.42.6.90:8090/iserver/services/3D-WYBIM/rest/realspace',
  // bimDataUrl:'http://10.42.6.90:8090/iserver/services/data-BIMMoXing/rest/data'

  //正式地址外网映射
  // pcLoginURL:'https://slt.chutianyun.gov.cn:10443/wy/wygq/#/login',
  // dpLoginURL:'https://slt.chutianyun.gov.cn:10443/wy/bigScreen/#/login',
  // sanweiUrl:"https://slt.chutianyun.gov.cn:10443/map/iserver/services/3D-WangYingGuanQuSanWei/rest/realspace",
  // dituUrl:"https://slt.chutianyun.gov.cn:10443/map/iserver/services/3D-local3DCache-YingXiangYaoGanYingXiangWeiCaiJian/rest/realspace",

  //测试地址
  pcLoginURL:'http://36.135.21.38:10103//wygq/',
  dpLoginURL:'http://36.135.21.38:10103/bigScreen/#/login',
  sanweiUrl:"http://36.135.21.38:10151/iserver/services/3D-WangYingGuanQuSanWei/rest/realspace",
  dituUrl:"http://36.135.21.38:10151/iserver/services/3D-hbtin/rest/realspace",
  bimUrl:'http://36.135.21.38:10151/iserver/services/3D-WYBIM/rest/realspace',
  bimDataUrl:'http://36.135.21.38:10151/iserver/services/data-BIMMoXing/rest/data'
};
