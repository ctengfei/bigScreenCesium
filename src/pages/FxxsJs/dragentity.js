/**
 * @param {Viewer} viewer
 * 
*/
export default class DragEntity{
    constructor(val){
        this.viewer = val.viewer
    }
    addEntity(point){
        let pinBuilder = new Cesium.PinBuilder();
        let poin = this.viewer.entities.add({
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
        id:point.id,
        name: point.name,
        position : new Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 100),
        type: "marker",
        billboard:{
            // 图像地址，URI或Canvas的属性
            image: require('../../assets/images/marker-shuiku.png'),
            // 设置颜色和透明度
            // color: Cesium.Color.RED.withAlpha(0.8),
            label: { text:  `${point.name}`} ,
            // 高度（以像素为单位）
            height: 50,
            // 宽度（以像素为单位）
            width: 26,
            // 逆时针旋转
            rotation: 0,
            // 大小是否以米为单位
            sizeInMeters: false,
            // 相对于坐标的垂直位置
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            // 相对于坐标的水平位置
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
            pixelOffset: new Cesium.Cartesian2(-13, 0),
            // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
            scale: this.scaleValue,
            // 是否显示
            show: true
         },
        monitoItems:{
            data:point
        }
        });
        return poin
    }
    
}