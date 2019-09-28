// forked from cx20's "Three.js + Oimo.js で円柱形のお菓子を落下させてみるテスト（その２）" http://jsdo.it/cx20/2dmR
// forked from cx20's "Three.js + Oimo.js で円柱形のお菓子を落下させてみるテスト" http://jsdo.it/cx20/lVDG
// forked from cx20's "Three.js + Oimo.js でコインを落下させてみるテスト（その４）" http://jsdo.it/cx20/oobX
// forked from cx20's "Three.js + Oimo.js でコインを落下させてみるテスト（その３）" http://jsdo.it/cx20/3Pd3
// forked from cx20's "Three.js + Oimo.js でコインを落下させてみるテスト（その２）" http://jsdo.it/cx20/ekNN
// forked from cx20's "Three.js + Oimo.js でコインを落下させてみるテスト" http://jsdo.it/cx20/fRUm
// forked from cx20's "Three.js + Oimo.js でポッキーを落下させてみるテスト（その３）" http://jsdo.it/cx20/gLabY
// forked from cx20's "Three.js + Oimo.js でポッキーを落下させてみるテスト（その２）" http://jsdo.it/cx20/1zNO
// forked from cx20's "Three.js + Oimo.js でポッキーを落下させてみるテスト" http://jsdo.it/cx20/nS6J
// forked from cx20's "Three.js + Oimo.js で坂道にボールを転がしてみるテスト" http://jsdo.it/cx20/8ECT
// forked from Lo-Th's "Oimo.js Moving" http://lo-th.github.io/Oimo.js/test_moving.html

// three var
var camera, scene, light, renderer, container, content;
var meshs = [];
var grounds = [];
var paddel;
var matGround, matGroundTrans;
var buffgeoBox;
var buffgeoCylinder;
var raycaster, projector;
var ToRad = Math.PI / 180;
var ToDeg = 180 / Math.PI;
var rotTest;
var controls;

//oimo var
var world = null;
var bodys = null;

var fps = [0,0,0,0];
var type=1;

init();
loop();

function init() {
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    initCamera(180,60,400);
    
    raycaster = new THREE.Raycaster();
    projector = new THREE.Projector();
    
    scene = new THREE.Scene();
    
    content = new THREE.Object3D();
    scene.add(content);
    
    scene.add( new THREE.AmbientLight( 0x3D4143 ) );
    
    light = new THREE.DirectionalLight( 0xffffff , 1);
    //light.position.set( 300, 1000, 500 );
    light.position.set( -300, 1000, 500 );
    light.target.position.set( 0, 0, 0 );
    light.castShadow = true;
    light.shadowCameraNear = 500;
    light.shadowCameraFar = 1600;
    light.shadowCameraFov = 70;
    light.shadowBias = 0.0001;
    light.shadowDarkness = 0.7;
    light.shadowMapWidth = light.shadowMapHeight = 1024;
    scene.add( light );
    
    // background
    var buffgeoBack = new THREE.BufferGeometry();
    buffgeoBack.fromGeometry( new THREE.IcosahedronGeometry(8000,1) );
    var back = new THREE.Mesh( buffgeoBack, new THREE.MeshBasicMaterial( { map:gradTexture([[1,0.75,0.5,0.25], ['#1B1D1E','#3D4143','#72797D', '#b0babf']]), side:THREE.BackSide, depthWrite: false }  ));
    back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15*ToRad));
    scene.add( back );
    
    buffgeoSphere = new THREE.BufferGeometry();
    buffgeoSphere.fromGeometry( new THREE.SphereGeometry( 1, 20, 10 ) );
    
    buffgeoBox = new THREE.BufferGeometry();
    buffgeoBox.fromGeometry( new THREE.BoxGeometry( 1, 1, 1 ) );

    buffgeoCylinder= new THREE.BufferGeometry();
    buffgeoCylinder.fromGeometry( new THREE.CylinderGeometry( 0.5, 0.5, 1.0, 24 ) );
    
    matBox = new THREE.MeshLambertMaterial( {  map: basicTexture(0), name:'box' } );
    matGround = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0x3D4143, transparent:true, opacity:0.6 } );
    
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    //renderer.gammaInput = true;
    //renderer.gammaOutput = true;
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.4;
    controls.autoRotate = false;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 5.0;    //自動回転する時の速度

    paddel = new THREE.Object3D();
    
    rotTest = new THREE.Vector3();
    
    container = document.getElementById("container");
    container.appendChild( renderer.domElement );
    
    initEvents();
    initOimoPhysics();
}

