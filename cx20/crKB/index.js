// forked from  Noel Delgado's "Three.js + TweenMax (Experiment)" http://codepen.io/noeldelgado/pen/QwWRwg/

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

/*
 * Noel Delgado - @pixelia_me
 * Inspiration: http://dingundding.tumblr.com/post/99836716906
 */

var _width, _height, PI, Utils, CUBE_SIZE, GRID, TOTAL_CUBES, WALL_SIZE, HALF_WALL_SIZE,
    MAIN_COLOR, SECONDARY_COLOR, cubes, renderer, camera, scene, group;

_width = window.innerWidth;
_height = window.innerHeight;
PI = Math.PI;

CUBE_SIZE = 16; /* width, height */
GRID = 16; /* cols, rows */
TOTAL_CUBES = (GRID * GRID);
WALL_SIZE = (GRID * CUBE_SIZE);
HALF_WALL_SIZE = (WALL_SIZE / 2);
MAIN_COLOR = 0xFFFFFF;
SECONDARY_COLOR = 0x222222;
cubes = [];

renderer = new THREE.WebGLRenderer({
    antialias: false
});
camera = new THREE.PerspectiveCamera(45, (_width / _height), 0.1, 10000);
scene = new THREE.Scene();
group = new THREE.Object3D();

Utils = {
    randomInRange: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

setupCamera(0, 0, 400);
setupCubes(group);
setupLights(group);
group.position.y = 50;
group.rotation.set(-60 * (PI / 180), 0, -45 * (PI / 180));
scene.add(group);
setupRenderer(document.body);

TweenLite.ticker.addEventListener("tick", render);
window.addEventListener('resize', resizeHandler, false);

function resizeHandler() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    renderer.setSize(_width, _height);
    camera.aspect = _width / _height;
    camera.updateProjectionMatrix();
}

function setupCamera(x, y, z) {
    camera.position.set(x, y, z);
    scene.add(camera);
}

function setupCubes(parent) {
    var i, geometry, material, x, y, row, col, minDuration, maxDuration, minDelay, maxDelay, attrOptions, attr, direction, config;

    x = 0;
    y = 0;
    row = 0;
    col = 0;
    minDuration = 3;
    maxDuration = 6;
    minDelay = 0.5;
    maxDelay = 6;
    attrOptions = ['x', 'y'];

    for (i = 0; i < TOTAL_CUBES; i++) {
        var color = getRgbColor(dataSet[i]);
        var geometry = new THREE.BoxGeometry(CUBE_SIZE * 0.9, CUBE_SIZE * 0.9, 1);
        var material = new THREE.MeshLambertMaterial({
            color: color
        });
        cubes.push(new THREE.Mesh(geometry, material));

        if ((i % GRID) === 0) {
            col = 1;
            row++;
        } else {
            col++;
        }

        x = -(((GRID * CUBE_SIZE) / 2) - ((CUBE_SIZE) * col) + (CUBE_SIZE / 2));
        y = (((GRID * CUBE_SIZE) / 2) - ((CUBE_SIZE) * row) + (CUBE_SIZE / 2));

        cubes[i].position.set(x, y, 0);
    }

    cubes.forEach(function(cube) {
        cube.castShadow = true;
        cube.receiveShadow = true;

        config = {
            ease: Elastic.easeOut,
            delay: Utils.randomInRange(minDelay, maxDelay),
            repeat: -1
        }
        attr = attrOptions[~~(Math.random() * attrOptions.length)];
        direction = (Math.random() < 0.5 ? -PI : PI);
        config[attr] = direction;

        TweenMax.to(
            cube.rotation,
            Utils.randomInRange(minDuration, maxDuration),
            config
        );

        parent.add(cube);
    });
}

function setupLights(parent) {
    var light, soft_light;

    light = new THREE.DirectionalLight(MAIN_COLOR, 1.25);
    soft_light = new THREE.DirectionalLight(MAIN_COLOR, 1.5);

    light.position.set(-WALL_SIZE, -WALL_SIZE, CUBE_SIZE * GRID);
    light.castShadow = true;
    light.shadowDarkness = 0.5;

    soft_light.position.set(WALL_SIZE, WALL_SIZE, CUBE_SIZE * GRID);

    parent.add(light).add(soft_light);
}

function setupRenderer(parent) {
    renderer.setSize(_width, _height);
    renderer.setClearColor(0x000000);
    renderer.shadowMapEnabled = true;
    parent.appendChild(renderer.domElement);
}

function render() {
    renderer.render(scene, camera);
}
