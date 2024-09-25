/**
 * @description 武阳干渠水位预报，通过拉伸面的高度来进行分析
 */
 class WYGQSWForecast {
    constructor(viewer, options) {
      this.positions = this.CoorsFormt(options.polygon);
      this.times_height = options.times_height;
      this.currentIndex = 0;
      this.initialHeight = this.times_height[this.currentIndex];
      this.targertHeight = this.times_height[this.currentIndex + 1];
      this.increaseHeight = this.targertHeight - this.initialHeight;
      this.waterColor = options.waterColor;
      this.show = options.show;
      this.start = null;
      this.clockEven = null
      this.if169 = options.if169
      this.pageData = options.pageData
      if(this.if169){
        // document.getElementsByClassName('homePC')[0].appendChild(this.vmInstance.$el)
      }else{

      }
      this.init();
      this.getNowHeight();
    }
    CoorsFormt(coors) {
      let Arr = [];
      coors.forEach((coor) => {
        Arr.push(coor[0]);
        Arr.push(coor[1]);
      });
      return Arr;
    }
    async init() {
      this.viewerSET();
      const self = this;
      this.property = this.computeFlight();
      window.viewer.scene.globe.depthTestAgainstTerrain = true;
    
      this.entity = window.viewer.entities.add({
        show: this.show,
        ////与时间轴关联
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: this.start,
            stop:Cesium.JulianDate.fromDate(self.pageData.endTime)
            // stop: Cesium.JulianDate.addMinutes(
            //   this.start,
            //   1 * this.times_height.length,
            //   new Cesium.JulianDate()
            // ),
          }),
        ]),
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(this.positions)
          ),
          extrudedHeight: this.property,//是指polygon拉伸后距离地面的拉伸高度  只有当extrudedHeight大雨height时才会出现挤出高度的效果，且polygon的厚度是两者的差值
          height:this.property,// 是指polygon距离地面的高度
          material: Cesium.Color.fromCssColorString(this.waterColor)
        },
      });
      //蔡贤
        // if(this.pageData.type == 0){
        //   var caixianLayer = window.viewer.scene.layers.find('面_3D@蔡贤水库边界');
        // caixianLayer.visible = false 
        // }else{
        //   var wangyingLayer = window.viewer.scene.layers.find('面_3D_NEW@王英水库边界');
        //   wangyingLayer.visible = false 
        // }
        
        
    }
  /*
  *时间水位与时间关联 
  */
    computeFlight() {
      let data = this.pageData.dataList
      let property = new Cesium.SampledProperty(Number);
      data.forEach((item, i) => {
        property.addSample(
          Cesium.JulianDate.addHours(
            this.start,
            1 * i,
            new Cesium.JulianDate()
          ),
          item.sw
        );
        //最后一个小时没数据
        if(i == data.length - 1){
          property.addSample(
            Cesium.JulianDate.addHours(
              this.start,
              1* (i + 1),
              new Cesium.JulianDate()
            ),
            item.sw
          );
        }
        
        // property.addSample(
        //   Cesium.JulianDate.addMinutes(
        //     this.start,
        //     1 * i,
        //     new Cesium.JulianDate()
        //   ),
        //   item
        // );
      });
      console.log('computeFlight')
      console.log(property)

      return property;
    }
  /*
  *设置时间
  */
    viewerSET() {
      console.log('viewerSET')
      document.getElementsByClassName('cesium-viewer-animationContainer')[0].setAttribute('style','display: normal;')
      document.getElementsByClassName('cesium-viewer-timelineContainer')[0].setAttribute('style','display: normal;')
      let startTime = this.pageData.startTime
      let endTime = this.pageData.endTime
      this.start = Cesium.JulianDate.fromDate(startTime);
      this.stop = Cesium.JulianDate.fromDate(endTime);
      // this.start = Cesium.JulianDate.addHours(
      //   this.start,
      //   8,
      //   new Cesium.JulianDate()
      // );
      // this.stop = Cesium.JulianDate.addMinutes(
      //   this.start,
      //   1 * this.times_height.length,
      //   new Cesium.JulianDate()
      // );
      window.viewer.clock.startTime = this.start.clone();
      window.viewer.clock.currentTime = this.start.clone();
      window.viewer.clock.stopTime = this.stop.clone();
      window.viewer.clock.canAnimate = true;//时间轴开启
      window.viewer.clock.shouldAnimate = true;//开启
      window.viewer.clock.multiplier = 3600 // 时间速率，数字越大时间过的越快
      if (window.viewer.timeline)
      window.viewer.timeline.zoomTo(this.start, this.stop);
      //clockRange属性表示时间轴达到终点之后的行为，用户可以根据自己的需要来设置，默认为: UNBOUNDED
      // CLAMPED：达到终止时间后停止
      // LOOP_STOP：达到终止时间后重新循环
      // UNBOUNDED：达到终止时间后继续读秒
      window.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
    }
    /**
     * 获取实时水面高度
     * 时钟滴答，一直在走
     */
    getNowHeight() {
      const self = this;
      self.clockEven = window.viewer.clock.onTick.addEventListener(function () {
        if (self.increaseHeight > 0) {
          if (self.initialHeight > self.targertHeight) {
            self.currentIndex += 1;
            if (self.currentIndex > self.times_height.length - 2) {
              self.currentIndex = 0;
            }
            self.initialHeight = self.times_height[self.currentIndex];
            self.targertHeight = self.times_height[self.currentIndex + 1];
            self.increaseHeight = self.targertHeight - self.initialHeight;
          }
        }
        if (self.increaseHeight < 0) {
          if (self.initialHeight < self.targertHeight) {
            self.currentIndex += 1;
            if (self.currentIndex > self.times_height.length - 2) {
              self.currentIndex = 0;
            }
            self.initialHeight = self.times_height[self.currentIndex];
            self.targertHeight = self.times_height[self.currentIndex + 1];
            self.increaseHeight = self.targertHeight - self.initialHeight;
          }
        }
        self.initialHeight += self.increaseHeight / 10;
        // console.log("self.initialHeight:"+self.initialHeight)
      });
    }
   
    /**
     * 改变颜色
     * @param {水体颜色} val
     */
    changeWaterColor(val) {
      this.entity.polygon.material = val;
    }
    /**
     * 隐藏与显示
     * @param {Boolean} val
     */
    changeWaterShow(val) {
      this.entity.show = val;
    }
   
    destroy() {
      document.getElementsByClassName('cesium-viewer-animationContainer')[0].setAttribute('style','display: none;')
      document.getElementsByClassName('cesium-viewer-timelineContainer')[0].setAttribute('style','display: none;')
      window.viewer.clock.canAnimate = false;//时间轴暂停
      window.viewer.clock.shouldAnimate = false;//暂停
      // 重置
      window.viewer.clock.currentTime = this.start.clone();
      this.clockEven()
      window.viewer.entities.remove(this.entity);

      //蔡贤
      // if(this.pageData.type == 0){
      //   var caixianLayer = window.viewer.scene.layers.find('面_3D@蔡贤水库边界');
      //   caixianLayer.visible = true 
      // }else{
      //   var wangyingLayer = window.viewer.scene.layers.find('面_3D_NEW@王英水库边界');
      //   wangyingLayer.visible = true 
      // }
      
      delete this.entity;
      delete this.positions;
      delete this.initialHeight;
      delete this.targertHeight;
      delete this.increaseHeight;
      delete this.pageData
      delete this.clockEven

      
      // if(this.vmInstance){
      //   this.vmInstance.$el.remove();
      //   this.vmInstance.$destroy();
      // }
    }
  }
   
  export default WYGQSWForecast;