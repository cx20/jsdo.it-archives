// forked from Szenia Zadvornykh's "Decay" http://zadvorsky.com/projects/threejs_07/

var DOT_SIZE = 20;
var X_START_POS = -8 * DOT_SIZE;
var Y_START_POS = -8 * DOT_SIZE;
var Z_START_POS = -4.5 * DOT_SIZE;

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
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤","無",
    "無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤",
    "無","無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤","無",
    "無","無","無","無","無","無","無","無","無","無","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","無","無","無","無","無","赤","赤","赤","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","茶",
    "無","無","無","無","無","無","無","無","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","無","無","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","無","無","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","赤","赤","赤","無","無","無","肌","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","肌","肌","肌",
    "無","無","無","無","無","茶","茶","茶","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","茶","肌","無","無","無","無","無","無","無","赤","赤","赤",
    "無","無","無","無","茶","肌","無","無","無","無","無","茶","赤","赤","赤","赤",
    "無","無","無","無","茶","茶","無","無","無","無","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","赤","赤","無","無",
    "無","無","無","無","無","無","無","無","無","青","青","赤","赤","無","無","無",
    "無","無","無","無","無","無","無","無","無","青","赤","赤","赤","無","無","茶",
    "無","無","無","無","無","無","無","無","青","青","青","青","青","無","無","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","無","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","無","無","無","無","無","赤","赤","赤","赤","青","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","赤","青","無","無","茶",
    "無","無","無","無","無","無","赤","赤","赤","青","青","青","青","無","無","茶",
    "無","無","無","無","無","青","赤","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","無","無","無","無","青","青","青","青","青","無","無","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","無","無","無","無","赤","青","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","青","赤","赤","赤","無","無","無","茶",
    "無","無","無","無","無","無","赤","赤","青","青","青","青","青","無","無","茶",
    "無","無","無","無","無","青","赤","青","青","青","青","青","黄","無","茶","茶",
    "無","無","無","茶","無","青","青","青","青","青","青","青","青","無","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","無","茶","茶",
    "無","茶","茶","茶","無","無","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","無","無","無","青","赤","青","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","青","赤","赤","青","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","青","赤","赤","青","青","青","無","無","無","無","無",
    "無","無","無","無","無","青","赤","青","青","青","青","青","無","無","無","無",
    "無","無","無","茶","無","青","青","青","青","青","青","青","無","無","無","無",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","無","無","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","無","無","無","無","無",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","無","無","無","無","無",
    "肌","肌","肌","無","無","無","赤","青","青","青","青","青","無","無","無","無",
    "無","肌","無","茶","無","無","青","青","青","青","青","青","無","無","無","無",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無",
    "無","無","無","無","無","茶","茶","茶","肌","肌","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","無","無",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","無","無",
    "無","無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","無","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","無","無","無","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","無","無","無","無","無","無",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","無","無","無","無","無","無",
    "肌","肌","肌","無","無","無","赤","青","青","黄","無","無","無","無","無","無",
    "無","肌","無","茶","無","無","青","青","青","青","青","無","無","無","無","無",
    "無","無","茶","茶","茶","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
    ],
    [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","無","無","無","赤","赤","赤","無","無","無","無","無","無",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","無","無","無",
    "無","無","無","無","無","茶","茶","茶","無","無","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","無","無","無","無","無","無","無","無","無","無",
    "無","無","無","無","茶","肌","無","無","無","無","無","茶","無","無","無","無",
    "無","無","無","無","茶","茶","無","無","無","無","茶","茶","茶","無","無","無",
    "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
    "無","無","赤","赤","赤","赤","赤","青","無","無","無","無","無","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","無","無","無","無","無","無","無",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","無","無","無","無","無","無","無",
    "肌","肌","肌","無","無","無","無","青","青","無","無","無","無","無","無","無",
    "無","肌","無","茶","無","無","青","青","青","青","無","無","無","無","無","無",
    "無","無","茶","茶","茶","無","青","青","青","青","無","無","無","無","無","無",
    "無","茶","茶","茶","無","無","青","青","青","青","無","無","無","無","無","無",
    "無","茶","無","無","無","無","無","無","無","無","無","無","無","無","無","無"
    ]
];

function getRgbColor( c )
{
	var colorHash = {
		"無":"#000000",
		"白":"#ffffff",
		"肌":"#ffcccc",
		"茶":"#800000",
		"赤":"#ff0000",
		"黄":"#ffff00",
		"緑":"#00ff00",
		"水":"#00ffff",
		"青":"#0000ff",
		"紫":"#800080"
	};
	return colorHash[ c ];
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 128);
    var g = Math.floor(Math.random() * 128);
    var b = Math.floor(Math.random() * 128);
    return "rgb(" + r + "," + g + "," + b + ")";
}

var container;
var camera, scene, renderer;

var shaderUniforms, shaderAttributes;

var model;

var animationTime = 0;
var animationDuration = 0; // calculated after the model is loaded
var animationDelta = 1 / 60;
var animationDirection = 1; // 1 or -1
var paused = true;

var quat;

init();

function init() {
    createScene();
    createModel();

    window.addEventListener('resize', onWindowResize, false);
}

function createScene() {
    container = document.getElementById('container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300;
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xFFFFFF, 1);

    container.appendChild(renderer.domElement);
}

