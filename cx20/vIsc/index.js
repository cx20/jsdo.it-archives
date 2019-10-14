// forked from cx20's "Oimo.js で歩行ロボットを動かしてみるテスト（その３）" http://jsdo.it/cx20/5Ddz
// forked from cx20's "Oimo.js で歩行ロボットを動かしてみるテスト（その２）" http://jsdo.it/cx20/sSa3
// forked from cx20's "Oimo.js で歩行ロボットを動かしてみるテスト" http://jsdo.it/cx20/i8un

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
        "無":0xDCAA6B,
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

var geos = {};
var mats = {};

// human
var human;
var nHuman = 16; // 6→16
var sliders;

// oimo
var world = null;
var Hmeshs = {};
var Hbodys = {};
var bodys = [];
var meshs = [];
var controls;

var ToRad = Math.PI / 180;

window.onload = init;

function init() {
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    initCamera(90,60,800);

    scene = new THREE.Scene();

    // lights
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
    //light.shadowCameraVisible = true;
    light.shadowMapWidth = light.shadowMapHeight = 1024;
    scene.add( light );

    // background
    var buffgeoBack = new THREE.BufferGeometry();
    buffgeoBack.fromGeometry( new THREE.IcosahedronGeometry(8000,1) );
    //var back = new THREE.Mesh( buffgeoBack, new THREE.MeshBasicMaterial( { map:gradTexture([[1,0.75,0.5,0.25], ['#1B1D1E','#3D4143','#72797D', '#b0babf']]), side:THREE.BackSide, depthWrite: false }  ));
    var back = new THREE.Mesh( buffgeoBack, new THREE.MeshBasicMaterial( { map:gradTexture([[1.0,1.0,1.0,0.25], ['#10202B','#20304D','#304052', '#5070f0']]), side:THREE.BackSide, depthWrite: false }  ));
    back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15*ToRad));
    scene.add( back );

    // geometrys
    geos['sphere'] = new THREE.BufferGeometry();
    geos['sphere'].fromGeometry( new THREE.SphereGeometry( 1 , 20, 10 ) );
    geos['box'] = new THREE.BufferGeometry();
    geos['box'].fromGeometry( new THREE.BoxGeometry( 1, 1, 1 ) );

    //add ground mesh
    var texture = THREE.ImageUtils.loadTexture("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
    //var texture = THREE.ImageUtils.loadTexture("grass.jpg"); // grass.jpg
    texture.wrapS   = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 2, 2 );  

    // materials
    mats['sph'] = new THREE.MeshPhongMaterial( { color: 0x99999A, name:'sph' ,specular: 0xFFFFFF, shininess: 120, transparent: true, opacity: 0.9 } );
    mats['box'] = new THREE.MeshLambertMaterial( {  color: 0xAA8058, name:'box' } );
    mats['ssph'] = new THREE.MeshPhongMaterial( { color:  0x666667, name:'ssph', specular: 0xFFFFFF, shininess: 120 , transparent: true, opacity: 0.7} );
    mats['sbox'] = new THREE.MeshLambertMaterial( {  color: 0x383838, name:'sbox' } );
    //mats['ground'] = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    mats['ground'] = new THREE.MeshLambertMaterial( { color: 0x3D4143, map: texture } );

    // three renderer
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.4;
    //controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotate = false;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 5.0;    //自動回転する時の速度

    container = document.getElementById("container");
    container.appendChild( renderer.domElement );

    initEvents();
    initOimoPhysics();
    loop();
}

function loop() {
    requestAnimationFrame( loop );
    controls.update();
    renderer.render( scene, camera );
}

function addStaticBox(size, position, rotation) {
    var mesh = new THREE.Mesh( geos.box, mats.ground );
    mesh.scale.set( size[0], size[1], size[2] );
    mesh.position.set( position[0], position[1], position[2] );
    mesh.rotation.set( rotation[0]*ToRad, rotation[1]*ToRad, rotation[2]*ToRad );
    scene.add( mesh );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
}

function capsuleGeometry (radius, height, SRadius, SHeight) {
    var sRadius = SRadius || 20;
    var sHeight = SHeight || 10;
    var o0 = Math.PI*2;
    var o1 = Math.PI/2;
    var g = new THREE.Geometry();
    var m0 = new THREE.CylinderGeometry(radius, radius, height, sRadius, 1, true);
    var m1 = new THREE.SphereGeometry(radius, sRadius, sHeight, 0, o0, 0, o1);
    var m2 = new THREE.SphereGeometry(radius, sRadius, sHeight, 0, o0, o1, o1);
    var mtx0 = new THREE.Matrix4().makeTranslation(0,0,0);
    var mtx1 = new THREE.Matrix4().makeTranslation(0, height*0.5,0);
    var mtx2 = new THREE.Matrix4().makeTranslation(0, -height*0.5,0);
    g.merge( m0, mtx0);
    g.merge( m1, mtx1);
    g.merge( m2, mtx2);
    var geo = new THREE.BufferGeometry();
    geo.fromGeometry(g);
    return geo;
}

//----------------------------------
//  HUMAN KINEMATIC
//----------------------------------

