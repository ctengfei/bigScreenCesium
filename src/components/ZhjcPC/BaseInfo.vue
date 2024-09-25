<!--王英灌区基本概况-->
<template>
  <div class="wygqinfopc">
    <div class="wygqinfopc-row">
      <div class="top-item">
        <div class="top-item-bottom"></div>
        <img class="top-item-top" src="../../assets/images/gqjc/zgq.png" />
        <span class="top-item-title">总干渠</span>
        <p class="top-item-content sl"><span>数量</span><span>{{pageData.chanInfo.canalNum || '--'}}</span><span>条</span></p>
        <p class="top-item-content qc"><span>渠长</span><span>{{pageData.chanInfo.canalLength || '--'}}</span><span>km</span></p>
      </div>
      <div class="top-item">
        <div class="top-item-bottom"></div>
        <img class="top-item-top" src="../../assets/images/gqjc/gq.png" />
        <span class="top-item-title">干渠</span>
        <p class="top-item-content sl"><span>数量</span><span>{{pageData.chanInfo.mainCanalNum || '--'}}</span><span>条</span></p>
        <p class="top-item-content qc"><span>渠长</span><span>{{pageData.chanInfo.mainCanalLength || '--'}}</span><span>km</span></p>
      </div>
      <div class="top-item">
        <div class="top-item-bottom"></div>
        <img class="top-item-top" src="../../assets/images/gqjc/zq.png" />
        <span class="top-item-title">支渠</span>
        <p class="top-item-content sl"><span>数量</span><span>{{pageData.chanInfo.branchCanalNum || '--'}}</span><span>条</span></p>
        <p class="top-item-content qc"><span>渠长</span><span>{{pageData.chanInfo.branchCanalLength || '--'}}</span><span>km</span></p>
      </div>
    </div>
    <div class="wygqinfopc-row zha">
      <!-- <dv-border-box-7 class="zha-item" :color="['transparent', 'rgba(147, 232, 255, 0.8)']"> -->
        <div class="zha-item">
        <div class="zha-item-bg"></div>
        <img src="../../assets/images/gqjc/jzz.png"/>
        <div class="zha-item-content">
          <span class="content-title">节制闸</span>
          <p><span class="content-value">{{pageData.wagaInfo.checkGateNum || '--'}}</span><span class="content-unit">个</span></p>
        </div>
        </div>
      <!-- </dv-border-box-7> -->
      <!-- <dv-border-box-7 class="zha-item" :color="['transparent', 'rgba(147, 232, 255, 0.8)']"> -->
        <div class="zha-item">
        <div class="zha-item-bg"></div>
        <img src="../../assets/images/gqjc/fsz.png"/>
        <div class="zha-item-content">
          <span class="content-title">分水闸</span>
          <p><span class="content-value">{{pageData.wagaInfo.turnOutGateNum || '--'}}</span><span class="content-unit">个</span></p>
        </div>
        </div>
      <!-- </dv-border-box-7> -->
      <!-- <dv-border-box-7 class="zha-item" :color="['transparent', 'rgba(147, 232, 255, 0.8)']"> -->
        <div class="zha-item">
        <div class="zha-item-bg"></div>
        <img src="../../assets/images/gqjc/xhz.png"/>
        <div class="zha-item-content">
          <span class="content-title">泄洪闸</span>
          <p><span class="content-value">{{pageData.wagaInfo.floodGateNum || '--'}}</span><span class="content-unit">个</span></p>
        </div>
        </div>
      <!-- </dv-border-box-7> -->
    </div>
    <div class="wygqinfopc-row other">
       <!-- <dv-border-box-7 class="other-item" :color="['transparent', 'rgba(147, 232, 255, 0.8)']"> -->
        <div class="other-item">
        <div class="other-item-bg"></div>
        <img src="../../assets/images/gqjc/dm.png"/>
        <span class="content-title">斗门</span>
        <p><span class="content-value">{{pageData.wagaInfo.sluiceGateNum || '--'}}</span><span class="content-unit">个</span></p>
        </div>
      <!-- </dv-border-box-7> -->
      <!-- <dv-border-box-7 class="other-item" :color="['transparent', 'rgba(147, 232, 255, 0.8)']"> -->
        <div class="other-item">
        <div class="other-item-bg"></div>
        <img src="../../assets/images/gqjc/hd.png"/>
        <span class="content-title">涵洞</span>
        <p><span class="content-value">{{pageData.culvNum || '--'}}</span><span class="content-unit">个</span></p>
      <!-- </dv-border-box-7> -->
        </div>
      <!-- <dv-border-box-7 class="other-item" :color="['transparent', 'rgba(147, 232, 255, 0.8)']"> -->
        <div class="other-item">
        <div class="other-item-bg"></div>
        <img src="../../assets/images/gqjc/dc.png"/>
        <span class="content-title">渡槽</span>
        <p><span class="content-value">{{pageData.flumNum || '--'}}</span><span class="content-unit">个</span></p>
      <!-- </dv-border-box-7> -->
        </div>
      <!-- <dv-border-box-7 class="other-item" :color="['transparent', 'rgba(147, 232, 255, 0.8)']"> -->
        <div class="other-item">
        <div class="other-item-bg"></div>
        <img src="../../assets/images/gqjc/sd.png"/>
        <span class="content-title">隧洞</span>
        <p><span class="content-value">{{pageData.tunnelNum || '--'}}</span><span class="content-unit">个</span></p>
        </div>
      <!-- </dv-border-box-7> -->
    </div>
  </div>

