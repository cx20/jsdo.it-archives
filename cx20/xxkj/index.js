// forked from cx20's "Three.js + ParticleSystem でドット絵を描いてみるテスト（その３）" http://jsdo.it/cx20/8Ogg
// forked from cx20's "Three.js + ParticleSystem でドット絵を描いてみるテスト（その２）" http://jsdo.it/cx20/jYmY
// forked from cx20's "Three.js + ParticleSystem でドット絵を描いてみるテスト" http://jsdo.it/cx20/tYIO
// forked from WestLangley's "Particle System with ParticleBasicMaterial and Custom Color for Each Particle" http://jsfiddle.net/J7zp4/

var DOT_SIZE = 16;
var X_START_POS = 12;
var Y_START_POS = 12;

var PARTICLE_NUM    = 10000;
var PARTICLE_SIZE   = DOT_SIZE;
var PARTICLE_RANGE       = 110;
var PARTICLE_RANGE_HALF  = PARTICLE_RANGE/2;

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥

var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":"#000000",
        "白":"#ffffff",
        "肌":"#ffcccc",
        "茶":"#800000",
        "赤":"#ff0000",
        "黄":"#ffff00",
        "緑":"#00ff00",
        "水":"#00ffff",
        "青":"#0000ff",
        "紫":"#800080"
    };
    return colorHash[ c ];
}

var renderer, scene, camera, particleSystem;

init();
animate();

function init() {

    // dom
    var container = document.getElementById( 'container' );

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    
    // scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 400;

    // particle system geometry
    var geometry = new THREE.SphereGeometry( 100, 47, 47);
    
    // vertex colors
    var colors = [];
    for( var i = 0; i < geometry.vertices.length; i++ ) {
        colors[i] = new THREE.Color();

        var vertex = geometry.vertices[i];
        var velocity = new THREE.Vector3( Math.random(), Math.random(), Math.random() );
        vertex.velocity = velocity;

        var x = i % 48;
        var y = Math.floor(i / 48);
        if ( x >= (0+X_START_POS) && y >= (0+Y_START_POS) 
          && x < (16+X_START_POS) && y < (16+Y_START_POS) ) {
            var pos = (x-X_START_POS) + (y-Y_START_POS) * 16;
            if ( dataSet[pos] != "無") {
                colors[i].setStyle( getRgbColor(dataSet[pos]) );
            }
        //} else {
        //    colors[i].setHSL( Math.random(), 1.0, 0.5 ); // 色をカラフルにしたい場合、有効化
        }
    

    }
    geometry.colors = colors;

    //var sprite = THREE.ImageUtils.loadTexture( "ball.png" );
    var sprite = THREE.ImageUtils.loadTexture( "../../assets/4/a/w/f/4awfi.png" );

    // material
    material = new THREE.ParticleBasicMaterial( {
        size: DOT_SIZE*1.2,
        map: sprite,
        transparent: true,
        opacity: 0.7,
        //blending: THREE.AdditiveBlending,
        depthTest: false,
        vertexColors: true
    } );

    // particle system
    particleSystem = new THREE.ParticleSystem( geometry, material );
    particleSystem.rotation.y -= Math.PI / 2;

    scene.add( particleSystem );

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    // rotate
    //particleSystem.rotation.x += 0.010;
    particleSystem.rotation.y += 0.010;

    // 回転
    //particleSystem.rotation.y += Math.PI/2;
    
    // 移動
    var vertices = particleSystem.geometry.vertices;
    for (var i=0,len=vertices.length; i<len; ++i) {
        var particle = vertices[i];
        var v = particle.velocity;
        
        particle.x += v.x; // v.x;
        particle.y += v.y; // v.y;
        particle.z += v.z; // v.z;
        
        if      (particle.x <-PARTICLE_RANGE) { particle.x =-PARTICLE_RANGE; v.x *= -1; }
        else if (particle.x > PARTICLE_RANGE) { particle.x = PARTICLE_RANGE; v.x *= -1; }
        if      (particle.y <-PARTICLE_RANGE) { particle.y =-PARTICLE_RANGE; v.y *= -1; }
        else if (particle.y > PARTICLE_RANGE) { particle.y = PARTICLE_RANGE; v.y *= -1; }
        if      (particle.z <-PARTICLE_RANGE) { particle.z =-PARTICLE_RANGE; v.z *= -1; }
        else if (particle.z > PARTICLE_RANGE) { particle.z = PARTICLE_RANGE; v.z *= -1; }
    }
    particleSystem.geometry.verticesNeedUpdate = true;

    // render
    renderer.render( scene, camera );

}
