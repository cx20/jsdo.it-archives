// forked from cx20's "[WebGL] three.js  のプリミティブ型を試してみるテスト" http://jsdo.it/cx20/OjZ8
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/dutP
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/kwGs
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/d11S
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;
var meshSphere;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 10;
    scene = new THREE.Scene();
    
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1).normalize();
    scene.add( light );

    var geometrySphere = new THREE.SphereGeometry(0.5, 24, 24);

    // ・縦軸
    //   [Metal]
    //      ↑
    //      ↓
    //   [Non-metal]
    // 
    // ・横軸
    //   [Smooth]←→[Rough]
    //
    for(var r = 0.0; r <= 1.0; r += 0.25) {
        for(var m = 0.0; m <= 1.0; m += 0.25) {
            var material = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: r, metalness: m});
            
            // SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength)
            meshSphere = new THREE.Mesh(geometrySphere, material);
            meshSphere.position.set((r-0.5)*4, (m-0.5)*4, 0);
        
            scene.add(meshSphere);
        }
    }
    

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = false;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 10.0;    //自動回転する時の速度

}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var rad = 0.0;
function render() {
    rad += Math.PI * 1.0 / 180.0

    meshSphere.rotation.y = rad;

    renderer.render(scene, camera);

    controls.update();
}
