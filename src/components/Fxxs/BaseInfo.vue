<template>
  <div class="baseinfo">
    <div class="baseinfo-item">
      <span class="baseinfo-title">总干渠</span>
      <div class="base-content">
        <p class="base-content-item">
          <span class="baseinfo-subTitle">防洪标准</span>
          <span class="baseinfo-value">20</span>
          <span class="base-unitY">年一遇</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfo-subTitle">最大排水能力</span>
          <span class="baseinfo-value">416</span>
          <span class="base-unit">m3/s</span>
        </p>
      </div>
      
    </div>
    <div class="baseinfo-item">
      <span class="baseinfo-title">王英水库</span>
      <div class="base-content">
        <p class="base-content-item">
          <span class="baseinfo-subTitle subTitle-right">总库容</span>
          <span class="baseinfo-value">5.817</span>
          <span class="base-unit">亿m3</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfo-subTitle subTitle-right">调洪库容</span>
          <span class="baseinfo-value">0.99</span>
          <span class="base-unit">亿m3</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfo-subTitle subTitle-right">承雨面积</span>
          <span class="baseinfo-value">20</span>
          <span class="base-unit">km²</span>
        </p>
      </div>
      
    </div>
    <div class="baseinfo-item">
      <span class="baseinfo-title">干渠</span>
      <div class="base-content">
        <p class="base-content-item">
          <span class="baseinfo-subTitle">防洪标准</span>
          <span class="baseinfo-value">20</span>
          <span class="base-unitY">年一遇</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfo-subTitle">最大排水能力</span>
          <span class="baseinfo-value">416</span>
          <span class="base-unit">m3/s</span>
        </p>
      </div>
      
    </div>
    <div class="baseinfo-item">
      <span class="baseinfo-title">蔡贤水库</span>
      <div class="base-content">
        <p class="base-content-item">
          <span class="baseinfo-subTitle subTitle-right">总库容</span>
          <span class="baseinfo-value">0.4113</span>
          <span class="base-unit">亿m3</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfo-subTitle subTitle-right">调洪库容</span>
          <span class="baseinfo-value">20</span>
          <span class="base-unit">亿m3</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfo-subTitle subTitle-right">承雨面积</span>
          <span class="baseinfo-value">20</span>
          <span class="base-unit">km²</span>
        </p>
      </div>
      
    </div>
  </div>

</template>

<script>
export default {
name: "BaseInfo",
  props:{},
  data(){
  return{
    
  }
  },
  watch:{
    
  },
  methods:{
    
  }
}
</script>

<style lang="less">
.baseinfo{
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  font-family: Adobe Heiti Std;
  justify-content: space-between;
  width: 577px;
  

  .baseinfo-item{
    width: 277px;
    height: 162px;
    margin-bottom: 38px;
    background-image: url('../../assets/images/fxxs/baseinfo-Bg.png');
    text-align: center;
    position: relative;
    .baseinfo-title{
      position: absolute;
      left: 30px;
      font-size: 23px;
      font-weight: normal;
      color: #96E0F6;
      margin-top: 10px;
    }
    
    .base-content{
      display: flex;
      flex-direction: column;
      width: 260px;
      height: 100px;
      margin: 40px auto 0 auto;
      justify-content: space-around;

      
    .base-content-item{
      display: flex;
      flex-direction: row;
      margin: 0;
      
      .baseinfo-subTitle{
      width: 121px;
      text-align: right;
      display: block;
      font-size: 20px;
      font-weight: normal;
      color: #D1FCF8;
    }
    .subTitle-right{
      width: 110px;
    }
     .baseinfo-value{
      font-size: 22px;
      font-weight: normal;
      color: #73FFF2;
      flex: 1;
      text-align: right;
    }
    .base-unitY{
      font-size: 18px;
      font-weight: normal;
      color: #D1FCF8;
      line-height: 32px;
    }
    .base-unit{
      font-size: 18px;
      font-weight: normal;
      color: #D1FCF8;
      margin-left: 10px;
      display: block;
      width: 50px;
      text-align: left;
      line-height: 32px;
    }
    }
   
    }
  }
  
}

</style>
