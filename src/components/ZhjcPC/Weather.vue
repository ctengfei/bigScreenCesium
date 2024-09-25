<template>
  <div class="weatherpc">
    <div class="wearherBtn pcleft" :class="!isShowQX?'pcchecked':''" @click="handleBtn(0)">卫星云图</div>
    <div class="wearherBtn pcright" :class="isShowQX?'pcchecked':''" @click="handleBtn(1)">雷达回波图</div>
    <div class="weatherpc-qxzs" v-show="isShowQX">
      <div class="weatherpc-item"  @click="openDialog()">
        <div class="weatherpc-item-map">
            <!-- <dv-decoration-10 class="line1" style="155px;height:2px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']"/>
            <dv-decoration-10 class="line2" style="155px;height:2px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']" /> -->
            <div class="mapbox"  ref="imageContainer"></div>
        </div>
      </div>
       <!-- <div class="weatherpc-item">
        <div class="weatherpc-item-title"><img src="../../assets/images/common/rightArrow.png"/><div class="titleBg"><span>卫星云图</span></div></div>
        <div class="weatherpc-item-map">
            <dv-decoration-10 class="line1" style="155px;height:2px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']"/>
            <dv-decoration-10 class="line2" style="width:155px;height:2px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']" />
            <div class="mapbox"></div>
        </div>
    </div>
    <div class="weatherpc-item">
        <div class="weatherpc-item-title"><img src="../../assets/images/common/rightArrow.png"/><div class="titleBg"><span>雷达回波图</span></div></div>
        <div class="weatherpc-item-map">
            <dv-decoration-10 class="line1" style="155px;height:2px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']"/>
            <dv-decoration-10 class="line2" style="width:155px;height:2px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']" />
            <div class="mapbox2"></div>
        </div>
    </div> -->
    </div>
   <rain-map class="weatherpc-rain" v-show="!isShowQX"></rain-map>
    <PlayImageDialogVue  :imgListAll="imgListAll" ref="imageDialog" dialogWidth="98%" @imageTimeChange='handleImageChange'></PlayImageDialogVue>
  </div>
</template>

<script>
import global from '@/api/global'
import RainMap from '@/components/ZhjcPC/RainMap.vue';
import PlayImageDialogVue from './PlayImageDialog.vue';
import playImage from '../PlayImage'
import {timeConvers} from '@/utils/tools.js'
export default {
  name: "weatherpc",
  props: {},
   components:{
    RainMap,
    PlayImageDialogVue
  },
  data() {
    return {
      isShowQX:true,
      imgListAll:[],
        ifInit:true,
        timer:null,
        pagePlay:null,
    };
  },
  watch: {},
  mounted() {
     let time = timeConvers(new Date(),'yyyy-MM-dd',1)
    this.getImgAllList(time)
  },
  methods: {
    handleBtn(val){
      if(val == 0){
        this.isShowQX = true
      }else{
        this.isShowQX = false
      }
    },
    openDialog(){
      this.$refs.imageDialog.openDialog()
      this.$refs.imageDialog.resetData()
      setTimeout(() =>{
        this.$refs.imageDialog.CanvasPlayFrames()
        this.$refs.imageDialog.play()
      },500)
      
    },
    //图片的时间改变
    handleImageChange(val){
      let time = timeConvers(new Date(),'yyyy-MM-dd',1)
      let seconds = new Date().getTime()
      if(val == '前天'){
        let qt = seconds - 1000 * 60 * 60 * 24 * 2
        time = timeConvers(new Date(qt),'yyyy-MM-dd',1)

      }else if(val == '昨天'){
        let qt = seconds - 1000 * 60 * 60 * 24
        time = timeConvers(new Date(qt),'yyyy-MM-dd',1)
      }
      this.getImgAllList(time)

    },
    // 获取图片列表列表
    getImgAllList(time) {
        let that = this
        let params = {
             date: time,
        }
      that.$api.gqjc.getZHJC_WXYT(params).then((res) => {
        // console.log('获取图片列表')
        if(res.code == 200){
           let data =  res.data
          res.data.forEach(element => {
              this.imgListAll.push(global.imgUrl+element);
           });
           if(that.ifInit){
             that.startPlayImage()
             that.ifInit = false
           }
        }
      }).catch(() => {
            
      });
    },
    //播放图片
    startPlayImage(){
      let that = this
      var playimage = new playImage(
        {
          context: that,
          videoContainer: this.$refs.imageContainer,
          imgListAll: that.imgListAll
        }
      )
      clearInterval(that.timer)
      playimage.resetData()
      playimage.CanvasPlayFrames('100%')
      playimage.play()
      that.timer = setInterval(() =>{
        playimage.timeFn(playimage)
      }, 1000)
      this.pagePlay = playimage
    },
  },
   beforeDestroy() {
     clearInterval(this.timer)
      this.timer = null
      this.pagePlay.destroy()
    }
};
</script>

<style lang="less">
.weatherpc {
  width: calc(~"100% - 40px");
  height: 100%;
  position: relative;
 
  .weatherpc-qxzs{
     display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }
  .weatherpc-item{
    flex: 1;
    display: flex;
    // flex-direction: column;
    cursor: pointer;
    .weatherpc-item-title{
         display: flex;
        flex-direction: row;
        align-items: center;
        img{
            width: 9px;
            height: 13px;
            margin-right: 5px;
        }
        .titleBg{
            width: 168px;
            height: 15px;
            line-height: 15px;
            background: linear-gradient(90deg, rgba(147,232,255,0.25) 0%, rgba(147,232,255,0) 100%);
            span{
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #FFFFFF;
                background: linear-gradient(0deg, #52F3F6 0%, #FFFFFF 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
    .weatherpc-item-map{
        width: 100%;
        height: 185px;
        background: rgba(147, 232, 255, 0.05);
         border: 1px solid rgba(147, 232, 255, 0.5);
        // margin-left: 14px;
        // margin-top: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
         .line1{
            position: absolute;
            top: -2px;
        }
        .line2{
            position: absolute;
            bottom: -2px;
        }
        .mapbox{
            // width: 95%;
            height: 100%;
            // border: 1px solid rgba(147, 232, 255, 0.5);
            // background-image: url('../../assets/testImage/wxy.png');
            background-size: 100% 100%;
        }
        .mapbox2{
            width: 145px;
            height: 102px;
            border: 1px solid rgba(147, 232, 255, 0.5);
            background-image: url('../../assets/testImage/ldt.png');
            background-size: 100% 100%;
        }

    }
  }
  .weatherpc-rain{
    position: absolute;
    left: 0;
    top: 0;
  }
  .wearherBtn{
    width: 80px;
    height: 25px;
    background: linear-gradient(5deg, #092133 0%, #207692 100%);
    border-radius: 3px;
    font-size: 14px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #FFFFFF;
    text-align: center;
    cursor: pointer;
  }
  .pcleft{
    position: absolute;
    left: -2px;
    top: -22px;
  }
  .pcright{
    position: absolute;
    right: -2px;
    top: -22px;
  }
  .pcchecked{
    color: #4EA2BB;
  }
}
</style>