</template>

<script>

export default {
name: "wygqinfopc",
  props:{},
  data(){
  return{
    pageData:{
      chanInfo:{},
      wagaInfo:{}
    },
  }
  },
  mounted(){
    this.getJBGK()
  },
  watch:{
    
  },
  methods:{
    getJBGK(){
      let that = this
      this.$api.gqjc.getZHJC_JBGK().then((res) => {
            let data = res.data
            that.pageData = data
          }).catch(() => {
            
          });
    },
  }
}
</script>

<style lang="less">
.wygqinfopc{
  width: 100%;
  height: 100%;
  font-family: Microsoft YaHei;
  margin-top: 10px;
  
  .wygqinfopc-row{
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
  }
  .zha{
    margin-top: 20px;
  }
   .other{
    margin-top: 6px;
  }
  .dv-bb7-line-width-5{
    stroke-width: 3px !important;
  }
  .top-item{
    width: 120px;
    height: 110px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top-item-top{
      position: absolute;
      top: 0;
      left: 5px;
      width: 110px;
      height: 70px;
    }
    .top-item-bottom{
      position: absolute;
      bottom: 0;
      width: 120px;
      height: 68px;
      // background: linear-gradient(360deg, rgba(150,248,250,0.1) 0%, rgba(150,248,250,0) 100%);
      background: linear-gradient(90deg, rgba(150,248,250,0.1) 0%, rgba(150,248,250,0) 50%, rgba(150,248,250,0.1) 100%);
    }
    .top-item-title{
      font-size: 16px;
      font-weight: 400;
      color: #52F3F6;
      background: rgba(82, 243, 246, 0.1);
      // margin-top: 5px;
      width: 50px;
      text-align: center;
    }
    .top-item-content{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      span:nth-child(1){
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 400;
        margin-left: 8px;
      }
      span:nth-child(2){
        flex: 1;
        margin-right: 4px;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        text-align: right;
      }
      span:nth-child(3){
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 400;
        display: inline-block;
        width: 25px;
        text-align: left;
      }
    }
    .sl{
      margin-top: 37px;
    }
    .qc{
      margin-top: -3px;
    }
  }
 
  .zha-item{
     width: 120px;
     height: 49px;
     position: relative;
     display: flex;
     align-items: center;
     .zha-item-bg{
       width: 120px;
       height: 49px;
       position: absolute;
       background: linear-gradient(90deg, rgba(147,232,255,0.5) 0%, rgba(26,63,74,0.5) 100%);
       opacity: 0.2;
     }
      .border-box-content{
       display: flex;
       align-items: center;
  }
     img{
      width: 44px;
      height: 44px;
      margin: 0 6px;
     }
     .zha-item-content{
      display: flex;
      flex-direction: column;
      .content-title{
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
      .content-value{
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: inline-block;
        width: 30px;
        text-align: left;
      }
      .content-unit{
         font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
     }
  }
  .other-item{
     width: 89px;
     height: 84px;
     position: relative;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     line-height: 16px;
     .other-item-bg{
       width: 89px;
       height: 84px;
       position: absolute;
       background: linear-gradient(90deg, rgba(147,232,255,0.5) 0%, rgba(26,63,74,0.5) 100%);
       opacity: 0.2;
     }
      img{
      width: 44px;
      height: 44px;
     }
      .border-box-content{
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
  }
     .content-title{
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
      .content-value{
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .content-unit{
         font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
  }
}

</style>
