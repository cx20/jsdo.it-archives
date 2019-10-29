// forked from cx20's "Three.js で某スイーツを作ってみるテスト（改）" http://jsdo.it/cx20/sDJ1
// forked from cx20's "Three.js で某スイーツを作ってみるテスト" http://jsdo.it/cx20/MtFq
// forked from cx20's "Three.js + Constructive Solid Geometry ライブラリを試してみるテスト" http://jsdo.it/cx20/7zTG
// forked from Lee Stemkoski's "Three.js tutorials by example" https://stemkoski.github.io/Three.js/CSG.html

// MAIN

// standard global variables
var container, scene, camera, renderer, controls;
var clock = new THREE.Clock();
// custom global variables
var meshs = [];

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
	//controls.maxPolarAngle = Math.PI * 0.25;
	controls.autoRotate = false;     //true:自動回転する,false:自動回転しない
	controls.autoRotateSpeed = -2.0;    //自動回転する時の速度

	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	
    // SKYBOX/FOG
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	//var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x999999, side: THREE.BackSide } );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xf0f0f0, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	////////////
	// CUSTOM //
	////////////
	
	meshs[0] = createMesh({type:"sphere"});
	//meshs[1] = createMesh({type:"polyhedron"});
	meshs[1] = createMesh({type:"ufo"});
	
	meshs[0].position.x -= 75;
	meshs[1].position.x += 75;
	
	scene.add( meshs[0] );
	scene.add( meshs[1] );
}

function createMesh( param ) {
	var group = new THREE.Object3D();
	
	var materialBrown = new THREE.MeshPhongMaterial( { color: 0x6e4831 });
	var materialWhite = new THREE.MeshPhongMaterial( { color: 0xf0f0f0 });
	
	var cubeGeometry1 = new THREE.CubeGeometry( 100, 100, 100, 1, 1, 1 );
	var cubeGeometry2 = new THREE.CubeGeometry( 200, 200, 200, 1, 1, 1 );

	var cubeMesh1 = new THREE.Mesh( cubeGeometry1 );
	var cubeMesh2 = new THREE.Mesh( cubeGeometry1 );
	var cubeMesh3 = new THREE.Mesh( cubeGeometry2 );

	if ( param.type == "ufo" ) {
		cubeMesh1.position.y -= 15;
		cubeMesh2.position.y -= 15;
		cubeMesh3.position.y += 30;
	}
	cubeMesh1.rotation.x = Math.PI * 45/180;
	cubeMesh1.position.y += 135;
	var cubeBSP1 = new ThreeBSP( cubeMesh1 );

	cubeMesh2.rotation.z = Math.PI * 45/180;
	cubeMesh2.position.y += 135;
	var cubeBSP2 = new ThreeBSP( cubeMesh2 );

	cubeMesh3.position.y -= 70;
	var cubeBSP3 = new ThreeBSP( cubeMesh3 );
	
	var sphereGeometry1;
	var sphereGeometry2;
	
	if ( param.type == "sphere" ) {
		sphereGeometry1 = new THREE.SphereGeometry( 80, 16, 16 );
		sphereGeometry2 = new THREE.SphereGeometry( 60, 16, 16 );
	} else if ( param.type == "polyhedron" ) {
		sphereGeometry1 = new THREE.IcosahedronGeometry( 80, 2 );
		sphereGeometry2 = new THREE.IcosahedronGeometry( 60, 2 );
	} else if ( param.type == "ufo" ) {
		var points = [];
		for ( var t = 0; t < 90; t+= 10 ) {
			x = t*0.9;
			z = 20 * Math.cos(2*Math.PI*t/180);
			points.push( new THREE.Vector3( x, 0, z ) );
		}
		points.push( new THREE.Vector3( 0, 0, -20 ) );
		sphereGeometry1 = new THREE.LatheGeometry(points, 16);
		// LatheGeometry() は Z 軸回転したオブジェクトであるため
		// 強制的に軸を回転させ他のオブジェクトに合わせる
		for ( var i = 0; i < sphereGeometry1.vertices.length; i++ ) {
			var v = sphereGeometry1.vertices[i];
			var tmp = v.y;
			v.y = v.z + 50;
			v.z = tmp;
		}
		//sphereGeometry1 = new THREE.IcosahedronGeometry( 80, 2 );
		sphereGeometry2 = new THREE.IcosahedronGeometry( 60, 2 );
	}

	var sphereMesh = new THREE.Mesh( sphereGeometry1 );
	var sphereBSP = new ThreeBSP( sphereMesh );

	var sphereMesh2 = new THREE.Mesh( sphereGeometry2 );
	sphereMesh2 .position.y += 15;
	var sphereBSP2 = new ThreeBSP( sphereMesh2 );

	// パンケーキ部分
	var newBSP1 = sphereBSP.subtract( cubeBSP1 );
	newBSP1 = newBSP1.subtract( cubeBSP2 );
	if ( param.type != "ufo" ) {
		newBSP1 = newBSP1.subtract( cubeBSP3 );
	}
	var newMesh1 = newBSP1.toMesh( materialBrown );
	
	// クリーム部分
	var newBSP2 = sphereBSP2.subtract( cubeBSP3 );
	var newMesh2 = newBSP2.toMesh( materialWhite );
	if ( param.type == "ufo" ) {
		newMesh2.position.y -= 14;
	}

	group.add( newMesh1 );
	group.add( newMesh2 );
	
	return group;
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
	meshs[0].rotation.y += 0.01;
	meshs[1].rotation.y += 0.01;
}

function render() 
{
	renderer.render( scene, camera );
}
