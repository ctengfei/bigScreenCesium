<template>
  <div class="fxxspc"  id='fxxsMap'>
    <div class="showBtn left" @click="leftVisible(!ifShowLeft)"><img :src="leftBtnIconUrl" />{{ifShowLeft?'收缩':'展开'}}</div>
    <div class="showBtn right"  @click="rightVisible(!ifShowRight)"><img :src="rightBtnIconUrl" />{{ifShowRight?'收缩':'展开'}}</div>
    <div class="fxxspc-left" v-show="ifShowLeft">
      <content-box class="fxxspc-jbgk boxCommon" width="400px" height="271px" angleWidth="25px" angleHeight="25px">
      <content-title name="王英灌区基本概况"></content-title>
      <base-info class="fxxspc-base"></base-info>
      </content-box>
      <content-box class="fxxspc-jyyb boxCommon" width="400px" height="311px" angleWidth="25px" angleHeight="25px">
        <content-title name="24小时降雨预报"></content-title>
        <rain-forecast></rain-forecast>
      </content-box>
      <content-box class="fxxspc-fhgzzd boxCommon" width="400px" height="371px" angleWidth="25px" angleHeight="25px">
        <content-title name="防洪关注站点实时监测"></content-title>
        <site-monitor></site-monitor>
      </content-box>
    </div>
    <div class="fxxspc-right" v-show="ifShowRight">
      <content-box class="fxxspc-fxddfa boxCommon" width="400px" height="419px" angleWidth="25px" angleHeight="25px">
      <content-title name="水库防洪调度方案"></content-title>
      <floodcontrol-operation></floodcontrol-operation>
      </content-box>
      <content-box class="fxxspc-yafapj boxCommon" width="400px" height="325px" angleWidth="25px" angleHeight="25px">
        <content-title name="灌区山洪预报调度方案"></content-title>
        <plan-evaluation></plan-evaluation>
      </content-box>
      <content-box class="fxxspc-spjk boxCommon" width="400px" height="200px" angleWidth="25px" angleHeight="25px">
        <content-title name="视频监控"></content-title>
        <fxxs-video></fxxs-video>
      </content-box>
    </div>
    
    <content-box class="fxxspc-mnyy boxCommon" width="400px" :style="style" height="106px" v-show="ifShowPlay" :class="ifShowLeft?'':'toLeft'" angleWidth="25px" angleHeight="25px">
      <content-title name="水库防洪调度模拟预演"></content-title>
      <plan-play></plan-play>
    </content-box>
    <content-box class="fxxspc-yyjg boxCommon" width="400px" height="550px" v-show="ifShowPlayDetail" :class="ifShowRight?'':'toRightR'" angleWidth="25px" angleHeight="25px">
      <content-title name="预演方案结果"></content-title>
      <operation-detail :ifShowPlayDetail="ifShowPlayDetail"></operation-detail>
    </content-box>
    <!-- <content-box class="fxxspc-yyjgtable boxCommon" width="400px" height="550px" v-show="ifShowPlayDetail" :class="ifShowRight?'':'toRightR'" angleWidth="25px" angleHeight="25px">
      <content-title name="预演方案结果"></content-title>
      <OperationDetailTable  :ifShowPlayDetail="ifShowPlayDetail"/>
    </content-box> -->
    <content-box class="fxxspc-yyjgRuler boxCommon" width="175px" height="450px" v-show="ifShowPlayDetail" :class="ifShowRight?'':'toRightR'" angleWidth="25px" angleHeight="25px">
      <content-title name="水尺"></content-title>
      <Ruler :ifShowPlayDetail="ifShowPlayDetail" />
    </content-box>
    <!--灌区调度方案--->
    <content-box class="fxxspc-yyjg boxCommon" width="350px" height="800px" v-show="ifShowPlanEvaEchart" :class="ifShowRight?'':'toRightR'" angleWidth="25px" angleHeight="25px">
      <content-title name="实时预报结果"></content-title>
      <PlanEvaluationEchart></PlanEvaluationEchart>
    </content-box>
    <!---雨量统计-->
    <div class="yltj" :class="ifShowLeft?'':'toLeft'">
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
      <dv-decoration-12 style="width:40px;height:40px;"  class="yltj-zs" :color="['#04ADE0','#04ADE0']"/>
    </div>
    <!---当前入库，出库等-->
    <div class="currentpc" :class="ifShowRight?'':'toRight'">
      <div class="currentpc-item" v-for="(item,index) in currentList" :key="index">
        <img class="currentpc-itemBg" src="../../assets/images/fxxs/fxxs-card.png"/>
        <dv-decoration-9 class="currentpc-itemCircl" style="width:34px;height:34px;" :color="['#317FB6','#50FCFE']" :dur='30'></dv-decoration-9>
        <img class="currentpc-icon1" src="../../assets/images/fxxs/sanjiao1.png"/>
        <img class="currentpc-icon2" src="../../assets/images/fxxs/sanjiao2.png"/>
        <div class="currentpc-content">
          <span class="currentpc-content-title">{{item.title}}</span>
          <span class="currentpc-content-value">{{item.name1}}：{{item.value1}}</span>
          <span class="currentpc-content-value">{{item.name2}}：{{item.value2}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ContentBox from '@/components/ContentBox.vue'
import ContentTitle from '@/components/ContentTitlePC.vue'
import BaseInfo from '@/components/FxxsPC/BaseInfo.vue'
import RainForecast from '@/components/FxxsPC/RainForecast.vue'
import SiteMonitor from '@/components/FxxsPC/SiteMonitor.vue'
import FloodcontrolOperation from '@/components/FxxsPC/FloodcontrolOperation.vue'
import PlanEvaluation from '@/components/FxxsPC/PlanEvaluation.vue'
import FxxsVideo from '@/components/FxxsPC/FxxsVideo.vue'
import PlanPlay from '@/components/FxxsPC/PlanPlay.vue'
import OperationDetail from '@/components/FxxsPC/OperationDetail.vue'
import OperationDetailTable from '@/components/FxxsPC/OperationDetailTable.vue'
import PlanEvaluationEchart from '@/components/FxxsPC/PlanEvaluationEchart.vue'
import Ruler from '@/components/FxxsPC/Ruler'

import Bubble from '../FxxsJs/bubble/index.js'
import DragEntity from '../FxxsJs/dragentity.js'
import WaterArea from '../FxxsJs/waterArea.js'
import OpenWaterZha from '../FxxsJs/openWaterZha.js'

let particleSystem
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
   OperationDetailTable,
  PlanEvaluationEchart
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
  this.$bus.on('showPlanEvaEchart',(val) =>{
    this.ifShowPlanEvaEchart = val
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
    scaleValue:localStorage.getItem('scaleX'),
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
        value1:0,
        name2:'蔡贤',
        value2:0
      },
    ],
    ifShowPlay:false,//是否展示调度预演
    ifShowPlayDetail:false,//是否展示调度预演结果数据
    // mapUrl:"https://27.17.47.174:9090/iserver/services/3D-CBD/rest/realspace",//三维地图地址
    mapUrl:"https://27.17.47.174:9090/iserver/services/3D-WangYingGuanQuSanWei/rest/realspace",
    fxxsViewer:null,
    pointList:[
      {
        lat:39.908376,
        lng:116.453913,
        id:'1',
        name:'水位点1'
      },
      {
        lat:39.90894,
        lng:116.454162,
        id:'2',
        name:'水位点2'
      },
      {
        lat:39.906346,
        lng:116.457433,
        id:'3',
        name:'水位点3'
      },
      {
        lat:39.904741,
        lng:116.456783,
        id:'4',
        name:'水位点4'
      },
      {
        lat:39.904794,
        lng:116.459389,
        id:'5',
        name:'水位点5'
      },
    ],
    poinEntity:{},
    viewModel:{
            emissionRate: 40.0,
            gravity: -3.5,
            minimumParticleLife: 6,
            maximumParticleLife: 7,
            minimumSpeed: 9,
            maximumSpeed: 9.5,
            startScale: 1,
            endScale: 20,
            particleSize: 1,
        },
      scene:null,  
      ifShowPlanEvaEchart:false,//是否展示灌区调度方案的实时预报结果
    rain:{
      wy:{},
      cx:{},
      wyXsl:{},
      cxXsl:{}
    },
    style: {
      position: 'fixed',
      bottom: '173px'
    },
  }
 },
 watch:{
  viewModel:{
    handler(oldValue,newValue){
      particleSystem.startScale = newValue.startScale
      particleSystem.endScale = newValue.endScale
      particleSystem.minimumParticleLife = newValue.minimumParticleLife
      particleSystem.maximumParticleLife = newValue.maximumParticleLife
      particleSystem.minimumSpeed = newValue.minimumSpeed
      particleSystem.maximumSpeed = newValue.maximumSpeed
      particleSystem.minimumImageSize.x = newValue.particleSize
      particleSystem.minimumImageSize.y = newValue.particleSize * 2
      particleSystem.maximumImageSize.x = newValue.particleSize
      particleSystem.maximumImageSize.y = newValue.particleSize * 2
      particleSystem.emissionRate =  newValue.emissionRate
    },
    deep:true
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
    this.$bus.on('getHasFullScreenFlag', (flag) => {
      if (flag) { // 全屏
        this.style = {
          position: 'fixed',
          bottom: '173px'
        }
      } else {
        this.style = {
          position: 'absolute',
          bottom: '12px'
        }
      }
    })
 },
 methods:{
  
  initMap(){
    window.fxxsViewer = new Cesium.Viewer('fxxsMap',{
      selectionIndicator:false,//是否显示选中地图元素标识控件，默认 true；设置 false，地图元素标识控件不可见
      infoBox:false,//是否显示 cesium 默认气泡窗口控件，默认 true；设置 false，气泡窗口控件不可见
      shouldAnimate: true,
    })
    this.scene = window.fxxsViewer.scene;
    var promise = this.scene.open(this.mapUrl); 
    var style = new Cesium.Style3D();
    style.bottomAltitude = -1000;
    promise.style3D = style;
    // fxxsViewer._cesiumWidget._creditContainer.style.display = "none"; //LOGO显示
    // fxxsViewer.camera.setView({
    //     destination:new Cesium.Cartesian3.fromDegrees(116.459389,39.904794,1000000.0),
    //     orientation: {
    //     heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north)
    //     pitch: Cesium.Math.toRadians(-50), // default value (looking down)
    //     roll: 0.0 // default value
    //   }
    // }); // 设置初始位置--好像没什么作用
    // this.fxxsViewer.camera.twistRight(Cesium.Math.toDegrees(-30).toFixed(2));
    // this.fxxsViewer.camera.zoomOut(100);
    setTimeout(() =>{
      //  this.addMarker()
      //  this.flyTo(this.pointList[3])
      /**
       * 参数： 经纬度 高度，viewer为实例，加入该句代码，即加载效果。
          默认抬头90度， 从上往下-90度。
          heading：控制左右摆头
          pitch：上下摆头
       */
      //  fxxsViewer.camera.setView({
      //   destination:Cesium.Cartesian3.fromDegrees(116.459389,39.904794,100.0),
      //   orientation: {
      //   heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north)
      //   pitch: Cesium.Math.toRadians(-50), // default value (looking down)
      //   roll: 0.0 // default value
      // }
    // })
    // fxxsViewer.camera.zoomOut(2000);
    //绘制水面
    // this.addWaterArea()
    
    },1000)
    setTimeout(() => {
    //   //绘制测试粒子系统
      console.log('loading 喷泉')
    // this.createWaterSystem()

  //    let point = this.pointList[0]
  //  var pos1 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 100);
  //       var entity = fxxsViewer.entities.add({
  //           position: pos1
  //       });
  //       fxxsViewer.zoomTo(entity);
  //       //关闭HDR
  //       this.scene.highDynamicRange = false;
  //       let that = this
  //       let primitive = new Cesium.ParticleSystem({
  //           image: require('../FxxsJs/icons/smoke.png'),
  //           startColor: new Cesium.Color(1, 1, 1, 0.6),
  //           endColor: new Cesium.Color(0.80, 0.86, 1, 0.4),
  //           startScale: that.viewModel.startScale,
  //           endScale: that.viewModel.endScale,
  //           minimumParticleLife: that.viewModel.minimumParticleLife,
  //           maximumParticleLife: that.viewModel.maximumParticleLife,
  //           minimumSpeed: that.viewModel.minimumSpeed,
  //           maximumSpeed: that.viewModel.maximumSpeed,
  //           imageSize: new Cesium.Cartesian2(that.viewModel.particleSize, that.viewModel.particleSize),
  //           emissionRate: that.viewModel.emissionRate,
  //           lifetime: 16.0,
  //           //粒子发射器
  //           emitter: new Cesium.CircleEmitter(0.2),
  //           emitterModelMatrix: computeEmitterModelMatrix(),
  //           updateCallback: applyGravity,
  //           sizeInMeters: true,
  //           performance:false,
  //       })
  //       particleSystem = this.scene.primitives.add(primitive)
        
        // //场景渲染事件--场景更新之前
        // this.scene.preUpdate.addEventListener(function (scene, time) {
        //     console.log('preUpdate')
        //     that.particleSystem.modelMatrix = computeModelMatrix(entity, time);
        //     // Account for any changes to the emitter model matrix.
        //     that.particleSystem.emitterModelMatrix = computeEmitterModelMatrix();
        // });

    function computeModelMatrix(entity, time) {
        return entity.computeModelMatrix(time, new Cesium.Matrix4());
    }
    function computeEmitterModelMatrix() {
        var emitterModelMatrix = new Cesium.Matrix4();
        var translation = new Cesium.Cartesian3();
        var rotation = new Cesium.Quaternion();
        var hpr = new Cesium.HeadingPitchRoll();
        var trs = new Cesium.TranslationRotationScale();

        //调节粒子的发射方向
        hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
        //喷泉位置
        trs.translation = Cesium.Cartesian3.fromElements(0, 0, 5.4, translation);
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

        return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
    }
    // 更新粒子运动状态
    function applyGravity(p, dt) {
        var gravityScratch = new Cesium.Cartesian3();
        // We need to compute a local up vector for each particle in geocentric space.
        var position = p.position;

        Cesium.Cartesian3.normalize(position, gravityScratch);
        Cesium.Cartesian3.multiplyByScalar(gravityScratch, this.viewModel.gravity * dt, gravityScratch);

        p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
    }
    }, 5000);
  },
  leftVisible(val){
      let that = this
      that.ifShowLeft = val
      that.leftBtnIconUrl = that.ifShowLeft?require('../../assets/images/common/shousuo.png'):require('../../assets/images/common/zhankai.png')
    },
  rightVisible(val){
      let that = this
      that.ifShowRight = val
      that.rightBtnIconUrl = that.ifShowRight?require('../../assets/images/common/zhankai.png'):require('../../assets/images/common/shousuo.png')
    },
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
        that.currentList[3].value2 = cxmyl || '0'
        that.currentList
      }
    }).catch(() => {
            
    });
   }, 
    //地图上添加测试点位
   addMarker(){
    let drag = new DragEntity({
        viewer:fxxsViewer, 
      })
      let _this = this
      this.pointList.forEach(item => {
        let entity = drag.addEntity(item);
        _this.poinEntity[item.id] = entity;
      })

   }, 
   //点位的点击事件
   leftDownAction(){
      let viewer = fxxsViewer
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        let _this = this
        let id
        _this.handler.setInputAction(function (movement) {
            let pick = viewer.scene.pick(movement.position); 
            if (Cesium.defined(pick) && (pick.id.id) ) {
                // _this.leftDownFlag = true;
                id= pick.id.id;
                 _this.bubble(id)
            }else{
              // console.log(_this.bubbles)
              if(_this.bubbles){
                _this.bubbles.windowClose()
              }
              
            }
            
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        
    },
    bubble(id){
      if(this.bubbles){
        this.bubbles.windowClose()
      }
      this.bubbles = new Bubble(Object.assign(this.poinEntity[id],{
        viewer:fxxsViewer
      }))
      
    },
    //绘制水域面
    addWaterArea(){
      let area = new WaterArea({
        viewer:fxxsViewer, 
      })
      let point = [116.454162,39.904741,
                   116.456783,39.90894]
      let parray = []
      this.pointList.forEach(p =>{
        let position = new Cesium.Cartesian3.fromDegrees(p.lng, p.lat,50)
        parray.push(position)
      })    
      area.addWaterArea(parray)
    },
    //绘制粒子系统-开闸
    createWaterSystem(){
      let point = this.pointList[3]
      var pos1 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 100);
        var entity = window.fxxsViewer.entities.add({
            position: pos1
        });
      window.fxxsViewer.zoomTo(entity);
      // let water = new OpenWaterZha({
      //   viewer:fxxsViewer, 
      //   particleSystem:particleSystem,
      //   viewModel:this.viewModel,
      //   scene:this.scene
      // })
      // water.open(this.pointList[0])
    },
   //飞行到某个点位
   flyTo(point){
    var center = Cesium.Cartesian3.fromDegrees(point.lng, point.lat,100);
    var heading = Cesium.Math.toRadians(0.0);
    var pitch = Cesium.Math.toRadians(-30.0);
    var range = 100.0;
    fxxsViewer.camera.flyToBoundingSphere(
            new Cesium.BoundingSphere(center, 50),
            {
                offset: new Cesium.HeadingPitchRange(heading, pitch, range),
                duration: 2,
            },
    );
    //   viewer.camera.flyTo({
    //   destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    //   orientation : {
    //     heading : Cesium.Math.toRadians(0.0),
    //     pitch : Cesium.Math.toRadians(-15.0),
    //   }
    // });
   },
 }
}
</script>

<style lang="less">
@import "index.less";
</style>
