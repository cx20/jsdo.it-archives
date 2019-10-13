// forked from cx20's "Three.js + LiquidFun.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/AmQ3
// forked from cx20's "forked: liquidfun test 3 (THREE.PointCloud)" http://jsdo.it/cx20/Avs3
// forked from ohisama1's "liquidfun test 3 (THREE.PointCloud)" http://jsdo.it/ohisama1/soOd

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
// ‥‥‥‥‥‥‥‥‥■■□□□〓‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
// ‥‥‥‥‥‥‥‥■■■□□〓〓‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
// ‥‥‥‥‥‥□□■■■■〓〓■‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
// ‥‥〓‥‥■□□■■■■■■■‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
// ‥〓‥〓■■□□■■■■■■■■‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
// ‥〓〓〓□□□■■■〓■■■■■‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
// ‥〓〓〓〓□■■■〓〓〓■■■■‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥
// ‥□〓〓〓■■〓〓□■〓■■■■□□■■■□‥‥‥‥‥‥‥‥‥‥‥‥
// ‥‥□‥〓〓〓〓■■■〓■■■■□□■■□□〓■‥‥‥‥‥‥‥‥‥‥
// ‥‥□‥□□■‥■■□〓■■■■□□■□□□〓〓■□□□‥‥‥‥‥‥
// ‥‥‥‥‥□‥‥‥■〓〓■■■□□□■■□〓〓■■□□〓‥‥‥‥‥‥
// ‥‥‥‥‥‥‥‥‥‥〓〓■■□□□■■■■■■■■■〓〓■□‥‥‥‥
// ‥‥‥‥‥‥‥‥‥〓〓■■□□□■■■■■■■■■■■■■□‥‥‥‥
// ‥‥‥‥‥‥‥‥〓〓〓■■□□□■■■■■■■□□□■■■■‥‥‥‥
// ‥‥‥‥‥‥‥‥〓〓‥‥■■□□□□□□■■■□□〓■■□□□‥‥‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥■■〓〓〓□□■■■〓〓■■□□〓‥‥‥
// ‥‥‥‥‥‥‥‥‥‥〓〓〓‥‥□‥〓〓〓□□■■■■■■■〓〓‥‥‥
// ‥‥‥‥‥‥‥‥‥〓〓□‥〓〓〓‥□〓〓■□■■■■■■■■■□‥‥
// ‥‥‥‥‥‥‥‥‥〓〓‥‥〓〓〓〓‥‥■■□■■■□□□■■■〓□‥
// ‥‥‥‥‥‥‥‥‥〓□‥〓〓〓〓〓〓□■■□□■■□□〓■■■‥‥‥
// ‥‥‥‥‥‥‥‥‥〓‥‥〓〓〓〓〓■■■■□□■■■〓〓■■□□‥‥
// ‥‥‥‥‥‥‥‥‥‥□‥〓〓〓〓〓■■■■□□■■■■■■■□□□‥
// ‥‥‥‥‥‥‥‥‥‥‥‥□〓〓〓‥■■■■■□■■■■□□■〓〓‥‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥■■■■■□□■■■〓■■〓■‥‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥■■■■■□□□■■■■■■‥‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥■■■■■□□□□■■■■‥‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥〓■■■■■■□□□□□□□‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥□〓〓■■〓〓〓〓□□□□□‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥□□〓〓〓〓〓〓〓〓〓〓□□‥‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥□□〓〓□□〓〓〓〓‥‥‥
// ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥□□□〓□□□〓〓〓〓〓‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","白","白","白","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","緑","緑","白","白","白","黄","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","緑","緑","緑","白","白","黄","黄","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","白","白","緑","緑","緑","緑","黄","黄","緑","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","黄","無","無","緑","白","白","緑","緑","緑","緑","緑","緑","緑","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "黄","無","黄","緑","緑","白","白","緑","緑","緑","緑","緑","緑","緑","緑","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "黄","黄","黄","白","白","白","緑","緑","緑","黄","緑","緑","緑","緑","緑","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "黄","黄","黄","黄","白","緑","緑","緑","黄","黄","黄","緑","緑","緑","緑","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "白","黄","黄","黄","緑","緑","黄","黄","白","緑","黄","緑","緑","緑","緑","白","白","緑","緑","緑","白","無","無","無","無","無","無","無","無","無","無","無",
    "無","白","無","黄","黄","黄","黄","緑","緑","緑","黄","緑","緑","緑","緑","白","白","緑","緑","白","白","黄","緑","無","無","無","無","無","無","無","無","無",
    "無","白","無","白","白","緑","無","緑","緑","白","黄","緑","緑","緑","緑","白","白","緑","白","白","白","黄","黄","緑","白","白","白","無","無","無","無","無",
    "無","無","無","無","白","無","無","無","緑","黄","黄","緑","緑","緑","白","白","白","緑","緑","白","黄","黄","緑","緑","白","白","黄","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","黄","黄","緑","緑","白","白","白","緑","緑","緑","緑","緑","緑","緑","緑","緑","黄","黄","緑","白","無","無","無",
    "無","無","無","無","無","無","無","無","黄","黄","緑","緑","白","白","白","緑","緑","緑","緑","緑","緑","緑","緑","緑","緑","緑","緑","緑","白","無","無","無",
    "無","無","無","無","無","無","無","黄","黄","黄","緑","緑","白","白","白","緑","緑","緑","緑","緑","緑","緑","白","白","白","緑","緑","緑","緑","無","無","無",
    "無","無","無","無","無","無","無","黄","黄","無","無","緑","緑","白","白","白","白","白","白","緑","緑","緑","白","白","黄","緑","緑","白","白","白","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","緑","緑","黄","黄","黄","白","白","緑","緑","緑","黄","黄","緑","緑","白","白","黄","無","無",
    "無","無","無","無","無","無","無","無","無","黄","黄","黄","無","無","白","無","黄","黄","黄","白","白","緑","緑","緑","緑","緑","緑","緑","黄","黄","無","無",
    "無","無","無","無","無","無","無","無","黄","黄","白","無","黄","黄","黄","無","白","黄","黄","緑","白","緑","緑","緑","緑","緑","緑","緑","緑","緑","白","無",
    "無","無","無","無","無","無","無","無","黄","黄","無","無","黄","黄","黄","黄","無","無","緑","緑","白","緑","緑","緑","白","白","白","緑","緑","緑","黄","白",
    "無","無","無","無","無","無","無","無","黄","白","無","黄","黄","黄","黄","黄","黄","白","緑","緑","白","白","緑","緑","白","白","黄","緑","緑","緑","無","無",
    "無","無","無","無","無","無","無","無","黄","無","無","黄","黄","黄","黄","黄","緑","緑","緑","緑","白","白","緑","緑","緑","黄","黄","緑","緑","白","白","無",
    "無","無","無","無","無","無","無","無","無","白","無","黄","黄","黄","黄","黄","緑","緑","緑","緑","白","白","緑","緑","緑","緑","緑","緑","緑","白","白","白",
    "無","無","無","無","無","無","無","無","無","無","無","白","黄","黄","黄","無","緑","緑","緑","緑","緑","白","緑","緑","緑","緑","白","白","緑","黄","黄","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","緑","緑","緑","緑","緑","白","白","緑","緑","緑","黄","緑","緑","黄","緑","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","緑","緑","緑","緑","緑","白","白","白","緑","緑","緑","緑","緑","緑","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","緑","緑","緑","緑","緑","白","白","白","白","緑","緑","緑","緑","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","黄","緑","緑","緑","緑","緑","緑","白","白","白","白","白","白","白",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","白","黄","黄","緑","緑","黄","黄","黄","黄","白","白","白","白","白",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","白","白","黄","黄","黄","黄","黄","黄","黄","黄","黄","黄","白","白","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","白","白","黄","黄","白","白","黄","黄","黄","黄","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","白","白","白","黄","白","白","白","黄","黄","黄","黄","黄","無"
];

