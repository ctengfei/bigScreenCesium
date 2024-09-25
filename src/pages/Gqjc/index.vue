<template>
  <div class="gqjc" v-loading="loading" 
    element-loading-text="地图初始化中......"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="showBtn left" @click="leftVisible"><img :src="leftBtnIconUrl" />{{ifShowLeft?'收缩':'展开'}}</div>
    <div class="showBtn right"  @click="rightVisible"><img :src="rightBtnIconUrl" />{{ifShowRight?'收缩':'展开'}}</div>
    <div class="gqjc-left" v-show="ifShowLeft">
      <content-box class="gqjc-wyskjbqk boxCommon" width="615px" height="389px">
        <content-title name="王英水库基本概况"></content-title>
        <wysk-info></wysk-info>
      </content-box>
      <content-box class="gqjc-jbgk boxCommon" width="615px" height="489px">
        <content-title name="王英灌区基本概况"></content-title>
        <base-info></base-info>
      </content-box>
       <content-box class="gqjc-ssjc boxCommon" width="615px" height="900px">
        <content-title name="实时监测站点监测"></content-title>
        <zhjc-site-monitor></zhjc-site-monitor>
      </content-box>
    </div>
    <!---bim详细信息-->
    <content-box v-show="bimLeftDetail" class="gqjcpc-bin-left boxCommon" width="400px" height="350px" angleWidth="25px" angleHeight="25px">
      <content-title name="BIM列表"></content-title>
      <div class="bimBox">
        <li v-for="bar in bimTabs">
          <div class="t-title">{{ bar.name }}</div>
          <div class="t-content">
            <span v-for="btn in bar.children" @click="handleBim(btn,bar)" :class="{active:currentBim == btn.id }">{{ btn.name }}</span>
          </div>
        </li>
      </div>
    </content-box>
    <content-box v-show="bimRightDetail" class="gqjcpc-bin-right boxCommon" width="400px" height="350px" angleWidth="25px" angleHeight="25px">
      <content-title name="BIM详细信息"></content-title>
      <span @click="handleClosePlay" class="bimClose"><i class="el-icon-close" style="font-size: 18px;vertical-align: text-top"></i></span>
      <div class="bimTable">
        <li v-for="info in bimTable">
          <div class="c-title">{{ info.name }}</div>
          <div class="c-content" >{{ info.value }}</div>
        </li>
      </div>
    </content-box>
    <!---用水统计-->
    <div class="ystj" :class="ifShowLeft?'':'toLeft'">
      <img class="ystj-bg" src="../../assets/images/fxxs/rain-Bg.png"/>
      <div class="ystj-item">
        <span class="ystj-title">年降雨量统计</span>
        <div><span class="ystj-num">2377</span><span class="ystj-unit">mm</span></div>
      </div>
      <div class="ystj-item">
        <span class="ystj-title">供水占比</span>
        <div><span class="ystj-num">80</span><span class="ystj-unit">%</span></div>
      </div>
      <div class="ystj-item">
        <span class="ystj-title">年灌溉计划用水</span>
        <div><span class="ystj-num">2377</span><span class="ystj-unit">百万方</span></div>
      </div>
      <div class="ystj-item">
        <span class="ystj-title">年灌溉用水量</span>
        <div><span class="ystj-num">2377</span><span class="ystj-unit">百万方</span></div>
      </div>
      <dv-decoration-12 style="width:50px;height:50px;"  class="ystj-zs" :color="['#04ADE0','#04ADE0']"/>
    </div>
    <!--多选框-->
    <div class="myCheckBox" @click="openCheckBox" :class="ifShowLeft?'':'toLeft'"><img src="../../assets/images/gqjc/dxk_bg.png"/></div>
    <div class="myCheckBoxContent" v-show="isShowCheckBox" :class="ifShowLeft?'':'toLeftBox'">
      <el-checkbox-group v-model="checkList" @change="handleLayerChange">
        <el-checkbox :label="item.id" v-for="(item,index) in checkListData" :key="index"  @change="handleLayerChange($event,item)">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <!--概化图-->
    <div class="ghtBtn" @click="openGhtBox" :class="ifShowRight?'':'toRight'"><img src="../../assets/images/gqjc/ght_icon.png"/><span>概</span><span>化</span><span>图</span></div>
    <div class="ghtContent" v-show="ifShowGht" :class="ifShowRight?'':'toRightBox'">
      <!-- <el-image
            style="width: 100%; height: 100%"
            :src="ghtUrl"
            :preview-src-list="[ghtUrl]">
        </el-image>  -->
        <Generalization :ifShowGht="ifShowGht" />
    </div>
    <!-- 飞行漫游 -->
    <div class="flyBtn" :class="ifShowRight?'':'toRight'">
        <div class="fb-left">
            <div class="fb-l-top fb-l">
               <div @click="flyPlayBtn('pause')" class="fb-l-t-n" :class="flyStatus=='pause' ? 'fb-l-t-n-img-active' : 'fb-l-t-n-img' "></div>
            </div>
            <div class="fb-l-bottom fb-l">
              <div @click="flyPlayBtn('stop')" class="fb-l-b-n" :class="flyStatus=='stop' ? 'fb-l-b-n-img-active' : 'fb-l-b-n-img' "></div>
            </div>
        </div>
        <div class="fb-right">
          <div class="fb-r-top">
            <div class="fb-r-t-w">
              <div @click="flyPlayBtn('play')" class="fb-r-t-n" :class="flyStatus=='play' ? 'fb-r-t-n-img-active' : 'fb-r-t-n-img' "></div>
            </div>
          </div>
          <div class="fb-r-bottom">
            <div class="fb-r-b-n">
                <div class="fb-r-b-n-txt">
                  {{flyData[flyDataActive].name}}
                </div>
            </div>
            <div class="fb-r-b-n-left" @click="flyLeftBtn"></div>
            <div class="fb-r-b-n-right" @click="flyRightBtn"></div>
          </div>
        </div>
    </div>

    <!--右侧-->
    <div class="gqjc-right" v-show="ifShowRight">
      <content-box class="gqjc-ggmjtj boxCommon" width="615px" height="440px">
        <!-- <content-title name="种植结构面积统计(km²)"></content-title> -->
        <!-- <area-statistics></area-statistics> -->
        <content-title name="流量监测"></content-title>
        <flow-monitor></flow-monitor>
      </content-box>
       <content-box class="gqjc-zyslfx boxCommon" width="615px" height="440px">
        <content-title name="实际用水量(万m³)"></content-title>
        <water-analysis></water-analysis>
      </content-box>
