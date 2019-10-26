// forked from cx20's "vox.js を試してみるテスト（その１５）" http://jsdo.it/cx20/CQqz
// forked from cx20's "vox.js を試してみるテスト（その１４）" http://jsdo.it/cx20/wnEk
// forked from cx20's "vox.js を試してみるテスト（その１３）" http://jsdo.it/cx20/Iods
// forked from cx20's "vox.js を試してみるテスト（その１２）" http://jsdo.it/cx20/E8nZ
// forked from cx20's "vox.js を試してみるテスト（その１１）" http://jsdo.it/cx20/04WG
// forked from cx20's "vox.js を試してみるテスト（その１０）" http://jsdo.it/cx20/q67O
// forked from cx20's "vox.js を試してみるテスト（その９）" http://jsdo.it/cx20/4LYl
// forked from cx20's "vox.js を試してみるテスト（その８）" http://jsdo.it/cx20/iEi8
// forked from cx20's "vox.js を試してみるテスト（その７）" http://jsdo.it/cx20/K6wm
// forked from cx20's "vox.js を試してみるテスト（その６）" http://jsdo.it/cx20/oZg0
// forked from cx20's "vox.js を試してみるテスト（その５）" http://jsdo.it/cx20/af9L
// forked from cx20's "vox.js を試してみるテスト（その４）" http://jsdo.it/cx20/qL0R
// forked from cx20's "vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ymYt
// forked from cx20's "vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/adwz
// forked from cx20's "vox.js を試してみるテスト" http://jsdo.it/cx20/u80n
// forked from ohisama1's "vox.js test 0" http://jsdo.it/ohisama1/e9dm

var DOT_SIZE = 10;

var X_START_POS = -20;
var Y_START_POS = 5;
var Z_START_POS = -20;

//--------------------------------
// v3d.js (minimize by @cx20)
//--------------------------------
'use strict';
var THREE;
var V3D = {};
V3D.ToRad = Math.PI / 180;
V3D.ToDeg = 180 / Math.PI;

V3D.View = function(h, v, d) {
    var n = navigator.userAgent;

    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.id = 'container';

    this.init(h, v, d);
    this.initBasic();
}