function getRgbColor( c )
{
    var colorHash = {
        //"無":0x000000,
        //"無":0xDCAA6B,
        "無":0x00A2F0,
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

var scene, camera, renderer, pc;
var world = null;
var timeStep = 1.0 / 60.0;
var velocityIterations = 8;
var positionIterations = 3;
var g_groundBody = null;
var test;
var METER = 100;
var OFFSET_X = 0;
var OFFSET_Y = 0 ;
var windowWidth = 400;
var windowHeight = 460;
function tick() {
    world.Step(timeStep, velocityIterations, positionIterations);

    var particles = world.particleSystems[0].GetPositionBuffer();
    var colors = [];
    for (var i = 0; i < particles.length / 2; i++)
    {       
        var x = particles[i * 2] * METER + OFFSET_X;
        var y = 465 - particles[(i * 2) + 1] * METER + OFFSET_Y;
        var z = 0;                                       
        var vertex = new THREE.Vector3(x, y, z);
        pc.geometry.vertices[i] = vertex;
    }
    pc.geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);    
    requestAnimationFrame(tick);
}

function WaveMachine() {
    var bdDef = new b2BodyDef();
    var bobo = world.CreateBody(bdDef);
    var wg = new b2PolygonShape();
    wg.SetAsBoxXYCenterAngle(
        windowWidth / METER / 2,
        0.05,
        new b2Vec2(windowWidth / METER / 2, windowHeight / METER + 0.05),
        0
    );
    bobo.CreateFixtureFromShape(wg, 5);
    var wgl = new b2PolygonShape(); 
    wgl.SetAsBoxXYCenterAngle(
        0.05,
        windowHeight / METER / 2,
        new b2Vec2(-0.05, windowHeight / METER / 2),
        0
    );
    bobo.CreateFixtureFromShape(wgl, 5);
    var wgr = new b2PolygonShape();
    wgr.SetAsBoxXYCenterAngle(
        0.05,
        windowHeight / METER / 2,
        new b2Vec2(windowWidth / METER + 0.05,
        windowHeight / METER / 2),
        0
    );
    bobo.CreateFixtureFromShape(wgr, 5);
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.025;
    psd.dampingStrength = 0.2;
    var particleSystem = world.CreateParticleSystem(psd);
    var box = new b2PolygonShape();
    box.SetAsBoxXYCenterAngle(
        2, 
        2, 
        new b2Vec2(windowWidth / 2 / METER, -windowHeight / 4 / METER), 
        0
    );
    var particleGroupDef = new b2ParticleGroupDef();
    particleGroupDef.shape = box;
    var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);
}

