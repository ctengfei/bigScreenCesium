<template>
  <div class="fxxs" id='fxxsMap'>
    <!-- <sm-viewer :scene-url="mapUrl"></sm-viewer> -->
    <div class="showBtn left" @click="leftVisible(!ifShowLeft)"><img :src="leftBtnIconUrl" />{{ifShowLeft?'收缩':'展开'}}</div>
    <div class="showBtn right"  @click="rightVisible(!ifShowRight)"><img :src="rightBtnIconUrl" />{{ifShowRight?'收缩':'展开'}}</div>
    <div class="fxxs-left" v-show="ifShowLeft">
      <content-box class="fxxs-jbgk boxCommon" width="615px" height="429px">
      <content-title name="王英灌区基本概况"></content-title>
      <base-info class="fxxs-base"></base-info>
      </content-box>
      <content-box class="fxxs-jyyb boxCommon" width="615px" height="429px">
        <content-title name="24小时降雨预报"></content-title>
        <rain-forecast></rain-forecast>
      </content-box>
      <content-box class="fxxs-fhgzzd boxCommon" width="615px" height="899px">
        <content-title name="防洪关注站点实时监测"></content-title>
        <site-monitor></site-monitor>
      </content-box>
    </div>
    <div class="fxxs-right" v-show="ifShowRight">
      <content-box class="fxxs-fxddfa boxCommon" width="615px" height="899px">
      <content-title name="防汛调度方案"></content-title>
      <floodcontrol-operation></floodcontrol-operation>
      </content-box>
      <content-box class="fxxs-yafapj boxCommon" width="615px" height="510px">
        <content-title name="预案方案评价"></content-title>
        <plan-evaluation></plan-evaluation>
      </content-box>
      <content-box class="fxxs-spjk boxCommon" width="615px" height="364px">
        <content-title name="视频监控"></content-title>
        <fxxs-video></fxxs-video>
      </content-box>
    </div>
    
    <content-box class="fxxs-mnyy boxCommon" width="615px" height="219px" v-show="ifShowPlay" :class="ifShowLeft?'':'toLeft'">
      <content-title name="水库防洪调度模拟预演"></content-title>
      <plan-play></plan-play>
    </content-box>
    <content-box class="fxxs-yyjg boxCommon" width="500px" height="650px" v-show="ifShowPlayDetail" :class="ifShowRight?'':'toRightR'" angleWidth="25px" angleHeight="25px">
      <content-title name="预演方案结果"></content-title>
      <operation-detail :ifShowPlayDetail="ifShowPlayDetail"></operation-detail>
    </content-box>
    <content-box class="fxxs-yyjgtable boxCommon" width="500px" height="650px" v-show="ifShowPlayDetail" :class="ifShowRight?'':'toRightR'" angleWidth="25px" angleHeight="25px">
      <content-title name="预演方案结果"></content-title>
      <OperationDetailTable :ifShowPlayDetail="ifShowPlayDetail" />
    </content-box>
    <content-box class="fxxs-yyjgRuler boxCommon" width="200px" height="377px" v-show="ifShowPlayDetail" :class="ifShowRight?'':'toRightR'" angleWidth="25px" angleHeight="25px">
      <content-title name="水尺"></content-title>
      <Ruler :ifShowPlayDetail="ifShowPlayDetail" />
    </content-box>
    <!---雨量统计-->
    <div class="yltj" :class="ifShowLeft?'':'toLeft'">
      <img class="yltj-bg" src="../../assets/images/fxxs/rain-Bg.png"/>
      <div class="yltj-item">
        <span class="yltj-title">年降雨量统计<span class="yltj-unit">(mm)</span></span>
        <div class="yltj-content">
          <div class="yltj-it">
            <span class="yltj-tit">王英水库：</span>
            <span class="yltj-txt">{{ rain.wy.yearDrp || 0 }}</span>
          </div>
          <div class="yltj-it">
            <span class="yltj-tit">蔡贤水库：</span>
            <span class="yltj-txt">{{ rain.cx.yearDrp || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="yltj-item">
        <span class="yltj-title">月降雨量统计<span class="yltj-unit">(mm)</span></span>
        <div class="yltj-content">
          <div class="yltj-it">
            <span class="yltj-tit">王英水库：</span>
            <span class="yltj-txt">{{ rain.wy.monthDrp || 0 }}</span>
          </div>
          <div class="yltj-it">
            <span class="yltj-tit">蔡贤水库：</span>
            <span class="yltj-txt">{{ rain.cx.monthDrp || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="yltj-item">
        <span class="yltj-title">去年末蓄水总量<span class="yltj-unit">(亿m³)</span></span>
        <div class="yltj-content">
          <div class="yltj-it">
            <span class="yltj-tit">王英水库：</span>
            <span class="yltj-txt">{{ rain.wyXsl.w  || 0}}</span>
          </div>
          <div class="yltj-it">
            <span class="yltj-tit">蔡贤水库：</span>
            <span class="yltj-txt">{{ rain.cxXsl.w || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="yltj-item">
        <span class="yltj-title">防洪保护范围<span class="yltj-unit">(km²)</span></span>
        <div class="yltj-content">
          <div class="yltj-it">
            <span class="yltj-tit">王英水库：</span>
            <span class="yltj-txt">300</span>
          </div>
          <div class="yltj-it">
            <span class="yltj-tit">蔡贤水库：</span>
            <span class="yltj-txt">60</span>
          </div>
        </div>
      </div>
      <dv-decoration-12 style="width:50px;height:50px;"  class="yltj-zs" :color="['#04ADE0','#04ADE0']"/>
    </div>
    <!---当前入库，出库等-->
    <div class="current" :class="ifShowRight?'':'toRight'">
      <div class="current-item" v-for="(item,index) in currentList" :key="index">
        <img class="current-itemBg" src="../../assets/images/fxxs/fxxs-card.png"/>
        <dv-decoration-9 class="current-itemCircl" style="width:50px;height:50px;" :color="['#317FB6','#50FCFE']" :dur='30'></dv-decoration-9>
        <img class="current-icon1" src="../../assets/images/fxxs/sanjiao1.png"/>
        <img class="current-icon2" src="../../assets/images/fxxs/sanjiao2.png"/>
        <div class="current-content">
          <span class="current-content-title">{{item.title}}</span>
          <span class="current-content-value">{{item.name1}}：{{item.value1}}</span>
          <span class="current-content-value">{{item.name2}}：{{item.value2}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ContentBox from '@/components/ContentBox.vue'
import ContentTitle from '@/components/ContentTitle.vue'
import BaseInfo from '@/components/Fxxs/BaseInfo.vue'
import RainForecast from '@/components/Fxxs/RainForecast.vue'
import SiteMonitor from '@/components/Fxxs/SiteMonitor.vue'
import FloodcontrolOperation from '@/components/Fxxs/FloodcontrolOperation.vue'
import PlanEvaluation from '@/components/Fxxs/PlanEvaluation.vue'
import FxxsVideo from '@/components/Fxxs/FxxsVideo.vue'
import PlanPlay from '@/components/Fxxs/PlanPlay.vue'
import OperationDetail from '@/components/Fxxs/OperationDetail.vue'
import OperationDetailTable from '@/components/Fxxs/OperationDetailTable'
import Ruler from '@/components/Fxxs/Ruler'

export default {
 components:{
   Ruler,
  ContentBox,
  ContentTitle,
  BaseInfo,
  RainForecast,
  SiteMonitor,
  FloodcontrolOperation,
  PlanEvaluation,
  FxxsVideo,
  PlanPlay,
  OperationDetail,
   OperationDetailTable
 },
 created(){
  this.$bus.on('showPlay',(val) =>{
    this.ifShowPlay = val
    if(!val){
      this.ifShowPlayDetail = val
    }
    this.$bus.emit('clearSubmergeAnalysisy')
  })
   this.$bus.on('showPlayDetail',(val) =>{
    this.ifShowPlayDetail = val
  })
  this.$bus.on('closeTwoBox',(val) =>{
    this.leftVisible(val)
    this.rightVisible(val)
  })
 },
 data(){
  return{
    ifShowLeft:true,//是否展示左侧部分
    ifShowRight:true,//是否展示右侧部分
    leftBtnIconUrl:require('../../assets/images/common/shousuo.png'),
    rightBtnIconUrl:require('../../assets/images/common/zhankai.png'),
    //当前入库，出库
    currentList:[
      // {
      //   title:'当前入库(m³/s)',
      //   name1:'王英',
      //   value1:60,
      //   name2:'蔡贤',
      //   value2:124.3
      // },
      // {
      //   title:'当前出库(m³/s)',
      //   name1:'王英',
      //   value1:3.9,
      //   name2:'蔡贤',
      //   value2:1.32
      // },
      {
        title:'当前水位(m)',
        name1:'王英',
        value1:65.57,
        name2:'蔡贤',
        value2:65.56 
      },
      {
        title:'当前蓄量(万m³)',
        name1:'王英',
        value1:335.30,
        name2:'蔡贤',
        value2:15.75
      },
      {
        title:'当前面雨量(mm)',
        name1:'王英',
        value1:3546,
        name2:'蔡贤',
        value2:3258
      },
    ],
    ifShowPlay:false,//是否展示调度预演
    ifShowPlayDetail:false,//是否展示调度预演结果数据
    // mapUrl:"https://27.17.47.174:9090/iserver/services/3D-local3DCache-Config/rest/realspace",//三维地图地址
    mapUrl:"https://27.17.47.174:9090/iserver/services/3D-WangYingGuanQuSanWei/rest/realspace",
    rain:{
      wy:{},
      cx:{},
      wyXsl:{},
      cxXsl:{}
    }
  }
 },
 mounted(){
  this.getSKInfo()
   let params = {
     stName:'',
     stType:'PPS',
     sourceType:1
   }
   this.$api.gqjc.getZHJC_SiteList(params).then(res=>{
     if(res.success){
       const data = res.data.pptnStatisticsList;
       this.rain.cx = data.find(r=>r.stCode == "61608212") || {};
       this.rain.wy = data.find(r=>r.stCode == "61608180") || {};
     }
   })
   // 年末蓄水量
   this.$api.fxxs.getFXXS_RAINXLS().then(res=>{
     if(res.success){
       const data = res.data;
       this.rain.cxXsl = data.find(r=>r.stCode == "61608212") || {};
       this.rain.wyXsl = data.find(r=>r.stCode == "61608180") || {};
     }
   })
 },
 methods:{
 //请求水库基本信息
   getSKInfo(){
    let that = this
    this.$api.fxxs.getFXXS_SKInfo({}).then((res) => {
      // console.log('请求水库基本信息')
      // console.log(res)
      let result = res.data
      if(result){
        let wyrk = result.wyRealData.inq
        let wyck = result.wyRealData.otq
        let wysw =  result.wyRealData.rz
        let wyxsl = result.wyRealData.w
        let wymyl = result.wyRainfall

        let cxrk = result.cxRealData.inq
        let cxck = result.cxRealData.otq
        let cxsw = result.cxRealData.rz
        let cxxsl = result.cxRealData.w
        let cxmyl = result.cxRainfall
        //
        // that.currentList[0].value1 = wyrk || '0'
        // that.currentList[0].value2 = cxrk || '0'
        //
        // that.currentList[1].value1 = wyck || '0'
        // that.currentList[1].value2 = cxck || '0'

        that.currentList[0].value1 = wysw || '0'
        that.currentList[0].value2 = cxsw || '0'

        that.currentList[1].value1 = wyxsl || '0'
        that.currentList[1].value2 = cxxsl || '0'
        //暂时没有数据，先为0
        that.currentList[2].value1 = wymyl || '0'
        that.currentList[2].value2 = cxmyl || '0'

      }
    }).catch(() => {
            
    });
   }, 
  leftVisible(val){
      let that = this
      that.ifShowLeft = val;
      
      that.leftBtnIconUrl = that.ifShowLeft?require('../../assets/images/common/shousuo.png'):require('../../assets/images/common/zhankai.png')
    },
     rightVisible(val){
      let that = this
      that.ifShowRight = val;

      that.rightBtnIconUrl = that.ifShowRight?require('../../assets/images/common/zhankai.png'):require('../../assets/images/common/shousuo.png')
    },
 }
}
</script>

<style lang="less">
@import "index.less";
</style>
