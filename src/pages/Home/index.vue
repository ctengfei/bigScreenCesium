<template>
  <!--home页面-->
  <div id="home" class="homeP" v-loading="loading">
    <div
      class="home"
      :style="`width:${width};height:${height};left:${top};transform:scale(${scaleX})`"
    >
     <div class="home-header">
        <div class="home-name">数字孪生王英水库综合监管平台</div>
       <div class="home-weather">
         <div class="weather-box">
           <span class="weather" :class="'qi-'+currentWeather.icon"></span>
           <div class="weather-day">
             <span class="date">{{getNowDay(nowtime.day)}}</span>
             <!-- <span class="date">今天</span> -->
             <span class="temp">{{currentWeather.temp}}℃</span>
           </div>
         </div>
         <div class="weather-box" v-for="(item,index) in weatherList" :key='index'>
           <span class="weather" :class="'qi-'+item.iconDay" ></span>
           <div class="weather-day">
             <span class="date">{{getYBDay(item.fxDate)}}</span>
             <span class="temp">{{item.tempMin}}℃~{{item.tempMax}}℃</span>
           </div>
         </div>
       </div>
        <div class="home-time">
          <span class="time">{{nowtime.time}}</span>
          <div class="date-week">
            <span class="date">{{nowtime.day}}</span>
            <span class="week">{{nowtime.week}}</span>
          </div>
          <div class="time-line"></div>
        </div>
        <img class="lineAnimal" src="../../assets/images/home/head-guang.png"/>
         <div class="home-Screen">
           <span  class="big329" @click="handleScreen">
              <i >16 : 9</i> <i class="active">32 : 9</i>
           </span>
          <!-- 全屏 -->
           <span v-if="fullScreenFlag" href="javascript:;" class="full" style="margin-right: 10px"  @click="fullScreen()">[ 全屏 ]</span>
          <!-- 退出全屏 -->
           <span v-else href="javascript:;" class="exit"  style="margin-right: 10px"  @click="exitFullScreen()">[ 退出全屏 ]</span>
         </div>
      </div>
      <div class="home-menu">
        <header-menu-radio-vue
          :menuList="actions"
          :meauIndex="actionIndex"
          @menuChange="menuChange"
        ></header-menu-radio-vue>
      </div>
      <div class="subPage">
        <div class="mapContainer">
          <Map ref="myMap"></Map>
          <el-radio-group v-model="weatherType" @input="skyChange" class="weatherRadio" >
            <el-radio-button label="blueSky">晴天</el-radio-button>
            <el-radio-button label="cloudSky">下雨</el-radio-button>
            <el-radio-button label="snowSky">下雪</el-radio-button>
          </el-radio-group>
          <el-radio-group v-model="positioning"   class="positioningRadio" >
            <el-radio-button label="full" @click.native="positioningChange('full')">全区</el-radio-button>
            <el-radio-button label="wy" @click.native="positioningChange('wy')">王英</el-radio-button>
            <el-radio-button label="cx" @click.native="positioningChange('cx')">蔡贤</el-radio-button>
            <el-radio-button label="yw" @click.native="positioningChange('yw')">阳武</el-radio-button>
          </el-radio-group>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenuRadioVue from "@/components/HeaderMenuRadio.vue";
import Map from '@/components/map/index.vue'
import {
  getEndTime,
  getOneWeekTime,
  getHourTime,
  getMinutesTime,
} from "../../utils/tools";
export default {
  data() {
    return {
      loading: false,
      token: "",
      width: "3840px", //设计稿宽
      height: "1080px", //设计稿高
      top: "0px",
      scaleX: 1, //默认缩放比例
      map: null, //地图
      mapCenter: [23.06457, 113.08299], //地图中心点 默认南明区
      mapZoom: 11.5,
      actionIndex: "/gqjc", //默认选中的菜单-灌区监测
      actions: [
        {
          text: "综合监测",
          menuId: 0,
          path: "/gqjc",
        },
        {
          text: "防汛形势",
          menuId: 2,
          path: "/fxxs",
        },
        {
          text: "水资源调度",
          menuId: 1,
          path: "/szydd",
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
    };
  },
  components: {
    HeaderMenuRadioVue,
    Map
  },
  computed: {},
   beforeDestroy() {
    let that = this;
    clearInterval(that.timer);
    clearInterval(that.weatherTimer);
  },
  watch: {},
  mounted() {
    let that = this;
    this.dateInit();
    that.setScale();
    //动态监听窗口缩放
    window.addEventListener("resize", () => {
      that.setScale();
    });
    let path = that.$route.path;
    that.actionIndex = path;
    that.getWeatherM()
    that.getWeather()
    that.weatherTimer = setInterval(that.getWeatherM,1000 * 360);
  },
  methods: {
    handleScreen(){
      const { hash,origin,pathname } = window.location
      window.location.href = `${origin}${pathname}#/169/${hash.split('#/')[1]}`
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
        let myscaleX = width / 3840;
        that.scaleX = myscaleX;
        localStorage.setItem("scaleX", myscaleX);

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
            that.$router.replace("/gqjc");
            that.$bus.emit('pcZHJCCreatSiteMarker',true)
            break;
          case 1:
            that.$router.replace("/szydd");
            break;
          case 2:
            that.$router.replace("/fxxs");
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
    dateInit() {
      this.timer = setInterval(() => {
        this.nowtime = this.dateformatter(new Date());
      }, 1000);
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