V3D.View.prototype = {
    constructor: V3D.View,
    init: function(h, v, d) {
        this.clock = new THREE.Clock();

        this.renderer = new THREE.WebGLRenderer({
            precision: "mediump",
            antialias: false
        });
        this.renderer.setSize(this.w, this.h);
        this.renderer.setClearColor(0x1d1f20, 1);
        this.camera = new THREE.PerspectiveCamera(60, this.w / this.h, 0.1, 2000);
        this.scene = new THREE.Scene();

        this.container = document.getElementById(this.id)
        this.container.appendChild(this.renderer.domElement);

        h = h || 0;
        v = v || 60;
        d = d || 400;
        this.camera.position.set(h, v, d);

        this.miniMap = null;
        this.player = null;
    },
    initLight: function() {
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0x303030, 0.3);
        this.scene.add(hemiLight);
        var dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(0.5, 1, 0.5).normalize();
        this.scene.add(dirLight);
    },
    initBasic: function() {
        var geos = {};
        geos['box'] = new THREE.BufferGeometry();
        geos['box'].fromGeometry(new THREE.BoxGeometry(1, 1, 1));
        geos['plane'] = new THREE.PlaneBufferGeometry(1, 1);
        geos['plane'].applyMatrix(new THREE.Matrix4().makeRotationX(-90 * V3D.ToRad));

        var mats = {};
        mats['box'] = new THREE.MeshLambertMaterial({
            map: this.basicTexture(0),
            name: 'box'
        });
        mats['sbox'] = new THREE.MeshLambertMaterial({
            map: this.basicTexture(1),
            name: 'sbox'
        });
        mats['static'] = new THREE.MeshLambertMaterial({
            map: this.basicTexture(2),
            name: 'static'
        });
        mats['static2'] = new THREE.MeshLambertMaterial({
            map: this.basicTexture(2, 6),
            name: 'static2'
        });

        mats['joint'] = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });

        this.mats = mats;
        this.geos = geos;
    },
    render: function() {
        this.renderer.render(this.scene, this.camera);
    },
    add: function(obj, target) {
        var type = obj.type || 'box';
        var size = obj.size || [10, 10, 10];
        var pos = obj.pos || [0, 0, 0];
        var rot = obj.rot || [0, 0, 0];
        var move = obj.move || false;
        if (obj.flat) {
            type = 'plane';
            pos[1] += size[1] * 0.5;
        }
        if (type == 'adobe' ) {
            // now add object
            var w = DOT_SIZE * 0.8;
            var h = DOT_SIZE * 0.8;
            var d = DOT_SIZE * 0.8;

            var color;
            var group = new THREE.Object3D();
            var meshArray = [];
            var parser = new vox.Parser();
            // adobe.vox
            parser.parse("../../assets/y/l/j/y/yljy3.vox").then(function(voxelData) {
                var max = voxelData.voxels.length;
                for ( var i = max - 1; i >= 0; i-- ) {
                    var voxel = voxelData.voxels[i];
                    
                    var x = voxel.x * DOT_SIZE + X_START_POS;
                    var y = voxel.z * DOT_SIZE + Y_START_POS;
                    var z = voxel.y * DOT_SIZE + Z_START_POS;
                    
                    var c = voxelData.palette[voxel.colorIndex];
                    color = new THREE.Color(c.r / 255, c.g / 255, c.b / 255);
                    var material = new THREE.MeshLambertMaterial({color: color});
                    
                    var geometry = new THREE.BoxGeometry(1, 1, 1);

                    meshArray[i] = new THREE.Mesh( geometry, material );
                    meshArray[i].position.x = x;
                    meshArray[i].position.y = y;
                    meshArray[i].position.z = z;
                    meshArray[i].scale.set( w, h, d );
                    group.add( meshArray[i] );
                }
            });
            if (target) target.add(group);
            else this.scene.add(group);
            return group;
        }
        else if (type.substring(0, 5) === 'joint') { //_____________ Joint
            var joint;
            var pos1 = obj.pos1 || [0, 0, 0];
            var pos2 = obj.pos2 || [0, 0, 0];
            var geo = new THREE.Geometry();
            geo.vertices.push(new THREE.Vector3(pos1[0], pos1[1], pos1[2]));
            geo.vertices.push(new THREE.Vector3(pos2[0], pos2[1], pos2[2]));
            joint = new THREE.Line(geo, this.mats.joint, THREE.LinePieces);
            if (target) target.add(mesh);
            else this.scene.add(joint);
            return joint;
        } else { //_____________ Object
            var mesh;
            if (type == 'box' && move) mesh = new THREE.Mesh(this.geos.box, this.mats.box);
            if (type == 'box' && !move) mesh = new THREE.Mesh(this.geos.box, this.mats.static);
            if (type == 'plane' && !move) mesh = new THREE.Mesh(this.geos.plane, this.mats.static2);
            mesh.scale.set(size[0], size[1], size[2]);
            mesh.position.set(pos[0], pos[1], pos[2]);
            mesh.rotation.set(rot[0] * V3D.ToRad, rot[1] * V3D.ToRad, rot[2] * V3D.ToRad);
            if (target) target.add(mesh);
            else this.scene.add(mesh);
            return mesh;
        }

    },
    
    gradTexture: function(color) {
        var c = document.createElement("canvas");
        var ct = c.getContext("2d");
        c.width = 16;
        c.height = 128;
        var gradient = ct.createLinearGradient(0, 0, 0, 128);
        var i = color[0].length;
        while (i--) {
            gradient.addColorStop(color[0][i], color[1][i]);
        }
        ct.fillStyle = gradient;
        ct.fillRect(0, 0, 16, 128);
        var tx = new THREE.Texture(c);
        tx.needsUpdate = true;
        return tx;
    },
    basicTexture: function(n, r) {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 64;
        var ctx = canvas.getContext('2d');
        var color;
        if (n === 0) color = "#FFAA58"; // box
        if (n === 1) color = "#AA8038"; // box sleep
        if (n === 2) color = "#1d1f20"; // static
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = "rgba(0,0,0,0.1);"; //colors[1];
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
        var tx = new THREE.Texture(canvas);
        tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
        tx.repeat = new THREE.Vector2(r || 1, r || 1);
        tx.needsUpdate = true;
        return tx;
    }

}

//--------------------------------
//   2 - JOINTS _ Link
//--------------------------------

// すべての剛体（rigidBody)と接合部（joint）を含む Oimo Wolrd を作成
var world = new OIMO.World();

// geometry と material を含む three.js ビュー（v3d.js）
//var v3d = new V3D.View();


// 剛体（rigidbody）の参照を保持する配列
var bodys = [];
// 接合部（joint）の参照を保持する配列
var joints = [];
// 表示用の mesh の参照を保持する配列
var meshs = [];
// 表示用の接合部（joint）の参照を保持する配列
var lines = [];

var v3d = new V3D.View();
v3d.initLight();

