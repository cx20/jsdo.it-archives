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

var camera, scene, renderer;
var mesh;

var WIDTH_SEGMENT =  32;
var HEIGHT_SEGMENT = 32;
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
    var num = 16;
    var i = 0;
    for (var v = -num; v <= num; v++) {
        for (var u = -num; u <= num; u++) {
            var theta = Math.PI * v / num;
            var z0 = u / num;
            var r = 4 * Math.sqrt(1 - z0 * z0) * Math.pow(Math.sin(Math.abs(theta)), Math.abs(theta));
            var x1 = r * Math.sin(theta);
            var y1 = r * Math.cos(theta);
            var z1 = z0 * 1.3;
            var x2 = x1 / 8;
            var y2 = y1 / 8;
            var z2 = z1 / 8;
            positions[i * 3 + 0] = x2;
            positions[i * 3 + 1] = y2;
            positions[i * 3 + 2] = z2;

            colors[i * 3 + 0] = x2 + 0.9;
            colors[i * 3 + 1] = y2 + 0.1;
            colors[i * 3 + 2] = z2 + 0.3;
            
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
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    
    var material = new THREE.MeshPhongMaterial( {
        side: THREE.DoubleSide, 
        vertexColors: THREE.VertexColors,
    } );

    mesh = new THREE.Mesh(geometry, material);
    //mesh = new THREE.Line(geometry, material);
    mesh.rotation.x = Math.PI * 60/180;
    mesh.rotation.y = -Math.PI * 10/180;

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var rad = 0.0;
function render() {
    rad += Math.PI * 1.0 / 180.0
    mesh.rotation.x = rad;
    //mesh.rotation.y = rad;
    mesh.rotation.z = rad;
    renderer.render(scene, camera);
}
