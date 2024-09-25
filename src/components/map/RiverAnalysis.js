/**
 * @description 河流流动分析
 * 
 */
 import point3D from '../../static/point_3D_lj.json'
 import line3D from '../../static/line_3D_lj.json'
 import area3D from '../../static/area_3D_lj.json'
 import canalmainJson from '../../static/CANAL_MAIN.json'
 import MaterialProperty from'./PolylineTrailLinkMaterialProperty.js'
 class RiverAnalysis {
    constructor(options) {
      console.log(options)
      this.waterColor = options.waterColor;
      this.show = options.show;
      this.pageData = options.pageData
      this.positions = this.CoorsFormt();
      this.start = null;
      this.stop = null;
      this.renderEven = null
      //设置时间
      this.viewerSET();
      
      // this.init();
      // this.getNowHeight();
    }
    CoorsFormt() {
      let list = line3D.features[0].geometry.coordinates
        let pointList = []
        list.forEach((point,index) =>{
            pointList.push(point[0])
            pointList.push(point[1])
            pointList.push(point[2] + 5)
        })
        // console.log(pointList)
      return pointList;
    }
    async init() {
      const self = this;
      window.viewer.scene.globe.depthTestAgainstTerrain = true;
      self.river = window.viewer.entities.add({
        name : 'river',
        followSurface : true,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 30000),
        polyline: {
          // This callback updates positions each frame.
          positions: new Cesium.CallbackProperty(function(time, result){
            let totaldiff = Cesium.JulianDate.secondsDifference(self.stop, self.start);
            // console.log('totaldiff:'+totaldiff)
            let diff = Cesium.JulianDate.secondsDifference(time, self.start);
            // console.log('diff:'+diff)
            let bei = diff/totaldiff
            // console.log('bei:'+bei)
            let posLength = self.positions.length
            let sliceIndex = parseInt(posLength * bei)
            sliceIndex = parseInt(sliceIndex/3)
            // console.log('sliceIndex:'+sliceIndex)
            let array = self.positions.slice(0, sliceIndex * 3)
            let endLongitude = self.positions[0] - 0.001 * Cesium.JulianDate.secondsDifference(time, self.start);
            // array = [self.positions[0],self.positions[1],60,endLongitude,self.positions[1],60]
            // console.log(array)
            return Cesium.Cartesian3.fromDegreesArrayHeights(
                array,
                // Cesium.Ellipsoid.WGS84,
                // result
            )
          }, false),
          width: 50,
          material:  new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.SKYBLUE,10000),
          // clampToGround: true, // 线是否固定在地面
        },
      });
    }
    startRiverAnalysis(){
      this.init()
      let self = this
      let perHeight = 500
      let maxWidth = 50
      let perWidth = 5
      this.renderEven = window.viewer.scene.postRender.addEventListener(function(){ // 每一帧都去计算气泡的正确位置
        if(self.show === true){
          var position = window.viewer.scene.camera._position;
          var cartographic = Cesium.Cartographic.fromCartesian(position);
          var currtenHeight = cartographic.height;
          // console.log('currtenHeight:'+currtenHeight)
          for(var i=1;i<=10;i++){
            if(currtenHeight>=perHeight*i && currtenHeight<=(perHeight*i+perHeight)){
              if(currtenHeight<500){
                self.river.polyline.width = maxWidth
                // console.log('polyline.width:'+maxWidth)
              }
              else if(currtenHeight>500 && self.river.polyline.width._value !== maxWidth-perWidth*i){
                self.river.polyline.width = maxWidth-perWidth*i
                // console.log('polyline.width:'+self.river.polyline.width)
              }
            }
          }
        }
      });
      
    }

    /*
    *时间水流与时间关联 
    */
    getLinePoint(time, result) {
      let self = this
      console.log('getLinePoint')
      let startMill = self.pageData.startTime.getTime()
      let endMill = self.pageData.endTime.getTime()
      let totaldiff = endMill - startMill
      let diff = Cesium.JulianDate.secondsDifference(time, self.start);
      let bei = diff/totaldiff
      let posLength = self.positions.length
      let sliceIndex = posLength * bei
      sliceIndex = sliceIndex + sliceIndex%3
      console.log('sliceIndex:'+sliceIndex)
      let array = self.positions.slice(0,sliceIndex)
      return Cesium.Cartesian3.fromDegreesArray(
          array,
          Cesium.Ellipsoid.WGS84,
          result
      )
    }
  /*
  *时间水位与时间关联 
  */
    computeFlight(data) {
      let property = new Cesium.SampledProperty(Number);
      data.forEach((item, i) => {
        property.addSample(
          Cesium.JulianDate.addMinutes(
            this.start,
            1 * i,
            new Cesium.JulianDate()
          ),
          item
        );
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
     * 隐藏与显示
     * @param {Boolean} val
     */
    changeRiverShow(val) {
      this.river.show = val;
    }
   
    destroy() {
      this.show = false
      this.renderEven()
      document.getElementsByClassName('cesium-viewer-animationContainer')[0].setAttribute('style','display: none;')
      document.getElementsByClassName('cesium-viewer-timelineContainer')[0].setAttribute('style','display: none;')
      window.viewer.clock.canAnimate = false;//时间轴暂停
      window.viewer.clock.shouldAnimate = false;//暂停
      // 重置
      window.viewer.clock.currentTime = this.start.clone();
      window.viewer.entities.remove(this.river);
      delete this.river
      delete this.positions;
      delete this.pageData
      delete this.show
    }
  }
   
  export default RiverAnalysis;