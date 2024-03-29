// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その２）" http://jsdo.it/cx20/eFsr
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト" http://jsdo.it/cx20/uw48
// forked from cx20's "Cesium.js で3Dモデル表示してみるテスト（その１）" http://jsdo.it/cx20/UKCJB
// forked from cx20's "3D地図ライブラリ「Cesium」を用いて地球を表示してみるテスト" http://jsdo.it/cx20/pGyG

var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox : false,
    selectionIndicator : false,
    shouldAnimate: true
});                               

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

//createModel('https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf', 10000); // Triangle.gltf
//createModel('https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf', 10000); // TextureSettingsTest.gltf
createModel('https://rawcdn.githack.com/cx20/jsdo-static-contents/c51a03cbff72037e33aa2cc0b7fe7cac4e4bdea8/models/gltf/2.0/EmaSimpleSkin/glTF/EmaSimpleSkin.gltf', 10000); // COLLADA2GLTF 変換結果
//createModel('https://rawcdn.githack.com/cx20/jsdo-static-contents/76dfc928/models/gltf/2.0/EmaSimpleSkin_blender/glTF/EmaSimpleSkin_blender.gltf', 10000); // Blender出力結果
