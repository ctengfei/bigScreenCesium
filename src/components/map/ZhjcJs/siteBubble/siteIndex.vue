<template>
  <div :id="id" class="zhjcSiteBox">
    <div class="zhjcPine"></div>
    <div class="zhjcSiteBox-wrap">
      <top-line
          class="zhjcSiteBox-topline"
          :color="['rgba(82, 243, 246, 0.2)', 'rgba(82, 243, 246, 0.6)']"
          backgroundColor="rgba(9,34,57,0.67)"
      ></top-line>
      <!-- <div class="zhjcSiteBox-close" @click="closeClick">X</div> -->
      <div class="zhjcSiteBox-close">
        <span @click="closeClick"><i class="el-icon-close"></i></span>
      </div>
      <div class="zhjcSiteBox-top">
        <div class="zhjcSiteBox-title fontColor">{{ formatType(newItemData.late) }}-{{ title }}</div>
      </div>
      <div class="zhjcSiteBox-Content">
        <div class="content-title"><span></span><span>基础信息</span></div>
        <div class="data-li" v-for="(item, index) in baseInfo" :key="index">
          <div class="data-label yellowColor" style="white-space: nowrap">{{ item.titleName }}：</div>
          <div class="data-value">
            <span class="textColor">{{ newItemData[item.key] || "--" }} </span>
            <i class="el-icon-video-camera-solid video-baseIcon" v-if="item.key == 'statusStr'"
               @click="openVideo(newItemData[item.key])"></i>
          </div>
        </div>
      </div>
      <div class="zhjcSiteBox-Content zhjcSiteBoxChart" v-if="type !== 'VD' && type !== 'QQ'">
        <div class="content-title"><span></span><span>近24小时数据</span></div>
        <!-- 折线图 -->
        <DayLinkRatioCharts
            :echartsData="{ option: dayLinkRatio }"
            ref="zhjcSiteChart"
        />
        <!-- <div v-show="chartList.length == 0" class="noData" >暂无数据···</div> -->
      </div>
    </div>

  </div>
</template>

<script>
import TopLine from "../../../PopuTitleLIne.vue";
import * as echarts from "echarts";
import DayLinkRatioCharts from "@/components/charts";

