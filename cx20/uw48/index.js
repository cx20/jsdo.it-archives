// forked from cx20's "Cesium.js で3Dモデル表示してみるテスト（その１）" http://jsdo.it/cx20/UKCJB
// forked from cx20's "3D地図ライブラリ「Cesium」を用いて地球を表示してみるテスト" http://jsdo.it/cx20/pGyG

var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox : false,
    selectionIndicator : false
});                               

/*
function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(139.691706, 35.689487, height);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    //var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = viewer.entities.add({
        name : url,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            minimumPixelSize : 128,
            maximumScale : 20000
        }
    });
    viewer.trackedEntity = entity;
}

function flyToHeadingPitchRoll() {
    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(139.691706 + 1.0, 35.689487 - 1.0, 100000.0),
        orientation : {
            heading : Cesium.Math.toRadians(-20.0),
            pitch : Cesium.Math.toRadians(-35.0),
            roll : 0.0
        }
    });
}
*/

function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(139.691706, 35.689487, height);
/*
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
*/
    var heading = Cesium.Math.toRadians(10.0);
    var pitch = Cesium.Math.toRadians(0.0);
    var roll = Cesium.Math.toRadians(0.0);

    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = viewer.entities.add({
        name : url,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            scale : 1000.0
        }
    });
    viewer.flyTo(entity, { duration: 4 }).then(function() {
        viewer.trackedEntity = entity;
    });
}

createModel('https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf', 10000); // box.gltf

flyToHeadingPitchRoll();
