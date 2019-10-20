// forked from cx20's "海に某使徒を追加してみるテスト" http://jsdo.it/cx20/fwzA
// forked from cx20's "Three.js の海のサンプルに飛行石を追加してみるテスト（改）" http://jsdo.it/cx20/Vmo5
// forked from cx20's "Three.js の海のサンプルに飛行石を追加してみるテスト" http://jsdo.it/cx20/uikZ
// forked from cx20's "Three.js + Water Shader を試してみるテスト" http://jsdo.it/cx20/5hXN
// forked from Jérémy BOUNY's "Ocean" https://github.com/jbouny/ocean/tree/master/demo

var container, stats;
var camera, scene, renderer;
var ROT_SPEED = 100;
var group_rot = 0;
var group;
var theta = 0;
var cylinders = [];
var angles = [];
var water;

var dataSet = [
	{ axis:{ x:0, y: 1, z:0 }, angle:Math.PI / 180, morphingType:'sin', position:{ x:0, y:25.0, z:0 }, radiusTop:0,    radiusBottom:12.5, height:12.5, radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y:-1, z:0 }, angle:Math.PI / 180, morphingType:'sin', position:{ x:0, y:12.5, z:0 }, radiusTop:12.5, radiusBottom:0,    height:12.5, radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y: 1, z:0 }, angle:Math.PI / 180, morphingType:'cos', position:{ x:0, y:20.0, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y: 1, z:0 }, angle:Math.PI / 120, morphingType:'cos', position:{ x:0, y:21.0, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y: 1, z:0 }, angle:Math.PI /  90, morphingType:'cos', position:{ x:0, y:22.0, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y:-1, z:0 }, angle:Math.PI /  90, morphingType:'cos', position:{ x:0, y:11.5 + 2, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y:-1, z:0 }, angle:Math.PI / 120, morphingType:'cos', position:{ x:0, y:12.5 + 2, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y:-1, z:0 }, angle:Math.PI / 180, morphingType:'cos', position:{ x:0, y:13.5 + 2, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
];

var parameters = {
	width: 2000,
	height: 2000,
	widthSegments: 250,
	heightSegments: 250,
	depth: 1500,
	param: 4,
	filterparam: 1
}

var waterNormals;

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	scene = new THREE.Scene();
//-------------------------------------------
	group = new THREE.Object3D();
	scene.add(group);

	// cylinder … 円筒形
	// API: THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
	//   radiusTop        … 上面の半径
	//   radiusBottom     … 下面の半径
	//   height           … 高さ
	//   radiusSegments   … 円周の分割数
	//   heightSegments   … 縦分割数
	//   openEnded        … false なら蓋をしない
	// 
	for ( var i = 0; i < dataSet.length; i++ ) {
		var data = dataSet[i];
		var geometry = new THREE.CylinderGeometry(
			data.radiusTop * 32,
			data.radiusBottom * 32,
			data.height * 32, 
			data.radiusSegments,
			data.heightSegments,
			data.openEnded);
		var cylinder = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x258fff }));
		cylinder.position.x = 0;
		cylinder.position.y = data.position.y * 32 - 200;
		cylinder.castShadow = true;  
		group.add(cylinder);
		cylinders.push( cylinder );
		angles.push( 0 );
	}
    
	var light = new THREE.DirectionalLight(0xffffff, 1.5);
	light.position.set(-10,50, 50).normalize();
	scene.add(light);
	var light2 = new THREE.DirectionalLight(0xffffff);
	light2.position.set(-100, 0, 50).normalize();
	scene.add(light2);
