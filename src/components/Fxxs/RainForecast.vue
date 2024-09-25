<!--降雨预报-->
<template>
  <div class="planEpc">
    <div class="tablebox myTable">
      <dv-scroll-board :config="config" class="mytableBox" />
    </div>
  </div>
</template>

<script>
export default {
  name: "rainForecast",
  props: {},
  data() {
    return {
      config: {
        header: ['开始时间', '灌区防洪面雨量(mm)'],
        headerBGC: 'rgba(27, 101, 128, 0.5)',//表头背景色
        oddRowBGC: 'rgba(32,118,146,0.15)',//奇数行背景色
        evenRowBGC: 'rgba(32,118,146,0.0)',//偶数行背景色
        headerHeight: 30,//表头高度
        indexHeader: '序号',
        rowNum: 9,
        waitTime: 2000,
        data: [],
        columnWidth: [170, 100, 170, 170],
        align: ['center', 'center']
      },
    }
  },
  watch: {},
  mounted() {
    let tempConfig = {
      header: ['开始时间', '灌区防洪面雨量(mm)'],
      headerBGC: 'rgba(27, 101, 128, 0.5)',//表头背景色
      oddRowBGC: 'rgba(32,118,146,0.15)',//奇数行背景色
      evenRowBGC: 'rgba(32,118,146,0.0)',//偶数行背景色
      headerHeight: 30,//表头高度
      indexHeader: '序号',
      rowNum: 9,
      waitTime: 2000,
      data: [],
      align: ['center', 'center']
    };

    this.$api.fxxs.getFXXS_YUVAL().then(res => {
      if (res.success) {
        let threshol = 0;
        if (res.data.length) {
          const af = res.data[0];
          threshol = af.wv
        } else {
          threshol = 0
        }
        this.$api.fxxs.getFXXS_RAINVAL({WV: threshol}).then(res => {
          if (res.success) {
            res.data.forEach((r)=>{
              let item = []
              item = [r.tm1,r.areaRainfall]
              tempConfig.data.push(item)
            })
            this.config = tempConfig
          }
        })
      }
    })
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.planEpc {
  width: 615px;
  height: 380px;
  position: relative;
  margin-top: 10px;

  .tablebox {
    width: 615px;
    height: 380px;
  }

  .el-table .warning-row {
    color: #F10712 !important;
  }

  .el-table .normal-row {
    color: #0EB325;
  }

  .myTable {
    /****table格式 */

    .el-table td.el-table__cell,
    .el-table th.el-table__cell.is-leaf {
      border-bottom: none !important;
    }

    .el-table th.el-table__cell {
      background-color: rgba(27, 101, 128, 0.5) !important;
    }

    /**表格头部文字 */

    .el-table th.el-table__cell > .cell {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: normal;
      color: #8BC2F2;
      padding-left: 5px !important;
      padding-right: 5px !important;
    }

    .el-table .cell {
      padding-left: 5px !important;
      padding-right: 5px !important;
    }

    .el-table {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: normal;
      color: #E4F2FE !important;
    }

    .el-table tr,
    .el-table, .el-table__expanded-cell {
      background-color: transparent !important;
    }

    .el-table--scrollable-x .el-table__body-wrapper {
      overflow-x: hidden;
    }

    .el-table::before {
      height: 0px !important;
    }

    .el-table .el-table__cell {
      padding: 5px 0 !important;
    }

    .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
      background-color: rgba(32, 118, 146, 0.2) !important;
    }

    .el-table__body tr:hover > td {
      background-color: transparent !important;
    }

    .el-table__empty-text {
      color: rgba(78, 162, 187, 0.5) !important;
    }
  }

  .dv-scroll-board .header .header-item {
    font-size: 12px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #8BC2F2;
    white-space: normal;
    line-height: 12px !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px;
  }

  .ceil {
    font-size: 10px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #E4F2FE;
    padding: 0px 3px !important;

  }

  .index {
    background-color: transparent !important;
  }

  .mytableBox {
    width: 615px;
    height: 380px;
  }
}
</style>