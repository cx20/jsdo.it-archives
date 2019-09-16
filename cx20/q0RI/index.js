// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});

var scene = new GLBoost.Scene();

var positions = [];
var colors = [];
for ( var i = 0; i < 10000; i++ ) {
    var x = (Math.random() - 0.5) * 2 * 10;
    var y = (Math.random() - 0.5) * 2 * 10;
    var z = (Math.random() - 0.5) * 2 * 10;
    var vector = new  GLBoost.Vector3(x, y, z);
    if ( vector.length() < 10 ) {
        var vectorA = new GLBoost.Vector3(x + Math.random() * 5, y + Math.random() * 5, z + Math.random() * 5);
        var vectorB = new GLBoost.Vector3(x + Math.random() * 5, y + Math.random() * 5, z + Math.random() * 5);
        var vectorC = new GLBoost.Vector3(x + Math.random() * 5, y + Math.random() * 5, z + Math.random() * 5);
        var colorA = new GLBoost.Vector3(Math.random(), Math.random(), Math.random());
        var colorB = new GLBoost.Vector3(Math.random(), Math.random(), Math.random());
        var colorC = new GLBoost.Vector3(Math.random(), Math.random(), Math.random());
        positions.push( vectorA );
        positions.push( vectorB );
        positions.push( vectorC );
        colors.push( colorA );
        colors.push( colorB );
        colors.push( colorC );
    }
}

var geometry = new GLBoost.Geometry(canvas);
geometry.setVerticesData({
    position: positions,
    color: colors
});
var mesh = new GLBoost.Mesh(geometry);

scene.add( mesh );

var camera = new GLBoost.Camera({
    eye: new GLBoost.Vector3(0.0, 0.0, 50.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 100.0
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
