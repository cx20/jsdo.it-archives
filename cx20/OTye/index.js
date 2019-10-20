// forked from cx20's "[WebGL] three.js で WebVR を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/qc23
// forked from cx20's "[WebGL] three.js で WebVR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/21Bb
// forked from cx20's "[WebGL] three.js で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/WmiX
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/dutP
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/kwGs
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/d11S
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// three var
let camera, scene, light, renderer, container, content;
let controller;

let meshs = [];
let grounds = [];
let matSphere, matGround, matGroundTrans;
let matSpheres = [];
let buffgeoSphere, buffgeoBox;
const ToRad = Math.PI / 180;
const ToDeg = 180 / Math.PI;
const dataSet = [
    {imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
    {imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
    {imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
    {imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
    {imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
];
let textures = [];

//oimo var
let world = new OIMO.World({
    timestep:1/10, 
    worldscale:1
});
let bodys = [];

function init() {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10000);
    //camera.position.set(180, 200, 300);
    //camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();
    
    scene.position.y = -90;
    scene.position.y = -100;
    scene.position.z = -300;

    content = new THREE.Object3D();
    scene.add(content);

    scene.add(new THREE.AmbientLight(0x3D4143));

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(300, 1000, 500);
    light.target.position.set(0, 0, 0);
    //light.castShadow = true;
    //light.shadow.camera = new THREE.OrthographicCamera(-300, 300, 300, -300, 100, 1600);
    scene.add(light);
    //let directionalLightHelper = new THREE.DirectionalLightHelper(light);
    //scene.add( directionalLightHelper);

    //let axis = new THREE.AxesHelper(100, 100, 100);
    //scene.add(axis);

    buffgeoSphere = new THREE.BufferGeometry();
    buffgeoSphere.fromGeometry(new THREE.SphereGeometry(1, 20, 10));

    buffgeoBox = new THREE.BufferGeometry();
    buffgeoBox.fromGeometry(new THREE.BoxGeometry(1, 1, 1));

    let loader = new THREE.TextureLoader();

    for (let i = 0; i < dataSet.length; i++) {
        let imageFile = dataSet[i].imageFile;
        textures[i] = loader.load(imageFile);
        matSpheres[i] = new THREE.MeshLambertMaterial({
            map: textures[i],
            name: 'sph' + i
        });
    }
    matGround = new THREE.MeshLambertMaterial({
        color: 0x3D4143,
        transparent: false
    });
    matGroundTrans = new THREE.MeshLambertMaterial({
        color: 0x3D4143,
        transparent: true,
        opacity: 0.6
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMap.enabled = true;
    renderer.vr.enabled = true;

    container = document.getElementById("container");
    container.appendChild(renderer.domElement);

    document.body.appendChild( WEBVR.createButton( renderer ) );
    controller = new THREE.GearVRController();

    window.addEventListener( 'resize', onWindowResize, false );

    initOimoPhysics();
}

function addStaticBox(size, position, rotation, spec) {
    let mesh;
    if (spec) mesh = new THREE.Mesh(buffgeoBox, matGroundTrans);
    else mesh = new THREE.Mesh(buffgeoBox, matGround);
    mesh.scale.set(size[0], size[1], size[2]);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0] * ToRad, rotation[1] * ToRad, rotation[2] * ToRad);
    if (!grounds.length) content.add(mesh);
    else scene.add(mesh);
    grounds.push(mesh);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
}

function initOimoPhysics() {
    let max = 200;

    // Is all the physics setting for rigidbody
    const config = [
        1, // 密度
        0.4, // 摩擦係数
        0.6, // 反発係数
    ];

    //add ground
    let ground = world.add({
        size: [400, 40, 400],
        pos: [0, -20, 0],
        config: config
    });
    addStaticBox([400, 40, 400], [0, -20, 0], [0, 0, 0]);

    let boxDataSet = [
        { size:[100, 100,  10], pos:[  0, 50,-50], rot:[0,0,0] },
        { size:[100, 100,  10], pos:[  0, 50, 50], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[-50, 50,  0], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[ 50, 50,  0], rot:[0,0,0] } 
    ];

    let surfaces = [];
    for (let i = 0; i < boxDataSet.length; i++) {
        let size = boxDataSet[i].size
        let pos = boxDataSet[i].pos;
        let rot = boxDataSet[i].rot;
        surfaces[i] = world.add({
            size: size,
            pos: pos,
            rot: rot,
            config: config
        });
        addStaticBox(size, pos, rot, true);
    }

    // now add object
    let i = max;

    while (i--) {
        let x = -50 + Math.random() * 100;
        let y = 200 + Math.random() * 100;
        let z = -50 + Math.random() * 100;
        let w = 20 + Math.random() * 10;
        let h = 10 + Math.random() * 10;
        let d = 10 + Math.random() * 10;

        let pos = Math.floor(Math.random() * dataSet.length);
        let scale = dataSet[pos].scale;
        w *= scale;
        bodys[i] = world.add({
            type: 'sphere',
            size: [w * 0.5],
            pos: [x, y, z],
            move: true,
            noSleep: true,
            config: config
        });
        meshs[i] = new THREE.Mesh(buffgeoSphere, matSpheres[pos]);
        meshs[i].scale.set(w * 0.5, w * 0.5, w * 0.5);

        meshs[i].castShadow = true;
        meshs[i].receiveShadow = true;

        scene.add(meshs[i]);
    }
}

function updateOimoPhysics() {

    world.step();
    let i = bodys.length;

    while (i--) {
        let body = bodys[i];
        let mesh = meshs[i];

        mesh.position.x = body.position.x;
        mesh.position.y = body.position.y;
        mesh.position.z = body.position.z;
        mesh.quaternion.x = body.quaternion.x;
        mesh.quaternion.y = body.quaternion.y;
        mesh.quaternion.z = body.quaternion.z;
        mesh.quaternion.w = body.quaternion.w;
        
        // reset position
        if (mesh.position.y < -100) {
            let x = -50 + Math.random() * 100;
            let y = 200 + Math.random() * 100;
            let z = -50 + Math.random() * 100;
            body.resetPosition(x, y, z);
        }
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    renderer.setAnimationLoop( render );
}

function render() {
    controller.update();
    updateOimoPhysics();
    renderer.render(scene, camera);
}

init();
animate();
