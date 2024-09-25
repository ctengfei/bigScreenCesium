<template>
  <div class="genera">
    <div class="main-channel-container">
      <div class="main-channel-box">
        <div class="main-channel"></div>
      </div>

      <div class="wy_gs1">
        大冶供水20万t/d
      </div>
      <div class="wy_gs2">
        阳新供水10万t/d
      </div>
      <div class="wy_ngq">
        <span>三溪南干渠</span>
      </div>
      <div class="wy_bgq">
        <span>三溪北支渠</span>
      </div>
      <div class="wy_sxh">
        <span>三溪河</span>
        <el-popover
            placement="top-start"
            :width="100"
            trigger="manual"
            :value="visible"
            popper-class="custom-poper"
        >
          <template #reference>
            <h1 class="wy_xhz"></h1>
          </template>
          <template #default>
            <h3 style="color: #fff">{{ slve10.name }}</h3>
            <span  style="color: #fff">流量：{{ slve10.value }} m³/s</span>
          </template>
        </el-popover>
        <el-popover
            placement="bottom"
            :width="100"
            trigger="manual"
            :value="visible"
            popper-class="custom-poper"
        >
          <template #reference>
            <h1 class="wy_jzz"></h1>
          </template>
          <template #default>
            <h3 style="color: #fff">{{ slve11.name }}</h3>
            <span  style="color: #fff">流量：{{ slve11.value }} m³/s</span>
          </template>
        </el-popover>
      </div>
      <div class="wy_sk"></div>
      <div class="cx_gs1">
        咸宁供水10万t/d
      </div>
      <div class="cx_gs2">
        思源水厂供水2万t/d
      </div>
      <div class="cx_g">
        <span>蔡贤港</span>
      </div>
      <div class="cx_q">
        <span>蔡贤渠</span>
        <el-popover
            placement="top-start"
            :width="100"
            trigger="manual"
            :value="visible"
            popper-class="custom-poper"
        >
          <template #reference>
            <h1 class="cx_jsz"></h1>
          </template>
          <template #default>
            <h3 style="color: #fff">{{ slve9.name }}</h3>
            <span  style="color: #fff">流量：{{ slve9.value }} m³/s</span>
          </template>
        </el-popover>
      </div>
      <div class="cx_sk"></div>
      <div class="gqh"><span>高桥河</span></div>
      <el-popover
          placement="top-start"
          :width="100"
          trigger="manual"
          :value="visible"
          popper-class="custom-poper"
      >
        <template #reference>
          <h1 class="dm_63"></h1>
        </template>
        <template #default>
          <h3 style="color: #fff">{{ slve1.name }}</h3>
          <span  style="color: #fff">流量：{{ slve1.value }} m³/s</span>
        </template>
      </el-popover>
      <div class="hgh">
        <span>横沟河</span>
        <!--        <el-popover-->
        <!--            placement="top-start"-->
        <!--            :width="100"-->
        <!--            trigger="hover"-->
        <!--            popper-class="custom-poper"-->
        <!--        >-->
        <!--          <template #reference>-->
        <!--            <h1 class="dm_84"></h1>-->
        <!--          </template>-->
        <!--          <template #default>-->
        <!--            <h3 style="color: #fff">斗门84号闸</h3>-->
        <!--            <span  style="color: #fff">流量：0</span>-->
        <!--          </template>-->
        <!--        </el-popover>-->
      </div>
<!--      <div class="ft_lake"></div>-->
      <div class="ygq">
        <span>一干渠</span>
        <el-popover
            placement="top-start"
            :width="100"
            trigger="manual"
            :value="visible"
            popper-class="custom-poper"
        >
          <template #reference>
            <h1 class="dm_65"></h1>
          </template>
          <template #default>
            <h3 style="color: #fff">{{ slve8.name }}</h3>
            <span  style="color: #fff">流量：{{ slve8.value }} m³/s</span>
          </template>
        </el-popover>
      </div>