<!--      <content-box class="gqjc-jcyxzt boxCommon" width="615px" height="295px">-->
<!--        <content-title name="监测站点运行状态"></content-title>-->
<!--        <run-status></run-status>-->
<!--      </content-box>-->
      <content-box class="gqjc-qxzs boxCommon" width="615px" height="295px">
        <content-title name="卫星云图"></content-title>
        <weather></weather>
      </content-box>
      <content-box class="gqjc-ssyq boxCommon" width="615px" height="235px">
        <content-title name="雷达回波图"></content-title>
        <LDHBMap></LDHBMap>
      </content-box>
      <!-- <content-box class="gqjc-ssyq boxCommon" width="615px" height="235px">
        <content-title name="实时雨晴"></content-title>
        <rain-map></rain-map>
      </content-box> -->
      <content-box class="gqjc-sqjk boxCommon" width="615px" height="325px">
        <content-title name="视频监控"></content-title>
        <zhjc-video></zhjc-video>
      </content-box>
    </div>
    <div class="gqjc-bottom">
      <img class="bottom-dz" src="../../assets/images/gqjc/gqjc-dz.png"/>
      <div class="gqjc-bottom-item" v-for="(item,index) in bottomList" :key="index" :style="getBottomStyle(index)" @click="bottomChange(item)">
        <img class="bottom-item-wzbg" :src="item.ifcheck == true ? dizuoCheckedUrl : dizuoUrl"/>
        <img class="bottom-item-wzdz" src="../../assets/images/gqjc/gqjc-wz-dz.png"/>
        <p class="bottom-item-title" :class="item.ifcheck == true? 'bottomCheck':''">{{item.name}}</p>
        <p class="bottom-item-wz"><span class="bottom-item-text">{{item.value}}</span><span>站</span></p>
      </div>

    </div>
    <el-dialog
        :visible.sync="dialogVisible"
        width="25%"
        :modal-append-to-body='false'
        @close="dialogVisible = false"
        class="siteVideoBox"
    >
      <template slot="title">
        <div style="display: flex">
          <h4 style="margin-bottom: 0;font-size: 17px">名称：{{videoData.name}}</h4>
          <!-- <h4 style="margin-bottom: 0;margin-left: 20px;font-size: 17px">编号：{{videoData.code}}</h4> -->
        </div>
      </template>
      <div class="lpbox" ref="mv">

      </div>
    </el-dialog>
  </div>
