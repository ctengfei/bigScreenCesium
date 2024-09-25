import global from './global';
import request from '../utils/request';
import axios from 'axios';
export default {
  // 实际用水统计
  getActualWaterUseStatistics(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getActualWaterUseStatistics',
      params: datas
    });
  },
  //用水统计
  getWaterUseStatistics(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getWaterUseStatistics',
      params: datas
    });
  },
   //用水方案统计
   gePlanPageList(datas) {
    return request({
      method: 'get',
      url: '/bim/resWaterResource/inflow/getPlanPageList',
      params: datas
    });
  },
   //来水echart统计
   getLSList(datas) {
    return request({
      method: 'post',
      url: '/bim/resWaterResource/inflow/calForecastRunoff',
      data: datas
    });
  },
  //需水echart统计
  getXSList(datas) {
    return request({
      method: 'get',
      url: '/bim/resWaterResource/demand/getHisMOnthWaterChart',
      params: datas
    });
  },
  //灌区方案列表
  getGQPlanList(datas) {
    return request({
      method: 'get',
      url: '/bim/irrWaterResource/resultWirrSk/list',
      params: datas
    });
  },
  //灌区灌溉量柱状图
  getGQGGLList(datas) {
    return request({
      method: 'get',
      url: '/bim/irrWaterResource/resultIrrAllocationReal/wirrStatistics',
      params: datas
    });
  },
   //灌区灌溉流量柱状图
   getGQGGLLList(datas) {
    return request({
      method: 'get',
      url: '/bim/irrWaterResource/resultIrrAllocationReal/qirrStatistics',
      params: datas
    });
  },
  //供水对比
  getWaterUseSupplyContrast(query) {
    return request({
      url: '/business/bigScreen/home/getWaterUseSupplyContrast',
      method: 'get',
      params: query
    })
  },
  //灌区水量调度 灌溉水量
  getWirrStatistics(query){
    return request({
      url: '/bim/irrWaterResource/resultIrrAllocationReal/wirrStatistics',
      method: 'get',
      params: query
    })
  },
  //灌区水量调度 灌溉流量
  getQirrStatistics(query){
    return request({
      url: '/bim/irrWaterResource/resultIrrAllocationReal/qirrStatistics',
      method: 'get',
      params: query
    })
  },
  //用水统计
  getWaterStatistics(query){
    return request({
      url: '/business/waterUse/resInflowWreqMonth/getYearWaterAmount',
      method: 'get',
      params: query
    })
  }
}