function loop() {
    requestAnimationFrame( loop );
    controls.update();
    renderer.clear();
    renderer.render( scene, camera );
}

function addStaticBox(size, position, rotation, spec) {
    var mesh;
    if(spec) mesh = new THREE.Mesh( buffgeoBox, matGroundTrans );
    else mesh = new THREE.Mesh( buffgeoBox, matGround );
    mesh.scale.set( size[0], size[1], size[2] );
    mesh.position.set( position[0], position[1], position[2] );
    mesh.rotation.set( rotation[0]*ToRad, rotation[1]*ToRad, rotation[2]*ToRad );
    if(!grounds.length) content.add( mesh );
    else scene.add( mesh );
    grounds.push(mesh);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
}

function clearMesh(){
    var i=meshs.length;
    while (i--) scene.remove(meshs[ i ]);
    i = grounds.length;
    while (i--) scene.remove(grounds[ i ]);
    grounds = [];
    meshs = [];
}

//----------------------------------
//  OIMO PHYSICS
//----------------------------------

function initOimoPhysics(){
    
    world = new OIMO.World(1/60, 2);
    populate(1);
    setInterval(updateOimoPhysics, 1000/60);
    
}

function populate(n) {
    // The Bit of a collision group
    var group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
    var group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
    var group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
    var all = 0xffffffff; // 11111111 11111111 11111111 11111111
    
    //var max = 100; // document.getElementById("MaxNumber").value;
    var max = 120;
    
    //type = 3;
    //type = 1;
    type = 2;
    
    // reset old
    clearMesh();
    world.clear();
    bodys = [];
    
    // Is all the physics setting for rigidbody
    var config = [
        1, // The density of the shape.
        0.4, // The coefficient of friction of the shape.
        0.2, // The coefficient of restitution of the shape.
        1, // The bits of the collision groups to which the shape belongs.
        all // The bits of the collision groups with which the shape collides.
    ];
    
    
    
    //add ground
    var ground = new OIMO.Body({size:[400, 40, 400], pos:[0,-20,0], world:world, config:config});
    addStaticBox([400, 40, 400], [0,-20,0], [0,0,0]);
    
    var ground2 = new OIMO.Body({size:[200, 30, 390], pos:[130,40,0], rot:[0,0,32], world:world, config:config});
    addStaticBox([200, 30, 390], [130,40,0], [0,0,32]);
    
    // now add object
    var x, y, z, w, h, d;
    var i = max;
    
    while (i--){
        t = type;
        x = 150;
        z = -150 + Math.random()*300;
        y = 100 + Math.random()*1000;
        w = 25;
        h = 30 * 3;
        d = 25;
        
        config[4] = all;
        
        if(t===2){
            config[3] = group3;
            bodys[i] = new OIMO.Body({type:'cylinder', size:[w,h,w], pos:[x,y,z], move:true, world:world, config:config});
            meshs[i] = createMesh();
            meshs[i].scale.set( w*0.5, h, d*0.5 );
        }
        
        meshs[i].castShadow = true;
        meshs[i].receiveShadow = true;
        
        scene.add( meshs[i] );
    }
    
    config[3] = 1;
    config[4] = all;
    bodys[max] = new OIMO.Body({size:[20, 40, 60], pos:[-150,20,0], rot:[0,0,0], move:true, noSleep:true, world:world, config:config});
    meshs[max] = new THREE.Mesh( buffgeoBox, matBox );
    meshs[max].scale.set( 20, 40, 60 );
    scene.add( meshs[max] );
}

