// forked from cx20's "新燃岳付近の3Dデータを表示してみる" http://jsdo.it/cx20/GhZA
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var gui;
var scene;
var camera;
var renderer;
var controls;
var engine;
var showSmoke = false;
var clock = new THREE.Clock();
var width = window.innerWidth - 2;
var height = window.innerHeight - 2;
var original_file = "../../assets/w/N/q/1/wNq1l.jpg";
var mask_file = "../../assets/q/W/8/3/qW834.png";
var lava_file = "../../assets/w/a/o/C/waoCH.jpg";
var noise_file = "../../assets/m/9/h/n/m9hnf.png";
var SMOKE = false;
var ROTATE = false;
var LAVA = false;
var SAR = true;

var imageNo = 1;
var auto = true;
var sar = true;

var emitter, particleGroup;
var customUniforms;
var loader = new THREE.TextureLoader();
var dataSet = [
    {label:"2017年10月31日23時", map:"../../assets/o/1/K/D/o1KDx.jpg", lava:"../../assets/s/z/r/m/szrmh.png"},
    {label:"2018年 3月 6日23時", map:"../../assets/s/x/4/e/sx4eN.jpg", lava:"../../assets/m/J/K/i/mJKie.png"},
    {label:"2018年 3月 7日13時", map:"../../assets/g/0/S/c/g0ScN.jpg", lava:"../../assets/a/5/l/S/a5lSR.png"},
    {label:"2018年 3月 9日00時", map:"../../assets/a/7/f/F/a7fFR.jpg", lava:"../../assets/o/o/F/l/ooFlF.png"},
    {label:"2018年 3月 9日12時", map:"../../assets/k/w/z/h/kwzhz.jpg", lava:"../../assets/q/W/8/3/qW834.png"},
    {label:"2018年 3月10日12時", map:"../../assets/c/t/s/K/ctsKV.jpg", lava:"../../assets/q/W/8/3/qW834.png"},
    {label:"2018年 3月10日23時", map:"../../assets/c/g/6/g/cg6gT.jpg", lava:"../../assets/q/W/8/3/qW834.png"},
    {label:"2018年 3月12日13時", map:"../../assets/e/0/e/H/e0eHn.jpg", lava:"../../assets/m/c/u/b/mcub0.png"},
    {label:"2018年 3月14日00時", map:"../../assets/4/8/Y/r/48YrH.jpg", lava:"../../assets/q/l/O/u/qlOub.png"},
    {label:"2018年 3月14日12時", map:"../../assets/2/X/f/F/2XfFc.jpg", lava:"../../assets/q/l/O/u/qlOub.png"},
    {label:"2018年 3月15日23時", map:"../../assets/o/8/d/H/o8dH3.jpg", lava:"../../assets/q/l/O/u/qlOub.png"},
    {label:"2018年 3月21日13時", map:"../../assets/s/0/i/a/s0iag.jpg", lava:"../../assets/m/T/z/G/mTzGm.png"},
    {label:"2018年 3月27日??時", map:"../../assets/4/O/3/u/4O3u1.jpg", lava:"../../assets/m/T/z/G/mTzGm.png"}
];

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
        var k = 3.5; // 起伏の強調度
        var height = (pix[i] + pix[i + 1] + pix[i + 2])/3 * 1/16 * k;
        data[j++] = height;
    }

    return data;
}

function initParticles() {
    var texture = loader.load('../../assets/h/z/u/p/hzupb.png');  // smokeparticle.png

    particleGroup = new SPE.Group({
        texture: {
            value: texture
        },
        maxParticleCount: 1000, 
        blending: THREE.NormalBlending,
        transparent: true
    });

    emitter = new SPE.Emitter({
        // 寿命
        maxAge: {
            value: 2
        },
        // 位置
        position: {
            value: new THREE.Vector3(0, 18, 0),
            spread: new THREE.Vector3( 0, 0, 5 )
        },
        // 加速度
        acceleration: {
            value: new THREE.Vector3(0, 5, 10),
            spread: new THREE.Vector3( 10, 10, 10 )
        },
        // 速度
        velocity: {
            value: new THREE.Vector3(0, 10, 0),
            spread: new THREE.Vector3(10, 10, 10)
        },
        // 色
        color: {
            value: [ new THREE.Color('#A0A0A0') ]
        },
        // 不透明度
        opacity: {
            value: 0.8
        },
        // サイズ
        size: {
            value: 15
        },
        particleCount: 1000
    });
    
}

