<!--水库来水预测-->
<template>
  <div class="slddjlpc_box">
    <!-- <content-tab :tabList="tabList" :tabIndex="tabIndex" @tabChange="handleTabChange" class="slddjlpc-tab"></content-tab> -->
    <div class="slddjlpc-top">
      <!-- <content-row-tab :tabList="rowTabList" :tabIndex="rowTabIndex" @rowTabChange="handleRowTabChange" class="content-title"></content-row-tab> -->
      <span class="content-total">总调度方案</span>
      <span class="content-value">{{tableList.length}}</span>
      <span class="content-unit">个</span>
    </div>
    <div class="tablebox myTable">
    <el-table
      ref="table"
          :data="tableList"
          stripe
          highlight-current-row
          style="width: 100%;"
          height="150"
          @current-change="handleCurrentChange">
          <el-table-column type="index" label="序号" align="center" width="40">
            <template slot-scope="scope"><div class="arrow" v-show="currentRow.allocCode == scope.row.allocCode"></div>{{ scope.$index +1 }}</template>
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
    </el-table>
    </div>
  </div>
</template>
 
<script>
import ContentRowTab from '../ContentRowTabPC.vue';
import ContentTab from '../ContentTabPC.vue';

export default {
components: {
    ContentTab,
    ContentRowTab
  },
  data () {
    return {
      tabList:[
        {
            id:0,
            name:'中长期预报'
        },
        {
            id:1,
            name:'长期预报'
        }
    ],
    rowTabList:[
        {
            id:0,
            name:'预演调度方案'
        },
        {
            id:1,
            name:'实际调度方案'
        }
    ],
    tabIndex:0,//默认选中第一个
    rowTabIndex:0,//默认选中第一个
    tableList:[],
    tableHead:[
        {
            key:'iimsAllocName',
            titleName:'方案名称',
        },{
            key:'wirrUser',
            titleName:'洪水量(万m³)',
            width:'100'
        },{
            key:'iimsWaterAllocationStartTime',
            titleName:'配水开始时间',
            width:'80'
        },{
            key:'iimsFormulateTime',
            titleName:'配水结束时间',
            width:'80'
        },
    ],
    currentRow:{},
    interval:null,
    }
  },
   beforeDestory(){
    console.log('清理定时器')
    clearInterval(this.interval);
  },
  mounted () {
    this.getPlanList()
  },
  methods: {
    //获取计划列表
    getPlanList(){
      let that = this
      let params = {
        pageSize:500,
        pageNum:1
      }
      this.$api.szydd.getGQPlanList(params).then((res) => {
        if(res.code == 200){
          let list = res.data
          that.tableList = list
        }
      }).catch(() => {
            
      }); 
    },
     handleTabChange(item){
        let that = this
        that.tabIndex = item.id
        that.rowTabIndex = 0

    },
    handleRowTabChange(item){
      let that = this
        that.rowTabIndex = item.id
    },
    handleCurrentChange(val){
      let that = this
       that.currentRow = val;
       //展示预演框
        that.$bus.emit('showSzyPlay',true)
        //给预演列表设置数据
        that.$bus.emit('setSzyPlayData',val)
    },
  }
}
</script>
 
<style lang="less" scope>
 .slddjlpc_box{
    width: 400px;
    height: 209px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .slddjlpc-tab{
      position: absolute;
      width: 170px;
      height: 23px;
      right: 20px;
      top: 10px;
      z-index: 1;
    }
  .slddjlpc-top {
    width: 386px;
    height: 23px;
    margin-top: 8px;
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
      width: 180px;
    }
    .content-total {
      font-size: 14px;
      font-weight: 800;
      // color: #93E8FF;
      color: #FFFFFF;
      flex: 1;
      text-align: left;
      margin-left: 10px;
    }
    .content-unit {
      font-size: 12px;
      font-weight: 400;
      color: #93E8FF;
      margin: 0px 19px 0 9px;
    }
    .content-value {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      margin-left: 13px;
    }
  }
  .tablebox{
    width:400px;
    height: 180px;
    margin-top: 4px;
    .arrow{
      width: 0;
      height: 0;
      border-left: 6px solid #5ADDE6;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      position: absolute;
      left: 0;
    }
    .showArrow{
      display: normal;
    }
      
    }

 .myTable{
    /****table格式 */
    .el-table td.el-table__cell, 
    .el-table th.el-table__cell.is-leaf{
      border-bottom: none ;
    }
 
  .el-table th.el-table__cell{
    background-color: rgba(27, 101, 128, 0.5) ;
  }
  /**表格头部文字 */
  .el-table th.el-table__cell>.cell{
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: #8BC2F2;
    padding-left: 2px ;
    padding-right: 2px ;
  }
  .el-table .cell{
    padding-left: 2px ;
    padding-right: 2px ;
    line-height: 13px;
  }
  .el-table{
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: normal;
    color: #E4F2FE ;
  }
  .el-table tr,
  .el-table, .el-table__expanded-cell{
    background-color: transparent ;
    cursor: pointer;
  }
.el-table--scrollable-x .el-table__body-wrapper{
  overflow-x:hidden;
}
.el-table::before{
  height: 0px ;
}
.el-table .el-table__cell{
  padding: 5px 0 ;
  
}
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
   background-color: rgba(32,118,146,0.2) ;
}
.el-table__body tr:hover > td{
     background-color:rgba(90, 221, 230, 0.1) !important;
     border-bottom: 2px solid #5ADDE6 !important;
 }
 .el-table tr.current-row{
    .el-table__cell{
      background-color:rgba(90, 221, 230, 0.3) !important;
      border-bottom: 2px solid #5ADDE6 !important;
    }
 }
 .el-table__empty-text{
  color: rgba(78, 162, 187, 0.5) ;
 }
}
 }
</style>