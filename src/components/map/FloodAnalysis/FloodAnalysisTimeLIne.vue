<template>
  <div :id="id" class="floodAT">
    <div class="floodAT-btn" @click="handleStartOrendClick">{{btnText}}</div>
    <el-slider class="floodAT-slider" 
              v-model="timeIndex" 
              :format-tooltip="formatTooltip" 
              tooltip-class="sliderTooltip"
              :max="maxIndex"
              :min="minIndex"
              :step="speed">
    </el-slider>
    <div class="floodAT-hour">{{totalHour}}h</div>
  </div>
</template>
 
<script>
export default {
  name: "FloodAnalysisTimeLine",
  data() {
    return {
      id:'',
      ifStart:true,
      btnText:'暂停',
      timeIndex:0,//时间轴指针
      totalHour:16,//一共多少个小时
      minIndex:0,//最小高度
      maxIndex:24,//时间轴最大值
      speed:1,
    };
  },
  computed: {
   
  },
  components: {
    
  },
  props: {
    timeData: {
      type: Object,
      default: {},
    },
    heightRange: {
      type: Array,
      default: [60,70],
    },
  },
  watch: {},
  mounted() {
    let max = this.heightRange[1] 
    let min = this.heightRange[0]
    //上升
    if(max > min){
      this.speed = max - min
      this.maxIndex = max
      this.minIndex = min
    }
    //降落
    if(min > max){
      this.speed = (min - max)/120
      this.maxIndex = min
      this.minIndex = max
    }
    
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    },
    //设置时间轴指针
    setTimeIndex(val){
      let value = this.speed * val
      this.timeIndex = value
    },
    //暂停、开始  
    handleStartOrendClick() {
      this.ifStart = !this.ifStart
      if(this.ifStart){
         this.btnText = '暂停'
      }else{
        this.btnText = '开始'
      }
      console.log(this.btnText)
      if (this.startOrendClick) {
        this.startOrendClick(this.ifStart);
      }
    },
    
  },
};
</script>
 
 
<style lang="less">
.floodAT {
    width: 600px;
    height: 80px;
    position: absolute;
    bottom: 12px;
    left: 850px;
    background: RGBA(9, 39, 56, 0.85);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .floodAT-btn{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid rgba(27, 101, 128, 0.8);
      color: #8BC2F2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: Adobe Heiti Std;
      cursor: pointer;
    }
    .floodAT-slider{
      width: 80%;
      .el-slider__bar,
      .el-slider__runway{
        height: 10px;
      }
      .el-slider__button-wrapper{
        height: 38px;
        width: 38px;
        top: -14px;
      }
      .el-slider__bar{
        background: rgba(27, 101, 128, 0.8);
      }
      .el-slider__button{
        height: 18px;
        width: 18px;
        border: 4px solid #8BC2F2;
      }

    }
    .floodAT-hour{
      padding: 0px 5px;
      border-radius: 15px;
      background-color: rgba(27, 101, 128, 0.8);
      color: #8BC2F2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: Adobe Heiti Std;
    }
    .sliderTooltip{
      background-color: rgba(27, 101, 128, 0.8);
      color: #8BC2F2;
    }
}
</style>