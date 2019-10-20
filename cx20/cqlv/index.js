// forked from cx20's "Three.js の雲のサンプルに飛行石を追加してみるテスト" http://jsdo.it/cx20/uMJj
// forked from cx20's "Three.js の雲のサンプルを試してみるテスト" http://jsdo.it/cx20/pArs
// forked from Mr.doob's "Clouds" http://www.mrdoob.com/lab/javascript/webgl/clouds/

var ID = 1;
var list = [];

var targetRotation = 0;
//This needs to be declared separately, currently not sure why but cube does not appear otherwise
var targetRotationOnMouseDown = 0;

if (!Detector.webgl) Detector.addGetWebGLMessage();
var container;
var camera, scene, renderer;
var mesh, geometry, material;
var mouseX = 0,
    mouseY = 0;
var start_time = Date.now();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var ROT_SPEED = 100;
var group_rot = 0;
var group;
var theta = 0;
var L_SIZE = 3;
var M_SIZE = 2;
var S_SIZE = 1;
var SIZE = 15;

var cubes = [
    // 大サイズ
    { x: 3+L_SIZE/2  , y: 3+L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
    { x:-3-L_SIZE/2  , y: 3+L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
    { x:-3-L_SIZE/2  , y:-3-L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
    { x: 3+L_SIZE/2  , y:-3-L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
    { x: 3+L_SIZE/2  , y: 3+L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
    { x:-3-L_SIZE/2  , y: 3+L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
    { x:-3-L_SIZE/2  , y:-3-L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
    { x: 3+L_SIZE/2  , y:-3-L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
    // 中サイズ
    { x: 1+M_SIZE/2  , y: 4+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y: 1+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y:-4-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y:-1-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y: 1+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y: 4+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y:-1-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y:-4-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
    
    { x: 1+M_SIZE/2  , y: 4+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y: 1+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y:-4-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y:-1-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y: 1+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y: 4+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y:-1-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y:-4-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },

    { x: 4+M_SIZE/2  , y: 4+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y: 4+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y:-4-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y:-4-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y: 4+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y: 4+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x:-4-M_SIZE/2  , y:-4-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x: 4+M_SIZE/2  , y:-4-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    
    // 内側の中サイズの立方体
    { x: 1+M_SIZE/2  , y: 1+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y: 1+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y:-1-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y:-1-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y: 1+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y: 1+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x:-1-M_SIZE/2  , y:-1-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    { x: 1+M_SIZE/2  , y:-1-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
    // 中央の中サイズの立方体
    { x: 0           , y: 0           , z: 0           , size:M_SIZE },

    // 小サイズ
    { x: 0+S_SIZE/2  , y: 5+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y: 0+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x:-0-S_SIZE/2  , y:-5-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y:-0-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y: 0+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x:-0-S_SIZE/2  , y: 5+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y:-0-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
    { x: 0+S_SIZE/2  , y:-5-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },

    { x: 0+S_SIZE/2  , y: 5+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y: 0+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x:-0-S_SIZE/2  , y:-5-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y:-0-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y: 0+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x:-0-S_SIZE/2  , y: 5+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y:-0-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
    { x: 0+S_SIZE/2  , y:-5-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },

    { x: 5+S_SIZE/2  , y: 5+S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y: 5+S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y:-5-S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y:-5-S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y: 5+S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y: 5+S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
    { x:-5-S_SIZE/2  , y:-5-S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
    { x: 5+S_SIZE/2  , y:-5-S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE }
];

function getRandomColor() {
    var r = Math.floor(Math.random() * 128);
    var g = Math.floor(Math.random() * 128);
    var b = Math.floor(Math.random() * 128);
    return "rgb(" + r + "," + g + "," + b + ")";
}

init();
animate();

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
    camera.position.x = -100;
    camera.position.y = 250;
    //The zoom level of the camera
    camera.position.z = 500;

    scene = new THREE.Scene();
    geometry = new THREE.Geometry();
    var texture = THREE.ImageUtils.loadTexture('../../assets/A/6/6/7/A667Q.png', null, animate); // cloud10.png
    //var texture = THREE.ImageUtils.loadTexture('cloud10.png', null, animate); // cloud10.png
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
    for (var i = 0; i < 800; i++) {
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
    mesh.position.z = -800;
    scene.add(mesh);

//-------------------------------------------
    group = new THREE.Object3D();
    scene.add(group);
    for (i = 0; i < cubes.length; i++) {
        cube = cubes[i];

        //Cube
        var geometry2 = new THREE.CubeGeometry(cube.size * SIZE, cube.size * SIZE, cube.size * SIZE);

        //This is the 'shadow'/plane colour
        var material2 = new THREE.MeshBasicMaterial({
            color: 0xe0e0e0,
            vertexColors: THREE.FaceColors
        });


        for (var j = 0; j < geometry2.faces.length; j++) {
            geometry2.faces[0].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry2.faces[1].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry2.faces[2].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry2.faces[4].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry2.faces[3].color.setRGB(Math.random(), Math.random(), Math.random());
            geometry2.faces[5].color.setRGB(Math.random(), Math.random(), Math.random());
        }

        mesh = new THREE.Mesh(geometry2, material2);
        mesh.position.x = cube.x * SIZE * 1.02;
        mesh.position.y = cube.y * SIZE * 1.02;
        mesh.position.z = cube.z * SIZE * 1.02;
        group.add(mesh);
        list.push(mesh);
    }
//-------------------------------------------

    renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    for (i = 0; i < list.length; i++) {
        new TWEEN.Tween(list[i].scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1000)
            .easing(TWEEN.Easing.Back.Out).start();
    }

    setInterval(changeID, 5000);
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
    render();
}

function render() {
    TWEEN.update();
    position = ((Date.now() - start_time) * 0.03) % 8000;
    camera.position.x += (mouseX - camera.position.x) * 0.01;
    camera.position.y += (-mouseY - camera.position.y) * 0.01;
    //camera.position.z = -position + 8000;

    group_rot += 0.0001 * ROT_SPEED;
    group.rotation.x = group_rot;
    group.rotation.y = group_rot;
    group.rotation.z = group_rot;

    renderer.render(scene, camera);
}

function changeID() {

    switch (ID) {
    case 1:
        changeFormation1();
        break;
    case 2:
        changeFormation2();
        break;
    case 3:
        changeFormation3();
        break;
    default:
        changeFormation1();
        break;
    }

    ID++;
    if (ID > 3) {
        ID = 1;
    }
}

// Random
function changeFormation1() {
    for (var i = 0; i < list.length; i++) {
        var rot = 360 / list.length * i;
        var vx = Math.random() * 400 - 200;
        var vy = Math.random() * 400 - 200;
        var vz = Math.random() * 400 - 200;

        new TWEEN.Tween(list[i].position).to({
            x: vx,
            y: vy,
            z: vz
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(list[i].rotation).to({
            x: 0,
            y: rot,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

// Cube
function changeFormation2() {
    for (var i = 0; i < list.length; i++) {
        new TWEEN.Tween(list[i].position).to({
            x: cubes[i].x * 15,
            y: cubes[i].y * 15,
            z: cubes[i].z * 15
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(list[i].rotation).to({
            x: 0,
            y: 0,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

// Spiral
function changeFormation3() {
    for (var i = 0; i < list.length; i++) {
        var rot = 25 * i;
        var vx = 150 * Math.sin(rot * Math.PI / 180);
        var vy = 10 * i - 250;
        var vz = 150 * Math.cos(rot * Math.PI / 180);

        new TWEEN.Tween(list[i].position).to({
            x: vx,
            y: vy,
            z: vz
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(list[i].rotation).to({
            x: 0,
            y: rot,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}
