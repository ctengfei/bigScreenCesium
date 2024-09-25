/**
 * 开水闸水流
 * @param {Viewer} viewer
 * 
*/
export default class OpenWaterZha{
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
          };
    }
    
    open(point){
        var pos1 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 70);
        var entity = window.viewer.entities.add({
            position: pos1,
            id:new Date().getTime(),
            type:'waterZha'
        });
        window.viewer.zoomTo(entity);
        //关闭HDR
        window.viewer.scene.highDynamicRange = false;
        let that = this
        let primitive = new Cesium.ParticleSystem({
            id:new Date().getTime(),
            image: require('./icons/smoke.png'),
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
        this.particleSystem = window.viewer.scene.primitives.add(primitive)
        var mdt = -0.1 //dt值需为负数，可进行调试尝试效果变化
        // //场景渲染事件--场景更新之前
        window.viewer.scene.preUpdate.addEventListener(function (scene, time) {
            // console.log('preUpdate')
            // that.particleSystem.modelMatrix = that.computeModelMatrix(entity, time);
            // Account for any changes to the emitter model matrix.
            // that.particleSystem.emitterModelMatrix = that.computeEmitterModelMatrix();

            //一下代码为解决喷水效果随着时间轴快进而保持原来速度的解决方法-------赞
            if (that.particleSystem != undefined && that.particleSystem._previousTime) {
                Cesium.JulianDate.addSeconds(time, mdt, that.particleSystem._previousTime);
            }
        });
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
        console.log('清除particleSystem')
        window.viewer.scene.primitives.remove(this.particleSystem)
        delete this.particleSystem
        delete this.viewModel
    }
}