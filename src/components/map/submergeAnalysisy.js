/**
 * @param {Viewer} viewer
 * 模型淹没分析
*/
export default class SubmergeAnalysisy{
    constructor(val){
        this.currentHeight = val.currentHeight;
        this.maxHight = val.maxHight;
        this.minHight = val.minHight
        this.layerName = val.layerName
        this.speed = val.speed
        this.int = null
    }
    submergeAnalysis3D(){
        console.log('submerged')
        if(this.currentHeight > this.maxHight) {
            window.clearInterval(this.int)
            return;
        }
        var layer = window.viewer.scene.layers.find(this.layerName);
        var caixianLayer = window.viewer.scene.layers.find('面_3D@蔡贤水库边界');
        // caixianLayer.visible = false
        // var hyp = new Cesium.HypsometricSetting();
        // //创建分层设色对象   设置最大/最小可见高度   颜色表  显示模式   透明度及线宽
        // var colorTable = new Cesium.ColorTable();
        // hyp.MaxVisibleValue = this.currentHeight;
        // hyp.MinVisibleValue = this.minHight;
        // this.setColorTable(colorTable, '1');

        // hyp.ColorTable = colorTable;
        // hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
        // hyp.Opacity = 0.5;

        // hyp.LineInterval = 10.0;
        // //设置图层分层设色属性
        // layer.hypsometricSetting = {
        //     hypsometricSetting : hyp,
        //     analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
        // };
        caixianLayer.style3D.bottomAltitude = this.currentHeight
        this.currentHeight += (parseInt(this.speed))/10;
        // console.log("this.currentHeight:"+this.currentHeight)
    }
    //开始淹没分析  Combine_10
    startSubmerge(){
        // this.currentHeight = 60;
        this.int = window.setInterval(() => {
            this.submergeAnalysis3D(this.layerName )
          }, 100);
          var caixianLayer = window.viewer.scene.layers.find(this.layerName);
          caixianLayer.visible = false
          console.log(caixianLayer)
    }
    //结束淹没分析
    clearSubmerge(){
        var layer = window.viewer.scene.layers.find(this.layerName );
        var hyp = new Cesium.HypsometricSetting();
        hyp.MaxVisibleValue = -1000;

        layer.hypsometricSetting = {
            hypsometricSetting : hyp,
            analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
        }
        this.currentHeight = 0;
        var caixianLayer = window.viewer.scene.layers.find('面_3D@蔡贤水库边界');
        caixianLayer.visible = true
        
    }
    setColorTable(colorTable, key) {
        switch (key) {
            case "1":
                colorTable.insert(71, new Cesium.Color(0, 39/255, 148/255));
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