// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト（その２改3）" http://jsdo.it/cx20/oFH2
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト（その２改2）" http://jsdo.it/cx20/aqlY
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト（その２改）" http://jsdo.it/cx20/kc72
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/aeZe
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト" http://jsdo.it/cx20/2Nrf
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var stats = new Stats();
stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

// 配列連結処理の高速化対応版
function merge(object, object2, offset) {
    var base = object._geometry._vertices.position.length;
    var len = object2._geometry._vertices.position.length;
    for (var i = 0; i < len; i++) {
        var p = object2._geometry._vertices.position[i];
        object._geometry._vertices.position.push(
            new GLBoost.Vector3(p.x + offset.x, p.y + offset.y, p.z + offset.z));
    }
    Array.prototype.push.apply(object._geometry._vertices.color, object2._geometry._vertices.color);
    Array.prototype.push.apply(object._geometry._vertices.normal, object2._geometry._vertices.normal);
    Array.prototype.push.apply(object._geometry._vertices.texcoord, object2._geometry._vertices.texcoord);
    len = object2._geometry._indicesArray[0].length;
    for (i = 0; i < len; i++) {
        var idx = object2._geometry._indicesArray[0][i];
        object._geometry._indicesArray[0].push(base + idx);
    }
}

var DOT_SIZE = 0.1;
var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:0, green:0, blue:0, alpha:1}});

var scene = new GLBoost.Scene();

var parser = new vox.Parser();
// adobe.vox
//parser.parse("/assets/Y/L/j/y/YLjy3").then(function(voxelData) {
// mario.vox
parser.parse("../../assets/m/S/B/J/mSBJ6.vox").then(function(voxelData) {
    var w = DOT_SIZE*0.8;
    var cubeGeometry = new GLBoost.Cube(new GLBoost.Vector3(w, w, w), new GLBoost.Vector4(1, 1, 1, 1), canvas);
    var shader = new GLBoost.PhongShader(canvas);
    //var shader = new GLBoost.LambertShader(canvas);
    
    var material = new GLBoost.ClassicMaterial(canvas);
    var geometry = new GLBoost.Cube(new GLBoost.Vector3(0,0,0), new GLBoost.Vector4(1, 1, 1,1), canvas);
    var object = new GLBoost.Mesh(geometry, material);

    for (var i = 0; i < voxelData.voxels.length; i++) {
        var voxel = voxelData.voxels[i];
        var c = voxelData.palette[voxel.colorIndex];
        
        // 対象となる色の場合のみドットを描画
        var cubeGeometry = new GLBoost.Cube(new GLBoost.Vector3(w, w, w), new GLBoost.Vector4(c.r / 255, c.g / 255, c.b / 255, 1.0), canvas);
        var cube = new GLBoost.Mesh(cubeGeometry, material);

        merge(object, cube, new GLBoost.Vector3(
            voxel.x * DOT_SIZE - voxelData.size.x * DOT_SIZE / 2,
            voxel.y * DOT_SIZE - voxelData.size.y * DOT_SIZE / 2,
            voxel.z * DOT_SIZE - voxelData.size.z * DOT_SIZE / 2
        ));
    }
    scene.add(object);

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
        var rotateMatrixX = GLBoost.Matrix33.rotateX(1);
        var rotateMatrixY = GLBoost.Matrix33.rotateY(1);
        var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
        rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
        camera.eye = rotatedVector;

        stats.update();

        requestAnimationFrame(arguments.callee);
    })();
});
