// forked from cx20's "新燃岳付近の3Dデータを表示してみる" http://jsdo.it/cx20/GhZA
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var gui;
var scene;
var camera;
var renderer;
var controls;
var engine;
var showSmoke = true;
var clock = new THREE.Clock();
var width = window.innerWidth - 2;
var height = window.innerHeight - 2;
var mask_file = "../../assets/m/T/z/G/mTzGm.png";
var lava_file = "../../assets/w/a/o/C/waoCH.jpg";
var noise_file = "../../assets/m/9/h/n/m9hnf.png";
var MAP = "../../assets/w/N/q/1/wNq1l.jpg;../../assets/m/T/z/G/mTzGm.png"; // SAR強度画像(2018年 3月27日??時)
var SMOKE = true;
var ROTATE = false;
var LAVA = false;
var emitter, particleGroup;
var emitters = [];
var customUniforms;
var loader = new THREE.TextureLoader();

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
    var texture = loader.load('../../assets/h/z/U/p/hzUpb.png');  // smokeparticle.png

    particleGroup = new SPE.Group({
        texture: {
            value: texture
        },
        maxParticleCount: 1000, 
        blending: THREE.NormalBlending,
        transparent: true
    });
    
    var MAX = 36;

    for ( var i = 0; i < MAX; i++ ) {
        var pos_x = 11 * Math.sin(2 * Math.PI * i/MAX)+2;
        var pos_y = 11 * Math.cos(2 * Math.PI * i/MAX);
        // 火山口周りの水蒸気
        var e = new SPE.Emitter({
            // 寿命
            maxAge: {
                value: 1
            },
            // 位置
            position: {
                value: new THREE.Vector3(pos_x, 16.5, pos_y),
                spread: new THREE.Vector3( 1, 1, 1 )
            },
            // 加速度
            acceleration: {
                value: new THREE.Vector3(0, 0.5, 1.0),
                spread: new THREE.Vector3( 2, 2, 2 )
            },
            // 速度
            velocity: {
                value: new THREE.Vector3(0, 1+pos_y*0.2, 0.5),
                spread: new THREE.Vector3(2, 2, 2)
            },
            // 色
            color: {
                value: [ new THREE.Color('#FFFFFF') ]
            },
            // 不透明度
            opacity: {
                value: 0.8
            },
            // サイズ
            size: {
                value: 3
            },
            particleCount: 20
        });
                                  
        emitters.push(e);
    }
    
    // 西山腹の水蒸気
    var e2 = new SPE.Emitter({
        // 寿命
        maxAge: {
            value: 1
        },
        // 位置
        position: {
            value: new THREE.Vector3(-16, 14, 2),
            spread: new THREE.Vector3( 1, 0, 1 )
        },
        // 加速度
        acceleration: {
            value: new THREE.Vector3(0, 1, 1.0),
            spread: new THREE.Vector3( 2, 2, 2 )
        },
        // 速度
        velocity: {
            value: new THREE.Vector3(0, 2, 0.5),
            spread: new THREE.Vector3(2, 2, 2)
        },
        // 色
        color: {
            value: [ new THREE.Color('#FFFFFF') ]
        },
        // 不透明度
        opacity: {
            value: 0.8
        },
        // サイズ
        size: {
            value: 3
        },
        particleCount: 50
    });
    
    emitters.push(e2);
}

