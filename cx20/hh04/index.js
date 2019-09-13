// forked from cx20's "Three.js + Oimo.js でゴゴゴを振り回してみるテスト" http://jsdo.it/cx20/aOcA
// forked from cx20's "forked: Oimo.js lesson 2 - JOINTS from github" http://jsdo.it/cx20/71b3
// forked from cx20's "Oimo.js lesson 2 - JOINTS from github" http://jsdo.it/cx20/rZL6
// forked from cx20's "Oimo.js lesson 1 - RIGIDBODYS from github" http://jsdo.it/cx20/spMg
// forked from cx20's "Oimo.js lesson 0 - OIMO WORLD from github" http://jsdo.it/cx20/1G1I
// forked from lo-th's "Interactive documentation" http://lo-th.github.io/Oimo.js/docs/index.html


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
        if (type == 'gogogo' ) {
            // ゴゴゴ
            var types = [ 'box', 'box', 'box', 'box', 'box' ];
            var sizes = [ 30,5,5,  5,30,5, 30,5,5, 5,10,5, 5,10,5 ];
            var positions = [ 0,-15,0, 15,0,0, 0,15,0, 21,15,0, 27,15,0 ];
            var geometryCompound = new THREE.Geometry();
            var geoBox = new THREE.BoxGeometry( 1, 1, 1 );
            var matBox = new THREE.MeshLambertMaterial( { color:"#ff0000", wireframe:true, name:'box' } );
            var g = new THREE.Geometry();
            var n;
            for(var i=0; i<types.length; i++){
                n = i * 3;
                var mesh = new THREE.Mesh(geoBox, matBox);
                mesh.position.x = positions[n+0] - 5;
                mesh.position.y = positions[n+1] + 30;
                mesh.position.z = positions[n+2];
                mesh.scale.x = sizes[n+0];
                mesh.scale.y = sizes[n+1];
                mesh.scale.z = sizes[n+2];
                THREE.GeometryUtils.merge(geometryCompound, mesh); 
            }
            var materialCompound = new THREE.MeshLambertMaterial({
                color: "#fff"
            });
            var meshCompound = new THREE.Mesh(geometryCompound, materialCompound);
            if (target) target.add(meshCompound);
            else this.scene.add(meshCompound);
            
            var axis = new THREE.AxisHelper( 100 );
            //meshCompound.add( axis );
            return meshCompound;
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
var v3d = new V3D.View();
v3d.initLight();

// 剛体（rigidbody）の参照を保持する配列
var bodys = [];
// 接合部（joint）の参照を保持する配列
var joints = [];
// 表示用の mesh の参照を保持する配列
var meshs = [];
// 表示用の接合部（joint）の参照を保持する配列
var lines = [];

// 最初に固定 body を作成する
var obj = { size:[40, 100, 40], pos:[0,200,0], world:world, name:'base', move:true }
bodys[0] = new OIMO.Body(obj);
meshs[0] = v3d.add(obj);

for ( var i = 0; i < 20; i++ ) {
    obj = { size:[100, 100, 10], pos:[60,200,Math.random() * 100], world:world, name:'moving' + i, move:true }
    bodys[i + 1] = new OIMO.Body(obj);
    obj.type = "gogogo";
    meshs[i + 1] = v3d.add(obj);
    obj = {
        world: world,
        type: 'jointDistance',
        body1: 'base',
        body2: 'moving' + i,
        collision: true,
        pos1: [0,-50,0],
        pos2: [0,50,0],
        axe1: [1,0,0],
        axe2: [1,0,0],
        min: 45,
        max: 200,
        limite: null,
        spring: [8, 0.2],
        motor: null,
        name: 'myName' + i
    };
    joints[i] = new OIMO.Link(obj);
    lines[i] = v3d.add(obj);
}

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
    for ( var i = 0; i < lines.length; i++ ) {
        meshs[i + 1].position.copy(bodys[i + 1].getPosition());
        meshs[i + 1].quaternion.copy(bodys[i + 1].getQuaternion());

        // 接合部の位置を取得し line に適用する
        var pos = joints[i].getPosition();
        lines[i].geometry.vertices[0].copy( pos[0] );
        lines[i].geometry.vertices[1].copy( pos[1] );
        lines[i].geometry.verticesNeedUpdate = true;
    }


    // oimo の状態表示
    document.getElementById("info").innerHTML = world.performance.show();
}