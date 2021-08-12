// forked from cx20's "3D地図ライブラリ「Cesium」を用いて地球を表示してみるテスト" http://jsdo.it/cx20/pGyG

//var widget = new Cesium.CesiumWidget('container');
var widget = new Cesium.CesiumWidget('container', {
    imageryProvider : new Cesium.OpenStreetMapImageryProvider({
        url : 'http://cyberjapandata.gsi.go.jp/xyz/std/',
        credit: new Cesium.Credit('国土地理院', '', 'http://portal.cyberjapan.jp/help/termsofuse.html')
    })
});
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

