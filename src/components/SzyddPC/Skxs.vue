<!--水库需水预测-->
<template>
  <div class="skxspc_box">
    <!-- <content-tab
      :tabList="tabList"
      :tabIndex="tabIndex"
      @tabChange="handleTabChange"
      class="skxspc-tab"
    ></content-tab> -->
    <!-- 多条折线图 -->
    <ManyLineChart :echartsData="{option:monthLinkChart}" class="skxspcChart"/>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import ManyLineChart from "@/components/charts";
import ContentTab from '../ContentTabPC.vue';

var color = ['rgba(147, 232, 255, 1)', 'rgba(77, 137, 229, 1)', 'rgba(239, 155, 57, 1)', 'rgba(212, 84, 84, 1)', 'rgba(207, 81, 230, 1)']
var linecolor = ['rgba(147, 232, 255, 0.8)', 'rgba(77, 137, 229, 0.8)', 'rgba(239, 155, 57, 0.8)', 'rgba(212, 84, 84, 0.8)', 'rgba(207, 81, 230, 0.8)']
export default {
  components: {
    ManyLineChart,
    ContentTab,
  },
  data() {
    return {
      tabList: [
        {
          id: 0,
          name: "中长期预报",
        },
        {
          id: 1,
          name: "长期预报",
        },
      ],
      tabIndex: 0, //默认选中第一个
      legendData: [],
      xAxisData: [],
      seriesData: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      lsit5: []
    };
  },
  computed: {
    monthLinkChart() {
      return {
        tooltip: {
          trigger: "axis",
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以echarts 容器的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置

            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // echarts 容器大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = pointX+5;   // 此处需要判断 (pointX+5+boxWidth) < size.viewSize[0]
            } else { // 左边放的下
              x = pointX - boxWidth;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }

            return [x, y];
          }
        },
        legend: {
          //标记属性
          show: true,
          data: this.legendData,
          // data: ["城镇", "灌区","耗损","生态","泄洪"],
          orient: "horizontal", //标记排列显示
          top: 20, //标记位置
          right: 10, //标记位置
          icon: "rect",
          itemWidth: 10,
          itemHeight: 4,
          itemGap: 30,
          formatter: [
            //用富文本组件实现图例与文字对齐的关键是富文本的格式转换
            "{a|{name}}",
          ].join("\n"),
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 12,
            height: 16, //图例字体高度
            lineHeight: 16, //图例字体行高
            rich: {
              //用富文本组件实现图例与文字对齐
              a: {
                verticalAlign: "middle", //图例与文字对齐方式
              },
            },
          },
        },
        grid: {
          //绘图区调整
          left: 20,
          right: 10,
          bottom: 10,
          top: 50,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.xAxisData,
          //  data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'], //x轴数据
          axisLabel: {
            //坐标轴文字显示样式
            lineHeight: 15, //字体行高
            fontSize: 12,
            fontNum: 15, //每行显示字数
            rotate: 0, //文字旋转角度，0不旋转
            color: "rgba(255, 255, 255, 0.3)",
            interval: 0, //刻度间隔个数
          },
          axisLine: {
            //坐标轴线样式
            lineStyle: {
              color: "rgba(147, 232, 255, 0.1)",
              type: "solid",
            },
          },
          axisTick: {
            //x轴刻度设置
            alignWithLabel: true, //刻度线与点对齐
            length: 4, //刻度线的长度
            interval: 2, //刻度间隔个数
            show: true, // 不显示坐标轴刻度线
          },
        },
        yAxis: {
          name: "",
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(255, 255, 255, 0.3)",
              fontSize: "12",
            },
          },
          splitLine: {
            show: true, //是否显示网格线
            lineStyle: {
              // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
              color: "rgba(147, 232, 255, 0.1)",
              type: "dashed",
              dashOffset: 5,
            },
          },
          axisLine: {show: false}, //隐藏y轴
        },
        series: this.seriesData
      }
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.buildEchartSeries()
    // }, 500);

  },
  methods: {
    //构建echart模拟数据
    buildEchartSeries(val) {
      let that = this
      that.legendData = []
      that.xAxisData = []
      that.seriesData = []
      let params = {
        allocCode: val.allocCode,
        year: val.forecastSdate.split('-')[0]
      }
      this.$api.szydd.getXSList(params).then((res) => {
        if (res.code == 200) {
          let result = res.data
          console.log(res.data)
          let keyArray = Object.keys(result)
          for (let i = 0; i < keyArray.length; i++) {
            let key = keyArray[i]
            let item = result[key]
            that.xAxisData = Object.keys(item)
            let values = Object.values(item)
            let name = ''
            if (key == 'arg') {
              name = '农业'
            }
            if (key == 'urban') {
              name = '城乡'
            }
            if (key == 'eco') {
              name = '生态'
            }
            that.legendData.push(name)
            let seriesItem = {
              name: name,
              data: values,
              type: "line",
              color: color[i],
              showSymbol: false, //不显示圆点，hover时显示
              smooth: false, //折线变为曲线
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    type: 'dotted', //'dotted'虚线 'solid'实线
                  },
                },
              },
              lineStyle: {
                normal: {
                  color: linecolor[i],
                  shadowColor: color[i],
                  shadowBlur: 20,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  type: [8, 5],
                }
              },
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' 万m³';
                }
              },
            }
            that.seriesData.push(seriesItem)
          }
        }
      }).catch(() => {

      });
      //   this.list1 = []
      //  for(let j = 0;j< 12;j++){
      //       let value = Math.floor(Math.random()*20+1)
      //       this.list1.push(value)
      //  }
      //  this.list2 = []
      //  for(let j = 0;j< 12;j++){
      //       let value = Math.floor(Math.random()*20+1)
      //       this.list2.push(value)
      //  }
      //  this.list3 = []
      //  for(let j = 0;j< 12;j++){
      //       let value = Math.floor(Math.random()*20+1)
      //       this.list3.push(value)
      //  }
      //  this.list4 = []
      //  //生成象形图的数据
      //  for(let j = 0;j< 12;j++){
      //      let value = Math.floor(Math.random()*20+1)
      //       this.list4.push(value)
      //  }
      //  this.list5 = []
      //  for(let j = 0;j< 12;j++){
      //      let value = Math.floor(Math.random()*20+1)
      //       this.list5.push(value)
      //  }

    },
  },
};
</script>

<style lang="less">
.skxspc_box {
  width: 400px;
  height: 250px;
  position: relative;
  display: flex;
  flex-direction: column;

  .skxspc-tab {
    position: absolute;
    width: 170px;
    line-height: 23px;
    left: 18px;
    top: 10px;
    z-index: 1;
  }

  .skxspcChart {
    z-index: 0;
    width: 100%;
    height: 250px !important;
    margin-top: 10px;
  }

  .echarts-tooltip {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #4EA2BB;
  }

  .tooltipHang {
    display: flex;
    align-items: center;
    line-height: 20px;

    .point {
      width: 5px;
      height: 5px;
      border-radius: 5px;
      margin-right: 3px;
    }

    .itemValue,
    .itemName {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
    }

    .itemValue {
      width: 60px;
      text-align: right;
    }
  }
}
</style>