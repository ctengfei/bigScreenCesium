<template>
<div class="ddsiteM" id="map">
    <div class="ddsiteM-search">
        <!-- <content-tab :tabList="tabList" :tabIndex="tabIndex" @tabChange="handleTabChange" class="ddsiteM-tab"></content-tab> -->
        <el-input v-model="tableSearchValue" placeholder="请输入搜索关键字" ></el-input>
        <div class="search-line"></div><div class="search-arrow"></div>
    </div>
    
    <content-radio :radioList="radioList" :radioIndex="radioIndex" class="ddsiteM-raido" @radioChange="handleRadioChange"></content-radio>
    <div class="tablebox myTable">
    <!-- <el-table
      ref="table"
          :data="tableList.filter(data => !tableSearchValue || data.name.toLowerCase().includes(tableSearchValue.toLowerCase()))"
          stripe
          style="width: 100%;"
          height="300"
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
    <dv-scroll-board class="mytableBox" :config="config"  />
    </div>
    
   
    

</div>
</template>
    
<script>
import ContentRadio from '../ContentRadio.vue';
import ContentTab from '../ContentTab.vue';
export default {
  name: "ddsiteMonitor",
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
            width:'120'
        },{
            key:'address',
            titleName:'地址',
        },{
            key:'value1',
            titleName:'降雨量',
             width:'65'
        },{
            key:'value2',
            titleName:'警戒值',
            width:'65'
        },{
            key:'time',
            titleName:'监测时间',
             width:'100'
        },{
            key:'status',
            titleName:'状态',
            width:'60'
        },
    ],
    tableSearchValue:'',//列表查询关键字
    //表格配置
    config:{
      header: [],
      headerBGC:'rgba(27, 101, 128, 0.5)',//表头背景色
      oddRowBGC:'rgba(32,118,146,0.15)',//奇数行背景色
      evenRowBGC:'rgba(32,118,146,0.0)',//偶数行背景色
      headerHeight:50,//表头高度
      indexHeader:'序号',
      rowNum:6,
      waitTime:2000,
      index: true,
      data: [],
      columnWidth: [],
      align: []
    },
     tableList:[
        {
            name:'梧桐叶雨量站1',
            address:'新华北路',
            value1:12,
            value2:10,
            time:'2023-05-09 10:00',
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
    allTableHead:{
      pptnList:[
        {
            key:'stName',
            titleName:'站点名称',
            width:'100'
        },{
            key:'stLoc',
            titleName:'地址',
            width:'100'
        },{
            key:'dyp',
            titleName:'降雨量',
             width:'90'
        },{
            key:'value2',
            titleName:'警戒值',
            width:'90'
        },{
            key:'tm',
            titleName:'监测时间',
            width:'150'
        },{
            key:'status',
            titleName:'状态',
            width:'80'
        },
      ],
      wagaList:[
          {
              key:'stName',
              titleName:'站点名称',
              width:'110'
          },{
              key:'stLoc',
              titleName:'地址',
              width:'100'
          },{
              key:'dyp',
              titleName:'闸上水位(m)',
              width:'130'
          },{
              key:'supwptn',
              titleName:'闸上水势',
              width:'80'
          },{
              key:'value2',
              titleName:'警戒值',
              width:'90'
          },{
              key:'tm',
              titleName:'监测时间',
              width:'150'
          },{
              key:'status',
              titleName:'状态',
              width:'80'
          },
      ],
      awqmdDList:[
          {
              key:'stName',
              titleName:'站点名称',
              width:'130'
          },{
              key:'dox',
              titleName:'溶解氧(mg/L)',
              width:'130'
          },{
              key:'ph',
              titleName:'PH值',
              width:'80'
          },{
              key:'tn',
              titleName:'总氮(mg/L)',
              width:'120'
          },{
              key:'value2',
              titleName:'警戒值',
              width:'80'
          },{
              key:'tm',
              titleName:'监测时间',
              width:'150'
          },{
              key:'status',
              titleName:'状态',
              width:'80'
          },
      ],
      wmstList:[
          {
              key:'equName',
              titleName:'设备名称',
              width:'130'
          },{
              key:'ipAddr',
              titleName:'IP地址',
              width:'100'
          },{
              key:'wmstLoc',
              titleName:'所在位置',
              width:'200'
          },{
              key:'wmstName',
              titleName:'监视点名称',
              width:'150'
          },{
              key:'wmstType',
              titleName:'监视点类型',
              width:'100'
          },{
              key:'status',
              titleName:'状态',
              width:'80'
          },
      ],
      pumpList:[
          {
              key:'stName',
              titleName:'站点名称',
              width:'130'
          },{
              key:'stLoc',
              titleName:'地址',
              width:'200'
          },{
              key:'omcn',
              titleName:'开机台数',
              width:'80'
          },{
              key:'value2',
              titleName:'警戒值',
              width:'100'
          },{
              key:'tm',
              titleName:'监测时间',
              width:'150'
          },{
              key:'status',
              titleName:'状态',
              width:'80'
          },
      ],
    },
  }
  },
  watch:{
    
  },
   mounted(){
    let that = this
    that.scaleX = localStorage.getItem("scaleX");
    that.getSiteList()
  },
  methods:{
    handleTabChange(item){
        let that = this
        that.tabIndex = item.id
        that.radioIndex = 0
        that.tableSearchValue = ''
         that.getSiteList()
    },
    handleRadioChange(item){
        let that = this
        that.radioIndex = item.id
        that.tableSearchValue = ''
         that.getSiteList()
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
    //获取监测列表
     getSiteList(){
      let that = this
      let type = "PP"
      let dataKey = 'pptnList'
      switch (that.radioIndex){
        case 0://河道水文
          type = "ZQ"
          dataKey = 'riverRList'
          break
        case 1://雨量
          type = "PP"
          dataKey = 'pptnList'
          break
        case 2://流量
         type = "ZZ"
         dataKey = 'zzRiverRList'
          break
        case 3://水闸
         type = "DD"
         dataKey = 'wagaList'
          break
        case 4://水质
         type = "WQ"
         dataKey = 'awqmdDList'
          break
        case 5://视频
         type = "VD"
         dataKey = 'wmstList'
          break
        case 6://泵站
         type = "DP"
         dataKey = 'pumpList'
          break    
      }
      let params = {
        stName:'',
        stType:type
      }
      this.$api.gqjc.getZHJC_SiteList(params).then((res) => {
            let result = res.data
            //组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态
            let tempconfig ={
              header: [],
              headerBGC:'rgba(27, 101, 128, 0.5)',//表头背景色
              oddRowBGC:'rgba(32,118,146,0.15)',//奇数行背景色
              evenRowBGC:'rgba(32,118,146,0.0)',//偶数行背景色
              headerHeight:50,//表头高度
              indexHeader:'序号',
              rowNum:6,
              waitTime:10000,
              index: true,
              data: [],
              columnWidth: [],
              align: []
            }
            if(result){
              that.tableList = result[dataKey] == null?[]:result[dataKey]
              let tableHead = that.allTableHead[dataKey]
              let head = []
              let data = []
              let columnWidth = [70]
              let align  = ['center']
              if(that.tableList.length == 0){
                 for(let j = 0;j < tableHead.length;j++){
                  let column = tableHead[j]
                  let name = column.titleName
                  let width = column.width == undefined?100:column.width
                  let key = column.key
                  //获取表头数据
                   head.push(name)
                   columnWidth.push(width)
                   align.push('center')
                  }
                  tempconfig.header = head
                  tempconfig.columnWidth = columnWidth
                  tempconfig.data = data
                  tempconfig.align = align
                  that.config = tempconfig
                  console.log(that.config)
              }else{
                for(let i = 0;i < that.tableList.length;i++){
                let row =  that.tableList[i]
                let rowValue = []
                for(let j = 0;j < tableHead.length;j++){
                  let column = tableHead[j]
                  let name = column.titleName
                  let width = column.width == undefined?100:column.width
                  let key = column.key
                  //获取表头数据
                  if(i == 0){
                    head.push(name)
                    columnWidth.push(width)
                    align.push('center')
                  }
                  let value = row[key]
                  if(key == 'tm'){
                    value = "<div class='tm'>"+value+"</div>"
                  }
                  rowValue.push(value)
                }
                data.push(rowValue)
                }
                tempconfig.header = head
                tempconfig.columnWidth = columnWidth
                tempconfig.data = data
                tempconfig.align = align
                that.config = tempconfig
                console.log(that.config)
              }
              

            }
          }).catch(() => {
            
          });
    }, 
  }
};
</script>
    
