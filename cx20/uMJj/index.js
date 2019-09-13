// forked from cx20's "Three.js の雲のサンプルを試してみるテスト" http://jsdo.it/cx20/pArs
// forked from Mr.doob's "Clouds" http://www.mrdoob.com/lab/javascript/webgl/clouds/

if (!Detector.webgl) Detector.addGetWebGLMessage();
var container;
var camera, scene, renderer;
var mesh, geometry, material;
var mouseX = 0,
    mouseY = 0;
var start_time = Date.now();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var ROT_SPEED = 200;
var group_rot = 0;
var group;
var theta = 0;

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    // Bg gradient
    var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d');
    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#1e4877");
    gradient.addColorStop(0.5, "#4584b4");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
    container.style.backgroundSize = '32px 100%';
    //
//    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000);
//    camera.position.z = 6000;
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    //The height of the camera in comparison to the scene
    camera.position.x = 100;
    camera.position.y = -100;
    camera.position.z = 300;

    scene = new THREE.Scene();
    geometry = new THREE.Geometry();
    var texture = THREE.ImageUtils.loadTexture('../../assets/A/6/6/7/A667Q.png', null, animate); // cloud10.png
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    var fog = new THREE.Fog(0x4584b4, -100, 3000);
    material = new THREE.ShaderMaterial({
        uniforms: {
            "map": {
                type: "t",
                value: texture
            },
            "fogColor": {
                type: "c",
                value: fog.color
            },
            "fogNear": {
                type: "f",
                value: fog.near
            },
            "fogFar": {
                type: "f",
                value: fog.far
            }
        },
        vertexShader: document.getElementById('vs').textContent,
        fragmentShader: document.getElementById('fs').textContent,
        depthWrite: false,
        depthTest: false,
        transparent: true
    });
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64));
    for (var i = 0; i < 8000; i++) {
        plane.position.x = Math.random() * 1000 - 500;
        plane.position.y = -Math.random() * Math.random() * 200 - 15;
        plane.position.z = i;
        plane.rotation.z = Math.random() * Math.PI;
        plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
        THREE.GeometryUtils.merge(geometry, plane);
    }
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -8000;
    scene.add(mesh);

//-------------------------------------------
    group = new THREE.Object3D();
    scene.add(group);
    
    // cylinder … 円筒形
    // API: THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded)
    //   bottomRadius     … 上面の半径
    //   topRadius        … 下面の半径
    //   height           … 高さ
    //   segmentsRadius   … 円周の分割数
    //   segmentsHeight   … 縦分割数
    //   openEnded        … false なら蓋をしない
    // 
    var geometry1 = new THREE.CylinderGeometry(0, 50, 50, 4, 1, false);
    var cylinder1 = new THREE.Mesh(geometry1, new THREE.MeshLambertMaterial({ color: 0x258fff }));
    cylinder1.position.y = 25;
    cylinder1.overdraw = true;
    
    var geometry2 = new THREE.CylinderGeometry(50, 0, 50, 4, 1, false);
    var cylinder2 = new THREE.Mesh(geometry2, new THREE.MeshLambertMaterial({ color: 0x258fff }));
    cylinder2.position.y = -25;
    cylinder2.overdraw = true;
    
    group.add(cylinder1);
    group.add(cylinder2);

    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(-10,50, 50).normalize();
    scene.add(light);
    
    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-100, 0, 50).normalize();
    scene.add(light2);
//-------------------------------------------

    renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.25;
    mouseY = (event.clientY - windowHalfY) * 0.15;
}

function onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    position = ((Date.now() - start_time) * 0.03) % 8000;
    camera.position.x += (mouseX - camera.position.x) * 0.01;
    camera.position.y += (-mouseY - camera.position.y) * 0.01;
    //camera.position.z = -position + 8000;
 
    group_rot += 0.0001 * ROT_SPEED;
    group.rotation.x = 0;
    group.rotation.y = group_rot;
    group.rotation.z = 0;

    renderer.render(scene, camera);
}