export default {
  name: "DynamicLabel",
  data() {
    return {
      id: '',
      show: true,
      allInfoMap: {
        PPS: [
          {
            key: "stName",
            titleName: "测站名称",
            width: "100",
          },
          {
            key: "stCode",
            titleName: "测站编码",
            width: "100",
          },
          // {
          //   key: "dyp",
          //   titleName: "日降水量(mm)",
          //   width: "100",
          // },
          // {
          //   key: "drp",
          //   titleName: "时段降水量(mm)",
          //   width: "100",
          // },
          // {
          //   key: "intv",
          //   titleName: "时段长(h)",
          //   width: "90",
          // },
          // {
          //   key: "pdr",
          //   titleName: "降水历时",
          //   width: "90",
          // },
          {
            key: "stLong",
            titleName: "经度(°)",
            width: "90",
          },
          {
            key: "stLat",
            titleName: "纬度(°)",
            width: "90",
          },
          // {
          //   key: "wth",
          //   titleName: "天气状况",
          //   width: "90",
          // },
          {
            key: "tm",
            titleName: "数据时间",
            width: "150",
          },
          {
            key: "stLoc",
            titleName: "站点地址",
            width: "100",
          },
        ],
        RR: [
          {
            key: "stName",
            titleName: "测站名称",
            width: "100",
          },
          {
            key: "stCode",
            titleName: "站点编码",
            width: "90",
          },
          {
            key: "w",
            titleName: "蓄水量(亿m³)",
            width: "150",
          },
          {
            key: "rz",
            titleName: "库上水位(m)",
            width: "80",
          },
          {
            key: "otq",
            titleName: "出库流量(m³/s)",
            width: "80",
          },
          {
            key: "blrz",
            titleName: "库下水位(m)",
            width: "80",
          },
          {
            key: "inq",
            titleName: "入库流量(m³/s)",
            width: "80",
          },
          // {
          //   key: "inqdr",
          //   titleName: "入流时段长",
          //   width: "80",
          // },
          // {
          //   key: "msqmt",
          //   titleName: "测流方法",
          //   width: "80",
          // },
          {
            key: "stLong",
            titleName: "经度(°)",
            width: "80",
          },
          {
            key: "stLat",
            titleName: "纬度(°)",
            width: "80",
          },
          // {
          //   key: "rwptn",
          //   titleName: "库水水势",
          //   width: "80",
          // },
          {
            key: "tm",
            titleName: "数据时间",
            width: "80",
          },
          {
            key: "stLoc",
            titleName: "站点地址",
            width: "80",
          },
        ],
        ZZ: [
          {
            key: "stName",
            titleName: "测站名称",
            width: "100",
          },
          {
            key: "stCode",
            titleName: "站点编码",
            width: "90",
          },
          // {
          //   key: "catArea",
          //   titleName: "集水面积(km²)",
          //   width: "90",
          // },
          // {
          //   key: "bank",
          //   titleName: "岸别",
          //   width: "90",
          // },
          {
            key: "q",
            titleName: "流量(m³/s)",
            width: "90",
          },
          {
            key: "z",
            titleName: "水位(m)",
            width: "90",
          },
          {
            key: "stLong",
            titleName: "经度(°)",
            width: "80",
          },
          {
            key: "stLat",
            titleName: "纬度(°)",
            width: "80",
          },
          {
            key: "tm",
            titleName: "数据时间",
            width: "80",
          },
          {
            key: "stLoc",
            titleName: "站点地址",
            width: "80",
          },
        ],
        DD: [
          {
            key: "stName",
            titleName: "测站名称",
            width: "110",
          },
          {
            key: "stCode",
            titleName: "测站编码",
            width: "100",
          },
          {
            key: "supwptn",
            titleName: "闸上水势",
            width: "80",
          },
          {
            key: "sdwwptn",
            titleName: "闸下水势",
            width: "60",
          },
          {
            key: "upz",
            titleName: "闸上水位(m)",
            width: "150",
          },
          {
            key: "dwz",
            titleName: "闸下水位(m)",
            width: "80",
          },
          {
            key: "gtophgt",
            titleName: "开启高度",
            width: "80",
          },
          // {
          //   key: "msqmt",
          //   titleName: "测流方法",
          //   width: "80",
          // },
          {
            key: "stLong",
            titleName: "经度(°)",
            width: "80",
          },
          {
            key: "stLat",
            titleName: "纬度(°)",
            width: "80",
          },
          // {
          //   key: "swchrcd",
          //   titleName: "闸水特征码",
          //   width: "80",
          // },
          {
            key: "tgtq",
            titleName: "总过闸流量(m³/s)",
            width: "80",
          },
          {
            key: "tm",
            titleName: "数据时间",
            width: "80",
          },
          {
            key: "stLoc",
            titleName: "站点地址",
            width: "90",
          },
        ],
        WQ: [
          {
            key: "stName",
            titleName: "测站名称",
            width: "130",
          },
          {
            key: "stCode",
            titleName: "测站编码",
            width: "130",
          },
          {
            key: "wt",
            titleName: "水温(°)",
            width: "130",
          },
          {
            key: "cond",
            titleName: "电导率(μS/cm)",
            width: "130",
          },
          {
            key: "turb",
            titleName: "浊度(NTU)",
            width: "130",
          },
          {
            key: "dox",
            titleName: "溶解氧(mg/L)",
            width: "130",
          },
          {
            key: "nh3n",
            titleName: "氨氮(mg/L)",
            width: "130",
          },
          {
            key: "chla",
            titleName: "叶绿素(μg/L)",
            width: "130",
          },
          {
            key: "ph",
            titleName: "PH(无量纲)",
            width: "130",
          },
          {
            key: "tp",
            titleName: "总磷(mg/L)",
            width: "130",
          },
          {
            key: "tm",
            titleName: "数据时间",
            width: "130",
          },
        ],
        VD: [
          {
            key: "wmstName",
            titleName: "监视点名称",
            width: "150",
          },
          {
            key: "wmstLong",
            titleName: "经度(°)",
            width: "100",
          },
          {
            key: "wmstLat",
            titleName: "纬度(°)",
            width: "100",
          },
          {
            key: "wmstLoc",
            titleName: "所在位置",
            width: "200",
          },
          {
            key: "statusStr",
            titleName: "状态",
            width: "80",
          },
        ],
        ZQ: [
          {
            key: "stName",
            titleName: "测站名称",
            width: "100",
          },
          {
            key: "stCode",
            titleName: "站点编码",
            width: "90",
          },
          {
            key: "catArea",
            titleName: "集水面积(km²)",
            width: "90",
          },
          // {
          //   key: "bank",
          //   titleName: "岸别",
          //   width: "90",
          // },
          {
            key: "q",
            titleName: "流量(m³/s)",
            width: "90",
          },
          {
            key: "z",
            titleName: "水位(m)",
            width: "90",
          },
          {
            key: "rvName",
            titleName: "河流名称",
            width: "80",
          },
          {
            key: "stLong",
            titleName: "经度(°)",
            width: "80",
          },
          {
            key: "stLat",
            titleName: "纬度(°)",
            width: "80",
          },
          {
            key: "tm",
            titleName: "数据时间",
            width: "80",
          },
          {
            key: "stLoc",
            titleName: "站点地址",
            width: "80",
          },
        ],
        QQ:[
          {
            key: "stCode",
            titleName: "监测点",
            width: "80",
          },
          {
            key: "damName",
            titleName: "大坝名称",
            width: "80",
          },
          {
            key: "resName",
            titleName: "所属水库",
            width: "80",
          },
          {
            key: "vrds",
            titleName: "垂直位移",
            width: "80",
          },
          {
            key: "temp",
            titleName: "温度",
            width: "80",
          },
          {
            key: "z",
            titleName: "渗流压力水位(m)",
            width: "80",
          },
          {
            key: "x",
            titleName: "X向水平位移",
            width: "80",
          },
          {
            key: "y",
            titleName: "Y向水平位移",
            width: "80",
          },
        ]
      },
      //基础信息
      baseInfo: {},
      chartTitle: "雨量站",
      xAxisValues: [], //X轴
      yAxisValues:[],
      series:[],
      chartList: [], //echart图list
      newItemData: {}
    };
  },
  computed: {
    //24小时分钟数据
    dayLinkRatio() {
      let that = this;
      return {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          //绘图区调整
          left: 10,
          right: 10,
          bottom: 30,
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff',
            }
          },
          data: that.xAxisValues, //x轴数据
        },
        yAxis: this.yAxisValues,
        series: this.series
      };
    },
  },
  components: {
    TopLine,
    DayLinkRatioCharts,
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    itemData: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "",
    },
  },
  watch: {},
  mounted() {
    this.baseInfo = this.allInfoMap[this.type];
    console.log(this.itemData)
    this.newItemData = this.itemData;
    this.get24MonitorDataByType();
  },
  methods: {
    // /**
    //  * 根据code获取站点基本信息
    //  */
    // getBaseInfoByCode() {
    //   let that = this;
    //   let code = that.itemData.code;
    //   that.$api.gqjc.getZHJC_SiteList(code).then((res) => {
    //       if (res.code == 200) {
    //
    //         if(res.data !== null && res.data !== undefined ){
    //            that.newItemData = res.data
    //         }else{
    //           that.newItemData = this.itemData
    //         }
    //
    //       }else{
    //         that.newItemData = this.itemData
    //       }
    //        if(that.type == 'VD'){
    //             let statusStr = that.newItemData.status == null?'异常':'正常'
    //             that.newItemData.statusStr = statusStr
    //         }
    //       console.log(that.newItemData);
    //     })
    //     .catch(() => {});
    // },
    formatType(type){
      if(type == '1'){
        return '垂直位移'
      }else if(type == 2){
        return '水平位移'
      }else{
        return '渗流压力水位'
      }
    },
    /**
     * 根据type获取站点24小时数据
     */
    get24MonitorDataByType() {
      let code = this.itemData.code;
      this.xAxisValues = [];
      this.chartList = [];
      let that = this;
      switch (this.type) {
        case "RR": //水库水情
          that.$api.gqjc.getZHJC_SiteSW24({stcd: code}).then((res) => {
            if (res.code == 200) {
              this.yAxisValues =[
                {
                  name:'水位(m)',
                  type: 'value',
                  min: 0,
                  max: 70,
                  interval: 10,
                  splitLine: {     //网格线
                    "show": false
                  },
                  axisTick: {
                      show: true, // 坐标轴刻度
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                    }
                  },
                },
                {
                  name:'蓄水量(亿m³)',
                  type: 'value',
                  splitLine: {     //网格线
                    "show": false
                  },
                  axisTick: {
                      show: true, // 坐标轴刻度
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                    }
                  },
                }
              ];
              let result = res.data;
              this.xAxisValues = result.map(r => r.tm.split(' ')[1])
              const rz = result.map(r => r.rz || 0);  // 库上水位
              const blrz = result.map(r => r.blrz || 0); // 库下水位
              const inq = result.map(r => r.inq || 0); // 入库流量
              const otq = result.map(r => r.otq || 0); // 出库流量
              const w = result.map(r => (r.w/100).toFixed(3) || 0); // 蓄水量
              this.series = [
                {
                  name: '库上水位',
                  data: rz,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 0,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m';
                    }
                  },
                },
                {
                  name: '库下水位',
                  data: blrz,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 0,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m';
                    }
                  },
                },
                {
                  name: '入库流量',
                  data: inq,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 1,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m³/s';
                    }
                  },
                },
                {
                  name: '出库流量',
                  data: otq,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 1,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m³/s';
                    }
                  },
                },
                {
                  name: '蓄水量',
                  data: w,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 1,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' 亿m³';
                    }
                  },
                },
              ];
            }
          })
          break;
        case "PPS": //雨量
          that.$api.gqjc.getZHJC_SiteYL24({stcd: code}).then((res) => {
            if (res.code == 200){
              let result = res.data;
              this.yAxisValues =[
                {
                  name:'雨量(mm)',
                  type: 'value',
                  splitLine: {     //网格线
                    "show": false
                  },
                  axisTick: {
                      show: true, // 坐标轴刻度
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                    }
                  },
                },
              ];
              this.xAxisValues = result.map(r => r.tm.split(' ')[1]);
              const data = result.map(r => r.drp || 0);
              this.series = [
                {
                  name: '雨量站',
                  data: data,
                  type: 'line',
                  smooth: true,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' mm';
                    }
                  },
                }
              ];
            }
          })
          break;
        case "ZZ": //渠道水文
         that.$api.gqjc.getZHJC_SiteQD24({stcd: code}).then(res=>{
           if (res.code == 200){
             this.yAxisValues =[
               {
                 name:'水位(m)',
                 type: 'value',
                 min: 0,
                 max: 70,
                 interval: 10,
                 splitLine: {     //网格线
                   "show": false
                 },
                 axisTick: {
                      show: true, // 坐标轴刻度
                  },
                 axisLine: {
                  show: true,
                   lineStyle: {
                     color: '#fff',
                   }
                 },
               },
               {
                 name:'流量(m³/s)',
                 type: 'value',
                 splitLine: {     //网格线
                   "show": false
                 },
                 axisTick: {
                      show: true, // 坐标轴刻度
                  },
                 axisLine: {
                  show: true,
                   lineStyle: {
                     color: '#fff',
                   }
                 },
               }
             ];
             let result = res.data;
             this.xAxisValues = result.map(r => r.tm.split(' ')[1])
             const sw = result.map(r => r.z || 0);  // 水位
             const ll = result.map(r => r.q || 0); //流量
             this.series = [
               {
                 name: '水位',
                 data: sw,
                 type: 'line',
                 smooth: true,
                 yAxisIndex: 0,
                 tooltip: {
                   valueFormatter: function (value) {
                     return value + ' m';
                   }
                 },
               },
               {
                 name: '流量',
                 data: ll,
                 type: 'line',
                 yAxisIndex: 1,
                 smooth: true,
                 tooltip: {
                   valueFormatter: function (value) {
                     return value + ' m³/s';
                   }
                 },
               },
             ];
           }
         })
          break;
        case "DD": //水闸
          that.$api.gqjc.getZHJC_SiteSZ24({stcd: code}).then((res) => {
            if (res.code == 200){
              let result = res.data;
              this.yAxisValues =[
                {
                  name:'水位(m)',
                  type: 'value',
                  min: 0,
                  max: 70,
                  interval: 10,
                  splitLine: {     //网格线
                    "show": false
                  },
                  axisTick: {
                      show: true, // 坐标轴刻度
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                    }
                  },
                },
                {
                  name:'流量(m³/s)',
                  type: 'value',
                  splitLine: {     //网格线
                    "show": false
                  },
                  axisTick: {
                      show: true, // 坐标轴刻度
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                    }
                  },
                }
              ];
              this.xAxisValues = result.map(r => r.tm.split(' ')[1]);
              const upz = result.map(r => r.upz || 0);  // 闸上水位
              const dwz = result.map(r => r.blrz || 0); // 闸下水位
              const tgtq = result.map(r => r.tgtq || 0); // 总过闸流量
              this.series = [
                {
                  name: '闸上水位',
                  data: upz,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 0,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m';
                    }
                  },
                },
                {
                  name: '闸下水位',
                  data: dwz,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 0,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m';
                    }
                  },
                },
                {
                  name: '总过闸流量',
                  data: tgtq,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 1,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m³/s';
                    }
                  },
                }
              ];
            }
          })
          break;
        case "WQ": //水质
          that.$api.gqjc.getZHJC_SiteSZZ24({stcd: code}).then((res) => {
            if (res.code == 200){
              let result = res.data;
              this.yAxisValues =[
                {
                  name:'',
                  type: 'value',
                  splitLine: {     //网格线
                    "show": false
                  },
                  axisTick: {
                      show: true, // 坐标轴刻度
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                    }
                  },
                },
              ];
              this.xAxisValues = result.map(r => r.tm.split(' ')[1]);
              const codmn = result.map(r => r.codmn || 0);  // 高锰酸盐指数
              const dox = result.map(r => r.dox || 0); // 溶解氧
              const nh3n = result.map(r => r.codcr || 0); // 氨氮
              const tn = result.map(r => r.codcr || 0); // 总氮
              const codcr = result.map(r => r.codcr || 0); // 化学需氧量
              const tp = result.map(r => r.tp || 0); // 总磷
              this.series = [
                {
                  name: '高锰酸盐指数',
                  data: codmn,
                  type: 'line',
                  smooth: true,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' mg/L';
                    }
                  },
                  areaStyle: {},
                },
                {
                  name: '溶解氧',
                  data: dox,
                  type: 'line',
                  smooth: true,
                  areaStyle: {},
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' mg/L';
                    }
                  },
                },
                {
                  name: '氨氮',
                  data: nh3n,
                  type: 'line',
                  smooth: true,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' mg/L';
                    }
                  },
                  areaStyle: {},
                },
                {
                  name: '总氮',
                  data: tn,
                  type: 'line',
                  smooth: true,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' mg/L';
                    }
                  },
                  areaStyle: {},
                },
                {
                  name: '化学需氧量',
                  data: codcr,
                  type: 'line',
                  smooth: true,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' mg/L';
                    }
                  },
                  areaStyle: {},
                },
                {
                  name: '总磷',
                  data: tp,
                  type: 'line',
                  smooth: true,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' mg/L';
                    }
                  },
                  areaStyle: {},
                },
              ];
            }
          })
          break;
        case "VD": //视频
          break;
        case "ZQ": //河道水情 --- 暂时用水库水情接口
          that.$api.gqjc.getZHJC_SiteHD24({stcd: code}).then((res) => {
            if (res.code == 200){
              this.yAxisValues =[
                {
                  name:'水位(m)',
                  type: 'value',
                  min: 0,
                  max: 70,
                  interval: 10,
                  splitLine: {     //网格线
                    "show": false
                  },
                  axisTick: {
                      show: true, // 坐标轴刻度
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                    }
                  },
                },
                {
                  name:'流量(m³/s)',
                  type: 'value',
                  splitLine: {     //网格线
                    "show": false
                  },
                  axisTick: {
                      show: true, // 坐标轴刻度
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                    }
                  },
                }
              ];
              let result = res.data;
              this.xAxisValues = result.map(r => r.tm.split(' ')[1])
              const sw = result.map(r => r.z || 0);  // 水位
              const ll = result.map(r => r.q || 0); //流量
              this.series = [
                {
                  name: '水位',
                  data: sw,
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 0,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m';
                    }
                  },
                },
                {
                  name: '流量',
                  data: ll,
                  type: 'line',
                  yAxisIndex: 1,
                  smooth: true,
                  tooltip: {
                    valueFormatter: function (value) {
                      return value + ' m³/s';
                    }
                  },
                },
              ];
            }
          })
          break;
      }
    },
    //打开视频
    openVideo(item) {
      let that = this
      this.$api.gqjc.getZHJC_Point_SP({
        protocol:'hls',
        dataSource:this.newItemData.dataSource,
        wmstCode: this.newItemData.wmstCode
      }).then(res=>{
        that.newItemData.url = res.data;
        that.$bus.emit('zhjcOpenVideo', that.newItemData)
      })
    },

    closeClick() {
      if (this.closeEvent) {
        this.closeEvent();
      }
    },
    flyto() {
      if (this.flyEvent) {
        this.flyEvent();
      }
    },
  },
};
</script>


