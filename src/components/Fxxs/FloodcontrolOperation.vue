<template>
<!--防汛调度-->
<div class="FloodcO">
    <div class="FloodO-tab">
        <content-tab :tabList="tabListL" :tabIndex="tabIndexL" @tabChange="handleTabLeftChange"></content-tab>
        <!-- <content-tab :tabList="tabListR" :tabIndex="tabIndexR" @tabChange="handleTabRightChange"></content-tab> -->
    </div>
    
    <div class="FloodcO-raido">
        <ul class="FloodcO-raido-box" v-show="!ifShowDetail">
            <li class="FloodcO-raido-item"  v-for="(item,index) in radioList" :key="index" @click="handleRadioChange(item)" :class="item.id == raidoIndex?'radioCheck':''">
                <div class="floodcO-item-top"><span class="item-title">{{getCardName(item.model)}}</span><span>{{item.createTime == undefined?'--':item.createTime.substring(0,10)}}</span></div>
                <ul class="floodcO-content">
                    <li class="itemCommon">
                            <span class="itemName">输水隧洞状态：</span>
                            <span class="itemValue">{{item.gatestatus == 0?'关闭':'开启'}}</span>
                        </li>
                        <li class="itemCommon">
                            <span class="itemName">未来降雨量：</span>
                            <span class="itemValue">{{item.rainforcastperiod}}mm</span>
                        </li>
                        <li class="itemCommon">
                            <span class="itemName">&emsp;预热期长度：</span>
                            <span class="itemValue">{{item.warmup}}天</span>
                        </li>
                        <li class="itemCommon">
                            <span class="itemName">&emsp;&emsp;预见期：</span>
                            <span class="itemValue">{{item.forcastperiod}}h</span>
                        </li>
                        <li class="itemCommon" style="width:100%">
                            <span class="itemName">预报开始时间：</span>
                            <span class="itemValue">{{getTimeValue(item.forecasttime)}}</span>
                        </li>
                        <li class="itemCommon" style="width:100%">
                            <span class="itemName">&emsp;&emsp;开始时间：</span>
                            <span class="itemValue">{{getTimeValue(item.rainstarttime)}}</span>
                        </li>
                       
                </ul>
                <div class="floodcO-item-btn">
                    <span @click="handleDetail(item)">详情</span><span @click="startPlay(item)">预演</span>
                </div>
                
            </li>
        </ul>
    </div>
    <div class="FloodcO-raido-detail" v-show="ifShowDetail">
        <div class="detail-close"><span @click="handleCloseDetail"><i class="el-icon-close"></i></span></div>
        <div class="detail-top">
            <div class="detail-top-item"><span>开始时间：</span><span>2023-06-01</span></div>
            <div class="detail-top-item"><span>调度区域：</span><span>x x x x x x x x x x x</span></div>
            <div class="detail-top-item"><span>结束时间：</span><span>2023-06-01</span></div>
            <div class="detail-top-item"><span>调度模式：</span><span>x x x x x x x x x x x</span></div>
        </div>   
        <div class="detail-title"><span></span><span>调度信息</span></div> 
        <div class="detail-info">
            <div class="detail-info-item" v-for="(item,index) in infoList" :key="index"><span>{{item.name}}</span><span>{{item.value}}</span></div>
        </div> 
        <div class="detail-title"><span></span><span>闸门工况</span></div> 
        <div class="detail-table myTable" ref="table">
          <el-table
            :data="tableList"
            stripe
            style="width: 100%;"
            :height="tableHeight">
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
        </el-table>
        </div>
        <div class="detail-title"><span></span><span>调洪过程</span></div> 
        <div class="detail-echart"></div>
    </div>
</div>
</template>
    