<style lang="less">
.ddsiteM{
 width: 615px;
 height: 470px;
 position: relative;
 display: flex;
 flex-direction: column;
 align-items: center;
 .ddsiteM-search{
    width: 573px;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 21px;
    position: relative;
    .ddsiteM-tab{
        width: 400px;
        margin-right: 16px;
    }
    .el-input__inner{
        height: 35px;
        line-height: 35px;
        font-size: 19px;
        font-family: PingFangSC-Regular;
    }
    .search-line{
        position: absolute;
        width: 0px;
        height: 16px;
        border: 2px solid #207692;
        right: 66px;

    }
    .search-arrow{
        position: absolute;
        right: 35px;
        width: 0px;
        height: 0px;
        margin-top: 10px;
        border: 10px solid transparent;
        border-top-color: #18C2C7;

    }
 }
 
 .ddsiteM-raido{
    width: 573px;
    margin-top: 15px;
 }
 .tablebox{
    width:615px;
    height: 294px;
    margin-top: 32px;
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
    font-size: 18px;
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
    font-size: 16px;
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
.mytableBox{
        width:615px;
        height: 294px;
      }
    .dv-scroll-board .header .header-item{
      font-size: 16px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #8BC2F2;
      white-space: normal;
      line-height: normal !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
     }
     .ceil{
      font-size: 14px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #E4F2FE;
     }
     .index{
      background-color: transparent !important;
     }
     .tm{
  white-space: normal;
  overflow: initial;
  line-height: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
      height: 100%;
 }
}
</style>