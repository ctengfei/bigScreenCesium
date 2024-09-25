<!--水库来水预测-->
<template>
  <div class="ysltjpc_box">
    <div class="ysltjpc-top">
      <span class="content-title">今年截至目前已用水</span>
      <span class="content-value">{{ total }}</span>
      <span class="content-unit">万m³</span>
    </div>
    <!-- 3d柱状图 -->
    <Barchart :echartsData="{option:chartOption}" class="ysltjpcChart"/>
  </div>
</template>

<script>
import Barchart from "@/components/charts";

let barWidth = 13;
import * as echarts from 'echarts';

var lslColor = {//来水量3d柱状图柱子两个侧面的颜色
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      //   color: '#2B78CF',
      color: 'rgba(147, 232, 255, 1)',
    },
    {
      offset: 1,
      //   color: '#2B78CF',
      color: 'rgba(58, 159, 186, 0.7)',
    }
  ],
};
export default {
  components: {
    Barchart
  },
  data() {
    return {
      total: 0,//总用水量
      //用来构建数据的依据
      legendData: [{
        name: '农业',
        key: 'irrigateTotal',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(253, 239, 80, 0.5)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(253, 239, 80, 1)", // 100% 处的颜色
              }
            ]),
            opacity: 0.4
          },

        },
        symbolStyle: {
          normal: {
            borderWidth: -5,
            color: 'rgba(224, 240, 86, 0.3)',
          },
        }
      }, {
        name: '生态',
        key: 'ecologyTotal',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(99, 213, 95, 0.6)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(83, 181, 121, 0.9)", // 100% 处的颜色
              }
            ]),
            opacity: 0.4
          },

        },
        symbolStyle: {
          normal: {
            borderWidth: -5,
            color: 'rgba(111, 237, 105, 0.6)',
          },
        }
      }, {
        name: '发电',
        key: 'electricTotal',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(239, 155, 57, 0.5)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(239, 155, 57, 1)", // 100% 处的颜色
              }
            ]),
            opacity: 0.4
          },

        },
        symbolStyle: {
          normal: {
            borderWidth: -5,
            color: 'rgba(239, 155, 57, 0.6)',
          },
        }
      }, {
        name: '工业',
        key: 'floodTotal',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(222, 115, 83, 0.7)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(215, 80, 56, 0.9)", // 100% 处的颜色
              }
            ]),
            opacity: 0.4
          },

        },
        symbolStyle: {
          normal: {
            borderWidth: -5,
            color: 'rgba(212, 84, 84, 0.6)',
          },
        }
      }, {
        name: '城镇',
        key: 'townTotal',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(147, 232, 255, 0.5)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(147, 232, 255, 1)", // 100% 处的颜色
              }
            ]),
            opacity: 0.4
          },

        },
        symbolStyle: {
          normal: {
            borderWidth: -5,
            color: 'rgba(147, 232, 255, 0.3)',
          },
        }
      }],
      xAxisValues: [],//x轴数据

    }
  },
  computed: {
    chartOption() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", //鼠标悬停显示样式
            shadowStyle: {
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 2,
            },
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 5,
          top: 20,
          containLabel: true,
        },
        legend: {
          show: false,
          data: ["用水量"],
          top: 20, //标记位置
          right: 23, //标记位置
          icon: 'circle',
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "22",
          },
        },
        dataZoom: [{//展示不下时显示水平滚动条
          show: false,
          backgroundColor: "rgba(159,216,253,0.15)",
          borderRadius: 5,
          borderColor: "none",
          height: 3,
          startValue: 0, // 从头开始。
          endValue: 11, // 一次性展示n个。
          moveHandleIcon: "none",
          moveHandleSize: 10,
          zoomLock: true,
          brushSelect: false,
          showDataShadow: false,
          fillerColor: "#58AFFB",
          handleIcon: "path://M512,512m-448,0a448,448,0,1,0,896,0a448,448,0,1,0,-896,0Z",//滚动条圆角--官方推荐
          handleSize: "70%",
          handleColor: "#58AFFB",
          textStyle: {
            color: "transparent",
          },
          bottom: 2,
        }
        ],
        xAxis: {
          // data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
          data: this.xAxisValues,
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
              fontSize: 12,
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
          splitLine: {show: false},
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
              fontSize: "12",
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
              dashOffset: 5,
            },
          },
        },
        series: [
          {
            z: 1,
            name: "用水量",
            type: "bar",
            barWidth: barWidth,
            stack: 'cz',
            // barGap: "0%",
            data: [],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(58,159,186,0.7)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#93E8FF", // 100% 处的颜色
                  }
                ]),
                opacity: 0.4
              },

            },
          },
          {
            z: 3,
            name: "用水量",
            type: "pictorialBar",
            symbolPosition: "end",
            data: [],
            symbol: "circle",
            symbolOffset: ["0%", "-20%"],//底部切片位置，[x,y]
            symbolSize: [barWidth, 10],//底部切片尺寸，设置为0则不显示[宽，高]
            itemStyle: {
              normal: {
                borderWidth: -5,
                color: 'rgba(201, 244, 255, 0.6)',
              },
            },
            tooltip: {
              show: false,
            },
          },

        ],
      }
    },
  },
  mounted() {
    this.getWaterUseStatistics()
  },
  methods: {
    //构建柱状图data部分数据
    buildEchartSeries() {
      // console.log(this.legendData)
      this.chartOption.series = []
      //构建主要数据
      for (let i = 0; i < this.legendData.length; i++) {
        let item = this.legendData[i]
        let name = item.name
        let seriesItem = {
          z: i + 1,
          name: name,
          type: "bar",
          barWidth: barWidth,
          stack: 'ysl',
          // barGap: "0%",
          data: item.data,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 万m³';
            }
          },
          itemStyle: item.itemStyle,
        }
        this.chartOption.series.push(seriesItem)
      }
      // console.log('原数据')
      // console.log( this.chartOption.series)
      //构建立体效果数据-累加
      //还需要几组数据
      let num = this.legendData.length
      for (let count = 0; count < num; count++) {
        let otherSeries = []
        let colorIndex = 0//立体原型绘制什么颜色
        //每组数据有几个
        let total = this.legendData[0].data.length
        for (let j = 0; j < total; j++) {
          //将每种类型的前index个数据累加
          let value = 0
          let max = count + 1
          let ifAdd = false //数据是否增，不增加则不绘制立体色块
          let addx = 0
          for (let x = 0; x < max; x++) {
            let data = this.legendData[x].data
            let addValue = parseInt(data[j])
            value = value + addValue
            if (addValue > 0) {
              ifAdd = true
              addx = x
            }
          }
          // console.log("是否增加了数据："+ifAdd)
          //解决数据为0时不展示立体标识
          if (value == 0) {
            value = {value: 0, itemStyle: {opacity: 0}}
          } else {
            if (ifAdd && count > 0) {
              // console.log('第'+j+'个数据')
              let oldData = this.chartOption.series[this.chartOption.series.length - 1].data
              let oldValue = oldData[j].value
              // console.log('oldValue:'+oldValue +'   value:'+value)
              if (value > oldValue) {
                value = {value: value, itemStyle: this.legendData[addx].symbolStyle}
              } else {
                value = {
                  value: value, itemStyle: {
                    normal: {
                      color: 'rgba(0, 0, 0, 0)',
                    },
                  }
                }
              }

            }
          }
          otherSeries.push(value)
        }
        // console.log('合成'+count)
        // console.log(otherSeries)
        // console.log('----------------------------')
        let z = count + 1 + this.legendData.length
        let symbolSerie = {
          z: z,
          name: this.legendData[count].name,
          type: "pictorialBar",
          symbolPosition: "end",
          data: otherSeries,
          symbol: "circle",
          symbolOffset: ["0%", "-20%"],//底部切片位置，[x,y]
          symbolSize: [barWidth, 10],//底部切片尺寸，设置为0则不显示[宽，高]
          itemStyle: this.legendData[count].symbolStyle,
          tooltip: {
            show: false,
          },
        }
        this.chartOption.series.push(symbolSerie)
      }

    },
    //获取接口数据
    getWaterUseStatistics() {
      this.$api.szydd.getActualWaterUseStatistics().then((res) => {
        if (res.code == 200) {
          let result = res.data
          this.xAxisValues = []
          this.legendData.forEach(item => {
            item.data = []
          })
          if (result !== null && result !== undefined) {
            this.total = result.total
            let list = result.waterUseList
            //每月数据
            list.forEach(item => {
              let time = item.month.split('-')[1];
              let xValue = time + '月'
              this.xAxisValues.push(xValue)
              this.legendData.forEach(lengend => {
                let value = item[lengend.key]
                lengend.data.push(value)
              })
            })
            this.buildEchartSeries()
          }

        }

      }).catch(() => {

      });
    },
  }
}
</script>

<style lang="less">
.ysltjpc_box {
  width: 400px;
  height: 189px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .ysltjpc-top {
    width: 378px;
    height: 23px;
    line-height: 23px;
    margin-top: 9px;
    background-image: url('@/assets/images/common/rowBg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      text-align: center;
      display: block;
    }

    .content-title {
      font-size: 14px;
      font-weight: 800;
      color: #FFFFFF;
      margin-left: 10px;
    }

    .content-unit {
      font-size: 12px;
      font-weight: 400;
      color: rgba(147, 232, 255, 0.8);
      margin: 0px 19px 0 9px;
    }

    .content-value {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      margin-left: 6px;
      flex: 1;
      text-align: right;
    }
  }

  .ysltjpcChart {
    z-index: 0;
  }
}
</style>