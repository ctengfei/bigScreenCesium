<template>
  <div class="zhjcsiteMPC" id="map">
    <div class="zhjcsiteMPC-search">
      <!-- <content-tab :tabList="tabList" :tabIndex="tabIndex" @tabChange="handleTabChange" class="zhjcsiteMPC-tab"></content-tab> -->
      <el-input v-model="tableSearchValue" placeholder="请输入搜索关键字" @input="getDataBySearch"></el-input>
      <div class="search-line"></div>
      <div class="search-arrow"></div>
    </div>

    <content-radio :radioList="radioList" :radioIndex="radioIndex" class="zhjcsiteMPC-raido"
                   @radioChange="handleRadioChange"></content-radio>
    <div class="tablebox">
      <dv-scroll-board :config="config" class="mytableBox" @click="handleRowClick"/>
    </div>
    <el-dialog  :visible="dialogVisible"
                 width="40%"
                 :title="dialogTitle"
                @close="closeDialog"
                 :modal-append-to-body="false"
                 class="dialogVideo"
    >
      <div class="videoBox" ref="videoBox">

      </div>
    </el-dialog>
  </div>
</template>

<script>
import ContentRadio from '../ContentRadioPC.vue';
import ContentTab from '../ContentTabPC.vue';
import Hls from 'hls.js'
import DPlayer from 'dplayer';
export default {
  name: "zhjcsiteMPConitor",
  props: {},
  components: {
    ContentTab,
    ContentRadio
  },
  watch: {},
  data() {
    return {
      dialogVisible:false,
      dialogTitle:'',
      levels:[
          {label:'Ⅰ类',value:'1'},
        {label:'Ⅱ类',value:'2'},
        {label:'Ⅲ类',value:'3'},
        {label:'Ⅳ类',value:'4'},
        {label:'Ⅴ类',value:'5'}
      ],
      tabList: [
        {
          id: 0,
          name: '水库监测'
        },
        {
          id: 1,
          name: '灌区监测'
        }
      ],
      tabIndex: 0,//默认选中第一个
      //雨量-PPS，水库水情-RR，渠道水情-ZZ，河道水情-ZQ，水闸-DD，水质-WQ，视频 -VD
      radioList: [
        {
          id: 'PPS',
          name: '雨量',
          bgUrl: require('@/assets/images/fxxs/yuliang.png'),
          checkBgUrl: require('@/assets/images/fxxs/yuliang-check.png')
        },
        {
          id: 'RR',
          name: '水库水情',
          bgUrl: require('@/assets/images/fxxs/shuiwei.png'),
          checkBgUrl: require('@/assets/images/fxxs/shuiwei-check.png')
        },
        {
          id: 'ZZ',
          name: '渠道',
          bgUrl: require('@/assets/images/fxxs/liuliang.png'),
          checkBgUrl: require('@/assets/images/fxxs/liuliang-check.png')
        },
        {
          id: 'ZQ',
          name: '河道水情',
          bgUrl: require('@/assets/images/fxxs/bengzhan.png'),
          checkBgUrl: require('@/assets/images/fxxs/bengzhan-check.png')
        },
        {
          id: 'DD',
          name: '水闸',
          bgUrl: require('@/assets/images/fxxs/shuizha.png'),
          checkBgUrl: require('../../assets/images/fxxs/shuizha-check.png')
        },
        {
          id: 'WQ',
          name: '水质',
          bgUrl: require('@/assets/images/fxxs/shuizhi.png'),
          checkBgUrl: require('@/assets/images/fxxs/shuizhi-check.png')
        },
        {
          id: 'VD',
          name: '视频',
          bgUrl: require('@/assets/images/fxxs/shiping.png'),
          checkBgUrl: require('@/assets/images/fxxs/shiping-check.png')
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
        indexHeader: '序号',
        rowNum: 9,
        waitTime: 2000,
        index: true,
        data: [],
        columnWidth: [],
        align: []
      },
      tableList: [
        {
          name: '梧桐叶雨量站1',
          address: '新华北路',
          value1: 12,
          value2: 10,
          time: '2023-05-09 10:00',
          status: '异常'
        }, {
          name: '梧桐叶雨量站2',
          address: '新华北路',
          value1: 12,
          value2: 10,
          time: '2023-05-09',
          status: '异常'
        }, {
          name: '梧桐叶雨量站3',
          address: '新华北路',
          value1: 8,
          value2: 10,
          time: '2023-05-09',
          status: '正常'
        }, {
          name: '梧桐叶雨量站4',
          address: '新华北路',
          value1: 7,
          value2: 10,
          time: '2023-05-09',
          status: '正常'
        }
      ],
      tableHead: [
        {
          key: 'name',
          titleName: '站点名称',
          // width:'120'
        }, {
          key: 'address',
          titleName: '地址',
        }, {
          key: 'value1',
          titleName: '降雨量',
          width: '100'
        }, {
          key: 'value2',
          titleName: '警戒值',
          width: '100'
        }, {
          key: 'time',
          titleName: '监测时间',
          width: '130'
        }, {
          key: 'status',
          titleName: '状态',
          width: '80'
        },
      ],
      allTableHead: {
        pptnStatisticsList: [
          {
            key: 'stName',
            titleName: '站点名称',
            width: '100'
          },
          {
            key: 'oneHourDrp',
            titleName: '1h',
            width: '90'
          },
          {
            key: 'oneDayDrp',
            titleName: '24h',
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
            key: 'yearDrp',
            titleName: '本年(mm)',
            width: '90'
          },
          {
            key: 'tm',
            titleName: '监测时间',
            width: '150'
          },
        ],
        rsvrRList: [
          {
            key: 'stName',
            titleName: '站点名称',
            width: '100'
          },
          {
            key: 'rz',
            titleName: '库上水位(m)',
            width: '100'
          }, {
            key: 'fsltdz',
            titleName: '控制水位(m)',
            width: '100'
          }, {
            key: 'tm',
            titleName: '监测时间',
            width: '130'
          },
        ],
        riverRList: [
          {
            key: 'stName',
            titleName: '站点名称',
            width: '100'
          },
          {
            key: 'z',
            titleName: '水位',
            width: '60'
          },
          {
            key: 'q',
            titleName: '流量(m³/s)',
            width: '80'
          },
          {
            key: 'tm',
            titleName: '监测时间',
            width: '130'
          },
        ],
        wagaList: [
          {
            key: 'stName',
            titleName: '站点名称',
            width: '110'
          }, {
            key: 'upz',
            titleName: '闸前水位(m)',
            width: '80'
          }, {
            key: 'tgtq',
            titleName: '总过闸流量(m³/s)',
            width: '100'
          }, {
            key: 'tm',
            titleName: '监测时间',
            width: '100'
          }
        ],
        awqmdDList: [
          {
            key: 'stName',
            titleName: '站点名称',
            width: '130'
          }, {
            key: 'dox',
            titleName: '溶解氧(mg/L)',
            width: '130'
          }, {
            key: 'ph',
            titleName: 'PH值',
            width: '80'
          }, {
            key: 'level',
            titleName: '水质等级',
            width: '120'
          },
          {
            key: 'wt',
            titleName: '水温(°)',
            width: '120'
          },
          {
            key: 'cond',
            titleName: '电导率(μS/cm)',
            width: '120'
          },
          {
            key: 'nh3n',
            titleName: '氨氮(mg/L)',
            width: '120'
          },
          {
            key: 'tm',
            titleName: '监测时间',
            width: '150'
          },
        ],
        wmstList: [
          {
            key: 'wmstName',
            titleName: '监视点名称',
            width: '200'
          },
          {
            key: 'wmstLoc',
            titleName: '所在位置',
            width: '100'
          },  {
            key: 'status',
            titleName: '状态',
            width: '80'
          },
        ],
        zzRiverRList: [
          {
            key: 'stName',
            titleName: '站点名称',
            width: '100'
          },
          {
            key: 'z',
            titleName: '水位(m)',
            width: '60'
          },
          {
            key: 'q',
            titleName: '流量(m³/s)',
            width: '80'
          },
          {
            key: 'tm',
            titleName: '监测时间',
            width: '130'
          },
        ],
      },
      tableSearchValue: '',//列表查询关键字
      testMarkeList: [
        {
          lat: 29.851127,
          lng: 114.768695,
          id: 'aaa',
          name: '水位点1',
          type: 'yj'
        },
        {
          lat: 29.851671,
          lng: 114.768942,
          id: 'bbb',
          name: '水位点2',
          type: 'gj'
        },
        {
          lat: 29.852094,
          lng: 114.76933,
          id: 'ccc',
          name: '水位点3',
          type: 'zc'
        },
        {
          lat: 29.852671,
          lng: 114.769763,
          id: 'ddd',
          name: '水位点4',
          type: 'zc2'
        },
        {
          lat: 29.853313,
          lng: 114.770176,
          id: 'eee',
          name: '水位点5',
          type: 'lx'
        },
        {
          lat: 29.853084,
          lng: 114.76983,
          id: 'fff',
          name: '水位点6',
          type: 'tx'
        },
      ],
      poinEntity: {},
      bottomTypes: 'PP',//底部菜单选中的类型字符串
      resultData: [],//接口返回的全部列表数据
      resultHead: [],
      resultColumn: [55],
      dplayer:null,
      resultAlign: ['center'],
    }
  },
  created() {
    let that = this
    this.$bus.on('zhjc', (val) => {
      // console.log('接收通知zhjc')
    })
    this.$bus.on('bottomChange', (val) => {
      that.bottomTypes = val
    })
  },
  mounted() {
    let that = this
    that.getSiteList()
  },
  methods: {
    closeDialog(){
      this.dialogVisible = false;
      this.dplayer.destroy();
      this.dplayer = null;
    },
    handleTabChange(item) {
      let that = this
      that.tabIndex = item.id
      that.radioIndex = 'PPS'
      that.tableSearchValue = ''
      that.getSiteList()
    },
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
    //雨量-PPS，水库水情-RR，河道水情-ZZ，流量-ZQ，水闸-DD，水质-WQ，视频 -VD
    getSiteList() {
      let that = this
      let type = "PPS"
      let dataKey = 'pptnStatisticsList'
      switch (that.radioIndex) {
        case "RR"://水库水情
          type = "RR"
          dataKey = 'rsvrRList'
          break
        case "PPS"://雨量
          type = "PPS"
          dataKey = 'pptnStatisticsList'
          break
        case "ZQ"://流量
          type = "ZQ"
          dataKey = 'riverRList'
          break
        case "DD"://水闸
          type = "DD"
          dataKey = 'wagaList'
          break
        case "WQ"://水质
          type = "WQ"
          dataKey = 'awqmdDList'
          break
        case "VD"://视频
          type = "VD"
          dataKey = 'wmstList'
          break
        case "ZZ"://渠道水情
          type = "ZZ"
          dataKey = 'zzRiverRList'
          break
      }
      let params = {
        stName: this.tableSearchValue,
        stType: type
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
          indexHeader: '序号',
          rowNum: 9,
          waitTime: 1000,
          index: true,
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
          that.resultColumn = [55]
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
            tempconfig.columnWidth = that.resultColumn
            tempconfig.data = []
            tempconfig.align = that.resultAlign
            that.config = tempconfig
            // console.log(that.config)
          } else {
            for (let i = 0; i < that.tableList.length; i++) {
              let row = that.tableList[i]
              row.type = type
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
                if(key == 'status'){
                  if(rowValue[2] == 1){
                    rowValue[2] = '在线'
                  }else{
                    rowValue[2] = '离线'
                  }
                }
                if(key == 'level'){
                  rowValue[3] = this.levels.find(r=>r.value == rowValue[3]).label;
                }
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
      }).catch(() => {
      });
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
        indexHeader: '序号',
        rowNum: 9,
        waitTime: 1000,
        index: true,
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
          if (name.indexOf(searchValue) !== -1) {
            tempList.push(item)
          }
        })
        tempconfig.data = tempList
        that.config = tempconfig
      }

    },
    //点了行数据
    handleRowClick({row, ceil, rowIndex, columnIndex}) {
      // console.log(row)
      // console.log(ceil)
      // console.log(rowIndex)
      // console.log(columnIndex)
      //底部菜单选中了该类型数据，说明地图上又相应的点
      if(this.radioIndex == 'VD'){
        this.dialogVisible = true;
        this.dialogTitle = row[1];
        const currRow = this.tableList.find(r=> r.wmstName == row[1]);
        this.$api.gqjc.getZHJC_Point_SP({
          protocol:'hls',
          dataSource:currRow.dataSource,
          wmstCode: currRow.wmstCode
        }).then(res=>{
          if(res.success){
            let hls = new Hls();
           this.dplayer = new DPlayer({
              container: this.$refs.videoBox,
              autoplay:true,
              live:true,
              video: {
                url: res.data,
                type: 'customHls',
                customType: {
                  customHls: function (video, player) {
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                  },
                },
              },
            });
            this.dplayer.on('pause', function () {
              hls && hls.stopLoad();
            });
            this.dplayer.on('play', function () {
              hls && hls.startLoad();
            });
            this.dplayer.on('destroy', function () {
              hls && hls.destroy();
            });
            this.dplayer.on('error',function () {
            })
          }
        })
      }
      if (this.bottomTypes.indexOf(this.radioIndex) !== -1) {
        let x = 'stLat'
        let y = 'stLong'
        let code = 'stCode'
        let name = 'stName'
        let type = 'PPS'
        switch (this.radioIndex) {
          case 'RR'://水位
            type = 'RR'
            x = 'stLat'
            y = 'stLong'
            code = 'stCode'
            name = 'stName'
            break
          case 'PPS'://雨量
            type = 'PPS'
            x = 'stLat'
            y = 'stLong'
            code = 'stCode'
            name = 'stName'
            break
          case 'ZQ'://河道
            type = 'ZQ'
            x = 'stLat'
            y = 'stLong'
            code = 'stCode'
            name = 'stName'
            break
          case 'DD'://水闸
            type = 'DD'
            x = 'stLat'
            y = 'stLong'
            code = 'stCode'
            name = 'stName'
            break
          case 'WQ'://水质
            type = 'WQ'
            x = 'stLat'
            y = 'stLong'
            code = 'stCode'
            name = 'stName'
            break
          case 'VD'://视频
            type = 'VD'
            x = 'wmstLat'
            y = 'wmstLong'
            code = 'wmstCode'
            name = 'wmstName'
            break
          case 'ZZ'://渠道水情
            type = 'ZZ'
            x = 'stLat'
            y = 'stLong'
            code = 'stCode'
            name = 'stName'
            break
        }
        let item = this.tableList[rowIndex]
        item.x = item[y]
        item.y = item[x]
        item.z = 1000
        item.code = item[code]
        item.type = type
        item.name = item[name]
        this.$bus.emit('onlyflyto', item)
        // this.$bus.emit('openSitePopu',item)
      } else {
        console.log('底部菜单没有选中该类型')
      }

    },
  }
};
</script>

