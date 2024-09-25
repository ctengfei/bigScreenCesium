<template>
  <div class="szydd">
    <div class="showBtn left" @click="leftVisible"><img :src="leftBtnIconUrl" />{{ifShowLeft?'收缩':'展开'}}</div>
    <div class="showBtn right"  @click="rightVisible"><img :src="rightBtnIconUrl" />{{ifShowRight?'收缩':'展开'}}</div>
    <div class="szydd-left" v-show="ifShowLeft">
      <content-box class="szydd-sklsyc boxCommon" width="615px" height="899px">
        <content-title name="水库来需水预测"></content-title>
        <skls></skls>
      </content-box>
      <content-box class="szydd-gqgxyc boxCommon" width="615px" height="899px">
        <content-title name="王英灌区水量调度"></content-title>
        <gqgx></gqgx>
      </content-box>
       <!-- <content-box class="szydd-skxsyc boxCommon" width="615px" height="380px">
        <content-title name="水库需水预测"></content-title>
        <skxs></skxs>
      </content-box> -->
      <content-box class="szydd-dddwssjc boxCommon" width="615px" height="500px">
        <content-title name="调度点位实时监测"></content-title>
        <dd-site-monitor></dd-site-monitor>
      </content-box>
    </div>
    <!---用水统计-->
    <div class="ystj" :class="ifShowLeft?'':'toLeft'">
      <img class="ystj-bg" src="../../assets/images/fxxs/rain-Bg.png"/>
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
      <dv-decoration-12 style="width:60px;height:60px;"  class="ystj-zs" :color="['#04ADE0','#04ADE0']"/>
    </div>
    <!---模拟预演-->
    <content-box class="szydd-mnyy boxCommon" width="615px" height="219px"  v-show="ifShowPlay" :class="ifShowLeft?'':'toLeft'">
        <content-title name="灌区水量调度模拟预演"></content-title>
        <szy-plan-play></szy-plan-play>
    </content-box>
    <div class="szydd-right" v-show="ifShowRight">
      <content-box class="szydd-slddjl boxCommon" width="615px" height="537px">
        <content-title name="王英灌区水量调度方案"></content-title>
        <slddjl></slddjl>
      </content-box>
       <content-box class="szydd-ysltj boxCommon" width="615px" height="339px">
        <content-title name="用水量统计"></content-title>
        <ysltj></ysltj>
      </content-box>
      <content-box class="szydd-sllxtj boxCommon" width="615px" height="260px">
        <content-title name="水量类型统计" ></content-title>
        <sllxtj></sllxtj>
      </content-box>
      <content-box class="szydd-gysbd boxCommon" width="615px" height="269px">
        <content-title name="供用水比对" ></content-title>
        <gysbd></gysbd>
      </content-box>
      <content-box class="szydd-sqjk boxCommon" width="615px" height="325px">
        <content-title name="视频监控"></content-title>
        <szydd-video></szydd-video>
      </content-box>
      
    </div>
  </div>
</template>

<script>
import ContentBox from '@/components/ContentBox.vue'
import ContentTitle from '@/components/ContentTitle.vue'
import Skls from '@/components/Szydd/Skls.vue'
import Gqgx from '@/components/Szydd/Gqgx.vue'
import Skxs from '@/components/Szydd/Skxs.vue'
import DdSiteMonitor from '@/components/Szydd/DdSiteMonitor.vue'
import Slddjl from '@/components/Szydd/Slddjl.vue'
import Gysbd from '@/components/Szydd/Gysbd.vue'
import Sllxtj from '@/components/Szydd/Sllxtj.vue'
import SzyddVideo from '@/components/Szydd/SzyddVideo.vue'
import Ysltj from '@/components/Szydd/Ysltj.vue'
import SzyPlanPlay from '@/components/Szydd/SzyPlanPlay.vue'

export default {
data() {
    return {
      ifShowLeft:true,//是否展示左侧部分
      ifShowRight:true,//是否展示右侧部分
      leftBtnIconUrl:require('../../assets/images/common/shousuo.png'),
      rightBtnIconUrl:require('../../assets/images/common/zhankai.png'),
      ifShowPlay:false,
      statistics:{}
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
  },
  methods: {
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
