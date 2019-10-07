// forked from cx20's "[GLSL] Three.js + ParticleSystem でコマアニメしてみるテスト（その５）" http://jsdo.it/cx20/9PTQ
// forked from cx20's "[GLSL] Three.js + ParticleSystem でコマアニメしてみるテスト（その４）" http://jsdo.it/cx20/zZLy
// forked from cx20's "[GLSL] Three.js + ParticleSystem でコマアニメしてみるテスト（その３）" http://jsdo.it/cx20/hvED
// forked from cx20's "[GLSL] Three.js + ParticleSystem でコマアニメしてみるテスト（その２）" http://jsdo.it/cx20/lYmV
// forked from cx20's "[GLSL] Three.js + ParticleSystem でコマアニメしてみるテスト。" http://jsdo.it/cx20/1l8j
// forked from cx20's "[GLSL] Three.js + ParticleSystem で球体にドットを配置してみるテスト。" http://jsdo.it/cx20/596T
// forked from cx20's "Three.js + ParticleSystem でドット絵を描いてみるテスト" http://jsdo.it/cx20/tYIO
// forked from WestLangley's "Particle System with ParticleBasicMaterial and Custom Color for Each Particle" http://jsfiddle.net/J7zp4/

var DOT_SIZE = 16;
var X_START_POS = 0;
var Y_START_POS = 0;
var Z_START_POS = 0;

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

function getRgbColorHex(colorType)
{
    var colorHash = {
        "無":0x000000,
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
    return colorHash[colorType];
}

function getSingleColorDepth( c, rgbType )
{
    var result = 0;
    var rgb = getRgbColor( c );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );
    switch ( rgbType )
    {
    case 'r':
        result = r / 255;
        break;
    case 'g':
        result = g / 255;
        break;
    case 'b':
        result = b / 255;
        break;
    }
    return result;
}

var renderer, scene, camera, particleSystem;
var uniforms, attributes;

init();
animate();

function init() {

    // dom
    var container = document.getElementById('container');

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 400;

    // particle system geometry
    var geometry = createParticleGeometry();
    var colors = geometry.colors;

    // material
    attributes = {

        size: {    type: 'f', value: [] },
        customColor: { type: 'c', value: [] }

    };

    uniforms = {

        amplitude: { type: "f", value: 1.0 },
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
        texture:   { type: "t", value: getTexture() }
    };

    // material
    var material = new THREE.ShaderMaterial( {

        uniforms:       uniforms,
        attributes:     attributes,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        //blending:       THREE.AdditiveBlending,
        depthTest:      true,
        transparent:    true

    });
    
    // particle system
    particleSystem = new THREE.PointCloud(geometry, material);

    particleSystem.dynamic = true;

    var vertices = particleSystem.geometry.vertices;
    var values_size = attributes.size.value;
    var values_color = attributes.customColor.value;

    for (var v = 0; v < vertices.length; v++) {

        values_size[v] = DOT_SIZE * 2.5;
        values_color[v] = colors[v];
    }

    particleSystem.rotation.y -= Math.PI / 2;

    scene.add(particleSystem);

}

function createParticleGeometry() {
    var geometry = new THREE.Geometry();

    // vertex colors
    var colors = [];
    for ( var i = 0; i < 5000; i++ ) {
        var x = Math.random() * 300 - 150;
        var y = Math.random() * 300 - 150;
        var z = Math.random() * 300 - 150;
        var vertex = new THREE.Vector3(x, y, z);

        if ( vertex.length() < 150 ) {
            var color = new THREE.Color();
            var x0 = (Math.floor(x/12) + 8);
            var y0 = (Math.floor(y/12) + 8);
            var z0 = (Math.floor(z/12) + 8);
            if ( x0 >= (0+X_START_POS) && y0 >= (0+Y_START_POS) 
              && x0 < (16+X_START_POS) && y0 < (16+Y_START_POS) ) {
                var pos = (x0-X_START_POS) + ((15-y0)-Y_START_POS) * 16;
                if ( dataSet[pos] != "無") {
                    var c = dataSet[pos];
                    color.setHex( getRgbColorHex(c) );
                }
            }

            colors.push(color);
            geometry.vertices.push(vertex);

            var velocity = new THREE.Vector3(Math.random(), Math.random(), Math.random());
            vertex.velocity = velocity;
        }
    }

    geometry.colors = colors;
    
    return geometry;
}

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    // rotate
    particleSystem.rotation.y += 0.010;

    // render
    renderer.render(scene, camera);

}
function getTexture(){
    var size = 1;
    var canvas = document.createElement( 'canvas' );
    canvas.width = canvas.height = 16;
    var ctx = canvas.getContext( '2d' );

    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * size;
        var y = Math.floor(i / 16) * size;
        var color = getRgbColor(dataSet[i]);
        if (dataSet[i] != "無") {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, size, size);
        }
    }

    var tx = new THREE.Texture(canvas);
    tx.needsUpdate = true;
    return tx;
}
