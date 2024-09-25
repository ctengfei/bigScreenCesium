<!--灌区供需-->
<template>
  <div class="gqgx_box">
    <div class="gqgx-skinfo">
      <ul class="gqgx-plan">
        <li class="gqgx-planItem" v-for="(item,index) in planInfoKey" :key="index" >
          <span class="name">{{ item.titleName }}：</span>
          <span class="value">{{ currentPlan[item.key] || '--' }}{{ item.unit }}</span>
        </li>
      </ul>
      <div class="gqgxBtn" @click="handlePlan">切换方案</div>
    </div>
    <div class="gqgxbox_item" style="height:340px;display: flex;flex-direction: column">
      <div class="box_itemName">灌溉水量</div>
      <!-- 3d柱状图 -->
      <div class="gqgxChart" ref="barChart">

      </div>
    </div>
    <div class="gqgxbox_item" style="height:390px;display: flex;flex-direction: column">
      <div style="display: flex;justify-content: space-between">
        <div class="box_itemName">灌溉流量</div>
        <el-select v-model="sels" placeholder="请选择" class="custom-select">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 3d柱状图 -->
      <div class="gqgxChart" ref="lineChart">

      </div>
    </div>

    <el-dialog
        :visible.sync="dialogVisible"
        width="35%"
        :modal-append-to-body='false'
        @close="dialogVisible = false"
        class="gqgxBox"
    >
      <template slot="title">
        <div style="display: flex">
          <h4 style="margin-bottom: 0;font-size: 17px">方案选择</h4>
        </div>
      </template>
      <div class="planbox gqgxplanTable">
        <div class="planTable-search">
          <span class="search-name">方案选择：</span>
          <el-input v-model="planName" placeholder="请输入内容"></el-input>
          <span class="search-name zdsj">制定时间：</span>
          <el-date-picker
              v-model="planTime"
              popper-class='gqgxPicker'
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
          <div class="searchBtn" @click="handleSearchBtn">查询</div>
        </div>
        <el-table
            ref="table"
            :data="tableList"
            stripe
            highlight-current-row
            style="width: 100%;"
            height="180"
            @current-change="handleCurrentChange">
          <template v-for="(item, index) in tableHead">
            <el-table-column
                :key="index"
                :label="item.titleName"
                :width="item.width"
                align="center"
            >
              <template slot-scope="scope">{{ scope.row[item.key] }}</template>
            </el-table-column>
          </template>
        </el-table>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import ContentTab from "../ContentTab.vue";
import {timeConvers} from '@/utils/tools.js'

