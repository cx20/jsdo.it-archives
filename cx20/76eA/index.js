// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト" http://jsdo.it/cx20/4Fzx
// forked from cx20's "Three.js でドット絵を回転するテスト（その３）" http://jsdo.it/cx20/eRDK
// forked from cx20's "Three.js でドット絵を回転するテスト（その１）" http://jsdo.it/cx20/r8Zv
// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N

var DOT_SIZE = 3;
var X_START_POS = -28;
var Y_START_POS = -20;
var Z_START_POS = -16;

var width  = window.innerWidth;
var height = window.innerHeight;
var fov    = 80;
var aspect = width / height;
var near   = 1;
var far    = 1000;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = width / 2;
var windowHalfY = height / 2;
var camera;
var scene;
var rendere;
var composer;
var theta = 0;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 50;

    scene = new THREE.Scene();

    var i, j, x, y, z;
    var geometry = new THREE.CubeGeometry(48, 37, 48);
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('../../assets/p/p/v/a/ppvad.png')	// box.png
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.overdraw = true;
    scene.add(mesh);

    //ライティング
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-1, -1, -1).normalize();
    scene.add(light2);

    // 座標軸表示
    var axis =  new THREE.AxisHelper(100);
    //scene.add(axis);

    // create and start the renderer; choose antialias setting.
    if (isWebgl())
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    else
        renderer = new THREE.CanvasRenderer();

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

	// postprocessing
	composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, camera ) );

	var effectFilm = new THREE.FilmPass( 0.35, 0.95, 2048, false );
	effectFilm.renderToScreen = true;
	composer.addPass( effectFilm );
}

function isWebgl() {
    try {
        return !!window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');
    } catch (e) {
        return false;
    }
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    camera.lookAt(scene.position);
    camera.position.x = 50 * Math.sin(theta * Math.PI / 180) * -1; // 逆回転
    camera.position.y = 50 * Math.cos(60 * Math.PI / 180);
    camera.position.z = 50 * Math.cos(theta * Math.PI / 180);

    theta += 1.0;
    //renderer.render(scene, camera);
    composer.render();
}