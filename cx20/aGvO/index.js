// forked from cx20's "Three.js で鯉のぼりをなびかせてみるテスト" http://jsdo.it/cx20/ChildrensDay2015
// forked from cx20's "Three.js で黄色いハンカチをなびかせてみるテスト" http://jsdo.it/cx20/xTTd
// forked from cx20's "Three.js で Cloth Simulation のサンプルを試してみるテスト" http://jsdo.it/cx20/inMY

/* testing cloth simulation */

var pinsFormation = [];
var pins = [6];
pinsFormation.push(pins);
pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
pinsFormation.push(pins);
pins = [0];
pinsFormation.push(pins);
pins = []; // cut the rope ;)
pinsFormation.push(pins);
pins = [0, cloth.w]; // classic 2 pins
pinsFormation.push(pins);
pins = pinsFormation[1];

function togglePins() {
    pins = pinsFormation[~~(Math.random() * pinsFormation.length)];
}

if ( ! Detector.webgl ) {

	Detector.addGetWebGLMessage();
	document.getElementById( 'container' ).innerHTML = "";

}

var container, stats;
var camera, scene, renderer;
var sphere;
var clothGeometry;

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
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 3000000 );
	camera.position.set( 100, 100, 500 );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.userPan = false;
	controls.userPanSpeed = 0.0;
	controls.maxDistance = 5000.0;
	controls.maxPolarAngle = Math.PI * 0.495;
	controls.autoRotate = true;         //true:自動回転する,false:自動回転しない
	controls.autoRotateSpeed = -2.0;    //自動回転する時の速度

	var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	light.position.set( - 1, 1, - 1 );
	scene.add( light );

	//waterNormals = new THREE.ImageUtils.loadTexture('waternormals.jpg');
    waterNormals = new THREE.ImageUtils.loadTexture('../../assets/t/B/h/a/tBha6.jpg');
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 

	water = new THREE.Water( renderer, camera, scene, {
		textureWidth: 512, 
		textureHeight: 512,
		waterNormals: waterNormals,
		alpha: 	1.0,
		sunDirection: light.position.clone().normalize(),
		sunColor: 0xffffff,
		waterColor: 0x001e0f,
		distortionScale: 50.0,
	} );


	mirrorMesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry( parameters.width * 500, parameters.height * 500 ),
		water.material
	);

	mirrorMesh.add( water );
	mirrorMesh.rotation.x = - Math.PI * 0.5;
	scene.add( mirrorMesh );
	
	// cloth
	//var clothTexture = THREE.ImageUtils.loadTexture('fish.png');
	var clothTexture = THREE.ImageUtils.loadTexture('../../assets/a/G/o/y/aGoyJ.png');
	var clothMaterial = new THREE.MeshLambertMaterial({
		map: clothTexture,
		side: THREE.DoubleSide
	});
	
	// cloth geometry
	clothGeometry = new THREE.ParametricGeometry(clothFunction, cloth.w, cloth.h);
	clothGeometry.dynamic = true;
	clothGeometry.computeFaceNormals();

	var uniforms = {
		texture: {
			type: "t",
			value: clothTexture
		}
	};
	var vertexShader = document.getElementById('vertexShaderDepth').textContent;
	var fragmentShader = document.getElementById('fragmentShaderDepth').textContent;

	// cloth mesh
	for ( var i = 0; i < 50; i++ ) {
		object = new THREE.Mesh(clothGeometry, clothMaterial);
		object.position.set(i * 60 - 1500, 100, 0);
		object.scale.set( 0.2, 0.4, 0.2 );
		object.castShadow = true;
		object.receiveShadow = true;
		scene.add(object);
	}

	object.customDepthMaterial = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader
	});

	// sphere
	var ballGeo = new THREE.SphereGeometry(ballSize, 20, 20);
	var ballMaterial = new THREE.MeshPhongMaterial({
		color: 0xffffff
	});

	sphere = new THREE.Mesh(ballGeo, ballMaterial);
	sphere.castShadow = true;
	sphere.receiveShadow = true;
	//scene.add(sphere);

	// load skybox

	var cubeMap = new THREE.CubeTexture( [] );
	cubeMap.format = THREE.RGBFormat;
	cubeMap.flipY = false;

	var loader = new THREE.ImageLoader();
	//loader.load('skyboxsun25degtest.jpg', function ( image ) {
    loader.load('../../assets/l/U/r/b/lUrbM.jpg', function ( image ) {

		var getSide = function ( x, y ) {
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
		new THREE.BoxGeometry( 100000, 100000, 100000 ),
		skyBoxMaterial
	);
	
	scene.add( skyBox );
}

function animate() {

	requestAnimationFrame( animate );

	var time = Date.now();

	windStrength = Math.cos(time / 7000) * 20 + 40;
	windForce.set(Math.sin(time / 2000), Math.cos(time / 3000), Math.sin(time / 1000)).normalize().multiplyScalar(windStrength);
	
	// see: Cloth.js
	simulate(time);

	render();

}

function render() {

	var time = performance.now() * 0.001;

    var p = cloth.particles;

    for (var i = 0, il = p.length; i < il; i++) {

        clothGeometry.vertices[i].copy(p[i].position);

    }

    clothGeometry.computeFaceNormals();
    clothGeometry.computeVertexNormals();

    clothGeometry.normalsNeedUpdate = true;
    clothGeometry.verticesNeedUpdate = true;

	water.material.uniforms.time.value += 1.0 / 60.0;
	controls.update();
	water.render();
	renderer.render( scene, camera );

}
