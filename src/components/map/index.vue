<template>
  <div class="map" id="map" :class="if169 ? 'sanwei169' : 'sanwei'">
<!--    <div class="position" :class="if169?'resetP169':'resetP'" @click="resetMapLocation">-->
<!--      <img class="location2" src="../../assets/images/location2.png">-->
<!--      <img class="location" src="../../assets/images/location.png">-->
<!--    </div>-->
  </div>
</template>

<script>
// const sanweiUrl = "https://27.17.47.174:9090/iserver/services/3D-WangYingGuanQuSanWei/rest/realspace";
// const dituUrl =  "https://27.17.47.174:9090/iserver/services/3D-local3DCache-HuBeiShengYingXiang12HuBeiShengYaoGanYingXiang12Ji/rest/realspace";
// const zhiquUrl = "https://27.17.47.174:9090/iserver/services/map-wangyinggq/arcgisrest"  
// const zongquUrl = 
//   // "https://27.17.47.174:9090/iserver/services/map-wangyinggq/arcgisrest/wangyingmain/MapServer"
//   // "https://27.17.47.174:9090/iserver/services/map-wangyinggq/wms130/wangyingmain?MAP=wangyingmain"
//   "https://27.17.47.174:9090/iserver/services/map-wangyinggq/wmts-china/wangyingmain/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"
// const trunkUrl = 
//   "https://27.17.47.174:9090/iserver/services/map-wangyinggq/wmts-china/wangyingtrunk/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"  
// const bianjieUrl = 
//   "https://27.17.47.174:9090/iserver/services/map-wangyinggq/wmts-china/wangyingouter/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"  
import global from '@/api/global'
import bianjieJson from '../../static/wangyingbj3d.json'
import canalmainJson from '../../static/CANAL_MAIN.json'
import canaltrunkJson from '../../static/CANAL_TRUNK.json'
import waterRangeJson from '../../static/waterRange.json'
import riverJson from '../../static/river.json'
import ggAreaJson from '../../static/ggArea.json'
//行政区划
import regionJson from '../../static/region.json'
//王英灌区面json
import area3D from '../../static/area_3D.json'

//区域
import Bubble from './ZhjcJs/bubble/index.js'
import DragEntity from './ZhjcJs/dragentity.js'

//点位
import siteBubble from './ZhjcJs/siteBubble/siteIndex.js'
import SiteDragEntity from './ZhjcJs/siteentity.js'

//水资源点位
import SzyDrayEntity from './Szydd/szyDrayEntity';
import SzyBubble from './Szydd/szybubble'; // 弹框

//蓝天
import Sky from './sky.js'
//淹没分析
import SubmergeAnalysisy from './submergeAnalysisy.js'
import RiverAnalysis from './RiverAnalysis.js'
import FooldingAnalysisy from './fooldingAnalysisy.js'
import FloodAnalysis from "./FloodAnalysis/FloodAnalysis.js";
//开闸
import OpenWaterZha from './openWaterZha.js'
//片区点位
import PQEntity from './FxxsJs/PQEntity.js'
//bim操作
import BimEvent from './BimEvent.js'
import BimData from './BimData.json'
//高程点位
import GCEntity from './GCEntity.js'

