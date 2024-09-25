/**
 * @param {Viewer} viewer
 * 片区定位
*/
// import Vue from "vue";
// import progress from "./progress.vue";
// let WindowVm = Vue.extend(progress);
export default class PQEntity{
    constructor(val){
        this.viewModel = {
          emissionRate: 100.0,
          gravity: -3.0,
          minimumParticleLife: 1.5,
          maximumParticleLife: 1.5,
          minimumSpeed: 1.0,
          maximumSpeed: 2.0,
          startScale: 1.0,
          endScale: 2.0,
          particleSize: 4.0,
        },
        this.particleSystemArray = []
    }
    addEntity(point,dataSource){
        let pinBuilder = new Cesium.PinBuilder();
        // let entitys = {}
        // pointList.forEach(point => {
            let color = new Cesium.Color.fromCssColorString('RGBA(219, 139, 124, 0.5)')
            let image = require('../../../assets/images/marker-shuiku-yj.png')
            let poin = null
            poin = dataSource.entities.add({
              //     id:value.id,
              //     name: value.name,
              //     position: Cesium.Cartesian3.fromDegrees(value.position.x, value.position.y),
              //     billboard: {
              //       image: pinBuilder.fromText(value.text,Cesium.Color.ROYALBLUE, 48).toDataURL(),
              //       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              //     },
              //     monitoItems:{
              //             data:value
              //         },
              id: point.code + new Date().getTime(),
              name: point.name,
              text: point.name,
              position : new Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 70),
              type: "pqPoint",
              // label: { //文字标签
              //     text: point.name,
              //     font: '500 19px Microsoft YaHei',// 15pt monospace
              //     scale: this.scaleValue,
              //     style: Cesium.LabelStyle.FILL,
              //     fillColor: Cesium.Color.WHITE,
              //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              //     pixelOffset: new Cesium.Cartesian2(0, -80),   //偏移量
              //     showBackground: true,
              //     backgroundPadding: new Cesium.Cartesian2(10, 5),
              //     disableDepthTestDistance:1000,
              //     /**
              //      * 第三个参数离地高度
              //      * 和你的物体高度有关系的，比如box就是写这个box的高度的一半，中心点的高度除以二。
              //         例如：15米高的物体，那么贴地就要写7.5
              //      */
              //     backgroundColor: color,
              //     // pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
              //     //     1.5e2, 1.0, 1.5e5, 0
              //     //   ),
              // },
              billboard:{
                  // 图像地址，URI或Canvas的属性
                  image: image,
                  // 设置颜色和透明度
                  // color: Cesium.Color.RED.withAlpha(0.8),
                  label: { text:  `${point.name}`} ,
                  // 高度（以像素为单位）
                  height: 100,
                  // 宽度（以像素为单位）
                  width: 52,
                  // 逆时针旋转
                  rotation: 0,
                  // 大小是否以米为单位
                  sizeInMeters: false,
                  // 相对于坐标的垂直位置
                  verticalOrigin: Cesium.VerticalOrigin.CENTER,
                  // 相对于坐标的水平位置
                  horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                  // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
                  pixelOffset: new Cesium.Cartesian2(0, -22),
                  // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
                  scale: this.scaleValue,
                  disableDepthTestDistance:5000,
                  // 是否显示
                  show: true,
                  // 根据广告牌与摄像头的距离，获取或设置广告牌的近像素偏移量和远像素偏移量缩放属性  type:NearFarScalar
                  scaleByDistance: new Cesium.NearFarScalar(
                      300, 1.0, 5000, 0.2
                  ),
               },
              monitoItems:{
                  data:point
              }
              });
           
            // entitys[point.id] = poin   

