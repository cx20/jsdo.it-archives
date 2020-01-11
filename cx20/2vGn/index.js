// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その１１）（調整中）" http://jsdo.it/cx20/mIzr
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/4tob
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/GeSe
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その８）（調整中）" http://jsdo.it/cx20/0AVP
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その７）（調整中）" http://jsdo.it/cx20/eRiI
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その６）（調整中）" http://jsdo.it/cx20/s319
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その５）（調整中）" http://jsdo.it/cx20/OkGZ
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その４）（調整中）" http://jsdo.it/cx20/avTB
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/Qf82
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その２）（調整中）" http://jsdo.it/cx20/MfqJ
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（調整中）" http://jsdo.it/cx20/ULW2
// forked from cx20's "[WebGL] X3DOM  + glTF ファイルを試してみるテスト" http://jsdo.it/cx20/yb3D
// forked from cx20's "[WebGL] X3DOM を試してみるテスト（その４）" http://jsdo.it/cx20/MGpZ
// forked from cx20's "[WebGL] X3DOM を試してみるテスト（その３）" http://jsdo.it/cx20/YBBG
// forked from cx20's "[WebGL] X3DOM を試してみるテスト（その２）" http://jsdo.it/cx20/wBsT
// forked from cx20's "[WebGL] X3DOM を試してみるテスト" http://jsdo.it/cx20/mEdw
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
//nothing


var runtime;

document.onload = function () {
    x3d = document.getElementById("x3d");           
    x3d.addEventListener( "downloadsfinished", onDownloadsFinished );
    
    runtime = x3d.runtime;
    
    //var url = "https://cdn.rawgit.com/cx20/gltf-test/master/sampleModels/Box/glTF-Binary/Box.glb";
    //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
    //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
    //var url = "https://cdn.rawgit.com/cx20/jsdo-static-contents/5635d7da/models/gltf/2.0/EmaSimpleSkin/glTF/EmaSimpleSkin.gltf";
    //var url = "https://cdn.rawgit.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf";
    //var url = "https://cdn.rawgit.com/cx20/jsdo-static-contents/94bb7090/models/gltf/2.0/VoxelCorgi/glTF_merge/VoxelCorgi.gltf";
    //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
    //var url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
    //var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf";
    //var url = "https://cdn.rawgit.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/scene.gltf";
    //var url = "https://cdn.rawgit.com/mrdoob/rome-gltf/784089b4/files/models/life_soup/quadruped_fox.gltf";
    //var url = "https://rawcdn.githack.com/pissang/claygl/c4f45119/example/assets/models/SambaDancing/SambaDancing.gltf";
    var url = "https://cdn.rawgit.com/cx20/gltf-test/e63efa65/tutorialModels/FlightHelmet/glTF/FlightHelmet.gltf";

    document.getElementById("inline").setAttribute("url", url);

    runtime.showAll("posZ", true);
    //runtime.showAll("negZ", true);
}

function onDownloadsFinished()
{
    //runtime.showAll("posZ", true);
    runtime.showAll("negZ", true);
};
