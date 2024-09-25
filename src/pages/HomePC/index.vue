<template>
  <!--home页面-->
  <div id="home" class="homeP">
    <div
      class="homePC"
      :style="`width:${width};height:${height};left:${top};transform:scale(${scaleX})`"
    >
     <div class="homePC-header">
        <div class="home-name">数字孪生王英水库综合监管平台</div>
        <div class="home-time">
          <span class="time">{{nowtime.time}}</span>
          <div class="date-week">
            <span class="date">{{nowtime.day}}</span>
            <span class="week">{{nowtime.week}}</span>
          </div>
          <div class="time-line"></div>
          <div class=" time-screen">
            <span  class="big329" @click="handleScreen">
              <i class="active">16 : 9</i> <i>32 : 9</i>
            </span>
              <!-- 全屏 -->
            <span v-if="fullScreenFlag" href="javascript:;" class="full"  @click="fullScreen()">[ 全屏 ]</span>
            <!-- 退出全屏 -->
            <span v-else href="javascript:;" class="exit"  @click="exitFullScreen()">[ 退出全屏 ]</span>
          </div>
           
        </div>
        <img class="lineAnimal" src="../../assets/images/home/head-guang.png"/>
        <div class="homePC-weather">
          <div class="weather-boxPC">
             <span class="weather" :class="'qi-'+currentWeather.icon"></span>
             <div class="weather-day">
              <span class="date">{{getNowDay(nowtime.day)}}</span>
              <!-- <span class="date">今天</span> -->
              <span class="temp">{{currentWeather.temp}}℃</span>
             </div>
           </div>
          <div class="weather-boxPC" v-for="(item,index) in weatherList" :key='index'>
            <span class="weather" :class="'qi-'+item.iconDay" ></span>
            <div class="weather-day">
              <span class="date">{{getYBDay(item.fxDate)}}</span>
              <span class="temp">{{item.tempMin}}℃~{{item.tempMax}}℃</span>
             </div>
          </div>
        </div>
      </div>
      <div class="home-menu">
        <header-menu
          :menuList="actions"
          :meauIndex="actionIndex"
          @menuChange="menuChange"
          :width="190"
          :height="49"
          :fontSize="20"
          :boxwidth="625"
        ></header-menu>
      </div>
      <div class="subPage" :style="`height:${subHeight};`">
        <div class="mapContainer">
          <Map ref="myMap"></Map>
          <el-radio-group v-model="weatherType" @input="skyChange" class="weatherRadio" size="small">
            <el-radio-button label="blueSky">晴天</el-radio-button>
            <el-radio-button label="cloudSky">下雨</el-radio-button>
            <el-radio-button label="snowSky">下雪</el-radio-button>
          </el-radio-group>
          <el-checkbox v-model="gcShow" label="高程查询" class="gcChecked" border size="small"></el-checkbox>
          <el-radio-group v-model="positioning"   class="positioningRadio" size="small">
            <el-radio-button label="full" @click.native="positioningChange('full')">全区</el-radio-button>
            <el-radio-button label="wy" @click.native="positioningChange('wy')">王英</el-radio-button>
            <el-radio-button label="cx" @click.native="positioningChange('cx')">蔡贤</el-radio-button>
            <el-radio-button label="yw" @click.native="positioningChange('yw')">阳武</el-radio-button>
          </el-radio-group>
         <div v-if="gcShow" class="lng">
           <span>经度：{{ lng.longitude.toFixed(6) }}</span>
           <span>纬度：{{ lng.latitude.toFixed(6) }}</span>
           <span>高程：{{ lng.height.toFixed(2) }}</span>
         </div>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenuRadio.vue';
