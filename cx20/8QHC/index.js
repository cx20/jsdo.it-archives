// forked from cx20's "御嶽山の3Dデータを表示してみた（その４）" http://jsdo.it/cx20/yPM9
// forked from cx20's "御嶽山の3Dデータを表示してみた（その３）" http://jsdo.it/cx20/AfAq
// forked from cx20's "御嶽山の3Dデータを表示してみた（その２）" http://jsdo.it/cx20/6tna
// forked from cx20's "御嶽山の3Dデータを表示してみた" http://jsdo.it/cx20/6GrB
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

/* ParticleEngineExamples.js */

/**
* @author Lee Stemkoski   http://www.adelphi.edu/~stemkoski/
*/

/* 
	Particle Engine options:
	
	positionBase   : new THREE.Vector3(),
	positionStyle : Type.CUBE or Type.SPHERE,

	// for Type.CUBE
	positionSpread  : new THREE.Vector3(),

	// for Type.SPHERE
	positionRadius  : 10,
	
	velocityStyle : Type.CUBE or Type.SPHERE,

	// for Type.CUBE
	velocityBase       : new THREE.Vector3(),
	velocitySpread     : new THREE.Vector3(), 

	// for Type.SPHERE
	speedBase   : 20,
	speedSpread : 10,
		
	accelerationBase   : new THREE.Vector3(),
	accelerationSpread : new THREE.Vector3(),
		
	particleTexture : THREE.ImageUtils.loadTexture( 'images/star.png' ),
		
	// rotation of image used for particles
	angleBase               : 0,
	angleSpread             : 0,
	angleVelocityBase       : 0,
	angleVelocitySpread     : 0,
	angleAccelerationBase   : 0,
	angleAccelerationSpread : 0,
		
	// size, color, opacity 
	//   for static  values, use base/spread
	//   for dynamic values, use Tween
	//   (non-empty Tween takes precedence)
	sizeBase   : 20.0,
	sizeSpread : 5.0,
	sizeTween  : new Tween( [0, 1], [1, 20] ),
			
	// colors stored in Vector3 in H,S,L format
	colorBase   : new THREE.Vector3(0.0, 1.0, 0.5),
	colorSpread : new THREE.Vector3(0,0,0),
	colorTween  : new Tween( [0.5, 2], [ new THREE.Vector3(0, 1, 0.5), new THREE.Vector3(1, 1, 0.5) ] ),

	opacityBase   : 1,
	opacitySpread : 0,
	opacityTween  : new Tween( [2, 3], [1, 0] ),
	
	blendStyle    : THREE.NormalBlending (default), THREE.AdditiveBlending

	particlesPerSecond : 200,
	particleDeathAge   : 2.0,		
	emitterDeathAge    : 60	
*/

Examples =
{
	smoke :
	{
		positionStyle    : Type.CUBE,
		positionBase     : new THREE.Vector3( -14, 21, 20 ),
		positionSpread   : new THREE.Vector3( 0, 0, 10 ),

		velocityStyle    : Type.CUBE,
		velocityBase     : new THREE.Vector3( 0, 40, 0 ),
		velocitySpread   : new THREE.Vector3( 15, 8, 15 ), 
		accelerationBase : new THREE.Vector3( 0,-10,0 ),
		
		//particleTexture : THREE.ImageUtils.loadTexture( 'smokeparticle.png'),
		particleTexture : THREE.ImageUtils.loadTexture( '../../assets/l/U/5/R/lU5RM.png'), // smokeparticle.png

		angleBase               : 0,
		angleSpread             : 720,
		angleVelocityBase       : 0,
		angleVelocitySpread     : 720,
		
		sizeTween    : new Tween( [0, 1], [8, 32] ),
		opacityTween : new Tween( [0.8, 2], [0.5, 0] ),
		colorTween   : new Tween( [0.4, 1], [ new THREE.Vector3(0,0,0.8), new THREE.Vector3(0, 0, 1.0) ] ),

		particlesPerSecond : 500,
		particleDeathAge   : 2.0,
		emitterDeathAge    : 60
	}
}

/* index.js */
var scene;
var camera;
var controls;
var engine;
var theta = 0;
var clock = new THREE.Clock();

function animate() {
    requestAnimationFrame( animate );
    update();
    render();
}

function update()
{
/*
    camera.lookAt(scene.position);
    camera.position.x = 100 * Math.sin(theta * Math.PI / 180);
    camera.position.y = 100 * Math.cos(60    * Math.PI / 180);
    camera.position.z = 100 * Math.cos(theta * Math.PI / 180);
*/
    theta += 0.1;
	
	controls.update();
//	stats.update();
	
	var dt = clock.getDelta();
	engine.update( dt * 0.5 );	
}

function render() {
    renderer.render(scene, camera);
}

width = window.innerWidth;
height = window.innerHeight;

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function (evt) {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, -100, 100);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp(Math.PI * 0.38); 
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0;    //自動回転する時の速度

	engine = new ParticleEngine();
	engine.setValues( Examples.smoke );
	engine.initialize();

/*
    // 座標軸表示
    var axis = new THREE.AxisHelper(100);
    scene.add(axis);
*/

    var x1 = 128;
    var y1 = 128;
    var x2 = 192; // 256;
    var y2 = 192; // 256;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    var s = (evt.target.response || evt.target.responseText).split("\n");
    var c = 0;
    for (var i = 0; i < y2; i++) {
        var r = s[i].split(",");
        for (var j in r) {
            var h = r[j] == 'e' ? 0 : Number(r[j]);
            geometry.vertices[c].z = h * 1.5; //高さの強調度を変える場合は、ここの数値を変更する
            c++;
        }
    }
    var material = new THREE.MeshPhongMaterial({
        //map: THREE.ImageUtils.loadTexture('texture.png')
        //map: THREE.ImageUtils.loadTexture('/assets/4/G/0/T/4G0Tz.png')
        //map: THREE.ImageUtils.loadTexture('/assets/6/w/s/U/6wsUt.png') // 御嶽山（地図）
        //map: THREE.ImageUtils.loadTexture('/assets/y/D/v/x/yDvxy.png') // 御嶽山（空撮）
        map: THREE.ImageUtils.loadTexture('../../assets/8/R/S/P/8RSPH.png') // 御嶽山（噴火口記載）
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);

    material = new THREE.MeshBasicMaterial({
        color: 0x444444
    });

    document.getElementById('webgl').appendChild(renderer.domElement);
    animate();
}, false);

//xhr.open('GET',  'dem.csv', true);
//xhr.open('GET', '/assets/5/S/m/V/5SmV7', true); // 黒部峡谷
xhr.open('GET', '../../assets/w/i/P/a/wiPab.csv', true); // 御嶽山
xhr.send(null);

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    animate(); // 再描画
};