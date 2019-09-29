// forked from cx20's "Three.js で太陽を表示させてみるテスト" http://jsdo.it/cx20/ensQ
// forked from cx20's "Three.js で木星を表示させてみるテスト" http://jsdo.it/cx20/k68D
// forked from cx20's "Three.js で火星を表示させてみるテスト" http://jsdo.it/cx20/AFvB
// forked from cx20's "Three.js で地球を表示させてみるテスト" http://jsdo.it/cx20/78Dn
// forked from cx20's "Three.js で月を表示させてみるテスト" http://jsdo.it/cx20/vcVy
// forked from cx20's "Three.js で冥王星を表示させてみるテスト" http://jsdo.it/cx20/tenj
// forked from cx20's "Three.js で地球を回してみるテスト" http://jsdo.it/cx20/tv0T

var container;

var clock = new THREE.Clock();

var camera, scene, renderer, composer;

var uniforms, material, mesh;

var mouseX = 0, mouseY = 0,
    lat = 0, lon = 0, phy = 0, theta = 0;

var width = window.innerWidth || 2;
var height = window.innerHeight || 2;

var windowHalfX = width / 2;
var windowHalfY = height / 2;

init();
animate();

function init() {
    
    container = document.getElementById( 'container' );
    
    camera = new THREE.PerspectiveCamera( 35, windowHalfX / windowHalfY, 1, 3000 );
    camera.position.z = 4;
    
    scene = new THREE.Scene();
    
    uniforms = {
        
        fogDensity: { type: "f", value: 0.45 },
        fogColor: { type: "v3", value: new THREE.Vector3( 0, 0, 0 ) },
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        //uvScale: { type: "v2", value: new THREE.Vector2( 3.0, 1.0 ) },
        uvScale: { type: "v2", value: new THREE.Vector2( 1.0, 1.0 ) },
        texture1: { type: "t", value: THREE.ImageUtils.loadTexture( "../../assets/y/8/i/H/y8iHs.png" ) }, // cloud.png
        texture2: { type: "t", value: THREE.ImageUtils.loadTexture( "../../assets/c/C/I/q/cCIqn.jpg" ) }  // lavatile.jpg
        
    };
    
    uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
    uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;
    
    //var size = 0.65;
    var size = 1.15;
    
    material = new THREE.ShaderMaterial( {
        
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
        
    } );
    
    //mesh = new THREE.Mesh( new THREE.TorusGeometry( size, 0.3, 30, 30 ), material );
    mesh = new THREE.Mesh( new THREE.SphereGeometry( size, 36, 36), material );
    //mesh = new THREE.Mesh( new THREE.CubeGeometry (size, size, size), material );
    //mesh.rotation.x = 0.3;
    scene.add( mesh );
    
    //
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );
    renderer.autoClear = false;
    
    //
    
    var renderModel = new THREE.RenderPass( scene, camera );
    var effectBloom = new THREE.BloomPass( 1.25 );
    var effectFilm = new THREE.FilmPass( 0.35, 0.95, 2048, false );
    
    effectFilm.renderToScreen = true;
    
    composer = new THREE.EffectComposer( renderer );
    
    composer.addPass( renderModel );
    composer.addPass( effectBloom );
    composer.addPass( effectFilm );
    
    //
    
    onWindowResize();
    
    window.addEventListener( 'resize', onWindowResize, false );
    
}

function onWindowResize( event ) {
    
    uniforms.resolution.value.x = window.innerWidth;
    uniforms.resolution.value.y = window.innerHeight;
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    composer.reset();
    
}

//

function animate() {
    
    requestAnimationFrame( animate );
    
    render();
    
}

function render() {
    
    var delta = 5 * clock.getDelta();
    
    uniforms.time.value += 0.2 * delta;
    
    //mesh.rotation.y += 0.0125 * delta;
    mesh.rotation.y += 0.05 * delta;
    //mesh.rotation.x += 0.05 * delta;
    
    renderer.clear();
    composer.render( 0.01 );
    
}