export default {
  data() {
    return {
      if169: false,
      scaleX: 1,
      skyObj: null,//天空对象
      submergeA: null,//淹没分析的对象
      fooldingA: null,//连通性分析的对象
      weatherType: 'blueSky',
      initMap: true,//是否是初始化地图
      poinEntity: [],//地图区域点位集合
      siteEntity: [],//点位集合
      szyEntity: [],// d水资源点位集合
      pqPoinEntity: [],//片区的点位集合
      szyPoints: [
        {lng: 114.658316, lat: 29.88303, name: '一支渠(12+240)', id: 'szy1', swStep: 1, llStep: 0.6},
        {lng: 114.618796, lat: 29.893473, name: '二支渠(18+440)', id: 'szy2', swStep: 0.9, llStep: 0.5},
        {lng: 114.573323, lat: 29.900539, name: '四支渠(21+090)', id: 'szy3', swStep: 0.8, llStep: 0.4},
        {lng: 114.5348, lat: 29.91152, name: '五支渠(22+250)', id: 'szy4', swStep: 0.7, llStep: 0.3},
        {lng: 114.493849, lat: 29.900705, name: '六支渠(24+020)', id: 'szy5', swStep: 0.6, llStep: 0.2},
        {lng: 114.457933, lat: 29.926208, name: '七支渠(24+880)', id: 'szy6', swStep: 0.5, llStep: 0.1},
      ],
      //添加到地图所有的数据集合
      dataSourcesMap: {
        gloab: null,
      },
      layerCheckStr: '1,4,5',//默认展示的图层
      flyStatus: 0,//飞行状态 0需要初始化，1直接播放
      flyPath: '',//飞行文件
      BIMPromise:null,
      bimObj:[],
      gcData:[//高程点数据
          {
              lat: 29.795632417246967,
              lng: 114.87979779486264,
              height:72,
              x: -2330648.3954871898,
              y: 5025522.280324626,
              z: 3150796.541803253,
              id: 'gc1',
              name: '高程：72.00米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.79816556955196,
              lng: 114.87015898606677,
              height:79,
              x: -2329712.8197897263,
              y: 5025774.060575853,
              z: 3151020.7144480157,
              id: 'gc2',
              name: '高程：79.08米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.80550049757553,
              lng: 114.83031959186145,
              height:83.21,
              x: -2326048.131488706,
              y: 5027024.648969696,
              z: 3151729.8672476024,
              id: 'gc3',
              name: '高程：83.21米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.768522418146013,
              lng: 114.82175697717747,
              height:72.15,
              x: -2326174.7300025257,
              y: 5027154.195215029,
              z: 3151771.1190791214,
              id: 'gc4',
              name: '高程：72.15米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.766194916629875,
              lng: 114.8354037734026,
              height:87,
              x: -2327465.559901627,
              y: 5028818.028528864,
              z: 3147942.4106883034,
              id: 'gc5',
              name: '高程：87.20米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.787561243558574,
              lng: 114.93395518889388,
              height:80,
              x: -2335593.889425967,
              y: 5023750.853626286,
              z: 3149999.697012466,
              id: 'gc6',
              name: '高程：80.09米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.796384,
              lng: 114.876379,
              height:71.15,
              id: 'gc7',
              name: '高程：71.15米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.804287,
              lng: 114.841520,
              height:69.84,
              id: 'gc8',
              name: '高程：69.84米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.768841,
              lng: 114.818175,
              height:70.67,
              id: 'gc9',
              name: '高程：70.67米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.779822,
              lng: 114.802397,
              height:68.71,
              id: 'gc10',
              name: '高程：68.71米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          },{
              lat: 29.761323,
              lng: 114.829163,
              height:68.94,
              id: 'gc11',
              name: '高程：68.94米',
              level: 126,//高
              heading: -60,//角度旋转
              pitch: -10.452473533906065,//倾斜角度
              roll: 0.0,
          }
      ],
      gcPoint:[],//高程点集合点位
    };
  },
  components: {},
  created() {
    localStorage.setItem('initMap', true)
    if (this.$route.path.indexOf("169") > -1) {
      this.if169 = true;
    } else {
      this.if169 = false;
    }

  },
  mounted() {
    let that = this;
    window.vm = this
    this.szyBubbles = [];
    this.scaleX = localStorage.getItem("scaleX");

    this.mapInit();
    //综合监测站点监测
    this.$bus.on('pcZHJCCreatMarker', (val) => {
      console.log('接收通知-扎点-全局三点')
      that.addMarker(val)
    })
    //水资源调度添加点位
    this.$bus.on('pcZZYDYCreateMarker', () => {
      this.addSzyMarker()
    })
    //综合监测类型点位
    this.$bus.on('pcZHJCCreatSiteMarker', ({list: pointList, key: key}) => {
      console.log('接收通知-扎点-站点')
      that.addSiteMarker(pointList, key)
    })
    //清除除了边界，主干和支渠的所有点
    this.$bus.on('removePoint', (key) => {
      console.log('清除点位:' + key)
      that.removeDataSourceBykey(key)
    })
    // 重置地图
    this.$bus.on('resetMap', (val) => {
      console.log('重置地图')
      that.resetMap()
    })
    //综合监测三个主点按照某个视角飞入
    this.$bus.on('flyto', (val) => {
      console.log('进入');
      that.flyTo(val)
    })
    //只是飞到相应的经纬度坐标
    this.$bus.on('onlyflyto', (val) => {
      that.onlyFlyTo(val)
    })
    //综合监测站点弹出框
    this.$bus.on('openSitePopu', (val) => {
      that.openSitePopu(val)
    })
    //综合监测图层改变
    this.$bus.on('zhjcLayerChange', (val) => {
      that.handleLayerChange(val)
    })
    //防汛形势，图层淹没分析
    this.$bus.on('submergeAnalysisy', (val) => {
      that.startSubmerge(val)
    })
    //防汛形势，图层淹没分析
    this.$bus.on('clearSubmergeAnalysisy', () => {
      that.clearSubmerge()
    })
    //水资源调度，图层连通性分析-打开
    this.$bus.on('floodAnalysisy', (val) => {
      //如果开启了片区预演则先移除灌区片区预演效果
      that.removePQPoint()
      that.startFlooding(val)
    })
    //水资源调度，图层连通性分析-关闭
    this.$bus.on('clearFloodAnalysisy', () => {
      that.clearFlooding()
    })
    //防汛形势片区点位  
    this.$bus.on('fxxsPQPoint', (val) => {
      //如果开启了片区预演则先移除灌区片区预演效果
      that.removePQPoint()
      setTimeout(() => {
        that.addPQPoint(val)
      }, 1000)
    })
    //水资源点位弹窗
    this.$bus.on('szyShowDialg', () => {
      this.closeAllPopu()
      this.szyPoints.forEach(r => {
        this.szyBubble(r.id, {swStep: r.swStep, llStep: r.llStep})
      })
      this.$bus.emit('readTime')
    })
    //漫游飞行
    this.$bus.on('flyOption', (item) => {
      if (item.option === 'play') { //播放
        if (this.flyPath != item.filepath) {
          this.flyStatus = 0;
        }
        if (this.flyStatus == 0) {
          this.waterFlyInit(item);
        } else if (this.flyStatus == 1) {
          this.waterFlyPlay();
        }

      } else if (item.option === 'pause') { //暂停
        this.waterFlyPause();
      } else if (item.option === 'stop') { //停止
        this.waterFlyStop();
      }
    })
    //控制高程查询
    this.$bus.on('selectGcEvent', (val) => {
      if(val){
        //加载高程点
        that.gcMarker();
      }else{
        //移除高程点
        that.removGcMarker();
      }
    })

  },
  methods: {
    //地图初始化
    mapInit() {
      let that = this
      //解决武阳干渠错位的问题---start
      var obj = [6378137.0, 6378137.0, 6356752.3142451793];
      Cesium.Ellipsoid.WGS84 = Object.freeze(new Cesium.Ellipsoid(obj[0], obj[1], obj[2]));
      //解决武阳干渠错位的问题---end
      window.startupCalled = true;
      window.viewer = new Cesium.Viewer("map", {
        infoBox: false,//去除原生自带右上角弹窗
        skyBox: new Cesium.SkyBox({
          sources: {
            positiveX: require('../../assets/images/SkyBox/bluesky/Right.jpg'),
            negativeX: require('../../assets/images/SkyBox/bluesky/Left.jpg'),
            positiveY: require('../../assets/images/SkyBox/bluesky/Front.jpg'),
            negativeY: require('../../assets/images/SkyBox/bluesky/Back.jpg'),
            positiveZ: require('../../assets/images/SkyBox/bluesky/Up.jpg'),
            negativeZ: require('../../assets/images/SkyBox/bluesky/Down.jpg')
          }
        }),
        // 是否显示全屏按钮
        fullscreenButton: false,
        //底部时间轴
        timeline: true,
        animation: true,
      });
      window.viewer._cesiumWidget._creditContainer.style.display = "none"; //LOGO显示
      // window.viewer.scene.postProcessStages.fxaa.enabled = false;//警告：去锯齿 是文字清晰---但是，添加上这句话以后会导致下雨和下雪无效果
      document.getElementsByClassName('cesium-viewer-animationContainer')[0].setAttribute('style', 'display: none;')
      document.getElementsByClassName('cesium-viewer-timelineContainer')[0].setAttribute('style', 'display: none;')
      Cesium.Timeline.prototype.makeLabel = that.CesiumDateTimeFormatter;
      window.viewer.animation.viewModel.dateFormatter = that.CesiumDateFormatter;
      window.viewer.animation.viewModel.timeFormatter = that.CesiumTimeFormatter;
      // console.log('Cesium.VERSION:'+Cesium.VERSION)
      // console.log('iclient3d for cesium:'+Cesium.SuperMapVersion)
      var scene = window.viewer.scene;
      that.BIMPromise = scene.open(global.bimUrl);
      var sanwei = scene.open(global.sanweiUrl);
      var ditu = scene.open(global.dituUrl);
      var style = new Cesium.Style3D();
      style.bottomAltitude = -1000;
      sanwei.style3D = style;
      window.viewer.scene.globe.depthTestAgainstTerrain = false

      window.viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      }))
      //干渠影像图，目前影响性能加载速度，暂时作废
      // let bianjieLayer = that.wmtsService(bianjieUrl, 'wangyingouter','ChinaPublicServices_wangyingouter')
      // window.viewer.imageryLayers.addImageryProvider(bianjieLayer)
      //  window.viewer.imageryLayers.addImageryProvider(that.wmtsService(zongquUrl, 'wangyingmain','ChinaPublicServices_wangyingmain'))
      // window.viewer.imageryLayers.addImageryProvider(that.wmtsService(trunkUrl, 'wangyingtrunk','ChinaPublicServices_wangyingtrunk'))
      // console.log(bianjieLayer)

      sanwei.then(function (layers) {
        that.openSky(scene)
      })

      //获取经纬度
      viewer.scene.globe.depthTestAgainstTerrain = true
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (event) {
        let pickInfo = viewer.scene.pickPosition(event.position);
        let cartographic = Cesium.Cartographic.fromCartesian(pickInfo);
        let longitude = Cesium.Math.toDegrees(cartographic.longitude);
        let latitude = Cesium.Math.toDegrees(cartographic.latitude);
        let height = cartographic.height;
        let coordinate = {
          longitude: longitude,
          latitude: latitude,
          height: height,
        };

        console.log('经纬度高程是：', { x: longitude, y: latitude, height: height});
        that.$bus.emit('showLng',coordinate)

        console.log("==========相机位置==============");
        console.log(window.viewer.scene.camera.heading);
        console.log(window.viewer.scene.camera.pitch);
        console.log(window.viewer.scene.camera.roll);
        console.log(window.viewer.scene.camera.position);
        console.log(window.viewer.scene.camera.positionCartographic.height)

        //判断点击的是marker
        let id
        let pick = window.viewer.scene.pick(event.position);
        // console.log('pick')
        // console.log(pick)
        if (Cesium.defined(pick) && (pick.id !== undefined) && (pick.id.id)) {
          // _this.leftDownFlag = true;
          id = pick.id.id;
          let type = pick.id.type;
          if (id !== undefined) {
            switch (type) {
              case 'area':
                that.bubble(id)
                break
              case 'zhjcSite':
                that.siteBubble(id)
                break
              // case 'szyPoint':
              //   that.szyBubble(id)
              //   break
            }
          }

        } else {
          that.closeAllPopu()
        }

      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // //监听地图是否渲染完毕
      let index = 2
      let i = 1
      var helper = new Cesium.EventHelper();
      helper.add(window.viewer.scene.globe.tileLoadProgressEvent, function (event) {
        if (event == 0 && that.initMap) {

          var initialPosition = new Cesium.Cartesian3(
              -2372453.915532581,
              5049069.490184868,
              3136529.177582662
              // -2342674.1110248836,
              // 5018483.5177201545,
              // 3166458.054686689
          ); // 相机的位置
          var orientation = {
            // heading:  5.175886391505526,
            // // 视角
            // pitch: -0.06960960749723322,
            // roll: 8.562306419435117e-11,
            heading: 5.528420467224636,
            // 视角
            pitch: -0.4384942109108736,
            roll: 0.000010467839922867483,
          };
          var homeCameraView = {
            destination: initialPosition, // 相机的位置
            orientation: orientation,
          };
          if (i == 1) {
            //设置默认角度
            window.viewer.scene.camera.setView(homeCameraView);
            //边界图层
            that.getRegionJson()
            that.getGUBJ()
            that.getCanalMain()
            that.getCanalTunk()
            //供水范围
            // that.getGSFW()
            //水系河流
            // that.getSXHL()

            //开启天空---影响地图渲染，有色差
            // setTimeout(()=>{
            //   // scene.lightSource.ambientLightColor = new  Cesium.Color(0.65, 0.65, 0.65, 1);
            // that.openSky(window.viewer.scene)
            // },1000)
          }
          if (i == index) {
            i = 1
            that.initMap = false
            localStorage.setItem('initMap', false)
            console.log('发送通知-地图初始化完成')
            //地图初始化完成，通知综合检测可以进行地图操作了
            that.$bus.emit('zhjc', true)
            that.updateWaterZ();
          }
          i++

        }
      });
      // 根据相机高度判断湖北省三维场景显示隐藏，比较消耗新能，不建议使用
      //  window.viewer.selectedEntityChanged.addEventListener(function (entity) {
      //   console.log("点击了："+entity.id);
      //   debugger
      //   let id = entity.id
      //    if(id !== undefined && id !== 'Loading...'){
      //         that.bubble(id)
      //     }
      // });

      //监听相机高度变化
      window.viewer.camera.moveEnd.addEventListener(() => {// TODO
        let cameraHeight = Math.round(viewer.camera.positionCartographic.height);
        console.log('相机高度' + cameraHeight + '米')
        if (window.gqbjLayer !== undefined) {
          if (cameraHeight < 800) {
            //隐藏边界线
            window.gqbjLayer.show = false
            window.ganquLayer.show = false
            window.zhiquLayer.show = false

          } else {
            //显示边界线
            if (that.layerCheckStr.indexOf('1') !== -1) {
              window.gqbjLayer.show = true
            }
            if (that.layerCheckStr.indexOf('4') !== -1) {
              window.ganquLayer.show = true
            }
            if (that.layerCheckStr.indexOf('5') !== -1) {
              window.zhiquLayer.show = true
            }
          }
        }

      })

    },
    //地图恢复原来视角
    resetMapLocation() {
      var initialPosition = new Cesium.Cartesian3(
          -2372453.915532581,
          5049069.490184868,
          3136529.177582662
          // -2342674.1110248836,
          // 5018483.5177201545,
          // 3166458.054686689
      ); // 相机的位置
      var orientation = {
        // heading:  5.175886391505526,
        // // 视角
        // pitch: -0.06960960749723322,
        // roll: 8.562306419435117e-11,
        heading: 5.528420467224636,
        // 视角
        pitch: -0.4384942109108736,
        roll: 0.000010467839922867483,
      };
      var homeCameraView = {
        destination: initialPosition, // 相机的位置
        orientation: orientation,
      };
      window.viewer.scene.camera.setView(homeCameraView);
    },
    //关闭所有弹框
    closeAllPopu() {
      let that = this
      if (that.bubbles) {
        that.bubbles.windowClose()
      }
      if (that.siteBubbles) {
        that.siteBubbles.windowClose()
      }
      if (that.szyBubbles.length) {
        this.szyBubbles.forEach(r => {
          r.windowClose()
        })
      }
    },
    //开启天空--影响三维图颜色
    openSky(scene) {
      let that = this
      that.skyObj = new Sky({
        // viewer:window.viewer, 
        // scene:window.viewer.scene,
        weatherType: that.weatherType
      })
      that.skyObj.onLoad()
      //  setTimeout(() =>{
      //   scene.postProcessStages.rain.enabled = true;
      //   scene.postProcessStages.rain.uniforms.density = 10;
      //   scene.postProcessStages.rain.uniforms.angle = 6;
      //   scene.postProcessStages.rain.uniforms.speed = 6;
      //  },10000)
    },
    //开始下雨
    skyChange(weatherType) {
      let that = this
      that.weatherType = weatherType
      that.skyObj = new Sky({
        weatherType: that.weatherType
      })
      that.skyObj.onLoad()
      that.skyObj.changeSkyBoxByType(weatherType)
    },
    //全区 full 王英 wy 蔡贤 cx 阳武 yw  切换视角
    positioningChange(val){
      const gloabMarkeList = [
        {
          lat:29.851694,
          lng:114.769751,
          x:-2319912.563510504,
          y: 5027177.846972677,
          z:3156085.9314931408,
          id:'1',
          type:'cx',
          name:'蔡贤水库',
          level:126,//高
          heading:-60,//角度旋转
          pitch:-10.452473533906065,//倾斜角度
          roll:0.0,
          desc:"水库总库容0.4113亿m³，Ⅲ等工程，由主坝、副坝（4座）、溢洪道，输水灌双延满等活筑物组成。设计洪水标准为50年一遇，校核洪水标准为1000年一遇，水库正常落水位70.00m，设计洪水位71.72m，校报洪水位72.59m。"
        }, // cx
        {
          lat:29.872826,
          lng:114.701504,
          x:-2312829.0042603873,
          y:5029063.230686422,
          z:3158233.623881662,
          id:'2',
          type:'yw',
          name:'阳武干渠',
          level:95,//高
          heading:90,//角度旋转
          pitch:-10,//倾斜角度
          desc:"阳武干渠总干渠长52.08公里，还有分干渠3条，支渠17条。"
        },  // yw
        {
          lat:29.7947526,
          lng:114.9067708,
          x:-2333098.46872432,
          y:5024260.546748528,
          z:3151137.7899475703,
          id:'3',
          type:'wy',
          name:'王英水库',
          level:164,//高
          heading:-160,//角度旋转
          pitch:-10,//倾斜角度
          desc:'王英水库枢纽工程于1970年动工兴建，1971年基本建成，同年汛期拦洪蓄水，1975年全部完工。水库设计灌溉面积49.6万亩，防洪保护范围706.3Km2，保护人口30万人，保护农田23万亩，灭螺面积15万亩。'
        },  // wy
      ];
      if(val == 'full'){
        this.resetMapLocation()
      }else if(val == 'cx'){
        this.flyTo(gloabMarkeList[0])
      } else if(val == 'yw'){
        this.flyTo(gloabMarkeList[1])
      }else if(val == 'wy'){
        this.flyTo(gloabMarkeList[2])
      }
    },
    //添加灌区边界图层
    getGUBJ() {
      let that = this
      // jsonData一定要json文件
      const geoJSON = Cesium.GeoJsonDataSource.load(bianjieJson, {
        stroke: Cesium.Color.fromCssColorString("#348CCA"),
        fill: Cesium.Color.fromCssColorString("#ffffff").withAlpha(0.0),
        strokeWidth: 4,
        markerSymbol: "?",
        clampToGround: true
      });
      let prom = window.viewer.dataSources.add(geoJSON)
      prom.then(data => {
        window.gqbjLayer = data;
      });

    },
    //添加主干渠
    getCanalMain() {
      let that = this
      console.log('加载主干渠')
      // jsonData一定要json文件
      const geoJSON = Cesium.GeoJsonDataSource.load(canalmainJson, {
        stroke: Cesium.Color.fromCssColorString("#DAF657"),
        fill: Cesium.Color.fromCssColorString("#DAF657").withAlpha(0.0),
        strokeWidth: 3,
        markerSymbol: "?",
        clampToGround: true
      });
      let polyliner = window.viewer.dataSources.add(geoJSON);
      polyliner.then(data => {
        window.ganquLayer = data;
      });

    },
    //添加支渠
    getCanalTunk() {
      let that = this
      console.log('加载支渠')
      // jsonData一定要json文件
      const geoJSON = Cesium.GeoJsonDataSource.load(canaltrunkJson, {
        stroke: Cesium.Color.fromCssColorString("#63D55F"),
        fill: Cesium.Color.fromCssColorString("#ffffff").withAlpha(0.0),
        strokeWidth: 3,
        markerSymbol: "?",
        clampToGround: true
      });
      let polyliner = window.viewer.dataSources.add(geoJSON);
      polyliner.then(data => {
        window.zhiquLayer = data;
      });
    },
    //行政区划
    getRegionJson() {
      let that = this
      console.log('加载行政区划')
      // jsonData一定要json文件
      const regionGeoJSON = Cesium.GeoJsonDataSource.load(regionJson, {
        // stroke: Cesium.Color.fromCssColorString("#F10712"),
        // fill: Cesium.Color.fromCssColorString("#ffffff").withAlpha(1),
        strokeWidth: 3,
        markerSymbol: "?",
        clampToGround: true
      });
      regionGeoJSON.then((dataSource) => {
        const entities = dataSource.entities.values //获取dataSource中的entitis集合 
        for (const key in entities) {
          const entity = entities[key]  //遍历集合中每一个实体entity，按照不同的类型去自定义修改
          // console.log(entity)
          //注意这里..开始
          var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
          var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
          polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
          entity.position = polyCenter;
          // 注意这里..结束
          let name = entity.name
          entity.label = {
            // position:
            text: name,
            color: Cesium.Color.fromCssColorString('#00000'),
            fillColor: Cesium.Color.WHILE,
            font: 'normal 20px MicroSoft YaHei',
            showBackground: true,
            backgroundColor: new Cesium.Color.fromCssColorString('RGBA(61, 255, 157, 0.6)'),
            scale: this.scaleX,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: Number.POSITIVE_INFINITY, //去掉地形遮挡
            scaleByDistance: new Cesium.NearFarScalar(
                300, 0.8, 5000, 1
            ),
            // distanceDisplayCondition : new Cesium.DistanceDisplayCondition(300.0, 200000.0),
            // disableDepthTestDistance : 700.0
          }
        }
      })
      let polyliner = window.viewer.dataSources.add(regionGeoJSON);
      polyliner.then(data => {
        window.regionLayer = data;
        window.regionLayer.show = false
      });

    },
    //添加供水范围图层
    getGSFW() {
      let that = this
      console.log('加载供水范围')
      // jsonData一定要json文件
      const geoJSON = Cesium.GeoJsonDataSource.load(waterRangeJson, {
        stroke: Cesium.Color.fromCssColorString("#0099CC"),
        fill: Cesium.Color.fromCssColorString("#0099CC").withAlpha(0.6),
        strokeWidth: 4,
        markerSymbol: "?",
        clampToGround: true
      });
      geoJSON.then((dataSource) => {
        const entities = dataSource.entities.values //获取dataSource中的entitis集合 
        for (const key in entities) {
          const entity = entities[key]  //遍历集合中每一个实体entity，按照不同的类型去自定义修改
          // console.log(entity)
          //注意这里..开始
          var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
          var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
          polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
          entity.position = polyCenter;
          // 注意这里..结束
          let name = entity.name
          entity.label = {
            // position:
            text: name,
            color: Cesium.Color.fromCssColorString('#00000'),
            fillColor: Cesium.Color.WHILE,
            font: 'normal 20px MicroSoft YaHei',
            showBackground: true,
            backgroundColor: new Cesium.Color.fromCssColorString('RGBA(61, 255, 157, 0.6)'),
            scale: this.scaleX,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT_CLICK,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: Number.POSITIVE_INFINITY, //去掉地形遮挡
            scaleByDistance: new Cesium.NearFarScalar(
                300, 0.8, 5000, 1
            ),
            // distanceDisplayCondition : new Cesium.DistanceDisplayCondition(300.0, 200000.0),
            // disableDepthTestDistance : 700.0
          }
        }
      })
      let prom = window.viewer.dataSources.add(geoJSON)

      prom.then(data => {
        window.gsfwLayer = data;
        console.log(data)
      });

    },
    //添加水系河流图层
    getSXHL() {
      let that = this
      console.log('加载水系河流')
      // jsonData一定要json文件  0070C0
      const riverJSON = Cesium.GeoJsonDataSource.load(riverJson, {
        stroke: Cesium.Color.fromCssColorString("#3333FF"),
        fill: Cesium.Color.fromCssColorString("#3333FF").withAlpha(0.0),
        strokeWidth: 3,
        markerSymbol: "?",
        clampToGround: true
      });
      let polyliner = window.viewer.dataSources.add(riverJSON);
      polyliner.then(data => {
        window.sxhlLayer = data;
      });
      // const josnN = JSON.parse(riverJson);
      // const features = riverJson.features;
      // let color = Cesium.Color.fromCssColorString("#0070C0")
      // let dataP = that.addDataToGlobe(features,color)
      // let prom  = window.viewer.scene.primitives.add(dataP);

    },
    //添加灌溉范围图层
    getGGArea() {
      let that = this
      console.log('加载灌溉范围')
      // jsonData一定要json文件
      const geoJSON = Cesium.GeoJsonDataSource.load(ggAreaJson, {
        stroke: Cesium.Color.fromCssColorString("#FFBF00"),
        fill: Cesium.Color.fromCssColorString("#FFBF00").withAlpha(0.0),
        strokeWidth: 4,
        markerSymbol: "?",
        clampToGround: true
      });
      let prom = window.viewer.dataSources.add(geoJSON)
      prom.then(data => {
        window.ggAreaLayer = data;
      });

    },
    //绘制线的方法
    addDataToGlobe(features, color) {
      const instances = [];
      for (let i = 0; i < features.length; i++) {
        for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
          const polygonArr = features[i].geometry.coordinates[j].toString().split(',');
          const polygon = new Cesium.PolygonGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray(polygonArr)
            ),
            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
          });
          const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
          instances.push(new Cesium.GeometryInstance({
            geometry: geometry,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
            },
          }));
        }
      }
      const primitive = new Cesium.Primitive({
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance({ // 为每个instance着色
          translucent: true,
          closed: false
        }),
        asynchronous: false,  // 确定基元是异步创建还是阻塞直到准备就绪
      });
      return primitive

    },
    //控制图层显示
    handleLayerChange(val) {
      let that = this
      let item = val.item
      that.layerCheckStr = val.list
      let ifCheck = item.ifCheck
      let id = item.id
      switch (id) {
        case 0://行政区划
          //选中
          if (ifCheck) {
            //已经存在
            if (window.regionLayer !== undefined) {
              window.regionLayer.show = true
            } else {
              that.getRegionJson()
            }
          } else {//取消
            //已经存在
            if (window.regionLayer !== undefined) {
              window.regionLayer.show = false
            }
          }
          break
        case 1://灌区边界
          //选中
          if (ifCheck) {
            //已经存在
            if (window.gqbjLayer !== undefined) {
              window.gqbjLayer.show = true
            } else {
              that.getGUBJ()
            }
          } else {//取消
            //已经存在
            if (window.gqbjLayer !== undefined) {
              window.gqbjLayer.show = false
            }
          }
          break
        case 2://供水范围
          //选中
          if (ifCheck) {
            //已经存在
            if (window.gsfwLayer !== undefined) {
              window.gsfwLayer.show = true
            } else {
              that.getGSFW()
            }
          } else {//取消
            //已经存在
            if (window.gsfwLayer !== undefined) {
              window.gsfwLayer.show = false
              delete window.gsfwLayer;
              console.log(delete window.gsfwLayer);
            }
          }
          break;
        case 3://灌溉范围
          //选中
          if (ifCheck) {
            //已经存在
            if (window.ggAreaLayer !== undefined) {
              window.ggAreaLayer.show = true
            } else {
              that.getGGArea()
            }
          } else {//取消
            //已经存在
            if (window.ggAreaLayer !== undefined) {
              window.ggAreaLayer.show = false
              delete window.ggAreaLayer;
            }
          }
          break;
        case 4://总干渠
          //选中
          if (ifCheck) {
            //已经存在
            if (window.ganquLayer !== undefined) {
              window.ganquLayer.show = true
            } else {
              that.getCanalMain()
            }
          } else {//取消
            //已经存在
            if (window.ganquLayer !== undefined) {
              window.ganquLayer.show = false
            }
          }
          break
        case 5://干渠
          //选中
          if (ifCheck) {
            //已经存在
            if (window.zhiquLayer !== undefined) {
              window.zhiquLayer.show = true
            } else {
              that.getCanalTunk()
            }
          } else {//取消
            //已经存在
            if (window.zhiquLayer !== undefined) {
              window.zhiquLayer.show = false
            }
          }
          break;
        case 6://水流河系
          //选中
          if (ifCheck) {
            //已经存在
            if (window.sxhlLayer !== undefined) {
              window.sxhlLayer.show = true
            } else {
              that.getSXHL()
            }
          } else {//取消
            //已经存在
            if (window.sxhlLayer !== undefined) {
              window.sxhlLayer.show = false
              delete window.sxhlLayer;
            }
          }
          break;
        case 7://BIM
          let bim;
          this.$bus.on('showBim',(btn,BIMtype)=>{
            if(this.bimObj.length == 0){
              BimData.forEach(r=>{
                r.children.forEach(t=>{
                  bim = new BimEvent({
                    BIMtype:r.id,
                    bimCode:t.id,
                    qxsyLayers:t.qxsyLayers,
                    BIMPromise:that.BIMPromise
                  });
                  bim.bimShowOrHide(true);
                  this.bimObj.push(bim);
                })
              })
            }
            const currentBim = this.bimObj.find(r=>r.bimCode == btn.id);
            if(currentBim){
              currentBim.getBIMFileds(btn.id,btn.children[0].id)
            }
            // 隐藏bim回调
            this.$bus.on('hideBim',(flag)=>{
              this.bimObj.forEach(r=>r.bimShowOrHide(false))
              this.bimObj = [];
            })
            //查询BIM属性数据
            window.viewer.pickEvent.addEventListener((feature)=>{
              let arr =[]
              for(var key in feature){
                if(key.indexOf("WY_") >= 0){
                  arr.push({
                    name:key.substring(3,key.length),
                    value:feature[key]
                  })
                }
              }
              this.$bus.emit('showBimDetail',arr);
            });
          })
          break;
      }
    },
    //加载wms服务
    wmsService(url, layer) {

      let wms = new Cesium.WebMapServiceImageryProvider({

        url: url,//如'http://106.12.xxx/geoserver/xxx/wms'
        layers: layer,//'数据源:图层名'
        parameters: {
          service: 'WMS',
          format: 'image/png',//返回格式为png格式
          transparent: true,
        }
      })
      return wms;
    },
    wmtsService(url, layer, id) {
      var style = new Cesium.Style3D();
      style.altitudeMode = 10000;
      let wmts = new Cesium.WebMapTileServiceImageryProvider({
        url: url,//如'http://106.12.253.xxx/geoserver/xxx/service/wmts'
        layer: layer,//'数据源:图层名'
        style: style,
        format: 'image/png',
        tileMatrixSetID: id,//坐标系
        tileMatrixLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],//查看geoserver，看切了几层
        maximumLevel: 19,//设置最高显示层级
        tilingScheme: new Cesium.GeographicTilingScheme(),//必要
      });
      return wmts;
    },
    // 水资源调度添加点
    addSzyMarker() {
      let draw = new SzyDrayEntity({
        // viewer:window.viewer,
      });
      let szyDataSource = new Cesium.CustomDataSource('szyPointList')
      this.szyPoints.forEach(r => {
        let entity = draw.addEntity(r, szyDataSource);
        this.szyEntity[r.id] = entity;
      });
      this.dataSourcesMap['szyPointList'] = szyDataSource;
      window.viewer.dataSources.add(szyDataSource);
    },
    //地图上添加区域
    addMarker(pointList) {
      let drag = new DragEntity({
        viewer: window.viewer,
      })
      let gloabDataSource = new Cesium.CustomDataSource('gloabEntry')
      let _this = this
      pointList.forEach(item => {
        let entity = drag.addEntity(item, gloabDataSource);
        _this.poinEntity[item.id] = entity;
      })
      this.dataSourcesMap['gloabEntry'] = gloabDataSource
      window.viewer.dataSources.add(gloabDataSource)
    },
    //高程点
    gcMarker(){
      let drag = new GCEntity({
        viewer: window.viewer,
      })
      let gcDataSource = new Cesium.CustomDataSource('gcEntry')
      let _this = this
      _this.gcData.forEach(item => {
        let entity = drag.addEntity(item, gcDataSource);
        _this.gcPoint[item.id] = entity;
      })
      this.dataSourcesMap['gcEntry'] = gcDataSource
      window.viewer.dataSources.add(gcDataSource)
    },
    //删除高程点
    removGcMarker(){
      let dataS = this.dataSourcesMap['gcEntry']
      let obj = window.viewer.dataSources.remove(dataS, true);
    },
    //地图上添加测试点位
    addSiteMarker(pointList, key) {
      let that = this
      that.closeAllPopu()
      let drag = new SiteDragEntity({
        viewer: window.viewer,
      })
      let siteDataSource = new Cesium.CustomDataSource(key)
      pointList.forEach(item => {
        let entity = drag.addEntity(item, siteDataSource);
        that.siteEntity[item.code] = entity;
      })
      this.dataSourcesMap[key] = siteDataSource
      window.viewer.dataSources.add(siteDataSource)
    },
    //通过key消除扎点
    removeDataSourceBykey(key) {
      // let len =window.viewer.dataSources.length
      // if(len > 0){
      //   for(let i = 0;i<len;i++){
      //     let dataSource = window.viewer.dataSources.get(i)
      //     if(dataSource._name && dataSource._name == key){
      //       window.viewer.dataSources.remove(dataSource)
      //     }
      //   }
      // }
      let dataS = this.dataSourcesMap[key]
      let obj = window.viewer.dataSources.remove(dataS, true)
      this.closeAllPopu()
    },
    //水资源站点弹窗
    szyBubble(id,obj) {
      this.szyBubbles.push(new SzyBubble(Object.assign(this.szyEntity[id], {
        cesiumWidget:window.viewer.cesiumWidget.container,
        ...obj
      })))
    },
    //三点水库弹窗
    bubble(id) {
      if (this.bubbles) {
        this.bubbles.windowClose()
      }
      this.bubbles = new Bubble(Object.assign(this.poinEntity[id], {
        viewer: window.viewer
      }))
    },
    //站点弹窗
    siteBubble(id) {
      if (this.siteBubbles) {
        this.siteBubbles.windowClose()
      }
      this.siteBubbles = new siteBubble(Object.assign(this.siteEntity[id], {
        viewer: window.viewer
      }))
    },
    //点击列表弹窗--暂时未启用
    openSitePopu(item) {
      if (this.siteBubbles) {
        this.siteBubbles.windowClose()
      }
      this.siteBubbles = new siteBubble(Object.assign({
        viewer: window.viewer,
        monitoItems: {
          data: item
        },
        position: {
          _value: new Cesium.Cartesian3.fromDegrees(item.x, item.y, item.z)
        }
      }))
    }, 
    //重置地图
    resetMap() {
      let that = this
      // 删除全部
      for (let key in this.dataSourcesMap) {
        //不清除水库三点
        if (key !== 'gloabEntry' && key !== 'gcEntry' ) {
          let dataS = this.dataSourcesMap[key]
          let obj = window.viewer.dataSources.remove(dataS, true)
        }

      }
      that.closeAllPopu()
      //还原图层
      that.layerCheckStr = '1,4,5'
      window.gqbjLayer.show = true
      window.ganquLayer.show = true
      window.zhiquLayer.show = true
      //欢迎视角
      that.resetMapLocation()
      //结束淹没分析
      that.clearSubmerge()
      //结束流动
      that.clearFlooding()
    },
    //飞行到某个点位
    flyTo(point) {
      this.closeAllPopu()
      // console.log("Cesium.Math.toDegrees(radians):"+Cesium.Math.toDegrees(3.4906380254181446) + '    point.pitch:'+Cesium.Math.toDegrees(-0.17432195994359767))
      //角度转弧度
      var heading = Cesium.Math.toRadians(point.heading);
      var pitch = Cesium.Math.toRadians(point.pitch);
      var roll = Cesium.Math.toRadians(point.roll);
      var range = point.level;
      // var center = Cesium.Cartesian3.fromDegrees(point.lng, point.lat,range);
      var center = new Cesium.Cartesian3(point.x, point.y, point.z)
      // window.viewer.camera.flyToBoundingSphere(
      //         new Cesium.BoundingSphere(center, 0),
      //         {
      //             offset: new Cesium.HeadingPitchRange(heading, pitch, range),
      //             duration: 2,
      //         },
      // );
      viewer.camera.flyTo({
        destination: center,
        orientation: {
          heading: heading,
          pitch: pitch,
          roll: 0
        },
        duration: 4,
      });
    },
    //只设置经纬度飞行
    onlyFlyTo(point) {
      this.closeAllPopu()
      console.log(point)
      var center = new Cesium.Cartesian3.fromDegrees(point.x, point.y, point.z)
      viewer.camera.flyTo({
        destination: center,
        duration: 2,
      });
    },
    //开始-淹没分析
    startSubmerge(val) {
      let that = this

      //拉伸水平面高度淹没分析
      let waterColor = "rgba(23, 145, 255, 0.5)";
      let data = require("../../static/cx_line_3D.json");
      //蔡贤
      if (val.type == 0) {
        data = require("../../static/cx_line_3D.json");
        var initialPosition = new Cesium.Cartesian3(
            -2320449.808156675,
            5031749.253893775,
            3156726.3895382914
        ); // 相机的位置
        var orientation = {
          // 视角
          heading: 0.05693158875449633,
          pitch: -1.0403639720526279,
          roll: 3.0599727196545246e-9,
        };
        var homeCameraView = {
          destination: initialPosition, // 相机的位置
          orientation: orientation,
        };
        //设置默认角度
        window.viewer.scene.camera.setView(homeCameraView);
      } else {
        var initialPosition = new Cesium.Cartesian3(
            -2336384.7964010085,
            5045690.12757007,
            3150792.8257632754
        ); // 相机的位置
        var orientation = {
          // 视角
          heading: 0.03478754473939816,
          pitch: -0.9893012049921905,
          roll: 2.8097337789745325e-9,
        };
        var homeCameraView = {
          destination: initialPosition, // 相机的位置
          orientation: orientation,
        };
        //设置默认角度
        window.viewer.scene.camera.setView(homeCameraView);
        data = require("../../static/wy_line_3D.json");
      }
      let floodA = new FloodAnalysis(window.viewer, {
        polygon: data.features[0].geometry.coordinates,
        times_height: [val.minIndex, val.maxIndex],
        waterColor: waterColor,
        show: true,
        if169: this.if169,
        pageData: val
      });
      window.submergeA = floodA
      // window.submergeA.startSubmerge()
    },
    //结束-淹没分析
    clearSubmerge(val) {
      let that = this
      if (window.submergeA) {
        window.submergeA.destroy()
        // window.submergeA.clearSubmerge('Combine_10')
        window.submergeA = undefined

      }

    },
    //开始-河水流动--武阳干渠
    startFlooding(val) {
      //相机偏航角，正北为0，绕负z轴旋转，顺正逆反，水平转头
      var heading = Cesium.Math.toRadians(0.0);
      //相机俯仰角，绕负y轴旋转，顺正逆反，默认-90（垂直俯视），前后空翻（抬头，低头）
      var pitch = Cesium.Math.toRadians(-45.0);
      //相机翻滚角，绕正x轴旋转，顺正逆反，默认0，侧空翻（左右歪头）
      var roll = Cesium.Math.toRadians(0);
      //相机距离目标的距离（米），对点有效
      var range = 25000;
      //设置包围盒 112.652004, 30.598336   114.422836, 29.962500
      var boundingSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3.fromDegrees(114.578388, 29.903853, 18), 0.0);
      //相机飞行控制
      window.viewer.camera.flyToBoundingSphere(boundingSphere, {
        offset: new Cesium.HeadingPitchRange(heading, pitch, range),
      });
      //
      //  let that  = this
      //  var initialPosition = new Cesium.Cartesian3(
      //     -2313731.203513977,
      //     5028996.970614438,
      //     3158528.2747671083
      //   ); // 相机的位置
      //   var orientation = {
      //     // 视角
      //     heading: 4.7232219746347255,
      //     pitch: -0.576255227484725,
      //     roll: 1.0217335422169072e-8,
      //   };
      //   var homeCameraView = {
      //     destination: initialPosition, // 相机的位置
      //     orientation: orientation,
      //   };
      // //设置默认角度
      // window.viewer.scene.camera.setView(homeCameraView);

      //开水闸放水效果
      let openWaterZha = new OpenWaterZha()
      openWaterZha.open({lng: 114.700052, lat: 29.872859})
      window.waterZha = openWaterZha
      //连通性分析
      // that.fooldingA = new FooldingAnalysisy({})
      // that.fooldingA.startSubmerge(68,1,'Combine_8')
      //查看图层位置
      //Combine_8  干渠后半段   10 前半段
      // window.FloodAnalysis = new SubmergeAnalysisy({
      //   currentHeight:2,
      //   maxHight:60,
      //   minHight:2,
      //   layerName:'Combine_10',
      //   speed:10,
      // })
      // window.FloodAnalysis.startSubmerge()
      console.log(val)
      let waterColor = "rgba(23, 145, 255, 0.5)";
      // 在这里设置水资源预演的时间轴
      var start = new Date()
      var stop = new Date().getTime() + 24 * 60 * 60 * 1000
      console.log(start)
      console.log(stop)
      let fooldingA = new RiverAnalysis({
        waterColor: waterColor,
        show: true,
        pageData: {
          startTime: start,
          endTime: new Date(stop)
        }
      })
      fooldingA.startRiverAnalysis()
      window.riverFoolding = fooldingA
    },
    //结束-连通分析
    clearFlooding() {
      if (window.riverFoolding) {
        console.log('关闭连通性分析')
        window.riverFoolding.destroy()
        window.riverFoolding = undefined
      }
      //关闭水闸放水效果
      if (window.waterZha) {
        window.waterZha.destory()
        window.waterZha = undefined
      }
    },
    //开始--片区出水口定位，流水
    addPQPoint(list) {
      let that = this
      var initialPosition = new Cesium.Cartesian3(
          -2314010.2039907468,
          5029566.70137457,
          3157919.242022145
      ); // 相机的位置
      var orientation = {
        // 视角
        heading: 5.524434416002151,
        pitch: -0.4290939524501174,
        roll: 6.283179424877382,
      };
      var homeCameraView = {
        destination: initialPosition, // 相机的位置
        orientation: orientation,
      };
      //设置默认角度
      // window.viewer.scene.camera.setView(homeCameraView);
      //片区扎点放水
      let pqEntity = new PQEntity()
      // let pqPointDataSource = new Cesium.CustomDataSource('pqPointEntry')
      //   let _this = this
      //   list.forEach(item => {
      //     let entity = pqEntity.addEntity(item,pqPointDataSource);
      //     _this.pqPoinEntity[item.code] = entity;
      //   })

      let pqPointDataSource = pqEntity.open(list)

      this.dataSourcesMap['pqPointEntry'] = pqPointDataSource
      window.viewer.dataSources.add(pqPointDataSource)

      window.pqPointList = pqEntity

    },
    //移除片区点位
    removePQPoint() {
      let dataS = this.dataSourcesMap['pqPointEntry']
      let obj = window.viewer.dataSources.remove(dataS, true)
      //关闭水闸放水效果
      if (window.pqPointList) {
        window.pqPointList.destory()
        window.pqPointList = undefined
      }
    },
    // cesium时钟时间格式化函数
    CesiumTimeFormatter(datetime, viewModel) {
      var julianDT = new Cesium.JulianDate();
      Cesium.JulianDate.addHours(datetime, 8, julianDT);
      var gregorianDT = Cesium.JulianDate.toGregorianDate(julianDT);

      let hour = gregorianDT.hour + "";
      let minute = gregorianDT.minute + "";
      let second = gregorianDT.second + "";
      return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;
    },
    // cesium时钟日期格式化函数
    CesiumDateFormatter(datetime, viewModel, ignoredate) {
      var julianDT = new Cesium.JulianDate();
      Cesium.JulianDate.addHours(datetime, 8, julianDT);
      var gregorianDT = Cesium.JulianDate.toGregorianDate(julianDT);

      return `${gregorianDT.year}年${gregorianDT.month}月${gregorianDT.day}日`;
    },
    // cesium时间轴格式化函数
    CesiumDateTimeFormatter(datetime, viewModel, ignoredate) {
      var julianDT = new Cesium.JulianDate();
      Cesium.JulianDate.addHours(datetime, 8, julianDT);
      var gregorianDT = Cesium.JulianDate.toGregorianDate(julianDT);

      let hour = gregorianDT.hour + "";
      let minute = gregorianDT.minute + "";
      return `${gregorianDT.day}日${hour.padStart(2, "0")}时`;
    },
    //飞行漫游初始化
    waterFlyInit(item) {
      let routes = new Cesium.RouteCollection(window.viewer.entities);
      this.flyStatus = 1;
      this.flyPath = item.filepath;
      var fpfUrl = item.filepath;
      routes.fromFile(fpfUrl);

      //初始化飞行管理
      window.flyManager = new Cesium.FlyManager({
        scene: viewer.scene,
        routes: routes
      });

      //注册站点到达事件
      window.flyManager.stopArrived.addEventListener(function (routeStop) {
        routeStop.waitTime = 1; // 在每个站点处停留1s
      });

      window.flyManager.readyPromise.then(function () { // 飞行路线就绪
        var currentRoute = window.flyManager.currentRoute;
        currentRoute.isLineVisible = false;
        currentRoute.isStopVisible = false;

        window.flyManager && window.flyManager.play();

      });
    },
    //水库漫游-播放
    waterFlyPlay() {
      window.flyManager && window.flyManager.play();
    },
    //水库漫游-暂停
    waterFlyPause() {
      window.flyManager && window.flyManager.pause();
    },
    //水库漫游-停止
    waterFlyStop() {
      window.flyManager && window.flyManager.stop();
      this.flyStatus = 0;
    },
    //动态更新水库水位
    updateWaterZ(){
      this.$api.fxxs.getFXXS_SKInfo({}).then((res) => {
        let result = res.data
        let wysw =  result.wyRealData.rz;
        let cxsw = result.cxRealData.rz;

        //王英水库63.95
        var wylayer = window.viewer.scene.layers.find('面_3D_王英水库面@王英水库边界');
        wylayer.style3D.bottomAltitude = wysw - 64;

        //蔡贤水库63.99
        var cylayer = window.viewer.scene.layers.find('面_3D_蔡贤水库@蔡贤水库边界');
        cylayer.style3D.bottomAltitude = cxsw - 64;

      })
      

      
    }
  },
  beforeDestroy() {
    delete window.regionLayer;
  },
};
</script>

<style lang="less">
@import "index.less";
</style>