function createMesh() {
    var coin_sides_geo =
        new THREE.CylinderGeometry(1.0, 1.0, 1.0, 16.0, 10.0, true);
    var coin_cap_geo = new THREE.Geometry();
    var r = 1.0;
    for (var i = 0; i < 16; i++) {
        var a = i * 1 / 16 * Math.PI * 2;
        var z = Math.sin(a);
        var x = Math.cos(a);
        var a1 = (i + 1) * 1 / 16 * Math.PI * 2;
        var z1 = Math.sin(a1);
        var x1 = Math.cos(a1);
        coin_cap_geo.vertices.push(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(x * r, 0, z * r),
            new THREE.Vector3(x1 * r, 0, z1 * r)
        );
        coin_cap_geo.faceVertexUvs[0].push([
            new THREE.Vector2(0.5, 0.5),
            new THREE.Vector2(x / 2 + 0.5, z / 2 + 0.5),
            new THREE.Vector2(x1 / 2 + 0.5, z1 / 2 + 0.5)
        ]);
        coin_cap_geo.faces.push(new THREE.Face3(i * 3, i * 3 + 1, i * 3 + 2));
    }

    coin_cap_geo.computeFaceNormals();
    coin_cap_geo.computeVertexNormals();
/*
    var coin_sides_texture           = THREE.ImageUtils.loadTexture("/assets/y/l/j/V/yljV4.png"); // side.png
    var coin_sides_texture_bump      = THREE.ImageUtils.loadTexture("/assets/k/1/j/Z/k1jZN.png"); // side_bump.png
    var coin_cap_texture_top         = THREE.ImageUtils.loadTexture("/assets/k/S/o/2/kSo2z.png"); // top.png
    var coin_cap_texture_top_bump    = THREE.ImageUtils.loadTexture("/assets/O/n/n/8/Onn8S.png"); // top_bump.png
    var coin_cap_texture_bottom      = THREE.ImageUtils.loadTexture("/assets/h/p/D/N/hpDNA.png"); // bottom.png
    var coin_cap_texture_bottom_bump = THREE.ImageUtils.loadTexture("/assets/o/3/U/e/o3Uer.png"); // bottom_bump.png
*/
    var coin_sides_texture           = THREE.ImageUtils.loadTexture("../../assets/o/m/w/z/omwzV.png"); // side.png
    var coin_sides_texture_bump      = THREE.ImageUtils.loadTexture("../../assets/k/1/j/Z/k1jZN.png"); // side_bump.png
    var coin_cap_texture_top         = THREE.ImageUtils.loadTexture("../../assets/k/q/p/e/kqpeW.png"); // top.png
    var coin_cap_texture_top_bump    = THREE.ImageUtils.loadTexture("../../assets/o/n/n/8/onn8S.png"); // top_bump.png
    var coin_cap_texture_bottom      = THREE.ImageUtils.loadTexture("../../assets/6/X/s/d/6Xsdb.png"); // bottom.png
    var coin_cap_texture_bottom_bump = THREE.ImageUtils.loadTexture("../../assets/o/3/U/e/o3Uer.png"); // bottom_bump.png

    var coin_sides_mat = new THREE.MeshPhongMaterial({
        map: coin_sides_texture,
        bumpMap: coin_sides_texture_bump,
        bumpScale: 0.5
    });
    var coin_sides = new THREE.Mesh(coin_sides_geo, coin_sides_mat);

    var coin_cap_mat_top = new THREE.MeshPhongMaterial({
        map: coin_cap_texture_top,
        bumpMap: coin_cap_texture_top_bump,
        bumpScale: 0.5
    });
    var coin_cap_mat_bottom = new THREE.MeshPhongMaterial({
        map: coin_cap_texture_bottom,
        bumpMap: coin_cap_texture_bottom_bump,
        bumpScale: 0.5
    });
    var coin_cap_top = new THREE.Mesh(coin_cap_geo, coin_cap_mat_top);
    var coin_cap_bottom = new THREE.Mesh(coin_cap_geo, coin_cap_mat_bottom);
    coin_cap_top.position.y = 0.5;
    coin_cap_top.rotation.x = Math.PI;
    coin_cap_bottom.position.y = -0.5;
    coin_cap_bottom.rotation.y = Math.PI;

    var coin = new THREE.Object3D();
    coin.add(coin_sides);
    coin.add(coin_cap_top);
    coin.add(coin_cap_bottom);

    coin.rotation.x = Math.PI * 0.5;

    return coin;
}

