<template>
  <div class="szyddpc" id="szyddpc">
    <div class="showBtn left" @click="leftVisible"><img :src="leftBtnIconUrl" />{{ifShowLeft?'收缩':'展开'}}</div>
    <div class="showBtn right"  @click="rightVisible"><img :src="rightBtnIconUrl" />{{ifShowRight?'收缩':'展开'}}</div>
    <div class="szyddpc-left" v-show="ifShowLeft">
      <content-box class="szyddpc-sklsyc boxCommon" width="400px" height="438px" angleWidth="25px" angleHeight="25px">
        <content-title name="水库来需水预测"></content-title>
        <skls></skls>
      </content-box>
      <content-box class="szyddpc-gqgxyc boxCommon" width="400px" height="520px" angleWidth="25px" angleHeight="25px">
        <content-title name="王英灌区水量调度"></content-title>
        <gqgx></gqgx>
      </content-box>
       <!-- <content-box class="szyddpc-skxsyc boxCommon" width="400px" height="246px">
        <content-title name="水库需水预测"></content-title>
        <skxs></skxs>
      </content-box> -->
      <content-box class="szyddpc-dddwssjc boxCommon" width="400px" height="384px" angleWidth="25px" angleHeight="25px">
        <content-title name="调度点位实时监测"></content-title>
        <dd-site-monitor></dd-site-monitor>
      </content-box>
    </div>
    <!---用水统计-->
    <div class="ystj" :class="ifShowLeft?'':'toLeft'">
      <div class="ystj-item">
        <span class="ystj-title">多年平均降水量</span>
        <div><span class="ystj-num">{{ statistics.manyYearAvgRainfall || 0 }}</span><span class="ystj-unit">万m³</span></div>
      </div>
      <div class="ystj-item">
        <span class="ystj-title">多年平均来水量</span>
        <div><span class="ystj-num">{{ statistics.manyYearAvgInflow || 0 }}</span><span class="ystj-unit">万m³</span></div>
      </div>
      <div class="ystj-item">
        <span class="ystj-title">本年已降雨量</span>
        <div><span class="ystj-num">{{ statistics.yearRainfall || 0 }}</span><span class="ystj-unit">万m³</span></div>
      </div>
      <div class="ystj-item">
        <span class="ystj-title">本年已来水量</span>
        <div><span class="ystj-num">{{ statistics.yearInflow || 0 }}</span><span class="ystj-unit">万m³</span></div>
      </div>
      <dv-decoration-12 style="width:35px;height:35px;"  class="ystj-zs" :color="['#04ADE0','#04ADE0']"/>
    </div>
    <!---模拟预演-->
    <content-box class="szyddpc-mnyy boxCommon" :style="style" width="400px" height="106px"  v-show="ifShowPlay" :class="ifShowLeft?'':'toLeft'" angleWidth="25px" angleHeight="25px">
        <content-title name="灌区水量调度模拟预演"></content-title>
        <szy-plan-play></szy-plan-play>
    </content-box>
    <div class="szyddpc-right" v-show="ifShowRight">
      <content-box class="szyddpc-slddjl boxCommon" width="400px" height="239px" angleWidth="25px" angleHeight="25px">
        <content-title name="用水量统计"></content-title>
        <ysltj></ysltj>
      </content-box>
      <content-box class="szyddpc-ysltj boxCommon" width="400px" height="209px" angleWidth="25px" angleHeight="25px">
        <content-title name="王英灌区水量调度方案"></content-title>
        <slddjl></slddjl>
      </content-box>
      <content-box class="szyddpc-sllxtj boxCommon" width="400px" height="168px" angleWidth="25px" angleHeight="25px">
        <content-title name="水量类型统计" class="maxBg"></content-title>
        <sllxtj></sllxtj>
      </content-box>
      <content-box class="szyddpc-gysbd boxCommon" width="400px" height="186px" angleWidth="25px" angleHeight="25px">
        <content-title name="供用水比对" class="maxBg"></content-title>
        <gysbd></gysbd>
      </content-box>
      <content-box class="szyddpc-sqjk boxCommon" width="400px" height="120px" angleWidth="25px" angleHeight="25px">
        <content-title name="视频监控"></content-title>
        <szydd-video></szydd-video>
      </content-box>
      
    </div>
  </div>
