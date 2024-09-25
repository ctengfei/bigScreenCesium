<template>
<div class="szyplanplay">
   <div class="szyplanplay-close">
      <span @click="handleClosePlay"><i class="el-icon-close"></i></span>
    </div>
    <div class="tablebox myTable">
<el-table
      ref="table"
          :data="tableList"
          stripe
          style="width: 100%;"
          height="166">
          <el-table-column  label="方案名称" align="center" width="250" prop="name">
          </el-table-column>
          <el-table-column  label="方案开始时间" align="center" prop="time">
          </el-table-column>
          <el-table-column  label="模拟时长" align="center" prop="timeLength" width="110">
          </el-table-column>
          <el-table-column  label="操作" align="center" width="110">
            <template slot-scope="scope">
                <p class="doPlay" @click="startPlay(scope.row)"><img src="../../assets/images/fxxs/play.png"/><span>开始模拟</span></p>
            </template>
          </el-table-column>
          
    </el-table>
    </div>
    
   
    

</div>
</template>
    
<script>
export default {
  name: "siteMonitor",
  props:{},
  components:{
  },
  created(){
    this.$bus.on('setSzyPlayData',(val) =>{
        val.timeLength = '3天14小时'
        val.time = '2022-08-20 08:00'
        val.name = val.allocName
        this.tableList = []
        this.tableList.push(val)
    })
  },
  data(){
  return{
    
    tableList:[
        {
            name:'2022年8月下旬供水调度方案预演',
            timeLength:'3天14小时',
            time:'2022-08-21 08:00',
        },{
             name:'2022年8月下旬供水调度方案预演2',
            timeLength:'3天14小时',
            time:'2022-08-20 08:00',
        }
    ],
    currentRow:null,
   
  }
  },
  watch:{
    
  },
  methods:{
 //关闭预演弹框
    handleClosePlay(){
      let that = this
      //关闭两侧内容，便于观察淹没分析
      that.$bus.$emit('closeTwoBox')
      that.$bus.emit('showSzyPlay',false)
      that.$bus.emit('clearFloodAnalysisy',that.currentRow)
      this.$bus.emit('removePoint','szyPointList')
    },
    //开始模拟
    startPlay(row){
      let that = this
      that.currentRow = row
      that.$bus.emit('floodAnalysisy',row)
      //关闭两侧内容，便于观察淹没分析
      that.$bus.$emit('closeTwoBox')
      this.$bus.emit('pcZZYDYCreateMarker')
      this.$bus.emit('szyShowDialg')
    },
  }
};
</script>
    
<style lang="less">
.szyplanplay{
 width: 615px;
 height: 166px;
 position: relative;

 .tablebox{
    width:615px;
    height: 166px;
    margin-top: 19px;
 }
 .doPlay{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span:nth-child(2){
        margin-left: 6px;
        color: #06F0ED;
    }
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
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: #60B0ED;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .el-table .cell{
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .el-table{
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: #8BC2F2 !important;
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
  padding: 10px 0 !important;
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
.szyplanplay-close {
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