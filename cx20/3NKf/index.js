// forked from cx20's "3D地図ライブラリ「Cesium」を用いて地球を表示してみるテスト" http://jsdo.it/cx20/pGyG

var DOT_SIZE = 3;
var X_START_POS = 50;
var Y_START_POS = 20;

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":0x000000,
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
    return colorHash[ c ];
}

//セシウムウィジェットを作成
var widget = new Cesium.CesiumWidget('cesiumContainer');

var scene = widget.scene;
var primitives = scene.primitives;
var ellipsoid = scene.globe.ellipsoid;

// Create box and ellipsoid boxes, and use the instance's
// modelMatrix to scale and position them.
var boxGeometry = Cesium.BoxGeometry.fromDimensions({
    vertexFormat : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    dimensions : new Cesium.Cartesian3(1.0, 1.0, 1.0)
});

var instances = [];
var position;
var point3d;
var origin;
var translation;
var matrix;
var modelMatrix;
var height = 5000.0;
var scale = 5000.0 * 0.8;
var colorRgb, colorR, colorG, colorB;
var color;
var x, y;

for ( var i = 0; i < dataSet.length; i++ ) {
    // 座標計算
    x = ( i % 16 ) * DOT_SIZE;
    y = ( 16 - Math.floor( i / 16 ) ) * DOT_SIZE;
    
    // 3D座標取得
    //height = 5000.0 + (10000.0 * i);
    position = Cesium.Cartesian3.fromDegrees(139.054784 + x/60, 35.685692 + y/72);
    point3d = new Cesium.Cartesian3(0.0, 0.0, height);
    translation = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    matrix = Cesium.Matrix4.multiplyByTranslation(translation, point3d, new Cesium.Matrix4());
    modelMatrix = Cesium.Matrix4.multiplyByUniformScale(matrix, scale, new Cesium.Matrix4());
    
    // 色情報取得
    colorRgb = getRgbColor(dataSet[i]);
    colorR = ((colorRgb & 0xff0000) >> 16) / 255;
    colorG = ((colorRgb & 0x00ff00) >>  8) / 255;
    colorB = ((colorRgb & 0x0000ff) >>  0) / 255;
    color = new Cesium.ColorGeometryInstanceAttribute(colorR, colorG, colorB, 1.0);
    
    var instance = new Cesium.GeometryInstance({
        geometry : boxGeometry,
        modelMatrix : modelMatrix,
        attributes : { color : color }
    });
    
    if ( dataSet[i] != "無" ) {
        instances.push( instance );
    }
}

primitives.add(new Cesium.Primitive({
    geometryInstances : instances,
    appearance : new Cesium.PerInstanceColorAppearance({
        translucent : false,
        closed : true
    })
}));

function disableInput(scene) {
    var controller = scene.getScreenSpaceCameraController();
    controller.enableTranslate = false;
    controller.enableZoom = false;
    controller.enableRotate = false;
    controller.enableTilt = false;
    controller.enableLook = false;
}

function enableInput(scene) {
    var controller = scene.getScreenSpaceCameraController();
    controller.enableTranslate = true;
    controller.enableZoom = true;
    controller.enableRotate = true;
    controller.enableTilt = true;
    controller.enableLook = true;
}
    
     
function flyToTokyo() {
    var longitude = 139.054784 + 0.3;
    var latitude = 35.685692 + 0.3;
    var height = 100000.0;
    scene.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
    });
}

function lookAtTokyo() {
    var longitude = 139.054784 + 0.3;
    var latitude = 35.685692 + 0.3;
    var height = 100000.0;
    var camera = scene.camera;
    var ellipsoid = Cesium.Ellipsoid.WGS84;
    var eye = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(longitude, latitude - 1.0, height));
    var target = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(longitude, latitude, 0));
    var up = Cesium.Cartesian3.UNIT_Z;
    camera.lookAt(eye, target, up);
}

flyToTokyo();

//setTimeout( lookAtTokyo, 3500 );