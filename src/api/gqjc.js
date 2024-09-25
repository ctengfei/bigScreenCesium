import global from './global';
import request from '@/utils/request';
import axios from 'axios';
export default {
  //综合监测-灌区基本情况
  getZHJC_JBGK(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getIrrInfo',
      data: datas
    });
  },
  //综合监测-水库基本情况
  getSK_JBGK(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getResBaseInfo',
      data: datas
    });
  },
  //综合监测-实时监测站点监测
  getZHJC_SiteList(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getSiteInfoList',
      params: datas
    });
  },
  //综合监测-实时监测底部菜单
  getZHJC_SiteCount(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getStBaseCount',
      params: datas
    });
  },
  //综合监测-总用水量分析
  getZHJC_watertotal(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getActualMonthWaterUseStatistics',
      params: datas
    });
  },
  //综合监测-根据code获取详情
  getZHJC_SiteBaseInfo(datas) {
    return request({
      method: 'get',
      url: '/business/base/stBase/' + datas,
    });
  },

  //综合监测-获取雨量近24小时数据
  getZHJC_SiteYL24(datas) {
    return request({
      method: 'get',
      url: '/business/oneMap/getRain24hMonitor',
      params: datas
    });
  },
  //综合监测-获取渠道近24小时数据
  getZHJC_SiteQD24(datas){
    return request({
      url: '/business/oneMap/getChannel24hDatalist',
      method: 'get',
      params: datas
    })
  },
  //综合监测-获取河道近24小时数据
  getZHJC_SiteHD24(datas){
    return request({
      url: '/business/oneMap/getRiver24hDatalist',
      method: 'get',
      params: datas
    })
  },
   //综合监测-获取水位近24小时数据
   getZHJC_SiteSW24(datas) {
    return request({
      method: 'get',
      url: '/business/oneMap/getWater24hMonitor',
      params: datas
    });
  },
  //综合监测-获取水闸近24小时数据
  getZHJC_SiteSZ24(datas) {
    return request({
      method: 'get',
      url: '/business/oneMap/getDam24hMonitor',
      params: datas
    });
  },
  //综合监测-获取水泵站近24小时数据
  getZHJC_SiteSBZ24(datas) {
    return request({
      method: 'get',
      url: '/business/oneMap/getPump24hMonitor',
      params: datas
    });
  },
  //综合监测-获取水质近24小时数据
  getZHJC_SiteSZZ24(datas) {
    return request({
      method: 'get',
      url: '/business/oneMap/getWaterQuality24hMonitor',
      params: datas
    });
  },
  //综合监测-卫星云图
  getZHJC_WXYT(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getCloudChart',
      params: datas
    });
  },
  //综合监测-雷达图
  getZHJC_LDT(datas) {
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getRadarChart',
      params: datas
    });
  },
  //综合监测-视频监测
  getZHJC_SP(datas){
    return request({
      method: 'get',
      url: '/business/bigScreen/home/getVideoList',
      params: datas
    });
  },
  //综合监测-视频点位视频
  getZHJC_Point_SP(datas) {
    return request({
      method: 'get',
      url: '/business/base/wmstBase/getPlayUrlByWmstCode',
      params: datas
    });
  },
  // 垂直位移
  getZHJC_DamCzwyMaxTmList(query) {
    return request({
      url: '/business/oneMap/getDamCzwyMaxTmList',
      method: 'get',
      params: query
    })
  },
  //水平位移
  getZHJC_DamSpwyMaxTmList(query) {
    return request({
      url: '/business/oneMap/getDamSpwyMaxTmList',
      method: 'get',
      params: query
    })
  },
  //渗流压力
  getZHJC_DamSpgMaxTmList(query) {
    return request({
      url: '/business/oneMap/getDamSpgMaxTmList',
      method: 'get',
      params: query
    })
  },
  //综合监测-种植结构
  getZHJC_structure(datas) {
    return request({
      method: 'get',
      url: '/business/drought/remoteSenseMapPlantArea/list',
      params: datas
    });
  }

}