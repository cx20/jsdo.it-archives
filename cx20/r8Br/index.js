// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その９）（失敗）" http://jsdo.it/cx20/d2KX
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その８）" http://jsdo.it/cx20/8Jmv
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その７）" http://jsdo.it/cx20/A5nH
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その６）" http://jsdo.it/cx20/i5wV
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その５）" http://jsdo.it/cx20/qEka
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その４）" http://jsdo.it/cx20/jEqZ
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その３）" http://jsdo.it/cx20/ky6o
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その２）" http://jsdo.it/cx20/rrlt
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

'use strict';

//Physijs.scripts.worker = 'physijs_worker.js';
//Physijs.scripts.ammo = 'ammo.js';
Physijs.scripts.worker = '../../assets/7/0/k/8/70k8I.js';
Physijs.scripts.ammo = 'https://rawcdn.githack.com/chandlerprall/Physijs/master/examples/js/ammo.js';

var initScene, render, createShape, NoiseGen,
    renderer, scene, light, ground, geometry, material, camera;

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function (evt) {
    //TWEEN.start();
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    document.getElementById( 'viewport' ).appendChild( renderer.domElement );

    scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
    scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
    scene.addEventListener(
        'update',
        function() {
            scene.simulate( undefined, 2 );
            //physics_stats.update();
        }
    );

    camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set( 60, 50, 60 );
    camera.lookAt( scene.position );
    scene.add( camera );
    
    // Light
    light = new THREE.DirectionalLight( 0xFFFFFF );
    light.position.set( 20, 40, -15 );
    light.target.position.copy( scene.position );
    light.castShadow = true;
    light.shadowCameraLeft = -60;
    light.shadowCameraTop = -60;
    light.shadowCameraRight = 60;
    light.shadowCameraBottom = 60;
    light.shadowCameraNear = 20;
    light.shadowCameraFar = 200;
    light.shadowBias = -.0001
    light.shadowMapWidth = light.shadowMapHeight = 2048;
    light.shadowDarkness = .7;
    scene.add( light );
    
    // Materials
    material = Physijs.createMaterial(
        //new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( './grass.png' ) }),
        //new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../../assets/n/l/v/L/nlvLt.png')}), // 富士山
        new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../../assets/9/r/4/P/9r4PX.png')}), // 芦ノ湖
        1.0, // high friction
        1.0 // low restitution
    );
    var x1 = 128;
    var y1 = 128;
    var x2 = 192; // 256 -> 192
    var y2 = 192; // 256 -> 192

    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    var s = (evt.target.response || evt.target.responseText).split("\n");
    var c = 0;
    for (var i = 0; i < y2; i++) {
        var r = s[i].split(",");
        for (var j in r) {
            var h = r[j] == 'e' ? 0 : Number(r[j]);
            //geometry.vertices[c].z = h * 1; // 高さの強調度を変える場合は、ここの数値を変更する
            geometry.vertices[c].z = h * 1.0; // 1.0 → 1.5 に変更
            //geometry.attributes.position.array[c * 3 + 2] = h * 1.0; // 1.0 → 1.5 に変更
            c++;
        }
    }
    
    // If your plane is not square as far as face count then the HeightfieldMesh
    // takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
    ground = new Physijs.HeightfieldMesh(
        geometry,
        material,
        0, // mass
        x2 - 1,
        y2 - 1
    );
    ground.rotation.x = Math.PI / -2;
    ground.receiveShadow = true;
    scene.add( ground );
    
    requestAnimationFrame( render );
    scene.simulate();
    
    createShape();
} );

render = function() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
};

createShape = (function() {
    var addshapes = true,
        shapes = 0,
        box_geometry = new THREE.BoxGeometry( 3, 3, 3 ),
        sphere_geometry = new THREE.SphereGeometry( 1.5, 32, 32 ),
        cylinder_geometry = new THREE.CylinderGeometry( 2, 2, 1, 32 ),
        cone_geometry = new THREE.CylinderGeometry( 0, 2, 4, 32 ),
        octahedron_geometry = new THREE.OctahedronGeometry( 1.7, 1 ),
        torus_geometry = new THREE.TorusKnotGeometry ( 1.7, .2, 32, 4 ),
        doCreateShape;
    
    setTimeout(
        function addListener() {
            var button = document.getElementById( 'stop' );
            if ( button ) {
                button.addEventListener( 'click', function() { addshapes = false; } );
            } else {
                setTimeout( addListener );
            }
        }
    );
        
    doCreateShape = function() {
        var shape;
        //var material = new THREE.MeshLambertMaterial({ opacity: 0, transparent: true });
        var material = new THREE.MeshLambertMaterial({ opacity: 1, transparent: true });
        
        switch ( Math.floor(Math.random() * 2) ) {
            case 0:
                shape = new Physijs.BoxMesh(
                    box_geometry,
                    material
                );
                break;
            
            case 1:
                shape = new Physijs.SphereMesh(
                    sphere_geometry,
                    material,
                    undefined,
                    { restitution: Math.random() * 1.5 }
                );
                break;
        }
            
        shape.material.color.setRGB( Math.random() * 100 / 100, Math.random() * 100 / 100, Math.random() * 100 / 100 );
        shape.castShadow = true;
        shape.receiveShadow = true;
        
        shape.position.set(
            Math.random() * 30 - 15,
            50,
            Math.random() * 30 - 15
        );
        
        shape.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        if ( addshapes ) {
            shape.addEventListener( 'ready', createShape );
        }
        scene.add( shape );
        
        //new TWEEN.Tween(shape.material).to({opacity: 1}, 500).start();
        
        document.getElementById('shapecount').textContent = (++shapes) + ' shapes created';
    };
    
    return function() {
        setTimeout( doCreateShape, 250 );
    };
})();

//window.onload = initScene;
    
//xhr.open('GET',  'dem.csv', true);
//xhr.open('GET', '../../assets/2/g/t/o/2gtor.csv', true); // 富士山
xhr.open('GET', '../../assets/4/9/G/4/49G4v.csv', true); // 芦ノ湖
xhr.send(null);
