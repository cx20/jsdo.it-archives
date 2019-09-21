// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１８）（調整中）" http://jsdo.it/cx20/MsNEK
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１７）（調整中）" http://jsdo.it/cx20/aSHJI
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１６）（調整中）" http://jsdo.it/cx20/E6bC
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/2QKh
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/0Gbw
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１３）（調整中）" http://jsdo.it/cx20/2fVS
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１２）（調整中）" http://jsdo.it/cx20/KFfB
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１１）（調整中）" http://jsdo.it/cx20/QQHP
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/6z4e
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/0r7J
// forked from cx20's "[WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その８）" http://jsdo.it/cx20/u7sb
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

function createModel(url, height) {
    viewer.entities.removeAll();

    let position = Cesium.Cartesian3.fromDegrees(139.691706, 35.689487, height);
    let heading = Cesium.Math.toRadians(135);
    let pitch = 0;
    let roll = 0;
/*
    let heading = Cesium.Math.toRadians(30);
    let pitch = Cesium.Math.toRadians(0);
    let roll = Cesium.Math.toRadians(0);
*/
    
    let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

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

//createModel('https://cdn.rawgit.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb', 10000);
//createModel('https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb', 10000);
//createModel('https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb', 10000);
//createModel('https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb', 10000);
//createModel('https://cdn.rawgit.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_01.gltf', 10000);
//createModel('https://cdn.rawgit.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_04.gltf', 10000);
//createModel('https://cdn.rawgit.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_07.gltf', 10000);
//createModel('https://cdn.rawgit.com/mrdoob/three.js/r97/examples/models/gltf/BotSkinned/glTF-MaterialsUnlit/Bot_Skinned.gltf', 10000);
createModel('https://cdn.rawgit.com/cx20/gltf-test/7af4f399/tutorialModels/SpecGlossVsMetalRough/glTF/SpecGlossVsMetalRough.gltf', 10000);

