<template>
  <div class="ldhbpc">
     <div class="ldhbpc-item"  @click="openDialog()">
        <div class="ldhbpc-item-map">
            <dv-decoration-10 class="line1" style="540px;height:3px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']"/>
            <dv-decoration-10 class="line2" style="width:540px;height:3px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']" />
            <div class="mapbox" ref="imageContainer"></div>
        </div>
    </div> 
     <PlayImageDialogVue  :imgListAll="imgListAll" dialogWidth="87%" ref="imageDialog" @imageTimeChange='handleImageChange'></PlayImageDialogVue>
  </div>
</template>

<script>
import global from '@/api/global'
import PlayImageDialogVue from './PlayImageDialog.vue';
import playImage from '../PlayImage'
import {timeConvers} from '@/utils/tools.js'
export default {
  name: "ldhbpc",
  props: {},
  components: {
    PlayImageDialogVue
  },
  data() {
    return {
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
      that.$api.gqjc.getZHJC_LDT(params).then((res) => {
        // console.log('获取图片列表')
        if(res.code == 200){
           let data =  res.data
           data.forEach(element => {
              that.imgListAll.push(global.imgUrl+element);
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
.ldhbpc {
  width: calc(~"100% - 40px");
  height: 195px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .ldhbpc-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .ldhbpc-item-title{
         display: flex;
        flex-direction: row;
        align-items: center;
        img{
            width: 12px;
            height: 18px;
            margin-right: 9px;
        }
        .titleBg{
            width: 259px;
            height: 22px;
            line-height: 20px;
            background: linear-gradient(90deg, rgba(147,232,255,0.25) 0%, rgba(147,232,255,0) 100%);
            span{
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #FFFFFF;
                background: linear-gradient(0deg, #52F3F6 0%, #FFFFFF 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
    .ldhbpc-item-map{
        // width: 240px;
        // height: 186px;
        width: 540px;
        height: 173px;
        background: rgba(147, 232, 255, 0.05);
        margin-left: 22px;
        // margin-top: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .line1{
            position: absolute;
            top: -3px;
        }
        .line2{
            position: absolute;
            bottom: -3px;
        }
        .mapbox{
            // width: 224px;
            // height: 176px;
             width: 516px;
            height: 160px;
            // border: 1px solid rgba(147, 232, 255, 0.5);
            // background-image: url('../../assets/testImage/wxy.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
         .mapbox2{
           width: 224px;
            height: 176px;
            border: 1px solid rgba(147, 232, 255, 0.5);
            background-image: url('../../assets/testImage/ldt.png');
            background-size: 100% 100%;
        }

    }
  }
}
</style>