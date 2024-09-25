<template>
  <div class="OperationDetail">
<!--    <div class="operaDetail-close">-->
<!--      <span @click="handleClosePlayDetail"><i class="el-icon-close"></i></span>-->
<!--    </div>-->
    <div class="time-info">
      <span style="margin-right: 15px">时间：<span style="color: #52f3f6">{{ timeDate }}</span></span>
      <span style="margin-right: 15px">库容：<span  style="color: #52f3f6">{{ timeKr }}</span> 万m³</span>
      <span style="margin-right: 15px">水位：<span  style="color: #52f3f6">{{ timeSw }}</span> m</span>
      <span>流量：<span style="color: #52f3f6">{{ timeLl }}</span> m³/s</span>
    </div>
    <div class="operaDetail-title"><span></span><span>预报库容量</span></div>
    <div class="operaDetail-krEchart">
      <!-- 折线图 -->
      <DayLinkRatioCharts ref="linsInst" :echartsData="{option:krltjPC}" />
    </div>
    <div class="operaDetail-title"><span></span><span>水位信息</span></div>
    <div class="operaDetail-krEchart">
      <!-- 折线图 -->
      <DayLinkRatioCharts ref="lineInst" :echartsData="{option:swtjPC}" />
    </div>
    <div class="tablebox myTable">
      <el-table
        ref="table"
        :data="tableList"
        stripe
        style="width: 100%"
        height="69"
      >
        <el-table-column
          label="方案名称"
          align="center"
          prop="name"
        >
        </el-table-column>
        <el-table-column label="方案开始时间" align="center" prop="time"  width="100">
           <template slot-scope="scope">
                <p>{{scope.row.time.substring(0,10)}}</p>
                <p>{{scope.row.time.substring(11,16)}}</p>
            </template>
        </el-table-column>
        <el-table-column
          label="模拟时长"
          align="center"
          prop="timeLength"
          width="70"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <p class="doPlay" @click="startPlay(scope.row)">
              <img src="../../assets/images/fxxs/play.png" /><span
                >开始模拟</span
              >
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import DayLinkRatioCharts from "@/components/charts";

