<!--王英灌区基本概况-->
<template>
  <div class="baseinfopc">
    <div class="baseinfopc-item">
      <span class="baseinfopc-title">总干渠</span>
      <div class="base-content">
        <p class="base-content-item">
          <span class="baseinfopc-subTitle">防洪标准</span>
          <span class="baseinfopc-value">20</span>
          <span class="base-unitY">年一遇</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfopc-subTitle">最大排水能力</span>
          <span class="baseinfopc-value">416</span>
          <span class="base-unit" style="width:auto;line-height: 23px;">m3/s</span>
        </p>
      </div>
      
    </div>
    <div class="baseinfopc-item">
      <span class="baseinfopc-title">王英水库</span>
      <div class="base-content"  style="line-height: 19px;">
        <p class="base-content-item">
          <span class="baseinfopc-subTitle subTitle-right">总库容</span>
          <span class="baseinfopc-value">5.817</span>
          <span class="base-unit">亿m3</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfopc-subTitle subTitle-right">调洪库容</span>
          <span class="baseinfopc-value">0.99</span>
          <span class="base-unit">亿m3</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfopc-subTitle subTitle-right">承雨面积</span>
          <span class="baseinfopc-value">20</span>
          <span class="base-unit">km²</span>
        </p>
      </div>
      
    </div>
    <div class="baseinfopc-item">
      <span class="baseinfopc-title">干渠</span>
      <div class="base-content">
        <p class="base-content-item">
          <span class="baseinfopc-subTitle">防洪标准</span>
          <span class="baseinfopc-value">20</span>
          <span class="base-unitY">年一遇</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfopc-subTitle">最大排水能力</span>
          <span class="baseinfopc-value">416</span>
          <span class="base-unit" style="width:auto;line-height: 23px;">m3/s</span>
        </p>
      </div>
      
    </div>
    <div class="baseinfopc-item">
      <span class="baseinfopc-title">蔡贤水库</span>
      <div class="base-content" style="line-height: 19px;">
        <p class="base-content-item">
          <span class="baseinfopc-subTitle subTitle-right">总库容</span>
          <span class="baseinfopc-value">0.4113</span>
          <span class="base-unit">亿m3</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfopc-subTitle subTitle-right">调洪库容</span>
          <span class="baseinfopc-value">20</span>
          <span class="base-unit">亿m3</span>
        </p>
        <p class="base-content-item">
          <span class="baseinfopc-subTitle subTitle-right">承雨面积</span>
          <span class="baseinfopc-value">20</span>
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
.baseinfopc{
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  font-family: Adobe Heiti Std;
  justify-content: space-between;
  width: 377px;
  

  .baseinfopc-item{
    width: 180px;
    height: 105px;
    margin-bottom: 10px;
    background-image: url('../../assets/images/fxxs/baseinfo-Bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    position: relative;
    .baseinfopc-title{
      position: absolute;
      left: 21px;
      font-size: 16px;
      font-weight: normal;
      color: #96E0F6;
      margin-top: 8px;
    }
    
    .base-content{
      display: flex;
      flex-direction: column;
      width: 165px;
      height: 56px;
      margin: 34px auto 0 auto;
      justify-content: space-around;

      
    .base-content-item{
      display: flex;
      flex-direction: row;
      margin: 0;
      
      .baseinfopc-subTitle{
      width: 85px;
      text-align: right;
      display: block;
      font-size: 14px;
      font-weight: normal;
      color: #D1FCF8;
    }
    .subTitle-right{
       width: 70px;
    }
     .baseinfopc-value{
      font-size: 16px;
      font-weight: normal;
      color: #73FFF2;
      flex: 1;
      text-align: right;
    }
    .base-unitY{
      font-size: 12px;
      font-weight: normal;
      color: #D1FCF8;
      line-height: 23px;
    }
    .base-unit{
      font-size: 12px;
      font-weight: normal;
      color: #D1FCF8;
      margin-left: 3px;
      display: block;
      width: 40px;
      text-align: left;

    }
    }
   
    }
  }
  
}

</style>
