// forked from cx20's "[WebGL] three.js でスライム曲面を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/ksyv
// forked from cx20's "[WebGL] three.js で Wave Ball を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/MLYQ
// forked from cx20's "[WebGL] three.js でトーラスを描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/CHKo
// forked from cx20's "[WebGL] three.js でリンゴ曲面を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/sAZvW
// forked from cx20's "[WebGL] three.js で貝殻曲面を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/YuLf
// forked from cx20's "[WebGL] three.js でローマ曲面を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/qcoh
// forked from cx20's "[WebGL] three.js で３次元リサージュ図形を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/075N
// forked from cx20's "[WebGL] three.js でリサージュ図形を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/QQAP
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;
var mesh;
var controls;

var WIDTH_SEGMENT =  72;
var HEIGHT_SEGMENT = 72;
var WIDTH_SIZE = 1.0 * 2 / WIDTH_SEGMENT;
var HEIGHT_SIZE = 1.0 * 2 / WIDTH_SEGMENT;

var geometry = new THREE.BufferGeometry();
var positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
var colors = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    scene.add( new THREE.AmbientLight( 0xffffff ) );

    var light = new THREE.SpotLight(0xaabbcc);
    light.position.set( 100, 100, 100);
    light.target.position.set( 0, 0, 0 );
    light.shadowCameraVisible = true;
    light.castShadow = true;
    scene.add( light );

    // スライムの座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    var ustep = Math.PI * 5 / 180;
    var vstep = Math.PI * 5 / 180;
    var a = 1;
    var b = 1;
    var c = 1;
    var r = 1;
    var i = 0;
    for (var v = -Math.PI/2; v <= Math.PI/2; v += vstep) {
        for (var u = 0; u <= 2 * Math.PI; u += ustep) {
            var x = b * (Math.cos(v) * (r + Math.sin(v))) * Math.cos(u);
            var y = a * (r + Math.sin(v));
            var z = b * (Math.cos(v) * (r + Math.sin(v))) * Math.sin(u);
            var x2 = x/2;
            var y2 = y/2 - 0.5;
            var z2 = z/2;
            positions[i * 3 + 0] = x2;
            positions[i * 3 + 1] = y2;
            positions[i * 3 + 2] = z2;
            
            i++;
        }
    }
    
    var indices = new Uint16Array(WIDTH_SEGMENT * HEIGHT_SEGMENT * 6);
    i = 0;
    for (var row = 0; row < HEIGHT_SEGMENT; row++) {
        for (var col = 0; col < WIDTH_SEGMENT; col++) {
            var a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
            var b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
            var c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
            var d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
            indices[i * 6 + 0] = b;
            indices[i * 6 + 1] = a;
            indices[i * 6 + 2] = c;
            indices[i * 6 + 3] = a;
            indices[i * 6 + 4] = d;
            indices[i * 6 + 5] = c;
            i++;
        }
    }
    
    // attributesを追加
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals(); // 法線ペクトルを計算で算出
    
    var material = new THREE.MeshPhongMaterial( {
        color: 0x404040,
        ambient:0x404040,
        specular:0x808080,
        shininess:30,
        metal:true,
        side: THREE.DoubleSide
    } );

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI * 200/180;

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.autoRotate = true; // true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 10.0; // 自動回転する時の速度
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var rad = 0.0;
function render() {
    controls.update();
    renderer.render(scene, camera);
}
