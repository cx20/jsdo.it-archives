// forked from cx20's "[GLSL] Three.js + ParticleSystem で球体にドットを配置してみるテスト（その３）" http://jsdo.it/cx20/9GHC
// forked from cx20's "[GLSL] Three.js + ParticleSystem で球体にドットを配置してみるテスト（その２）" http://jsdo.it/cx20/nlTx
// forked from cx20's "[GLSL] Three.js + ParticleSystem で球体にドットを配置してみるテスト。" http://jsdo.it/cx20/596T
// forked from cx20's "Three.js + ParticleSystem でドット絵を描いてみるテスト" http://jsdo.it/cx20/tYIO
// forked from WestLangley's "Particle System with ParticleBasicMaterial and Custom Color for Each Particle" http://jsfiddle.net/J7zp4/

var DOT_SIZE = 16;
var X_START_POS = 0;
var Y_START_POS = 0;
var Z_START_POS = 0;
var PARTICLE_NUM    = 10000;
var PARTICLE_SIZE   = DOT_SIZE;
var PARTICLE_RANGE       = 110;
var PARTICLE_RANGE_HALF  = PARTICLE_RANGE/2;

var renderer, scene, camera, particleSystem;
var uniforms, attributes;

var cos = Math.cos;
var sin = Math.sin;
var abs = Math.abs;
var floor = Math.floor;
var rand = THREE.Math.randFloat;

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
    var geometry = new THREE.Geometry();

    // vertex colors
    var colors = [];
    var i = 0;
    
    // 顔
    Sphere(100,  5000,   0,   0,   0, 0xffffff );
    
    // 頬
    Sphere( 30,  1000, -50,   0, +80, 0xff0000 );
    Sphere( 30,  1000, +50,   0, +80, 0xff0000 );
    
    // 鼻
    Sphere( 30,  1000,   0,   0, +80, 0xff0000 );
    
    // 目
    Circle( 10,   300, -20, +50, +80, 0xdddddd );
    Circle( 10,   300, +20, +50, +80, 0xdddddd );
    
    function Circle( r, n, pos_x, pos_y, pos_z, rgb ) {
        for ( var i = 0; i < n; i++ ) {
            var x = Math.random() * r * 2 - r;
            var y = Math.random() * r * 2 - r;
            var z = 0.8 * r * 2 - r;
            var vertex = new THREE.Vector3(x, y, z);
            console.log( vertex.length() );

            if ( vertex.length() < r ) {
                var color = new THREE.Color();
                color.setHex(rgb);
                colors.push(color);
                vertex.x += pos_x;
                vertex.y += pos_y;
                vertex.z += pos_z;
                geometry.vertices.push(vertex);

                var velocity = new THREE.Vector3(Math.random(), Math.random(), Math.random());
                vertex.velocity = velocity;
            }
        }
    }

    function Sphere( r, n, pos_x, pos_y, pos_z, rgb ) {
/*
        for ( var i = 0; i < n; i++ ) {
            var x = Math.random() * r * 2 - r;
            var y = Math.random() * r * 2 - r;
            var z = Math.random() * r * 2 - r;
            var vertex = new THREE.Vector3(x, y, z);

            if ( vertex.length() < r ) {
                var color = new THREE.Color();
                color.setHex(rgb);
                colors.push(color);
                vertex.x += pos_x;
                vertex.y += pos_y;
                vertex.z += pos_z;
                geometry.vertices.push(vertex);

                var velocity = new THREE.Vector3(Math.random(), Math.random(), Math.random());
                vertex.velocity = velocity;
            }
        }
*/
        for ( var i = 0; i < n; i++ ) {
            // ■ 極座標系 - Wikipedia
            // http://ja.wikipedia.org/wiki/%E6%A5%B5%E5%BA%A7%E6%A8%99%E7%B3%BB
            // x = r sinθcosφ
            // y = r sinθsinφ
            // z = r cosθ
            var theta = Math.random() * 2 * Math.PI;
            var phi   = Math.random() * 2 * Math.PI;
            var x = r * Math.sin(theta) * Math.cos(phi);
            var y = r * Math.sin(theta) * Math.sin(phi);
            var z = r * Math.cos(theta);
            var vertex = new THREE.Vector3(x, y, z);

            var color = new THREE.Color();
            color.setHex(rgb);
            colors.push(color);
            vertex.x += pos_x;
            vertex.y += pos_y;
            vertex.z += pos_z;
            geometry.vertices.push(vertex);

            var velocity = new THREE.Vector3(Math.random(), Math.random(), Math.random());
            vertex.velocity = velocity;
        }
    }
    geometry.colors = colors;

    // material
    attributes = {

        size: {    type: 'f', value: [] },
        customColor: { type: 'c', value: [] }

    };

    uniforms = {

        amplitude: { type: "f", value: 1.0 },
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
        texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "../../assets/o/3/x/L/o3xLK.png" ) },
        //texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "ball.png" ) },

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
/*
    var material = new THREE.ParticleBasicMaterial( {
        size: DOT_SIZE/2,
        transparent: true,
        opacity: 0.7,
        vertexColors: true
    } );
*/
    
    // particle system
    particleSystem = new THREE.PointCloud(geometry, material);

    particleSystem.dynamic = true;
    //particleSystem.sortParticles = true;

    var vertices = particleSystem.geometry.vertices;
    var values_size = attributes.size.value;
    var values_color = attributes.customColor.value;

    for (var v = 0; v < vertices.length; v++) {

        values_size[v] = DOT_SIZE * 1.0;
        values_color[v] = colors[v];
    }

    //particleSystem.rotation.y -= Math.PI / 2;
    particleSystem.rotation.y = 0;

    scene.add(particleSystem);

}

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    // rotate
    particleSystem.rotation.y += 0.010;

/*
    // 移動
    var vertices = particleSystem.geometry.vertices;
    for (var i = 0, len = vertices.length; i < len; ++i) {
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
*/
    // render
    renderer.render(scene, camera);

}