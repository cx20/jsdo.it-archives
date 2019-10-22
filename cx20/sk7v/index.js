// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var gui;
var scene;
var camera;
var renderer;
var controls;
var engine;
var showSmoke = false;
var clock = new THREE.Clock();
var width = window.innerWidth - 2;
var height = window.innerHeight - 2;
var MAP = "../../assets/4/Q/c/q/4QcqW.jpg"; // 空撮写真
var SMOKE = false;
var ROTATE = true;

Examples =
{
	smoke :
	{
		positionStyle    : Type.CUBE,
		positionBase     : new THREE.Vector3( 8, 10, 3 ), // 噴火口位置
		positionSpread   : new THREE.Vector3( 0, 0, 10 ),

		velocityStyle    : Type.CUBE,
		velocityBase     : new THREE.Vector3( 0, 40, 0 ),
		velocitySpread   : new THREE.Vector3( 15, 8, 15 ), 
		accelerationBase : new THREE.Vector3( 0,-10,0 ),
		
		particleTexture : THREE.ImageUtils.loadTexture( '../../assets/h/z/U/p/hzUpb.png'), // smokeparticle.png

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

// heightMap より標高データを取得する
// 参考：http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");

    var size = img.width * img.height;
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var k = 1.5; // 起伏の強調度
        var height = (pix[i] + pix[i + 1] + pix[i + 2])/3 * 1/16 * k;
        data[j++] = height;
    }

    return data;
}

var img = new Image();
img.onload = function() {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, -100, 100);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // OrbitControls の準備
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp(Math.PI * 0.38);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0; //自動回転する時の速度

    // heightMap より標高データを取得
    var data = getHeightData(img);

    // 標高データを元に地形を生成
    var x1 = 128;
    var y1 = 128;
    var x2 = 256;
    var y2 = 256;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    for (var i = 0; i < geometry.vertices.length; i++) {
        geometry.vertices[i].z = data[i];
    }

    // テクスチャを貼り付け
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(MAP)
    });
    var plane = new THREE.Mesh(geometry, material);
    
    // 座標回転
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);

    // GUI
    gui = new dat.GUI();
    var mapSelector = gui.add(window, 'MAP', {
        "通常地図": "../../assets/q/l/7/D/ql7Dn.jpg",
        "空撮写真": "../../assets/4/Q/c/q/4QcqW.jpg",
        "空撮写真2": "../../assets/t/P/2/P/tP2PW.jpg",
        "衛星写真": "../../assets/s/L/K/2/sLK2A.jpg",
        "衛星写真2": "../../assets/m/U/1/A/mU1A2.jpg",
        "陰影段彩図": "../../assets/z/c/X/I/zcXIz.jpg", 
        "火山地質図": "../../assets/i/7/N/1/i7N1V.jpg"
    });
    var mapSmoke = gui.add(window, 'SMOKE').name('Smoke');
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');

    mapSelector.onChange(function (value) {
        plane.material.map = THREE.ImageUtils.loadTexture(value);
    });
    
    mapSmoke.onChange(function (value) {
        if ( value ) {
            engine = new ParticleEngine();
            engine.setValues( Examples.smoke );
            engine.initialize();
        } else {
            engine.destroy();
        }

        showSmoke = value;
    });

    mapRotate.onChange(function (value) {
        controls.autoRotate = value;
    });
    
    document.getElementById("webgl").appendChild(renderer.domElement);
    animate();

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }, false );
};

img.src = "../../assets/w/N/Z/C/wNZCp.png"; // heightMap.png

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
	var dt = clock.getDelta();
    if ( showSmoke ) {
        engine.update( dt * 0.5 );	
    }
    renderer.render(scene, camera);
}