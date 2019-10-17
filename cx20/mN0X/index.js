// forked from cx20's "Matter.js でドット絵を物理演算してみるテスト（その１改）" http://jsdo.it/cx20/vqD2
// forked from cx20's "Matter.js でドット絵を物理演算してみるテスト（その１）" http://jsdo.it/cx20/pjXR
var DOT_SIZE = 30;
var X_START_POS = 120;
var Y_START_POS = 80;
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
        //"無":"#000000",
        "無":"#dcaa6b",  // 段ボール色
        "白":"#ffffff",
        "肌":"#ffcccc",
        "茶":"#800000",
        "赤":"#ff0000",
        "黄":"#fee900",
        "緑":"#00ff00",
        "水":"#00ffff",
        "青":"#0000ff",
        "紫":"#800080"
    };
    return colorHash[ c ];
}

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
var engine;

function init() {

    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
    document.body.appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.x = -800;
    camera.position.y = 200;
    camera.position.z = 1000;

    var controls = new THREE.OrbitControls(camera);
    var scene = new THREE.Scene();

    // create a Matter.js engine
    engine = Engine.create(document.body);

    // create two boxes and a ground
    var boxes = [];
    for (var i = 0; i < dataSet.length; i++) {
        var x = X_START_POS + (i % 16) * (DOT_SIZE + 5);
        var y = Y_START_POS + Math.floor(i / 16) * (DOT_SIZE + 5);
        var s = DOT_SIZE;
        boxes.push(Bodies.rectangle(x, y, s, s, {
            angle: Math.PI * 0.01
        }));
    }

    var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});
    var wallA = Bodies.rectangle(0, 305, 60, 670, {isStatic: true});
    var wallB = Bodies.rectangle(800, 305, 60, 670, {isStatic: true});
    var ceiling = Bodies.rectangle(400, 0, 810, 60, {isStatic: true});

    // add all of the bodies to the world
    World.add(engine.world, boxes);
    World.add(engine.world, [ground, wallA, wallB, ceiling]);

    var bodies = [];
    var material = new THREE.MeshPhongMaterial({color: 0x005d00});

    var group = new THREE.Object3D();
    scene.add(group);

    var pos = 0;
    for (var j = 0; j < engine.world.bodies.length; j++) {

        var b = engine.world.bodies[j];
        var w = b.bounds.max.x - b.bounds.min.x;
        var h = b.bounds.max.y - b.bounds.min.y;

        if (b.isStatic) {
            var geometry = new THREE.BoxGeometry(w, h, 80);
            m = new THREE.Mesh(geometry, material);
        } else {
            var color = getRgbColor(dataSet[pos]);
            var boxMaterial = new THREE.MeshPhongMaterial({color: color});
            var boxGeometry = new THREE.BoxGeometry(w, h, 50);
            m = new THREE.Mesh(boxGeometry, boxMaterial);
            pos++;
        }

        group.add(m);
        bodies.push(m);
    }
    
    // back panel
    var m = new THREE.Mesh(new THREE.BoxGeometry(800, 600, 10), material);
    m.position.z = -40;
    group.add(m);

    // run the engine
    Engine.run(engine);

    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-30, 50, 40);
    scene.add(dirLight);

    function render() {

        requestAnimationFrame(render);

        for (var j = 0; j < engine.world.bodies.length; j++) {
            var b = engine.world.bodies[j].position;
            bodies[j].position.set(b.x - 405, -(b.y - 305), j*0.01 ); // Z-Fighting measures
        }

        renderer.render(scene, camera);
    }

    render();
}

window.addEventListener('load', init);
