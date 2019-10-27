// forked from cx20's "Three.js + Oimo.js でポッキーを落下させてみるテスト（その４）" http://jsdo.it/cx20/cxus
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
var matBox;
var matGround, matGroundTrans;
var matPocky = [];
var buffgeoSphere, buffgeoBox;
var buffgeoCylinder;
var raycaster, projector;
var terrain;
var ToRad = Math.PI / 180;
var MAP = "/assets/U/9/8/3/U983y.png"; // シャクルトンクレーター
var ROTATE = true;
var WIREFRAME = false;

//oimo var
var world = null;
var bodys = null;

var fps = [0,0,0,0];
var type=1;
var data;

// heightMap より標高データを取得する
// 参考：http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");

    var size = img.width * img.height;
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var k = 1.5; // 起伏の強調度
        var height = (pix[i] + pix[i + 1] + pix[i + 2])/3 * 1/16 * k;
        data[j++] = height;
    }

    return data;
}

var img = new Image();
img.src = "../../assets/u/9/8/3/u983y.png"; // /assets/U/9/8/3/U983y.png

img.onload = function() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    initCamera(180,60,500);

    // heightMap より標高データを取得
    data = getHeightData(img);

    raycaster = new THREE.Raycaster();
    projector = new THREE.Projector();

    scene = new THREE.Scene();

    content = new THREE.Object3D();
    scene.add(content);

    scene.add( new THREE.AmbientLight( 0x3D4143 ) );

    light = new THREE.DirectionalLight( 0xffffff , 1);
    light.position.set( 300, 1000, 500 );
    light.target.position.set( 0, 0, 0 );
    light.castShadow = true;
    light.shadowCameraNear = 500;
    light.shadowCameraFar = 1600;
    light.shadowCameraFov = 70;
    light.shadowBias = 0.0001;
    light.shadowDarkness = 0.7;
    light.shadowMapWidth = light.shadowMapHeight = 1024;
    scene.add( light );

    buffgeoSphere = new THREE.BufferGeometry();
    buffgeoSphere.fromGeometry( new THREE.SphereGeometry( 1 , 20, 10 ) );

    buffgeoBox = new THREE.BufferGeometry();
    buffgeoBox.fromGeometry( new THREE.BoxGeometry( 1, 1, 1 ) );

    buffgeoCylinder= new THREE.BufferGeometry();
    buffgeoCylinder.fromGeometry( new THREE.CylinderGeometry( 0.5, 0.5, 1, 6 ) );

    matBox = new THREE.MeshLambertMaterial( {  map: basicTexture(0), name:'box' } );
    matPocky[0] = new THREE.MeshLambertMaterial( {  map: basicTexture(1), name:'pky1' } );
    matPocky[1] = new THREE.MeshLambertMaterial( {  map: basicTexture(2), name:'pky2' } );
    matPocky[2] = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'pky3' } );

    matGround = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0x3D4143, transparent:true, opacity:0.6 } );

    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 0 );
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;

    paddel = new THREE.Object3D();
    scene.add( paddel );

    // OrbitControls の準備
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = 1.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5.0;
    
    container = document.getElementById("container");
    container.appendChild( renderer.domElement );

    initEvents();
    initOimoPhysics();
    
    loop();
};

function loop() {
    controls.update();
    requestAnimationFrame( loop );
    renderer.clear();
    renderer.render( scene, camera );
}

function clearMesh(){
    var i=meshs.length;
    while (i--) scene.remove(meshs[ i ]);
    i = grounds.length;
    while (i--) scene.remove(grounds[ i ]);

    if(terrain){
        content.remove(terrain);
        terrain.geometry.dispose();
    }
    grounds = [];
    meshs = [];
}

//----------------------------------
//  OIMO PHYSICS
//----------------------------------

function initOimoPhysics(){

    world = new OIMO.World(1/60, 2);
    
    populate();
    setInterval(updateOimoPhysics, 1000/60);

}
function initTerrain(w, h) {
    var scale = 4; // メッシュの細かさを調整
    var b;
    var R = 15;
    var x1 = 512;
    var y1 = 512;
    var x2 = 256/scale;
    var y2 = 256/scale;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    for (var i = 0; i < geometry.vertices.length; i++) {
        var k = Math.floor(i / x2);
        var j = 256 * k * scale + (i % y2) * scale;
        geometry.vertices[i].z = data[j] * 5;
    }
    
    for ( var i = 0; i < geometry.vertices.length; i++ ) {
        var v = geometry.vertices[i];
        var k = Math.floor(i / x2);
        var j = 256 * k * scale + (i % y2) * scale;
        v.z = data[j] * 5;

        b = new OIMO.Body({type:'sphere', size:[R], pos:[v.x,v.z-R,v.y],world:world});
    }

    buffgeo = new THREE.BufferGeometry();
    buffgeo.fromGeometry( geometry );

    // テクスチャを貼り付け
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(MAP),
        wireframe: WIREFRAME
    });
    terrain = new THREE.Mesh(geometry, material);
    
    // 座標回転
    terrain.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(terrain);
    
    // GUI
    gui = new dat.GUI();
    gui.close();
    var mapSelector = gui.add(window, 'MAP', {
        "シャクルトンクレーター": "../../assets/u/9/8/3/u983y.png", // moon_crater_heightmap.png
    });
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');
    var mapWireframe = gui.add(window, 'WIREFRAME').name('Wireframe');
    
    mapSelector.onChange(function (value) {
        terrain.material.map = THREE.ImageUtils.loadTexture(value);
    });
    
    mapRotate.onChange(function (value) {
        controls.autoRotate = value;
    });

    mapWireframe.onChange(function (value) {
        terrain.material.wireframe = value;
    });

    content.add(terrain);
}

