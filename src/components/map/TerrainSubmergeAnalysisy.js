/**
 * @param {Viewer} viewer
 * 地形淹没分析
*/
export default class TerrainSubmergeAnalysisy{
    constructor(val){
        this.hyp = null
        this.currentHeight = val.currentHeight;
        this.maxHight = val.maxHight;
        this.minHight = val.minHight
        this.layerName = val.layerName
        this.speed = val.speed
        this.int = null
        this.positions = val.positions
        this.init()
    }
    init(){
        // console.log(this.positions)
        this.hyp = new Cesium.HypsometricSetting();
        //创建分层设色对象   设置最大/最小可见高度   颜色表  显示模式   透明度及线宽
        var colorTable = new Cesium.ColorTable();
        this.setColorTable(colorTable, '1');
        this.hyp.ColorTable = colorTable;
        this.hyp._lineColor = new Cesium.Color(1.0, 0.0, 0.0, 1.0);
        this.hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
        this.hyp.MaxVisibleValue = 0;
        this.hyp.MinVisibleValue = 0;
        this.hyp.ColorTableMinKey = 1;
        this.hyp.ColorTableMaxKey = 9000;
        this.hyp.Opacity = 0.5;
        this.hyp.LineInterval = 10.0;//获取或设置等值线的间隔。
        

        var caixianLayer = window.viewer.scene.layers.find('面_3D@蔡贤水库边界');
        caixianLayer.visible = false
    }
    submergeAnalysis3D(){
        // console.log('TerrainSubmergeAnalysisy')
        if(this.currentHeight > this.maxHight) {
            console.log(this.hyp)
            window.clearInterval(this.int)
            return;
        }
        this.hyp.MaxVisibleValue = this.currentHeight;
        //设置图层分层设色属性
        let that = this
        window.viewer.scene.globe.HypsometricSetting = {
            hypsometricSetting: that.hyp,
            analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
        };

        this.currentHeight += (parseInt(this.speed))/10;
        // console.log("this.currentHeight:"+this.currentHeight)
    }
    //开始淹没分析  Combine_10
    startSubmerge(){
        this.hyp.CoverageArea = this.positions;//获取或设置分层设色的区域
        this.hyp.MinVisibleValue = this.minHight;
        this.int = window.setInterval(() => {
            this.submergeAnalysis3D()
          }, 100);
    }
    //结束淹没分析
    clearSubmerge(){
        window.clearInterval(this.int)
        viewer.scene.globe.HypsometricSetting = undefined;
        this.currentHeight = 0;
        var caixianLayer = window.viewer.scene.layers.find('面_3D@蔡贤水库边界');
        caixianLayer.visible = true
        
    }
    setColorTable(colorTable, key) {
        switch (key) {
            case "1":
                colorTable.insert(100, new Cesium.Color(0, 39/255, 148/255));
                colorTable.insert(0, new Cesium.Color(149/255, 232/255, 249/255));
                break;
            case "2":
                colorTable.insert(71, new Cesium.Color(162/255, 251/255, 194/255));
                colorTable.insert(0, new Cesium.Color(1, 103/255, 103/255));
                break;
            case "3":
                colorTable.insert(71, new Cesium.Color(230/255, 198/255, 1));
                colorTable.insert(0, new Cesium.Color(157/255, 0, 1));
                break;
            case "4":
                colorTable.insert(71, new Cesium.Color(210/255, 15/255, 15/255));
                colorTable.insert(54, new Cesium.Color(221/255, 224/255, 7/255));
                colorTable.insert(36, new Cesium.Color(20/255, 187/255, 18/255));
                colorTable.insert(18, new Cesium.Color(0, 161/255, 1));
                colorTable.insert(0, new Cesium.Color(9/255, 9/255, 212/255));
                break;
            case "5":
                colorTable.insert(71, new Cesium.Color(186/255, 1, 229/255));
                colorTable.insert(0, new Cesium.Color(26/255, 185/255, 156/255));
                break;
          default:
            break;
        }
    }
    
}