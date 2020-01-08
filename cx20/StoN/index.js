// forked from cx20's "Three.js で消しゴムをストーンヘンジっぽく並べてみるテスト（その２）" http://jsdo.it/cx20/MNj7
// forked from cx20's "Three.js で消しゴムをストーンヘンジっぽく並べてみるテスト" http://jsdo.it/cx20/cz9E
// forked from cx20's "Three.js + Oimo.js で消しゴムを落下させてみるテスト（その３）" http://jsdo.it/cx20/aFHd
// forked from cx20's "Three.js + Oimo.js で消しゴムを落下させてみるテスト（その２）" http://jsdo.it/cx20/tRpv
// forked from cx20's "Three.js + Oimo.js で消しゴムを落下させてみるテスト" http://jsdo.it/cx20/1RNU
// forked from cx20's "Three.js + Oimo.js で六角形の箱を落下させてみるテスト" http://jsdo.it/cx20/pd9Y
// forked from cx20's "Three.js + Oimo.js でポッキーを落下させてみるテスト" http://jsdo.it/cx20/nS6J
// forked from cx20's "Three.js + Oimo.js で坂道にボールを転がしてみるテスト" http://jsdo.it/cx20/8ECT
// forked from Lo-Th's "Oimo.js Moving" http://lo-th.github.io/Oimo.js/test_moving.html

