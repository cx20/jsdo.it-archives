// forked from cx20's "3D地図ライブラリ「Cesium」を用いて地球を表示してみるテスト" http://jsdo.it/cx20/pGyG
var widget = new Cesium.CesiumWidget('cesiumContainer');
var scene = widget.scene;
var clock = widget.clock;
var camera = widget.camera;
camera.setView({
     destination : Cesium.Cartesian3.fromDegrees(180.0, 0, 8000000.0),
    orientation: {
        heading : Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north)
        pitch : Cesium.Math.toRadians(-90),    // default value (looking down)
        roll : 0.0                             // default value
    }
});

var eventHelper = new Cesium.EventHelper();
eventHelper.add(clock.onTick, onTick);

function onTick() {
    camera.rotateLeft(Cesium.Math.toRadians(Math.PI*5/180));
}
