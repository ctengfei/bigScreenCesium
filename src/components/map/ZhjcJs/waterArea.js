/**
 * 水面积动态效果
 * @param {Viewer} viewer
 * 
*/
export default class WaterArea{
    constructor(val){
        this.viewer = val.viewer
    }
    // 流动水面效果
    addWaterArea(point){
        let area = this.viewer.scene.primitives.add(
            new Cesium.Primitive({
                geometryInstances: new Cesium.GeometryInstance({
                    geometry: 
                    // new Cesium.RectangleGeometry({
                    //     rectangle: Cesium.Rectangle.fromDegrees(
                    //         point[0], point[1],
                    //         point[2], point[3]
                    //     ),
                    //     vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                    // }),
                    Cesium.PolygonGeometry.fromPositions({
                        height:30,
                        positions : point//水面坐标(三维)
                    }),
                }),
                appearance: new Cesium.EllipsoidSurfaceAppearance({
                    material: new Cesium.Material({
                        fabric: {
                            type: "Water",
                            uniforms: {
                                baseWaterColor: new Cesium.Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.5),
                                normalMap: require('../icons/waterNormals.jpg'),
                                frequency: 1000.0,
                                animationSpeed: 0.1,
                                amplitude: 10,
                                specularIntensity: 10
                            }
                        }
                    }),
                    fragmentShaderSource: 'varying vec3 v_positionMC;\n' +
                    'varying vec3 v_positionEC;\n' +
                    'varying vec2 v_st;\n' +
                    'void main()\n' +
                    '{\n' +
                    'czm_materialInput materialInput;\n' +
                    'vec3 normalEC = normalize(czm_normal3D * czm_geodeticSurfaceNormal(v_positionMC, vec3(0.0), vec3(1.0)));\n' +
                    '#ifdef FACE_FORWARD\n' +
                    'normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);\n' +
                    '#endif\n' +
                    'materialInput.s = v_st.s;\n' +
                    'materialInput.st = v_st;\n' +
                    'materialInput.str = vec3(v_st, 0.0);\n' +
                    'materialInput.normalEC = normalEC;\n' +
                    'materialInput.tangentToEyeMatrix = czm_eastNorthUpToEyeCoordinates(v_positionMC, materialInput.normalEC);\n' +
                    'vec3 positionToEyeEC = -v_positionEC;\n' +
                    'materialInput.positionToEyeEC = positionToEyeEC;\n' +
                    'czm_material material = czm_getMaterial(materialInput);\n' +
                    '#ifdef FLAT\n' +
                    'gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);\n' +
                    '#else\n' +
                    'gl_FragColor = czm_phong(normalize(positionToEyeEC), material, czm_lightDirectionEC);\n' +
                    'gl_FragColor.a=0.85;\n' +
                    '#endif\n' +
                    '}\n'
                }),
               
            })
        );
        
        return area
    }
    
}