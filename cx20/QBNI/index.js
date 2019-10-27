// forked from cx20's "[WebGL] three.js + ポリゴンで３次元関数を表示してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/ylYQ
// forked from cx20's "[WebGL] three.js で３次元関数をプロットしてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/qf2Z
// forked from cx20's "[WebGL] three.js で３次元関数を描いてみるテスト（組み込み関数編）" http://jsdo.it/cx20/k7xv
// forked from cx20's "[WebGL] three.js で３次元リサージュ図形を描いてみるテスト（組み込み関数編）" http://jsdo.it/cx20/iXHw
// forked from cx20's "[WebGL] three.js でリサージュ図形を描いてみるテスト（組み込み関数編）" http://jsdo.it/cx20/Ou1B
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;
var mesh;
var controls;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    scene.add( new THREE.AmbientLight( 0xffffff ) );

    var light = new THREE.SpotLight(0x33ccff);
    light.position.set( 0, 500, 500 );
    light.target.position.set( 0, 0, 0 );
    light.shadowCameraVisible = true;
    light.castShadow = true;
    scene.add( light );

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
    var WIDTH_SEGMENT = 100;
    var HEIGHT_SEGMENT = 100;
    var WIDTH_SIZE = 1.0 * 2 / WIDTH_SEGMENT;
    var HEIGHT_SIZE = 1.0 * 2 / WIDTH_SEGMENT;

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
    var colors = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);

    var theta = 0;
    var k = 0;
    for (var j = -10; j < 10; j += 0.2) {
        for (var i = -10; i < 10; i += 0.2) {
            var x = i;
            var y = j;
            var z = Math.sin(Math.sqrt(x * x + y * y) + theta) / Math.sqrt(x * x + y * y);
            var x2 = x / 10;
            var y2 = y / 10;
            var z2 = z / 2;
            //var z2 = 0;
            positions[k * 3 + 0] = x2;
            positions[k * 3 + 1] = y2;
            positions[k * 3 + 2] = z2;

            colors[k * 3 + 0] = x2 + 0.5;
            colors[k * 3 + 1] = y2 + 0.5;
            colors[k * 3 + 2] = z2 + 0.5;

            k++;
        }
    }

    var indices = new Uint16Array(WIDTH_SEGMENT * HEIGHT_SEGMENT * 6);
    k = 0;
    for (var row = 0; row < HEIGHT_SEGMENT; row++) {
        for (var col = 0; col < WIDTH_SEGMENT; col++) {
            var a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
            var b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
            var c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
            var d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
            indices[k * 6 + 0] = b;
            indices[k * 6 + 1] = a;
            indices[k * 6 + 2] = c;
            indices[k * 6 + 3] = a;
            indices[k * 6 + 4] = d;
            indices[k * 6 + 5] = c;
            k++;
        }
    }

    // attributesを追加
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals(); // 法線ペクトルを計算で算出
    
    var material = new THREE.MeshPhongMaterial( {
        color: 0xaaaaaa, 
        ambient: 0xaaaaaa, 
        specular: 0xaaaaaa, 
        shininess: 30,
        metal: true,
        side: THREE.DoubleSide, 
        vertexColors: 
        THREE.VertexColors
    } );

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 60/180;

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.autoRotate = false; // true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 1.0; // 自動回転する時の速度
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var rad = 0.0;
function render() {
    controls.update();
    rad += Math.PI * 1.0 / 180.0
    //mesh.rotation.x = rad;
    //mesh.rotation.y = rad;
    mesh.rotation.z = rad;
    renderer.render(scene, camera);
}