function initHuman() {
    var older = document.body;
/*
    sliders = {
        speed : new UI.Slide(older, "speed", humanSets, 0.3, [5,100, 150, 20], 0.5, 0, ' ', 2),
        thighRange : new UI.Slide(older, "thigh Range", humanSets, 50, [5,140, 150, 20], 90,0, '°'),
        thighBase : new UI.Slide(older, "thigh Base", humanSets, 100, [5,180, 150, 20], 180, 0, '°'),
        calfRange : new UI.Slide(older, "calf Range", humanSets, 30, [5,220, 150, 20], 90,0, '°'),
        calfOffset : new UI.Slide(older, "calf Offset", humanSets, -1.57, [5,260, 150, 20], 3.14, -3.14, '°', 2),
        armRange : new UI.Slide(older, "arm Range", humanSets, 55, [5,300, 150, 20], 360,0, '°'),
        foreArmRange : new UI.Slide(older, "foreArm Range", humanSets, 20, [5,340, 150, 20], 75, 0, '°'),
        foreArmOffset : new UI.Slide(older, "foreArm Offset", humanSets, -1.57, [5,380, 150, 20], 3.14, -3.14, '°', 2),
        gravity : new UI.Slide(older, "gravity", humanSets, 0.88, [5,420, 150, 20], 1,0, 'g', 2),
    }
*/
    sliders = {
        speed : { value: 0.3 }, // new UI.Slide(older, "speed", humanSets, 0.3, [5,100, 150, 20], 0.5, 0, ' ', 2),
        thighRange : { value: 50 }, // new UI.Slide(older, "thigh Range", humanSets, 50, [5,140, 150, 20], 90,0, '°'),
        thighBase : { value: 100 }, // new UI.Slide(older, "thigh Base", humanSets, 100, [5,180, 150, 20], 180, 0, '°'),
        calfRange : { value: 30 }, // new UI.Slide(older, "calf Range", humanSets, 30, [5,220, 150, 20], 90,0, '°'),
        calfOffset : { value: -1.57 }, // new UI.Slide(older, "calf Offset", humanSets, -1.57, [5,260, 150, 20], 3.14, -3.14, '°', 2),
        armRange : { value: 55 }, // new UI.Slide(older, "arm Range", humanSets, 55, [5,300, 150, 20], 360,0, '°'),
        foreArmRange : { value: 20 }, // new UI.Slide(older, "foreArm Range", humanSets, 20, [5,340, 150, 20], 75, 0, '°'),
        foreArmOffset : { value: -1.57 }, // new UI.Slide(older, "foreArm Offset", humanSets, -1.57, [5,380, 150, 20], 3.14, -3.14, '°', 2),
        gravity : { value: 0.88 } // new UI.Slide(older, "gravity", humanSets, 0.88, [5,420, 150, 20], 1,0, 'g', 2),
    }
/*
    document.getElementById( "walk" ).addEventListener( "click", initWalk, false );
    document.getElementById( "run" ).addEventListener( "click", initRun, false );
*/

    human = new Human();
    human.zw = 1000;
    human.zh = 400;
    initWalk();
}

function initWalk() {
	human.initWalk();
//	slideUpdate();
}

function initRun() {
	human.initRun();
//	slideUpdate();
}

function slideUpdate() {
	for ( var key in sliders ){
		sliders[ key ].value = human.sets[ key ];
	    sliders[ key ].updatePosition();
	}
}

function humanSets() {
    for ( var key in sliders ){
		human.sets[ key ] = sliders[ key ].value;
	}
}

//----------------------------------
//  OIMO PHYSICS
//----------------------------------