var img = new Image();
img.onload = function() {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 100, 50);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // OrbitControls の準備
    controls = new THREE.OrbitControls(camera, renderer.domElement);
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
        geometry.vertices[i].z = data[i] - 30;
    }

    // テクスチャを貼り付け
    var originalTexture = loader.load(dataSet[0].map);
    var maskTexture = loader.load(dataSet[0].lava);

    // base image texture for mesh
    var lavaTexture = loader.load(lava_file); // lava.jpg
    lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping; 
    // multiplier for distortion speed         
    var baseSpeed = 0.02;
    // number of times to repeat texture in each direction
    var repeatS = repeatT = 4.0;
    
    // texture used to generate "randomness", distort all other textures
    var noiseTexture = loader.load(noise_file); // cloud.png
    noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping; 
    // magnitude of noise effect
    var noiseScale = 0.5;
    
    // texture to additively blend with base image texture
    var blendTexture = loader.load(lava_file); // lava.jpg
    blendTexture.wrapS = blendTexture.wrapT = THREE.RepeatWrapping; 
    // multiplier for distortion speed 
    var blendSpeed = 0.01;
    // adjust lightness/darkness of blended texture
    var blendOffset = 0.25;

    // texture to determine normal displacement
    var bumpTexture = noiseTexture;
    bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping; 
    // multiplier for distortion speed         
    var bumpSpeed   = 0.15;
    // magnitude of normal displacement
    var bumpScale   = 40.0;
    
    // use "this." to create global object
    customUniforms = {
        originalTexture:{ type: "t", value: originalTexture },
        maskTexture:    { type: "t", value: maskTexture },
        baseTexture:    { type: "t", value: lavaTexture },
        baseSpeed:      { type: "f", value: baseSpeed },
        repeatS:        { type: "f", value: repeatS },
        repeatT:        { type: "f", value: repeatT },
        noiseTexture:   { type: "t", value: noiseTexture },
        noiseScale:     { type: "f", value: noiseScale },
        blendTexture:   { type: "t", value: blendTexture },
        blendSpeed:     { type: "f", value: blendSpeed },
        blendOffset:    { type: "f", value: blendOffset },
        bumpTexture:    { type: "t", value: bumpTexture },
        bumpSpeed:      { type: "f", value: bumpSpeed },
        bumpScale:      { type: "f", value: bumpScale },
        alpha:          { type: "f", value: 1.0 },
        time:           { type: "f", value: 1.0 },
        lava:           { type: "i", value: false },
    };

    var material = new THREE.ShaderMaterial({
        uniforms: customUniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragment_shader1').textContent
    });

    var plane = new THREE.Mesh(geometry, material);
    
    // 座標回転
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);
    scene.position.y = -20.0;

    initParticles();
    
    // GUI
    gui = new dat.GUI();
    gui.add(window, 'imageNo', 1, dataSet.length ).step( 1 ).listen().name("ImageNo");
    gui.add(window, 'sar' ).listen().name("SAR Image");
    gui.add(window, 'auto' ).listen().name("Animation");

    var mapLava = gui.add(window, 'LAVA').name('Lava');

    mapLava.onChange(function (value) {
        customUniforms.lava.value = value;
    });

    //setInterval( update, 300 );
    setTimeout( update, 300 );
    
    document.getElementById("webgl").appendChild(renderer.domElement);
    animate();

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }, false );
};

img.src = "../../assets/c/e/D/n/ceDnj.png"; // heightMap.png

function update() {
    if ( auto ) {
        imageNo++;
        if ( imageNo > dataSet.length ) {
           imageNo = 1;
        }
    }
    var data = dataSet[imageNo-1];
    document.getElementById('info').textContent = data.label;
    if ( sar ) {
        customUniforms.originalTexture.value = loader.load(data.map);
    } else {
        customUniforms.originalTexture.value = loader.load(original_file);
    }
    customUniforms.maskTexture.value = loader.load(data.lava);

    if ( imageNo == dataSet.length ) {
        setTimeout( update, 1500 );
    } else {
        setTimeout( update, 300 );
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    var dt = clock.getDelta();
    if ( showSmoke ) {
        particleGroup.tick( dt );
    }

    var delta = 5 * clock.getDelta();
    customUniforms.time.value += 0.2 * delta;
    customUniforms.time.value += dt;

    renderer.render(scene, camera);
}
