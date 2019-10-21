// forked from cx20's "圧縮された ammo.js を使用してみるテスト" http://jsdo.it/cx20/qsjm
// forked from cx20's "Three.js + ammo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/nnK9
// forked from edo_m18's "ammo.jsを試してみる" http://jsdo.it/edo_m18/4Hqh

// - Global variables -

// Graphics variables
var container, stats;
var camera, controls, scene, renderer;
var textureLoader;
var clock = new THREE.Clock();
var clickRequest = false;
var mouseCoords = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var ballMaterial = new THREE.MeshPhongMaterial({
    color: 0x202020
});
var pos = new THREE.Vector3();
var quat = new THREE.Quaternion();

// Physics variables
var gravityConstant = -9.8;
var collisionConfiguration;
var dispatcher;
var broadphase;
var solver;
var physicsWorld;
var rigidBodies = [];
var softBodies = [];
var margin = 0.05;
var hinge;
var transformAux1; //  = new Ammo.btTransform();
var softBodyHelpers; //  = new Ammo.btSoftBodyHelpers();

var armMovement = 0;

// - Main code -

window.addEventListener("load", function () {
    extract.init(['../../assets/y/S/t/j/yStj3.z'], init, [0,0,1]); // ammo.z
}, false);


// - Functions -

function init() {

    initGraphics();

    initPhysics();

    createObjects();

    initInput();

    document.getElementById("logo").style.display="none";

    animate();
}

function initGraphics() {

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000);

    scene = new THREE.Scene();

    camera.position.x = -7;
    camera.position.y = 5;
    camera.position.z = 8;

    controls = new THREE.OrbitControls(camera);
    controls.target.y = 2;

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xbfd1e5);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    textureLoader = new THREE.TextureLoader();

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-10, 10, 5);
    light.castShadow = true;
    var d = 20;
    light.shadowCameraLeft = -d;
    light.shadowCameraRight = d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;

    light.shadowCameraNear = 2;
    light.shadowCameraFar = 50;

    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;

    light.shadowDarkness = 0.65;
    scene.add(light);


    container.innerHTML = "";

    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function initPhysics() {

	transformAux1 = new Ammo.btTransform();
	softBodyHelpers = new Ammo.btSoftBodyHelpers();

    // Physics configuration

    collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    broadphase = new Ammo.btDbvtBroadphase();
    solver = new Ammo.btSequentialImpulseConstraintSolver();
    softBodySolver = new Ammo.btDefaultSoftBodySolver();
    physicsWorld = new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
    physicsWorld.setGravity(new Ammo.btVector3(0, gravityConstant, 0));
    physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, gravityConstant, 0));

}

function createObjects() {

    // Ground
    pos.set(0, -0.5, 0);
    quat.set(0, 0, 0, 1);
    var ground = createParalellepiped(40, 1, 40, 0, pos, quat, new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
    }));
    ground.castShadow = true;
    ground.receiveShadow = true;
    textureLoader.load("../../assets/k/W/j/6/kWj6X.png", function(texture) { // grid.png
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(40, 40);
        ground.material.map = texture;
        ground.material.needsUpdate = true;
    });


    // Create soft volumes
    var volumeMass = 15;

    var sphereGeometry = new THREE.SphereBufferGeometry(1.5, 40, 25);
    var geom1 = processGeometry(sphereGeometry);
    geom1.translate(5, 5, 0);
    createSoftVolume(geom1, volumeMass, 250);

    var boxGeometry = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1, 1, 5, 4, 4, 20));
    var geom2 = processGeometry(boxGeometry);
    geom2.translate(-2, 5, 0);
    createSoftVolume(geom2, volumeMass, 120);


    // Ramp
    pos.set(3, 1, 0);
    quat.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 30 * Math.PI / 180);
    var obstacle = createParalellepiped(10, 1, 4, 0, pos, quat, new THREE.MeshPhongMaterial({
        color: 0x606060
    }));
    obstacle.castShadow = true;
    obstacle.receiveShadow = true;

}