export default {
  components: {
    ContentTab,
  },
  data() {
    return {
      gqBarOption: {
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
          bottom: 15,
          top: 15,
          containLabel: true,
        },
        legend: {
          show: false,
          data: ["灌溉水量(万m³)"],
          top: 20, //标记位置
          right: 23, //标记位置
          icon: 'circle',
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "22",
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
            name: "灌溉水量",
            type: "bar",
            barWidth: 13,
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
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 万m³';
              }
            },
          },
          {
            z: 3,
            name: "灌溉水量",
            type: "pictorialBar",
            symbolPosition: "end",
            data: [],
            symbol: "circle",
            symbolOffset: ["0%", "-20%"],//底部切片位置，[x,y]
            symbolSize: [13, 10],//底部切片尺寸，设置为0则不显示[宽，高]
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
      },
      gqlineOption:{
        tooltip: {
          trigger: "axis",
        },
        legend: {show:false},
        grid: {
          //绘图区调整
          left: 10,
          right: 10,
          bottom: 10,
          top: 15,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [],//x轴数据
          axisLabel: {
            //坐标轴文字显示样式
            lineHeight: 15, //字体行高
            fontSize: 20,
            // fontNum: 15, //每行显示字数
            rotate: 0, //文字旋转角度，0不旋转
            color: 'rgba(255, 255, 255, 0.3)',
          },
          axisLine: {//坐标轴线样式
            lineStyle: {
              color: 'rgba(147, 232, 255, 0.1)',
              type: 'solid',
            },
            textStyle: {
              color: "#000",
              fontSize: 20,
            },
          },
          axisTick: {//x轴刻度设置
            alignWithLabel: true,//刻度线与点对齐
            length: 4,//刻度线的长度
            interval: 2,//刻度间隔个数
            show: true // 不显示坐标轴刻度线
          },
        },
        yAxis: {
          name: '',
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(255, 255, 255, 0.3)",
              fontSize: "22",
            },
          },
          splitLine: {
            show: true,//是否显示网格线
            lineStyle: {
              // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
              color: 'rgba(147, 232, 255, 0.1)',
              type: 'dashed',
              dashOffset: 5,
            }
          },
          axisLine: {show: false},//隐藏y轴
        },
        series: [{
          name: '',
          data: [],
          type: "line",
          showSymbol: false,
          smooth: true,
          color: "rgba(23, 145, 255, 1)",
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(51, 196, 255, 0.30)",
              },
              {
                offset: 1,
                color: "rgba(23, 145, 255, 0)",
              },
            ]),
          },
          lineStyle: {
            color: "rgba(23, 145, 255, 1)",
          },
        }],
      },
      sels: '',
      options: [],
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
      chartLeng: ['一干渠', '二干渠', '三干渠'],
      list: [],
      list2: [],
      list22: [],
      list3: [],
      list33: [],
      dialogVisible: false,//是否展示方案弹框
      currentPlan: null,//当前选择的方案
      tableList: [],
      tableHead: [
        {
          key: 'iimsAllocName',
          titleName: '方案名称',
        }, {
          key: 'iimsWaterAllocationStartTime',
          titleName: '配水开始时间',
          width: '200'
        }, {
          key: 'wirrUser',
          titleName: '王英水库供水量(万m³)',
          width: '210'
        }, {
          key: 'iimsFormulateTime',
          titleName: '制定时间',
          width: '200'
        }, {
          key: 'iimsFormulateUserName',
          titleName: '制定人',
          width: '200'
        }
      ],
      planInfoKey: [
        {
          key: 'iimsAllocName',
          titleName: '方案名称',
          width: '60%',
          unit: ''
        }, {
          key: 'iimsFormulateUserName',
          titleName: '制定人',
          width: '40%',
          unit: ''
        }, {
          key: 'iimsFormulateTime',
          titleName: '制定时间',
          width: '60%',
          unit: ''
        }, {
          key: 'iimsWaterAllocationStartTime',
          titleName: '配水开始时间',
          width: '100%',
          unit: ''
        }, {
          key: 'wirrUser',
          titleName: '王英水库供水量',
          width: '100%',
          unit: '万m³'
        }
      ],
      planName: '',//方案名称
      planTime: [],//方案时间
      ggl_xAxisValues: [],//灌溉量x轴数据
      ggl_Values: [],//灌溉量数据
      ggll_xAxisValues: [],//灌溉流量x轴数据
      ggll_yAxisValues: [],//灌溉流量y轴数据
      ggll_Values: [],//灌溉流量数据
      ggll_series: [],
      ggll_lengenData: [],//流量图图例
      timeData: [],
    };
  },
  watch:{
    sels: function (val) {
      this.getggllEchart(val)
    },
  },
  mounted() {
    this.getPlanList()
  },
  methods: {
    //获取计划列表
    getPlanList() {
      let that = this
      let starttime = ''
      let endtime = ''
      if (this.planTime !== null && this.planTime.length > 0) {
        starttime = timeConvers(this.planTime[0], 'yyyy-MM-dd', 1)
        endtime = timeConvers(this.planTime[1], 'yyyy-MM-dd', 1)
      }
      let params = {
        iimsAllocName: that.planName,
        startTime: starttime,
        endTime: endtime,
      }
      that.$api.szydd.getGQPlanList(params).then((res) => {
        if (res.code == 200) {
          let list = res.data
          that.tableList = list
          if (list.length > 0 && that.currentPlan == null) {
            that.currentPlan = list[0]
            console.log(that.currentPlan)
            that.getggslEchart()
            that.getggllEchart()
          }
        }
      }).catch(() => {

      });
    },
    //点击查询按钮
    handleSearchBtn() {
      this.getPlanList()
    },
    //选择方案
    handleCurrentChange(val) {
      let that = this
      that.currentPlan = val;
      that.dialogVisible = false
      //  that.buildEchartSeries()
      that.getggslEchart()
      that.getggllEchart()
    },
    handlePlan() {
      this.dialogVisible = true
    },
    handleTabChange(item) {
      let that = this;
      that.tabIndex = item.id;
      that.radioIndex = 0;
      that.tableSearchValue = "";
      //重新请求echart数据
      that.buildEchartSeries()
    },
    //获取灌溉水量数据
    getggslEchart() {
      let that = this
      let params = {
        allocCode: that.currentPlan.allocCode,
        spChanCode: 'CT42120001'
      }
      that.$api.szydd.getWirrStatistics(params).then((res) => {
        if (res.code == 200) {
          let list = res.data
          const bar = echarts.init(this.$refs.barChart);
          let xData= []
          let data = []
          list.forEach(item => {
            data.push(item.wirr)
            xData.push(item.chanName)
          })
          console.log(bar)
          console.log(data)
          bar.setOption({
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
              bottom: 15,
              top: 15,
              containLabel: true,
            },
            legend: {
              show: false,
              data: ["灌溉水量(万m³)"],
              top: 20, //标记位置
              right: 23, //标记位置
              icon: 'circle',
              textStyle: {
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "22",
              },
            },
            xAxis: {
              data: xData,
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
                name: "灌溉水量",
                type: "bar",
                barWidth: 13,
                stack: 'cz',
                // barGap: "0%",
                data: data,
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
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 万m³';
                  }
                },
              },
              {
                z: 3,
                name: "灌溉水量",
                type: "pictorialBar",
                symbolPosition: "end",
                data: data,
                symbol: "circle",
                symbolOffset: ["0%", "-20%"],//底部切片位置，[x,y]
                symbolSize: [13, 10],//底部切片尺寸，设置为0则不显示[宽，高]
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
          })
        }
      })
    },
    //获取灌溉流量数据
    getggllEchart(oss) {
      let that = this
      let params = {
        allocCode: that.currentPlan.allocCode,
        spChanCode: 'CT42120001'
      }
      that.$api.szydd.getQirrStatistics(params).then((res) => {
        const line = echarts.init(this.$refs.lineChart);
        if (res.code == 200) {
          let result = Object.values(res.data)
          let dates = res.data;
          let timeData = [];
          let name = ''
          let data = []
          that.options = result.map(r => ({label: r[0].chanName, value: r[0].chanCode}))
          this.sels = oss || that.options[0].value;
          for (const resultKey in dates) {
            if (this.sels == resultKey) {
              dates[resultKey].forEach(r => {
                if (!timeData.includes(r.tm1)) {
                  timeData.push(r.tm1)
                }
                if (!timeData.includes(r.tm2)) {
                  timeData.push(r.tm2)
                }
                name = r.chanName;
                r['qirr1'] = r.qirr // 补结尾
                data.push(r.qirr)
                data.push(r.qirr1)
              })
            }
          }
          line.setOption({
            tooltip: {
              trigger: "axis",
            },
            legend: {show:false},
            grid: {
              //绘图区调整
              left: 10,
              right: 10,
              bottom: 10,
              top: 15,
              containLabel: true,
            },
            xAxis: {
              type: "category",
              boundaryGap: true,
              data: timeData,//x轴数据
              axisLabel: {
                //坐标轴文字显示样式
                lineHeight: 15, //字体行高
                fontSize: 20,
                // fontNum: 15, //每行显示字数
                rotate: 0, //文字旋转角度，0不旋转
                color: 'rgba(255, 255, 255, 0.3)',
              },
              axisLine: {//坐标轴线样式
                lineStyle: {
                  color: 'rgba(147, 232, 255, 0.1)',
                  type: 'solid',
                },
                textStyle: {
                  color: "#000",
                  fontSize: 20,
                },
              },
              axisTick: {//x轴刻度设置
                alignWithLabel: true,//刻度线与点对齐
                length: 4,//刻度线的长度
                interval: 2,//刻度间隔个数
                show: true // 不显示坐标轴刻度线
              },
            },
            yAxis: {
              name: '',
              type: "value",
              axisLabel: {
                show: true,
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)",
                  fontSize: "22",
                },
              },
              splitLine: {
                show: true,//是否显示网格线
                lineStyle: {
                  // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
                  color: 'rgba(147, 232, 255, 0.1)',
                  type: 'dashed',
                  dashOffset: 5,
                }
              },
              axisLine: {show: false},//隐藏y轴
            },
            series: [{
              name: name,
              data: data,
              type: "line",
              showSymbol: false,
              smooth: true,
              color: "rgba(23, 145, 255, 1)",
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(51, 196, 255, 0.30)",
                  },
                  {
                    offset: 1,
                    color: "rgba(23, 145, 255, 0)",
                  },
                ]),
              },
              lineStyle: {
                color: "rgba(23, 145, 255, 1)",
              },
            }],
          },true)
        }
      })
    },
  },
};
</script>