<!--      <div class="lz_lake"></div>-->
      <el-popover
          placement="bottom-start"
          :width="100"
          trigger="manual"
          :value="visible"
          popper-class="custom-poper"
      >
        <template #reference>
          <h1 class="dm_95"></h1>
        </template>
        <template #default>
          <h3 style="color: #fff">{{ slve2.name }}</h3>
          <span  style="color: #fff">流量：{{ slve2.value }} m³/s</span>
        </template>
      </el-popover>
      <el-popover
          placement="top-start"
          :width="100"
          trigger="manual"
          :value="visible"
          popper-class="custom-poper"
      >
        <template #reference>
          <h1 class="dm_117"></h1>
        </template>
        <template #default>
          <h3 style="color: #fff">{{ slve3.name }}</h3>
          <span  style="color: #fff">流量：{{ slve3.value }} m³/s</span>
        </template>
      </el-popover>
      <div class="egq">
        <span>二干渠</span>
        <el-popover
            placement="bottom"
            :width="100"
            trigger="manual"
            :value="visible"
            popper-class="custom-poper"
        >
          <template #reference>
            <h1 class="dm_118"></h1>
          </template>
          <template #default>
            <h3 style="color: #fff">{{ slve4.name }}</h3>
            <span  style="color: #fff">流量：{{ slve4.value }} m³/s</span>
          </template>
        </el-popover>
      </div>
      <el-popover
          placement="bottom"
          :width="100"
          trigger="manual"
          :value="visible"
          popper-class="custom-poper"
      >
        <template #reference>
          <div class="dm_147"></div>
        </template>
        <template #default>
          <h3 style="color: #fff">{{ slve7.name }}</h3>
          <span  style="color: #fff">流量：{{ slve7.value }} m³/s</span>
        </template>
      </el-popover>
      <div class="sgq">
        <span>三干渠</span>
        <el-popover
            placement="top-start"
            :width="100"
            trigger="manual"
            :value="visible"
            popper-class="custom-poper"
        >
          <template #reference>
            <h1 class="s_fsz"></h1>
          </template>
          <template #default>
            <h3 style="color: #fff">{{ slve5.name }}</h3>
            <span  style="color: #fff">流量：{{ slve5.value }} m³/s</span>
          </template>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script >

