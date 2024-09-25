/**
 * @param {Viewer} viewer
 * 流通性分析
 * https://localhost:8090/iserver/services/data-YangWuGanQuGeZhaShuJu/rest/data/datasources/%E9%98%B3%E6%AD%A6%E5%B9%B2%E6%B8%A0/datasets/DatasetDSM
*/
import point3D from '../../static/point_3D_lj.json'
import line3D from '../../static/line_3D_lj.json'
import area3D from '../../static/area_3D_lj.json'
export default class FooldingAnalysisy{
    constructor(val){
        
    }
    FloodAnalysis3D(waterHeight,waterMode,layerName){
        console.log('执行连通性分析')
        let that = this
        if(!window.damBreak){
            window.damBreak = new Cesium.FloodAnalysis3D(window.viewer.scene);
        }
        /**
         * 出水口坐标（选了两个，任选其一）：
            坐标1：114.70002192334785，29.87287429166613，58.17494198307395
            坐标2：114.70001122213316，29.87284149958819，58.3102138498798
         */
        window.damBreak.floodPosition = new Cesium.Cartesian3(114.21215320240138, 22.426297098303007, 8.29031689687963);
        window.damBreak.terrainURL('https://27.17.47.174:9090/iserver/services/data-YangWuGanQuGeZhaShuJu/rest/data/datasources/%E9%98%B3%E6%AD%A6%E5%B9%B2%E6%B8%A0/datasets/DatasetDSM');//数据源-添加地形数据地址。
        window.damBreak.waterHeight = waterHeight;//获取或设置水面高度。
        window.damBreak.waterMode = waterMode; //Cesium.WaterMode.Clamp 0 /Absolute 1 设置淹没分析（连通性）模式
        window.damBreak.layer = window.viewer.scene.layers.find(layerName);
        //  window.damBreak.layer.visible = false 
        var points = this.getPointJson()
        // var points = this.getLineJson()
        // var points = this.getAreaJson()
        //添加分析区域。
        window.damBreak.qureyRegion({
            position: points
        })
        window.damBreak.build();
        console.log(window.damBreak)
    }
    //开始淹没分析  Combine_10
    startSubmerge(waterHeight,waterMode,layerName){
        this.FloodAnalysis3D(waterHeight,waterMode,layerName)
    }
    //结束淹没分析
    clearSubmerge(){
        if(window.damBreak) {
            window.damBreak.destroy();
            window.damBreak = undefined;
        }
    }
    getPointJson(){
        console.log('getPointJson')
        let list = point3D.features
        let pointList = []
        list.forEach(point =>{
            let latlng = point.geometry.coordinates
            pointList.push(latlng[0])
            pointList.push(latlng[1])
            pointList.push(latlng[2])
        })
        return pointList
    }
    getLineJson(){
        console.log('getLineJson')
        let list = line3D.features[0].geometry.coordinates
        let pointList = []
        list.forEach(point =>{
            pointList.push(point[0])
            pointList.push(point[1])
            pointList.push(point[2])
        })
        return pointList
    }
    getAreaJson(){
        console.log('getAreaJson')
        let list = area3D.features[0].geometry.coordinates[0]
        let pointList = []
        list.forEach(point =>{
            pointList.push(point[0])
            pointList.push(point[1])
            pointList.push(point[2])
        })
        return pointList
    }
}