<style lang="less">
.custom-select {
  margin-top: 10px;

  .el-input__inner {
    height: 27px !important;
    line-height: 27px !important;
  }

  .el-input__icon {
    line-height: 27px !important;
  }
}

.gqgx_box {
  width: 615px;
  height: 470px;
  position: relative;

  .gqgx-tab {
    position: absolute;
    width: 260px;
    height: 35px;
    left: 20px;
    top: 15px;
    z-index: 1;
  }

  .gqgxChart {
    z-index: 0;
    flex: 1;
    height: auto;
  }

  .echarts-tooltip {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #4EA2BB;
  }

  .tooltipHang {
    display: flex;
    align-items: center;
    line-height: 36px;

    .point {
      width: 8px;
      height: 8px;
      border-radius: 8px;
      margin-right: 5px;
    }

    .itemValue,
    .itemName {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
    }

    .itemValue {
      width: 60px;
      text-align: right;
    }
  }

  .gqgx-skinfo {
    width: 615px;
    height: 120px;
    margin-top: 10px;
    padding: 0 20px;

    .gqgx-plan {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      line-height: 28px;

      .gqgx-planItem {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #8BC2F2;

        .name {

        }

        .value {

        }
      }
    }

    .gqgxBtn {
      width: 100px;
      height: 40px;
      background: linear-gradient(5deg, #092133 0%, #207692 100%);
      border-radius: 6px;
      font-size: 20px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #FFFFFF;
      text-align: center;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 100px;
    }
  }

  .gqgxBox {
    .el-dialog {
      background: rgba(9, 34, 57, 0.75)
    }

    .el-dialog__body {
      padding: 0;
      position: relative;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: rgba(24, 194, 199, 1);
      font-size: 30px;
    }

    .planbox {
      width: 100%;
      height: 500px;
    }

  }

  .gqgxplanTable {
    /****table格式 */

    .el-table td.el-table__cell,
    .el-table th.el-table__cell.is-leaf {
      border-bottom: none;
    }

    .el-table th.el-table__cell {
      background-color: rgba(27, 101, 128, 0.5);
    }

    /**表格头部文字 */

    .el-table th.el-table__cell > .cell {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: normal;
      color: #8BC2F2;
      padding-left: 5px;
      padding-right: 5px;
    }

    .el-table .cell {
      padding-left: 5px;
      padding-right: 5px;
      // line-height: 13px;
    }

    .el-table {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: normal;
      color: #E4F2FE;
    }

    .el-table tr,
    .el-table, .el-table__expanded-cell {
      background-color: transparent;
      cursor: pointer;
    }

    .el-table--scrollable-x .el-table__body-wrapper {
      overflow-x: hidden;
    }

    .el-table::before {
      height: 0px;
    }

    .el-table .el-table__cell {
      padding: 5px 0;

    }

    .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
      background-color: rgba(32, 118, 146, 0.2);
    }

    .el-table__body tr:hover > td {
      background-color: rgba(90, 221, 230, 0.1) !important;
      border-bottom: 2px solid #5ADDE6 !important;
    }

    .el-table tr.current-row {
      .el-table__cell {
        background-color: rgba(90, 221, 230, 0.3) !important;
        border-bottom: 2px solid #5ADDE6 !important;
      }
    }

    .el-table__empty-text {
      color: rgba(78, 162, 187, 0.5);
    }

    .planTable-search {
      color: #8BC2F2;
      font-size: 20px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      display: flex;
      align-items: center;
      padding: 5px 20px;
      margin-bottom: 10px;

      .search-name {
        margin-right: 5px;
      }

      .zdsj {
        margin-left: 20px;
      }

      .searchBtn {
        width: 90px;
        height: 40px;
        line-height: 40px;
        background: rgba(24, 194, 199, 1);
        border-radius: 3px;
        font-size: 20px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #FFFFFF;
        text-align: center;
        margin-left: 20px;
        cursor: pointer;
      }

      .el-input {
        width: 25%;
      }

      .el-input__inner {
        height: 40px;
        line-height: 40px;
      }

      .el-range-editor .el-range-input {
        color: #8BC2F2;
        background: transparent;
      }

      .el-date-editor .el-range__icon,
      .el-date-editor .el-range-separator {
        color: #8BC2F2;
        line-height: 25px;
      }

      input::-webkit-input-placeholder {
        /* 修改placeholder颜色  */
        color: #8BC2F2;
      }

    }
  }

  .gqgxbox_item {
    width: 615px;
    height: 365px;
    position: relative;

    .box_itemName {
      font-size: 22px;
      margin-left: 20px;
      margin-top: 10px;
      width: 280px;
      height: 22px;
      line-height: 22px;
      color: #52f3f6;
      background: linear-gradient(90deg,
      rgba(82, 243, 246, 0.3) 0%,
      rgba(82, 243, 246, 0) 100%);
    }
  }
}

.gqgxPicker {
  background: rgba(9, 34, 57, 0.75) !important;
  color: #ffffff !important;

  .el-date-table th {
    color: #ffffff;
  }

  .el-date-table td.in-range div,
  .el-date-table td.in-range div:hover,
  .el-date-table.is-week-mode .el-date-table__row.current div,
  .el-date-table.is-week-mode .el-date-table__row:hover div {
    background-color: rgba(24, 194, 199, 0.5);
  }

  .el-date-table td.end-date span, .el-date-table td.start-date span {
    background-color: rgba(24, 194, 199, 1);

  }

  .el-date-table td.today span {
    color: rgba(24, 194, 199, 1);
  }

  .el-date-table td.next-month, .el-date-table td.prev-month {
    // color:#606266;
  }
}
</style>