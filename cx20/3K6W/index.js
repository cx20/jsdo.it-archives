// forked from cx20's "Three.js でドット絵を回転するテスト（その３）" http://jsdo.it/cx20/eRDK
// forked from cx20's "Three.js でドット絵を回転するテスト（その１）" http://jsdo.it/cx20/r8Zv
// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N

var controls;
var width = 465;
var height = 465;
var scene;
var camera;
var renderer;
var container;
var canvasFrame;

var img = new Image();
//img.src = "title.png";
img.src = "../../assets/4/M/x/T/4MxTG.png";

img.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    ctx.drawImage(img, 0, 0, w, h);
    imageData = ctx.getImageData(0, 0, w, h);
    threeStart();
};

function threeStart() {
    initThree();
    initCamera();
    initObject();
    animate();
}

function initThree() {
    canvasFrame = document.getElementById("canvas-frame");
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    canvasFrame.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    //var axis = new THREE.AxisHelper( 100, 100, 100 );
    //scene.add( axis );
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(75, canvasFrame.clientWidth / canvasFrame.clientHeight, 1, 10000);
    camera.position.set(0, 0, 250);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.4;
    controls.autoRotate = true;     // true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 5.0; // 自動回転する時の速度
}

function initObject() {
    var R = 1.5;
    var colors = [];
    for (var h = 0; h < imageData.height; h++) {
        for (var w = 0; w < imageData.width; w++) {
            var pos = w + h * 128;
            var ptr = pos * 4;
            var r = imageData.data[ptr + 0];
            var g = imageData.data[ptr + 1];
            var b = imageData.data[ptr + 2];
            var a = imageData.data[ptr + 3];
            var color = r * 0x10000 + g * 0x100 + b;
            colors["0x" + color.toString(16)] = color;
        }
    }

    var cnt = 0;
    for (var c in colors) {
        cnt++;
        var geometryCompound = new THREE.Geometry();
        var material = new THREE.MeshBasicMaterial({
            color: colors[c]
        });
        for (var h = 0; h < imageData.height; h++) {
            for (var w = 0; w < imageData.width; w++) {
                var x = w;
                var y = h;

                var pos = w + h * 128;
                var ptr = pos * 4;
                var r = imageData.data[ptr + 0];
                var g = imageData.data[ptr + 1];
                var b = imageData.data[ptr + 2];
                var a = imageData.data[ptr + 3];
                var color = r * 0x10000 + g * 0x100 + b;
                if (colors[c] == ("0x" + color.toString(16))) {
                    var geometry = new THREE.CylinderGeometry(R / 2, R / 10, 30, 6);
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.position.x = x * 2 - 128;
                    // 凹凸を付ける
                    mesh.position.y = Math.random();
                    // タイトル部分
                    if (x > 20 && y > 15 && x < 105 && y < 60) {
                        mesh.position.y += 2 * Math.random() + 5;
                    }
                    // 床
                    if (y > 104) {
                        mesh.position.y += 2 * Math.random() + 8;
                    }
                    // 白色の箇所を凸表示
                    if (r > 200 && g > 200 && b > 200) {
                        mesh.position.y += 2 * Math.random() + 1;
                    }
                    mesh.position.z = (y * 2 - 120) * 0.8;
                    THREE.GeometryUtils.merge(geometryCompound, mesh);
                }
            }
        }
        var meshCompound = new THREE.Mesh(geometryCompound, material);
        //meshCompound.rotation.x = Math.PI * 0.5;
        scene.add(meshCompound);
    }
}

function animate() {
    controls.update();
    draw();
    requestAnimationFrame(animate);
}

function draw() {
    renderer.clear();
    renderer.render(scene, camera);
}
