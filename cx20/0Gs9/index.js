// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）（その４）" http://jsdo.it/cx20/2XDY
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）（その３）" http://jsdo.it/cx20/yv6Z
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）（その２）" http://jsdo.it/cx20/vryW
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;
var mesh;
var orientations;

function init() {
    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    //camera.position.z = 20;

    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();

    // geometry

    var instances = 5000;

    var geometry = new THREE.InstancedBufferGeometry();

    // per mesh data
    var vertices = new THREE.BufferAttribute( new Float32Array( [
        // Front
        -1,  1,  1,
         1,  1,  1,
        -1, -1,  1,
         1, -1,  1,
        // Back
         1,  1, -1,
        -1,  1, -1,
         1, -1, -1,
        -1, -1, -1,
        // Left
        -1,  1, -1,
        -1,  1,  1,
        -1, -1, -1,
        -1, -1,  1,
        // Right
         1,  1,  1,
         1,  1, -1,
         1, -1,  1,
         1, -1, -1,
        // Top
        -1,  1,  1,
         1,  1,  1,
        -1,  1, -1,
         1,  1, -1,
        // Bottom
         1, -1,  1,
        -1, -1,  1,
         1, -1, -1,
        -1, -1, -1
    ] ), 3 );

    geometry.addAttribute( 'position', vertices );

    var uvs = new THREE.BufferAttribute( new Float32Array( [
        //x    y    z
        // Front
        0, 0,
        1, 0,
        0, 1,
        1, 1,
        // Back
        1, 0,
        0, 0,
        1, 1,
        0, 1,
        // Left
        1, 1,
        1, 0,
        0, 1,
        0, 0,
        // Right
        1, 0,
        1, 1,
        0, 0,
        0, 1,
        // Top
        0, 0,
        1, 0,
        0, 1,
        1, 1,
        // Bottom
        1, 0,
        0, 0,
        1, 1,
        0, 1
    ] ), 2 );

    geometry.addAttribute( 'uv', uvs );

    var indices = new Uint16Array( [
        0, 1, 2,
        2, 1, 3,
        4, 5, 6,
        6, 5, 7,
        8, 9, 10,
        10, 9, 11,
        12, 13, 14,
        14, 13, 15,
        16, 17, 18,
        18, 17, 19,
        20, 21, 22,
        22, 21, 23
    ] );

    geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );

    // per instance data
    var offsets = new THREE.InstancedBufferAttribute( new Float32Array( instances * 3 ), 3, 1 );

    var vector = new THREE.Vector4();
    for ( var i = 0, ul = offsets.count; i < ul; i++ ) {
        var x = Math.random() * 100 - 50;
        var y = Math.random() * 100 - 50;
        var z = Math.random() * 100 - 50;
        vector.set( x, y, z, 0 ).normalize();
        // move out at least 5 units from center in current direction
        offsets.setXYZ( i, x + vector.x * 5, y + vector.y * 5, z + vector.z * 5 );

    }

    geometry.addAttribute( 'offset', offsets ); // per mesh translation

    orientations = new THREE.InstancedBufferAttribute( new Float32Array( instances * 4 ), 4, 1 ).setDynamic( true );

    for ( var i = 0, ul = orientations.count; i < ul; i++ ) {

        vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
        vector.normalize();

        orientations.setXYZW( i, vector.x, vector.y, vector.z, vector.w );

    }

    geometry.addAttribute( 'orientation', orientations ); // per mesh orientation

    // material
    var texture = THREE.ImageUtils.loadTexture( '../../assets/A/k/w/j/AkwjW.jpg' ); // frog.jpg
    texture.anisotropy = renderer.getMaxAnisotropy();

    var material = new THREE.RawShaderMaterial( {

        uniforms: {
            map: { type: "t", value: texture }
        },
        vertexShader: document.getElementById( 'vs' ).textContent,
        fragmentShader: document.getElementById( 'fs' ).textContent,
        side: THREE.DoubleSide,
        transparent: false

    } );

    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


    if ( renderer.extensions.get( 'ANGLE_instanced_arrays' ) === false ) {
        document.getElementById( "notSupported" ).style.display = "";
        return;
    }

    renderer.setClearColor( 0x101010 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
}


function onWindowResize( event ) {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var lastTime = 0;

var moveQ = ( new THREE.Quaternion( .5, .5, .5, 0.0 ) ).normalize();
var tmpQ = new THREE.Quaternion();
var currentQ = new THREE.Quaternion();
function render() {

    var time = performance.now();

    var object = scene.children[0];

    object.rotation.y = time * 0.00005;

    renderer.render( scene, camera );

    var delta = ( time - lastTime ) / 5000;
    tmpQ.set( moveQ.x * delta, moveQ.y * delta, moveQ.z * delta, 1 ).normalize();

    for ( var i = 0, ul = orientations.count; i < ul; i++ ) {
        var index = i * 4;
        currentQ.set( orientations.array[index], orientations.array[index + 1], orientations.array[index + 2], orientations.array[index + 3] );
        currentQ.multiply( tmpQ );

        orientations.setXYZW( i, currentQ.x, currentQ.y, currentQ.z, currentQ.w );

    }
    orientations.needsUpdate = true;
    lastTime = time;
}

init();
animate();
