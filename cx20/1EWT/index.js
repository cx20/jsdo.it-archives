// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その３）" http://jsdo.it/cx20/ky6o
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その２）" http://jsdo.it/cx20/rrlt
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var scene;
var camera;
var renderer;
var theta = 0;
var width = window.innerWidth;
var height = window.innerHeight;

// http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");

    var size = img.width * img.height;
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    for (var i = 0; i < size; i++) {
        data[i] = 0;
    }

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var all = pix[i] + pix[i + 1] + pix[i + 2];
        data[j++] = all / 25;
    }

    return data;
}

var img = new Image();
img.onload = function () {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    var data = getHeightData(img);
  
    // plane
    var x1 = 128;
    var y1 = 128;
    var x2 = 192;
    var y2 = 192;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    for (var i = 0; i < geometry.vertices.length; i++) {
         geometry.vertices[i].z = data[i];
    }
 
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture("../../assets/b/c/S/1/bcS1a.png") // texture.png
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);

    document.getElementById("webgl").appendChild(renderer.domElement);
    animate();
}

img.src = "../../assets/2/b/O/p/2bOpb.png"; // heightMap.png

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    animate(); // 再描画
};

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    camera.lookAt(scene.position);
    camera.position.x = 100 * Math.sin(theta * Math.PI / 180);
    camera.position.y = 100 * Math.cos(60    * Math.PI / 180);
    camera.position.z = 100 * Math.cos(theta * Math.PI / 180);

    theta += 0.2;
    renderer.render(scene, camera);
}