export default {
  data(){
    return {
      slve1:{name:'-',value:0},
      slve2:{name:'-',value:0},
      slve3:{name:'-',value:0},
      slve4:{name:'-',value:0},
      slve5:{name:'-',value:0},
      slve6:{name:'-',value:0},
      slve7:{name:'-',value:0},
      slve8:{name:'-',value:0},
      slve9:{name:'-',value:0},
      slve10:{name:'-',value:0},
      slve11:{name:'-',value:0},
      visible:false
    }
  },
  props:{
    ifShowGht:{
        type:Boolean,
        default:false
    }
  },
  watch:{
    ifShowGht:function (fs) {
      if(fs){
        const timer = setTimeout(()=>{
          this.visible = true;
        },100)
      }else{
        this.visible = false;
      }
    }
  },
  mounted(){
    this.$api.gqjc.getZHJC_SiteList({stType:'DD'}).then(res=>{
      res.data.wagaList.forEach(r=>{
        if(r.stCode == 'WYSW0055'){ // 黄伯敬泄洪闸前
          this.slve1={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0023'){ // 九支渠节制闸前
          this.slve2 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0038'){ // 万秀八节制闸
          this.slve3 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0034'){ // 二千渠分水闸
          this.slve4 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0057'){ // 前进节制闸后
          this.slve5 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0035'){ // 三干渠149号闸
          this.slve6 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0036'){ // 望山泄洪闸
          this.slve7 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0031'){ // 一干渠分水闸（咸安段）
          this.slve8 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0047'){ // 蔡贤灌溉渠（放空）
          this.slve9 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0042'){ // 王英渠首三闸
          this.slve10 ={ name:r.stName,value:r.upz};
        }else if(r.stCode == 'WYSW0044'){ // 王英北渠泄洪闸前
          this.slve11 ={ name:r.stName,value:r.upz};
        }
      })
    })
  }
}

</script>
<style lang="less">
.custom-poper{
  background: #42b983!important;
  border: 0!important;
  .popper__arrow::after{
    content: '';
    border-bottom-color: #42b983!important;
    border-top-color: #42b983!important;
    border: 0!important;
  }
  .popper__arrow{
    border-bottom-color: #42b983!important;
    border-top-color: #42b983!important;
  }
}

</style>
<style lang="less">
.genera{
  position: relative;
  height: 100%;
  width: 100%;
  .main-channel-container{
    position: relative;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 25px;
    .main-channel-box{
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      height: 20px;
      width: 90%;
      background: rgba(59,123,137,.5);
      overflow: hidden;
      .main-channel{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        height: 3px;
        width: 160%;
        -webkit-animation:goRunning 5s linear infinite normal;
        background: url("@/assets/images/gqjc/mainChannel.png") no-repeat center center;
        background-size: cover;
      }
      @keyframes goRunning {
        0% {left: 0;}
        100% {left: -50%;}
      }
       @-webkit-keyframes goRunning {
        0% {left: 0;}
        100% {left: -50%;}
      }
    }
    &:before{
      content: '主干渠';
      position: absolute;
      left: 0;
      font-weight: bold;
      color: #3b7b89;
      font-size: 16px;
    }
    .wy_sk{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 80px;
      width: 80px;
      background: url("@/assets/images/gqjc/wy_img.png") no-repeat center center;
      background-size: cover;
      z-index: 10;
    }
    .wy_gs1{
      position: absolute;
      right: 0;
      bottom: -206px;
      height: 80px;
      width: 100px;
      text-align: center;
      font-size: 18px;
      background: rgba(58,70,81,.8);
      border-radius: 8px;
      color: #fff;
      padding: 0 5px;
      display: flex;
      align-items: center;
      &:after{
        content: '';
        position: absolute;
        right: 36px;
        bottom: 80px;
        display: block;
        height: 100px;
        width: 8px;
        background:#63B8FF;
      }
    }
    .wy_gs2{
      position: absolute;
      right: 11.8%;
      bottom: -206px;
      height: 80px;
      width: 100px;
      text-align: center;
      font-size: 18px;
      background: rgba(58,70,81,.8);
      border-radius: 8px;
      color: #fff;
      padding: 0 5px;
      display: flex;
      align-items: center;
      &:after{
        content: '';
        position: absolute;
        right: -36px;
        bottom: 54px;
        display: block;
        height: 93px;
        width: 8px;
        background:#63B8FF;
        transform: rotateZ(59deg);
      }
    }
    .wy_ngq{
      position: absolute;
      right: 25px;
      bottom: 54px;
      width: 8px;
      height: 160px;
      background: #20B2AA;
      line-height: 19px;
      span{
        position: absolute;
        left: 15px;
        top: 15px;
        color: #20B2AA;
        font-size: 20px;
      }
    }
    .wy_bgq{
      position: absolute;
      right: 40px;
      bottom: 83px;
      width: 8px;
      height: 115px;
      background: #20B2AA;
      line-height: 19px;
      transform: rotate(-15deg);
      line-height: 19px;
      span{
        position: absolute;
        right: 15px;
        top: 15px;
        color: #20B2AA;
        font-size: 20px;
      }
    }
    .wy_sxh{
      position: absolute;
      right: 120px;
      bottom: 34px;
      width: 8px;
      height: 285px;
      background: #90EE90;
      transform: rotate(-27deg);
      z-index: 5;
      span{
        position: absolute;
        left: 10px;
        bottom: 35px;
        color: #90EE90;
        font-size: 20px;
      }
      .wy_xhz{
        position: relative;
        left: -32px;
        top: -160px;
        display: block;
        height: 30px;
        width: 30px;
        background: url("@/assets/images/gqjc/sluice.png") no-repeat  center center;
        background-size: cover;
        &:after{
          content: "王英渠首三闸";
          position: absolute;
          right: -104px;
          top: 5px;
          color: #409eff;
          font-size: 16px;
        }
      }
      .wy_jzz{
        position: absolute;
        left: -31px;
        top: -130px;
        display: block;
        height: 30px;
        width: 30px;
        background: url("@/assets/images/gqjc/sluice.png") no-repeat  center center;
        background-size: cover;
        &:after{
          content: "王英北渠泄洪闸前";
          position: absolute;
          left: -136px;
          top: 5px;
          color: #409eff;
          font-size: 16px;
          z-index: 10;
        }
      }
    }
    .cx_gs1{
      position: absolute;
      right: 239px;
      bottom: -290px;
      height: 80px;
      width: 100px;
      text-align: center;
      font-size: 18px;
      background: rgba(58,70,81,.8);
      border-radius: 8px;
      color: #fff;
      padding: 0 5px;
      display: flex;
      align-items: center;
      &:after{
        content: '';
        position: absolute;
        right: 42px;
        bottom: 80px;
        display: block;
        height: 192px;
        width: 8px;
        background:#63B8FF;
      }
    }
    .cx_gs2{
      position: absolute;
      right: 289px;
      top: 156px;
      height: 80px;
      width: 100px;
      text-align: center;
      font-size: 18px;
      background: rgba(58,70,81,.8);
      border-radius: 8px;
      color: #fff;
      padding: 0 5px;
      display: flex;
      align-items: center;
      &:after{
        content: '';
        position: absolute;
        right: 42px;
        top: -111px;
        display: block;
        height: 109px;
        width: 8px;
        background:#63B8FF;
      }
    }
    .cx_g{
      position: absolute;
      width: 8px;
      bottom: 15px;
      right: 238px;
      height: 242px;
      background: #90EE90;
      transform: rotate(26deg);
      span{
        position: absolute;
        right: 10px;
        top: 0px;
        bottom: 35px;
        color: #90EE90;
        font-size: 20px;
      }
      .wsz{
        position: absolute;
        left: 0px;
        top: 175px;
        display: block;
        height: 30px;
        width: 30px;
        background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
        background-size: cover;
        transform: rotate(37deg);
        &:after{
          content: "尾水闸";
          position: absolute;
          left: -55px;
          top: 5px;
          color: #409eff;
          font-size: 16px;
          z-index: 10;
        }
      }
    }
    .cx_q{
      position: absolute;
      width: 8px;
      bottom: 36px;
      right: 340px;
      height: 199px;
      background: #20B2AA;
      transform: rotate(-15deg);
      span{
        position: absolute;
        left: 10px;
        top: 100px;
        bottom: 35px;
        color: #20B2AA;
        font-size: 20px;
      }
      .cx_jsz{
        position: absolute;
        left: -30px;
        top: -180px;
        display: block;
        height: 30px;
        width: 30px;
        background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
        background-size: cover;
        transform: rotate(-15deg);
        &:after{
          content: "蔡贤灌溉渠（放空）";
          position: absolute;
          left: -144px;
          top: 5px;
          color: #409eff;
          font-size: 16px;
          z-index: 10;
        }
      }
    }
    .cx_sk{
      position: absolute;
      right: 280px;
      top: 49%;
      transform: translateY(-50%);
      height: 60px;
      width: 60px;
      background: url("@/assets/images/gqjc/cx_img.png") no-repeat center center;
      background-size: cover;
      z-index: 10;
    }
    .gqh{
      position: absolute;
      right: 446px;
      top: 25px;
      height: 260px;
      width: 8px;
      background: #90EE90;
      span{
        position: absolute;
        right: 10px;
        top: 50px;
        color: #90EE90;
        font-size: 20px;
      }
    }
    .dm_63{
      position: absolute;
      right: 375px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      height: 30px;
      width: 30px;
      background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
      background-size: cover;
      &:after{
        content: "黄伯敬泄洪闸";
        position: absolute;
        left: -19px;
        top: -26px;
        color: #409eff;
        white-space: nowrap;
        font-size: 16px;
        z-index: 10;
      }
    }
    .empty{
      position: absolute;
      right: 495px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      height: 30px;
      width: 30px;
      background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
      background-size: cover;
    }
    .hgh{
      position: absolute;
      right: 535px;
      top: 25px;
      height: 200px;
      width: 8px;
      background: #90EE90;
      span{
        position: absolute;
        right: 10px;
        top: 90px;
        color: #90EE90;
        font-size: 20px;
      }
      .dm_84{
        position: absolute;
        right: -30px;
        top: -155px;
        display: block;
        height: 30px;
        width: 30px;
        background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
        background-size: cover;
        &:after{
          content: "斗门84号闸";
          position: absolute;
          top: 5px;
          right: 33px;
          color: #409eff;
          white-space: nowrap;
          font-size: 16px;
          z-index: 10;
        }
      }
    }
    .ft_lake{
      position: absolute;
      right: 520px;
      top: 179px;
      height: 100px;
      width: 100px;
      transform: rotateZ(-10deg);
      background: url("@/assets/images/gqjc/lake.png") no-repeat center center;
      background-size: cover;
    }
    .ygq{
      position: absolute;
      right: 535px;
      top: -199px;
      height: 200px;
      width: 8px;
      background: #20B2AA;
      span{
        position: absolute;
        left: 10px;
        top: 10px;
        color: #20B2AA;
        font-size: 20px;
      }
      .dm_65{
        position: absolute;
        right: 0px;
        bottom: -158px;
        display: block;
        height: 30px;
        width: 30px;
        background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
        background-size: cover;
        &:after{
          content: "一干渠分水闸(咸安段)";
          position: absolute;
          top: 5px;
          left: 30px;
          color: #409eff;
          white-space: nowrap;
          font-size: 16px;
          z-index: 10;
        }
      }
    }
    .lz_lake{
      position: absolute;
      right: 520px;
      top: -282px;
      height: 100px;
      width: 100px;
      transform: rotateZ(350deg);
      background: url("@/assets/images/gqjc/lake.png") no-repeat center center;
      background-size: cover;
    }
    .dm_95{
      position: absolute;
      left: 310px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      height: 30px;
      width: 30px;
      background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
      background-size: cover;
      &:after{
        content: "九支渠节制闸前";
        position: absolute;
        left: -19px;
        top: -26px;
        color: #409eff;
        white-space: nowrap;
        font-size: 16px;
        z-index: 10;
      }
    }
    .dm_117{
      position: absolute;
      left: 210px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      height: 30px;
      width: 30px;
      background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
      background-size: cover;
      &:after{
        content: "万秀八节制闸";
        position: absolute;
        left: -19px;
        top: -26px;
        color: #409eff;
        white-space: nowrap;
        font-size: 16px;
        z-index: 10;
      }
    }
    .egq{
      position: absolute;
      left: 270px;
      top: 25px;
      height: 200px;
      width: 8px;
      background: #20B2AA;
      span{
        position: absolute;
        left: 10px;
        top: 80px;
        color: #20B2AA;
        font-size: 20px;
      }
      .dm_118{
        position: absolute;
        right: 0px;
        top: -120px;
        display: block;
        height: 30px;
        width: 30px;
        background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
        background-size: cover;
        &:after{
          content: "二干渠分水闸";
          position: absolute;
          top: 5px;
          left: 30px;
          color: #409eff;
          white-space: nowrap;
          font-size: 16px;
          z-index: 10;
        }
      }
    }
    .dm_147{
      position: absolute;
      left: 110px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      height: 30px;
      width: 30px;
      background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
      background-size: cover;
      &:after{
        content: "望山泄洪闸";
        position: absolute;
        left: -19px;
        top: -26px;
        color: #409eff;
        white-space: nowrap;
        font-size: 16px;
        z-index: 10;
      }
    }
    .sgq{
      position: absolute;
      left: 75px;
      bottom: 24px;
      height: 200px;
      width: 8px;
      background: #20B2AA;
      span{
        position: absolute;
        left: 10px;
        top: 5px;
        color: #20B2AA;
        font-size: 20px;
      }
      .s_fsz{
        position: absolute;
        right: 0px;
        bottom: -155px;
        display: block;
        height: 30px;
        width: 30px;
        background: url("@/assets/images/gqjc/sluice.png") no-repeat center center;
        background-size: cover;
        &:after{
          content: "前进节制闸后";
          position: absolute;
          top: 5px;
          left: 30px;
          color: #409eff;
          white-space: nowrap;
          font-size: 16px;
          z-index: 10;
        }
      }
    }
  }
}


</style>