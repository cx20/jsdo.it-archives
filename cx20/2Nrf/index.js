// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var DOT_SIZE = 0.2;
var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:0, green:0, blue:0, alpha:1}});

var scene = new GLBoost.Scene();

var parser = new vox.Parser();
// adobe.vox
parser.parse("../../assets/y/l/j/y/yljy3.vox").then(function(voxelData) {
    for ( var i = 0; i  < voxelData.voxels.length; i++ ) {
        var voxel = voxelData.voxels[i];
        var c = voxelData.palette[voxel.colorIndex];
        var color = new GLBoost.Vector3(c.r / 255, c.g / 255, c.b / 255);
        var width = DOT_SIZE*0.8;
        var cube = new GLBoost.Cube(new GLBoost.Vector3(width, width, width), color, canvas);
        cube.translate = new GLBoost.Vector3(
            voxel.x * DOT_SIZE - voxelData.size.x * DOT_SIZE / 2,
            voxel.y * DOT_SIZE - voxelData.size.y * DOT_SIZE / 2,
            voxel.z * DOT_SIZE - voxelData.size.z * DOT_SIZE / 2
        );

        scene.add(cube);
    }

    var camera = new GLBoost.Camera({
        eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 10.0
    });

    scene.add( camera );

    scene.prepareForRender();

    (function(){
        renderer.clearCanvas();
        renderer.draw(scene);
        var rotateMatrixX = GLBoost.Matrix33.rotateX(-0.02);
        var rotateMatrixY = GLBoost.Matrix33.rotateY(-0.02);
        var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
        rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
        camera.eye = rotatedVector;

        requestAnimationFrame(arguments.callee);
    })();
});
