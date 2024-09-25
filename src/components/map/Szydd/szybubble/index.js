/**
 * @descripion:
 * @param {Viewer} viewer
 * @param {Cartesian2} position
 * @param {String} title
 * @param {String} id
 * @return {*}
 */

import Vue from "vue";
import Label from "./index.vue";

let WindowVm = Vue.extend(Label);
export default class SzyBubble {

    constructor(val) {
        this.viewer = window.viewer;
        //  this.height = val.height;
        this.cesiumWidget = val.cesiumWidget
        this.position = val.position._value;
        let title = val.name;
        let swStep = val.swStep;
        let llStep = val.llStep
        this.vmInstance = new WindowVm({
            propsData: {
                title,
                swStep,
                llStep
            }
        }).$mount(); //根据模板创建一个面板

        this.vmInstance.closeEvent = e => {
            this.windowClose();
        }
        this.vmInstance.flyEvent = e => {
            this.flyToPoint(val)
        }
        this.cesiumWidget.appendChild(this.vmInstance.$el);
        this.addPostRender();
    }

    //添加场景事件
    addPostRender() {
        this.viewer.scene.postRender.addEventListener(this.postRender, this);
    }

    //场景渲染事件 实时更新窗口的位置 使其与笛卡尔坐标一致
    postRender() {
        if (!this.vmInstance.$el || !this.vmInstance.$el.style) return;
        const canvasHeight = this.viewer.scene.canvas.height;
        const windowPosition = new Cesium.Cartesian2();
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            this.viewer.scene,
            this.position,
            windowPosition
        );
        const elHight = this.vmInstance.$el.offsetHight;
        this.vmInstance.$el.style.bottom =
            canvasHeight - windowPosition.y + 260 + "px";
        const elWidth = this.vmInstance.$el.offsetWidth;
        this.vmInstance.$el.style.left = windowPosition.x - elWidth / 2 + 180 + "px";

        const camerPosition = this.viewer.camera.position;
        let height = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height;
        height += this.viewer.scene.globe.ellipsoid.maximumRadius;
        if ((!(Cesium.Cartesian3.distance(camerPosition, this.position) > height)) && this.viewer.camera.positionCartographic.height < 50000000) {
            this.vmInstance.$el.style.display = "block";
        } else {
            this.vmInstance.$el.style.display = "none";
        }
    }

    //关闭
    windowClose() {
        if (this.vmInstance) {
            this.vmInstance.$el.remove();
            this.vmInstance.$destroy();
        }
        this.viewer.scene.postRender.removeEventListener(this.postRender, this); //移除事件监听
    }

    //飞入
    flyToPoint(val) {
        let point = {
            lat: val.monitoItems.data.vlat,
            lng: val.monitoItems.data.vlng,
            level: val.monitoItems.data.level,//高
            heading: val.monitoItems.data.heading,//角度旋转
            pitch: val.monitoItems.data.pitch,//倾斜角度
            roll: val.monitoItems.data.roll,//倾斜角度
            x: val.monitoItems.data.x,
            y: val.monitoItems.data.y,
            z: val.monitoItems.data.z,
        }
        this.vmInstance.$bus.emit('flyto', point)
    }
}