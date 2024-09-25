<template>
<div class="ddsiteMpc" id="map">
    <div class="ddsiteMpc-search">
        <!-- <content-tab :tabList="tabList" :tabIndex="tabIndex" @tabChange="handleTabChange" class="ddsiteMpc-tab"></content-tab> -->
        <el-input v-model="tableSearchValue" placeholder="请输入搜索关键字" ></el-input>
        <div class="search-line"></div><div class="search-arrow"></div>
    </div>
    
    <content-radio :radioList="radioList" :radioIndex="radioIndex" class="ddsiteMpc-raido" @radioChange="handleRadioChange"></content-radio>
    <div class="tablebox myTable">
    <el-table
      ref="table"
          :data="tableList.filter(data => !tableSearchValue || data.name.toLowerCase().includes(tableSearchValue.toLowerCase()))"
          stripe
          style="width: 100%;"
          height="500"
          :cell-class-name="tableCellClassName">
          <el-table-column type="index" label="序号" align="center" width="80">
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
import ContentRadio from '../ContentRadioPC.vue';
import ContentTab from '../ContentTabPC.vue';
export default {
  name: "ddsiteMpconitor",
  props:{},
  components:{
    ContentTab,
    ContentRadio
  },
  data(){
  return{
    tabList:[
        {
            id:0,
            name:'灌区监测'
        },
        {
            id:1,
            name:'水库监测'
        }
    ],
    tabIndex:0,//默认选中第一个
    radioList:[
        {
            id:0,
            name:'水位',
            bgUrl:require('@/assets/images/fxxs/shuiwei.png'),
            checkBgUrl:require('@/assets/images/fxxs/shuiwei-check.png')
        },
        {
            id:1,
            name:'雨量',
            bgUrl:require('@/assets/images/fxxs/yuliang.png'),
            checkBgUrl:require('@/assets/images/fxxs/yuliang-check.png')
        },
        {
            id:2,
            name:'流量',
            bgUrl:require('@/assets/images/fxxs/liuliang.png'),
            checkBgUrl:require('@/assets/images/fxxs/liuliang-check.png')
        },
        {
            id:3,
            name:'水闸',
            bgUrl:require('@/assets/images/fxxs/shuizha.png'),
            checkBgUrl:require('../../assets/images/fxxs/shuizha-check.png')
        },
        {
            id:4,
            name:'水质',
            bgUrl:require('@/assets/images/fxxs/shuizhi.png'),
            checkBgUrl:require('@/assets/images/fxxs/shuizhi-check.png')
        },
        {
            id:5,
            name:'视频',
            bgUrl:require('@/assets/images/fxxs/shiping.png'),
            checkBgUrl:require('@/assets/images/fxxs/shiping-check.png')
        },
        {
            id:6,
            name:'泵站',
            bgUrl:require('@/assets/images/fxxs/bengzhan.png'),
            checkBgUrl:require('@/assets/images/fxxs/bengzhan-check.png')
        },
    ],
    radioIndex:0,
    tableList:[
        {
            name:'梧桐叶雨量站1',
            address:'新华北路',
            value1:12,
            value2:10,
            time:'2023-05-09',
            status:'异常'
        },{
            name:'梧桐叶雨量站2',
            address:'新华北路',
            value1:12,
            value2:10,
            time:'2023-05-09',
            status:'异常'
        },{
            name:'梧桐叶雨量站3',
            address:'新华北路',
            value1:8,
            value2:10,
            time:'2023-05-09',
            status:'正常'
        },{
            name:'梧桐叶雨量站4',
            address:'新华北路',
            value1:7,
            value2:10,
            time:'2023-05-09',
            status:'正常'
        }
    ],
    tableHead:[
        {
            key:'name',
            titleName:'站点名称',
        },{
            key:'address',
            titleName:'地址',
        },{
            key:'value1',
            titleName:'降雨量',
             width:'100'
        },{
            key:'value2',
            titleName:'警戒值',
            width:'100'
        },{
            key:'time',
            titleName:'监测时间',
             width:'130'
        },{
            key:'status',
            titleName:'状态',
            width:'80'
        },
    ],
    tableSearchValue:'',//列表查询关键字
  }
  },
  watch:{
    
  },
  methods:{
    handleTabChange(item){
        let that = this
        that.tabIndex = item.id
        that.radioIndex = 0
        that.tableSearchValue = ''

    },
    handleRadioChange(item){
        let that = this
        that.radioIndex = item.id
        that.tableSearchValue = ''
    },
    //表格单元格样式
    tableCellClassName({row, column, rowIndex, columnIndex}){
        if(row.value1>row.value2){
            return 'warning-row'
        }else{
            if(column.label == '状态'){
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
.ddsiteMpc{
 width: 400px;
 height: 357px;
 position: relative;
 display: flex;
 flex-direction: column;
 align-items: center;
 .ddsiteMpc-search{
     width: 372px;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 14px;
    position: relative;
    .ddsiteMpc-tab{
       margin-right: 12px;
    }
    .el-input__inner{
        height: 23px;
        line-height: 23px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
    }
    .search-line{
        position: absolute;
        width: 0px;
        height: 16px;
        border: 1px solid #207692;
        right: 44px;

    }
    .search-arrow{
        position: absolute;
        right: 26px;
        width: 0px;
        height: 0px;
        margin-top: 7px;
        border: 6px solid transparent;
        border-top-color: #18C2C7;

    }
 }
 
 .ddsiteMpc-raido{
    width: 358px;
    margin-top: 8px;
 }
 .tablebox{
   width:800px;
    height: 500px;
    margin-top: 15px;
 }
 .el-table .warning-row {
    color: #F10712 !important;
    font-weight: 600;
  }

  .el-table .normal-row {
    color: #0EB325;
  }
  .myTable{
    transform:scale(0.5);
    transform-origin: 1 0;
    margin-top: -106px;
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
    font-size: 24px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #8BC2F2;
    padding-left: 5px !important;
    padding-right: 5px !important;
    line-height: 33px;
  }
  .el-table .cell{
    padding-left: 5px !important;
    padding-right: 5px !important;
    
  }
  .el-table{
    font-size: 20px;
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
}
</style>