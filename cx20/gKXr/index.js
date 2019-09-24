// forked from cx20's "[WebGL] Hilo3d を試してみるテスト" http://jsdo.it/cx20/gwMA
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

//var camera = new Hilo3d.PerspectiveCamera();
var camera = new Hilo3d.PerspectiveCamera({
    aspect: innerWidth / innerHeight,
    far: 100,
    near: 0.1,
    z: 2
});
var stage = new Hilo3d.Stage({
    container: document.getElementById('container'),
    camera: camera,
    clearColor: new Hilo3d.Color(1.0, 1.0, 1.0),
    width: innerWidth,
    height: innerHeight
});

var geometry = new Hilo3d.Geometry();
geometry.addFace(
    [-0.5, -0.5, 0.0],
    [ 0.5, -0.5, 0.0],
    [ 0.0,  0.5, 0.0]
);
var mesh = new Hilo3d.Mesh({
    geometry: geometry,
    material: new Hilo3d.BasicMaterial({
        diffuse: new Hilo3d.Color(0, 0, 1)
    })
});
stage.addChild(mesh);

var ticker = new Hilo3d.Ticker(60);
ticker.addTick(stage);
ticker.start(true);