</template>

<script>
import ContentBox from '@/components/ContentBox.vue'
import ContentTitle from '@/components/ContentTitle.vue'
import BaseInfo from '@/components/Zhjc/BaseInfo.vue';
import WyskInfo from '@/components/Zhjc/WyskInfo';
import ZhjcSiteMonitor from '@/components/Zhjc/ZhjcSiteMonitor';
import WaterAnalysis from '@/components/Zhjc/WaterAnalysis.vue';
import AreaStatistics from '@/components/Zhjc/AreaStatistics.vue';
import FlowMonitor from '@/components/Zhjc/FlowMonitor.vue';
import RunStatus from '@/components/Zhjc/RunStatus.vue';
import ZhjcVideo from '@/components/Zhjc/ZhjcVideo.vue';
import Weather from '@/components/Zhjc/Weather.vue';
import LDHBMap from '@/components/Zhjc/LDHBMap.vue';
import RainMap from '@/components/Zhjc/RainMap.vue';
import LivePlayer from '@liveqing/liveplayer'
import Generalization from '@/components/Generalization'
import BimData from "@/components/map/BimData.json";
import Hls from "hls.js";
import DPlayer from "dplayer";

export default {
  data() {
    return {
      bimLeftDetail: false,
      bimRightDetail: false,
      loading:false,
      ifShowLeft:true,//是否展示左侧部分
      ifShowRight:true,//是否展示右侧部分
      leftBtnIconUrl:require('../../assets/images/common/shousuo.png'),
      rightBtnIconUrl:require('../../assets/images/common/zhankai.png'),
      //底部按钮选中
      bottomIndex:'PPS',
      bottomList:[
        {
          name:'雨量监测',
          value:0,
          id:'PPS',
          index:0,
          ifcheck:true,
          key:'pptnStatisticsList'
        },{
          name:'水库水情',
          value:0,
          index:1,
          id:'RR',
          ifcheck:false,
          key:'rsvrRList'
        },{
          name:'河道水文',
          value:0,
          id:'ZQ',
          index:2,
          ifcheck:false,
          key:'riverRList'
        },{
          name:'渠道水情',
          value:0,
          id:'ZZ',
          index:3,
          ifcheck:false,
          key:'zzRiverRList'
        },{
          name:'水闸监测',
          value:0,
          id:'DD',
          index:4,
          ifcheck:false,
          key:'wagaList'
        },{
          name:'水质监测',
          value:0,
          id:'WQ',
          index:5,
          ifcheck:false,
          key:'awqmdDList'
        },{
          name:'视频监控',
          value:0,
          id:'VD',
          index:6,
          ifcheck:false,
          key:'wmstList'
        }
      ],
      bottomTypes:'PPS',//选中的bottom类型
      dizuoUrl:require("../../assets/images/gqjc/gqjc-wz-bg.png"),
      dizuoCheckedUrl:require("../../assets/images/gqjc/gqjc-wz-bg-check.png"),
      isShowCheckBox:false,//是否显示多选框
       checkList:[1,4,5],//已经选中的多选项
      checkListData:[
        {
          id:0,
          name:'行政区划'
        },{
          id:1,
          name:'灌区边界'
        },{
          id:2,
          name:'供水范围'
        },{
          id:3,
          name:'灌溉范围'
        },{
          id:4,
          name:'总干渠'
        },{
          id:5,
          name:'干渠'
        },{
          id:6,
          name:'水系河流'
        },{
          id: 7,
          name: 'BIM模型'
        }
      ],
      ifShowGht:false,//是否显示概化图
      ghtUrl:require('@/assets/images/gqjc/ght.png'),
      gloabMarkeList:[
      {
        lat:29.851694,
        lng:114.769751,
        x:-2319912.563510504,
        y: 5027177.846972677,
        z:3156085.9314931408,
        id:'1',
        name:'蔡贤水库',
        level:126,//高
        heading:-60,//角度旋转
        pitch:-10.452473533906065,//倾斜角度
        roll:0.0,
        desc:"水库总库容0.4113亿m³，Ⅲ等工程，由主坝、副坝（4座）、溢洪道，输水灌双延满等活筑物组成。设计洪水标准为50年一遇，校核洪水标准为1000年一遇，水库正常落水位70.00m，设计洪水位71.72m，校报洪水位72.59m。"
      },
      {
        lat:29.872744,
        lng:114.700519,
        x:-2312829.0042603873,
        y:5029063.230686422,
        z:3158233.623881662,
        id: '2',
        name: '阳武渠首闸',
        level: 95,//高
        heading: 90,//角度旋转
        pitch: -10,//倾斜角度
        desc: "阳武渠首闸：总干渠桩号0+000，于1972年动工，1975年竣工并投入使用，该闸位于咸宁市咸安区双溪桥镇杨林村，蔡贤水库库尾，是总干渠的进水闸，主要建筑物有闸室、涵洞、发电输水管、启闭操作台、工作桥等。其设计采用底板高程58.00m，闸顶高程75m，设有双矩形灌溉孔，两扇闸门为平板钢闸门，闸门高度4.0m，闸门净宽2.7m，设计流量37.95m3/s；渠首闸闸室为砖混结构,琉璃瓦屋面，闸室内配备两台手电两用螺杆式启闭机QL-100-SD，QL-250-SD，电机功率4KW,转速960r/min。其主要功能其主要功能为减轻上游防洪压力，为下游提供生态用水。"
      },
      {
        lat:29.7947526,
        lng:114.9067708,
        x:-2333098.46872432,
        y:5024260.546748528,
        z:3151137.7899475703,
        id:'3',
        name:'王英水库',
        level:164,//高
        heading:-160,//角度旋转
        pitch:-10,//倾斜角度
        desc:'王英水库枢纽工程于1970年动工兴建，1971年基本建成，同年汛期拦洪蓄水，1975年全部完工。水库设计灌溉面积49.6万亩，防洪保护范围706.3Km2，保护人口30万人，保护农田23万亩，灭螺面积15万亩。'
      },
      
      ],
      markerList:[],//扎点数据
      dialogVisible:false,
      videoData:{},
      bimTabs: [],
      bimTable:[],
      flyData:[
        {name: '王英水库漫游', filepath: './flyFiles/wyRoutes01.fpf'},
        {name: '蔡贤水库漫游', filepath: './flyFiles/cxRoutes01.fpf'},
        {name: '阳武干渠漫游', filepath: './flyFiles/ywgqRoutes01.fpf'}
      ],
      flyDataActive:0,
      flyStatus:'',
      currentBim:'',
      hls1:null,
      play1:null
    };
  },
  components:{
    ContentBox,
    ContentTitle,
    BaseInfo,
    WyskInfo,
    ZhjcSiteMonitor,
    WaterAnalysis,
    AreaStatistics,
    FlowMonitor,
    RunStatus,
    ZhjcVideo,
    Weather,
    LDHBMap,
    RainMap,
    LivePlayer,
    Generalization
  },
  watch:{
    dialogVisible:function (val) {
      this.$nextTick(()=>{
        if(val){
          this.hls1 = new Hls();
          this.play1 = new DPlayer({
            container: this.$refs.mv,
            live:true,
            autoplay:true,
            video: {
              url: this.videoData.url,
              type: 'customHls',
              customType: {
                customHls: (video, player)=> {
                  this.hls1.loadSource(video.src);
                  this.hls1.attachMedia(video);
                },
              },
            },
          });
          this.play1.on('pause', ()=> {
            this.hls1.stopLoad();
          });
          this.play1.on('play',()=> {
            this.hls1.startLoad();
          });
          this.play1.on('destroy',()=> {
            this.hls1 && this.hls1.destroy();
          });
        }else{
          this.play1.destroy();
          this.play1 = null;
        }
      })
    }
  },
  created(){
    let that = this
    if(localStorage.getItem('initMap') == 'true'){
      that.loading = true
    }
    this.$bus.on('zhjc',(val) =>{
       console.log('zhjc-32:9-接收通知')
      console.log('32:9发送通知-pcZHJCCreatMarker')
      that.$bus.emit('pcZHJCCreatMarker',that.gloabMarkeList)
      if(that.loading == true){
        that.$bus.emit('pcZHJCCreatSiteMarker',{list:that.markerList,key:'pptnStatisticsList'})
      }
      that.loading = false
    })
    this.$bus.on('zhjcOpenVideo',(val) =>{
      this.dialogVisible = true
      this.videoData = val
    })
  },
  mounted() {
    let that = this;
    let scaleX = localStorage.getItem("scaleX");
    //颜色选择框需要等比缩小
    that.$nextTick(() => {
      // $("#lkcolorPoint").on("click", function () {
      //   that.colorPickerVisibleChange($("#lkcolorPoint"));
      // });
    });
    that.getButtomCount()
    that.getSiteList()
    this.$bus.on('showBimDetail',(arr)=>{
      this.bimRightDetail = true;
      this.bimTable = arr;
    })
  },
  methods: {
    handleClosePlay(){
      this.bimRightDetail = false;
    },
    flyPlayBtn(option){//飞行漫游
      this.flyStatus = option;
      this.$bus.emit('flyOption',{name:this.flyData[this.flyDataActive].name,filepath:this.flyData[this.flyDataActive].filepath,option:option});
    },
    flyLeftBtn(){//选择飞行路线
      if(this.flyDataActive === 0){
        this.flyDataActive = this.flyData.length-1;
      }else{
        this.flyDataActive --;
      }
    },
    flyRightBtn(){//选择飞行路线
      if(this.flyDataActive === this.flyData.length-1){
        this.flyDataActive = 0;
      }else{
        this.flyDataActive ++;
      }
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
    getBottomStyle(index){
      if(index == 0){
        return {
          marginLeft:'20px'
        }
      }else{
        return {
          marginLeft:'-20px'
        }
      }
    },
    //打开多选框
    openCheckBox(){
      let that = this
      that.isShowCheckBox = !that.isShowCheckBox
    },
    //打开概化图
    openGhtBox(){
      let that = this
      that.ifShowGht = !that.ifShowGht
    },
    //当下拉框显示的时候设置其缩放属性
    Handledropdown(val) {
      if (val) {
        let scaleX = localStorage.getItem("scaleX");
        $(".transCommon").css("transform", "scale(" + scaleX + ")");
      }
    },
    //缩小颜色选择框
    colorPickerVisibleChange(val) {
      let that = this;
      setTimeout(() => {
        let dom = $(".el-color-picker__panel")[1];
        let width = dom.clientWidth;
        let hight = dom.clientHeight;
        if (dom != undefined) {
          dom.style.transform = "scale(" + that.scaleX + ")";
          // let top = dom.style.top
          // let left = dom.style.left
          // let topValue = parseInt(top.substring(0,top.length - 2)) - (hight-hight*that.scaleX)/2
          // let leftValue = parseInt(left.substring(0,left.length - 2)) - (width-width*that.scaleX)/2
          // dom.style.top = topValue +'px'
          // dom.style.left = leftValue +'px'
        }
      }, 50);
    },
    //底部菜单切换
    bottomChange(item){
      let that = this
      item.ifcheck = !item.ifcheck
      if(item.ifcheck){
         that.bottomIndex = item.id
        that.bottomTypes += item.id
        //添加新的点位
        that.getSiteList()
      }else{
        that.bottomTypes = that.bottomTypes.replace(item.id,'')
        //移除取消的点位
        this.$bus.emit('removePoint',item.key)
      }
      this.$bus.emit('bottomChange',that.bottomTypes)
      
      // console.log('that.bottomTypes：'+that.bottomTypes)
      
    },
    getButtomCount(){
      this.$api.gqjc.getZHJC_SiteCount().then((res) => {
        if(res.code == 200){
          let result = res.data
          if(result !== null && result !== undefined){
             this.bottomList[0].value = result.pptnCount//雨量
             this.bottomList[1].value = result.rrCount//水库水情
             this.bottomList[2].value = result.rsvrCount//河道水情
             this.bottomList[3].value = result.flowCount//渠道水情
             this.bottomList[4].value = result.wagaCount//水闸
             this.bottomList[5].value = result.awqmdCount//水质
             this.bottomList[6].value = result.wmstCount//视频
             
          }
        }

      }).catch(() => {
            
      }); 
    },
    //获取监测列表
     getSiteList(){
      let that = this
      let type = "PPS"
      let dataKey = 'pptnStatisticsList'
      let x = 'stLat'
      let y = 'stLong'
      let code = 'stCode'
      let name = 'stName'
      switch (that.bottomIndex){
         case "PPS"://雨量
          type = "PPS"
          dataKey = 'pptnStatisticsList'
          x = 'stLat'
          y = 'stLong'
          code = 'stCode'
          name = 'stName'
          break
        case "RR"://水位
          type = "RR"
          dataKey = 'rsvrRList'
          x = 'stLat'
          y = 'stLong'
          code = 'stCode'
          name = 'stName'
          break
       
        case "ZQ"://河道
         type = "ZQ"
         dataKey = 'riverRList'
         x = 'stLat'
         y = 'stLong'
         code = 'stCode'
         name = 'stName'
          break
        case "ZZ"://渠道水情
         type = "ZZ"
         dataKey = 'zzRiverRList'
         x = 'stLat'
         y = 'stLong'
         code = 'stCode'
         name = 'stName'
          break
        case "DD"://水闸
         type = "DD"
         dataKey = 'wagaList'
         x = 'stLat'
          y = 'stLong'
          code = 'stCode'
          name = 'stName'
          break
        case "WQ"://水质
         type = "WQ"
         dataKey = 'awqmdDList'
         x = 'stLat'
          y = 'stLong'
          code = 'stCode'
          name = 'stName'
          break
        case "VD"://视频
         type = "VD"
         dataKey = 'wmstList'
         x = 'wmstLat'
          y = 'wmstLong'
          code = 'wmstCode'
          name = 'wmstName'
          break   
      }
      let params = {
        stName:'',
        stType:type
      }
      console.log('请求点位：'+dataKey)
      this.$api.gqjc.getZHJC_SiteList(params).then((res) => {
            let result = res.data
            if(result){
              that.markerList = result[dataKey] == null?[]:result[dataKey]
              that.markerList.forEach(marker =>{
                marker.type = type
                marker.x = marker[x]
                marker.y = marker[y]
                marker.code = marker[code]
                marker.name = marker[name]
              })
            }else{
              that.markerList = []
            }
            if(that.loading == false){
              console.log('32:9发送通知-扎站点：'+dataKey)
              that.$bus.emit('pcZHJCCreatSiteMarker',{list:that.markerList,key:dataKey})
            }
            
          }).catch(() => {
            
          });
    },
    // 切换bim
    handleBim(btn,BIMtype){
      this.currentBim = btn.id;
      this.$bus.emit('showBim',btn,BIMtype)
    },
    //图层选择
    handleLayerChange(val,item){
      if(item.id == 7){
        if(this.checkList.includes(7)){
          this.leftVisible();
          this.rightVisible();
          this.bimLeftDetail = true;
          this.bimTabs = BimData.map(r=>{
            return {
              ...r,
              children:r.children.filter(r=> !r.type)
            }
          })
        }else{
          this.ifShowLeft = true;
          this.leftBtnIconUrl = this.ifShowLeft ? require('../../assets/images/common/shousuo.png') : require('../../assets/images/common/zhankai.png')
          this.ifShowRight = true;
          this.rightBtnIconUrl = this.ifShowRight ? require('../../assets/images/common/zhankai.png') : require('../../assets/images/common/shousuo.png')
          this.bimLeftDetail = false;
          this.bimRightDetail = false;
          // 隐藏bim
          this.$bus.emit('hideBim',false)
        }
      }
      item.ifCheck = val
      this.$bus.emit('zhjcLayerChange',{item: item, list: this.checkList.toString()})
    },
  },
};
</script>

<style lang="less">
@import "index.less";
</style>
