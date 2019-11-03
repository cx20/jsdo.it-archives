// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    var material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
    var geometry = new THREE.PlaneGeometry(1, 1);
    
    // 各頂点に色情報を設定
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //      [0]-----[2] [2]
    //       |  f0  /  / |
    //       |    /  /   |
    //       |  /  /  f1 |
    //      [1] [0]-----[1]
    //
    geometry.faces[0].vertexColors[0] = new THREE.Color(0xff0000); // f0-v0
    geometry.faces[0].vertexColors[1] = new THREE.Color(0x0000ff); // f0-v1
    geometry.faces[0].vertexColors[2] = new THREE.Color(0x00ff00); // f0-v2
    geometry.faces[1].vertexColors[0] = new THREE.Color(0x0000ff); // f1-v0
    geometry.faces[1].vertexColors[1] = new THREE.Color(0xffff00); // f1-v1
    geometry.faces[1].vertexColors[2] = new THREE.Color(0x00ff00); // f1-v2

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}