WaveMachine.prototype.Step = function() {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
}

function testSwitch(testName) {
    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);
    test = new window[testName];
}

function init(obj) {
    var width = 465; 
    var height = 465;
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(200, 200, 500);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    var container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(renderer.domElement);
    testSwitch("WaveMachine");

    var particles = world.particleSystems[0].GetPositionBuffer();
    var geometry = new THREE.Geometry();
    var colors = [];
    console.log( particles.length );
/*
    for (var i = 0; i < particles.length/2; i++)
    {       
        var x = particles[i * 2] * METER + OFFSET_X;
        var y = 465 - particles[(i * 2) + 1] * METER + OFFSET_Y;
        var z = 0;
        var vertex = new THREE.Vector3(x, y, z);
        //var color = new THREE.Color(0x6666ff);
        var color = new THREE.Color(Math.floor(Math.random() * 0xffffff));
        geometry.vertices.push(vertex);
        colors.push(color);
    }
*/
    for (var i = 0; i < particles.length/2; i++)
    {       
        var x = particles[i * 2] * METER + OFFSET_X;
        var y = particles[(i * 2) + 1] * METER + OFFSET_Y;
        var z = 0;
        var vertex = new THREE.Vector3(x, y, z);
        var x0 = Math.floor( (x-10) / 12 );
        var y0 = Math.floor( (310+y) / 12 );
        var pos = x0 + y0 * 32;
        //console.log( i + ", " + x + ", " + y + ", " + z + ", " + pos );
        console.log( x0 + ", " + y0 + ", " + pos );
        if ( x0 >= 0 && x0 < 32 
          && y0 >= 0 && y0 < 32
          && pos < dataSet.length ) {
            color = new THREE.Color(getRgbColor(dataSet[pos]));
        } else {
            color = new THREE.Color(0x00A2F0);
        }
        geometry.vertices.push(vertex);
        colors.push(color);
    }
    geometry.colors = colors;
    var material = new THREE.PointCloudMaterial({
        size : 5,
        transparent : true,
        opacity : 0.9,
        vertexColors : true
    });
    scene.remove(pc);
    pc = new THREE.PointCloud(geometry, material);
    scene.add(pc); 

    tick();
}

function onload() {
    var gravity = new b2Vec2(0, 10);
    world = new b2World(gravity);
    init();
}

onload();
