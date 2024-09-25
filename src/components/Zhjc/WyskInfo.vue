<!--王英水库基本概况-->
<template>
  <div class="wyskinfo">
    <!-- <dv-border-box-7
      class="wyskinfo-top"
      :color="['transparent', 'rgba(147, 232, 255, 0.8)']"
    > -->
    <div class="wyskinfo-top">
      <!-- <div class="wyskinfo-top-bg"></div> -->
      <span class="content-title">水库规模</span>
      <span class="content-total">总数：</span>
      <span class="content-value">{{pageData.resTotalNum || '--'}}</span>
      <span class="content-unit">座</span>
    <!-- </dv-border-box-7> -->
    </div>
    <div class="wyskinfo-row ba">
      <div class="ba-item">
        <img src="../../assets/images/gqjc/skgm.png" />
        <div class="ba-item-content">
          <span class="ba-title">大型水库</span>
          <p><span class="ba-value">{{pageData.largeResNum || '--'}}</span><span class="ba-unit">座</span></p>
        </div>
      </div>
      <div class="ba-item">
        <img src="../../assets/images/gqjc/skgm.png" />
        <div class="ba-item-content">
          <span class="ba-title">中型水库</span>
          <p><span class="ba-value">{{pageData.mediumResNum || '--'}}</span><span class="ba-unit">座</span></p>
        </div>
      </div>
      <div class="ba-item">
        <img src="../../assets/images/gqjc/skgm.png" />
        <div class="ba-item-content">
          <span class="ba-title">小型水库</span>
          <p>
            <span class="ba-value">{{pageData.smallResNum || '--'}}</span><span class="ba-unit">座</span>
          </p>
        </div>
      </div>
    </div>
    <div class="wyskinfo-row shuiku">
      <dv-border-box-7
        class="shuiku-item"
        :color="['transparent', 'rgba(147, 232, 255, 0.8)']"
      >
        <div class="shuiku-item-bg"></div>
        <div class="shuiku-item-left">
          <img src="../../assets/images/gqjc/wang.png" />
          <div class="shuiku-name-dz"></div>
          <span class="shuiku-name">王英水库</span>
        </div>
        <div class="shuiku-item-content">
          <p>
            <span class="shuiku-content-box"></span
            ><span class="content-title">主坝</span>
          </p>
          <p>
            <span class="content-value">{{pageData.wyMainDam || '--'}}</span
            ><span class="content-unit">座</span>
          </p>
        </div>
        <div class="shuiku-item-content">
          <p>
            <span class="shuiku-content-box"></span
            ><span class="content-title">副坝</span>
          </p>
          <p>
            <span class="content-value">{{pageData.wyAuxiliaryDam || '--'}}</span
            ><span class="content-unit">座</span>
          </p>
        </div>
      </dv-border-box-7>
      <dv-border-box-7
        class="shuiku-item"
        :color="['transparent', 'rgba(147, 232, 255, 0.8)']"
      >
        <div class="shuiku-item-bg"></div>
        <div class="shuiku-item-left">
          <img src="../../assets/images/gqjc/cai.png" />
          <div class="shuiku-name-dz"></div>
          <span class="shuiku-name">蔡贤水库</span>
        </div>
        <div class="shuiku-item-content">
          <p>
            <span class="shuiku-content-box"></span
            ><span class="content-title">主坝</span>
          </p>
          <p>
            <span class="content-value">{{pageData.cxMainDam || '--'}}</span
            ><span class="content-unit">座</span>
          </p>
        </div>
        <div class="shuiku-item-content">
          <p>
            <span class="shuiku-content-box"></span
            ><span class="content-title">副坝</span>
          </p>
          <p>
            <span class="content-value">{{pageData.cxAuxiliaryDam || '--'}}</span
            ><span class="content-unit">座</span>
          </p>
        </div>
      </dv-border-box-7>
    </div>
    <div class="wyskinfo-row zha">
      <dv-border-box-7
        class="zha-item"
        :color="['transparent', 'rgba(147, 232, 255, 0.8)']"
      >
        <div class="zha-item-bg"></div>
        <img src="../../assets/images/gqjc/xhz.png" />
        <div class="zha-item-content">
          <span class="content-title">泄洪闸</span>
          <p>
            <span class="content-value">{{pageData.floodGateNum || '--'}}</span
            ><span class="content-unit">个</span>
          </p>
        </div>
      </dv-border-box-7>
      <dv-border-box-7
        class="zha-item"
        :color="['transparent', 'rgba(147, 232, 255, 0.8)']"
      >
        <div class="zha-item-bg"></div>
        <img src="../../assets/images/gqjc/ggz.png" />
        <div class="zha-item-content">
          <span class="content-title">分水闸</span>
          <p>
            <span class="content-value">{{pageData.turnOutGateNum || '--'}}</span
            ><span class="content-unit">个</span>
          </p>
        </div>
      </dv-border-box-7>
      <dv-border-box-7
        class="zha-item"
        :color="['transparent', 'rgba(147, 232, 255, 0.8)']"
      >
        <div class="zha-item-bg"></div>
        <img src="../../assets/images/gqjc/ggmj.png" />
        <div class="zha-item-content">
          <span class="content-title">设计灌溉面积</span>
          <p>
            <span class="content-value">{{pageData.irrArea || '--'}}</span
            ><span class="content-unit">万亩</span>
          </p>
        </div>
      </dv-border-box-7>
    </div>
  </div>