export default {
  name: "OperationDetail",
  props: {
    'ifShowPlayDetail': {
      type: Boolean
    }
  },
  components: {
    DayLinkRatioCharts
  },
  created() {

  },
  data() {
    return {
      currentRow: null,
      tableList: [],
      xAxisValues: [],//X轴
      chartList: [],//echart图list
      swchartList: [],
      llChartList: [], // 流量
      xxsw: 0,//防洪限制水位(m)-汛限水位
      xhsw: 0,//校核洪水位(m)
      sjsw: 0,//设计洪水位(m)
      minSW: 0,//最小水位
      tempsw: 60,//临时最小水位
      index1: -1,
      index2: -1,
      timer1: null,
      timer2: null,
      timeSw: 0,
      timeLl: 0,
      timeKr: 0,
      timeDate: '--日--时',
      krltjPC:{
        tooltip: {
          trigger: "axis",
        },
        animation:false,
        animationDuration: 0,
        animationEasing: 'cubicInOut',
        legend: {
          //标记属性
          show: false,
          data: ['预报库容量（万m³）'],
          orient: "horizontal", //标记排列显示
          top: 10, //标记位置
          right: 10, //标记位置
          icon: 'rect',
          itemWidth: 16,
          itemHeight: 3,
          itemGap: 16,
          formatter: [//用富文本组件实现图例与文字对齐的关键是富文本的格式转换
            '{a|{name}}'
          ].join('\n'),
          textStyle: {
            color: 'rgba(159,216,253,0.6)',
            fontSize: 18,
            height: 20,//图例字体高度
            lineHeight: 22, //图例字体行高
            rich: {//用富文本组件实现图例与文字对齐
              a: {
                verticalAlign: 'middle'//图例与文字对齐方式
              }
            }
          },
        },
        grid: {
          //绘图区调整
          left: 10,
          right: 24,
          bottom: 10,
          top: 30,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [],//x轴数据
          axisLabel: {
            //坐标轴文字显示样式
            lineHeight: 15, //字体行高
            fontSize: 12,
            fontNum: 15, //每行显示字数
            rotate: 0, //文字旋转角度，0不旋转
            color: '#fff',
            // interval: 0//刻度间隔个数
          },
          axisLine: {//坐标轴线样式
            lineStyle: {
              color: 'rgba(147, 232, 255, 0.1)',
              type: 'solid',
            },
          },
          axisTick: {//x轴刻度设置
            alignWithLabel: true,//刻度线与点对齐
            length: 4,//刻度线的长度
            // interval: 2,//刻度间隔个数
            show: true // 不显示坐标轴刻度线
          },
        },
        yAxis: {
          name: '库容(万m³)',
          type: "value",
          nameTextStyle: {
            color: '#fff'
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: "12",
            },
          },
          splitLine: {
            show: false,//是否显示网格线
            lineStyle: {
              // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
              color: 'rgba(147, 232, 255, 0.1)',
              type: 'dashed',
              dashOffset: 5,
            }
          },
        },
        series: [
          {
            name: "库容量（万m³）",
            data: [],
            type: "line",
            color: '#93E8FF',
            showSymbol: false,//不显示圆点，hover时显示
            smooth: true,//折线变为曲线
            areaStyle: {//曲线阴影
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(147,232,255,0.3)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(147,232,255,0)", // 100% 处的颜色
                }
              ])
            },
          }
        ],

      },
      swtjPC:{
        tooltip: {
          trigger: "axis",
        },
        animation:false,
        animationDuration: 0,
        animationEasing: 'cubicInOut',
        legend: {
          //标记属性
          show: false,
          data: ['水位'],
          orient: "horizontal", //标记排列显示
          top: 10, //标记位置
          right: 10, //标记位置
          icon: 'rect',
          itemWidth: 16,
          itemHeight: 3,
          itemGap: 16,
          formatter: [//用富文本组件实现图例与文字对齐的关键是富文本的格式转换
            '{a|{name}}'
          ].join('\n'),
          textStyle: {
            color: 'rgba(159,216,253,0.6)',
            fontSize: 18,
            height: 20,//图例字体高度
            lineHeight: 22, //图例字体行高
            rich: {//用富文本组件实现图例与文字对齐
              a: {
                verticalAlign: 'middle'//图例与文字对齐方式
              }
            }
          },
        },
        grid: {
          //绘图区调整
          left: 10,
          right: 15,
          bottom: 10,
          top: 30,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [],//x轴数据
          axisLabel: {
            //坐标轴文字显示样式
            lineHeight: 15, //字体行高
            fontSize: 12,
            fontNum: 15, //每行显示字数
            rotate: 0, //文字旋转角度，0不旋转
            color: '#fff',
            // interval: 0//刻度间隔个数
          },
          axisLine: {//坐标轴线样式
            lineStyle: {
              color: 'rgba(147, 232, 255, 0.1)',
              type: 'solid',
            },
          },
          axisTick: {//x轴刻度设置
            alignWithLabel: true,//刻度线与点对齐
            length: 4,//刻度线的长度
            // interval: 2,//刻度间隔个数
            show: true // 不显示坐标轴刻度线
          },
        },
        yAxis: [
          {
            name: '水位(m)',
            type: "value",
            nameTextStyle: {
              color: '#fff'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "12",
              },
            },
            splitLine: {
              show: false,//是否显示网格线
              lineStyle: {
                // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
                color: 'rgba(147, 232, 255, 0.1)',
                type: 'dashed',
                dashOffset: 5,
              }
            },
            axisLine: {show: false},//隐藏y轴
          },
          {
            name: '流量(m³/s)',
            type: "value",
            nameTextStyle: {
              color: '#fff'
            },
            nameLocation: 'end',
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "12",
              },
            },
            splitLine: {
              show: false,//是否显示网格线
              lineStyle: {
                // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
                color: 'rgba(147, 232, 255, 0.1)',
                type: 'dashed',
                dashOffset: 5,
              }
            },
          }
        ],
        series: [
          {
            name: "水位",
            data: [],
            type: "line",
            color: '#93E8FF',
            showSymbol: false,//不显示圆点，hover时显示
            smooth: true,//折线变为曲线
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted', //'dotted'虚线 'solid'实线
                },
              },
            },
            yAxisIndex: 0,
            areaStyle: {//曲线阴影
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(147,232,255,0.3)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(147,232,255,0)", // 100% 处的颜色
                }
              ])
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + ' m';
              }
            },
            markLine: {
                symbol: 'none',
                silent: false,
                name: '正常蓄水位',
                label:{
                    show: false,
                },
                lineStyle: {
                    normal: {
                        type: 'solid',
                        color: 'red',
                        width: 2,
                    }
                },
                data: [
                    { yAxis: 70, name: 'Avg' }
                ],
            }
          },
          {
            name: "流量",
            data: [],
            type: "line",
            color: '#9c5bc8',
            showSymbol: false,//不显示圆点，hover时显示
            smooth: true,//折线变为曲线
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'solid', //'dotted'虚线 'solid'实线
                },
              },
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + ' m³/s';
              }
            },
            yAxisIndex: 1,
            areaStyle: {//曲线阴影
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(178,127,222,0.3)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(147,232,255,0)", // 100% 处的颜色
                }
              ])
            },
          }
        ],
      }
    };
  },

  watch: {
    ifShowPlayDetail: function (val){
      if (!val) {
        this.timer1 && clearInterval(this.timer1)
        this.timer2 && clearInterval(this.timer2)
        const char1 = this.$refs.linsInst.myPieChart;
        const char2 = this.$refs.lineInst.myPieChart;
        char1.clear();
        char2.clear()
        char1.dispose();
        char2.dispose();
        this.swtjPC.series[0].data=[];
        this.swtjPC.series[1].data=[];
        this.swtjPC.xAxis.data=[];
        this.krltjPC.xAxis.data=[];
        this.krltjPC.series[0].data=[];
        this.index1 = -1;
        this.index2 = -1;
        this.timeSw = 0;
        this.timeLl = 0;
        this.timeKr = 0;
        this.timeDate = '--日--时';
      }
    }
  },
  mounted() {
    this.$bus.on("setPlayDetail", (val) => {
      this.currentRow = val
      this.$bus.emit("getCurrentRow", val)
      this.$bus.emit("getRulerRow", val)
      this.getDDFAYB()
      let data1 = [];
      let data3 = [];
      let data2 = [];
      //水位
      const unW1 = this.$watch(() => this.swchartList, (list) => {
        if(list.length){
          const chart = this.$refs.lineInst.myPieChart;
          chart.clear();
          clearInterval(this.timer1);
          this.timer1 = setInterval(() => {
            this.index1++
            if (this.index1 > list.length - 1) {
              this.index1 = -1;
              clearInterval(this.timer1)
              return
            }
            this.timeDate = this.xAxisValues[this.index1];
            this.timeLl = this.llChartList[this.index1];
            this.timeSw = list[this.index1];
            data1.push(list[this.index1]);
            data3.push(this.llChartList[this.index1]);
            this.swtjPC.series[0].data = data1;// 水位
            this.swtjPC.series[1].data = data3;// 流量
            chart.setOption({
              ...this.swtjPC,
              animationDuration: 0,
              animationEasing: 'cubicInOut',
            },true);
          }, 990);
        }
      });
      // 库容
      const unW2 = this.$watch(() => this.chartList, (list) => {
        if(list.length){
          const chart = this.$refs.linsInst.myPieChart;
          chart.clear();
          clearInterval(this.timer2);
          this.timer2 = setInterval(() => {
            this.index2++
            if (this.index2 > list.length - 1) {
              this.index2 = -1;
              clearInterval(this.timer2)
              return
            }
            this.timeKr = list[this.index2];
            data2.push(list[this.index2]);
            this.krltjPC.series[0].data = data2;
            chart.setOption({
              ...this.krltjPC,
              animationDuration: 0,
              animationEasing: 'cubicInOut',
            },true)
          }, 990);
        }
      })
    });
  },
  methods: {
    getCardName(key) {
      if (key == 'xaj') {
        return '新安江模型'
      } else if (key == 'hbv') {
        return 'HBV模型'
      } else {
        '--'
      }
    },
    //请求水库调度方案预报详情列表
    getDDFAYB() {
      let that = this
      this.xAxisValues = []
      this.chartList = []
      let params = {
        glid: that.currentRow.id,
        stcd: that.currentRow.type == 0 ? '61608212' : '61608180'
      }
      this.$api.fxxs.getFXXS_DDFAYB(params).then((res) => {
        // console.log('结果页面：请求水库调度方案详情列表')
        let result = res.data
        if (result && result.length > 0) {
          let tempSW = 90
          let xais = [];
          let swData = [];
          let krData = [];
          let llData = [];
          result.forEach(item => {
            let time = item.time
            let xValue = time.substring(8, 10) + '日' + time.substring(11, 13) + '时'
            let value = item.w
            let swvalue = item.rz
            xais.push(xValue)
            krData.push(value)
            llData.push(item.q)
            swData.push(swvalue)
            if (swvalue < tempSW) {
              tempSW = swvalue
            }
          })
          that.xAxisValues = xais;
          this.swtjPC.xAxis.data=xais;
          this.krltjPC.xAxis.data=xais;
          that.chartList = krData;
          that.llChartList = llData;
          that.swchartList = swData
          that.tempsw = tempSW
          // if(tempSW -5){
          //      that.minSW = tempSW - 5
          // }else{
          //     that.minSW = tempSW
          // }
        }
      }).catch(() => {

      });
    },
    getSKResInfoByStcd() {
      let that = this
      let params = {
        stcd: that.currentRow.type == 0 ? '61608212' : '61608180'
      }
      this.$api.fxxs.getFXXS_SHInfo(params).then((res) => {
        let code = res.code
        if (code == 200) {
          let result = res.data //防洪限制水位(m)-汛限水位
          let xxsw = result.flLowLimLev
          let sjsw = result.desFz //设计洪水位(m)
          let xhsw = result.cfZ //校核洪水位(m)
          that.xxsw = xxsw
          that.sjsw = sjsw
          that.xhsw = xhsw
          if (xhsw - that.tempsw > 4) {
            let diff = xhsw - that.tempsw - 4
            that.minSW = 55
          }
        }
      }).catch(() => {

      });
    },
  },
};
</script>
    
