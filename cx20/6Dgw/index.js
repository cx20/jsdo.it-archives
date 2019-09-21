// forked from cx20's "3D地図ライブラリ「Cesium」を用いて地球を表示してみるテスト" http://jsdo.it/cx20/pGyG

var worldTerrain = Cesium.createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true
});

var widget = new Cesium.CesiumWidget('cesiumContainer', {
    terrainProvider: worldTerrain
});

var scene = widget.scene;

function flyToMtFuji() {
    var longitude = 138.7277777;
    var latitude = 35.3605555-0.1;
    var height = 4000.0;
    scene.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        orientation : {
            heading : Cesium.Math.toRadians(0.0),  // east, default value is 0.0 (north)
            pitch : Cesium.Math.toRadians(0.0),    // default value (looking down)
            roll : 0.0                             // default value
        }
    });
}

flyToMtFuji();
