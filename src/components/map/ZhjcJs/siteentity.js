/**
 * @param {Viewer} viewer
 *
*/
export default class SiteEntity{
    constructor(val){
        this.viewer = val.viewer;
        this.level = [
            {label:'Ⅰ类',value:'1'},
            {label:'Ⅱ类',value:'2'},
            {label:'Ⅲ类',value:'3'},
            {label:'Ⅳ类',value:'4'},
            {label:'Ⅴ类',value:'5'},
        ]
    }
    addEntity(point,siteDataSource){
        let pinBuilder = new Cesium.PinBuilder();
        // let entitys = {}
        // pointList.forEach(point => {
            let color = new Cesium.Color.fromCssColorString('RGBA(45,91,99,1)')
            let image = require('../../../assets/images/marker-shuiku-yj.png')
            let type = point.type
            switch (type){
                case "QQ": //大坝安监
                image = require('../../../assets/images/marker-dabanjian-zc2.png')
                    break
                case "RR"://水库水情
                image = require('../../../assets/images/marker-shuiwei-zc2.png')
                  break
                case "PPS"://雨量
                image = require('../../../assets/images/marker-yuliang-zc2.png')
                  break
                case "ZZ"://渠道水文
                image = require('../../../assets/images/marker-bengzhan-zc2.png')
                  break
                case "DD"://水闸
                image = require('../../../assets/images/marker-shuizha-zc2.png')
                  break
                case "WQ"://水质
                image = require('../../../assets/images/marker-shuizhi-zc2.png')
                  break
                case "VD"://视频
                image = require('../../../assets/images/marker-shiping-zc2.png')
                  break
                case "ZQ"://河道水情
                image = require('../../../assets/images/marker-liuliang-zc2.png')
                  break
              }
            // switch(type){
            //     case 'yj':
            //         image = require('../../../assets/images/marker-shuiku-yj.png')
            //     break
            //     case 'gj':
            //         image = require('../../../assets/images/marker-shuiku-gj.png')
            //     break
            //     case 'zc':
            //         image = require('../../../assets/images/marker-shuiku-zc.png')
            //     break
            //     case 'zc2':
            //         image = require('../../../assets/images/marker-shuiku-zc2.png')
            //     break
            //     case 'lx':
            //         image = require('../../../assets/images/marker-shuiku-lx.png')
            //     break
            //     case 'tx':
            //         image = require('../../../assets/images/marker-shuiku-tx.png')
            //     break
            // }
            let poin = null
            if(type == 'tx'){
                poin = siteDataSource.entities.add({
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
                    id:point.code,
                    name: point.name,
                    text: point.name,
                    position : new Cesium.Cartesian3.fromDegrees(point.y, point.x, 40),
                    type: "zhjcSite",
                    label: { //文字标签
                        text: point.stName,
                        font: '500 19px Microsoft YaHei',// 15pt monospace
                        scale: this.scaleValue,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        pixelOffset: new Cesium.Cartesian2(0, -80),   //偏移量
                        showBackground: true,
                        backgroundPadding: new Cesium.Cartesian2(10, 5),
                        disableDepthTestDistance:1000,
                        /**
                         * 第三个参数离地高度
                         * 和你的物体高度有关系的，比如box就是写这个box的高度的一半，中心点的高度除以二。
                            例如：15米高的物体，那么贴地就要写7.5
                         */
                        backgroundColor: color,
                        scaleByDistance: new Cesium.NearFarScalar(
                            300, 1.0, 5000, 0.2
                        ),
                        // pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
                        //     1.5e2, 1.0, 1.5e5, 0
                        //   ),
                    },
                    billboard:{
                        // 图像地址，URI或Canvas的属性
                        image: image,
                        // 设置颜色和透明度
                        // color: Cesium.Color.RED.withAlpha(0.8),
                        label: { text:  `${point.name}`} ,
                        // 高度（以像素为单位）
                        height: 65,
                        // 宽度（以像素为单位）
                        width: 76,
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
                        // 根据广告牌与摄像头的距离，获取或设置广告牌的缩放属性  type:NearFarScalar
                        scaleByDistance: new Cesium.NearFarScalar(
                            300, 1.0, 5000, 0.3
                        ),
                     },
                    monitoItems:{
                        data:point
                    }
                    });
            }else{
                poin = siteDataSource.entities.add({
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
                    id:point.code,
                    name: point.name,
                    text: point.name,
                    position : new Cesium.Cartesian3.fromDegrees(point.y, point.x, 50),
                    type: "zhjcSite",
                    label: { //文字标签
                        text: this.formatName(point),
                        font: '500 13px Microsoft YaHei',// 15pt monospace
                        scale: this.scaleValue,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.TOP,
                        pixelOffset: new Cesium.Cartesian2(0, -70),   //偏移量
                        showBackground: true,
                        backgroundPadding: new Cesium.Cartesian2(10, 3),
                        disableDepthTestDistance:1000,
                        /**
                         * 第三个参数离地高度
                         * 和你的物体高度有关系的，比如box就是写这个box的高度的一半，中心点的高度除以二。
                            例如：15米高的物体，那么贴地就要写7.5
                         */
                        backgroundColor: color,
                        // pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
                        //     1.5e2, 1.0, 1.5e5, 0
                        //   ),
                    },
                    billboard:{
                        // 图像地址，URI或Canvas的属性
                        image: image,
                        // 设置颜色和透明度
                        // color: Cesium.Color.RED.withAlpha(0.8),
                        label: { text:  `${point.name}`} ,
                        // 高度（以像素为单位）
                        height: 230,
                        // 宽度（以像素为单位）
                        width: 122,
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
            }
        return poin
    }
    formatName(point){
        if(point.type == 'PPS'){
            return `${point.name} | ${point.oneDayDrp || 0} mm`
        }else if(point.type == 'RR'){
            return `${point.name} | ${point.rz || 0} m`
        }else if(point.type == 'DD'){
            return `${point.name} | ${point.upz || 0} m`
        }else if(point.type == 'WQ'){
            return `${point.name} | ${this.level.find(r=>r.value == point.level).label || 0}`
        }else if(point.type == 'ZQ'){
            return `${point.name} | ${point.z || 0} m`
        }else if(point.type == 'ZZ'){
            return `${point.name} | ${point.z || 0} m`
        }else if(point.type == 'VD' || point.type == 'QQ'){
            return point.name
        }
    }

}