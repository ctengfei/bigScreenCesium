<template>
  <div class="PlanEvaluationEchartPC" v-loading='loading'>
    <div class="PlanEvaluationEchart-close">
      <span @click="handleClosePlayDetail"><i class="el-icon-close"></i></span>
    </div>
    <div class="PlanEvaluationEchart-title">
      <span></span><span>{{currentRow == null?'':currentRow[0]}}</span>
    </div>
    <div class="PlanEvaluationEchart-krEchart" v-for="(name,index ) in chanIds" :key="index">
      <!-- 折线图 -->
      <DayLinkRatioCharts :echartsData="{option:echartsList[index]}" />
    </div>
    <!-- <div class="PlanEvaluationEchart-title"><span></span><span>2+100</span></div> -->
    <!-- <div class="PlanEvaluationEchart-krEchart"> -->
      <!-- 折线图 -->
      <!-- <DayLinkRatioCharts :echartsData="{option:twoEchart}" /> -->
    <!-- </div>
    <div class="PlanEvaluationEchart-title"><span></span><span>3+100</span></div>
    <div class="PlanEvaluationEchart-krEchart"> -->
      <!-- 折线图 -->
      <!-- <DayLinkRatioCharts :echartsData="{option:threeEchart}" />
    </div> -->
  </div>
</template>
    
<script>
import * as echarts from 'echarts';
import DayLinkRatioCharts from "@/components/charts";
export default {
  name: "OperationDetail",
  props: {},
  components: {
    DayLinkRatioCharts
  },
  created() {
    
  },
  data() {
    return {
      loading:false,
      currentRow:null,
      chanIds:[],//流经号列表
      echartsList:[],//echart的option
    };
  },
   computed:{
   
  },
  watch: {},
  mounted(){
    this.$bus.on("setPlanEvaEchart", (val) => {
      this.currentRow = val
      this.getChanRealForecastResultList()
    });
  },
  methods: {
   //请求水库调度方案预报详情列表
   getChanRealForecastResultList(){
    let that = this
    that.loading = true
    let params ={
        caseCode:'DEFAULT',
        riverCode:1
      }
    this.$api.fxxs.getFXXS_GQDDFA_Monitor(params).then((res) => {
      // console.log('结果页面：请求水库调度方案详情列表')
       if(res.success){
        let result = res.data
        that.chanIds = Object.keys(result);
        that.chanIds.forEach(r=>{
          const data = result[r];
          let title = r;
          let line1 = data.map(r=>r.z); //水位
          let line2 = data.map(r=>r.q); //流量
          let x = data.map(r => r.tm);
          that.echartsList.push({
            title: {
              text: title,
              left:'100',
               textStyle: {
              color:'rgba(159,216,253,0.6)',
              fontSize:18,
              height:20,//图例字体高度
              lineHeight:22, //图例字体行高
            },
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
              },
              
            },
            grid: {
               //绘图区调整
            left:10,
            right:20,
            bottom:10,
            top:50,
            containLabel: true,
            },
            legend: {
               top:20, //标记位置
            left:70, //标记位置
              icon:'rect',
            itemWidth: 16,
            itemHeight:3,
            itemGap:16,
            formatter: [//用富文本组件实现图例与文字对齐的关键是富文本的格式转换
              '{a|{name}}'
            ].join('\n'),
            textStyle: {
              color:'rgba(159,216,253,0.6)',
              fontSize:18,
              height:20,//图例字体高度
              lineHeight:22, //图例字体行高
              rich:{//用富文本组件实现图例与文字对齐
                a:{
                  verticalAlign: 'middle'//图例与文字对齐方式
                }
              }
            },
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: x.map(function (str) {
                  return str.replace(' ', '\n');
                }),
                axisLabel: {
              //坐标轴文字显示样式
              lineHeight: 15, //字体行高
              fontSize:12,
              fontNum: 15, //每行显示字数
              rotate: 0, //文字旋转角度，0不旋转
              color:'rgba(255, 255, 255, 0.3)',
              // interval: 0//刻度间隔个数
            },
            axisLine: {//坐标轴线样式
              lineStyle: {
                color: 'rgba(147, 232, 255, 0.1)',
                type: 'solid',
              },
            },
            axisTick:{//x轴刻度设置
              alignWithLabel: true,//刻度线与点对齐
              length:4,//刻度线的长度
              // interval: 2,//刻度间隔个数
              show:true // 不显示坐标轴刻度线
            },
              }
            ],
            yAxis: [
              {
                name:'水位(m)',
                type: 'value',
                 axisLabel:{
              show: true,
              textStyle: {
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "12",
              },
            },
            splitLine: {
              show: true,//是否显示网格线
              lineStyle: {
                // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
                color: 'rgba(147, 232, 255, 0.1)',
                type: 'dashed',
                dashOffset: 5 ,
              }    
            },
            axisLine:{show:false},//隐藏y轴
              },
              {
                name:'流量(m³/s)',
                type: 'value',
                 axisLabel:{
              show: true,
              textStyle: {
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "12",
              },
            },
            splitLine: {
              show: true,//是否显示网格线
              lineStyle: {
                // textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
                color: 'rgba(147, 232, 255, 0.1)',
                type: 'dashed',
                dashOffset: 5 ,
              }    
            },
            axisLine:{show:false},//隐藏y轴
              }
            ],
            series: [
              {
                name:'水位',
                type: 'line',
                yAxisIndex: 0,
                 showSymbol: false,//不显示圆点，hover时显示
              smooth:true,//折线变为曲线
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' mm';
                  }
                },
                data: line1
              },
              {
                name:'流量',
                type: 'line',
                yAxisIndex: 1,
                 showSymbol: false,//不显示圆点，hover时显示
              smooth:true,//折线变为曲线
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' m';
                  }
                },
                data: line2
              }
            ]
          });
        })
       }
        that.loading = false
    }).catch(() => {
         that.loading = false
    });
   },
    //关闭预演结果弹框
    handleClosePlayDetail(row){
      let that = this
      that.$bus.emit('showPlanEvaEchart',false)
    },
  },
};
</script>
    
<style lang="less">
.PlanEvaluationEchartPC {
  width: 350px;
  height: 800px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
.el-loading-mask{
    background-color: rgba(9, 34, 57, 0.5);
  }
  .el-loading-spinner .el-loading-text{
    font-size: 18px !important;
  }
.PlanEvaluationEchart-krEchart{
   width: 350px;
  height: 250px;
}
  .PlanEvaluationEchart-close {
    margin: 10px 10px 10px 0;
    display: flex;
    justify-content: right;
    width: 100%;
    position: absolute;
    right: 0;
    top: -30px;
    span {
      display: block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      background-color: #050e13;
      border-color: #050e13;
      color: #01c7e5;
      text-align: center;
      cursor: pointer;
    }
  }
  .PlanEvaluationEchart-title {
    width: 330px;
    height: 14px;
    line-height: 14px;
    background: linear-gradient(
      90deg,
      rgba(82, 243, 246, 0.1) 0%,
      rgba(82, 243, 246, 0) 100%
    );
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    span:nth-child(1) {
      width: 4px;
      height: 14px;
      background: #52f3f6;
    }
    span:nth-child(2) {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #52f3f6;
      margin-left: 4px;
    }
  }
}
</style>