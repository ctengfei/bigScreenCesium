<template>
  <div class="area_boxPC">
    <!-- 3d柱状图 -->
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
    BuildEletricCharts  
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
            bottom:12,
            top:40,
            containLabel: true,
          },
          legend: {
            data:[],
            show: true,
            top:10, //标记位置
            right:10, //标记位置
            icon:'circle',
            textStyle: {
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "12",
            },
          },
          xAxis: {
            data: [],
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
          series: [],
        },
      },
    }
  },
  mounted () {
    this.$api.gqjc.getZHJC_structure({mapId:'1692466825790787586'}).then(res=>{
      if(res.success){
        const mergedData1 = {};
        const mergedData2 = {};
        let series = [];
        res.data.forEach(r=>r.plantArea = parseFloat(r.plantArea).toFixed(2))
        res.data.forEach(r=>{
          mergedData1[r.areaName] = mergedData1[r.areaName] || []
          mergedData1[r.areaName].push(r);
          mergedData2[r.crop] = mergedData2[r.crop] || []
          mergedData2[r.crop].push(r.plantArea)
        })
        this.buildEletric.option.xAxis.data = Object.keys(mergedData1);
        for (const key2 in mergedData2) {
          this.buildEletric.option.legend.data.push(key2)
          series.push({
            name:key2,
            data: mergedData2[key2],
            type: 'bar',
            barWidth:barWidth,
            barGap: "50%",
            tooltip: {
              valueFormatter: function (value) {
                return value + ' km²';
              }
            },
            stack: 'total',
          })
        }
        this.buildEletric.option.series = series
      }
    })
  },
  methods: {
    
  }
}
</script>
 
<style lang="less">
 .area_boxPC{
    width: 400px;
    height: 100%;
 }
</style>