// three var
var camera, cameraCube, scene, sceneCube, light, renderer, container, content;
var meshs = [];
var grounds = [];
var paddel;
var matGround, matGroundTrans;
var matPocky = [];
var matKoala;
var matMono;
var buffgeoBox;
var buffgeoMono;
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
    initCamera(180, 300, 250);

    cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
    
    raycaster = new THREE.Raycaster();
    projector = new THREE.Projector();
    
    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();
    
    content = new THREE.Object3D();
    scene.add(content);
    
    scene.add( new THREE.AmbientLight( 0x3D4143 ) );
    
    light = new THREE.DirectionalLight( 0xffffff , 1);
    //light.position.set( 300, 1000, 500 );
    light.position.set( -500, 300, 500 );
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
    buffgeoMono = new THREE.BoxGeometry( 1, 1, 1 );

    buffgeoCylinder= new THREE.BufferGeometry();
    buffgeoCylinder.fromGeometry( new THREE.CylinderGeometry( 0.5, 0.5, 1, 6 ) );
    
    var materials = [
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('../../assets/7/c/m/Z/7cmZs.png')}), // 1.png
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('../../assets/r/7/0/e/r70eD.png')}), // 2.png
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('../../assets/d/v/s/L/dvsLs.png')}), // 3.png
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('../../assets/f/Q/F/U/fQFUI.png')}), // 4.png
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('../../assets/f/N/l/x/fNlxK.png')}), // 5.png
       new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('../../assets/i/6/u/k/i6ukX.png')})  // 6.png
    ];
    
    matBox = new THREE.MeshLambertMaterial( {  map: basicTexture(0), name:'box' } );
    matMono = new THREE.MeshFaceMaterial( materials );
    //matGround = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0x3D4143, transparent:true, opacity:0.6 } );
    
    var texture = THREE.ImageUtils.loadTexture("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
    texture.wrapS   = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 20, 20 );  
    matGround = new THREE.MeshLambertMaterial( { color: 0x777777, map: texture } );

    var urls = [
        "../../assets/j/r/q/8/jrq8Z.jpg",    // px.jpg
        "../../assets/b/A/n/h/bAnhv.jpg",    // nx.jpg
        "../../assets/k/F/t/6/kFt6K.jpg",    // py.jpg
        "../../assets/l/6/9/p/l69pi.jpg",    // ny.jpg
        "../../assets/k/2/t/g/k2tgI.jpg",    // pz.jpg
        "../../assets/l/O/u/H/lOuHI.jpg"     // nz.jpg
        ];
    
    var textureCube = THREE.ImageUtils.loadTextureCube( urls );
    textureCube.format = THREE.RGBFormat;

    scene.matrixAutoUpdate = false;

    // Skybox
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;

    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        side: THREE.BackSide

    } ),

    mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );
    sceneCube.add( mesh );
    
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
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
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
    cameraCube.rotation.copy( camera.rotation );
    renderer.clear();
    renderer.render( scene, camera );
    renderer.render( sceneCube, cameraCube );
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
    var ground = new OIMO.Body({size:[6000, 60, 6000], pos:[0,-20,0], world:world, config:config});
    addStaticBox([6000, 60, 6000], [0,-20,0], [0,0,0]);
    
    // now add object
    var dataSet = [
    /* 一段目 */
    { x: 85 * Math.cos(2 * Math.PI *   1/12), y: 85 * Math.sin(2 * Math.PI *   1/12), z: 40, rot_x: 30* 1, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   2/12), y: 85 * Math.sin(2 * Math.PI *   2/12), z: 40, rot_x: 30* 2, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   3/12), y: 85 * Math.sin(2 * Math.PI *   3/12), z: 40, rot_x: 30* 3, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   4/12), y: 85 * Math.sin(2 * Math.PI *   4/12), z: 40, rot_x: 30* 4, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   5/12), y: 85 * Math.sin(2 * Math.PI *   5/12), z: 40, rot_x: 30* 5, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   6/12), y: 85 * Math.sin(2 * Math.PI *   6/12), z: 40, rot_x: 30* 6, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   7/12), y: 85 * Math.sin(2 * Math.PI *   7/12), z: 40, rot_x: 30* 7, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   8/12), y: 85 * Math.sin(2 * Math.PI *   8/12), z: 40, rot_x: 30* 8, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   9/12), y: 85 * Math.sin(2 * Math.PI *   9/12), z: 40, rot_x: 30* 9, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *  10/12), y: 85 * Math.sin(2 * Math.PI *  10/12), z: 40, rot_x: 30*10, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *  11/12), y: 85 * Math.sin(2 * Math.PI *  11/12), z: 40, rot_x: 30*11, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *  12/12), y: 85 * Math.sin(2 * Math.PI *  12/12), z: 40, rot_x: 30*12, rot_y:-90, rot_z:00},
    /* 二段目 */
    { x: 80 * Math.cos(2 * Math.PI * 1.5/12), y: 80 * Math.sin(2 * Math.PI * 1.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 1},
    { x: 80 * Math.cos(2 * Math.PI * 2.5/12), y: 80 * Math.sin(2 * Math.PI * 2.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 2},
    { x: 80 * Math.cos(2 * Math.PI * 3.5/12), y: 80 * Math.sin(2 * Math.PI * 3.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 3},
    { x: 80 * Math.cos(2 * Math.PI * 4.5/12), y: 80 * Math.sin(2 * Math.PI * 4.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 4},
    { x: 80 * Math.cos(2 * Math.PI * 5.5/12), y: 80 * Math.sin(2 * Math.PI * 5.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 5},
    { x: 80 * Math.cos(2 * Math.PI * 6.5/12), y: 80 * Math.sin(2 * Math.PI * 6.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 6},
    { x: 80 * Math.cos(2 * Math.PI * 7.5/12), y: 80 * Math.sin(2 * Math.PI * 7.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 7},
    { x: 80 * Math.cos(2 * Math.PI * 8.5/12), y: 80 * Math.sin(2 * Math.PI * 8.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 8},
    { x: 80 * Math.cos(2 * Math.PI * 9.5/12), y: 80 * Math.sin(2 * Math.PI * 9.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30* 9},
    { x: 80 * Math.cos(2 * Math.PI *10.5/12), y: 80 * Math.sin(2 * Math.PI *10.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30*10},
    { x: 80 * Math.cos(2 * Math.PI *11.5/12), y: 80 * Math.sin(2 * Math.PI *11.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30*11},
    { x: 80 * Math.cos(2 * Math.PI *12.5/12), y: 80 * Math.sin(2 * Math.PI *12.5/12), z: 60, rot_x:     0, rot_y:  0, rot_z:75-30*12},
    /* 三段目 */
    { x: 85 * Math.cos(2 * Math.PI *   1/12), y: 85 * Math.sin(2 * Math.PI *   1/12), z: 80, rot_x: 30* 1, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   2/12), y: 85 * Math.sin(2 * Math.PI *   2/12), z: 80, rot_x: 30* 2, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   3/12), y: 85 * Math.sin(2 * Math.PI *   3/12), z: 80, rot_x: 30* 3, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   4/12), y: 85 * Math.sin(2 * Math.PI *   4/12), z: 80, rot_x: 30* 4, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   5/12), y: 85 * Math.sin(2 * Math.PI *   5/12), z: 80, rot_x: 30* 5, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   6/12), y: 85 * Math.sin(2 * Math.PI *   6/12), z: 80, rot_x: 30* 6, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   7/12), y: 85 * Math.sin(2 * Math.PI *   7/12), z: 80, rot_x: 30* 7, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   8/12), y: 85 * Math.sin(2 * Math.PI *   8/12), z: 80, rot_x: 30* 8, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *   9/12), y: 85 * Math.sin(2 * Math.PI *   9/12), z: 80, rot_x: 30* 9, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *  10/12), y: 85 * Math.sin(2 * Math.PI *  10/12), z: 80, rot_x: 30*10, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *  11/12), y: 85 * Math.sin(2 * Math.PI *  11/12), z: 80, rot_x: 30*11, rot_y:-90, rot_z:00},
    { x: 85 * Math.cos(2 * Math.PI *  12/12), y: 85 * Math.sin(2 * Math.PI *  12/12), z: 80, rot_x: 30*12, rot_y:-90, rot_z:00},
    /* 四段目 */
    { x: 80 * Math.cos(2 * Math.PI * 1.5/12), y: 80 * Math.sin(2 * Math.PI * 1.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 1},
    { x: 80 * Math.cos(2 * Math.PI * 2.5/12), y: 80 * Math.sin(2 * Math.PI * 2.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 2},
    { x: 80 * Math.cos(2 * Math.PI * 3.5/12), y: 80 * Math.sin(2 * Math.PI * 3.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 3},
    { x: 80 * Math.cos(2 * Math.PI * 4.5/12), y: 80 * Math.sin(2 * Math.PI * 4.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 4},
    { x: 80 * Math.cos(2 * Math.PI * 5.5/12), y: 80 * Math.sin(2 * Math.PI * 5.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 5},
    { x: 80 * Math.cos(2 * Math.PI * 6.5/12), y: 80 * Math.sin(2 * Math.PI * 6.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 6},
    { x: 80 * Math.cos(2 * Math.PI * 7.5/12), y: 80 * Math.sin(2 * Math.PI * 7.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 7},
    { x: 80 * Math.cos(2 * Math.PI * 8.5/12), y: 80 * Math.sin(2 * Math.PI * 8.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 8},
    { x: 80 * Math.cos(2 * Math.PI * 9.5/12), y: 80 * Math.sin(2 * Math.PI * 9.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30* 9},
    { x: 80 * Math.cos(2 * Math.PI *10.5/12), y: 80 * Math.sin(2 * Math.PI *10.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30*10},
    { x: 80 * Math.cos(2 * Math.PI *11.5/12), y: 80 * Math.sin(2 * Math.PI *11.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30*11},
    { x: 80 * Math.cos(2 * Math.PI *12.5/12), y: 80 * Math.sin(2 * Math.PI *12.5/12), z:100, rot_x:     0, rot_y:  0, rot_z:75-30*12},
    ];
    var max = dataSet.length;
    
    var x, y, z, w, h, d;
    var rot_x, rot_y, rot_z;
    
    for ( var i = 0; i < dataSet.length; i++ ) {
        x = dataSet[i].x;
        z = dataSet[i].y;
        y = dataSet[i].z;
        rot_x = dataSet[i].rot_x;
        rot_z = dataSet[i].rot_y;
        rot_y = dataSet[i].rot_z;
        
        w = 43;
        h = 11;
        d = 17;
        
        config[4] = all;
        config[3] = group3;
        bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], rot:[rot_x, rot_y, rot_z], move:true, world:world, config:config});
        meshs[i] = new THREE.Mesh( buffgeoMono, matMono );
        meshs[i].scale.set( w, h, d );

        meshs[i].castShadow = true;
        meshs[i].receiveShadow = true;
        
        scene.add( meshs[i] );
    }
    
    config[3] = 1;
    config[4] = all;
    bodys[max] = new OIMO.Body({size:[20, 60, 60], pos:[-150,20,0], rot:[0,0,0], move:true, noSleep:true, world:world, config:config});
    meshs[max] = new THREE.Mesh( buffgeoBox, matBox );
    meshs[max].scale.set( 20, 60, 60 );
    scene.add( meshs[max] );
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
            
            
            // change material
            if(mesh.material.name === 'box') mesh.material = matBox; 
            
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
