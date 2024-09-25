<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="40%"
    :modal-append-to-body="false"
    @close="closeDialog"
    class="playImageD"
  >
    <template slot="title">
      <div style="display: flex">
        <h4 style="margin-bottom: 0; font-size: 17px">气象展示</h4>
      </div>
    </template>
    <div class="playImageboxpc" v-loading='loading'  element-loading-text="获取图像中···">
      <div ref="videoContainer" class="videoContainer"/>
      <div class="videoTime">
        <span>时间选择：</span>
        <el-radio-group v-model="radioTime" @input="handleRadioChage">
          <el-radio-button label="前天"></el-radio-button>
          <el-radio-button label="昨天"></el-radio-button>
          <el-radio-button label="今天"></el-radio-button>
        </el-radio-group>
      </div>
       <div class="videoBtn">
          <div class="btn-box">
            <div class="btncommon goTopCls" @click="goFor('frist')">第一张</div>
            <div class="btncommon prevCls" @click="prev" >上一张</div>
            <div v-if="ispause" class="btncommon play" @click="play" >播放</div>
            <div v-if="!ispause" class="btncommon pause" @click="pause" >暂停</div>
            <div class="btncommon nextCls" @click="next" >下一张</div>
            <div class="btncommon goLastCls" @click="goFor('last')" >最后一张</div>
          </div>
       </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
    props:{
        imgListAll:{
        type: Array,
        default:[],
        },
        dialogWidth:{
          type:String,
          default:'100%'
        }
    },
    watch:{
      imgListAll:{
         handler(newval, oldVal){
          console.log('图片列表改变了')
          this.loading = false
           this.resetData();
           this.CanvasPlayFrames()
           this.play()
         },
         deep:true //true 深度监听
     }
    },
    data (){
      return{
        loading:false,
        dialogVisible:false,
        radioTime:'今天',
        currentIdx: 0, //当前index
        currentFrameList: [], // 当前播放帧列表
        // 视频预览
        canvas: null,
        ctx: null,
        timer: null, // 定时器
        infinite: 1000000000, // 循环次数
        ispause: true, // 是否是暂停状态
        plusNum: 0, // 帧总量
        plusCount: 0, // 帧总量计数器(判断循环次数)
        count: 0, // 当前帧
        fps: 1, // 25帧/秒
        loop: 'infinite', // 是否循环
        recordFrom: 0, // 记录起始帧
        recordTo: null, // 记录结束帧
        imgsLen: null // 记录帧长度
      }
    },
    mounted () {
    },
    methods: {
      openDialog(){
        this.radioTime = '今天'
        this.dialogVisible = true
      },
      //单选框选择改变
      handleRadioChage(val){
        this.destroy()
        this.$emit('imageTimeChange',val)
         this.loading = true
      },
    // 重置数据 停止并回到第一帧或cover帧
    resetData() {
      this.ispause = true
      clearInterval(this.timer)
      this.plusNum = 0
      this.plusCount = 0
 
      // 重置记录
      this.recordFrom = 0
      this.recordTo = this.imgsLen - 1
      this.loop = 'infinite'
      this.infinite = 1000000000
      this.count = 0
    },
    // 初始化帧播放
    CanvasPlayFrames() {
      // 1.创建canvas
      const videoContainer = this.$refs.videoContainer
      if(videoContainer !== undefined){
        const canvas = document.createElement('canvas')
        canvas.width = 654
        canvas.height = 480
        canvas.style.display = 'block'
        canvas.style.width = this.dialogWidth
        // canvas.style.height = this.dialogWidth
        this.ctx = canvas.getContext('2d')
        videoContainer.appendChild(canvas)
        this.canvas = canvas
        // 2.初始化数据(当前播放的图片列表)
        this.currentFrameList = this.imgListAll
  
        this.imgsLen = this.currentFrameList.length
        this.recordTo = this.imgsLen - 1
        // 3.设置封面
        this.drawImg(this.imgListAll[this.currentIdx])
        // this.currentFrame = this.currentFrameList[0].frame
      }
    },
    // 加载图片
    drawImg(imgSrc) {
      const img = new Image()
      const that = this
      img.onload = function() {
        img.onload = null
        if(that.ctx !== null && that.ctx.drawImage !== null){
           that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height)
        }
        // 判断图片有没有宽度
        if (img.width !== 0) {
          // 设置画布的宽高，并使图片居中显示
          let imgWidth
          let imgHeight
          if (img.width <= 654) {
            if (img.height > 480) {
              imgHeight = 480
              imgWidth = img.width * (480 / img.height)
            } else {
              imgHeight = img.height
              imgWidth = img.width
            }
          } else {
            if (img.height > 480) {
              const a = 654 / img.width
              const b = 480 / img.height
              if (a <= b) {
                imgWidth = img.width * a
                imgHeight = img.height * a
              } else {
                imgWidth = img.width * b
                imgHeight = img.height * b
              }
            } else {
              imgWidth = 654
              imgHeight = img.height * (654 / img.width)
            }
          }
          that.ctx.drawImage(
            img,
            Math.round((654 - imgWidth) / 2),
            Math.round((480 - imgHeight) / 2),
            imgWidth,
            imgHeight
          )
        }
      }
      img.onerror = function(e) {
        console.log(e)
      }
      img.src = imgSrc
    },
    // 播放方法 | 从当前位置播放动画，会继承上次使用fromTo、form或to的属性
    play() {
      if (this.currentFrameList.length === 0) {
        return
      }
      this.fromTo(this.recordFrom, this.recordTo, this.loop)
      this.ispause = false
    },
    fromTo(from, to, loop) {
      const self = this
 
      // 先清除上次未执行完的动画
      clearInterval(this.timer)
 
      const timeFn = function timeFn() {
        if (self.ispause) {
          return
        }
        // 当总量计数器达到帧总量的时候退出
        if (self.plusNum <= self.plusCount) {
          self.resetData()
          return
        } else {
          // 未达到，继续循环
          // 帧计数器
          self.count++
          // 一次循环结束，重置keyCount为from
          if (self.count > to) {
            self.count = from
          }
          self.goto(self.count)
          // 总量计数器
          self.plusCount++
        }
      }
      // 总量计数器
      this.plusCount = 0
 
      loop = !loop || loop === 'infinite' ? this.infinite : loop
 
      // 帧总量 帧数*循环次数first
      this.plusNum = (to - from + 1) * loop
      this.ispause = true
 
      this.recordFrom = from
      this.recordTo = to
      this.loop = loop
 
      timeFn()
      this.timer = setInterval(timeFn, 1000 / this.fps)
    },
    // 暂停
    pause() {
      this.ispause = true
    },
    // 跳到某一帧
    goto(n) {
      this.count = n
      this.drawImg(this.currentFrameList[n])
    },
    //  上一帧
    prev() {
      this.ispause = true
      const n = this.count - 1 < 0 ? this.imgsLen - 1 : this.count - 1
      this.goto(n)
    },
    //  下一帧
    next() {
      this.ispause = true
      const n = this.count + 1 >= this.imgsLen ? 0 : this.count + 1
      this.goto(n)
    },
    // 置顶置尾
    goFor(type) {
      this.resetData()
      if (type === 'frist') {
        this.resetData()
        this.goto(0)
      } else {
        this.resetData()
        this.goto(this.currentFrameList.length - 1)
      }
    },
    //  销毁对象
    destroy() {
      clearInterval(this.timer)
      this.timer = null
      this.ctx = null
      this.canvas && this.canvas.remove()
      this.canvas = null
      this.loading = false
    },
    closeDialog(){
      this.destroy()
      this.dialogVisible = false
    },
    }
}
</script>
<style lang="less">
.playImageD {
  .el-loading-mask{
    background-color: rgba(9, 34, 57, 0.5);
  }
  .el-loading-spinner .el-loading-text{
    font-size: 18px !important;
  }
  .el-dialog {
    background: rgba(9, 34, 57, 0.75);
    margin-top: 9vh !important;
  }
  .el-dialog__body {
    padding: 0;
    position: relative;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: rgba(24, 194, 199, 1);
    font-size: 30px;
  }
  .playImageboxpc{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    box-sizing: border-box;
    position: relative;
    .videoContainer {
      width: 100%;
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-loading-mask {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    .videoTime{
       position: absolute;
       top:10px;
       left: 20px;
       color:#ffffff;
       .el-radio-button__inner{
        background: rgba(29, 43, 81, 0.2);
        border: 1px solid #265AA5;
        color: #8BC2F2;
        font-size: 14px;
        padding: 5px 10px;
       }
       .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        color: #FFF;
        background-color: #265AA5;
        border-color: #265AA5;
       }
    }
    .videoBtn {
        width: 100%;
        height: 30px;
        position: absolute;
        bottom:20px;
        .btn-box {
          margin: 0 auto;
          width: 500px;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .btncommon{
            width: 70px;
            height: 30px;
            cursor: pointer;
            background: rgba(38, 90, 165, 0.5);
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            line-height: 30px;
            border-radius: 5px;
          }
          .goTopCls {
            // width: 12px;
            // height: 13px;
            // cursor: pointer;
            //  background: #ffffff;
            // background-size: cover;
            // background-image: url('~@/assets/images/videoPre/com-t.png');
            // &:hover {
            //   background-image: url('~@/assets/images/videoPre/hover-t.png');
            // }
            // &:active {
            //   background-image: url('~@/assets/images/videoPre/click-t.png');
            // }
          }
          .prevCls {
            // width: 8px;
            // height: 13px;
            // cursor: pointer;
            //  background: #ffffff;
            // background-size: cover;
            // background-image: url('~@/assets/images/videoPre/com-l.png');
            // &:hover {
            //   background-image: url('~@/assets/images/videoPre/hover-l.png');
            // }
            // &:active {
            //   background-image: url('~@/assets/images/videoPre/click-l.png');
            // }
          }
          .play {
            // width: 22px;
            // height: 22px;
            // cursor: pointer;
             background: #EF9B39;
            // background-size: cover;
            // background-image: url('~@/assets/images/videoPre/com-p.png');
            // &:hover {
            //   background-image: url('~@/assets/images/videoPre/hover-p.png');
            // }
            // &:active {
            //   background-image: url('~@/assets/images/videoPre/click-p.png');
            // }
          }
          .pause {
            // width: 22px;
            // height: 22px;
            // cursor: pointer;
             background: #EF9B39;
            // background-size: cover;
            // background-image: url('~@/assets/images/videoPre/com-v.png');
            // &:hover {
            //   background-image: url('~@/assets/images/videoPre/hover-v.png');
            // }
            // &:active {
            //   background-image: url('~@/assets/images/videoPre/click-v.png');
            // }
          }
          .nextCls {
            // width: 8px;
            // height: 13px;
            // cursor: pointer;
            //  background: #ffffff;
            // background-size: cover;
            // background-image: url('~@/assets/images/videoPre/com-r.png');
            // &:hover {
            //   background-image: url('~@/assets/images/videoPre/hover-r.png');
            // }
            // &:active {
            //   background-image: url('~@/assets/images/videoPre/click-r.png');
            // }
          }
          .goLastCls {
            width: 100px;
            // height: 13px;
            // cursor: pointer;
            // background: #ffffff;
            // background-size: cover;
            // background-image: url('~@/assets/images/videoPre/com-b.png');
            // &:hover {
            //   background-image: url('~@/assets/images/videoPre/hover-b.png');
            // }
            // &:active {
            //   background-image: url('~@/assets/images/videoPre/click-b.png');
            // }
          }
        }
      }
  }
}
</style>