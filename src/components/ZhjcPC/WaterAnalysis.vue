<template>
  <div class="zyslfxpc">
    <!-- 折线图 -->
    <DayLinkRatioCharts :echartsData="{option:dayLinkRatioPC}" />
  </div>
</template>
 
<script>
import * as echarts from 'echarts';
import DayLinkRatioCharts from "@/components/charts";
import { computed } from 'vue';
export default {
components: {
    DayLinkRatioCharts 
  },
  data () {
   
    return {
      xAxisValues:[],//X轴
      chartList:[],//echart图list
    }
  },
  computed:{
    //总用水量分析
    dayLinkRatioPC(){
       let that = this
      return {
        tooltip: {
            trigger: "axis",
          },
          legend: {
            //标记属性
            show:false,
            data: ['总量'],
            orient: "horizontal", //标记排列显示
            top:10, //标记位置
            right:10, //标记位置
            icon:'rect',
            itemWidth: 16,
            itemHeight:3,
            itemGap:16,
            formatter: [//用富文本组件实现图例与文字对齐的关键是富文本的格式转换
              '{a|{name}}'
            ].join('\n'),
            textStyle: {
              color:'rgba(159,216,253,0.6)',
              fontSize:18,
              height:20,//图例字体高度
              lineHeight:22, //图例字体行高
              rich:{//用富文本组件实现图例与文字对齐
                a:{
                  verticalAlign: 'middle'//图例与文字对齐方式
                }
              }
            },
          },
          grid:{
            //绘图区调整
            left:10,
            right:10,
            bottom:10,
            top:10,
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: that.xAxisValues,//x轴数据
            axisLabel: {
              //坐标轴文字显示样式
              lineHeight: 15, //字体行高
              fontSize:12,
              fontNum: 15, //每行显示字数
              rotate: 0, //文字旋转角度，0不旋转
              color:'rgba(255, 255, 255, 0.3)',
              interval: 0//刻度间隔个数
            },
            axisLine: {//坐标轴线样式
              lineStyle: {
                color: 'rgba(147, 232, 255, 0.1)',
                type: 'solid',
              },
            },
            axisTick:{//x轴刻度设置
              alignWithLabel: true,//刻度线与点对齐
              length:4,//刻度线的长度
              interval: 2,//刻度间隔个数
              show:true // 不显示坐标轴刻度线
            },
          },
          yAxis:{ 
            name:'',
            type: "value",
            axisLabel:{
              show: true,
              textStyle: {
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "12",
              },
            },
            splitLine: {
              show: true,//是否显示网格线
              lineStyle: {
                // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
                color: 'rgba(147, 232, 255, 0.1)',
                type: 'dashed',
                dashOffset: 5 ,
              }    
            },
            axisLine:{show:false},//隐藏y轴
          },
          series: [
            {
              name: "总量",
              data:  that.chartList,
              type: "line",
              color:'#93E8FF',
              showSymbol: false,//不显示圆点，hover时显示
              smooth:true,//折线变为曲线
              // yAxisIndex:1,
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' 万m³';
                }
              },
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
      }
    },
  },
  mounted () {
    this.getChartData()
  },
  methods: {
    getChartData(){
      this.xAxisValues = []
      this.chartList = []
      this.$api.gqjc.getZHJC_watertotal().then((res) => {
        if(res.code == 200){
          let result = res.data
          if(result !== null && result !== undefined){
            //每月数据
            result.forEach(item =>{
              let xValue = item.month.split('-')[1] +'月'
              let value =  item.total
              this.xAxisValues.push(xValue)
              this.chartList.push(value)
            })
          }
        }

      }).catch(() => {
            
      }); 
    },
  }
}
</script>
 
<style lang="less">
 .zyslfxpc{
    width: 400px;
    height: 100%;
 }
</style>