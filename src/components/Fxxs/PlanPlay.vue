<template>
  <div class="planplay">
    <div class="planplay-close">
      <span @click="handleClosePlay"><i class="el-icon-close"></i></span>
    </div>
    <div class="tablebox myTable">
      <el-table
        ref="table"
        :data="tableList"
        stripe
        style="width: 100%"
        height="166"
      >
        <el-table-column
          label="方案名称"
          align="center"
          width="250"
          prop="name"
        >
        </el-table-column>
        <el-table-column label="方案开始时间" align="center" prop="time">
        </el-table-column>
        <el-table-column
          label="模拟时长"
          align="center"
          prop="timeLength"
          width="110"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="110">
          <template slot-scope="scope">
            <p class="doPlay" @click="startPlay(scope.row)">
              <img src="../../assets/images/fxxs/play.png" /><span
                >开始模拟</span
              >
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "siteMonitor",
  props: {},
  components: {},
  created() {
    this.$bus.on("setPlayData", (val) => {
      val.name = this.getCardName(val.model)
      val.timeLength = val.forcastperiod + 'h';
      val.time = val.forecasttime;
      this.tableList = [];
      this.tableList.push(val);
      this.currentRow = val;
      //请求详情
      this.getDDFAYB()
    });
  },
  data() {
    var start = new Date()
    var stop = new Date().getTime() + 24 * 60 * 60 * 1000
    return {
      tableList: [
        // {
        //   name: "2022年8月下旬供水调度方案预演",
        //   timeLength: "3天14小时",
        //   time: "2022-08-21 08:00",
        // },
        // {
        //   name: "2022年8月下旬供水调度方案预演2",
        //   timeLength: "3天14小时",
        //   time: "2022-08-20 08:00",
        // },
      ],
      currentRow:null,
      //王英的测试的预演淹没分析数据
      wytestPlayData:{
        startTime:start,
        endTime:new Date(stop),
        minIndex:63,
        maxIndex:71,
        type:1,
        dataList:[
        {
          time:'2023-08-26 08:00:00',
          sw:63.2
        },{
          time:'2023-08-26 08:00:00',
          sw:63.27
        },{
          time:'2023-08-26 08:00:00',
          sw:63.39
        },{
          time:'2023-08-26 08:00:00',
          sw:63.70
        },{
          time:'2023-08-26 08:00:00',
          sw:64.25
        },{
          time:'2023-08-26 08:00:00',
          sw:64.50
        },{
          time:'2023-08-26 08:00:00',
          sw:64.75
        },{
          time:'2023-08-26 08:00:00',
          sw:65.0
        },{
          time:'2023-08-26 08:00:00',
          sw:65.25
        },{
          time:'2023-08-26 08:00:00',
          sw:66.50
        },{
          time:'2023-08-26 08:00:00',
          sw:66.75
        },{
          time:'2023-08-26 08:00:00',
          sw:67.0
        },{
          time:'2023-08-26 08:00:00',
          sw:67.25
        },{
          time:'2023-08-26 08:00:00',
          sw:68.50
        },{
          time:'2023-08-26 08:00:00',
          sw:68.75
        },{
          time:'2023-08-26 08:00:00',
          sw:69.0
        },{
          time:'2023-08-26 08:00:00',
          sw:69.25
        },{
          time:'2023-08-26 08:00:00',
          sw:69.50
        },{
          time:'2023-08-26 08:00:00',
          sw:69.75
        },{
          time:'2023-08-26 08:00:00',
          sw:70.0
        },{
          time:'2023-08-26 08:00:00',
          sw:70.25
        },{
          time:'2023-08-26 08:00:00',
          sw:70.50
        },{
          time:'2023-08-26 08:00:00',
          sw:70.75
        },{
          time:'2023-08-26 08:00:00',
          sw:71.0
        },
      ]
      },
      //测试的预演淹没分析数据
      cxtestPlayData:{
        startTime:start,
        endTime:new Date(stop),
        minIndex:61,
        maxIndex:71,
        type:0,
        dataList:[
        {
          time:'2023-08-26 08:00:00',
          sw:61.4
        },{
          time:'2023-08-26 08:00:00',
          sw:61.9
        },{
          time:'2023-08-26 08:00:00',
          sw:62.39
        },{
          time:'2023-08-26 08:00:00',
          sw:62.9
        },{
          time:'2023-08-26 08:00:00',
          sw:63.4
        },{
          time:'2023-08-26 08:00:00',
          sw:64.3
        },{
          time:'2023-08-26 08:00:00',
          sw:64.9
        },{
          time:'2023-08-26 08:00:00',
          sw:65.0
        },{
          time:'2023-08-26 08:00:00',
          sw:65.25
        },{
          time:'2023-08-26 08:00:00',
          sw:66.50
        },{
          time:'2023-08-26 08:00:00',
          sw:66.75
        },{
          time:'2023-08-26 08:00:00',
          sw:67.0
        },{
          time:'2023-08-26 08:00:00',
          sw:67.25
        },{
          time:'2023-08-26 08:00:00',
          sw:68.50
        },{
          time:'2023-08-26 08:00:00',
          sw:68.75
        },{
          time:'2023-08-26 08:00:00',
          sw:69.0
        },{
          time:'2023-08-26 08:00:00',
          sw:69.25
        },{
          time:'2023-08-26 08:00:00',
          sw:69.50
        },{
          time:'2023-08-26 08:00:00',
          sw:69.75
        },{
          time:'2023-08-26 08:00:00',
          sw:70.0
        },{
          time:'2023-08-26 08:00:00',
          sw:70.25
        },{
          time:'2023-08-26 08:00:00',
          sw:70.50
        },{
          time:'2023-08-26 08:00:00',
          sw:70.75
        },{
          time:'2023-08-26 08:00:00',
          sw:71.0
        },
      ]
      },
    };
  },
  watch: {},
  methods: {
    getCardName(key){
      if(key == 'xaj'){
          return '新安江模型'
      }else if(key == 'hbv'){
          return 'HBV模型'
      }else{
          '--'
      }
   },
    //请求水库调度方案详情列表
    getDDFAYB(){
      let that = this
      let params ={
        glid:that.currentRow.id,
        stcd:that.currentRow.type == 0?'61608212':'61608180'
      }
      this.$api.fxxs.getFXXS_DDFAYB(params).then((res) => {
        // console.log('请求水库调度方案详情列表')
        let result = res.data
        if(result && result.length > 0){
          let start = result[0].time
          let startTime = new Date(start)
          let end = result[result.length-1].time
          let endTime = new Date(end)

          //蔡贤
          if(that.currentRow.type == 0){
            that.cxtestPlayData.startTime = startTime
            that.cxtestPlayData.endTime = endTime
            let diff = that.cxtestPlayData.maxIndex - that.cxtestPlayData.minIndex
            let steep = diff/result.length
            let cx = 0
            result.forEach(item =>{
              let sw = item.rz == null || item.rz == ''?63:item.rz
              // item.sw = parseFloat(sw)
              item.sw = that.cxtestPlayData.minIndex + steep * cx
              cx++
            })
            that.cxtestPlayData.dataList = result
          }else{
            //王英
            that.wytestPlayData.startTime = startTime
            that.wytestPlayData.endTime = endTime
            let diff = that.wytestPlayData.maxIndex - that.wytestPlayData.minIndex
            let steep = diff/result.length
            let wy = 0
            result.forEach(item =>{
              let sw = item.rz == null || item.rz == ''?63:item.rz
              // item.sw = parseFloat(sw)
              item.sw = that.wytestPlayData.minIndex + steep * wy
              wy++
            })
            that.wytestPlayData.dataList = result
          }

        }
      })
    },
    //关闭预演弹框
    handleClosePlay(){
      let that = this
      that.$bus.emit('showPlay',false)
      that.$bus.emit('clearSubmergeAnalysisy',that.currentRow)
      that.$bus.$emit('closeTwoBox',true)
    },
    //开始模拟
    startPlay(row){
      let that = this
      that.currentRow = row
      //打开预演结果
      that.$bus.emit('showPlayDetail',true)
      that.$bus.emit('setPlayDetail',row) 
      //开始淹没分析
      if(row.type == 0){
        that.$bus.emit('submergeAnalysisy',that.cxtestPlayData)
      }else{
        that.$bus.emit('submergeAnalysisy',that.wytestPlayData)
      }
      //关闭两侧内容，便于观察淹没分析
      that.$bus.$emit('closeTwoBox',false)
    },
  },
};
</script>
    
