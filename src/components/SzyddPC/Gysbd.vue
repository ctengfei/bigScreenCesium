<template>
  <div class="gysbdpc_box">
    <!-- 3d柱状图 -->
    <div class="head_statics">
      <li>
        <span>计划总供水量</span>
        <strong>{{ topInfo.planTotal || 0 }} <i>万m³</i></strong>
      </li>
      <li>
        <span>已供总水量</span>
        <strong>{{ topInfo.realityTotal || 0 }} <i>万m³</i></strong>
      </li>
      <li>
        <span>还需供水</span>
        <strong>{{ topInfo.waterDemandTotal || 0 }} <i>万m³</i></strong>
      </li>
    </div>
    <BuildEletricCharts :echartsData="buildEletric" />
  </div>
</template>
 
<script>
import BuildEletricCharts from "@/components/charts";
let barWidth = 9;
var stColor = {//水田3d柱状图柱子两个侧面的颜色
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
    //   color: '#1FA6AA',
    color:'rgba(49, 127, 182, 0.5)',
    },
    {
      offset: 0.45,
    //   color: '#1FA6AA',
    color:'rgba(49, 127, 182, 0.5)',
    },
    {
      offset: 0.5,
    //   color: '#66DFD7',
    color:'rgba(49, 127, 182, 0.5)',
    },
    {
      offset: 1,
    //   color: '#30C9C9',
    color:'rgba(49, 127, 182, 0.5)',
    },
  ],
};
var hdColor = {//旱地3d柱状图柱子两个侧面的颜色
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
    //   color: '#2B78CF',
    color:'rgba(239, 155, 57, 0.5)',
    },
    {
      offset: 0.45,
    //   color: '#2B78CF',
    color:'rgba(239, 155, 57, 0.5)',
    },
    {
      offset: 0.5,
    //   color: '#58AFFB',
    color:'rgba(239, 155, 57, 0.5)',
    },
    {
      offset: 1,
    //   color: '#46A0FA',
    color:'rgba(239, 155, 57, 0.5)',
    },
  ],
};
var otherColor = {//其他用地3d柱状图柱子两个侧面的颜色
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
    //   color: '#2B78CF',
    color:'rgba(147, 232, 255, 0.5)',
    },
    {
      offset: 0.45,
    //   color: '#2B78CF',
    color:'rgba(147, 232, 255, 0.5)',
    },
    {
      offset: 0.5,
    //   color: '#58AFFB',
    color:'rgba(147, 232, 255, 0.5)',
    },
    {
      offset: 1,
    //   color: '#46A0FA',
    color:'rgba(147, 232, 255, 0.5)',
    },
  ],
};
export default {
components: {
    BuildEletricCharts,
  },
  data () {
    return {
      buildEletric: {//建筑用电情况(kwh)
        option: {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow", //鼠标悬停显示样式
              shadowStyle: {
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur:2,
              },
            },
          },
          grid: {
            left:10,
            right:10,
            bottom:5,
            top:6,
            containLabel: true,
          },
          // legend: {
          //   show: true,
          //   data: ["计划总量", "已供总量"],
          //   top:5, //标记位置
          //   right:10, //标记位置
          //   itemWidth:6.5,
          //   icon:'circle',
          //   textStyle: {
          //     color: "rgba(255, 255, 255, 0.8)",
          //     fontSize: "12",
          //   },
          // },
          xAxis: {
            data: ['生态', '农业', '城镇', '发电'],
            boundaryGap: true,
            //坐标轴
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "rgba(147, 232, 255, 0.1)"
              },
              textStyle: {
                color: "#000",
                fontSize:12,
              },
            },
            type: "category",
            axisLabel: {
              //坐标轴文字显示样式
              lineHeight: 18, //字体行高
              fontNum: 15, //每行显示字数
              rotate: 0, //文字旋转角度，0不旋转
              textStyle: {
                color: "rgba(255, 255, 255, 0.3)",
                fontWeight: 'normal',
                fontSize: "12",
              },
            },
            axisTick: {
              textStyle: {
                color: "#fff",
                fontSize: "12",
              },
              show: false,
            },
            splitLine: { show: false },
          },
          yAxis: {
            type: "value",
            //坐标轴
            axisLine: {
              show: false,
              lineStyle: {
                width: 1,
                color: "#214776",
              },
              textStyle: {
                color: "#fff",
                fontSize: "10",
              },
            },
            axisTick: {
              show: false,
            },
            //坐标值标注
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "12",
              },
            },
            //分格线
            splitLine: {
              lineStyle: {
                color: "rgba(147, 232, 255, 0.1)",
                type: 'dashed',
                dashOffset: 5 ,
              },
            },
          },
          series: [
            {
              z: 1,
              name: "计划总量",
              type: "bar",
              barWidth: barWidth,
              barGap: "0%",
              data: [10.43, 23, 25.14, 27.32],
              itemStyle: {
                normal: {
                  color: otherColor,
                },
              },
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' 万m³';
                }
              },
            },
            // {
            //   z: 3,
            //   name: "计划总量",
            //   type: "pictorialBar",
            //   symbolPosition: "end",
            //   data: [10.43, 23, 25.14, 27.32],
            //   symbol: "rect",
            //   symbolOffset: ["-75%", "0%"],//底部切片位置，[x,y]
            //   symbolSize: [barWidth , 6],//底部切片尺寸，设置为0则不显示[宽，高]
            //   itemStyle: {
            //     normal: {
            //       borderWidth: -5,
            //       color: '#317FB6',
            //     },
            //   },
            //   tooltip: {
            //     show: false,
            //   },
            // },
            {
              z: 1,
              name: "已供总量",
              type: "bar",
              barWidth: barWidth,
              barGap: "50%",
              data: [13.6, 35.43, 39.61, 35.58, 57.8, 56.58, 45.73, 39.77, 0, 2.89, 1.16, 5.93],
              itemStyle: {
                normal: {
                  color: hdColor,
                },
              },
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' 万m³';
                }
              },
            },
            // {
            //   z: 3,
            //   name: "已供总量",
            //   type: "pictorialBar",
            //   symbolPosition: "end",
            //   data: [13.6, 35.43, 39.61, 35.58, 57.8, 56.58, 45.73, 39.77, 0, 2.89, 1.16, 5.93],
            //   symbol: "rect",
            //   symbolOffset: ["75%", "0%"],
            //   symbolSize: [barWidth , 6],
            //   itemStyle: {
            //     normal: {
            //       borderWidth: -5,
            //       color: '#EF9B39',
            //     },
            //   },
            //   tooltip: {
            //     show: false,
            //   },
            // },
          ],
        },
      },
      topInfo:{
        planTotal:0,
        realityTotal:0,
        waterDemandTotal:0
      }
    }
  },
  mounted () {
    this.$api.szydd.getWaterUseSupplyContrast().then(res=>{
        if(res.success){
          const result = res.data;
          this.topInfo = res.data;
          this.buildEletric.option.series[0].data = [result.planEcology, result.planIrrigate, result.planTown,result.planElectric];

          // this.buildEletric.option.series[1].data = [result.planEcology, result.planIrrigate, result.planTown,result.planElectric];

          this.buildEletric.option.series[1].data = [result.ecology, result.irrigate, result.town,result.electric];

          // this.buildEletric.option.series[3].data = [result.ecology, result.irrigate, result.town,result.electric];
        }
    })
  },
  methods: {

  }
}
</script>
 
<style lang="less">
 .gysbdpc_box{
    width: 400px;
    height: 166px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .head_statics{
      display: flex;
      width: 100%;
      justify-content: space-between;
      li{
        display: flex;
        flex-direction: column;
        flex: 1;
        color: rgba(255, 255, 255, 0.8);
        span{
          font-size: 15px;
        }
        strong{
          color: #fff;
          font-size: 16px;
          font-weight: 400;
        }
        span,strong{
          text-align: center;
        }
        i{
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
        }
      }
    }
 }
</style>