// 最初に固定 body を作成する
var obj = { size:[40, 100, 40], pos:[0,200,0], world:world, name:'base', move:true }
bodys[0] = new OIMO.Body(obj);
meshs[0] = v3d.add(obj);

// 次に動的 body を作成する
obj = { size:[100, 100, 100], pos:[60,200,200], world:world, name:'moving', move:true }
bodys[1] = new OIMO.Body(obj);
obj.type = "adobe";
meshs[1] = v3d.add(obj);

// OIMO.Link は接合部のメインクラス

// 妥当性を定義する為に object を使用する
obj = {};

// world で object は [!] 重要
obj.world = world;
// 接合部の種類
// jointHinge : 軸に沿った相対的な回転のみを許可する（allows only for relative rotation of rigid bodies along the axis.）
// jointDistance : 剛体上の２つのアンカーポイント間の距離を制限する（limits the distance between two anchor points on rigidBody.）
// jointPrisme : 軸に沿った相対的な移動のみを許可する（allows only for relative translation of rigid bodies along the axis.）
// jointSlide : 軸に沿って２つの剛体の間で相対的な移動と回転を許可する（allows for relative translation and relative rotation between two rigid bodies along the axis.）
// jointBall : 剛体上の２つのアンカーポイント間の移動を制限する（limits relative translation on two anchor points on rigidBody.）
// jointWheel : ２つの軸に沿った剛体間の回転ならびにサスペンションの移動（rotation between two rigid bodies along two axes and translation for the suspension.）
// （注意：rev バージョンでは jointBall, jointDistance, jointHinge, jointHinge2）
obj.type = 'jointDistance';
// 最初の剛体は名前もしくは body 参照することができる（the first rigidbody can be name or body reference）
obj.body1 = 'base';
// 次の剛体は名前もしくは body 参照することができる（the second rigidbody can be name or body reference）
obj.body2 = 'moving';
// body1 と body2 で衝突を保つならば（if body1 and body2 keep collision between them）
obj.collision = true;
// 最初の body1 の点は固定または動的にすることができます（the position of the first point relative to body1 can be static or dynamic）
obj.pos1 = [0,-50,0];
// 次の body2 の点は固定または動的にすることができます（the position of the second point relative to body2 can be static or dynamic）
obj.pos2 = [0,50,0];
// 最初の XYZ 軸制限。1:active / 0:inactive（the first axis limite XYZ 1:active 0:inactive）
obj.axe1 = [1,0,0];
// 次の XYZ 軸制限。1:active / 0:inactive（the second axis limite XYZ 1:active 0:inactive）
obj.axe2 = [1,0,0];
// jointDistance の為の最小/最大距離ならびに jointHinge の為の角度（min max distance for jointDistance or angles in degree for jointHinge）
obj.min = 45;
obj.max = 200;

// 拡張設定
// Limit（jointWheel and Spring 用）
// 配列による定義 [lowerLimit,upperLimit]
obj.limite = null;
// Spring（JointDistance, JointHinge, jointWheel 用）
// 配列による定義 [frequency,dampingRatio]
obj.spring = [8, 0.2];
// motor（JointDistance, JointHinge, jointWheel 用）
// 配列による定義 [motorSpeed,maxMotorForce]
obj.motor = null;


// 接合部（joint）毎に一意な名前を指定することが出来る
obj.name = 'myName';

// joint を追加する 
joints[0] = new OIMO.Link(obj);
// line を追加する
lines[0] = v3d.add(obj);

// ループを開始する
setInterval(oimoLoop, 1000/60);
renderLoop();

/* three.js 描画ループ */
function renderLoop()
{
    requestAnimationFrame( renderLoop );
    v3d.render();
}
var s = 0;
/* oimo 物理演算ループ */
function oimoLoop() 
{  
    world.step();// world を更新する
    if(meshs[0].position.x<40 && s==0) {meshs[0].position.x++; }
    else s=1;
    if(meshs[0].position.x>-40 && s==1) {meshs[0].position.x--; }
    else s=0;
    
    bodys[0].setPosition(meshs[0].position);
    bodys[0].setQuaternion(meshs[0].quaternion);

    // 剛体（rigidbody）の位置と角度を取得し mesh に適用する
    meshs[1].position.copy(bodys[1].getPosition());
    meshs[1].quaternion.copy(bodys[1].getQuaternion());

    // 接合部の位置を取得し line に適用する
    var pos = joints[0].getPosition();
    lines[0].geometry.vertices[0].copy( pos[0] );
    lines[0].geometry.vertices[1].copy( pos[1] );
    lines[0].geometry.verticesNeedUpdate = true;
}