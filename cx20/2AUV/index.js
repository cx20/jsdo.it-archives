// forked from cx20's "スーパーカミオカンデの検出結果を3Dで表示してみるテスト（その２）" http://jsdo.it/cx20/o6Pv
// forked from cx20's "スーパーカミオカンデの検出結果を3Dで表示してみるテスト" http://jsdo.it/cx20/mY4m
// forked from cx20's "Three.js でコインを回転するテスト" http://jsdo.it/cx20/fOLi
// forked from cx20's "Three.js でドット絵を回転するテスト（その１）" http://jsdo.it/cx20/r8Zv
// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N

var DOT_SIZE = 16;
var SMALL_WIDTH = 151;
var SMALL_HEIGHT = 52;

var renderer, scene, camera, particleSystem;
var uniforms, attributes;
var controls;
var ROTATE = true;
var imageData;

init();

function init() {
    // dom
    var container = document.getElementById('container');

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp(Math.PI * 0.1);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 4.0; //自動回転する時の速度

    // scene
    scene = new THREE.Scene();

    // particle system geometry
    geometry = new THREE.BufferGeometry();

    // material
    attributes = {
        size: {    type: 'f', value: [] },
        customColor: { type: 'c', value: [] }
    };

    uniforms = {
        amplitude: { type: "f", value: 1.0 },
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
        //texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "/assets/o/Q/R/Y/oQRYj.png" ) },  // spark1.png
    };

    // material
    var material = new THREE.ShaderMaterial( {

        uniforms:       uniforms,
        attributes:     attributes,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true

    });

    var canvas_small = document.getElementById('canvas_small');
    var ctx_small = canvas_small.getContext('2d');
    var img = new Image();
    img.onload = function() {
        ctx_small.drawImage(img, 0, 0);
        imageData = ctx_small.getImageData(0, 0, SMALL_WIDTH, SMALL_HEIGHT);
        var particles = SMALL_WIDTH * SMALL_HEIGHT;
        var positions = new Float32Array( particles * 3 );
        var colors = new Float32Array( particles * 3 );
        var sizes = new Float32Array( particles );
        var color = new THREE.Color();
        var idx = 0;
        for ( var y0 = 0; y0 < SMALL_HEIGHT; y0++ ) {
            for ( var x0 = 0; x0 < SMALL_WIDTH; x0++ ) {
                var idx = y0 * SMALL_WIDTH + x0;
                var i = idx * 4;
                var r = imageData.data[i + 0];
                var g = imageData.data[i + 1];
                var b = imageData.data[i + 2];
                var a = imageData.data[i + 3];

                // positions
                var x = Math.sin(2*Math.PI*x0/SMALL_WIDTH) * DOT_SIZE / 2 * 10;
                var y = (SMALL_HEIGHT/2 - y0 + 5) * DOT_SIZE / 2 * 0.4;
                var z = Math.cos(2*Math.PI*x0/SMALL_WIDTH) * DOT_SIZE / 2 * 10;

                positions[ idx * 3 + 0 ] = x;
                positions[ idx * 3 + 1 ] = y;
                positions[ idx * 3 + 2 ] = z;

                // colors
                colors[ idx * 3 + 0 ] = r/256
                colors[ idx * 3 + 1 ] = g/256;
                colors[ idx * 3 + 2 ] = b/256;

                sizes[ idx ] = DOT_SIZE * 1.0;
                idx++;
            }
        }

        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        // particle system
        particleSystem = new THREE.Points(geometry, material);
        particleSystem.dynamic = true;

        scene.add(particleSystem);
        
        animate();

    };
    img.src = "/assets/6/q/0/6/6q06E.png";  // mario.png

}

function animate() {

    requestAnimationFrame(animate);
    render();
}

function render() {

    controls.update();

    // render
    renderer.render(scene, camera);

}