// forked from cx20's "Three.js + ammo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/nnK9
// forked from edo_m18's "ammo.jsを試してみる" http://jsdo.it/edo_m18/4Hqh

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":0xDCAA6B,    // 段ボール色
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
    return colorHash[ c ];
}

Ammo().then(function(Ammo) {
function Ball(x, y, z, r, m, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.color = color;
    this.bulletObj = null;
    this.threeObj = null;
    this._trans = new Ammo.btTransform();
    this.initThreeObj();
    this.initBulletObj(m);
}

Ball.prototype.destructor = function () {
    Ammo.destroy(this.bulletObj);
    Ammo.destroy(this._trans);
};

Ball.prototype.initThreeObj = function () {
    var texture = THREE.ImageUtils.loadTexture('Football.png');  // Football.png
    var geometry = new THREE.SphereGeometry(this.r, 10, 10);
    var material = new THREE.MeshLambertMaterial({
        color: Math.round(this.color),
        map: texture
    });
    var ball = new THREE.Mesh(geometry, material);
    ball.position.x = this.x;
    ball.position.y = this.y;
    ball.position.z = this.z;

    this.threeObj = ball;
};

Ball.prototype.initBulletObj = function (m) {
    var startTransform = new Ammo.btTransform();
    startTransform.setIdentity();
    var origin = startTransform.getOrigin();
    origin.setX(this.x);
    origin.setY(this.y);
    origin.setZ(this.z);

    var shape = new Ammo.btSphereShape(this.r);
    var localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(m, localInertia);

    var motionState = new Ammo.btDefaultMotionState(startTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(m, motionState, shape, localInertia);
    //rbInfo.set_m_restitution(1);
    rbInfo.set_m_restitution(0.6); // 反発係数（0～1）
    var body = new Ammo.btRigidBody(rbInfo);

    Ammo.destroy(startTransform);
    Ammo.destroy(localInertia);
    Ammo.destroy(rbInfo);

    this.bulletObj = body;
};

Ball.prototype.move = function () {
/*
    this.bulletObj.getMotionState().getWorldTransform(this._trans);
    var origin = this._trans.getOrigin();
    this.x = this.threeObj.position.x = origin.x();
    this.y = this.threeObj.position.y = origin.y();
    this.z = this.threeObj.position.z = origin.z();
    var quaternion = this._trans.getRotation();
    var x = quaternion.x();
    var y = quaternion.y();
    var z = quaternion.z();
    var w = quaternion.w();
    // クォータニオン（ammo.js） → オイラー角（three.js）変換
    this.threeObj.rotation.x = Math.atan2(2 * (x * y + w * z), w * w + x * x - y * y - z * z); // roll
    this.threeObj.rotation.y = Math.atan2(2 * (y * z + w * x), w * w - x * x - y * y + z * z); // pitch
    this.threeObj.rotation.z = Math.asin(-2 * (x * z - w * y)); // yaw
*/
    var quat = new THREE.Quaternion;
    var pos = [0, 0, 0];

    this.bulletObj.getMotionState().getWorldTransform(this._trans);
    var origin = this._trans.getOrigin();
    pos[0] = origin.x();
    pos[1] = origin.y();
    pos[2] = origin.z();
    var rotation = this._trans.getRotation();
    quat.x = rotation.x();
    quat.y = rotation.y();
    quat.z = rotation.z();
    quat.w = rotation.w();
    
    this.threeObj.position.x = pos[0];
    this.threeObj.position.y = pos[1];
    this.threeObj.position.z = pos[2];
    // クォータニオン（ammo.js） → クォータニオン（three.js）
    this.threeObj.quaternion.copy(quat);
};

function Box(x, y, z, s, m, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = s; // size (length of one side of cube)
    this.color = color;
    this.bulletObj = null;
    this.threeObj = null;
    this._trans = new Ammo.btTransform();
    this.initThreeObj();
    this.initBulletObj(m);
}

Box.prototype.destructor = function () {
    // TODO:
};

Box.prototype.initThreeObj = function () {
    var s = this.s;
    var geometry = new THREE.CubeGeometry(s, s, s);
    var material = new THREE.MeshLambertMaterial({
        color: Math.round(this.color)
    });
    var box = new THREE.Mesh(geometry, material);
    box.position.x = this.x;
    box.position.y = this.y;
    box.position.z = this.z;

    this.threeObj = box;
};

Box.prototype.initBulletObj = function (m) {
    var startTransform = new Ammo.btTransform();
    startTransform.setIdentity();
    var origin = startTransform.getOrigin();
    origin.setX(this.x);
    origin.setY(this.y);
    origin.setZ(this.z);

    var s = this.s;
    var tmpVec = new Ammo.btVector3(s / 2, s / 2, s / 2);
    var shape = new Ammo.btBoxShape(tmpVec);
    var localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(m, localInertia);

    var motionState = new Ammo.btDefaultMotionState(startTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(m, motionState, shape, localInertia);
    //rbInfo.set_m_restitution(1);
    rbInfo.set_m_restitution(0.6); // 反発係数（0～1）
    var body = new Ammo.btRigidBody(rbInfo);

    Ammo.destroy(startTransform);
    Ammo.destroy(localInertia);
    Ammo.destroy(rbInfo);

    this.bulletObj = body;
};

Box.prototype.move = function () {
/*
    this.bulletObj.getMotionState().getWorldTransform(this._trans);
    var origin = this._trans.getOrigin();
    this.x = this.threeObj.position.x = origin.x();
    this.y = this.threeObj.position.y = origin.y();
    this.z = this.threeObj.position.z = origin.z();
    var quaternion = this._trans.getRotation();
    var x = quaternion.x();
    var y = quaternion.y();
    var z = quaternion.z();
    var w = quaternion.w();
    // クォータニオン（ammo.js） → オイラー角（three.js）変換
    this.threeObj.rotation.x = Math.atan2(2 * (x * y + w * z), w * w + x * x - y * y - z * z); // roll
    this.threeObj.rotation.y = Math.atan2(2 * (y * z + w * x), w * w - x * x - y * y + z * z); // pitch
    this.threeObj.rotation.z = Math.asin(-2 * (x * z - w * y)); // yaw
*/
    var quat = new THREE.Quaternion;
    var pos = [0, 0, 0];

    this.bulletObj.getMotionState().getWorldTransform(this._trans);
    var origin = this._trans.getOrigin();
    pos[0] = origin.x();
    pos[1] = origin.y();
    pos[2] = origin.z();
    var rotation = this._trans.getRotation();
    quat.x = rotation.x();
    quat.y = rotation.y();
    quat.z = rotation.z();
    quat.w = rotation.w();
    
    this.threeObj.position.x = pos[0];
    this.threeObj.position.y = pos[1];
    this.threeObj.position.z = pos[2];
    // クォータニオン（ammo.js） → クォータニオン（three.js）
    this.threeObj.quaternion.copy(quat);
};

function Plane(x, y, z, s, m, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = s; // size (length of one side of cube)
    this.color = color;
    this.bulletObj = null;
    this.threeObj = null;
    this.initThreeObj();
    this.initBulletObj(m);
}

Plane.prototype.destructor = function () {
    // TODO:
};

Plane.prototype.initThreeObj = function () {
    var s = this.s;
    var texture = THREE.ImageUtils.loadTexture("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
    texture.wrapS   = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 20, 20 );  
    var geometry = new THREE.CubeGeometry(s, 1, s);
    var material = new THREE.MeshLambertMaterial({
        color: this.color,
        map: texture
    });
    ground = new THREE.Mesh(geometry, material);
    ground.position.x = this.x;
    ground.position.y = this.y;
    ground.position.z = this.z;

    this.threeObj = ground;
};

Plane.prototype.initBulletObj = function (m) {
    var s = this.s;
    var tmpVec = new Ammo.btVector3(s / 2, 1 / 2, s / 2);
    var shape = new Ammo.btBoxShape(tmpVec);
    Ammo.destroy(tmpVec);
    var startTransform = new Ammo.btTransform();
    startTransform.setIdentity();
    tmpVec = new Ammo.btVector3(this.x, this.y + 1, this.z);
    startTransform.setOrigin(tmpVec);
    Ammo.destroy(tmpVec);

    var localInertia = new Ammo.btVector3(0, 0, 0);
    var motionState = new Ammo.btDefaultMotionState(startTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(m, motionState, shape, localInertia);
    rbInfo.set_m_restitution(1);
    var body = new Ammo.btRigidBody(rbInfo);

    Ammo.destroy(startTransform);
    Ammo.destroy(localInertia);
    Ammo.destroy(rbInfo);

    this.bulletObj = body;
};

Plane.prototype.move = function () {
    // TODO:
};

function initPhysicsWorld() {
    var gravity = new Ammo.btVector3(0, -200, 0);

    var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    var dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    var overlappingPairCache = new Ammo.btDbvtBroadphase();
    var solver = new Ammo.btSequentialImpulseConstraintSolver();
    var dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(
        dispatcher, overlappingPairCache, solver, collisionConfiguration);
    dynamicsWorld.setGravity(gravity);

    return dynamicsWorld;
}

window.addEventListener("load", function () {
    var width = 465;
    var height = 465;
    var deltaT = 30;

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.x = -20;
    camera.position.y = 50;
    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 20, 0));

    var scene = new THREE.Scene();

    var directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.z = 3;
    scene.add(directionalLight);

    var dynamicsWorld = initPhysicsWorld();
    var ground = new Plane(0, 0, 0, 500, 0, 0xdddddd);
    scene.add(ground.threeObj);
    dynamicsWorld.addRigidBody(ground.bulletObj);

    var numboxs = 0;
    var boxs = [];
    var box_size = 4;
    for (var i = 0; i < dataSet.length; i++) {
        var x = -35 + (i % 16) * box_size * 1.2;
        var y = 5 + (15 - Math.floor(i / 16)) * box_size * 1.2;
        var z = Math.random();
        var color = getRgbColor( dataSet[i] );
        var box = new Box(x, y, z, box_size, 10, color);
        scene.add(box.threeObj);
        dynamicsWorld.addRigidBody(box.bulletObj);
        boxs.push(box);
        numboxs++;
    }

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    var n = 0;

    function rendering() {
        dynamicsWorld.stepSimulation(deltaT / 1000);

        for (var i = numboxs; i--;) {
            var box = boxs[i];
            box.move();
        }

        renderer.render(scene, camera);
        setTimeout(rendering, deltaT);
    }

    rendering();

}, false);
});