<style lang="less">
.OperationDetail {
  width: 500px;
  height: 650px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .time-info {
    color: #fff;
    font-size: 13px;
    font-weight: bold;
  }

.operaDetail-krEchart{
  width: 500px;
  flex: 1;
}
  .tablebox {
    width: 500px;
    height: 335px;
    margin-top: 11px;
    display: none;
  }
  .doPlay {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span:nth-child(2) {
      margin-left: 3px;
      color: #06f0ed;
    }
    img{
      width: 14px;
      height: 14px;
    }
  }
  .myTable{
    /****table格式 */
    .el-table td.el-table__cell, 
    .el-table th.el-table__cell.is-leaf{
      border-bottom: none !important;
    }
 
  .el-table th.el-table__cell{
    background-color: rgba(27, 101, 128, 0.5) !important;
  }
  /**表格头部文字 */
  .el-table th.el-table__cell>.cell{
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: #60B0ED;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .el-table .cell{
    padding-left: 5px !important;
    padding-right: 5px !important;
    line-height: 15px;
  }
  .el-table{
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: #8BC2F2 !important;
  }
  .el-table tr,
  .el-table, .el-table__expanded-cell{
    background-color: transparent !important;
  }
.el-table--scrollable-x .el-table__body-wrapper{
  overflow-x:hidden;
}
.el-table::before{
  height: 0px !important;
}
.el-table .el-table__cell{
  padding: 5px 0 !important;
}
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
   background-color: rgba(32,118,146,0.2) !important;
}
.el-table__body tr:hover > td{
     background-color:transparent !important;
 }
 .el-table__empty-text{
  color: rgba(78, 162, 187, 0.5) !important;
 }
}
  .operaDetail-close {
    margin: 10px 10px 10px 0;
    display: flex;
    justify-content: right;
    width: 100%;
    position: absolute;
    right: 0;
    top: -30px;
    span {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      background-color: #050e13;
      border-color: #050e13;
      color: #01c7e5;
      text-align: center;
      cursor: pointer;
      font-size: 20px;
    }
  }
  .operaDetail-title {
    width: 480px;
    height: 18px;
    line-height: 18px;
    background: linear-gradient(
      90deg,
      rgba(82, 243, 246, 0.1) 0%,
      rgba(82, 243, 246, 0) 100%
    );
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 15px;
    span:nth-child(1) {
      width: 6px;
      height: 18px;
      background: #52f3f6;
    }
    span:nth-child(2) {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #52f3f6;
      margin-left: 4px;
    }
  }
}
</style>