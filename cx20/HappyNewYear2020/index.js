// forked from cx20's "スーパーカミオカンデの検出結果を3Dで表示してみるテスト（その２）" http://jsdo.it/cx20/o6Pv
// forked from cx20's "スーパーカミオカンデの検出結果を3Dで表示してみるテスト" http://jsdo.it/cx20/mY4m
// forked from cx20's "Three.js でコインを回転するテスト" http://jsdo.it/cx20/fOLi
// forked from cx20's "Three.js でドット絵を回転するテスト（その１）" http://jsdo.it/cx20/r8Zv
// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N

let DOT_SIZE = 16;
let SMALL_WIDTH = 151;
let SMALL_HEIGHT = 52;

let renderer, scene, camera, particleSystem;
let uniforms, attributes;
let controls;
let ROTATE = true;
let imageData;

init();

function init() {
    // dom
    let container = document.getElementById('container');

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
    uniforms = {
        amplitude: { type: "f", value: 1.0 },
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
        //texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "/assets/o/Q/R/Y/oQRYj.png" ) },  // spark1.png
    };

    // material
    let material = new THREE.ShaderMaterial( {

        uniforms:       uniforms,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true

    });

    let canvas_small = document.getElementById('canvas_small');
    let ctx_small = canvas_small.getContext('2d');
    let img = new Image();
    img.onload = function() {
        ctx_small.drawImage(img, 0, 0);
        imageData = ctx_small.getImageData(0, 0, SMALL_WIDTH, SMALL_HEIGHT);
        let particles = SMALL_WIDTH * SMALL_HEIGHT;
        let positions = new Float32Array( particles * 3 );
        let colors = new Float32Array( particles * 3 );
        let sizes = new Float32Array( particles );
        let color = new THREE.Color();
        let idx = 0;
        for ( let y0 = 0; y0 < SMALL_HEIGHT; y0++ ) {
            for ( let x0 = 0; x0 < SMALL_WIDTH; x0++ ) {
                let idx = y0 * SMALL_WIDTH + x0;
                let i = idx * 4;
                let r = imageData.data[i + 0];
                let g = imageData.data[i + 1];
                let b = imageData.data[i + 2];
                let a = imageData.data[i + 3];

                // positions
                let x = Math.sin(2*Math.PI*x0/SMALL_WIDTH) * DOT_SIZE / 2 * 10;
                let y = (SMALL_HEIGHT/2 - y0 + 5) * DOT_SIZE / 2 * 0.4;
                let z = Math.cos(2*Math.PI*x0/SMALL_WIDTH) * DOT_SIZE / 2 * 10;

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

        geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        // particle system
        particleSystem = new THREE.Points(geometry, material);
        particleSystem.dynamic = true;

        scene.add(particleSystem);
        
        animate();

    };
    img.src = "nenga2020.png";  // mario.png

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