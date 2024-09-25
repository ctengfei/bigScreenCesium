<!--水库来水预测-->
<template>
  <div class="skls_box">
    <!-- <content-tab :tabList="tabList" :tabIndex="tabIndex" @tabChange="handleTabChange" class="skls-tab"></content-tab> -->
    <div class="skls-skinfo">
      <ul class="skls-plan">
        <li class="skls-planItem" v-for="(item,index) in planInfoKey" :key="index" >
          <span class="name">{{ item.titleName }}：</span>
          <span class="value">{{ currentPlan[item.key] || '--' }}</span>
        </li>
      </ul>
      <div class="sklsBtn" @click="handlePlan">切换方案</div>
    </div>
    <div class="box_item">
      <div class="box_itemName">来水预测</div>
      <!-- 3d柱状图 -->
      <BuildEletricCharts :echartsData="buildEletric" class="sklsChart"/>
    </div>
    <div class="box_item">
      <div class="box_itemName">需水预测</div>
      <Skxs ref="skxs"></Skxs>
      <!-- 3d柱状图 -->
      <!-- <BuildEletricCharts :echartsData="buildEletric" class="sklsChart"/> -->
    </div>
    <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        :modal-append-to-body='false'
        @close="dialogVisible = false"
        class="sklspcBox"
    >
      <template slot="title">
        <div style="display: flex">
          <h4 style="margin-bottom: 0;font-size: 17px">方案选择</h4>
        </div>
      </template>
      <div class="planbox sklsplanTable">
        <div class="planTable-search">
          <span class="search-name">方案选择：</span>
          <el-input v-model="planName" placeholder="请输入内容"></el-input>
          <span class="search-name zdsj">制定时间：</span>
          <el-date-picker
              v-model="planTime"
              popper-class='sklsPicker'
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
            height="435"
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
import BuildEletricCharts from "@/components/charts";
import ContentTab from '../ContentTab.vue';
import Skxs from '@/components/Szydd/Skxs.vue'
import {timeConvers} from '@/utils/tools.js'

