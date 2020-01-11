// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その７）" http://jsdo.it/cx20/47vR
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その６）" http://jsdo.it/cx20/yWoE
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その５）" http://jsdo.it/cx20/cYlz
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その４）" http://jsdo.it/cx20/2I0b
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/2s3w
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その２）" http://jsdo.it/cx20/eFsr
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト" http://jsdo.it/cx20/uw48
// forked from cx20's "Cesium.js で3Dモデル表示してみるテスト（その１）" http://jsdo.it/cx20/UKCJB
// forked from cx20's "3D地図ライブラリ「Cesium」を用いて地球を表示してみるテスト" http://jsdo.it/cx20/pGyG

var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox : false,
    selectionIndicator : false,
    shouldAnimate: true
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
    var heading = Cesium.Math.toRadians(135);
/*
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
*/
    var heading = Cesium.Math.toRadians(30.0);
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
//createModel('https://rawcdn.githack.com/cx20/jsdo-static-contents/76dfc928/models/gltf/2.0/EmaSimpleSkin_blender/glTF/EmaSimpleSkin_blender.gltf', 10000); // EmaSimpleSkin_blender.gltf
//createModel('https://rawcdn.githack.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf', 10000); // CesiumMilkTruck.gltf
//createModel('https://rawcdn.githack.com/cx20/jsdo-static-contents/762acc8f/models/gltf/2.0/GrimoireLogo/glTF/GrimoireLogo.gltf', 10000); // GrimoireLogo.gltf
//createModel('https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf', 10000); // MetalRoughSpheres.gltf
//createModel('https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf', 10000); // scene.gltf
//createModel('https://rawcdn.githack.com/KhronosGroup/glTF-Blender-Exporter/2bdcb263/polly/project_polly.gltf', 10000); // project_polly.gltf
createModel('https://rawcdn.githack.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf', 10000); // project_polly.gltf

//flyToHeadingPitchRoll();
