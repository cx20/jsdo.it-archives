// forked from cx20's "Matter.js + Three.js でドット絵を物理演算してみるテスト" http://jsdo.it/cx20/mN0X
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
        "無":"#f8fefd", 
        "白":"#ffffff",
        "肌":"#ffcccc",
        "茶":"#af5551",
        "赤":"#ff72d9",
        "黄":"#fee965",
        "緑":"#00ff00",
        "水":"#00ffff",
        "青":"#5999f1",
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
    camera.position.x = -600;
    camera.position.y = 200;
    camera.position.z = 800;

    var controls = new THREE.OrbitControls(camera);
    var scene = new THREE.Scene();

    // create a Matter.js engine
    engine = Engine.create({render: {visible: false}});

    // create two circles and a ground
    var circles = [];
    for (var i = 0; i < dataSet.length; i++) {
        var x = X_START_POS + (i % 16) * (DOT_SIZE + 5);
        var y = Y_START_POS + Math.floor(i / 16) * (DOT_SIZE + 5);
        var s = DOT_SIZE;
        circles.push(Bodies.circle(x, y, DOT_SIZE * 0.5, {
            friction: 0.00001,
            restitution: 0.5,
            density: 0.001
        }));
    }

    var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});
    var wallA = Bodies.rectangle(0, 305, 60, 670, {isStatic: true});
    var wallB = Bodies.rectangle(800, 305, 60, 670, {isStatic: true});
    var ceiling = Bodies.rectangle(400, 0, 810, 60, {isStatic: true});

    // add all of the bodies to the world
    World.add(engine.world, circles);
    World.add(engine.world, [ground, wallA, wallB, ceiling]);

    var bodies = [];
    var material = new THREE.MeshPhongMaterial({color: 0x276a4b});

    var group = new THREE.Object3D();
    scene.add(group);

    var pos = 0;
    for (var j = 0; j < engine.world.bodies.length; j++) {

        var b = engine.world.bodies[j];
        var w = b.bounds.max.x - b.bounds.min.x;
        var h = b.bounds.max.y - b.bounds.min.y;

        if (b.isStatic) {
            var geometry = new THREE.BoxGeometry(w, h, 170);
            m = new THREE.Mesh(geometry, material);
        } else {
            var color = getRgbColor(dataSet[pos]);
            var boxMaterial = new THREE.MeshPhongMaterial({color: color});
            var boxGeometry = new THREE.CylinderGeometry(w/2, w/2, 150);
            m = new THREE.Mesh(boxGeometry, boxMaterial);
            m.rotation.x = Math.PI / 2;
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
            bodies[j].position.set(b.x - 405, -(b.y - 305), 0)
        }

        renderer.render(scene, camera);
    }

    render();
}

window.addEventListener('load', init);
