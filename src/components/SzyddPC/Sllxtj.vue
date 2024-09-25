<!--状态-->
<template>
<div class="sllxtj">
    <div class="chart-container">
        <SllxtjPie :echartsData="{option}" class="chart"/>
        <!-- 底座背景 -->
        <div class="bg"></div>
        
    </div>
    <div class="sllxtj-content">
        <div class="sllxtj-content-item" v-for="(item,index) in optionData" :key="index">
            <p class="sllxtj-title"><span :style="{'background-color':color[index]}"></span><span>{{item.name}}</span></p>
             <p><span class="sllxtj-value">{{item.value}}</span><span class="sllxtj-unit">万m³</span></p>
        </div>

    </div>
</div>
  
</template>
 
<script>
import * as echarts from "echarts";
import "echarts-gl";
import SllxtjPie from "@/components/charts";
import { getPie3D, getParametricEquation } from "../../utils/pieChart.js"; //工具类js，页面路径自己修改

// const color = ["#93E8FF", "#DAF657", "#EF9B39", "#D45454","#7BE76F","#5779f6"];

export default {
  name: "chart",
  components: {
    SllxtjPie 
  },
  data() {
    return {
      color:["#93E8FF", "#DAF657", "#EF9B39", "#D45454","#7BE76F","#5779f6"],
      optionData: [
        {
          name: "城镇用水",
          value: 0,
        },
        {
          name: "农业用水",
          value: 0,
        },
        {
          name: "发电水量",
          value: 0,
        },
        {
          name: "工业水量",
          value: 0,
        },
        {
          name: "生态用水",
          value: 0,
        }
      ],
      statusChart: null,
      option: {},
    };
  },
  created() {
    //设置饼图透明度的关键
    this.setLabel();
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    // 初始化label样式
    setLabel() {
      this.optionData.forEach((item, index) => {
        item.itemStyle = {
          color: this.color[index],
        };
        item.label = {
          normal: {
            show: true,
            color: this.color[index],
            position:'right',
            // distance:-10,
            offset:[0, 3] ,
            formatter: [
              "{d|{d}%}",
              "————",
              //   '{c|{c}}{b|台}',
              "{b|{b}}",
            ].join("\n"), // 用\n来换行
            rich: {
              b: {
                // color: '#fff',
                lineHeight: 25,
                align: "left",
                color: this.color[index],
              },
              c: {
                fontSize: 22,
                // color: '#fff',
                textShadowColor: "#1c90a6",
                textShadowOffsetX: 0,
                textShadowOffsetY: 2,
                textShadowBlur: 5,
                color: this.color[index],
              },
              d: {
                color: this.color[index],
                align: "left",
              },
            },
          },
        };
        item.labelLine = {
          normal: {
            length2: 30,
            lineStyle: {
              width: 1,
              color: this.color[index],
            },
          },
        };
      });
    },
    // 图表初始化
    initChart() {
      // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
      this.option = getPie3D(this.optionData, 0.7, 180, 25, 30, 0.7);
    },
    getChartData(){
      this.$api.szydd.getActualWaterUseStatistics().then((res) => {
        if(res.code == 200){
          let result = res.data
          if(result !== null && result !== undefined){
             this.optionData[0].value = result.town == null || result.town== undefined?0:parseInt(result.town)//城镇
             this.optionData[1].value = result.agriculture == null || result.agriculture== undefined?0:parseInt(result.agriculture)//农业
             this.optionData[2].value = result.electric == null || result.electric== undefined?0:parseInt(result.electric)//发电
             this.optionData[3].value = result.industry == null || result.industry== undefined?0:parseInt(result.industry)//工业
             this.optionData[4].value = result.ecology == null || result.ecology== undefined?0:parseInt(result.ecology)//生态
             
          }
          this.initChart()
        }

      }).catch(() => {
            
      }); 
    },
  },
};
</script>
 
<style lang='less' scoped>
.sllxtj{
  width: 400px;
  height: 140px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
.chart-container {
  position: relative;
  width: 222px;
  height: 140px;
  .chart {
    width: 100%;
    height: 100%;
    position: relative;
     z-index: 2;
  }

  .bg {
    position: absolute;
    bottom: 0px;
    left: 35px;
    z-index: 0;
    height: 80px;
    width:148px;
    background: rgba(255, 255, 255, 0.1);
    background: no-repeat center;
    background-image: url("../../assets/images/common/pie-dz.png");
    background-size: 100% 100%;
    z-index: 1;
  }
}
.sllxtj-content{
  width: 178px;
  height: 135px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .sllxtj-content-item{
    width: 89px;
    line-height: 20px;
    .sllxtj-title{
        display: flex;
        flex-direction: row;
        align-items: center;
        span:nth-child(1){
           width: 7px;
            height: 7px;
            border-radius: 7px;
            margin-right: 4px;
        }
        span:nth-child(2){
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
            
        }
    }
    .sllxtj-value{
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        margin-left: 9px;
        margin-right: 3px;
    }
    .sllxtj-unit{
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
    }
  }
}
}

</style>


