// forked from cx20's "[WebGL] three.js で３次元リサージュ図形を描いてみるテスト（組み込み関数編）" http://jsdo.it/cx20/iXHw
// forked from cx20's "[WebGL] three.js でリサージュ図形を描いてみるテスト（組み込み関数編）" http://jsdo.it/cx20/Ou1B
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;
var mesh;
var theta = 0;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    // 3次元関数の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    var colors = [];
    var geometry = new THREE.Geometry();
    for ( var j = -10; j < 10; j += 0.2 ) {
        for ( var i = -10; i < 10; i += 0.2) {
            var x = i;
            var y = j;
            var z = Math.sin(Math.sqrt(x*x+y*y) + theta)/Math.sqrt(x*x+y*y);
            var x2 = x / 10;
            var y2 = y / 10;
            var z2 = z / 2;
            geometry.vertices.push(new THREE.Vector3(x2, y2, z2));
            colors.push(new THREE.Color(x2 + 0.5, y2 + 0.5, z2 + 0.5));
        }
    }

    geometry.colors = colors;
    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    mesh = new THREE.Line(geometry, material, THREE.LineStrip);
    mesh.rotation.x = -Math.PI * 60/180;
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var rad = 0.0;
function render() {
    rad += Math.PI * 1.0 / 180.0
    mesh.rotation.z = rad;
    renderer.render(scene, camera);
}
