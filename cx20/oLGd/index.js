// forked from cx20's "Three.js で某スイーツを作ってみるテスト" http://jsdo.it/cx20/MtFq
// forked from cx20's "Three.js + Constructive Solid Geometry ライブラリを試してみるテスト" http://jsdo.it/cx20/7zTG
// forked from Lee Stemkoski's "Three.js tutorials by example" https://stemkoski.github.io/Three.js/CSG.html

// MAIN

// standard global variables
var container, scene, camera, renderer, controls;
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	
    // CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	

    // RENDERER
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );

    // CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.25;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0;    //自動回転する時の速度
	
    // LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	
    // SKYBOX/FOG
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xf0f0f0, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	////////////
	// CUSTOM //
	////////////
	
	var materialBrown = new THREE.MeshPhongMaterial( {
		color: 0x6e4831,
	});
	var materialWhite = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
	});

	var cubeGeometry1 = new THREE.CubeGeometry( 100, 100, 100, 1, 1, 1 );
	var cubeGeometry2 = new THREE.CubeGeometry( 200, 200, 200, 1, 1, 1 );

	var cubeMesh1 = new THREE.Mesh( cubeGeometry1 );
	cubeMesh1.rotation.x = Math.PI * 45/180;
	cubeMesh1.position.y += 135;
	var cubeBSP1 = new ThreeBSP( cubeMesh1 );

	var cubeMesh2 = new THREE.Mesh( cubeGeometry1 );
	cubeMesh2.rotation.z = Math.PI * 45/180;
	cubeMesh2.position.y += 135;
	var cubeBSP2 = new ThreeBSP( cubeMesh2 );

	var cubeMesh3 = new THREE.Mesh( cubeGeometry2 );
	cubeMesh3.position.y -= 70;
	var cubeBSP3 = new ThreeBSP( cubeMesh3 );
		
	var sphereGeometry1 = new THREE.SphereGeometry( 80, 48, 48 );
	var sphereGeometry2 = new THREE.SphereGeometry( 60, 32, 32 );

	var simplexNoise = new SimplexNoise();
	// パンケーキの形にパーリンノイズを加える
	for (var i = 0; i < sphereGeometry1.vertices.length; i++) {
		var v = sphereGeometry1.vertices[i];
		v.z = v.z + 2 * simplexNoise.noise(v.x / 50, v.y / 50);
		v.y = v.y + 2 * simplexNoise.noise(v.x / 50, v.z / 50);
		sphereGeometry1.vertices[i] = v;
	}
	
	// ホイップクリームの形にパーリンノイズを加える
	for (var i = 0; i < sphereGeometry2.vertices.length; i++) {
		var v = sphereGeometry2.vertices[i];
		v.z = v.z + 1 * simplexNoise.noise(v.x / 30, v.y / 30);
		v.y = v.y + 1 * simplexNoise.noise(v.x / 10, v.z / 10);
		sphereGeometry2.vertices[i] = v;
	}

	var sphereMesh = new THREE.Mesh( sphereGeometry1 );
	var sphereBSP = new ThreeBSP( sphereMesh );

	var sphereMesh2 = new THREE.Mesh( sphereGeometry2 );
	sphereMesh2 .position.y += 15;
	var sphereBSP2 = new ThreeBSP( sphereMesh2 );

	// パンケーキ部分
	var newBSP1 = sphereBSP.subtract( cubeBSP1 );
	newBSP1 = newBSP1.subtract( cubeBSP2 );
	newBSP1 = newBSP1.subtract( cubeBSP3 );
	var newMesh1 = newBSP1.toMesh( materialBrown );
	
	// ホイップクリーム部分
	var newBSP2 = sphereBSP2.subtract( cubeBSP3 );
	var newMesh2 = newBSP2.toMesh( materialWhite );

	scene.add( newMesh1 );
	scene.add( newMesh2 );
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	controls.update();
}

function render() 
{
	renderer.render( scene, camera );
}