<style lang="less">
.zhjcSiteBox {
  width: 300px;
  height: 0px;
  position: relative;
  bottom: 0;
  left: 0;
}

.zhjcSiteBox-close {
  position: absolute;
  color: #fff;
  top: 20px;
  right: 10px;
  text-shadow: 2px 2px 2px #022122;
  cursor: pointer;
  animation: fontColor 1s;

  display: flex;
  justify-content: right;
  width: 100%;

  span {
    display: block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 50%;
    background-color: #050e13;
    border-color: #050e13;
    color: #01c7e5;
    text-align: center;
    cursor: pointer;
  }
}

.zhjcSiteBox-wrap {
  position: absolute;
  left: 21%;
  top: -60%;
  width: 100%;
  // height: 200px;
  // border-radius: 50px 0px 50px 0px;
  // border: 1px solid #38e1ff;
  // background-color: #38e1ff4a;
  // box-shadow: 0 0 10px 2px #29baf1;
  background-color: rgba(9, 34, 57, 0.85);
  // animation: zhjcSiteSlide 2s;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.zhjcSiteBox-top {
  width: 100%;
  height: 25px;
  background-image: linear-gradient(to right,
  rgba(82, 243, 246, 0.1),
  rgba(82, 243, 246, 0));
  border-radius: 0px 0px 30px 0px;
  animation: area 1s;

  .zhjcSiteBox-title {
    text-align: left;
    line-height: 25px;
    padding-left: 10px;
  }
}

