// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その１２）" http://jsdo.it/cx20/lPKe
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その１１）" http://jsdo.it/cx20/yWa7
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その１０）" http://jsdo.it/cx20/wbmT
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その９）（失敗）" http://jsdo.it/cx20/d2KX
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その８）" http://jsdo.it/cx20/8Jmv
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その７）" http://jsdo.it/cx20/A5nH
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その６）" http://jsdo.it/cx20/i5wV
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その５）" http://jsdo.it/cx20/qEka
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その４）" http://jsdo.it/cx20/jEqZ
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その３）" http://jsdo.it/cx20/ky6o
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その２）" http://jsdo.it/cx20/rrlt
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

// three var
var camera, scene, light, renderer, container, content;
var meshs = [];
var grounds = [];
var paddel;
var matBox, matSphere, matBoxSleep, matSphereSleep, matGround, matGroundTrans;
var buffgeoSphere, buffgeoBox;
var raycaster, projector;
var terrain;
var ToRad = Math.PI / 180;

//oimo var
var world = null;
var bodys = null;

var fps = [0,0,0,0];
var type=1;
var s = "";

//init();
//loop();

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(evt) {
    s = (evt.target.response || evt.target.responseText).split("\n");

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    initCamera(180,60,600);

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

    matSphere = new THREE.MeshLambertMaterial( { map: basicTexture(0), name:'sph' } );
    matBox = new THREE.MeshLambertMaterial( {  map: basicTexture(2), name:'box' } );
    matSphereSleep = new THREE.MeshLambertMaterial( { map: basicTexture(1), name:'ssph' } );
    matBoxSleep = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'sbox' } );
    matGround = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0x3D4143, transparent:true, opacity:0.6 } );

    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 0 );
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    //renderer.gammaInput = true;
   // renderer.gammaOutput = true;


    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0;    //自動回転する時の速度

    paddel = new THREE.Object3D();
    scene.add( paddel );

    container = document.getElementById("container");
    container.appendChild( renderer.domElement );

    initEvents();
    initOimoPhysics();
    
    loop();
}, false);

function loop() {
    requestAnimationFrame( loop );
    controls.update();
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
    
    populate(1);
    setInterval(updateOimoPhysics, 1000/60);

}
function initTerrain(w, h) {
    var b;
    var R = 20;
    var n = 6;
    var x1 = 600; // 128;
    var y1 = 600; // 128;
    var x2 = 192 / n; // 192; // 256 -> 192
    var y2 = 192 / n; // 192; // 256 -> 192
    var data = new OIMO_ARRAY_TYPE( x2 * y2 );
    var g = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    g.applyMatrix(new THREE.Matrix4().makeRotationX( - Math.PI * 0.5 ));
    var c = 0;
    for (var i = 0; i < y2; i++) {
        var r = s[Math.floor(i * n)].split(",");
        for (var j = 0; j < r.length; j += n ) {
            var x = j;
            var y = i;
            var z = - r[j] * 8.0;
            console.log( x + ", " + y + ", " + z );
            data[c] = z;
            c++;
        }
    }
    
    for ( var i = 0; i < g.vertices.length; i++ ) {
        v = g.vertices[i];
        v.y = data[i];

        b = new OIMO.Body({type:'sphere', size:[R], pos:[v.x,v.y-R,v.z],world:world});
    }

    g.computeFaceNormals();
    g.computeVertexNormals();

    buffgeo = new THREE.BufferGeometry();
    buffgeo.fromGeometry( g );

    terrain = new THREE.Mesh(
    	buffgeo, 
    	new THREE.MeshPhongMaterial ({
    		//map: THREE.ImageUtils.loadTexture('texture.png')
            //map: THREE.ImageUtils.loadTexture('/assets/n/L/v/L/nLvLt.png') // 富士山
            //map: THREE.ImageUtils.loadTexture('/assets/9/r/4/P/9r4PX.png') // 芦ノ湖
            color: 0x00ff00,
            wireframe: true
		}));
    //terrain.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    terrain.castShadow = true;
    terrain.receiveShadow = true;
    content.add(terrain);
}

function populate(n) {
    

    // The Bit of a collision group
    var group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
    var group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
    var group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
    var all = 0xffffffff; // 11111111 11111111 11111111 11111111

    var max = 200; // document.getElementById("MaxNumber").value;

    type = 3;

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



    while (i--){
        if(type===3) t = Math.floor(Math.random()*2)+1;
        else t = type;
        x = -100 + Math.random()*200;;
        z = -100 + Math.random()*200;
        y = 100 + Math.random()*1000;
        w = 10 + Math.random()*10;
        h = 10 + Math.random()*10;
        d = 10 + Math.random()*10;

        config[4] = all;

        if(t===1){
            config[3] = group2;
            bodys[i] = new OIMO.Body({type:'sphere', size:[w*0.5], pos:[x,y,z], move:true, world:world, config:config});
            meshs[i] = new THREE.Mesh( buffgeoSphere, matSphere );
            meshs[i].scale.set( w*0.5, w*0.5, w*0.5 );
        } else if(t===2){
            config[3] = group3;
            bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world, config:config});
            meshs[i] = new THREE.Mesh( buffgeoBox, matBox );
            meshs[i].scale.set( w, h, d );
        }

        meshs[i].castShadow = true;
        meshs[i].receiveShadow = true;

        scene.add( meshs[i] );
    }

    config[3] = 1;
    config[4] = all;
    bodys[max] = new OIMO.Body({size:[20, 40, 60], pos:[-150,20,0], rot:[0,0,0], move:true, noSleep:true, world:world, config:config});
    meshs[max] = new THREE.Mesh( buffgeoBox, matBox );
    meshs[max].scale.set( 20, 40, 20 );
    scene.add( meshs[max] );
}

var f0, f1, f2 = 0;


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
            if(mesh.material.name === 'sbox') mesh.material = matBox;
            if(mesh.material.name === 'ssph') mesh.material = matSphere; 

            // reset position
            if(mesh.position.y<-300){
                x = -100 + Math.random()*200;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                body.resetPosition(x,y,z);
            }
        } else {
            if(mesh.material.name === 'box') mesh.material = matBoxSleep;
            if(mesh.material.name === 'sph') mesh.material = matSphereSleep;
        }
    }

}

function gravity(g){
    nG = document.getElementById("gravity").value
    world.gravity = new OIMO.Vec3(0, nG, 0);
}

//----------------------------------
//  TEXTURES
//----------------------------------

function basicTexture(n){

    var canvas = document.createElement( 'canvas' );
    canvas.width = canvas.height = 64;
    var ctx = canvas.getContext( '2d' );
    var colors = [];
    if(n===0){ // sphere
        colors[0] = "#58AA80";
        colors[1] = "#58FFAA";
    }
    if(n===1){ // sphere sleep
        colors[0] = "#383838";
        colors[1] = "#38AA80";
    }
    if(n===2){ // box
        colors[0] = "#AA8058";
        colors[1] = "#FFAA58";
    }
    if(n===3){ // box sleep
        colors[0] = "#383838";
        colors[1] = "#AA8038";
    }
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = colors[1];
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillRect(32, 32, 32, 32);

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

//xhr.open('GET',  'dem.csv', true);
xhr.open('GET', '../../assets/2/g/t/o/2gtor.csv', true); // 富士山
//xhr.open('GET', '/assets/4/9/G/4/49G4v', true); // 芦ノ湖
xhr.send(null);
