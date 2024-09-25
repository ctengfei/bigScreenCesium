<template>
  <div class="zhjc-box szydd-box">
    <div class="pine"></div>
    <div class="zhjcbox-wrap szydd-wrap">
<!--      <div class="close" @click="closeClick">X</div>-->
      <div class="area">
        <div class="area-title fontColor">{{ title }}</div>
      </div>
      <div class="content">
        <div style="color: #4cdef9;margin-bottom: 8px;font-weight: bold">水位: <span>{{ sw }} m</span></div>
        <div class="data-li">
          <el-progress class="custom-progress"
                       color="#4cdef9"
                       :stroke-width="10"
                       :show-text="false"
                       text-color="#2BF6FE" style="width: 100%"  :percentage="percentage" ></el-progress>
        </div>
        <div style="color: #FE8A2BFF;margin-bottom: 8px;font-weight: bold;margin-top: 5px">流量: <span>{{ ll }} m³/s</span></div>
        <div class="data-li">
          <el-progress class="custom-progress"
                       color="#FE8A2BFF"
                       :stroke-width="10"
                       :show-text="false"
                       text-color="#2BF6FE" style="width: 100%"  :percentage="percentage" ></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "DynamicLabel",
  data() {
    return {
      id:'',
      show: true,
      time:[
          '8日18时',
          '8日20时',
          '8日22时',
          '9日00时',
          '9日02时',
          '9日04时',
          '9日06时',
          '9日08时',
          '9日10时',
          '9日12时',
          '9日14时',
          '9日16时',
          '9日17时',
      ],
      index:-1,
      tiemr:null,
      sw:1,
      ll:0.1,
      percentage:0
    };
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    swStep:{
      default: 0,
    },
    llStep:{
      default: 0.,
    }
  },
  mounted() {
    this.$bus.on('readTime',()=>{
      this.tiemr = setInterval(()=>{
        this.index++
        if (this.index > this.time.length - 1) {
          this.index = -1;
          clearInterval(this.timer1)
          return
        }
        this.percentage = this.percentage + 2;
        if (this.percentage  > 100) {
          clearInterval(this.tiemr);
          // this.percentage  = 0;
          // this.sw = 108.87;
          // this.ll = 41.97;
        }
      },500)
    })
  },
  beforeDestroy() {
    this.index =-1;
    clearInterval(this.tiemr)
    this.tiemr = null;
    this.sw = 0;
    this.ll = 0;
    this.percentage = 0;
  },
  watch:{
    percentage:function() {
      this.sw = Number(parseFloat(this.sw) + this.$props.swStep).toFixed(2);
      this.ll = Number(parseFloat(this.ll) + this.$props.llStep).toFixed(2);
    }
  },
  methods:{
    closeClick(){
      if(this.closeEvent){
        this.closeEvent();
      }
    },
    flyto(){
      if(this.flyEvent){
        this.flyEvent();
      }
    },
  }
};
</script>

<style lang="less">
.custom-progress{
  ::v-deep el-progress__text{
    color: #fe2bb1 !important;
    font-weight: bold !important;
  }
}
.zhjc-box {
  width: 300px;
  position: relative;
  bottom: 0;
  left: 0;
}
.szydd-box{
  width: 250px!important;
  position: relative;
  bottom: 0;
  left: 0;
}
.close{
  position: absolute;
  color: #fff;
  top: 1px;
  right: 10px;
  text-shadow: 2px 2px 2px #022122;
  cursor: pointer;
  animation: fontColor 1s;
}
.szydd-wrap{
  position: absolute;
  left: 16%;
  top: -5px;
  width: 100%;
  // height: 200px;
  border-radius: 50px 0px 50px 0px!important;
  border: 1px solid #008793!important;
  background-color: rgba(35,81,86,0.5)!important;
  box-shadow: 0 0 10px 2px #008793!important;
  animation: slide 2s;
  padding-bottom: 10px;
}

.szydd-wrap .area{
  position: absolute;
  top: 20px;
  right: 0;
  width: 95%;
  height: 30px;
  background-image: linear-gradient(to left, #4cdef9, #4cdef96b);
  border-radius: 30px 0px 0px 0px;
  animation: area 1s;
}
.pine {
  position: absolute;
  // left: 0;
  // bottom: -83px;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  line-height: 120px;
  text-indent: 5px;
}
 
.pine::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -83px;
  width: 40%;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #38e1ff;
  transform-origin: bottom center;
  transform: rotateZ(135deg) scale(1.5);
  animation: slash 0.5s;
  filter: drop-shadow(1px 0px 2px #03abb4);
  /* transition: slash 2s; */
}
 
.area .area-title {
  text-align: center;
  line-height: 30px;
}
.textColor {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}
.yellowColor {
  font-size: 14px;
  font-weight: 600;
  color: #f09e28;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}
 
.fontColor {
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 1px 1px 5px #002520d2;
  animation: fontColor 1s;
}
.content {
  padding: 55px 10px 10px 10px;
}
.bottomBtn{
  font-size: 14px;
  font-weight: 800;
  color: #FFFFFF;
  margin-left: 10px;
  cursor: pointer;
  
}
.commin{
    width: 60px;
    text-align: center;
    border-radius: 20px;
    padding: 5px 10px;
    background-color: #f09e28;
  }
.content .data-li {
  display: flex;
}
.content .data-value{
  flex: 1;
}
 
@keyframes fontColor {
  0% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }
  40% {
    color: #ffffff00;
    text-shadow: 1px 1px 5px #00252000;
  }
  100% {
    color: #ffffff;
    text-shadow: 1px 1px 5px #002520d2;
  }
}
 
@keyframes slide {
  0% {
    border: 1px solid #38e1ff00;
    background-color: #38e1ff00;
    box-shadow: 0 0 10px 2px #29baf100;
  }
 
  100% {
    border: 1px solid #38e1ff;
    background-color: #38e1ff4a;
    box-shadow: 0 0 10px 2px #29baf1;
  }
}
@keyframes area {
  0% {
    width: 0%;
  }
  25% {
    width: 0%;
  }
 
  100% {
    width: 95%;
  }
}
 
/* img{
            position:absolute;
            left:30%;
            top:0;
            width: 100%;
            box-shadow: 0 0 10px 2px #29baf1;
        } */
 
@keyframes slash {
  0% {
    transform: rotateZ(135deg) scale(0);
  }
 
  100% {
    transform: rotateZ(135deg) scale(1.5);
  }
}
</style>