</template>

<script>
import ContentBox from '@/components/ContentBox.vue'
import ContentTitle from '@/components/ContentTitlePC.vue'
import Skls from '@/components/SzyddPC/Skls.vue'
import Gqgx from '@/components/SzyddPC/Gqgx.vue'
import Skxs from '@/components/SzyddPC/Skxs.vue'
import DdSiteMonitor from '@/components/SzyddPC/DdSiteMonitor.vue'
import Slddjl from '@/components/SzyddPC/Slddjl.vue'
import Gysbd from '@/components/SzyddPC/Gysbd.vue'
import Sllxtj from '@/components/SzyddPC/Sllxtj.vue'
import SzyddVideo from '@/components/SzyddPC/SzyddVideo.vue'
import Ysltj from '@/components/SzyddPC/Ysltj.vue'
import SzyPlanPlay from '@/components/SzyddPC/SzyPlanPlay.vue'

export default {
data() {
    return {
      ifShowLeft:true,//是否展示左侧部分
      ifShowRight:true,//是否展示右侧部分
      leftBtnIconUrl:require('../../assets/images/common/shousuo.png'),
      rightBtnIconUrl:require('../../assets/images/common/zhankai.png'),
      ifShowPlay:false,
      statistics:{},
      style: {
        position: 'fixed',
        bottom: '177px'
      },
    }
},
components:{
    ContentBox,
    ContentTitle,
    Skls,
    Gqgx,
    Skxs,
    DdSiteMonitor,
    Slddjl,
    Gysbd,
    Sllxtj,
    SzyddVideo,
    Ysltj,
    SzyPlanPlay
},
created(){
  this.$bus.on('showSzyPlay',(val) =>{
    this.ifShowPlay = val
    this.$bus.emit('clearFloodAnalysisy')
  })
   this.$bus.on('closeTwoBox',(val) =>{
     this.leftVisible()
     this.rightVisible()
  })
 },
 mounted() {
    let that = this;
    let scaleX = localStorage.getItem("scaleX");
    this.$api.szydd.getWaterStatistics().then(res=>{
      if(res.success){
        this.statistics = res.data;
      }
    })
   this.$bus.on('getHasFullScreenFlag', (flag) => {
     if (flag) { // 全屏
       this.style = {
         position: 'fixed',
         bottom: '177px'
       }
     } else {
       this.style = {
         position: 'absolute',
         bottom: '16px'
       }
     }
   })
  },
  methods: {
     mapTest(){
      // if(window.viewer == null){
        window.viewer = new Cesium.Viewer('szyddpc');
            var scene = window.viewer.scene;
            var test2 = scene.open("https://27.17.47.174:9090/iserver/services/3D-WangYingGuanQuSanWei/rest/realspace")
            var style = new Cesium.Style3D();
            style.bottomAltitude = -1000;
            test2.style3D = style;
            test2.refresh();
            //获取经纬度
            let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function(event) {
                let cartesian = viewer.camera.pickEllipsoid(event.position);
                let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                let lng = Cesium.Math.toDegrees(cartographic.longitude); // 经度
                let lat = Cesium.Math.toDegrees(cartographic.latitude); // 纬度
                let alt = cartographic.height; // 高度，椭球面height永远等于0
                let coordinate = {
                    longitude: Number(lng.toFixed(6)),
                    latitude: Number(lat.toFixed(6)),
                    altitude: Number(alt.toFixed(2))
                };
                console.log("==========获取经纬度坐标==============");
                console.log(coordinate);
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      // }
            
        },
    leftVisible(){
      let that = this
      that.ifShowLeft = !that.ifShowLeft
      that.leftBtnIconUrl = that.ifShowLeft?require('../../assets/images/common/shousuo.png'):require('../../assets/images/common/zhankai.png')
    },
     rightVisible(){
      let that = this
      that.ifShowRight = !that.ifShowRight
      that.rightBtnIconUrl = that.ifShowRight?require('../../assets/images/common/zhankai.png'):require('../../assets/images/common/shousuo.png')
    },
  },
}
</script>

<style lang="less">
@import "index.less";
</style>
