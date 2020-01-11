// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その１７）（調整中）" http://jsdo.it/cx20/6Gw9
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その１６）（調整中）" http://jsdo.it/cx20/ovtd
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/cO0B
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/6ha6
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その１３）（調整中）" http://jsdo.it/cx20/ihdN
// forked from cx20's "[WebGL] X3DOMで glTF 2.0形式のデータを表示してみるテスト（その１２）（調整中）" http://jsdo.it/cx20/2vGn
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
    
    //var url = "https://cdn.rawgit.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb";
    //var url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb";
    //var url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb";
    //var url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb";
    //var url = "https://cdn.rawgit.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_07.gltf";
    var url = "https://rawcdn.githack.com/mrdoob/three.js/r97/examples/models/gltf/BotSkinned/glTF-MaterialsUnlit/Bot_Skinned.gltf";

    document.getElementById("inline").setAttribute("url", url);

    runtime.showAll("posZ", true);
    //runtime.showAll("negZ", true);
}

function onDownloadsFinished()
{
    //runtime.showAll("posZ", true);
    runtime.showAll("negZ", true);
};