function createModel() {
    shaderAttributes = {
        aRotation: {
            type: "v4",
            value: []
        },
        aCentroid: {
            type: "v3",
            value: []
        },
        aTranslation: {
            type: "v3",
            value: []
        },
        aAnimation: {
            type: "v3",
            value: []
        },
    };

    shaderUniforms = {
        uTime: {
            type: "f",
            value: 0
        }
    };

    material = new THREE.ShaderMaterial({
        wireframe: true,
        vertexColors: THREE.VertexColors,
        attributes: shaderAttributes,
        uniforms: shaderUniforms,
        vertexShader: document.getElementById("vertexShader").textContent,
        fragmentShader: document.getElementById("fragmentShader").textContent,
        transparent: true
    });
    material.side = THREE.DoubleSide;
    
    function createMario() {
        var geometryCompound = new THREE.Geometry();
        var cube = new THREE.CubeGeometry(DOT_SIZE * 0.8, DOT_SIZE * 0.8, DOT_SIZE * 0.8);
        for (var j = 0; j < dataSet.length; j++) {
            for (var i = 0; i < dataSet[j].length; i++) {
                var x = -4 + (i % 16) * DOT_SIZE + X_START_POS;
                var y = -4 + (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
                var z = -2 + j * DOT_SIZE + Z_START_POS;

                if (dataSet[j][i] != "無") {
                    var material = new THREE.MeshLambertMaterial({
                        color: "#fff"
                    });
                    var mesh = new THREE.Mesh(cube, material);
                    mesh.position.x = x;
                    mesh.position.y = y;
                    mesh.position.z = z;
                    THREE.GeometryUtils.merge(geometryCompound, mesh);
                }
            }
        }
        return geometryCompound;
    }
    var geometry = createMario();
    loadModel(geometry);

    function loadModel(geometry) {
        var explodeModifier = new THREE.ExplodeModifier();
        explodeModifier.modify(geometry);

        geometry.computeVertexNormals();
        geometry.computeCentroids();
        geometry.computeBoundingBox();

        var xAxis = new THREE.Vector3(1, 0, 0);
        var yAxis = new THREE.Vector3(0, 1, 0);
        var zAxis = new THREE.Vector3(0, 0, 1);
        var twoPI = Math.PI * 2;
        var translationRange = Math.PI * 0.1;
        var boundingBox = geometry.boundingBox;
        var height = boundingBox.max.y - boundingBox.min.y;
        var width = boundingBox.max.x - boundingBox.min.x;
        var duration = 5.0;
        var maxDelay = 0;

        var colors = [];
        for (var i = 0; i < geometry.faces.length; i++) {
            var face = geometry.faces[i];

            // store centroid for rotation calculation
            var centroid = face.centroid;

            shaderAttributes.aCentroid.value[face.a] = centroid;
            shaderAttributes.aCentroid.value[face.b] = centroid;
            shaderAttributes.aCentroid.value[face.c] = centroid;
            // store axis and angle for rotation calculation
            var axis = getRandomAxis();
            var angle = twoPI;
            var quat = new THREE.Vector4(axis.x, axis.y, axis.z, angle);

            shaderAttributes.aRotation.value[face.a] = quat;
            shaderAttributes.aRotation.value[face.b] = quat;
            shaderAttributes.aRotation.value[face.c] = quat;

            // store translation
            var translation = new THREE.Vector3(0, 1000, 0);

            translation.applyAxisAngle(xAxis, randomRange(-translationRange, translationRange));
            translation.applyAxisAngle(zAxis, randomRange(-translationRange, translationRange));
            translation.applyAxisAngle(zAxis, randomRange(-translationRange, translationRange));

            shaderAttributes.aTranslation.value[face.a] = translation;
            shaderAttributes.aTranslation.value[face.b] = translation;
            shaderAttributes.aTranslation.value[face.c] = translation;

            // store animation properties
            var xDelay = (1 - ((centroid.x + boundingBox.max.x) / width)) * 3.0;
            var yDelay = (1 - ((centroid.y + boundingBox.max.y) / height)) * 15.0;
            var rDelay = randomRange(0, 1.5);
            var delay = xDelay + yDelay + rDelay;
            var animation = new THREE.Vector3(duration, delay);

            shaderAttributes.aAnimation.value[face.a] = animation;
            shaderAttributes.aAnimation.value[face.b] = animation;
            shaderAttributes.aAnimation.value[face.c] = animation;

            if (delay > maxDelay) maxDelay = delay;
        }
        animationDuration = duration + maxDelay;

        model = new THREE.Mesh(geometry, material);
        scene.add(model);

        tick();
    }
}

function tick() {
    requestAnimationFrame(tick);

    update();
    render();
}

function update() {
    shaderUniforms.uTime.value = animationTime;
    shaderUniforms.uTime.needsUpdate = true;

    animationTime += animationDelta;
}

var theta = 0;

function render() {
    camera.lookAt(scene.position);
    camera.position.x = 300 * Math.sin(theta * Math.PI / 180) * -1; // 逆回転
    camera.position.y = 300 * Math.cos(60 * Math.PI / 180);
    camera.position.z = 300 * Math.cos(theta * Math.PI / 180);

    theta += 0.5;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// utils
function getRandomAxis() {
    return new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
