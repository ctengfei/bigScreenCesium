/**
 * @param {Viewer} viewer
 * 
*/
export default class Sky{
    constructor(val){
        // this.viewer = val.viewer
        // this.scene = viewer.scene
        this.weatherType = val.weatherType
        // this.defaultSkyBox = null
        window.blueSkyBox = null
        window.cloudSkyBox = null
        window.viewer.scene.skyAtmosphere.show = false
    }
    onLoad(){
        console.log('sky-onLoad')
        //创建天空盒
        // var sunSkyBox = new Cesium.SkyBox({
        //     sources:{
        //         positiveX:require('../../assets/images/SkyBox/sunsetglow/Right.jpg'),
        //         negativeX:require('../../assets/images/SkyBox/sunsetglow/Left.jpg'),
        //         positiveY:require('../../assets/images/SkyBox/sunsetglow/Front.jpg'),
        //         negativeY:require('../../assets/images/SkyBox/sunsetglow/Back.jpg'),
        //         positiveZ:require('../../assets/images/SkyBox/sunsetglow/Up.jpg'),
        //         negativeZ:require('../../assets/images/SkyBox/sunsetglow/Down.jpg')
        //     }
        // });
        window.blueSkyBox = new Cesium.SkyBox({
            sources:{
                positiveX:require('../../assets/images/SkyBox/bluesky/Right.jpg'),
                negativeX:require('../../assets/images/SkyBox/bluesky/Left.jpg'),
                positiveY:require('../../assets/images/SkyBox/bluesky/Front.jpg'),
                negativeY:require('../../assets/images/SkyBox/bluesky/Back.jpg'),
                positiveZ:require('../../assets/images/SkyBox/bluesky/Up.jpg'),
                negativeZ:require('../../assets/images/SkyBox/bluesky/Down.jpg')
            }
        });
        window.cloudSkyBox = new Cesium.SkyBox({
            sources: {
                positiveX:require('../../assets/images/SkyBox/cloudy/Right.jpg'),
                negativeX:require('../../assets/images/SkyBox/cloudy/Left.jpg'),
                positiveY:require('../../assets/images/SkyBox/cloudy/Front.jpg'),
                negativeY:require('../../assets/images/SkyBox/cloudy/Back.jpg'),
                positiveZ:require('../../assets/images/SkyBox/cloudy/Up.jpg'),
                negativeZ:require('../../assets/images/SkyBox/cloudy/Down.jpg')
            }
        });
        // this.defaultSkyBox = window.viewer.scene.skyBox;
        // let that = this
        // window.viewer.scene.postRender.addEventListener(()=>{
        //     if(window.viewer.scene.frameState.passes.render){
        //         switch(this.weatherType){
        //             case 'blueSky':
        //                 that.blueSkyBox.update(window.viewer.scene.frameState,true);
        //             break
        //             case 'cloudSky':
        //                 that.cloudSkyBox.update(window.viewer.scene.frameState,true);
        //             break
        //         }
        //         window.viewer.scene.postRender.removeEventListener(this);
        //     }
        // });
        switch(this.weatherType){
            case 'blueSky':
                window.cloudSkyBox.show = false;
                this.openSkyBox(window.blueSkyBox)
            return
            case 'cloudSky':
                window.blueSkyBox.show = false;
                this.openSkyBox(window.cloudSkyBox)
            return
        }
       
    }
    