function initOimoPhysics(){
    collisionGroupes = {
        group1 : 1 << 0,  // 00000000 00000000 00000000 00000001
        group2 : 1 << 1,  // 00000000 00000000 00000000 00000010
        group3 : 1 << 2,  // 00000000 00000000 00000000 00000100
        all : 0xffffffff  // 11111111 11111111 11111111 11111111
    };

    world = new OIMO.World(1/60, 2, 8, true);

    var ground = new OIMO.Body({size:[1000, 40, 1000], pos:[0,-18,0], world:world});
    addStaticBox([1000, 40, 1000], [0,-18,0], [0,0,0]);

    // make physics humans
    initHuman();

    var bone, name, size, pos;
    for ( var i=0; i<nHuman; i++ ){
        for ( var key in human.bones ){
            bone = human.bones[ key ];
            name = key+i;
            pos = [bone.x, bone.y, bone.z];
            size = [bone.height, bone.width, bone.deepth];
            if(key == 'head') addOimoObject(name, pos, [16], 1);
            else addOimoObject(name, pos, size, 2);
        }
    }

    // add random object
    var config = [1,0.4,0.2, collisionGroupes.group2, collisionGroupes.all];
    var x, y, z, w, h, d;
/*
    var i = 100;

    while (i--){
        t = Math.floor(Math.random()*2)+1;
        x = -400 + Math.random()*800;
        z = -400 + Math.random()*800;
        y = 100 + Math.random()*1000;
        w = 10 + Math.random()*30;
        h = 10 + Math.random()*30;
        d = 10 + Math.random()*30;

        if(t===1){
            bodys[i] = new OIMO.Body({type:'sphere', size:[w*0.5], pos:[x,y,z], move:true, world:world, config:config});
            meshs[i] = new THREE.Mesh( geos.sphere, mats.sph );
            meshs[i].scale.set( w*0.5, w*0.5, w*0.5 );
        } else if(t===2){
            bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world, config:config});
            meshs[i] = new THREE.Mesh( geos.box, mats.box );
            meshs[i].scale.set( w, h, d );
        }

        meshs[i].castShadow = true;
        meshs[i].receiveShadow = true;

        scene.add( meshs[i] );
    }
*/
    //var texture = THREE.ImageUtils.loadTexture('football.png');  // Football.png
    var texture = THREE.ImageUtils.loadTexture('../../assets/s/s/X/x/ssXxc.png');  // Football.png
    for ( var i = 0; i < dataSet.length; i++ ) {
        //x = 150;
        x = -200 + (i % 16) * 32; //  + Math.random()*10;
        y = 0;
        z = -100 + (Math.floor(i / 16)) * 30;
        w = 30; // + Math.random()*10;
        h = 30; // + Math.random()*10;
        d = 30; // + Math.random()*10;
        bodys[i] = new OIMO.Body({type:'sphere', size:[w*0.5], pos:[x,y,z], move:true, world:world, config:config});
        //var material = new THREE.MeshLambertMaterial( { color: Math.floor(getRgbColor(dataSet[i])) } );
        var material = new THREE.MeshLambertMaterial({ color: Math.floor(getRgbColor(dataSet[i])), map: texture });
        meshs[i] = new THREE.Mesh( geos.sphere, material );
        //meshs[i] = new THREE.Mesh( geos.sphere, mats.sph );
        meshs[i].scale.set( w*0.5, w*0.5, w*0.5 );
        meshs[i].castShadow = true;
        meshs[i].receiveShadow = true;
        scene.add( meshs[i] );
    }
    
    setInterval(updateOimoPhysics, 1000/60);
}

function addOimoObject(name, pos, size, type) {
    var config = [10,0.4,0.2, collisionGroupes.group1, collisionGroupes.group2];
    var mesh, body;
    var pos = pos || [0, 0, 0];
    var size = size || [10, 10, 10];
    if(type==1){
        body = new OIMO.Body({type:'sphere', name:name, size:size, pos:pos, move:true, noSleep:true, world:world, config:config});
        mesh = new THREE.Mesh( geos.sphere, mats.ssph );
        mesh.scale.set( size[0], size[0], size[0] );
    } else if(type==2){
        body = new OIMO.Body({type:'box', name:name, size:size, pos:pos, move:true, noSleep:true, world:world, config:config});
        mesh = new THREE.Mesh( capsuleGeometry(size[0]/2, size[1]-(size[0]/2)), mats.box );
        if(name.substr(0,4) == 'body')mesh.scale.set(1,1,1.8);
    } else {
        body = new OIMO.Body({type:'box', name:name, size:size, pos:pos, move:true, noSleep:true, world:world, config:config});
        mesh = new THREE.Mesh( geos.box, mats.box );
        mesh.scale.set( size[0], size[1], size[2] );
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );

    Hmeshs[name] = mesh;
    Hbodys[name] = body;
}

function updateOimoPhysics() {
    world.step();

    //update humans
    human.update();
    var bone, name;
    var mtx, mtx2;
    var pos = new THREE.Vector3(), quat = new THREE.Quaternion();
    for ( var i=0; i<nHuman; i++ ){
        for ( var key in human.bones ){
            bone = human.bones[ key ];
            name = key+i;

            mtx = new THREE.Matrix4();
            //mtx.makeTranslation( bone.x-500, 400-bone.y, bone.z+(i*120)-250);
            mtx.makeTranslation( bone.x-500, 400-bone.y, bone.z+(i*50)-350);

            mtx2 = new THREE.Matrix4();
            mtx2.makeRotationZ( -bone.rotation+(90*ToRad ));
            mtx.multiply( mtx2 );

            mtx2 = new THREE.Matrix4();
            mtx2.makeTranslation( 0,-bone.width*0.5,0);
            mtx.multiply( mtx2 );

            pos.setFromMatrixPosition( mtx );
            quat.setFromRotationMatrix( mtx );

            Hbodys[name].setPosition(pos);
            Hbodys[name].setQuaternion(quat);
            Hmeshs[name].position.copy(pos);
            Hmeshs[name].quaternion.copy(quat);
        }
    }

    // update random object
    var x, y, z;
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
            if(mesh.material.name === 'sbox') mesh.material = mats.box;
            if(mesh.material.name === 'ssph') mesh.material = mats.sph; 

            // reset position
            if(mesh.position.y<-100){
                x = -100 + Math.random()*200;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                body.resetPosition(x,y,z);
            }
        } else {
            if(mesh.material.name === 'box') mesh.material = mats.sbox;
            if(mesh.material.name === 'sph') mesh.material = mats.ssph;
        }
    }
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