<script>
import ContentTab from '../ContentTab.vue';
export default {
  name: "floodcO",
  props:{},
  components:{
    ContentTab
  },
  data(){
  return{
    tabListL:[
        {
            id:1,
            name:'王英水库'
        },
        {
            id:0,
            name:'蔡贤水库'
        }
    ],
    tabIndexL:1,//默认选中第一个
    tabListR:[
        {
            id:0,
            name:'灌区防洪'
        },
        {
            id:1,
            name:'灌区防洪'
        }
    ],
    tabIndexR:0,//默认选中第一个
    radioList:[
        {
            id:0,
            name:'调度方案1调度方案1调度方案1',
            date:'2023-05-09',
            ddly:'阳武干渠342段',
            qssw:"1.2m",
            zyl:'10.11mm',
            sjzm:'三河东节制闸',
            yxsj:'2H',
            qmsw:'1.5m',
            zgsw:'2.2m',
            bgUrl:require('../../assets/images/fxxs/card-normal.png'),
            checkBgUrl:require('../../assets/images/fxxs/card-checked.png')
        },{
            id:1,
            name:'调度方案2',
            date:'2023-05-09',
            ddly:'阳武干渠342段',
            qssw:"1.2m",
            zyl:'10.11mm',
            sjzm:'三河东节制闸',
            yxsj:'2H',
            qmsw:'1.5m',
            zgsw:'2.2m',
            bgUrl:require('../../assets/images/fxxs/card-normal.png'),
            checkBgUrl:require('../../assets/images/fxxs/card-checked.png')
        },{
            id:2,
            name:'调度方案3',
            date:'2023-05-09',
            ddly:'阳武干渠342段',
            qssw:"1.2m",
            zyl:'10.11mm',
            sjzm:'三河东节制闸',
            yxsj:'2H',
            qmsw:'1.5m',
            zgsw:'2.2m',
            bgUrl:require('../../assets/images/fxxs/card-normal.png'),
            checkBgUrl:require('../../assets/images/fxxs/card-checked.png')
        },{
            id:3,
            name:'调度方案4',
            date:'2023-05-09',
            ddly:'阳武干渠342段',
            qssw:"1.2m",
            zyl:'10.11mm',
            sjzm:'三河东节制闸',
            yxsj:'2H',
            qmsw:'1.5m',
            zgsw:'2.2m',
            bgUrl:require('../../assets/images/fxxs/card-normal.png'),
            checkBgUrl:require('../../assets/images/fxxs/card-checked.png')
        }
        
    ],
    raidoIndex:-1,
    ifShowDetail:false,//是否展示详情
    //调度信息数据
    infoList:[
        {
            name:'总雨量：',
            value:'--m'
        },{
            name:'起调水位：',
            value:'--m'
        },{
            name:'期末水位：',
            value:'--m'
        },{
            name:'最大流量：',
            value:'--m³/s'
        },{
            name:'最高水位：',
            value:'--m'
        },{
            name:'最小流量：',
            value:'--m³/s'
        },{
            name:'流量总值：',
            value:'--万m³'
        }
    ],
    tableHeight:'130px',
    tableList:[
        {
            name:'梧桐叶雨量站1',
            kd:'0.3',
            zqsw:12,
            zhsw:10,
            ll:'20',
        },{
            name:'梧桐叶雨量站2',
            kd:'0.3',
            zqsw:12,
            zhsw:10,
            ll:'20',
        }
    ],
    tableHead:[
            {
                key:'name',
                titleName:'闸门站点',
            },{
                key:'kd',
                titleName:'开度',
                width:'65'
            },{
                key:'zqsw',
                titleName:'闸前水位',
                width:'100'
            },{
                key:'zhsw',
                titleName:'闸后水位',
                width:'100'
            },{
                key:'ll',
                titleName:'流量',
                width:'65'
            }
    ],
  }
  },
  watch:{
    
  },
   mounted(){
    this.getSK_DDFZ()
  },
  methods:{
    getTimeValue(val){
        if(val !== null && val !== undefined){
            if(val.length > 16){
                return val.substring(0,16)
            }
            
        }
        return '--'
    },
      //请求水库调度方案
   getSK_DDFZ(){
    let that = this
    this.$api.fxxs.getFXXS_DDFA({}).then((res) => {
      // console.log(res)
      let result = res.data
      if(result){
        that.radioList = result

      }
    }).catch(() => {
            
    });
   },
   //获取调度方案名称
   getCardName(key){
    if(key == 'xaj'){
        return '新安江模型'
    }else if(key == 'hbv'){
        return 'HBV模型'
    }else{
        '--'
    }
   },
    handleTabLeftChange(item){
        let that = this
        that.tabIndexL = item.id
        that.raidoIndex = -1
        that.$bus.emit('showPlay',false)

    },
    handleTabRightChange(item){
        let that = this
        that.tabIndexR = item.id
        that.raidoIndex = -1
        that.$bus.emit('showPlay',false)

    },
    handleRadioChange(item){
        let that = this
        that.raidoIndex = item.id
    },
    //预演
    startPlay(item){
        let that = this
        //展示预演框
        that.$bus.emit('showPlay',true)
        //给预演列表设置数据
        item.type = that.tabIndexL
        that.$bus.emit('setPlayData',item)
    },
    //详情
    handleDetail(item){
        let that = this
        that.ifShowDetail = true
        that.getTableHeight()
    },
    //详情
    handleCloseDetail(){
        let that = this
        that.ifShowDetail = false
    },
    // getTableHeight() { //动态获取table1的高度
	// 	let that = this;
	// 	let height = window.getComputedStyle(that.$refs.table).height;
	// 	that.tableHeight = height;
	// },
   
  }
};
</script>
    
