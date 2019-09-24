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
    var url = "https://cdn.rawgit.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";

    document.getElementById("inline").setAttribute("url", url);

    runtime.showAll("posZ", true);
    //runtime.showAll("negZ", true);
}

function onDownloadsFinished()
{
    //runtime.showAll("posZ", true);
    runtime.showAll("negZ", true);
};