<style lang="less">
.planplay {
  width: 615px;
  height: 166px;
  position: relative;

  .tablebox {
    width: 615px;
    height: 166px;
    margin-top: 19px;
  }
  .doPlay {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span:nth-child(2) {
      margin-left: 6px;
      color: #06f0ed;
    }
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
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: normal;
      color: #60b0ed;
      padding-left: 5px !important;
      padding-right: 5px !important;
    }
    .el-table .cell {
      padding-left: 5px !important;
      padding-right: 5px !important;
    }
    .el-table {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: normal;
      color: #8bc2f2 !important;
    }
    .el-table tr,
    .el-table,
    .el-table__expanded-cell {
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
    .el-table--striped
      .el-table__body
      tr.el-table__row--striped
      td.el-table__cell {
      background-color: rgba(32, 118, 146, 0.2) !important;
    }
    .el-table__body tr:hover > td {
      background-color: transparent !important;
    }
    .el-table__empty-text {
      color: rgba(78, 162, 187, 0.5) !important;
    }
  }
  .planplay-close {
    margin: 10px 10px 10px 0;
    display: flex;
    justify-content: right;
    width: 100%;
    position: absolute;
    right: 0;
    top: -35px;
    span {
      display: block;
      width: 29px;
      height: 29px;
      line-height: 29px;
      border-radius: 50%;
      background-color: #050e13;
      border-color: #050e13;
      color: #01c7e5;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>