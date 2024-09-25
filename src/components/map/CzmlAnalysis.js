/**
 * @description 河流流动分析
 * 
 */
 import point3D from '../../static/point_3D_lj.json'
 import line3D from '../../static/line_3D_lj.json'
 import area3D from '../../static/area_3D_lj.json'
 class CzmlAnalysis {
    constructor(options) {
      console.log(options)
      this.waterColor = options.waterColor;
      this.show = options.show;
      this.pageData = options.pageData
      this.positions = [];
      this.start = null;
      this.stop = null;
      this.clockEven = null
      this.int = null
      
      //设置时间
      this.viewerSET();
      let sT = Cesium.JulianDate.toIso8601(this.start)
      let sE = Cesium.JulianDate.toIso8601(this.stop)
      console.log(sT)
      console.log(sE)
      this.czml = [
        {
          id: "document",
          name: "CZML Polygon - Interpolating References",
          version: "1.0",
          // clock: {
          //   interval: sT + "/"+sE,
          //   currentTime: sT,
          //   multiplier: 500,
          // },
        },
        {
          id: "custom_property_object",
          name: "An object with custom properties",
          properties: {
            constant_property: true,
            population_sampled: {
              number: [],
            },
          },
        },
        {
          id: "dynamicPolygon",
          name: "Dynamic Polygon with Reference Properties",
          availability: sT + "/"+sE,
          polygon: {
            positions:
            {
              // references: ["v1#position", "v2#position", "v3#position"],
              cartographicDegrees:[]
            },
            perPositionHeight: true,
            material: {
              solidColor: {
                color: [
                  {
                    interval: sT + "/"+sE,
                    rgbaf: [1, 0, 1, 1],
                  }
                ],
              },
            },
            height: 60,
            extrudedHeight: 61.5,
          },
        },
        // {
        //   id: "v1",
        //   position: {
        //     interpolationAlgorithm: "LINEAR",
        //     interpolationDegree: 1,
        //     interval: this.start + "/"+this.stop,
        //     epoch: this.start,
        //     cartographicDegrees:[]
        //   },
        // },
        // {
        //   id: "v2",
        //   position: {
        //     interval: this.start + "/"+this.stop,
        //     cartographicDegrees: [],
        //   },
        // },
        // {
        //   id: "v3",
        //   position: {
        //     interpolationAlgorithm: "LINEAR",
        //     interpolationDegree: 1,
        //     interval: this.start + "/"+this.stop,
        //     epoch: this.start,
        //     cartographicDegrees: this.positions,
        //   },
        // },
       
      ];
      // this.init();
      // this.getNowHeight();
    }
    CoorsFormt() {
      let startMill = this.pageData.startTime.getTime()
      let endMill = this.pageData.endTime.getTime()
      let diff = endMill - startMill
      console.log("diff:"+diff)
      let list = area3D.features[0].geometry.coordinates[0]
      let baseCount = parseInt(diff/list.length)
        let pointList = []
        list.forEach((point,index) =>{
            // pointList.push(baseCount * index)
            pointList.push(point[0])
            pointList.push(point[1])
            pointList.push(point[2])
        })
      return pointList;
    }
    async init() {
      const self = this;
      //构建czml
      self.positions = self.CoorsFormt();
      // let count = this.positions.length/4
      self.czml[2].polygon.positions.cartographicDegrees = self.positions.slice(0,12)
      // self.czml[2].position.cartographicDegrees = self.positions.slice(0,count  + 1)
      // self.czml[3].position.cartographicDegrees = self.positions.slice(0,count*2 +  + 2)
      // self.czml[4].position.cartographicDegrees = self.positions
     
      let samplList = []
      //动态升高
      // for(let i = 0;i<24;i++){
      //   let time = Cesium.JulianDate.addHours(
      //     this.start,
      //     1 * i,
      //     new Cesium.JulianDate()
      //   )
      //   let value = i*0.05 + 62
      //   let timeValue = Cesium.JulianDate.toIso8601(time)
      //   samplList.push(timeValue)
      //   samplList.push(value)
      // }
       //动态蔓延经纬度
       let count = self.positions.length/(3 * 24)
       console.log('count:'+count)
      for(let i = 0;i<24;i++){
        let time = Cesium.JulianDate.addHours(
          this.start,
          1 * i,
          new Cesium.JulianDate()
        )
        let value = (i+1) * count
        console.log('value:'+value)
        let timeValue = Cesium.JulianDate.toIso8601(time)
        samplList.push(timeValue)
        samplList.push( parseInt(value))
      }
      self.czml[1].properties.population_sampled.number = samplList
      console.log(self.czml)
      this.czmldataSources = new Cesium.CzmlDataSource()
      this.loadedPromise = this.czmldataSources.load(self.czml)
      window.viewer.dataSources.add(this.loadedPromise);
    }
    startCzmlAnalysis(){
      this.init()
      this.setDegrees()
    }
    /*
    *面的经纬度与时间关联 
    */
    setDegrees() {
      let self = this
      this.loadedPromise.then(function () {
        const customPropertyObject = self.czmldataSources.entities.getById(
          "custom_property_object"
        );
        const property = customPropertyObject.properties['population_sampled'];
        const colorado = self.czmldataSources.entities.getById("dynamicPolygon");
        console.log('property:')
        console.log(property)
        // Because the population values are so large, we scale them down
        // by 50 so they fit on the screen.
        // If we didn't need to scale, we could directly assign the property
        // to extrudedHeight.
        // colorado.polygon.extrudedHeight = self.scaleProperty(property, 1 / 50.0);
        colorado.polygon.positions = self.scaleProperty(property, 1);
      });
    }
    /*
    *时间水位与时间关联 
    */
    scaleProperty(property, scalingFactor) {
      let self = this
      // returns a property that scales another property by a constant factor.
      return new Cesium.CallbackProperty(function (time, result) {
        console.log('time:'+time)
        result = property.getValue(time, result);
        result = result * scalingFactor;
        console.log('result:'+result)
        let array = self.positions.slice(0,result)
        return result;
      }, property.isConstant);
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
     * 获取实时水面高度
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
        console.log("self.initialHeight:"+self.initialHeight)
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
      // window.viewer.clock.onTick.removeEventListener(this.clockEven);
      // this.clockEven()
      // this.clockEven = null
      window.viewer.remove(this.loadedPromise);
      delete this.loadedPromise;
      delete this.positions;
    }
  }
   
  export default CzmlAnalysis;