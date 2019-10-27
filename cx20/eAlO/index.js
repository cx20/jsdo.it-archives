// forked from cx20's "[WebGL] three.js で貝殻曲面を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/YuLf
// forked from cx20's "[WebGL] three.js でローマ曲面を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/qcoh
// forked from cx20's "[WebGL] three.js で３次元リサージュ図形を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/075N
// forked from cx20's "[WebGL] three.js でリサージュ図形を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/QQAP
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;
var mesh;

var WIDTH_SEGMENT = 72;
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

    var light = new THREE.SpotLight(0x33ccff);
    light.position.set( 0, 500, 500 );
    light.target.position.set( 0, 0, 0 );
    light.shadowCameraVisible = true;
    light.castShadow = true;
    scene.add( light );

    // 貝殻曲面（seashell）の座標データを用意
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
    var a = 0.2;
    var b = 0.6;
    var c = 0.2;
    var n = 2.0;
    var i = 0;
    for (var v = 0; v <= 2 * Math.PI; v += vstep) {
        for (var u = 0; u <= 2 * Math.PI; u += ustep) {
            x = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.cos(n * v);
            y = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.sin(n * v);
            z = b * v / (2 * Math.PI) + a * (1 - v / (2 * Math.PI)) * Math.sin(u);
            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            //colors[i * 3 + 0] = x + 0.5;
            //colors[i * 3 + 1] = y + 0.5;
            //colors[i * 3 + 2] = z + 0.5;
            
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
    //geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals(); // 法線ペクトルを計算で算出
    
    var material = new THREE.MeshPhongMaterial( {
		color: 0x0a4a88,
		ambient:0x990000,
		specular:0xffff00,
		shininess:10,
		metal:false,
        side: THREE.DoubleSide
        //vertexColors: THREE.VertexColors
    } );

    mesh = new THREE.Mesh(geometry, material);
    //mesh = new THREE.Line(geometry, material);
    mesh.rotation.x = Math.PI * 90/180;

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
    rad += Math.PI * 1.0 / 180.0
    mesh.rotation.z = -rad;
    renderer.render(scene, camera);
}