let barWidth = 12;

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
      color: 'rgba(239, 155, 57, 0.5)',
    },
    {
      offset: 0.45,
      //   color: '#2B78CF',
      color: 'rgba(239, 155, 57, 0.5)',
    },
    {
      offset: 0.5,
      //   color: '#58AFFB',
      color: 'rgba(239, 155, 57, 0.5)',
    },
    {
      offset: 1,
      //   color: '#46A0FA',
      color: 'rgba(239, 155, 57, 0.5)',
    },
  ],
};
var kgslColor = {//可供水量用地3d柱状图柱子两个侧面的颜色
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      //   color: '#2B78CF',
      color: 'rgba(147, 232, 255, 0.5)',
    },
    {
      offset: 0.45,
      //   color: '#2B78CF',
      color: 'rgba(147, 232, 255, 0.5)',
    },
    {
      offset: 0.5,
      //   color: '#58AFFB',
      color: 'rgba(147, 232, 255, 0.5)',
    },
    {
      offset: 1,
      //   color: '#46A0FA',
      color: 'rgba(147, 232, 255, 0.5)',
    },
  ],
};
export default {
  components: {
    BuildEletricCharts,
    ContentTab,
    Skxs
  },
  data() {
    return {
      tabList: [
        {
          id: 0,
          name: '中长期预报'
        },
        {
          id: 1,
          name: '长期预报'
        }
      ],
      dialogVisible: false,//是否展示方案弹框
      tabIndex: 0,//默认选中第一个
      buildEletric: {
        option: {
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
            left: 23,
            right: 23,
            bottom: 12,
            top: 70,
            containLabel: true,
          },
          legend: {
            show: true,
            data: ["来水量"],
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
            // data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月'],
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
                fontSize: 20,
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
                fontSize: "22",
              },
            },
            axisTick: {
              textStyle: {
                color: "#fff",
                fontSize: "16",
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
                fontSize: "22",
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
              name: "来水量",
              type: "bar",
              barWidth: barWidth,
              // barGap: "0%",
              data: [10.43, 23, 25.14, 27.32, 59.9, 35.82, 29.19, 19.32, 0, 2.22, 0.39, 4.1],
              itemStyle: {
                normal: {
                  color: lslColor,
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
              name: "来水量",
              type: "pictorialBar",
              symbolPosition: "end",
              data: [10.43, 23, 25.14, 27.32, 59.9, 35.82, 29.19, 19.32, 0, 2.22, 0.39, 4.1],
              symbol: "rect",
              symbolOffset: ["0%", "-20%"],//底部切片位置，[x,y]
              symbolSize: [barWidth, 6],//底部切片尺寸，设置为0则不显示[宽，高]
              itemStyle: {
                normal: {
                  borderWidth: -5,
                  color: '#EF9B39',
                },
              },
              tooltip: {
                show: false,
              },
            },
          ],
        },
      },
      tableList: [],
      tableHead: [
        {
          key: 'allocName',
          titleName: '方案名称',
        },
        {
          titleName: '预报开始时间',
          key: 'forecastSdate',
        },
        {
          titleName: '预报结束时间',
          key: 'forecastEdate',
        },
        {
          titleName: '预报降水量(万m³)',
          key: 'wrainFall',
        },
        {
          titleName: '预报来水量(万m³)',
          key: 'wrunoff',
        },
        {
          key: 'createTime',
          titleName: '制定时间',
        }, {
          key: 'createBy',
          titleName: '制定人',
        }
      ],
      currentPlan: null,//当前选择的方案
      planInfoKey: [
        {
          key: 'allocName',
          titleName: '方案名称',
        }, {
          key: 'createBy',
          titleName: '制定人',
        },{
          key: 'createTime',
          titleName: '制定时间',
        },
        {
          titleName: '预报降水量(万m³)',
          key: 'wrainFall',
        },
        {
          titleName: '预报来水量(万m³)',
          key: 'wrunoff',
        },
      ],
      planName: '',//方案名称
      planTime: [],//方案时间
    }

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
        allocName: that.planName,
        startTime: starttime,
        endTime: endtime,
        pageSize: 500,
        pageNum: 1
      }
      that.$api.szydd.gePlanPageList(params).then((res) => {
        if (res.code == 200) {
          let list = res.data.data
          that.tableList = list
          if (list.length > 0 && that.currentPlan == null) {
            that.currentPlan = list[0];
            that.getLSEchartData()
            setTimeout(() => {
              that.$refs.skxs.buildEchartSeries(that.currentPlan)
            }, 500)

          }
        }
      }).catch(() => {

      });
    },
    //点击查询按钮
    handleSearchBtn() {
      this.getPlanList()
    },
    //获取来水echart数据
    getLSEchartData() {
      let that = this
      let xData = []
      let lslData = []
      let params = {
        "allocCode": that.currentPlan.allocCode,
        "planModule": that.currentPlan.planModule,
        "unitCode": 42022220001
      }
      this.$api.szydd.getLSList(params).then((res) => {
        if (res.code == 200) {
          let chartList = res.data.chartList
          chartList.forEach(item => {
            let key = item.name
            let jsl = item.rainfallValue || 0
            let lsl = item.runoffValue || 0
            xData.push(key)
            lslData.push(lsl)
          })
          that.buildEletric.option.xAxis.data = xData
          that.buildEletric.option.series[0].data = lslData
          that.buildEletric.option.series[1].data = lslData
        }
      }).catch(() => {

      });
    },
    //选择方案
    handleCurrentChange(val) {
      let that = this
      that.currentPlan = val;
      that.dialogVisible = false
      that.getLSEchartData()
      that.$refs.skxs.buildEchartSeries(that.currentPlan)
    },
    handlePlan() {
      this.dialogVisible = true
    },
    handleTabChange(item) {
      let that = this
      that.tabIndex = item.id
      that.radioIndex = 0
      that.tableSearchValue = ''

    },
  }
}
</script>

<style lang="less">
.skls_box {
  width: 615px;
  height: 360px;
  position: relative;

  .skls-tab {
    position: absolute;
    width: 260px;
    height: 35px;
    left: 20px;
    top: 15px;
    z-index: 1;
  }

  .skls-skinfo {
    width: 615px;
    height: 175px;
    margin-top: 10px;
    padding: 0 20px;

    .skls-plan {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      line-height: 28px;

      .skls-planItem {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #8BC2F2;

        .name {
          text-align: right;
        }

        .value {

        }
      }
    }

    .sklsBtn {
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
      top: 150px;
    }
  }

  .box_item {
    width: 615px;
    height: 340px;
    position: relative;

    .box_itemName {
      font-size: 22px;
      margin-left: 20px;
      margin-top: 20px;
      width: 280px;
      height: 22px;
      line-height: 22px;
      color: #52f3f6;
      background: linear-gradient(90deg,
      rgba(82, 243, 246, 0.3) 0%,
      rgba(82, 243, 246, 0) 100%);
      position: absolute;
    }
  }

  .sklsChart {
    z-index: 0;
    width: 615px;
    height: 340px;
  }

  .sklspcBox {
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

  .sklsplanTable {
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
}

.sklsPicker {
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