<template>
  <div class="custom-ruler" v-if="ifShowPlayDetail">
    <vue-slider
        ref="slider"
        v-model="val"
        direction="btt"
        :min="minValue"
        :max="maxValue"
        :order="false"
        :marks="marks"
        width="5px"
        :dotOptions="dotOptions"
        :tooltip-placement="'right'"
        :tooltip="'always'"
        :tooltip-formatter="formatTooltip"
        style="height: 336px;margin-left: 20px"
    ></vue-slider>
    <li class="line-a"><span>校核：{{ info.xh }}</span></li>
    <li class="line-b"><span>设计：{{ info.sj }}</span></li>
    <li class="line-c"><span>死水位：{{info.ssw }}</span></li>
  </div>
</template>

<script>
export default {
  props: {
    'ifShowPlayDetail': {
      type: Boolean
    }
  },
  data() {
    return {
      dotOptions:{disabled:true},
      val: 50,
      range:[50,55,60,65,70,80,85],
      maxValue: 85,
      minValue: 50,
      index: -1,
      formatTooltip:'{value}m',
      timer: null,
      marks: {
        '50':{
          label: '50m',
          labelStyle: {
            color:'#87D2E4',
            fontWeight:'bold'
          }
        },
        '55':{
          label: '55m',
          labelStyle: {
            color:'#87D2E4',
            fontWeight:'bold'
          }
        },
        '60':{
          label: '60m',
          labelStyle: {
            color:'#87D2E4',
            fontWeight:'bold'
          }
        },
        '65':{
          label: '65m',
          labelStyle: {
            color:'#87D2E4',
            fontWeight:'bold'
          }
        },
        '70':{
          label: '70m',
          labelStyle: {
            color:'#87D2E4',
            fontWeight:'bold'
          }
        },
        '75':{
          label: '75m',
          labelStyle: {
            color:'#87D2E4',
            fontWeight:'bold'
          }
        },
        '80':{
          label: '80m',
          labelStyle: {
            color:'#87D2E4',
            fontWeight:'bold'
          }
        },
        '85':{
          label: '85m',
          labelStyle: {
            color:'#87D2E4',
            fontWeight:'bold'
          }
        },
      },
      info: {
        xh: '73.37m',
        sj: '71.91m',
        ssw: '58.5m'
      }
    }
  },
  watch: {
    ifShowPlayDetail: function (val) {
      if (!val) {
        clearTimeout(this.timer)
        this.index = -1;
        this.val = 50;
      }
    }
  },
  created() {
  },
  mounted() {
    this.$bus.on('getRulerRow', (row) => {
      let params = {
        glid: row.id,
        stcd: row.type == 0 ? '61608212' : '61608180'
      }
      this.$api.fxxs.getFXXS_DDFAYB(params).then(res => {
        const result = res.data;
        if (result && result.length > 0) {
          this.info = result[0].stName.startsWith('王英') ? {
            xh: '73.37m',
            sj: '71.91m',
            ssw: '58.5m'
          } : {
            xh: '72.59m',
            sj: '71.72m',
            ssw: '58m'
          }
          let dates = [];
          let range
          this.timer = setInterval(() => {
            this.index++;
            if (this.index > result.length - 1) {
              this.index = -1;
              clearInterval(this.timer);
              return;
            }
            range = result[this.index].rz;
            this.val = range;
            if(range < 50){
              this.val = 50
            }else if(range > 85){
              this.val = 85
            }
            this.$nextTick(() => {
              this.$refs.slider.setValue(this.val)
            })
          }, 1000)
        }
      })
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
li {
  list-style-type: none;
}

::v-deep .el-slider__stop {
  background: #FE592BFF;
  border-radius: 0;
  z-index: 10;
  height: 3px;
}

::v-deep .el-slider__button {
  pointer-events: none;
}

::v-deep .el-slider__button-wrapper {
  pointer-events: none;
}

::v-deep .el-slider__bar {
  z-index: 11;
}

.custom-ruler {
  position: relative;
  display: flex;
  align-items: center;
  height: 336px;
  width: 200px;

  li {
    position: absolute;
    right: 0;
    height: 1px;
    line-height: 0px;
    width: 140px;
    font-size: 15px;
    text-align: center;
    border-top: 1px dashed #DE4841;
    color: #DE4841;

    span {
      background: rgb(27 47 54);
      padding: 0 5px;
      border-radius: 100%;
      font-weight: bold;
    }
  }

  .line-a {
    top: 115px;
  }

  .line-b {
    top: 132px;
  }

  .line-c {
    top: 254px;
  }
}
</style>