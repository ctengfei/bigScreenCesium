<!--监测站点运行状态-->
<template>
<div class="runstatuspc">
    <div class="chart-container">
        <!-- <div class="chart" ref="chart"></div> -->
        <RunstatusPie :echartsData="{option}" class="chart"/>
        <!-- 底座背景 -->
        <div class="bg"></div>
        
    </div>
    <div class="runstatuspc-content">
        <div class="runstatuspc-content-item" v-for="(item,index) in optionData" :key="index">
            <p class="runstatuspc-title"><span :style="{'background-color':color[index]}"></span><span>{{item.name}}</span></p>
             <div class="runstatuspc-value">{{item.value}}<span class="runstatuspc-lx" v-if="item.lx > 0">/{{item.lx}}</span></div>
        </div>

    </div>
</div>
  
</template>
 
<script>
import * as echarts from "echarts";
import "echarts-gl";
import RunstatusPie from "@/components/charts";
import { getPie3D, getParametricEquation } from "../../utils/pieChart.js"; //工具类js，页面路径自己修改

// const color = ["#93E8FF", "#DAF657", "#EF9B39", "#D45454","#7BE76F","#5779f6"];

export default {
  name: "chart",
  components: {
    RunstatusPie 
  },
  data() {
    return {
        color:["#93E8FF", "#DAF657", "#EF9B39", "#D45454","#7BE76F","#5779f6"],
      optionData: [
        {
          name: "闸门监测",
          value: 176,
          lx:12
        },
        {
          name: "水位站",
          value: 288,
          lx:2
        },
        {
          name: "视频点",
          value: 88,
          lx:5
        },
        {
          name: "雨量站",
          value: 78,
          lx:1
        },
        {
          name: "流量站",
          value: 98,
          lx:8
        },
        {
          name: "水质站",
          value: 108,
          lx:3
        },
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
    this.initChart();
    //根据窗口变化自动调节图表大小
    // const that = this;
    // window.onresize = function () {
    //   that.changeSize();
    // };
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
                fontSize: 12,
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
    //   this.statusChart = echarts.init(this.$refs.chart);
      // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
      this.option = getPie3D(this.optionData, 0.7, 180, 25, 30, 0.7);
    //   this.statusChart.setOption(this.option);
      // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
    //   this.option.series.push({
    //     name: "运行状态", //自己根据场景修改
    //     backgroundColor: "transparent",
    //     type: "pie",
    //     label: {
    //       opacity: 1,
    //       fontSize: 13,
    //       lineHeight: 20,
    //     },
    //     startAngle: -40, // 起始角度，支持范围[0, 360]。
    //     clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    //     radius: ["20%", "60%"],
    //     center: ["50%", "50%"],
    //     data: this.optionData,
    //     itemStyle: {
    //       opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
    //     },
    //   });
    //   this.statusChart.setOption(this.option);
    //   this.bindListen(this.statusChart);
    },
    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    // optionName是防止有多个图表进行定向option传递，单个图表可以不传，默认是opiton
    bindListen(myChart, optionName = "runstatuspc") {
      let selectedIndex = "";
      let hoveredIndex = "";
      // 监听点击事件，实现选中效果（单选）
      // myChart.on("click", (params) => {
      //   console.log(this[optionName].series[params.seriesIndex],'this[optionName].series[params.seriesIndex].pieStatus');
      //   // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      //   const isSelected =
      //     !this[optionName].series[params.seriesIndex].pieStatus.selected;
      //   const isHovered =
      //     this[optionName].series[params.seriesIndex].pieStatus.hovered;
      //   const k = this[optionName].series[params.seriesIndex].pieStatus.k;
      //   const startRatio =
      //     this[optionName].series[params.seriesIndex].pieData.startRatio;
      //   const endRatio =
      //     this[optionName].series[params.seriesIndex].pieData.endRatio;
      //   // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      //   if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
      //     this[optionName].series[selectedIndex].parametricEquation =
      //       getParametricEquation(
      //         this[optionName].series[selectedIndex].pieData.startRatio,
      //         this[optionName].series[selectedIndex].pieData.endRatio,
      //         false,
      //         false,
      //         k,
      //         this[optionName].series[selectedIndex].pieData.value
      //       );
      //     this[optionName].series[selectedIndex].pieStatus.selected = false;
      //   }
      //   // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      //   this[optionName].series[params.seriesIndex].parametricEquation =
      //     getParametricEquation(
      //       startRatio,
      //       endRatio,
      //       isSelected,
      //       isHovered,
      //       k,
      //       this[optionName].series[params.seriesIndex].pieData.value
      //     );
      //   this[optionName].series[params.seriesIndex].pieStatus.selected =
      //     isSelected;
      //   // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      //   selectedIndex = isSelected ? params.seriesIndex : null;
      //   // 使用更新后的 option，渲染图表
      //   myChart.setOption(this[optionName]);
      // });
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on("mouseover", (params) => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected =
              this[optionName].series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio =
              this[optionName].series[hoveredIndex].pieData.startRatio;
            endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
            k = this[optionName].series[hoveredIndex].pieStatus.k;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            this[optionName].series[hoveredIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                this[optionName].series[hoveredIndex].pieData.value
              );
            this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== "mouseoutSeries" &&
            params.seriesName !== "运行状态"
          ) {
            
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected =
              this[optionName].series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio =
              this[optionName].series[params.seriesIndex].pieData.startRatio;
            endRatio =
              this[optionName].series[params.seriesIndex].pieData.endRatio;
            k = this[optionName].series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            this[optionName].series[params.seriesIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                this[optionName].series[params.seriesIndex].pieData.value + 60
              );
            this[optionName].series[params.seriesIndex].pieStatus.hovered =
              isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(this[optionName]);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on("globalout", () => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = this[optionName].series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = this[optionName].series[hoveredIndex].pieStatus.k;
          startRatio = this[optionName].series[hoveredIndex].pieData.startRatio;
          endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          this[optionName].series[hoveredIndex].parametricEquation =
            getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[hoveredIndex].pieData.value
            );
          this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName]);
      });
    },
    // 自适应宽高
    changeSize() {
      this.statusChart.resize();
    },
  },
};
</script>
 
<style lang='less' scoped>
.runstatuspc{
  width: 400px;
  height: 178px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  .chart-container {
  position: relative;
  width: 222px;
  height:140px;
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
.runstatuspc-content{
  width: 178px;
  height: 135px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .runstatuspc-content-item{
    width: 89px;
    line-height: 20px;
    .runstatuspc-title{
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
    .runstatuspc-value{
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        margin-left: 12px;
        .runstatuspc-lx{
          color: rgb(212, 84, 84);
        }
    }
  }
}
}

</style>