//-------------------------------------------
	camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 3000000 );

	camera.position.set( 0, Math.max( parameters.width * 1.5, parameters.height ) / 8, parameters.height );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.userPan = false;
	controls.userPanSpeed = 0.0;
	controls.maxDistance = 5000.0;
	controls.maxPolarAngle = Math.PI * 0.495;
	controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
	controls.autoRotateSpeed = -2.0;    //自動回転する時の速度

	directionalLight = new THREE.DirectionalLight( 0xffff55, 1 );
	directionalLight.position.set( - 1, 0.4, - 1 );
	scene.add( directionalLight );

	
	//waterNormals = new THREE.ImageUtils.loadTexture( 'textures/waternormals.jpg' );
    waterNormals = new THREE.ImageUtils.loadTexture( '../../assets/p/L/K/n/pLKn1.jpg' );
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 

	water = new THREE.Water( renderer, camera, scene, {
		textureWidth: 512, 
		textureHeight: 512,
		waterNormals: waterNormals,
		alpha: 	1.0,
		sunDirection: directionalLight.position.normalize(),
		sunColor: 0xffffff,
		waterColor: 0x001e0f,
		distortionScale: 50.0,
	} );


	mirrorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry( parameters.width * 500, parameters.height * 500, 50, 50 ), 
		water.material
	);
	

	mirrorMesh.add( water );
	mirrorMesh.rotation.x = - Math.PI * 0.5;
	scene.add( mirrorMesh );

    // AT field
    var atfieldGeometry = new THREE.CylinderGeometry(400, 400, 20, 8, 8, false);
    var canvas = generateLaserCanvas();

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    var material = new THREE.MeshBasicMaterial({
        wireframe: false, // true,
        map: texture,
        blending: THREE.AdditiveBlending,
        color: 0xdf4020,
        side: THREE.DoubleSide,
        depthWrite: false,
        transparent: true
    });

    var atfieldMesh = new THREE.Mesh(atfieldGeometry, material);
    atfieldMesh.position.y = 400;
    atfieldMesh.position.z = 400;
    atfieldMesh.rotation.x = - Math.PI * 0.5;
    scene.add(atfieldMesh);
    
	// load skybox

	var cubeMap = new THREE.CubeTexture( [] );
	cubeMap.format = THREE.RGBFormat;
	cubeMap.flipY = false;

	var loader = new THREE.ImageLoader();
	//loader.load( 'textures/skyboxsun25degtest.png', function ( image ) {
	//loader.load( 'textures/skyboxsun25degtest.jpg', function ( image ) {
    loader.load( '../../assets/f/M/E/y/fMEyK.jpg', function ( image ) {

		var getSide = function ( x, y ) {

			//var size = 1024;
			//var size = 128;
			var size = 512;

			var canvas = document.createElement( 'canvas' );
			canvas.width = size;
			canvas.height = size;

			var context = canvas.getContext( '2d' );
			context.drawImage( image, - x * size, - y * size );

			return canvas;

		};

		cubeMap.images[ 0 ] = getSide( 2, 1 ); // px
		cubeMap.images[ 1 ] = getSide( 0, 1 ); // nx
		cubeMap.images[ 2 ] = getSide( 1, 0 ); // py
		cubeMap.images[ 3 ] = getSide( 1, 2 ); // ny
		cubeMap.images[ 4 ] = getSide( 1, 1 ); // pz
		cubeMap.images[ 5 ] = getSide( 3, 1 ); // nz
		cubeMap.needsUpdate = true;

	} );

	var cubeShader = THREE.ShaderLib['cube'];
	cubeShader.uniforms['tCube'].value = cubeMap;

	var skyBoxMaterial = new THREE.ShaderMaterial( {
		fragmentShader: cubeShader.fragmentShader,
		vertexShader: cubeShader.vertexShader,
		uniforms: cubeShader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	var skyBox = new THREE.Mesh(
		new THREE.BoxGeometry( 1000000, 1000000, 1000000 ),
		skyBoxMaterial
	);
	
	scene.add( skyBox );

}

//

function animate() {

	requestAnimationFrame( animate );
	render();

}

function render() {

	water.material.uniforms.time.value += 1.0 / 60.0;
	controls.update();

	group_rot += 0.0001 * ROT_SPEED;
	group.rotation.x = 0;
	group.rotation.y = group_rot;
	group.rotation.z = 0;

//-------------------------------------------------------------
	// quaternion
	for ( var i = 0; i < dataSet.length; i++ ) {
		var v = dataSet[i].axis;
		var axis = new THREE.Vector3(v.x, v.y, v.z).normalize();
		angles[i] += dataSet[i].angle;
		var q = new THREE.Quaternion();
		q.setFromAxisAngle(axis,angles[i]);
		cylinders[i].quaternion.copy(q);
		if ( dataSet[i].morphingType == 'sin' ) {
			cylinders[i].scale.x = Math.abs(Math.sin(angles[i]));
			cylinders[i].scale.y = Math.abs(Math.sin(angles[i]));
			cylinders[i].scale.z = Math.abs(Math.sin(angles[i]));

			if ( dataSet[i].radiusTop == 0 ) {
				cylinders[i].position.y = dataSet[i].position.y * 32 - Math.abs(Math.sin(angles[i])) * 200;
			} else {
				cylinders[i].position.y = dataSet[i].position.y * 32 + Math.abs(Math.sin(angles[i])) * 200 - 400;
			} 
		}
		else if ( dataSet[i].morphingType == 'cos' ) {
			cylinders[i].scale.x = Math.abs(Math.cos(angles[i]));
			cylinders[i].scale.y = Math.abs(Math.cos(angles[i]));
			cylinders[i].scale.z = Math.abs(Math.cos(angles[i]));
		}
	}
//-------------------------------------------------------------

	water.render();
	renderer.render( scene, camera );

}

function generateLaserCanvas() {
    // init canvas
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 64;
    var gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(0.5, 'rgba(192,192,192,0.5)');
    gradient.addColorStop(0.8, 'rgba(128,128,128,0.3)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
}