var img = new Image();
img.onload = function() {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(-50, 10, 10);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // OrbitControls の準備
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 2.0; //自動回転する時の速度

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
/*
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(MAP)
    });
*/
    var imageFiles = MAP.split(";"); 
    var originalTexture = loader.load(imageFiles[0]);
    var maskTexture = loader.load(imageFiles[1]);

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
        lava:           { type: "i", value: LAVA },
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
    var mapSelector = gui.add(window, 'MAP', {
        "通常地図": "../../assets/y/O/O/X/yOOXI.jpg;../../assets/m/T/z/G/mTzGm.png",
        "空撮写真": "../../assets/w/N/q/1/wNq1l.jpg;../../assets/m/T/z/G/mTzGm.png",
        "SAR強度画像(2017年10月31日23時)": "../../assets/o/1/K/D/o1KDx.jpg;../../assets/s/Z/r/m/sZrmh.png",
        "SAR強度画像(2018年 3月 6日23時)": "../../assets/s/x/4/e/sx4eN.jpg;../../assets/m/J/K/i/mJKie.png",
        "SAR強度画像(2018年 3月 7日13時)": "../../assets/g/0/S/c/g0ScN.jpg;../../assets/A/5/l/S/A5lSR.png",
        "SAR強度画像(2018年 3月 9日00時)": "../../assets/A/7/f/F/A7fFR.jpg;../../assets/o/O/F/l/oOFlF.png",
        "SAR強度画像(2018年 3月 9日12時)": "../../assets/k/W/z/h/kWzhz.jpg;../../assets/q/W/8/3/qW834.png",
        "SAR強度画像(2018年 3月10日12時)": "../../assets/c/t/s/K/ctsKV.jpg;../../assets/q/W/8/3/qW834.png",
        "SAR強度画像(2018年 3月10日23時)": "../../assets/c/g/6/g/cg6gT.jpg;../../assets/q/W/8/3/qW834.png",
        "SAR強度画像(2018年 3月12日13時)": "../../assets/e/0/e/H/e0eHn.jpg;../../assets/m/c/u/b/mcub0.png",
        "SAR強度画像(2018年 3月14日00時)": "../../assets/4/8/Y/r/48YrH.jpg;../../assets/q/l/O/u/qlOub.png",
        "SAR強度画像(2018年 3月14日12時)": "../../assets/2/X/f/F/2XfFc.jpg;../../assets/q/l/O/u/qlOub.png",
        "SAR強度画像(2018年 3月15日23時)": "../../assets/o/8/d/H/o8dH3.jpg;../../assets/q/l/O/u/qlOub.png",
        "SAR強度画像(2018年 3月21日13時)": "../../assets/s/0/i/a/s0iag.jpg;../../assets/m/T/z/G/mTzGm.png",
        "SAR強度画像(2018年 3月27日??時)": "../../assets/4/O/3/u/4O3u1.jpg;../../assets/m/T/z/G/mTzGm.png",
        "SAR強度画像から判読した地形変化領域": "../../assets/0/0/z/g/00zgM.jpg;../../assets/m/T/z/G/mTzGm.png", // 3/24 更新
    });
    var mapSmoke = gui.add(window, 'SMOKE').name('Smoke');
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');
    var mapLava = gui.add(window, 'LAVA').name('Lava');

    mapSelector.onChange(function (value) {
        //plane.material.map = THREE.ImageUtils.loadTexture(value);
        var imageFiles = value.split(";");
        customUniforms.originalTexture.value = loader.load(imageFiles[0]);
        customUniforms.maskTexture.value = loader.load(imageFiles[1]);
    });
    
    if ( showSmoke ) {
        //particleGroup.addEmitter( emitter );
        for ( var i = 0; i < emitters.length; i++ ) {
            particleGroup.addEmitter( emitters[i] );
        }
        scene.add( particleGroup.mesh );
    }
    mapSmoke.onChange(function (value) {
        if ( value ) {
            //particleGroup.addEmitter( emitter );
            for ( var i = 0; i < emitters.length; i++ ) {
                particleGroup.addEmitter( emitters[i] );
            }
            scene.add( particleGroup.mesh );
        } else {
            //particleGroup.removeEmitter( emitter );
             for ( var i = emitters.length-1; i >= 0; i-- ) {
                particleGroup.removeEmitter( emitters[i] );
            }
       }
        
        showSmoke = value;
    });
    mapRotate.onChange(function (value) {
        controls.autoRotate = value;
    });

    mapLava.onChange(function (value) {
        customUniforms.lava.value = value;
    });

    //gui.close();

    document.getElementById("webgl").appendChild(renderer.domElement);
    animate();

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }, false );
};

img.src = "../../assets/c/e/D/n/ceDnj.png"; // heightMap.png

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