        // });
        
       
        return poin
    }
    open(pointList){
      let pqPointDataSource = new Cesium.CustomDataSource('pqPointEntry')
      // this.primitives = new Cesium.PrimitiveCollection()
      pointList.forEach(point => {
          console.log('123')
          // debugger
          // var pos1 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 70);
          // var entity = window.viewer.entities.add({
          //     position: pos1,
          //     id:point.code + new Date().getTime(),
          //     type:'pqPoint'
          // });
          var entity = this.addEntity(point,pqPointDataSource)
          // window.viewer.zoomTo(entity);
          //关闭HDR
          window.viewer.scene.highDynamicRange = false;
          let that = this
          let primitive = new Cesium.ParticleSystem({
              id:new Date().getTime(),
              image: require('../icons/smoke.png'),
              startColor: new Cesium.Color(1, 1, 1, 0.6),
              endColor: new Cesium.Color(0.80, 0.86, 1, 0.4),
              // startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
              // endColor: Cesium.Color.WHITE.withAlpha(0.0),
              startScale: that.viewModel.startScale,
              endScale: that.viewModel.endScale,
              minimumParticleLife: that.viewModel.minimumParticleLife,
              maximumParticleLife: that.viewModel.maximumParticleLife,
              minimumSpeed: that.viewModel.minimumSpeed,
              maximumSpeed: that.viewModel.maximumSpeed,
              imageSize: new Cesium.Cartesian2(that.viewModel.particleSize, that.viewModel.particleSize),
              emissionRate: that.viewModel.emissionRate,
              modelMatrix: that.computeModelMatrix(entity),
              // bursts: [
              //     // these burst will occasionally sync to create a multicolored effect
              //     new Cesium.ParticleBurst({
              //       time: 5.0,
              //       minimum: 10,
              //       maximum: 100,
              //     }),
              //     new Cesium.ParticleBurst({
              //       time: 10.0,
              //       minimum: 50,
              //       maximum: 100,
              //     }),
              //     new Cesium.ParticleBurst({
              //       time: 15.0,
              //       minimum: 200,
              //       maximum: 300,
              //     }),
              //   ],
              lifetime: 16.0,
              //粒子发射器
              emitter: new Cesium.CircleEmitter(2.0),
              emitterModelMatrix: that.computeEmitterModelMatrix(),
              updateCallback: function(p, dt){
                  // console.log('更新粒子运动状态')
                  // console.log(that.viewModel)
                  // var gravityScratch = new Cesium.Cartesian3();
                  // // We need to compute a local up vector for each particle in geocentric space.
                  // var position = p.position;

                  // Cesium.Cartesian3.normalize(position, gravityScratch);
                  // Cesium.Cartesian3.multiplyByScalar(gravityScratch, that.viewModel.gravity * dt, gravityScratch);

                  // p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);

                  var gravityScratch = new Cesium.Cartesian3();
                  var position = p.position;
                  Cesium.Cartesian3.normalize(position, gravityScratch);
                  Cesium.Cartesian3.fromElements(
                      20 * dt,
                      gravityScratch.y * dt,
                      -1 * dt,
                      gravityScratch
                  );
                  // Cesium.Cartesian3.multiplyByScalar(gravityScratch, that.viewModel.gravity * dt, gravityScratch);
                  p.velocity = Cesium.Cartesian3.add(
                      p.velocity,
                      gravityScratch,
                      p.velocity
                  );
              },
              sizeInMeters: true,
              performance:false,
          })
          // this.primitives.add(primitive)
          let item = window.viewer.scene.primitives.add(primitive)
          that.particleSystemArray.push(item)
        
      })
      let that = this
      var mdt = -0.1 //dt值需为负数，可进行调试尝试效果变化
      // //场景渲染事件--场景更新之前
      window.viewer.scene.preUpdate.addEventListener(function (scene, time) {
          // console.log('preUpdate')
          // console.log(that.particleSystem)
          // that.particleSystem.modelMatrix = that.computeModelMatrix(entity, time);
          // // Account for any changes to the emitter model matrix.
          // that.particleSystem.emitterModelMatrix = that.computeEmitterModelMatrix();

          //一下代码为解决喷水效果随着时间轴快进而保持原来速度的解决方法-------不起作用
          if(that.particleSystemArray){
            that.particleSystemArray.forEach(particleSystem =>{
              if (particleSystem != undefined && particleSystem._previousTime) {
                Cesium.JulianDate.addSeconds(time, mdt, particleSystem._previousTime);
              }
            })
          }
          
          
      });
      return pqPointDataSource
  }
  
  computeModelMatrix(entity, time) {
      // return entity.computeModelMatrix(time, new Cesium.Matrix4());
      var position = Cesium.Property.getValueOrUndefined(entity.position);
      let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
      return modelMatrix;
  }
  
  // 计算粒子发射器的位置姿态
  computeEmitterModelMatrix() {
      // console.log('computeEmitterModelMatrix')
      var emitterModelMatrix = new Cesium.Matrix4();
      var translation = new Cesium.Cartesian3();
      var rotation = new Cesium.Quaternion();
      var hpr = new Cesium.HeadingPitchRoll();
      var trs = new Cesium.TranslationRotationScale();

      //调节粒子的发射方向
      hpr = Cesium.HeadingPitchRoll.fromDegrees(-30, -0.5, 3.0, hpr);
      //喷泉位置
      trs.translation = Cesium.Cartesian3.fromElements(0, 0, 0, translation);
      trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

      return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
  }
  // 更新粒子运动状态
  applyGravity(p, dt) {
      // console.log('更新粒子运动状态')
      let that = this
      // console.log(that.viewModel)
      var gravityScratch = new Cesium.Cartesian3();
      // We need to compute a local up vector for each particle in geocentric space.
      var position = p.position;

      Cesium.Cartesian3.normalize(position, gravityScratch);
      Cesium.Cartesian3.multiplyByScalar(gravityScratch, that.viewModel.gravity * dt, gravityScratch);

      p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
  }
  destory(){
    // console.log('清除片区点位particleSystem')
    this.particleSystemArray.forEach(item =>{
      window.viewer.scene.primitives.remove(item)
    })
    delete this.particleSystemArray
    delete this.viewModel
}  
}