<template>
  <div class="rainMapPc">
    <div class="rainMapPc-item" @click="openDialog()">
        <div class="rainMapPc-item-map">
             <!-- <dv-decoration-10 class="line1" style="155px;height:2px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']"/>
            <dv-decoration-10 class="line2" style="155px;height:2px;" :color="['rgba(202, 244, 255, 0.5)','rgba(202, 244, 255, 0.5)']" /> -->
            <div class="mapbox" ref="imageContainer"></div>
        </div>
    </div>
    <PlayImageDialogVue  :imgListAll="imgListAll" ref="imageDialog" dialogWidth="92%" @imageTimeChange='handleImageChange'></PlayImageDialogVue>
  </div>
</template>

<script>
import global from '@/api/global'
import PlayImageDialogVue from './PlayImageDialog.vue';
import playImage from '../PlayImage'
import {timeConvers} from '@/utils/tools.js'
export default {
  name: "rainMapPc",
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
      playimage.CanvasPlayFrames('96%')
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
.rainMapPc {
  width: calc(~"100% - 0px");
  height: 138px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .rainMapPc-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .rainMapPc-item-map{
        width: 100%;
        height: 140px;
        background: rgba(147, 232, 255, 0.05);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
         border: 1px solid rgba(147, 232, 255, 0.5);
         .line1{
            position: absolute;
            top: -2px;
        }
        .line2{
            position: absolute;
            bottom: -2px;
        }
        .mapbox{
            // width: 338px;
            height: 100%;
            // border: 1px solid rgba(147, 232, 255, 0.5);
        }

    }
  }
}
</style>