import Map from '@/components/map/index.vue'
import {util} from '../../utils/util.js'
import {
  getEndTime,
  getOneWeekTime,
  getHourTime,
  getMinutesTime,
} from "../../utils/tools";
export default {
  data() {
    return {
      loading: true,
      token: "",
      width: "1920px", //设计稿宽
      height: "1080px", //设计稿高
      subHeight:"1080px",
      top: "0px",
      scaleX: 1, //默认缩放比例
      map: null, //地图
      mapCenter: [23.06457, 113.08299], //地图中心点 默认南明区
      mapZoom: 11.5,
      actionIndex: "/169/gqjc", //默认选中的菜单-灌区监测
      actions: [
        {
          text: "综合监测",
          menuId: 0,
          path: "/169/gqjc",
        },
        {
          text: "防汛形势",
          menuId: 2,
          path: "/169/fxxs",
        },
        {
          text: "水资源调度",
          menuId: 1,
          path: "/169/szydd",
        },
        
      ],
      nowtime: "", //当前时间
      timer: null,
      weatherType:'blueSky',//天气类型
      positioning:'full',// 全区
      fullScreenFlag: true,//全屏
      currentWeather:{},//实时天气
      weatherList:[],//天气预报
      weatherTimer:null,
      lng:{
        longitude: 0,
        latitude: 0,
        height: 0,
      },
      gcShow:false
    };
  },
  components: {
    HeaderMenu,
    Map
  },
  computed: {},
  watch:{
    fullScreenFlag:function (val) {
      this.$bus.emit('getHasFullScreenFlag',val)
    },
    gcShow:function(val){ //控制高程查询
      this.$bus.emit('selectGcEvent',val);
    }
  },
  beforeDestroy() {
    let that = this;
    clearInterval(that.timer);
    clearInterval(that.weatherTimer);
  },
  mounted() {
    let that = this;
    this.dateInit();
    that.setScale();
    //动态监听窗口缩放
    window.addEventListener("resize", () => {
      that.setScale();
    });
    that.$bus.on('showLng',(coord)=>{
      this.lng = coord
    })
    let path = that.$route.path;
    that.actionIndex = path;
    that.getWeatherM()
    that.getWeather()
    that.weatherTimer = setInterval(that.getWeatherM,1000 * 360);
  },
  methods: {
    handleScreen(){
      window.location.href = window.location.href.replace(/\/169/,'')
    },
    setScale() {
      //获取浏览器与设计稿的宽高比例
      let that = this;
      const dom = document.querySelector("#app");
      that.$nextTick(() => {
        let width = dom.clientWidth;
        let hight = dom.clientHeight;
        // let scaleX = hight / 1350;
        // that.scaleX = scaleX;
        // let top = (width - 3840 * that.scaleX) / 2
        // that.top = top + 'px'
        // localStorage.setItem("scaleX", scaleX);
        let myscaleX = width / 1920;
        that.scaleX = myscaleX;
        localStorage.setItem("scaleX", myscaleX);
        //判断窗口跟着缩放，适当设置高度达到滚动效果
        let windowH = window.innerHeight
        if(1080 * myscaleX > windowH+2 ){
          that.subHeight = windowH +'px'
        }
        else{
          that.subHeight = '100%'
        }
       
        // 获取所有类名为  trans-common 的元素，设置 transform 属性
        let selectorAll = document.querySelectorAll(".transCommon");
        for (let i = 0; i < selectorAll.length; i++) {
          selectorAll[i].style =
            "transform: scale(" + that.scaleX + ") !important; ";
        }
      });
    },
    menuChange(item) {
      let that = this;
      //防止点击同一个按钮
      if (that.actionIndex !== item.path) {
        that.actionIndex = item.path;
        that.$bus.emit('resetMap')
        switch (item.menuId) {
          case 0:
            that.$router.replace("/169/gqjc");
            that.$bus.emit('pcZHJCCreatSiteMarker',true)
            break;
          case 1:
            that.$router.replace("/169/szydd");
            break;
          case 2:
            that.$router.replace("/169/fxxs");
            break;
        }
      }
    },
    getNowDay(time){
      if(time !== undefined){
        let day = time.substring(4,time.length)
        return day
      }
    },
    getYBDay(time){
       if(time !== undefined){
        let day = time.substring(5,time.length)
        day = day.replace('-','/')
        return day
       }
    },
    //天气改变
    skyChange(value){
      this.$refs.myMap.skyChange(value)
    },
    setSkyChange(val){
      if(val.text.includes('雨')){
        this.weatherType = 'cloudSky'
        this.skyChange('cloudSky')
      }else if(val.text.includes('雪')){
        this.weatherType = 'snowSky'
        this.skyChange('snowSky')
      }else{
        this.weatherType = 'blueSky'
        this.skyChange('blueSky')
      }
    },
    positioningChange(value){
      this.$refs.myMap.positioningChange(value)
    },
    dateInit() {
      this.timer = setInterval(() => {
        this.nowtime = this.dateformatter(new Date());
      }, 1000);
    },
    dateformatter(timeDate) {
      //时间格式化
      let year = timeDate.getFullYear();
      let month = timeDate.getMonth() + 1;
      let day = timeDate.getDate();
      day = day >= 10 ? day : "0" + day;
      let hours = timeDate.getHours();
      hours = hours >= 10 ? hours : "0" + hours;
      let minutes = timeDate.getMinutes();
      minutes = minutes >= 10 ? minutes : "0" + minutes;
      let seconds = timeDate.getSeconds();
      seconds = seconds >= 10 ? seconds : "0" + seconds;

      let week = timeDate.getDay() - 1;
      let weekInfo = [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ];
      let weektxt = weekInfo[week];
      let obj = {
        day: `${year}  ${month}/${day}`,
        week: weektxt,
        time: `${hours}:${minutes}:${seconds}`,
      };
      return obj;
    },
    // 全屏
    fullScreen(){
      this.fullScreenFlag = false;
      this.util.fullScreen();
    },
      // 退出全屏
    exitFullScreen() {
      this.fullScreenFlag = true;
      this.util.exitFullscreen();
    },
    //获取实时天气天气
    getWeatherM(){
      let that = this
      that.$api.login.getWeatherMonitor().then((res) => {
        if(res.code == '200'){
          let result = res.now
          that.currentWeather = result
          that.setSkyChange(that.currentWeather)
        }
      }).catch(() => {
            
      });
    },
    //获取天气
    getWeather(){
      let that = this
      that.$api.login.getWeather().then((res) => {
        if(res.code == '200'){
          let result = res.daily
          that.weatherList = [result[1],result[2]]
        }

      }).catch(() => {
            
      });
    },
  },
};
</script>

<style lang="less">
@import "index.less";
</style>
