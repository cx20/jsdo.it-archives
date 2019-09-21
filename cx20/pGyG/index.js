var widget = new Cesium.CesiumWidget('cesiumContainer');
var scene = widget.scene;

function flyToTokyo() {
    var longitude = 139.054784;
    var latitude = 35.685692;
    var height = 300000.0;
    scene.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
    });
}

function flyToTokyoRectangle() {
    var west = 139.054784 - 2.0;
    var south = 35.685692 - 2.0;
    var east = 139.054784 + 2.0;
    var north = 35.685692 + 2.0;
    scene.camera.flyToRectangle({
        destination : Cesium.Rectangle.fromDegrees(west, south, east, north)
    });
}

flyToTokyo();
//flyToTokyoRectangle();
