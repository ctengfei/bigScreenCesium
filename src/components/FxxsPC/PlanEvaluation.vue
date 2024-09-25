<!--预案方案评价-->
<template>
<div class="planEpc">
   
    <div class="tablebox myTable">
    <!-- <el-table
      ref="table"
          :data="tableList"
          stripe
          style="width: 100%;"
          height="289"
          :cell-class-name="tableCellClassName">
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
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
    </el-table> -->
    <dv-scroll-board :config="config" class="mytableBox"  @click="handleTableClick"/>
    </div>
    
   
    

</div>
</template>
    
<script>
import pqPointJson from '../map/FxxsJs/PQPointJson.json'
export default {
  name: "siteMonitor",
  props:{},
  components:{
  },
  data(){
  return{
     //表格配置
    config:{
      header: ['方案名称','方案开始时间','方案结束时间','计算步长(s)'],
      headerBGC:'rgba(27, 101, 128, 0.5)',//表头背景色
      oddRowBGC:'rgba(32,118,146,0.15)',//奇数行背景色
      evenRowBGC:'rgba(32,118,146,0.0)',//偶数行背景色
      headerHeight:30,//表头高度
      indexHeader:'序号',
      rowNum:9,
      waitTime:2000,
      // index: true,
      // data: [
      //   ['<span style="color:#F10712;">方案名称1</span>','<span style="color:#F10712;">122</span>','<span style="color:#F10712;">150</span>','<span style="color:#F10712;">水量超限</span>'],
      //   ['<span style="color:#F10712;">方案名称1</span>','<span style="color:#F10712;">122</span>','<span style="color:#F10712;">150</span>','<span style="color:#F10712;">水量超限</span>'],
      //     ['方案名称3','122','150','<span style="color:#0EB325;">方案名称1</span>'],
      //      ['方案名称4','122','150','<span style="color:#0EB325;">方案名称1</span>'],
      // ],
      data:[],
      columnWidth: [170,100,170,170],
      align: ['center','center','center','center','center']
    },
    tableList:[
        {
            name:'梧桐叶雨量站',
            address:'新华北路',
            value1:12,
            value2:10,
            time:'2023-05-09',
            status:'水量超限'
        },{
            name:'梧桐叶雨量站',
            address:'新华北路',
            value1:12,
            value2:10,
            time:'2023-05-09',
            status:'水量超限'
        },{
            name:'梧桐叶雨量站',
            address:'与实际相符',
            value1:8,
            value2:10,
            time:'2023-05-09',
            status:'与实际相符'
        },{
            name:'梧桐叶雨量站',
            address:'新华北路',
            value1:7,
            value2:10,
            time:'2023-05-09',
            status:'与实际相符'
        }
    ],
    tableHead:[
        {
            key:'name',
            titleName:'方案名称',
        },{
            key:'value1',
            titleName:'预案调度水量',
        },{
            key:'value2',
            titleName:'实际调度水量',
        },{
            key:'status',
            titleName:'评价',
        },
    ],
  }
  },
  watch:{
    
  },
  mounted(){
    this.getDDFA()
  },
  methods:{
    //获取调度方案
   getDDFA(){
    let that = this
    let tempConfig = {
      header: ['方案名称','方案开始时间','预报期','计算步长(s)'],
      headerBGC:'rgba(27, 101, 128, 0.5)',//表头背景色
      oddRowBGC:'rgba(32,118,146,0.15)',//奇数行背景色
      evenRowBGC:'rgba(32,118,146,0.0)',//偶数行背景色
      headerHeight:30,//表头高度
      indexHeader:'序号',
      rowNum:9,
      waitTime:2000,
      data:[],
      columnWidth: [170,100,170,170],
      align: ['center','center','center','center','center']
    }
    let params ={}
    this.$api.fxxs.getFXXS_GQDDFA(params).then((res) => {
      let result = res.data
      if(result && result.length > 0){
        result.forEach(element => {
          let item = []
          let caseName = element.caseName
          let forecastInterval = element.forecastInterval
          let forecastPeriod = element.forecastPeriod
          let forecastStartTime = element.forecastSTime
          //let forecastEndTime = element.forecastETime
          item = [caseName,forecastStartTime,forecastPeriod,forecastInterval]
          tempConfig.data.push(item)
        });
      }
      that.config = tempConfig
    }).catch(() => {
            
    });
   },
   //表格点击Item。预演
   handleTableClick({row,ceil,rowIndex,columnIndex}){
    // this.$bus.emit('showPlanEvaEchart',true)
    // this.$bus.emit('setPlanEvaEchart',row)
    // this.$bus.$emit('closeTwoBox')
    // //关闭淹没分析特效
    // this.$bus.emit('showPlay',false)
    // this.$bus.emit('clearSubmergeAnalysisy',{})
    // //绘制片区点位
    // this.getPQPointList()
   },
   //获取片区的点位信息
   getPQPointList(){
    // console.log('片区点位信息')
    // console.log(pqPointJson)
    let pointList = Object.values(pqPointJson)
    this.$bus.emit('fxxsPQPoint',pointList)
   },
    //表格单元格样式
    tableCellClassName({row, column, rowIndex, columnIndex}){
        if(row.value1>row.value2){
            return 'warning-row'
        }else{
            if(column.label == '评价'){
                if(row.value1 <= row.value2){
                    return 'normal-row'
                }

            }

        }

    },
  }
};
</script>
    
<style lang="less">
.planEpc{
 width: 400px;
 height: 289px;
 position: relative;
 margin-top: 10px;
 .tablebox{
    width:400px;
    height: 289px;
    
 }
 
 .el-table .warning-row {
    color: #F10712 !important;
  }

  .el-table .normal-row {
    color: #0EB325;
  }
  .myTable{
    /****table格式 */
    .el-table td.el-table__cell, 
    .el-table th.el-table__cell.is-leaf{
      border-bottom: none !important;
    }
 
  .el-table th.el-table__cell{
    background-color: rgba(27, 101, 128, 0.5) !important;
  }
  /**表格头部文字 */
  .el-table th.el-table__cell>.cell{
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: #8BC2F2;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .el-table .cell{
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .el-table{
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: #E4F2FE !important;
  }
  .el-table tr,
  .el-table, .el-table__expanded-cell{
    background-color: transparent !important;
  }
.el-table--scrollable-x .el-table__body-wrapper{
  overflow-x:hidden;
}
.el-table::before{
  height: 0px !important;
}
.el-table .el-table__cell{
  padding: 5px 0 !important;
}
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
   background-color: rgba(32,118,146,0.2) !important;
}
.el-table__body tr:hover > td{
     background-color:transparent !important;
 }
 .el-table__empty-text{
  color: rgba(78, 162, 187, 0.5) !important;
 }
}
 .dv-scroll-board .header .header-item{
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
 .ceil{
  font-size: 10px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #E4F2FE;
  padding: 0px 3px !important;
 
 }
 .index{
  background-color: transparent !important;
 }
 
 .mytableBox{
    width:400px;
    height: 289px;
  }
}
</style>