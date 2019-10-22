// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その１３）" http://jsdo.it/cx20/4D7O
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
var matGround, matGroundTrans;
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

var mario = [];

var boxSizeX = 16/16*20;
var boxSizeY = 16/16*20;
var boxSizeZ = 9/16*20;

var dataSet = [{
    image: "../../assets/9/9/W/G/99WGE.png", // mario.png
    model: "../../assets/t/N/6/x/tN6xU.obj", // mario.obj
    type: 'box', 
    size: [boxSizeX, boxSizeY, boxSizeZ]
}, {
    image: "../../assets/k/q/7/I/kq7Is.png", // halloween.png
    model: "../../assets/j/M/p/1/jMp1l.obj", // halloween.obj
    type: 'sphere', 
    size: [boxSizeX]
}];

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

    scene.add( light );

    buffgeoSphere = new THREE.BufferGeometry();
    buffgeoSphere.fromGeometry( new THREE.SphereGeometry( 1 , 20, 10 ) );

    buffgeoBox = new THREE.BufferGeometry();
    buffgeoBox.fromGeometry( new THREE.BoxGeometry( 1, 1, 1 ) );

    matGround = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0x3D4143, transparent:true, opacity:0.6 } );

    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 0 );
    renderer.autoClear = false;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0;    //自動回転する時の速度

    container = document.getElementById("container");
    container.appendChild( renderer.domElement );

    initEvents();
    initOimoPhysics();
    
}, false);

function loop() {
    requestAnimationFrame( loop );
    updateOimoPhysics();
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
            var z = r[j] * 8.0;
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
            map: THREE.ImageUtils.loadTexture('../../assets/o/c/R/i/ocRi9.png') // 黒部峡谷
        }));
    //terrain.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    terrain.castShadow = true;
    terrain.receiveShadow = true;
    content.add(terrain);
}

function populate(n) {
    // The Bit of a collision group
    var all = 0xffffffff; // 11111111 11111111 11111111 11111111
    var max = 50;

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
    for ( var i = 0; i < max; i++ ) {
        loadMario();
    }
    
    loop();
}

function loadMario() {
    var texture = new THREE.Texture();
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {};
    var onProgress = function ( xhr ) {};
    var onError = function ( xhr ) {};

    var pos = Math.floor( Math.random() * dataSet.length );
    var imageFile = dataSet[pos].image;
    var modelFile = dataSet[pos].model;
    var type = dataSet[pos].type;
    var size = dataSet[pos].size;

    var imageLoader = new THREE.ImageLoader( manager );
    imageLoader.load( imageFile, function ( image ) {
        texture.image = image;
        texture.needsUpdate = true;
    } );

    var objLoader = new THREE.OBJLoader();
    objLoader.load( modelFile, function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.map = texture;
                //child.material.wireframe = true;
                
                // モデルの座標を調節
                for ( var i = 0; i < child.geometry.vertices.length; i++ ) {
                    child.geometry.vertices[i].y -= 8.5;
                }
            }
        } );
        object.scale.set( 2, 2, 2 );
        var i = mario.length;
        mario[i] = object;

        //var axis = new THREE.AxisHelper(1000);   
        //mario[i].add(axis);
        meshs[i] = object;
        scene.add( meshs[i] );
        
        var x = 100 + Math.random() * 20;
        var y = 100 + i * 20;
        var z = Math.random() * 20;

        bodys[i] = new OIMO.Body({
            type:type, 
            size:size, 
            pos:[x, y, z], 
            move:true, 
            world:world
        });
    }, onProgress, onError );
}

var f0, f1, f2 = 0;

function updateOimoPhysics() {
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

            // reset position
            if(mesh.position.y<-300){
                x = -100 + Math.random()*200;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                body.resetPosition(x,y,z);
            }
        } else {
        }
    }

}

function gravity(g){
    nG = document.getElementById("gravity").value
    world.gravity = new OIMO.Vec3(0, nG, 0);
}

//xhr.open('GET',  'dem.csv', true);
//xhr.open('GET',  'dem_kurobe.csv', true);
//xhr.open('GET', '/assets/2/g/t/o/2gtor', true); // 富士山
//xhr.open('GET', '/assets/4/9/G/4/49G4v', true); // 芦ノ湖
xhr.open('GET', '../../assets/7/D/o/H/7DoHj.csv', true); // 黒部峡谷

xhr.send(null);
