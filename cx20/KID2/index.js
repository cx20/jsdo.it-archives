// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（調整中）" http://jsdo.it/cx20/gwMA
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var camera = new Hilo3d.PerspectiveCamera();
var stage = new Hilo3d.Stage({
    container: document.getElementById('container'),
    camera: camera,
    clearColor: new Hilo3d.Color(1.0, 1.0, 1.0),
    width: innerWidth,
    height: innerHeight
});

// 正方形の座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//        [0]------[1]
//         |      / |
//         |    /   |
//         |  /     |
//        [2]------[3]
//
var positions = [
    -0.5, 0.5, 0.0, // v0
     0.5, 0.5, 0.0, // v1 
    -0.5,-0.5, 0.0, // v2
     0.5,-0.5, 0.0  // v3
];
var colors = [
    1.0, 0.0, 0.0, 1.0, // v0
    0.0, 1.0, 0.0, 1.0, // v1
    0.0, 0.0, 1.0, 1.0, // v2
    1.0, 1.0, 0.0, 1.0  // v3
];
var indices = [
    2, 0, 1, // v2-v0-v1
    2, 1, 3  // v2-v1-v3
];
var geometry = new Hilo3d.Geometry({
    vertices: new Hilo3d.GeometryData(new Float32Array(positions), 3),
    colors: new Hilo3d.GeometryData(new Float32Array(colors), 4),
    indices: new Hilo3d.GeometryData(new Uint16Array(indices), 1)
});

var mesh = new Hilo3d.Mesh({
    geometry: geometry,
    material: new Hilo3d.ShaderMaterial({
        cullFace: false,
        attributes:{
            a_position: 'POSITION',
            a_color: 'COLOR_0'
        },
        fs: document.getElementById('fs').textContent,
        vs: document.getElementById('vs').textContent
    })
});

stage.addChild(mesh);

var ticker = new Hilo3d.Ticker(60);
ticker.addTick(stage);
ticker.start(true);