</template>

<script>
export default {
  name: "wyskinfo",
  props: {},
  data() {
    return {
      pageData:{},
    };
  },
  watch: {},
   mounted(){
    this.getSKJBGK()
  },
  methods: {
    getSKJBGK(){
      let that = this
      this.$api.gqjc.getSK_JBGK().then((res) => {
            let data = res.data
            that.pageData = data
          }).catch(() => {
            
          });
    },
  },
};
</script>

<style lang="less">
.wyskinfo {
  width: 580px;
  // padding: 0px 16px 0 18px;
  margin-top: 20px;
  font-family: Microsoft YaHei;
  .wyskinfo-top {
    width: 580px;
    height: 35px;
    background-image: url('@/assets/images/common/rowBg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    align-items: center;

    // .wyskinfo-top-bg {
    //   width: 580px;
    //   height: 35px;
    //   position: absolute;
    //   background: linear-gradient(
    //     90deg,
    //     rgba(147, 232, 255, 0.5) 0%,
    //     rgba(147, 232, 255, 0.5) 100%
    //   );
    //   opacity: 0.2;
    // }
    .border-box-content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    span {
      text-align: center;
      display: block;
    }
    .content-title {
      font-size: 20px;
      font-family: SourceHanSansCN-Heavy;
      font-weight: 800;
      color: #ffffff;
      margin-left: 9px;
    }
    .content-total {
      font-size: 18px;
      font-weight: 400;
      color: rgba(147, 232, 255, 0.8);
      flex: 1;
      text-align: right;
    }
    .content-unit {
      font-size: 18px;
      font-weight: 400;
      color: rgba(147, 232, 255, 0.8);
      margin-right: 16px;
    }
    .content-value {
      font-size: 26px;
      font-weight: 400;
      font-family: HYLiLiangHeiJ;
      color: #ffffff;
      margin: 0 5px;
    }
  }
  .wyskinfo-row {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
  }
  .zha {
    margin-top: 10px;
  }
  .shuiku {
    margin-top: 15px;
    .shuiku-item {
      width: 286px;
      height: 75px;
      position: relative;

      .border-box-content {
        display: flex;
        flex-direction: row;
      }
      .shuiku-item-bg {
        width: 286px;
        height: 75px;
        position: absolute;
        background: linear-gradient(
          90deg,
          rgba(147, 232, 255, 0.5) 0%,
          rgba(147, 232, 255, 0.5) 100%
        );
        opacity: 0.2;
      }
      .shuiku-item-left {
        margin-left: 19px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 29px;
        img {
          width: 44px;
          height: 44px;
          margin-top: 3px;
        }
        .shuiku-name-dz {
          width: 54px;
          height: 11px;
          background: linear-gradient(
            0deg,
            rgba(82, 243, 246, 0.3) 0%,
            rgba(82, 243, 246, 0) 100%
          );
          margin-top: 7px;
        }
        .shuiku-name {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          position: absolute;
          top: 47px;
        }
      }
      .shuiku-item-content {
        flex: 1;
        line-height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .shuiku-content-box {
          padding: 5px 1px;
          background: #93e8ff;
          margin-right: 6px;
        }
        .content-title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
        .content-value {
          font-size: 24px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          display: inline-block;
          text-align: right;
          margin-right: 5px;
          margin-left: 8px;
        }
        .content-unit {
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
  .ba {
    margin-top: 17px;
    .ba-item {
      width: 188px;
      height: 80px;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 120px;
        height: 80px;
      }
      .ba-item-content {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 107px;
        line-height: 35px;
        .ba-title {
          font-size: 20px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
        .ba-value {
          font-size: 24px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          display: inline-block;
          flex: 1;
          text-align: left;
        }
        .ba-unit {
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
  .dv-bb7-line-width-5 {
    stroke-width: 3px !important;
  }

  .zha-item {
    width: 184px;
    height: 75px;
    position: relative;
    .zha-item-bg {
      width: 184px;
      height: 75px;
      position: absolute;
      background: linear-gradient(
        90deg,
        rgba(147, 232, 255, 0.5) 0%,
        rgba(147, 232, 255, 0.5) 100%
      );
      opacity: 0.2;
    }
    .border-box-content {
      display: flex;
      align-items: center;
    }
    img {
      width: 52px;
      height: 52px;
      margin: 0 8px;
    }
    .zha-item-content {
      display: flex;
      flex-direction: column;
      .content-title {
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
      .content-value {
        font-size: 24px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: inline-block;
        // width: 50px;
        text-align: left;
      }
      .content-unit {
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>
