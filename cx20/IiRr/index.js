// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その１１）（調整中）" http://jsdo.it/cx20/alRV
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その１０）（調整中）" http://jsdo.it/cx20/2Coiw
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その９）（調整中）" http://jsdo.it/cx20/IOKw
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その８）（調整中）" http://jsdo.it/cx20/qfLd
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その７）（調整中）" http://jsdo.it/cx20/uAVQ
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その６）（調整中）" http://jsdo.it/cx20/oKOv
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その５）（調整中）" http://jsdo.it/cx20/ShdN
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その４）（調整中）" http://jsdo.it/cx20/Ui8Q
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その３）（調整中）" http://jsdo.it/cx20/WkzG
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト（その２）" http://jsdo.it/cx20/E2ug
// forked from cx20's "[WebGL] Three.js glTF Exporter を使ってみるテスト" http://jsdo.it/cx20/E1yA
// forked from cx20's "Three.js でドット絵を回転するテスト（その３）" http://jsdo.it/cx20/eRDK
// forked from cx20's "Three.js でドット絵を回転するテスト（その１）" http://jsdo.it/cx20/r8Zv
// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N

var DOT_SIZE = 3;
var X_START_POS = -24;
var Y_START_POS = -24;
var Z_START_POS = -8;

// http://kyucon.com/qblock/#/87892
var dataSet = [
  [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","茶","茶","茶","茶","茶","茶","×","×","×","×","×","×",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×",
    "×","×","×","×","茶","茶","茶","茶","茶","茶","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
  ],
  [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","茶","茶","茶","×","×","×","×","×",
    "×","×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","黒","×","×","白",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","白",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","白","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×",
    "×","×","茶","茶","×","×","×","×","×","×","茶","茶","×","×","×","×",
    "×","茶","茶","×","×","×","×","×","×","×","×","茶","茶","×","×","×",
    "焦","焦","×","×","×","×","×","×","×","×","×","×","焦","焦","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
  ],
  [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","茶","茶","茶","茶","×","×","×","×",
    "×","×","×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","×",
    "×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","肌",
    "茶","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","肌",
    "茶","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
  ],
  [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","茶","茶","茶","茶","×","×","×","×",
    "×","×","×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","肌",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","肌",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
  ],
  [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","茶","茶","茶","×","×","×","×","×",
    "×","×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","黒","×","×","白",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","白",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","白","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×",
    "×","×","茶","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×",
    "×","×","茶","茶","×","×","×","×","×","×","茶","茶","×","×","×","×",
    "×","茶","茶","×","×","×","×","×","×","×","×","茶","茶","×","×","×",
    "焦","焦","×","×","×","×","×","×","×","×","×","×","焦","焦","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
  ],
  [
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","茶","茶","茶","茶","茶","茶","×","×","×","×","×","×",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×",
    "×","×","×","茶","茶","茶","茶","茶","茶","茶","茶","×","×","×","×","×",
    "×","×","×","×","茶","茶","茶","茶","茶","茶","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
  ],
];

function getRgbColor(c) {
  var colorHash = {
    "×": "#DCAA6B", // 段ボール色
    "黒": "#101010",
    "白": "#ffffff",
    "肌": "#ffcccc",
    //"茶": "#800000",
    //"茶": "#D8A35F",
    "茶": "#804000",
    //"赤":"#ff0000",
    "赤": "#AF4357",
    "黄": "#ffff00",
    "緑": "#00ff00",
    "水": "#00ffff",
    "青": "#0000ff",
    //"紫":"#800080"
    "紫": "#70479F",
    "焦": "#404000"
  };
  return colorHash[c];
}

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
var renderer;
var theta = 0;
var controls;

function exportGLTF(input) {
    var gltfExporter = new THREE.GLTFExporter();
    var options = {
        binary: document.getElementById('option_binary').checked
    };
    gltfExporter.parse( input, function( result ) {
        if ( result instanceof ArrayBuffer ) {
            saveArrayBuffer( result, 'scene.glb' );
        } else {
            var output = JSON.stringify( result, null, 2 );
            console.log( output );
            saveString( output, 'scene.gltf' );
        }
    }, options );
}

document.getElementById('export_scene').addEventListener('click', function() {

    exportGLTF(scene1);

});


