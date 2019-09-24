// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/O7Hi
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/gKXr
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト" http://jsdo.it/cx20/gwMA
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

//var camera = new Hilo3d.PerspectiveCamera();
var camera = new Hilo3d.PerspectiveCamera({
    aspect: innerWidth / innerHeight,
    far: 100,
    near: 0.1,
    z: 3
});
var stage = new Hilo3d.Stage({
    container: document.getElementById('container'),
    camera: camera,
    clearColor: new Hilo3d.Color(1.0, 1.0, 1.0),
    width: innerWidth,
    height: innerHeight
});

var colors = [
    1.0, 0.0, 0.0, // Front face
    1.0, 0.0, 0.0, // Front face
    1.0, 0.0, 0.0, // Front face
    1.0, 0.0, 0.0, // Front face
    
    1.0, 1.0, 0.0, // Back face
    1.0, 1.0, 0.0, // Back face
    1.0, 1.0, 0.0, // Back face
    1.0, 1.0, 0.0, // Back face
    
    0.0, 1.0, 0.0, // Top face
    0.0, 1.0, 0.0, // Top face
    0.0, 1.0, 0.0, // Top face
    0.0, 1.0, 0.0, // Top face
    
    1.0, 0.5, 0.5, // Bottom face
    1.0, 0.5, 0.5, // Bottom face
    1.0, 0.5, 0.5, // Bottom face
    1.0, 0.5, 0.5, // Bottom face
    
    1.0, 0.0, 1.0, // Right face
    1.0, 0.0, 1.0, // Right face
    1.0, 0.0, 1.0, // Right face
    1.0, 0.0, 1.0, // Right face
    
    0.0, 0.0, 1.0,  // Left face
    0.0, 0.0, 1.0,  // Left face
    0.0, 0.0, 1.0,  // Left face
    0.0, 0.0, 1.0   // Left face
];

var geometry = new Hilo3d.BoxGeometry({
    colors: new Hilo3d.GeometryData(new Float32Array(colors), 3)
});

var mesh = new Hilo3d.Mesh({
    geometry: geometry,
    material: new Hilo3d.BasicMaterial({
        lightType: 'NONE'
    }),
    onUpdate: function() {
       this.rotationX += 0.5;
       this.rotationY += 0.5;
       this.rotationZ += 0.5;
    }
});
stage.addChild(mesh);

var ticker = new Hilo3d.Ticker(60);
ticker.addTick(stage);
ticker.start(true);
