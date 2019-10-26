// forked from cx20's "vox.js を試してみるテスト（その９）" http://jsdo.it/cx20/4LYl
// forked from cx20's "vox.js を試してみるテスト（その８）" http://jsdo.it/cx20/iEi8
// forked from cx20's "vox.js を試してみるテスト（その７）" http://jsdo.it/cx20/K6wm
// forked from cx20's "vox.js を試してみるテスト（その６）" http://jsdo.it/cx20/oZg0
// forked from cx20's "vox.js を試してみるテスト（その５）" http://jsdo.it/cx20/af9L
// forked from cx20's "vox.js を試してみるテスト（その４）" http://jsdo.it/cx20/qL0R
// forked from cx20's "vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ymYt
// forked from cx20's "vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/adwz
// forked from cx20's "vox.js を試してみるテスト" http://jsdo.it/cx20/u80n
// forked from ohisama1's "vox.js test 0" http://jsdo.it/ohisama1/e9dm

var DOT_SIZE = 16;

var renderer, scene, camera, particleSystem;
var uniforms, attributes;
var controls;
var ROTATE = true;
var animationFrameLength = 20; //スプライトシートのコマ数
var clock = new THREE.Clock();

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
        texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "../../assets/k/p/w/9/kpw9k.png" ) }, // run.png
        offset:    {type: 'v2', value: new THREE.Vector2(1/animationFrameLength, 0.0)},
        repeat:    {type: 'v2', value: new THREE.Vector2(1/animationFrameLength, 1.0)}
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

    var parser = new vox.Parser();
    // adobe.vox
    parser.parse("../../assets/y/l/j/y/yljy3.vox").then(function(voxelData) {
        var particles = voxelData.voxels.length;
        var positions = new Float32Array( particles * 3 );
        var colors = new Float32Array( particles * 3 );
        var sizes = new Float32Array( particles );
        var color = new THREE.Color();
        for ( var i = 0; i  < voxelData.voxels.length; i++ ) {
            var voxel = voxelData.voxels[i];
            // positions
            var x = voxel.x * DOT_SIZE - voxelData.size.x * DOT_SIZE / 2;
            var y = voxel.z * DOT_SIZE - voxelData.size.z * DOT_SIZE / 2;
            var z = voxel.y * DOT_SIZE - voxelData.size.y * DOT_SIZE / 2;

            positions[ i * 3 + 0 ] = x;
            positions[ i * 3 + 1 ] = y;
            positions[ i * 3 + 2 ] = z;

            // colors
            var c = voxelData.palette[voxel.colorIndex];

            colors[ i * 3 + 0 ] = c.r / 255
            colors[ i * 3 + 1 ] = c.g / 255;
            colors[ i * 3 + 2 ] = c.b / 255;

            sizes[ i ] = DOT_SIZE * 6.0;
        }

        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        // particle system
        particleSystem = new THREE.Points(geometry, material);
        particleSystem.dynamic = true;
        particleSystem.rotation.y -= Math.PI / 2;

        scene.add(particleSystem);

        animate();
    });

}

function animate() {

    requestAnimationFrame(animate);
    render();
}

function render() {

    controls.update();

    var theta = clock.getElapsedTime()  * 1.5;
    var index = ((theta * animationFrameLength % animationFrameLength)) | 0
    index /= animationFrameLength;
    uniforms.offset.value =  new THREE.Vector2( index , 0.0)

    // render
    renderer.render(scene, camera);

}