    //开启天空盒子
    openSkyBox(skyBox){
        skyBox.WSpeed = 0.5;
        skyBox.show = true;
        let currentSkyBox = skyBox;
        window.viewer.scene.skyBox = skyBox;
        //相机上升到一定位置,天空盒出现渐变效果
        // this.gradualChange(currentSkyBox);
         
         
    }
    gradualChange(currentSkyBox){
        let that = this
        this.skyListener =  function () {
            var cameraHeight = window.viewer.scene.camera.positionCartographic.height;
            var skyAtmosphereH1 = 22e4; // 大气开始渐变的最大高度
            var skyBoxH1 = 15e4; // 天空开始渐变的最大高度
            var skyBoxH2 = 12e4; // 天空开始渐变的最小高度
            // var bufferHeight = 1e4;
            var bufferHeight = 1000;
           //相机高度小于大气层高度
            if (cameraHeight < skyAtmosphereH1 && Cesium.defined(currentSkyBox)) {
                var skyAtmosphereT = (cameraHeight - skyBoxH2) / (skyAtmosphereH1 - skyBoxH2);
                
                if (skyAtmosphereT > 1.0) {
                    skyAtmosphereT = 1.0;
                } else if (skyAtmosphereT < 0.0) {
                    skyAtmosphereT = 0.0;
                }
                var skyBoxT = (cameraHeight - skyBoxH2) / (skyBoxH1 - skyBoxH2);
                if (skyBoxT > 1.0) {
                    skyBoxT = 1.0;
                } else if (skyBoxT < 0.0) {
                    skyBoxT = 0.0;
                }
                currentSkyBox.alpha = 1.0 - skyBoxT;
                if(cameraHeight>skyBoxH2){
                    window.viewer.scene.skyAtmosphere.show = true;
                    window.viewer.scene.skyAtmosphere.alpha = skyAtmosphereT;
                    window.viewer.scene.skyBox = currentSkyBox;
                }else{
                    window.viewer.scene.skyAtmosphere.show = false;
                }
            } else {
                window.viewer.scene.skyAtmosphere.alpha = 1.0;
                window.viewer.scene.skyBox = that.blueSkyBox;
            }
            //控制相机 速率
            if (window.viewer.scene.skyBox !== that.blueSkyBox) {
                if (cameraHeight > (skyBoxH2 - 2 * bufferHeight) && cameraHeight < skyBoxH1 + 3 * bufferHeight) {
                    window.viewer.scene.screenSpaceCameraController.zoomFactor = 0.4;
                } else {
                    window.viewer.scene.screenSpaceCameraController.zoomFactor = 5.0;
                }
            } else {
                window.viewer.scene.skyBox.alpha = 1.0;
                window.viewer.scene.skyAtmosphere.alpha = 1.0;
                window.viewer.scene.screenSpaceCameraController.zoomFactor = 5.0;
            }

        };
        window.viewer.scene.postRender.addEventListener(that.skyListener);
    }
    //更加类型切换天空盒子
    changeSkyBoxByType(weatherType){
        switch(weatherType){
            case 'blueSky':
                window.cloudSkyBox.show = false;
                window.viewer.scene.postProcessStages.rain.enabled = false
                window.viewer.scene.postProcessStages.snow.enabled = false;
                this.openSkyBox(window.blueSkyBox)
            return
            case 'cloudSky':
                window.blueSkyBox.show = false;
                window.viewer.scene.postProcessStages.snow.enabled = false;
                this.openSkyBox(window.cloudSkyBox)
                this.rain()
            return
            case 'snowSky':
                window.blueSkyBox.show = false;
                window.viewer.scene.postProcessStages.rain.enabled = false;
                this.openSkyBox(window.cloudSkyBox)
                this.snow()
            return
        }
    }
    //下雨
    rain(){
        window.viewer.scene.postProcessStages.rain.enabled = true;
		window.viewer.scene.postProcessStages.rain.uniforms.density = 10;
		window.viewer.scene.postProcessStages.rain.uniforms.angle = 6;
		window.viewer.scene.postProcessStages.rain.uniforms.speed = 6;
    }
    //下雪
    snow(){
        window.viewer.scene.postProcessStages.snow.enabled = true;
        window.viewer.scene.postProcessStages.snow.uniforms.density = 10;
        window.viewer.scene.postProcessStages.snow.uniforms.angle = 0;
        window.viewer.scene.postProcessStages.snow.uniforms.speed = 3;
    }

}