<!--调度点位实时监测-->
<template>
  <div class="siteMpc" id="map">
    <div class="siteMpc-search">
      <el-input v-model="tableSearchValue" placeholder="请输入搜索关键字" @input="getDataBySearch"></el-input>
      <div class="search-line"></div>
      <div class="search-arrow"></div>
    </div>
    <content-radio :radioList="radioList" :radioIndex="radioIndex" class="siteMpc-raido"
                   @radioChange="handleRadioChange"></content-radio>
    <div class="tablebox">
      <dv-scroll-board :config="config" class="mytableBox"/>
    </div>
  </div>
</template>

<script>
import ContentRadio from '../ContentRadioPC.vue';
import ContentTab from '../ContentTabPC.vue';

export default {
  name: "siteMonitor",
  props: {},
  components: {
    ContentTab,
    ContentRadio
  },
  data() {
    return {
      tabIndex: 0,//默认选中第一个
      radioList: [
        {
          id: 'PPS',
          name: '雨情',
          bgUrl: require('@/assets/images/fxxs/yuliang.png'),
          checkBgUrl: require('@/assets/images/fxxs/yuliang-check.png')
        },
        {
          id: 'SW',
          name: '水位',
          bgUrl: require('@/assets/images/fxxs/shuiwei.png'),
          checkBgUrl: require('@/assets/images/fxxs/shuiwei-check.png')
        },
        {
          id:'CZ',
          name:'垂直位移',
          bgUrl:require('@/assets/images/fxxs/liuliang.png'),
          checkBgUrl:require('@/assets/images/fxxs/liuliang-check.png')
        },
        {
            id:'SL',
            name:'渗流压力水位',
            bgUrl:require('@/assets/images/fxxs/shuizha.png'),
            checkBgUrl:require('../../assets/images/fxxs/shuizha-check.png')
        },
        {
            id:'SP',
            name:'水平位移',
            bgUrl:require('@/assets/images/fxxs/shuizhi.png'),
            checkBgUrl:require('@/assets/images/fxxs/shuizhi-check.png')
        },
      ],
      radioIndex: 'PPS',
      //表格配置
      config: {
        header: [],
        headerBGC: 'rgba(27, 101, 128, 0.5)',//表头背景色
        oddRowBGC: 'rgba(32,118,146,0.15)',//奇数行背景色
        evenRowBGC: 'rgba(32,118,146,0.0)',//偶数行背景色
        headerHeight: 30,//表头高度
        waitTime: 2000,
        index: false,
        data: [],
        columnWidth: [],
        align: []
      },
      tableList: [],
      allTableHead: {
        pptnStatisticsList: [
          {
            key: 'stName',
            titleName: '站点名称',
            width: '90'
          },
          {
            key: 'oneHourDrp',
            titleName: '1h(mm)',
            width: '90'
          },
          {
            key: 'oneDayDrp',
            titleName: '24h(mm)',
            width: '90'
          },
          {
            key: 'toDayDrp',
            titleName: '今日(mm)',
            width: '90'
          },
          {
            key: 'monthDrp',
            titleName: '本月(mm)',
            width: '90'
          },
          {
            key: 'monthDrp',
            titleName: '本年(mm)',
            width: '90'
          },
          {
            key: 'tm',
            titleName: '监测时间',
            width: '130'
          },
        ],
        rsvrRList: [
          {
            key: 'stName',
            titleName: '站点名称',
          },
          {
            key: 'rz',
            titleName: '水位(m)',
          },
          {
            key: 'fsltdz',
            titleName: '控制水位(m)',
          },
          {
            key: 'tm',
            titleName: '监测时间',
          },
        ],
        czList:[
          {
            key: 'damName',
            titleName: '大坝',
            width: '100'
          },
          {
            key: 'resName',
            titleName: '水库',
            width: '100'
          },
          {
            key: 'stCode',
            titleName: '测点',
            width:'60'
          },
          {
            titleName: '垂直位移',
            key: 'vrds',
            width:'60'
          },
          {
            titleName: '时间',
            key: 'tm',
          },
        ],
        slList:[
          {
            key: 'damName',
            titleName: '大坝',
            width: '100'
          },
          {
            key: 'resName',
            titleName: '水库',
            width: '100'
          },
          {
            key: 'stCode',
            titleName: '测点',
            width:'60'
          },
          {
            titleName: '温度(°)',
            key: 'temp',
          },
          {
            titleName: '渗流压力水位(m)',
            key: 'z'
          },
          {
            titleName: '时间',
            key: 'tm',
          }
        ],
        spList:[
          {
            key: 'damName',
            titleName: '大坝',
            width: '100'
          },
          {
            key: 'resName',
            titleName: '水库',
            width: '100'
          },
          {
            key: 'stCode',
            titleName: '测点',
            width:'60'
          },
          {
            titleName: 'X向水平位移',
            key: 'x',
          },
          {
            titleName: 'Y向水平位移',
            key: 'y',
          },
          {
            titleName: '时间',
            key: 'tm',
          }
        ]
      },
      tableSearchValue: '',//列表查询关键字
    }
  },
  watch: {},
  mounted() {
    let that = this
    that.getSiteList()
  },
  methods: {
    handleRadioChange(item) {
      let that = this
      that.radioIndex = item.id
      that.tableSearchValue = ''
      that.getSiteList()
    },
    //表格单元格样式
    tableCellClassName({row, column, rowIndex, columnIndex}) {
      if (row.value1 > row.value2) {
        return 'warning-row'
      } else {
        if (column.label == '状态') {
          if (row.value1 <= row.value2) {
            return 'normal-row'
          }
        }
      }
    },
    //获取监测列表
    getSiteList() {
      let that = this
      let type = "PPS"
      let dataKey = 'pptnStatisticsList'
      let x = 'stLat'
      let y = 'stLong'
      let code = 'stCode'
      let name = 'stName'
      switch (that.radioIndex) {
        case "SW"://水库水情
          type = "RR"
          dataKey = 'rsvrRList'
          break
        case "PPS"://雨情
          type = "PPS"
          dataKey = 'pptnStatisticsList'
          break
        case "CZ": //垂直位移
          type = "CZ"
          dataKey = 'czList'
          break
        case "SL": //渗流压力水位
          type = "SL"
          dataKey = 'slList'
          break
        case "SP": //水平位移
          type = "SP"
          dataKey = 'spList'
          break
      }
      if(type == 'CZ'){
        this.$api.fxxs.getFXXS_CZWY().then(res=>{
          if(res.success){
            let result = {
              czList:res.data
            }
            //组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态
            let tempconfig = {
              header: [],
              headerBGC: 'rgba(27, 101, 128, 0.5)',//表头背景色
              oddRowBGC: 'rgba(32,118,146,0.15)',//奇数行背景色
              evenRowBGC: 'rgba(32,118,146,0.0)',//偶数行背景色
              headerHeight: 30,//表头高度
              waitTime: 1000,
              data: [],
              columnWidth: [],
              align: []
            }
            that.tableList = result[dataKey] == null ? [] : result[dataKey]
            let tableHead = that.allTableHead[dataKey]
            let data = []
            that.resultData = [];//接口返回的全部列表数据
            that.resultHead = []
            that.resultColumn = []
            that.resultAlign = ['center']
            if (that.tableList.length == 0) {
              for (let j = 0; j < tableHead.length; j++) {
                let column = tableHead[j]
                let name = column.titleName
                let width = column.width == undefined ? 100 : column.width
                let key = column.key
                //获取表头数据
                that.resultHead.push(name)
                that.resultColumn.push(width)
                that.resultAlign.push('center')
              }
              tempconfig.header = that.resultHead
              tempconfig.columnWidth = 100
              tempconfig.data = []
              tempconfig.align = that.resultAlign
              that.config = tempconfig
            } else {
              for (let i = 0; i < that.tableList.length; i++) {
                let row = that.tableList[i]
                let rowValue = []
                for (let j = 0; j < tableHead.length; j++) {
                  let column = tableHead[j]
                  let name = column.titleName
                  let width = column.width == undefined ? 100 : column.width
                  let key = column.key
                  //获取表头数据
                  if (i == 0) {
                    that.resultHead.push(name)
                    that.resultColumn.push(width)
                    that.resultAlign.push('center')
                  }
                  let value = row[key]
                  if (key == 'tm') {
                    if (value !== null && value !== undefined) {
                      value = value.split(' ')[1]
                    } else {
                      value = '--'
                    }
                  }
                  rowValue.push(value)
                }
                data.push(rowValue)
              }
              tempconfig.header = that.resultHead
              tempconfig.columnWidth = that.resultColumn
              tempconfig.data = data
              tempconfig.align = that.resultAlign
              that.config = tempconfig
              that.resultData = data
            }
          }
        })
      }else if(type == 'SL'){
        this.$api.fxxs.getFXXS_SLSW().then(res=>{
          if(res.success){
            let result = {
              slList:res.data
            }
            //组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态
            let tempconfig = {
              header: [],
              headerBGC: 'rgba(27, 101, 128, 0.5)',//表头背景色
              oddRowBGC: 'rgba(32,118,146,0.15)',//奇数行背景色
              evenRowBGC: 'rgba(32,118,146,0.0)',//偶数行背景色
              headerHeight: 30,//表头高度
              waitTime: 1000,
              data: [],
              columnWidth: [],
              align: []
            }
            that.tableList = result[dataKey] == null ? [] : result[dataKey]
            let tableHead = that.allTableHead[dataKey]
            let data = []
            that.resultData = [];//接口返回的全部列表数据
            that.resultHead = []
            that.resultColumn = []
            that.resultAlign = ['center']
            if (that.tableList.length == 0) {
              for (let j = 0; j < tableHead.length; j++) {
                let column = tableHead[j]
                let name = column.titleName
                let width = column.width == undefined ? 100 : column.width
                let key = column.key
                //获取表头数据
                that.resultHead.push(name)
                that.resultColumn.push(width)
                that.resultAlign.push('center')
              }
              tempconfig.header = that.resultHead
              tempconfig.columnWidth = 100
              tempconfig.data = []
              tempconfig.align = that.resultAlign
              that.config = tempconfig
            } else {
              for (let i = 0; i < that.tableList.length; i++) {
                let row = that.tableList[i]
                let rowValue = []
                for (let j = 0; j < tableHead.length; j++) {
                  let column = tableHead[j]
                  let name = column.titleName
                  let width = column.width == undefined ? 100 : column.width
                  let key = column.key
                  //获取表头数据
                  if (i == 0) {
                    that.resultHead.push(name)
                    that.resultColumn.push(width)
                    that.resultAlign.push('center')
                  }
                  let value = row[key]
                  if (key == 'tm') {
                    if (value !== null && value !== undefined) {
                      value = value.split(' ')[1]
                    } else {
                      value = '--'
                    }
                  }
                  rowValue.push(value)
                }
                data.push(rowValue)
              }
              tempconfig.header = that.resultHead
              tempconfig.columnWidth = that.resultColumn
              tempconfig.data = data
              tempconfig.align = that.resultAlign
              that.config = tempconfig
              that.resultData = data
            }
          }
        })
      }else if(type == 'SP'){
        this.$api.fxxs.getFXXS_SPWY().then(res=>{
          if(res.success){
            let result = {
              spList:res.data
            }
            //组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态
            let tempconfig = {
              header: [],
              headerBGC: 'rgba(27, 101, 128, 0.5)',//表头背景色
              oddRowBGC: 'rgba(32,118,146,0.15)',//奇数行背景色
              evenRowBGC: 'rgba(32,118,146,0.0)',//偶数行背景色
              headerHeight: 30,//表头高度
              waitTime: 1000,
              data: [],
              columnWidth: [],
              align: []
            }
            that.tableList = result[dataKey] == null ? [] : result[dataKey]
            let tableHead = that.allTableHead[dataKey]
            let data = []
            that.resultData = [];//接口返回的全部列表数据
            that.resultHead = []
            that.resultColumn = []
            that.resultAlign = ['center']
            if (that.tableList.length == 0) {
              for (let j = 0; j < tableHead.length; j++) {
                let column = tableHead[j]
                let name = column.titleName
                let width = column.width == undefined ? 100 : column.width
                let key = column.key
                //获取表头数据
                that.resultHead.push(name)
                that.resultColumn.push(width)
                that.resultAlign.push('center')
              }
              tempconfig.header = that.resultHead
              tempconfig.columnWidth = 100
              tempconfig.data = []
              tempconfig.align = that.resultAlign
              that.config = tempconfig
            } else {
              for (let i = 0; i < that.tableList.length; i++) {
                let row = that.tableList[i]
                let rowValue = []
                for (let j = 0; j < tableHead.length; j++) {
                  let column = tableHead[j]
                  let name = column.titleName
                  let width = column.width == undefined ? 100 : column.width
                  let key = column.key
                  //获取表头数据
                  if (i == 0) {
                    that.resultHead.push(name)
                    that.resultColumn.push(width)
                    that.resultAlign.push('center')
                  }
                  let value = row[key]
                  if (key == 'tm') {
                    if (value !== null && value !== undefined) {
                      value = value.split(' ')[1]
                    } else {
                      value = '--'
                    }
                  }
                  rowValue.push(value)
                }
                data.push(rowValue)
              }
              tempconfig.header = that.resultHead
              tempconfig.columnWidth = that.resultColumn
              tempconfig.data = data
              tempconfig.align = that.resultAlign
              that.config = tempconfig
              that.resultData = data
            }
          }
        })
      } else {
        let params = {
          stName: '',
          stType: type,
          sourceType: type == 'PPS' ? 1 :''
        }
        this.$api.gqjc.getZHJC_SiteList(params).then((res) => {
          let result = res.data
          //组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态
          let tempconfig = {
            header: [],
            headerBGC: 'rgba(27, 101, 128, 0.5)',//表头背景色
            oddRowBGC: 'rgba(32,118,146,0.15)',//奇数行背景色
            evenRowBGC: 'rgba(32,118,146,0.0)',//偶数行背景色
            headerHeight: 30,//表头高度
            waitTime: 1000,
            data: [],
            columnWidth: [],
            align: []
          }
          if (result) {
            that.tableList = result[dataKey] == null ? [] : result[dataKey]
            let tableHead = that.allTableHead[dataKey]
            let data = []
            that.resultData = [];//接口返回的全部列表数据
            that.resultHead = []
            that.resultColumn = []
            that.resultAlign = ['center']
            if (that.tableList.length == 0) {
              for (let j = 0; j < tableHead.length; j++) {
                let column = tableHead[j]
                let name = column.titleName
                let width = column.width == undefined ? 100 : column.width
                let key = column.key
                //获取表头数据
                that.resultHead.push(name)
                that.resultColumn.push(width)
                that.resultAlign.push('center')
              }
              tempconfig.header = that.resultHead
              tempconfig.columnWidth = 100
              tempconfig.data = []
              tempconfig.align = that.resultAlign
              that.config = tempconfig
              // console.log(that.config)
            } else {
              for (let i = 0; i < that.tableList.length; i++) {
                let row = that.tableList[i]
                let rowValue = []
                for (let j = 0; j < tableHead.length; j++) {
                  let column = tableHead[j]
                  let name = column.titleName
                  let width = column.width == undefined ? 100 : column.width
                  let key = column.key
                  //获取表头数据
                  if (i == 0) {
                    that.resultHead.push(name)
                    that.resultColumn.push(width)
                    that.resultAlign.push('center')
                  }
                  let value = row[key]
                  if (key == 'tm') {
                    if (value !== null && value !== undefined) {
                      value = value.substring(5, 16)
                    } else {
                      value = '--'
                    }
                  }
                  rowValue.push(value)
                }
                data.push(rowValue)
              }
              tempconfig.header = that.resultHead
              tempconfig.columnWidth = that.resultColumn
              tempconfig.data = data
              tempconfig.align = that.resultAlign
              that.config = tempconfig
              that.resultData = data
            }
          } else {
          }
        })
      }
    },
    //根据查询关键字返回查询列表
    getDataBySearch(searchValue) {
      let that = this
      let tempList = []
      //组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态
      let tempconfig = {
        header: that.resultHead,
        headerBGC: 'rgba(27, 101, 128, 0.5)',//表头背景色
        oddRowBGC: 'rgba(32,118,146,0.15)',//奇数行背景色
        evenRowBGC: 'rgba(32,118,146,0.0)',//偶数行背景色
        headerHeight: 30,//表头高度
        waitTime: 1000,
        data: [],
        columnWidth: that.resultColumn,
        align: that.resultAlign
      }
      if (searchValue == null || searchValue.length == 0) {
        tempconfig.data = that.resultData
        that.config = tempconfig
      } else {
        that.resultData.forEach(item => {
          let name = item[0]
          if (name.includes(searchValue)) {
            tempList.push(item)
          }
        })
        tempconfig.data = tempList
        that.config = tempconfig
      }

    },
  }
};
</script>
<style lang="less" scoped>
::v-deep .siteMpc-raido{
  .contentRPC-raido-item{
    .item-title{
      white-space: nowrap;
    }
  }
}
</style>
<style lang="less">
.siteMpc {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 351px;

  .siteMpc-search {
    width: 372px;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 14px;
    position: relative;

    .siteMpc-tab {
      // width: 320px;
      margin-right: 12px;
    }

    .el-input__inner {
      height: 23px;
      line-height: 23px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
    }

    .search-line {
      position: absolute;
      width: 0px;
      height: 16px;
      border: 1px solid #207692;
      right: 44px;

    }

    .search-arrow {
      position: absolute;
      right: 26px;
      width: 0px;
      height: 0px;
      margin-top: 7px;
      border: 6px solid transparent;
      border-top-color: #18C2C7;

    }
  }

  .siteMpc-raido {
    width: 100%;
    margin-top: 8px;
  }

  .tablebox {
    width: 400px;
    height: 232px;
    margin-top: 15px;
  }

  .el-table .warning-row {
    color: #F10712 !important;
  }

  .el-table .normal-row {
    color: #0EB325;
  }

  .myTable {
    transform: scale(0.5);
    transform-origin: 1 0;
    margin-top: -107px;
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
      font-size: 24px;
      font-family: Adobe Heiti Std;;
      font-weight: normal;
      color: #8BC2F2;
      padding-left: 5px !important;
      padding-right: 5px !important;
      line-height: 33px;
    }

    .el-table .cell {
      padding-left: 5px !important;
      padding-right: 5px !important;

    }

    .el-table {
      font-size: 20px;
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
      padding: 10px 0 !important;
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

  .mytableBox {
    width: 400px;
    height: 232px;
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

  .tm {
    white-space: normal;
    overflow: initial;
    line-height: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
}
</style>