function processGeometry(bufGeometry) {

    // Obtain a Geometry
    var geometry = new THREE.Geometry().fromBufferGeometry(bufGeometry);

    // Merge the vertices so the triangle soup is converted to indexed triangles
    var vertsDiff = geometry.mergeVertices();

    // Convert again to BufferGeometry, indexed
    return createIndexedBufferGeometryFromGeometry(geometry);
}

function createIndexedBufferGeometryFromGeometry(geometry) {

    var numVertices = geometry.vertices.length;
    var numFaces = geometry.faces.length;

    var bufferGeom = new THREE.BufferGeometry();
    var vertices = new Float32Array(numVertices * 3);
    var normals = new Float32Array(numVertices * 3);
    var uvs = new Float32Array(numVertices * 2);
    var indices = new(numFaces * 3 > 65535 ? Uint32Array : Uint16Array)(numFaces * 3);

    for (var i = 0; i < numVertices; i++) {

        var p = geometry.vertices[i];

        var i3 = i * 3;

        vertices[i3] = p.x;
        vertices[i3 + 1] = p.y;
        vertices[i3 + 2] = p.z;

    }

    for (var i = 0; i < numFaces; i++) {

        var f = geometry.faces[i];

        var i3 = i * 3;

        indices[i3] = f.a;
        indices[i3 + 1] = f.b;
        indices[i3 + 2] = f.c;

        // Just overwrite normals and uvs

        normals[f.a] = f.normal.x;
        normals[f.a + 1] = f.normal.y;
        normals[f.a + 2] = f.normal.z;

        normals[f.b] += f.normal.x;
        normals[f.b + 1] = f.normal.y;
        normals[f.b + 2] = f.normal.z;

        normals[f.c] += f.normal.x;
        normals[f.c + 1] = f.normal.y;
        normals[f.c + 2] = f.normal.z;

        uvs[f.a] = geometry.faceVertexUvs[0][i][0].x;
        uvs[f.a + 1] = geometry.faceVertexUvs[0][i][0].y;

        uvs[f.b] = geometry.faceVertexUvs[0][i][1].x;
        uvs[f.b + 1] = geometry.faceVertexUvs[0][i][1].y;

        uvs[f.c] = geometry.faceVertexUvs[0][i][2].x;
        uvs[f.c + 1] = geometry.faceVertexUvs[0][i][2].y;

    }

    bufferGeom.setIndex(new THREE.BufferAttribute(indices, 1));
    bufferGeom.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    bufferGeom.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    bufferGeom.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    return bufferGeom;
}

function createSoftVolume(indexedBufferGeom, mass, pressure) {

    var volume = new THREE.Mesh(indexedBufferGeom, new THREE.MeshPhongMaterial({
        color: 0x00E000
    }));
    volume.castShadow = true;
    volume.receiveShadow = true;
    volume.frustumCulled = false;
    scene.add(volume);

    // Volume physic object
    var volumeSoftBody = softBodyHelpers.CreateFromTriMesh(
        physicsWorld.getWorldInfo(),
        indexedBufferGeom.attributes.position.array,
        indexedBufferGeom.index.array,
        indexedBufferGeom.index.array.length / 3,
        true);

    var sbConfig = volumeSoftBody.get_m_cfg();
    sbConfig.set_viterations(40);
    sbConfig.set_piterations(40);

    // Soft-soft and soft-rigid collisions
    sbConfig.set_collisions(0x11);

    // Friction
    sbConfig.set_kDF(0.1);
    // Damping
    sbConfig.set_kDP(0.01);
    // Pressure
    sbConfig.set_kPR(pressure);
    // Stiffness
    volumeSoftBody.get_m_materials().at(0).set_m_kLST(0.9);
    volumeSoftBody.get_m_materials().at(0).set_m_kAST(0.9);

    volumeSoftBody.setTotalMass(mass, false)
    Ammo.castObject(volumeSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(margin);
    physicsWorld.addSoftBody(volumeSoftBody, 1, -1);
    volume.userData.physicsBody = volumeSoftBody;
    // Disable deactivation
    volumeSoftBody.setActivationState(4);

    softBodies.push(volume);

}

function createParalellepiped(sx, sy, sz, mass, pos, quat, material) {

    var threeObject = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
    var shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
    shape.setMargin(margin);

    createRigidBody(threeObject, shape, mass, pos, quat);

    return threeObject;

}

function createRigidBody(threeObject, physicsShape, mass, pos, quat) {

    threeObject.position.copy(pos);
    threeObject.quaternion.copy(quat);

    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    var motionState = new Ammo.btDefaultMotionState(transform);

    var localInertia = new Ammo.btVector3(0, 0, 0);
    physicsShape.calculateLocalInertia(mass, localInertia);

    var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);
    var body = new Ammo.btRigidBody(rbInfo);

    threeObject.userData.physicsBody = body;

    scene.add(threeObject);

    if (mass > 0) {
        rigidBodies.push(threeObject);

        // Disable deactivation
        body.setActivationState(4);
    }

    physicsWorld.addRigidBody(body);

    return body;
}

