// forked from cx20's "forked: Three.js + TweenMax (Experiment)" http://jsdo.it/cx20/crKB
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
var dataSet = [];
var pixelTweet = "";

function getRgbColor( c )
{
	var colorHash = {
		"無":0xffffff,
		"黒":0x111111,
		"灰":0x444444,
		"白":0x777777
	};
	return colorHash[ c ];
}

// データ形式変換関数
function convertPixelTweetToDataSet( pixelTweet ) {
	var result = [];
	var hash = {
		"0":"無",
		"1":"黒",
		"2":"灰",
		"3":"白"
	};
	// ＜変換前＞
	// 000000000000000000
	// 000000000000003330
	// 000000011111003330
	// 000000111111111330
	// 000000222332302220
	// 000002323332332220
	// 000002322333233320
	// 000002233322222200
	// 000000033333332000
	// 000222221222120000
	// 002222222122210020
	// 033222222111110020
	// 033301121131131220
	// 003021111111111220
	// 000222111111111220
	// 002221111111100000
	// 002001111000000000
	// 000000000000000000
	// 
	// ＜変換後＞
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","白","白","白","無",
	// "無","無","無","無","無","無","無","黒","黒","黒","黒","黒","無","無","白","白","白","無",
	// "無","無","無","無","無","無","黒","黒","黒","黒","黒","黒","黒","黒","黒","白","白","無",
	// "無","無","無","無","無","無","灰","灰","灰","白","白","灰","白","無","灰","灰","灰","無",
	// "無","無","無","無","無","灰","白","灰","白","白","白","灰","白","白","灰","灰","灰","無",
	// "無","無","無","無","無","灰","白","灰","灰","白","白","白","灰","白","白","白","灰","無",
	// "無","無","無","無","無","灰","灰","白","白","白","灰","灰","灰","灰","灰","灰","無","無",
	// "無","無","無","無","無","無","無","白","白","白","白","白","白","白","灰","無","無","無",
	// "無","無","無","灰","灰","灰","灰","灰","黒","灰","灰","灰","黒","灰","無","無","無","無",
	// "無","無","灰","灰","灰","灰","灰","灰","灰","黒","灰","灰","灰","黒","無","無","灰","無",
	// "無","白","白","灰","灰","灰","灰","灰","灰","黒","黒","黒","黒","黒","無","無","灰","無",
	// "無","白","白","白","無","黒","黒","灰","黒","黒","白","黒","黒","白","黒","灰","灰","無",
	// "無","無","白","無","灰","黒","黒","黒","黒","黒","黒","黒","黒","黒","黒","灰","灰","無",
	// "無","無","無","灰","灰","灰","黒","黒","黒","黒","黒","黒","黒","黒","黒","灰","灰","無",
	// "無","無","灰","灰","灰","黒","黒","黒","黒","黒","黒","黒","黒","無","無","無","無","無",
	// "無","無","灰","無","無","黒","黒","黒","黒","無","無","無","無","無","無","無","無","無",
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
	//
	for ( var i = 0; i < pixelTweet.length; i++ ) {
		var x = i % 18;
		var y = Math.floor( i / 18 );
		if ( x > 0 && x < 17 && y > 0 && y < 17 ) {
			var c = pixelTweet[i];
			result.push(hash[c]);
		}
	}
	return result;
}

/*
 * Noel Delgado - @pixelia_me
 * Inspiration: http://dingundding.tumblr.com/post/99836716906
 */

var _width, _height, PI, Utils, CUBE_SIZE, GRID, TOTAL_CUBES, WALL_SIZE, HALF_WALL_SIZE,
    MAIN_COLOR, SECONDARY_COLOR, cubes, renderer, camera, scene, group;

var controls;

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

document.body.addEventListener('paste', function (e) {
    // 貼り付け直後の場合、テキストボックスが空のケースがある為、少し時間をおいて読み込ませる
    setTimeout( delayload, 100 );
}, false);


function toggleButton() {
    var button = document.getElementById("toggle");
    var pixelData = document.getElementById("pixelData");

    if (button.textContent == "show") {

        pixelData.style.display = "block";
        button.textContent = "hide";

    } else if (button.textContent == "hide") {

        pixelData.style.display = "none";
        button.textContent = "show";

    }
}

function clearData() {
	document.getElementById("pixelData").value = "";
}

function showSample() {
    // サンプルデータ設定
	document.getElementById("pixelData").value = "000000000000000000000000000000003330000000011111003330000000111111111330000000222332302220000002323332332220000002322333233320000002233322222200000000033333332000000222221222120000002222222122210020033222222111110020033301121131131220003021111111111220000222111111111220002221111111100000002001111000000000000000000000000000";
	delayload();
}

function delayload() {
    // データ形式変換
    pixelTweet = document.getElementById("pixelData").value;
    dataSet = convertPixelTweetToDataSet( pixelTweet );

    setupCamera(0, 0, 400);
    setupCubes(group);
    setupLights(group);
    group.position.y = 50;
    group.rotation.set(-60 * (PI / 180), 0, -45 * (PI / 180));
    scene.add(group);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 1.0;
    controls.autoRotate = false;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 5.0;    //自動回転する時の速度

    setupRenderer(document.body);
    TweenLite.ticker.addEventListener("tick", render);
    window.addEventListener('resize', resizeHandler, false);
}

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
    controls.update();
    renderer.render(scene, camera);
}