var link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594

function save( blob, filename ) {
    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();
    // URL.revokeObjectURL( url ); breaks Firefox...
}

function saveString( text, filename ) {
    save( new Blob( [ text ], { type: 'text/plain' } ), filename );
}

function saveArrayBuffer( buffer, filename ) {
    save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
}

var container;

var scene1, scene2;
var gridHelper, sphere;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 50;

    scene1 = new THREE.Scene();
    scene1.name = 'Scene1';

    var i, j, x, y, z;
    var meshArray = [];
    var geometryA = new THREE.Geometry();
    var geometryB = new THREE.Geometry();
    var geometryC = new THREE.Geometry();
    var geometryD = new THREE.Geometry();
    var geometryE = new THREE.Geometry();
    //var meshItem = new THREE.Mesh(new THREE.CubeGeometry(DOT_SIZE * 0.92, DOT_SIZE * 0.92, DOT_SIZE * 0.92)); // 立方体個別の要素
    var meshItem = new THREE.Mesh(new THREE.CubeGeometry(DOT_SIZE * 1, DOT_SIZE * 1, DOT_SIZE * 1)); // 立方体個別の要素

    for (j = 0; j < dataSet.length; j++) {
        for (i = 0; i < dataSet[j].length; i++) {
            x = (16 - i % 16) * DOT_SIZE + X_START_POS;
            y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;
            z = j * DOT_SIZE + Z_START_POS;
            color = getRgbColor(dataSet[j][i]);

            meshItem.position.x = x - 0;
            meshItem.position.y = y;
            meshItem.position.z = z;
            meshItem.updateMatrix();
            // 色別に geometry をマージする
            if (dataSet[j][i] == "茶") {
                geometryA.merge(meshItem.geometry, meshItem.matrix);
            }
            else if (dataSet[j][i] == "焦") {
                geometryB.merge(meshItem.geometry, meshItem.matrix);
            }
            else if (dataSet[j][i] == "白") {
                geometryC.merge(meshItem.geometry, meshItem.matrix);
            }
            else if (dataSet[j][i] == "黒") {
                geometryD.merge(meshItem.geometry, meshItem.matrix);
            }
            else if (dataSet[j][i] == "肌") {
                geometryE.merge(meshItem.geometry, meshItem.matrix);
            }
        }
    }
    
    var materialA = new THREE.MeshStandardMaterial({color: getRgbColor("茶"), roughness: 0.99});
    var meshA = new THREE.Mesh(geometryA, materialA);
    scene1.add(meshA);

    var materialB = new THREE.MeshStandardMaterial({color: getRgbColor("焦"), roughness: 0.99});
    var meshB = new THREE.Mesh(geometryB, materialB);
    scene1.add(meshB);

    var materialC = new THREE.MeshStandardMaterial({color: getRgbColor("白"), roughness: 0.00});
    var meshC = new THREE.Mesh(geometryC, materialC);
    scene1.add(meshC);

    var materialD = new THREE.MeshStandardMaterial({color: getRgbColor("黒"), roughness: 0.00});
    var meshD = new THREE.Mesh(geometryD, materialD);
    scene1.add(meshD);

    var materialE = new THREE.MeshStandardMaterial({color: getRgbColor("肌"), roughness: 0.99});
    var meshE = new THREE.Mesh(geometryE, materialE);
    scene1.add(meshE);

    var hemispheric = new THREE.HemisphereLight( 0xffffff, 0x222222, 1.2 );
    scene1.add(hemispheric);

    //ライティング
    var light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(1, 1, 1).normalize();
    scene1.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-1, -1, -1).normalize();
    scene1.add(light2);

    // 座標軸表示
    var axis = new THREE.AxisHelper(100);
    //scene1.add(axis);

    renderer = new THREE.WebGLRenderer();
    //renderer.setClearColor( 0xffffff );
    renderer.setClearColor( 0x000000 );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 10.0;    //自動回転する時の速度


    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene1, camera);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//
function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    var timer = Date.now() * 0.001;

    //camera.position.x = Math.cos(timer) * 50;
    //camera.position.z = Math.sin(timer) * 50;

    //camera.lookAt(scene1.position);
    renderer.render(scene1, camera);

    controls.update();
}