function initInput() {

    window.addEventListener('mousedown', function(event) {

        if (!clickRequest) {

            mouseCoords.set(
                (event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1
            );

            clickRequest = true;

        }

    }, false);

}

function processClick() {

    if (clickRequest) {

        raycaster.setFromCamera(mouseCoords, camera);

        // Creates a ball
        var ballMass = 3;
        var ballRadius = 0.4;

        var ball = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 18, 16), ballMaterial);
        ball.castShadow = true;
        ball.receiveShadow = true;
        var ballShape = new Ammo.btSphereShape(ballRadius);
        ballShape.setMargin(margin);
        pos.copy(raycaster.ray.direction);
        pos.add(raycaster.ray.origin);
        quat.set(0, 0, 0, 1);
        var ballBody = createRigidBody(ball, ballShape, ballMass, pos, quat);
        ballBody.setFriction(0.5);

        pos.copy(raycaster.ray.direction);
        pos.multiplyScalar(14);
        ballBody.setLinearVelocity(new Ammo.btVector3(pos.x, pos.y, pos.z));

        clickRequest = false;

    }

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    var deltaTime = clock.getDelta();

    updatePhysics(deltaTime);

    processClick();

    controls.update(deltaTime);

    renderer.render(scene, camera);

}

function updatePhysics(deltaTime) {

    // Step world
    physicsWorld.stepSimulation(deltaTime, 10);

    // Update soft volumes
    for (var i = 0, il = softBodies.length; i < il; i++) {
        var volume = softBodies[i];
        var softBody = volume.userData.physicsBody;
        var volumePositions = volume.geometry.attributes.position.array;
        var numVerts = volumePositions.length / 3;
        var nodes = softBody.get_m_nodes();
        var indexFloat = 0;
        for (var j = 0; j < numVerts; j++) {

            var node = nodes.at(j);
            var nodePos = node.get_m_x();
            volumePositions[indexFloat++] = nodePos.x();
            volumePositions[indexFloat++] = nodePos.y();
            volumePositions[indexFloat++] = nodePos.z();

        }

        volume.geometry.computeVertexNormals();
        volume.geometry.attributes.position.needsUpdate = true;
        volume.geometry.attributes.normal.needsUpdate = true;

    }

    // Update rigid bodies
    for (var i = 0, il = rigidBodies.length; i < il; i++) {
        var objThree = rigidBodies[i];
        var objPhys = objThree.userData.physicsBody;
        var ms = objPhys.getMotionState();
        if (ms) {

            ms.getWorldTransform(transformAux1);
            var p = transformAux1.getOrigin();
            var q = transformAux1.getRotation();
            objThree.position.set(p.x(), p.y(), p.z());
            objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

        }
    }

}