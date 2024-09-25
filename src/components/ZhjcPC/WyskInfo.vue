<!--王英水库基本概况-->
<template>
  <div class="wyskinfopc">
    <!-- <dv-border-box-7
      class="wyskinfopc-top"
      :color="['transparent', 'rgba(147, 232, 255, 0.8)']"
    > -->
    <div class="wyskinfopc-top">
      <!-- <div class="wyskinfopc-top-bg"></div> -->
      <span class="content-title">水库规模</span>
      <span class="content-total">总数：</span>
      <span class="content-value">{{pageData.resTotalNum || '--'}}</span>
      <span class="content-unit">座</span>
    <!-- </dv-border-box-7> -->
    </div>
    <div class="wyskinfopc-row ba">
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
    <div class="wyskinfopc-row shuiku">
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
    <div class="wyskinfopc-row zha">
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
.wyskinfopc {
  margin-top: 10px;
  font-family: Microsoft YaHei;
  .wyskinfopc-top {
    width: 377px;
    height: 23px;
    background-image: url('@/assets/images/common/rowBg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    align-items: center;

    // .wyskinfopc-top-bg {
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
      font-size: 14px;
      font-family: SourceHanSansCN-Heavy;
      font-weight: 800;
      color: #ffffff;
      margin-left: 9px;
    }
    .content-total {
      font-size: 12px;
      font-weight: 400;
      color: rgba(147, 232, 255, 0.8);
      flex: 1;
      text-align: right;
    }
    .content-unit {
      font-size: 12px;
      font-weight: 400;
      color: rgba(147, 232, 255, 0.8);
      margin-right: 16px;
    }
    .content-value {
      font-size: 18px;
      font-weight: 400;
      font-family: hyliliangheij;
      color: #ffffff;
      margin: 0 5px;
    }
  }
  .wyskinfopc-row {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
  }
  .zha {
    margin-top: 6px;
  }
  .shuiku {
    margin-top: 15px;
    .shuiku-item {
      width: 185px;
      height: 49px;
      position: relative;

      .border-box-content {
        display: flex;
        flex-direction: row;
      }
      .shuiku-item-bg {
        width: 185px;
        height: 49px;
        position: absolute;
        background: linear-gradient(
          90deg,
          rgba(147, 232, 255, 0.5) 0%,
          rgba(147, 232, 255, 0.5) 100%
        );
        opacity: 0.2;
      }
      .shuiku-item-left {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 22px;
        img {
          width: 28px;
          height: 28px;
          margin-top: 3px;
        }
        .shuiku-name-dz {
          width: 35px;
          height: 8px;
          background: linear-gradient(
            0deg,
            rgba(82, 243, 246, 0.3) 0%,
            rgba(82, 243, 246, 0) 100%
          );
          margin-top: 4px;
        }
        .shuiku-name {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          position: absolute;
          top: 25px;
          transform:scale(0.5)
        }
      }
      .shuiku-item-content {
        flex: 1;
        line-height: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .shuiku-content-box {
          padding: 3px 1px;
          background: #93e8ff;
          margin-right: 4px;
        }
        .content-title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
        .content-value {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          display: inline-block;
          text-align: right;
          margin-right: 5px;
          margin-left: 6px;
        }
        .content-unit {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
  .ba {
    margin-top: 11px;
    .ba-item {
      width: 125px;
      height: 52px;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 78px;
        height: 52px;
      }
      .ba-item-content {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 69px;
        line-height: 20px;
        .ba-title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
        }
        .ba-value {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          display: inline-block;
          flex: 1;
          text-align: left;
        }
        .ba-unit {
          font-size: 12px;
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
    width: 120px;
    height: 49px;
    position: relative;
    .zha-item-bg {
      width: 120px;
      height: 49px;
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
      width: 38px;
      height: 38px;
      margin: 0 3px;
    }
    .zha-item-content {
      display: flex;
      flex-direction: column;
      .content-title {
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
      .content-value {
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: inline-block;
        // width: 50px;
        text-align: left;
      }
      .content-unit {
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>
