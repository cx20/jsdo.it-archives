// forked from cx20's "[WebGL] three.js でリサージュ図形を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/QQAP
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
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    // 3次元リサージュの座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    var MAX = 360;
    var A = 100.0;
    var B = 99.0;
    var C = 1.0;
    var alpha = Math.PI/4;
    var beta  = Math.PI/3;
    var theta = 0; // Math.PI/2;

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array((MAX*10+1) * 3);
    var colors = new Float32Array((MAX*10+1) * 3);
    var indices = new Uint16Array((MAX*10+1) * 1);

    var k = 0;
    for ( var i = 0; i <= MAX; i += 0.1 ) {
        var x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
        var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
        positions[k * 3 + 0] = x;
        positions[k * 3 + 1] = y;
        positions[k * 3 + 2] = z;
        
        colors[k * 3 + 0] = x + 0.5;
        colors[k * 3 + 1] = y + 0.5;
        colors[k * 3 + 2] = z + 0.5;
        
        indices[k] = k;
        
        k++;
    }
    
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    
    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    mesh = new THREE.Line(geometry, material, THREE.LineStrip);

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
    mesh.rotation.y = rad;
    renderer.render(scene, camera);
}
