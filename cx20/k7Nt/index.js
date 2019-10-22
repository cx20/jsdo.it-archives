// forked from cx20's "霧島連山 硫黄山付近の3Dデータを表示してみる" http://jsdo.it/cx20/SLj8
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
var MAP = "../../assets/k/W/u/D/kWuDx.jpg";
var SMOKE = true;
//var ROTATE = true;
var ROTATE = false;
var WIREFRAME = false;
var emitter, particleGroup;
var emitters = [];

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
        var k = 3.0; // 起伏の強調度
        //var height = (pix[i] + pix[i + 1] + pix[i + 2])/3 * 1/16 * k;
        var height = (pix[i] + pix[i + 1] + pix[i + 2])/3 * 1/16 * k - 10; // 位置調整
        data[j++] = height;
    }

    return data;
}

function initParticles() {
    var loader = new THREE.TextureLoader();
    var texture = loader.load('../../assets/h/z/U/p/hzUpb.png');  // smokeparticle.png

    particleGroup = new SPE.Group({
        texture: {
            value: texture
        },
        maxParticleCount: 1000, 
        blending: THREE.NormalBlending,
        transparent: true
    });

    // 噴火位置付近
    emitters.push( new SPE.Emitter({
        maxAge:       { value: 2 },
        position:     { value: new THREE.Vector3(0, -2, 3),   spread: new THREE.Vector3( 2, 2, 2 ) },
        acceleration: { value: new THREE.Vector3(2, 3, 3),    spread: new THREE.Vector3( 3, 1, 3 ) },
        velocity:     { value: new THREE.Vector3(0, 1, 0),    spread: new THREE.Vector3( 1, 1, 1 ) },
        color:        { value: [ new THREE.Color('#FFFFFF') ] },
        opacity:      { value: 0.5 },
        size:         { value: 10 },
        particleCount: 100
    }));

    // 県道1号線付近
    emitters.push( new SPE.Emitter({
        maxAge:       { value: 1 },
        position:     { value: new THREE.Vector3(-13, -4, 4), spread: new THREE.Vector3( 1, 1, 1 ) },
        acceleration: { value: new THREE.Vector3(1, 1.5, 1),  spread: new THREE.Vector3( 1, 1, 1 ) },
        velocity:     { value: new THREE.Vector3(0, 0, 0),      spread: new THREE.Vector3( 1, 1, 1 ) },
        color:        { value: [ new THREE.Color('#FFFFFF') ] },
        opacity:      { value: 0.5 },
        size:         { value: 2 },
        particleCount: 100
    }));

    emitters.push( new SPE.Emitter({
        maxAge:       { value: 1 },
        position:     { value: new THREE.Vector3(-12, -4, 5), spread: new THREE.Vector3( 1, 1, 1 ) },
        acceleration: { value: new THREE.Vector3(1, 1.5, 1),  spread: new THREE.Vector3( 1, 1, 1 ) },
        velocity:     { value: new THREE.Vector3(0, 0, 0),      spread: new THREE.Vector3( 1, 1, 1 ) },
        color:        { value: [ new THREE.Color('#FFFFFF') ] },
        opacity:      { value: 0.5 },
        size:         { value: 2 },
        particleCount: 100
    }));

    emitters.push( new SPE.Emitter({
        maxAge:       { value: 2 },
        position:     { value: new THREE.Vector3(-11, -4, 6),  spread: new THREE.Vector3( 2, 2, 2 ) },
        acceleration: { value: new THREE.Vector3(1, 1.5, 1.5), spread: new THREE.Vector3( 2, 1, 2 ) },
        velocity:     { value: new THREE.Vector3(0, 0, 0),     spread: new THREE.Vector3( 1, 1, 1 ) },
        color:        { value: [ new THREE.Color('#FFFFFF') ] },
        opacity:      { value: 0.5 },
        size:         { value: 4 },
        particleCount: 200
    }));
}

var img = new Image();
img.onload = function() {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    //camera.position.set(0, 50, 100);
    camera.position.set(-80, 20, -10);

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
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(MAP)
    });
    var plane = new THREE.Mesh(geometry, material);
    
    // 座標回転
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);

    initParticles();
    
    // GUI
    gui = new dat.GUI();
    var mapSelector = gui.add(window, 'MAP', {
        "通常地図": "../../assets/q/k/H/D/qkHDy.jpg",
        "空撮写真": "../../assets/k/W/u/D/kWuDx.jpg",
        "噴火口位置":"../../assets/u/j/V/q/ujVqb.jpg",
        "産総研地質図":"../../assets/2/F/X/U/2FXUb.jpg",
        "警戒が必要な範囲":"../../assets/0/F/g/7/0Fg7V.jpg",
        "だいち2号SAR(平成30年4月20日)":"../../assets/2/I/Z/O/2IZOS.jpg",
        "だいち2号SAR(平成30年4月21日)":"../../assets/2/g/Y/g/2gYgD.jpg",
        "だいち2号SAR(平成30年4月23日)":"../../assets/6/A/H/V/6AHVk.jpg",
        "航空機SAR(平成30年2月26日)":"../../assets/q/5/f/w/q5fwb.jpg",
        "航空機SAR(平成30年4月20日)":"../../assets/A/1/D/h/A1Dhq.jpg",
        //"噴火口位置": "../../assets/S/F/t/D/SFtDZ.jpg",
        //"火山弾飛散域": "../../assets/s/9/Z/2/s9Z2u.jpg",
        //"過去噴火口": "../../assets/a/x/u/7/axu7z.jpg",
        //"火山災害対策用図": "../../assets/o/c/P/g/ocPgv.jpg",
        //"火山土地条件図": "../../assets/Q/q/3/g/Qq3gf.jpg",
        //"雪山": "../../assets/g/B/6/9/gB69w.png",
    });
    var mapSmoke = gui.add(window, 'SMOKE').name('Smoke');
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');

    mapSelector.onChange(function (value) {
        plane.material.map = THREE.ImageUtils.loadTexture(value);
    });
    
    if ( showSmoke ) {
        for ( var i = 0; i < emitters.length; i++ ) {
            particleGroup.addEmitter( emitters[i] );
        }
        scene.add( particleGroup.mesh );
    }

    mapSmoke.onChange(function (value) {
        if ( value ) {
            for ( var i = 0; i < emitters.length; i++ ) {
                particleGroup.addEmitter( emitters[i] );
            }
            scene.add( particleGroup.mesh );
        } else {
             for ( var i = emitters.length-1; i >= 0; i-- ) {
                particleGroup.removeEmitter( emitters[i] );
            }
        }
        
        showSmoke = value;
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

img.src = "../../assets/0/x/9/o/0x9o7.png"; // heightMap.png

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
    renderer.render(scene, camera);
}
