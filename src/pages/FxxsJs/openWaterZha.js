/**
 * 开水闸水流
 * @param {Viewer} viewer
 * 
*/
export default class OpenWaterZha{
    constructor(val){
        this.viewer = val.viewer
        this.particleSystem = val.particleSystem
        this.viewModel = val.viewModel
        this.scene = val.scene
    }
    
    open(point){
        var pos1 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 100);
        var entity = this.viewer.entities.add({
            position: pos1
        });
        this.viewer.zoomTo(entity);
        //关闭HDR
        this.scene.highDynamicRange = false;
        let that = this
        let primitive = new Cesium.ParticleSystem({
            image: require('./icons/smoke.png'),
            startColor: new Cesium.Color(1, 1, 1, 0.6),
            endColor: new Cesium.Color(0.80, 0.86, 1, 0.4),
            startScale: that.viewModel.startScale,
            endScale: that.viewModel.endScale,
            minimumParticleLife: that.viewModel.minimumParticleLife,
            maximumParticleLife: that.viewModel.maximumParticleLife,
            minimumSpeed: that.viewModel.minimumSpeed,
            maximumSpeed: that.viewModel.maximumSpeed,
            imageSize: new Cesium.Cartesian2(that.viewModel.particleSize, that.viewModel.particleSize),
            emissionRate: that.viewModel.emissionRate,
            lifetime: 16.0,
            //粒子发射器
            emitter: new Cesium.CircleEmitter(0.2),
            // emitterModelMatrix: that.computeEmitterModelMatrix(),
            // updateCallback: that.applyGravity,
            sizeInMeters: true,
            performance:false,
        })
        this.particleSystem = this.viewer.scene.primitives.add(primitive)
        
        //场景渲染事件--场景更新之前
        this.scene.preUpdate.addEventListener(function (scene, time) {
            console.log('preUpdate')
            that.particleSystem.modelMatrix = that.computeModelMatrix(entity, time);
            // Account for any changes to the emitter model matrix.
            that.particleSystem.emitterModelMatrix = that.computeEmitterModelMatrix();
        });
        // this.CesiumObserveable()
    }
    
    computeModelMatrix(entity, time) {
        return entity.computeModelMatrix(time, new Cesium.Matrix4());
    }
    computeEmitterModelMatrix() {
        var emitterModelMatrix = new Cesium.Matrix4();
        var translation = new Cesium.Cartesian3();
        var rotation = new Cesium.Quaternion();
        var hpr = new Cesium.HeadingPitchRoll();
        var trs = new Cesium.TranslationRotationScale();

        //调节粒子的发射方向
        hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
        //喷泉位置
        trs.translation = Cesium.Cartesian3.fromElements(0, 0, 5.4, translation);
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

        return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
    }
    // 更新粒子运动状态
    applyGravity(p, dt) {
        var gravityScratch = new Cesium.Cartesian3();
        // We need to compute a local up vector for each particle in geocentric space.
        var position = p.position;

        Cesium.Cartesian3.normalize(position, gravityScratch);
        Cesium.Cartesian3.multiplyByScalar(gravityScratch, this.viewModel.gravity * dt, gravityScratch);

        p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
    }
    CesiumObserveable(){
        console.log(Cesium.knockout)
        Cesium.knockout.getObservable(this.viewModel, 'emissionRate').subscribe(
            function (newValue) {
                particleSystem.emissionRate = parseFloat(newValue);
            }
        );

        Cesium.knockout.getObservable(this.viewModel, 'particleSize').subscribe(
            function (newValue) {
                var particleSize = parseFloat(newValue);
                particleSystem.minimumImageSize.x = particleSize;
                particleSystem.minimumImageSize.y = particleSize;
                particleSystem.maximumImageSize.x = particleSize;
                particleSystem.maximumImageSize.y = particleSize;
            }
        );

        Cesium.knockout.getObservable(this.viewModel, 'minimumParticleLife').subscribe(
            function (newValue) {
                particleSystem.minimumParticleLife = parseFloat(newValue);
            }
        );

        Cesium.knockout.getObservable(this.viewModel, 'maximumParticleLife').subscribe(
            function (newValue) {
                particleSystem.maximumParticleLife = parseFloat(newValue);
            }
        );

        Cesium.knockout.getObservable(this.viewModel, 'minimumSpeed').subscribe(
            function (newValue) {
                particleSystem.minimumSpeed = parseFloat(newValue);
            }
        );

        Cesium.knockout.getObservable(this.viewModel, 'maximumSpeed').subscribe(
            function (newValue) {
                particleSystem.maximumSpeed = parseFloat(newValue);
            }
        );

        Cesium.knockout.getObservable(this.viewModel, 'startScale').subscribe(
            function (newValue) {
                particleSystem.startScale = parseFloat(newValue);
            }
        );

        Cesium.knockout.getObservable(this.viewModel, 'endScale').subscribe(
            function (newValue) {
                particleSystem.endScale = parseFloat(newValue);
            }
        );
    }

}