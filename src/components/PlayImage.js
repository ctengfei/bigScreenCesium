
/**
 * 图片播放
 */
class PlayImage {
    constructor(options) {
        this.context = options.context
        this.videoContainer = options.videoContainer 
        this.imgListAll = options.imgListAll
        this.currentIdx = 0 //当前index
        this.currentFrameList = []// 当前播放帧列表
        this.canvas = null
        this.timer = null;// 定时器
        this.infinite = 1000000000 // 循环次数
        this.ispause = true // 是否是暂停状态
        this.plusNum = 0 // 帧总量
        this.plusCount=  0 // 帧总量计数器(判断循环次数)
        this.count=  0 // 当前帧
        this.fps= 1 // 25帧/秒
        this.loop= 'infinite' // 是否循环
        this.recordFrom= 0 // 记录起始帧
        this.recordTo=  null // 记录结束帧
        this.imgsLen=  null // 记录帧长度
    }
    // 重置数据 停止并回到第一帧或cover帧
    resetData() {
        // if(this.timer !== null){
        //     $.clearInterval(this.timer)
        // }
        this.ispause = true
        this.plusNum = 0
        this.plusCount = 0
        // 重置记录
        this.recordFrom = 0
        this.recordTo = this.imgsLen - 1
        this.loop = 'infinite'
        this.infinite = 1000000000
        this.count = 0
        
      }
      // 初始化帧播放
      CanvasPlayFrames(height) {
        // 1.创建canvas
        const canvas = document.createElement('canvas')
        canvas.width = 654
        canvas.height = 480
        canvas.style.display = 'block'
        // canvas.style.width = '100%'
        canvas.style.height = height
        this.ctx = canvas.getContext('2d')
        this.videoContainer.appendChild(canvas)
        this.canvas = canvas
        // 2.初始化数据(当前播放的图片列表)
        this.currentFrameList = this.imgListAll
   
        this.imgsLen = this.currentFrameList.length
        this.recordTo = this.imgsLen - 1
        // 3.设置封面
        this.drawImg(this.imgListAll[this.currentIdx])
        // this.currentFrame = this.currentFrameList[0].frame
      }
      // 加载图片
      drawImg(imgSrc) {
        const img = new Image()
        const that = this
        img.onload = function() {
          img.onload = null
          that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height)
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
      }
      // 播放方法 | 从当前位置播放动画，会继承上次使用fromTo、form或to的属性
      play() {
        if (this.currentFrameList.length === 0) {
          return
        }
        this.fromTo(this.recordFrom, this.recordTo, this.loop)
        this.ispause = false
      }
      timeFn(self) {
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
          if (self.count > self.recordTo) {
            self.count = self.recordFrom
          }
          self.goto(self.count)
          // 总量计数器
          self.plusCount++
        }
      }
      fromTo(from, to, loop) {
        // 总量计数器
        this.plusCount = 0
   
        loop = !loop || loop === 'infinite' ? this.infinite : loop
   
        // 帧总量 帧数*循环次数first
        this.plusNum = (to - from + 1) * loop
        this.ispause = true
   
        this.recordFrom = from
        this.recordTo = to
        this.loop = loop
      }
      // 暂停
      pause() {
        this.ispause = true
      }
      // 跳到某一帧
      goto(n) {
        this.count = n
        this.drawImg(this.currentFrameList[n])
      }
      //  上一帧
      prev() {
        this.ispause = true
        const n = this.count - 1 < 0 ? this.imgsLen - 1 : this.count - 1
        this.goto(n)
      }
      //  下一帧
      next() {
        this.ispause = true
        const n = this.count + 1 >= this.imgsLen ? 0 : this.count + 1
        this.goto(n)
      }
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
      }
      //  销毁对象
      destroy() {
        delete this.timer
        delete this.ctx
        this.canvas && this.canvas.remove()
        delete this.canvas
      }
}
export default PlayImage;