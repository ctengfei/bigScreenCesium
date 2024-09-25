/**
 * @description BIM模型相关处理
 * @Author gyf
 * @Date 2023/12/25
 * 
 */
 import axios from "axios";
 import BimData from './BimData.json'
 import global from '@/api/global'
 export default class BimEvent{
     constructor(val){
         this.BIMtype = val.BIMtype;
         this.bimCode = val.bimCode;
         this.BIMPromise = val.BIMPromise;
         this.bimList = '';
         this.qxsyLayers = val.qxsyLayers;
         this.lng ='';
         this.lat ='';
         this.height='';
         this.init();
     }
 
     init(){ //初始化
         this.bimList = this.getBimDataSourse();
         this.height = 18;
     }
 
     getBimDataSourse(){ //获取BIM数据源
         let result = [];
         BimData.forEach(item => {
             if(item.id === this.BIMtype){
                 let childerList = item.children;
                 for(var index in childerList){
                     if(childerList[index].id === this.bimCode){
                         result = childerList[index].children;
                     }
                 }
             }
         });
         return result;
     }
 
     bimShowOrHide(bval){ //显示/隐藏bim
         //隐藏倾斜摄影
         var wydbLayer = window.viewer.scene.layers.find(this.qxsyLayers);
         if(wydbLayer != null)
             wydbLayer.visible = !bval; 
         let that = this;
         Cesium.when(this.BIMPromise, function(layers) {
             //显示BIM
             for(var index in that.bimList){
                 var wydbBIMLayer = window.viewer.scene.layers.find(that.bimList[index].id+"@"+that.bimCode);
                 wydbBIMLayer.visible = bval;
                 // 初始化选中颜色
                 wydbBIMLayer.selectedColor = new Cesium.Color(23, 92, 239, 0.1);
 
                 //设置查询条件
                 wydbBIMLayer.setQueryParameter({
                     url: global.bimDataUrl,
                     dataSourceName: that.bimCode,                           //对应数据源名称，数据服务
                     dataSetName: that.bimList[index].id,                             //对应数据集名称，数据服务
                     isMerge: true,
                     keyWord: 'SmID'
                 });
 
                //  //查询当前模型经纬度
                //  if(index == 0){
                //      that.getBIMFileds(that.bimCode,that.bimList[index].id);
                //  }
             }
 
         })
             
 
         
     }
 
     flyto(){ //飞行角度
         //相机偏航角，正北为0，绕负z轴旋转，顺正逆反，水平转头
         var heading = Cesium.Math.toRadians(200);
         //相机俯仰角，绕负y轴旋转，顺正逆反，默认-90（垂直俯视），前后空翻（抬头，低头）
         var pitch = Cesium.Math.toRadians(-45.0);
         //相机翻滚角，绕正x轴旋转，顺正逆反，默认0，侧空翻（左右歪头）
         var roll = Cesium.Math.toRadians(0);
         //相机距离目标的距离（米），对点有效
         var range = 800;
         //设置包围盒 112.652004, 30.598336   114.422836, 29.962500
         var boundingSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3.fromDegrees(this.lng, this.lat, this.height), 0.0);
         //相机飞行控制 
         window.viewer.camera.flyToBoundingSphere(boundingSphere, {
             offset: new Cesium.HeadingPitchRange(heading, pitch, range),
         });
     }
 
     getBIMFileds(dataSource,dataSet){ //查询中心点坐标
         let queryUrl = global.bimDataUrl+"/featureResults.json";
         const sqlParameter = {
             datasetNames: [`${dataSource}:${dataSet}`],
             getFeatureMode: "SQL",
             queryParameter: {
               attributeFilter: "SMID>0",
               fields: ["CENTER_X", "CENTER_Y"],
             },
             hasGeometry: false,
         };
         axios.post(queryUrl, sqlParameter, {
             params: { returnFeaturesOnly: true, returnContent: true },
         }).then(res =>{
             if(res.status == 201){
                 let lnglat = res.data[0].fieldValues;
                 this.lng = lnglat[0];
                 this.lat = lnglat[1];
                 this.flyto();
             }
         });
         
     }
 
 
 }