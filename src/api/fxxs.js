import global from './global';
import request from '../utils/request';
import axios from 'axios';
export default {
  //防汛形势--水库基本信息
  getFXXS_SKInfo(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getResRealDataList',
      data: datas
    });
  },
  //防汛形势--调度方案
  getFXXS_DDFA(datas) {
    return request({
      method: 'get',
      url: '/bim/resFlood/prediction/list',
      data: datas
    });
  },
  //防汛形势--调度方案预报
  getFXXS_DDFAYB(datas) {
    return request({
      method: 'get',
      url: '/bim/resFlood/prediction/getFloodForecastListByGLId?glid='+datas.glid+'&stcd='+datas.stcd,
      data: datas
    });
  },
  //防汛形势--水库水位基础信息
  getFXXS_SHInfo(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/flood/getResInfoByStcd?stcd='+datas.stcd,
      data: datas
    });
  },
   //防汛形势--灌区调度方案
  getFXXS_GQDDFA(datas) {
    return request({
      method: 'get',
      url: '/bim/irrFlood/forecastPlan/list',
      data: datas
    });
  },
   //防汛形势--灌区调度方案-实时预报echart图
   getFXXS_GQDDFA_Monitor(datas) {
    return request({
      method: 'get',
      url: '/bim/irrFlood/realForecast/getChanRealForecastResultList?caseCode='+datas.caseCode+'&riverCode='+datas.riverCode,
      data: datas
    });
  },
  //防汛形势--灌区调度方案-片区列表数据
  getFXXS_GQDDFA_PQList(datas) {
    return request({
      method: 'get',
      url: '/bim/irrFlood/apiBasinsAtt/list',
      data: datas
    });
  },
   //防汛形势--灌区调度方案-片区预报数据
   getFXXS_GQDDFA_PQ(datas) {
    return request({
      method: 'get',
      url: '/bim/irrFlood/realForecast/getRealRainfallRunoffMapList?caseCode='+datas.caseCode,
      data: datas
    });
  },
  // 防汛形势--降雨预报查询阈值
  getFXXS_YUVAL(query){
    return request({
      url: '/business/forecast/areaRainfallWaring/list',
      method: 'get',
      params: query
    })
  },
  // 防汛形势--降雨预报数据
  getFXXS_RAINVAL(query){
    return request({
      url: '/business/forecast/areaRainfallWaring/areaRainfallList',
      method: 'get',
      params: query
    })
  },
  //防汛形势--年末蓄水量
  getFXXS_RAINXLS(query){
    return request({
      url: '/business/bigScreen/home/getLastYearResBaseData',
      method: 'get',
      params: query
    })
  },
  //防汛形势--垂直位移
  getFXXS_CZWY(query){
    return request({
      url: '/business/oneMap/getDamCzwyMaxTmList',
      method: 'get',
      params: query
    })
  },
  //防汛形势--渗流压力水位
  getFXXS_SLSW(query){
    return request({
      url: '/business/oneMap/getDamSpgMaxTmList',
      method: 'get',
      params: query
    })
  },
  //防汛形势--水平位移
  getFXXS_SPWY(query){
    return request({
      url: '/business/oneMap/getDamSpwyMaxTmList',
      method: 'get',
      params: query
    })
  }

}