function updateOimoPhysics() {
    
    world.step();
    
    // apply new position on last rigidbody
    bodys[bodys.length-1].setPosition(paddel.position);
    
    paddel.lookAt(new THREE.Vector3(100,paddel.position.y, 0));
    paddel.rotation.y+=90*ToRad;
    
    // apply new rotation on last rigidbody
    bodys[bodys.length-1].setQuaternion(paddel.quaternion);
    
    
    
    
    var p, r, m, x, y, z;
    var mtx = new THREE.Matrix4();
    var i = bodys.length;
    var mesh;
    var body;
    
    while (i--){
        body = bodys[i].body;
        mesh = meshs[i];
        
        if(!body.sleeping){
            
            mesh.position.copy(body.getPosition());
            mesh.quaternion.copy(body.getQuaternion());
            
            // reset position
            if(mesh.position.y<-100){
                x = 150;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                body.resetPosition(x,y,z);
            }
        }
    }
    
    displayInfo();
}

function gravity(g){
    nG = document.getElementById("gravity").value
    world.gravity = new OIMO.Vec3(0, nG, 0);
}

var unwrapDegrees = function (r) {
    r = r % 360;
    if (r > 180) r -= 360;
    if (r < -180) r += 360;
    return r;
}

//----------------------------------
//  TEXTURES
//----------------------------------

function gradTexture(color) {
    var c = document.createElement("canvas");
    var ct = c.getContext("2d");
    c.width = 16; c.height = 256;
    var gradient = ct.createLinearGradient(0,0,0,256);
    var i = color[0].length;
    while(i--){ gradient.addColorStop(color[0][i],color[1][i]); }
    ct.fillStyle = gradient;
    ct.fillRect(0,0,16,256);
    var texture = new THREE.Texture(c);
    texture.needsUpdate = true;
    return texture;
}

function basicTexture(n){
    var canvas = document.createElement( 'canvas' );
    canvas.width = canvas.height = 64;
    var ctx = canvas.getContext( '2d' );
    var colors = [];

    if(n===0){ // box
        colors[0] = "#AA8058";
        colors[1] = "#FFAA58";
    }
    if(n===1){ // bronze
        colors[0] = "#B76E40";
        colors[1] = "#A66E30";
    }
    if(n===2){ // silver
        colors[0] = "#A0A0A0";
        colors[1] = "#808080";
    }
    if(n===3){ // gold
        colors[0] = "#FFC14D";
        colors[1] = "#DFA13D";
    }
    
    if(n!==0){
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = colors[1];
        ctx.fillRect(0, 0, 64, 2);
    }else{
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = colors[1];
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
    }

    var tx = new THREE.Texture(canvas);
    tx.needsUpdate = true;
    return tx;
}

//----------------------------------
//  RAY TEST
//----------------------------------

var rayTest = function () {
    var vector = new THREE.Vector3( mouse.mx, mouse.my, 1 );
    projector.unprojectVector( vector, camera );
    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( content.children, true );
    if ( intersects.length) {
        paddel.position.copy( intersects[0].point.add(new THREE.Vector3( 0, 20, 0 )) );
    }
}