function populate() {

    // The Bit of a collision group
    var group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
    var group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
    var group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
    var all = 0xffffffff; // 11111111 11111111 11111111 11111111

    //var max = 500;
    var max = 300;

    type = 2;

    // reset old
    clearMesh();
    world.clear();
    bodys = [];

    initTerrain();

    // Is all the physics setting for rigidbody
    var config = [
        1, // The density of the shape.
        0.4, // The coefficient of friction of the shape.
        0.2, // The coefficient of restitution of the shape.
        1, // The bits of the collision groups to which the shape belongs.
        all // The bits of the collision groups with which the shape collides.
    ];

    // now add object
    var x, y, z, w, h, d;
    var i = max;

    var scale = 1.5;
    while (i--){
        //else t = type;
        t = type;
        x = 0;
        z = -100 + Math.random()*200;
        y = 100 + Math.random()*1000;
        w = 3 * scale;
        h = 100 * scale;
        d = 3 * scale;
        
        config[4] = all;
        
        config[3] = group3;
        //bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world, config:config});
        bodys[i] = new OIMO.Body({type:'cylinder', size:[w,h,w], pos:[x,y,z], move:true, world:world, config:config});
        var pos = Math.floor(Math.random() * matPocky.length );
        console.log( pos );
        //meshs[i] = new THREE.Mesh( buffgeoBox, matPocky[pos] );
        meshs[i] = new THREE.Mesh( buffgeoCylinder, matPocky[pos] );
        meshs[i].scale.set( w, h, d );
        
        //meshs[i].castShadow = true;
        //meshs[i].receiveShadow = true;
        
        scene.add( meshs[i] );
    }

    config[3] = 1;
    config[4] = all;
    bodys[max] = new OIMO.Body({size:[20, 40, 60], pos:[-150,20,0], rot:[0,0,0], move:true, noSleep:true, world:world, config:config});
    meshs[max] = new THREE.Mesh( buffgeoBox, matBox );
    meshs[max].scale.set( 20, 40, 20 );
    scene.add( meshs[max] );
}

function updateOimoPhysics() {

    // apply new position on last rigidbody
    bodys[bodys.length-1].setPosition(paddel.position);

    world.step();

    var p, r, m, x, y, z;
    var i = bodys.length;
    var mesh;
    var body;

    while (i--){
        body = bodys[i].body;
        mesh = meshs[i];
        
        if(!body.sleeping){
            
            mesh.position.copy(body.getPosition());
            mesh.quaternion.copy(body.getQuaternion());
            
            
            // change material
            if(mesh.material.name === 'box') mesh.material = matBox; 
            if(mesh.material.name === 'pky1') mesh.material = matPocky[0]; 
            if(mesh.material.name === 'pky2') mesh.material = matPocky[1]; 
            if(mesh.material.name === 'pky3') mesh.material = matPocky[2]; 
            
            // reset position
            if(mesh.position.y<-100){
                x = 150;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                body.resetPosition(x,y,z);
            }
        }
    }

}

//----------------------------------
//  TEXTURES
//----------------------------------

function basicTexture(n){
    var canvas = document.createElement( 'canvas' );
    canvas.width = canvas.height = 64;
    var ctx = canvas.getContext( '2d' );
    var colors = [];

    if(n===0){ // box
        colors[0] = "#AA8058";
        colors[1] = "#FFAA58";
    }
    if(n===1){ // pocky1(normal)
        colors[0] = "#FFC14D";
        colors[1] = "#684B48";
    }
    if(n===2){ // pocky2(strawberry)
        colors[0] = "#FFC14D";
        colors[1] = "#D36FC0";
    }
    if(n===3){ // pocky3(pretz)
        colors[0] = "#FFC14D";
        colors[1] = "#FFC14D";
    }
    
    if(n!==0){
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = colors[1];
        ctx.fillRect(0, 0, 64, 52);
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
