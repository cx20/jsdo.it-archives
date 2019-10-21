// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var gui;
var scene;
var sceneCube;
var camera;
var cameraCube;
var renderer;
var controls;
//var engine;
var showSmoke = false;
var clock = new THREE.Clock();
var width = window.innerWidth - 2;
var height = window.innerHeight - 2;
var MAP = "../../assets/g/L/J/J/gLJJh.jpg"; // 空撮写真
var SMOKE = false;
var ROTATE = true;


// heightMap より標高データを取得する
// 参考：http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");

    var size = img.width * img.height;
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var k = 1.5; // 起伏の強調度
        var height = (pix[i] + pix[i + 1] + pix[i + 2])/3 * 1/16 * k;
        data[j++] = height;
    }

    return data;
}

var img = new Image();
img.onload = function() {
    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();
    
    scene.add(new THREE.AmbientLight(0xffffff));

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 100, 100);

    cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
    
    var urls = [
        "../../assets/x/s/Y/k/xsYk8.jpg", // dark-s_px.jpg
        "../../assets/1/g/O/W/1gOWa.jpg", // dark-s_py.jpg
        "../../assets/m/7/s/7/m7s7q.jpg", // dark-s_pz.jpg
        "../../assets/4/x/e/H/4xeHN.jpg", // dark-s_nx.jpg
        "../../assets/g/V/E/9/gVE9m.jpg", // dark-s_ny.jpg
        "../../assets/f/D/1/C/fD1Cf.jpg"  // dark-s_nz.jpg
    ];
    
    var textureCube = THREE.ImageUtils.loadTextureCube( urls );
    textureCube.format = THREE.RGBFormat;

    scene.matrixAutoUpdate = false;

    // Skybox
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = textureCube;

    var material = new THREE.ShaderMaterial( {

        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        side: THREE.BackSide

    } ),

    mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );
    sceneCube.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // OrbitControls の準備
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    //controls.rotateUp(Math.PI * 0.38);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0; //自動回転する時の速度

    // heightMap より標高データを取得
    var data = getHeightData(img);

    // 標高データを元に地形を生成
    var x1 = 128;
    var y1 = 128;
    var x2 = 256;
    var y2 = 256;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    for (var i = 0; i < geometry.vertices.length; i++) {
        geometry.vertices[i].z = data[i];
    }

    // テクスチャを貼り付け
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(MAP)
    });
    var plane = new THREE.Mesh(geometry, material);
    
    // 座標回転
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);

    // GUI
    gui = new dat.GUI();
    var mapSelector = gui.add(window, 'MAP', {
        "通常地図": "../../assets/o/k/8/M/ok8Mu.png",
        "空撮写真": "../../assets/g/L/J/J/gLJJh.jpg"
    });
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');

    mapSelector.onChange(function (value) {
        plane.material.map = THREE.ImageUtils.loadTexture(value);
    });
    
    mapRotate.onChange(function (value) {
        controls.autoRotate = value;
    });
    

    document.getElementById("webgl").appendChild(renderer.domElement);
    animate();

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }, false );
};

img.src = "../../assets/w/5/U/p/w5Upg.png"; // heightMap.png

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    cameraCube.rotation.copy( camera.rotation );
    renderer.clear();
    renderer.render(scene, camera);
    //renderer.render( sceneCube, cameraCube );
}
