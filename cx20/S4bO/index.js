// forked from cx20's "Cesium.js を用いて新燃岳を表示してみるテスト" http://jsdo.it/cx20/sXhr
// forked from cx20's "Cesium.js を用いて富士山を表示してみるテスト" http://jsdo.it/cx20/6Dgw
// forked from cx20's "3D地図ライブラリ「Cesium」を用いて地球を表示してみるテスト" http://jsdo.it/cx20/pGyG

var worldTerrain = Cesium.createWorldTerrain({
//    requestWaterMask: true,
//    requestVertexNormals: true
});

var widget = new Cesium.CesiumWidget('cesiumContainer', {
    terrainProvider: worldTerrain
});

var scene = widget.scene;
var layers = scene.imageryLayers;
layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
    url : 'http://jsrun.it/assets/y/n/c/B/yncBb.jpg',
    rectangle : Cesium.Rectangle.fromDegrees(130.870278, 31.899384, 130.896413, 31.921242)
}));


function flyToMtShinmoedake() {
    var longitude = 130.8775222-0.015;
    var latitude = 31.909635+0.002;
    var height = 1500.0;
    scene.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        orientation : {
            heading : Cesium.Math.toRadians(90.0), // 西側から東方向を表示
            pitch : Cesium.Math.toRadians(0.0),
            roll : 0.0
        }
    });
}

flyToMtShinmoedake();