<style lang="less">
.dialogVideo{
  margin-top: 140px;
  .el-loading-mask{
    background-color: rgba(9, 34, 57, 0.5);
  }
  .el-loading-spinner .el-loading-text{
    font-size: 20px !important;
  }
  .el-dialog {
    background: rgba(9, 34, 57, 0.75);
    margin-top: 9vh !important;
  }
  .el-dialog__title{
    color: #fff;
    font-weight: bold;
  }
  .el-dialog__body {
    padding-top: 0;
    position: relative;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: rgba(24, 194, 199, 1);
    font-size: 30px;
  }
  .videoBox{
    height: 550px;
    box-sizing: border-box;
  }
}
.zhjcsiteMPC {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 364px;

  .zhjcsiteMPC-search {
    width: 372px;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 14px;
    position: relative;

    .zhjcsiteMPC-tab {
      // width: 130px !important;
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

  .zhjcsiteMPC-raido {
    width: 395px;
    margin-top: 8px;
  }

  .tablebox {
    width: 400px;
    height: 245px;
    margin-top: 15px;
  }

  .el-table .warning-row {
    color: #F10712 !important;
  }

  .el-table .normal-row {
    color: #0EB325;
  }

  .mytableBox {
    width: 400px;
    height: 245px;
  }

  .myTable {
    transform: scale(0.5);
    transform-origin: 1 0;
    margin-top: -106px;
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