.zhjcPine {
  position: absolute;
  left: -15px;
  // bottom: -83px;
  width: 145px;
  height: 100px;
  box-sizing: border-box;
  line-height: 120px;
  text-indent: 5px;
}

.zhjcPine::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -94px;
  width: 40%;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #38e1ff;
  transform-origin: bottom center;
  transform: rotateZ(135deg) scale(1.5);
  animation: slash 0.5s;
  // filter: drop-shadow(1px 0px 2px #03abb4);
  /* transition: slash 2s; */
}

.zhjcSiteBox-topline {
  width: 300px;
  height: 15px;
}

.textColor {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}

.fontColor {
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}

.zhjcSiteBox-Content {
  padding: 0px 10px;

  .content-title {
    width: 360px;
    height: 14px;
    line-height: 14px;
    background: linear-gradient(90deg,
    rgba(82, 243, 246, 0.1) 0%,
    rgba(82, 243, 246, 0) 100%);
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;

    span:nth-child(1) {
      width: 4px;
      height: 14px;
      background: #52f3f6;
    }

    span:nth-child(2) {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #52f3f6;
      margin-left: 4px;
    }
  }

  .data-li {
    display: flex;
    align-items: center;
    font-size: 14px;

    .data-label {
      color: #8bc2f2;
      width: 125px;
      text-align: right;
    }

    .data-value {
      flex: 1;
      color: #ffffff;
      text-align: left;
    }

    .video-baseIcon {
      font-size: 18px;
      color: #52f3f6;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}

.zhjcSiteBoxChart {
  width: 100%;
  height: 200px;
  position: relative;
}

.noData {
  position: absolute;
  top: 80px;
  text-align: center;
  width: 280px;
  font-size: 14px;
}

@keyframes fontColor {
  0% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }
  40% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }
  100% {
    color: #ffffff;
    text-shadow: 1px 1px 5px #002520d2;
  }
}

@keyframes zhjcSiteSlide {
  0% {
    // border: 1px solid #38e1ff00;
    background-color: #38e1ff00;
    // box-shadow: 0 0 10px 2px #29baf100;
  }

  100% {
    // border: 1px solid #38e1ff;
    background-color: rgba(9, 34, 57, 0.85);
    // box-shadow: 0 0 10px 2px #29baf1;
  }
}

@keyframes area {
  0% {
    width: 0%;
  }
  25% {
    width: 0%;
  }

  100% {
    width: 90%;
  }
}

/* img{
            position:absolute;
            left:30%;
            top:0;
            width: 100%;
            box-shadow: 0 0 10px 2px #29baf1;
        } */

@keyframes slash {
  0% {
    transform: rotateZ(135deg) scale(0);
  }

  100% {
    transform: rotateZ(135deg) scale(1.5);
  }
}
</style>