<style lang="less">
.FloodcO{
 width: 615px;
 height: 864px;
 position: relative;
 display: flex;
 flex-direction: column;
 align-items: center;
 .FloodO-tab{
    width: 601px;
    margin: 16px 7px 19px 7px;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
 }
 .FloodcO-raido{
    width: 602px;
    height: 794px;
    overflow-y: scroll;
    position: relative;
    .FloodcO-raido-box{
        
        display: flex;
        flex-direction: column;
        align-items: center;
         overflow: hidden;
         z-index: 1;
    }
    .radioCheck{
        background-image: url('../../assets/images/fxxs/card-checked.png') !important;
    }
    .FloodcO-raido-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        cursor: pointer;
        width: 602px;
        height: 245px;
        margin-top: 16px;
        margin-bottom: 5px;
        background-image: url('../../assets/images/fxxs/card-normal.png');
        background-size: 100% 100%;
        
        .floodcO-item-top{
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            margin-top: 10px;
            span:nth-child(1){
                font-size: 22px;
                width: 236px;
                font-family: Adobe Heiti Std;
                font-weight: normal;
                color: #E4F2FE;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin-right: 55px;
                text-align: center;
            }
            span:nth-child(2){
                font-size: 14px;
                font-family: Adobe Heiti Std;
                color: #E4F2FE;
                position: absolute;
                right: 136px;
            }
        }
        .floodcO-content{
            width: 552px;
            display: flex;
            margin-top: 15px;
            flex-direction: row;
             line-height: 38px;
             flex-wrap: wrap;
            // .floodcO-content-left{
            //     flex: 1.5;
            //     line-height: 38px;
            // }
            // .floodcO-content-right{
            //      flex: 1;
            //       line-height: 38px;
            // }
            .itemCommon{
                 width: 50%;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 20px;
                font-family: Adobe Heiti Std;
                font-weight: normal;
                color: #8BC2F2;
                .itemName{
                    // width: 100px;
                    text-align: right;
                }
                .itemValue{
                    flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }

        }
        .floodcO-item-btn{
            font-size: 24px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color: #2BF6FE;
            text-align: right;
            width: 552px;
            bottom: 14px;
            position: absolute;
            span:nth-child(1){
                margin-right: 40px;
                display: none;
            }
        }
        
    }
 }
 .FloodcO-raido-detail{
        width: 602px;
        height: 792px;
        background-color: rgba(0, 17, 26, 0.5);
        z-index: 2;
        position: absolute;
        left: 7px;
        top: 71px;
        display: flex;
        flex-direction: column;
        align-items: center;
    .detail-close{
        margin: 10px 10px 10px 0;
        display: flex;
        justify-content: right;
        width: 100%;
        span{
            display: block;
            width: 29px;
            height: 29px;
            line-height: 29px;
            border-radius: 50%;
            background-color: #050E13;
            border-color: #050E13;
            color: #01C7E5;
            text-align: center;
            cursor: pointer;
        }
    }
    .detail-top{
        width: 540px;
        height: 54px;
        background: rgba(0, 17, 26, 0.5);
        // background: red;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .detail-top-item{
            width: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
            span:nth-child(1){
                color: #8BC2F2;
            }
            span:nth-child(2){
                flex: 1;
                color: #FFFFFF;
                text-align: left;
            }
        }
    }
    .detail-title{
        width: 579px;
        height: 16px;
        background: linear-gradient(90deg, rgba(82,243,246,0.1) 0%, rgba(82,243,246,0) 100%);
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 30px;
        span:nth-child(1){
            width: 6px;
            height: 16px;
            background: #52F3F6;
        }
        span:nth-child(2){
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #52F3F6;
            margin-left: 8px;
        }
    }
    .detail-info{
        width: 564px;
        height: 85px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 10px;
        .detail-info-item{
            width: 33%;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
            span:nth-child(1){
                color: #8BC2F2;
                width: 80px;
                text-align: left;
            }
            span:nth-child(2){
                flex: 1;
                color: #FFFFFF;
                text-align: left;
            }
        }
    }
    .detail-table{
        width: 580px;
        height: 130px;
        margin-top: 20px;
    }
    .detail-echart{
        width: 580px;
        height: 230px;
        margin-top: 20px;
        background: #050E13;
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
    .el-table__body-wrapper{
        height: 86px !important;
    }
    
    }
}
</style>