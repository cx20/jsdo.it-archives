//  forked from http://threejs.org/examples/webgl_materials_grass.html

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

function getRandomColor() {
    var r = Math.floor(Math.random() * 128);
    var g = Math.floor(Math.random() * 128);
    var b = Math.floor(Math.random() * 128);
    return "rgb(" + r + "," + g + "," + b + ")";
}

var camera, scene, renderer;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 75, 100);

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneGeometry(100, 100);

    var texture = new THREE.Texture(generateTexture());
    texture.needsUpdate = true;

    for (var i = 0; i < 15; i++) {

        var material = new THREE.MeshBasicMaterial({
            //color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 15 ) * 0.4 + 0.1 ),
            color: new THREE.Color(0xffffff),
            map: texture,
            depthTest: false,
            depthWrite: false,
            transparent: true
        });

        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = i * 0.25;
        mesh.rotation.x = -Math.PI / 2;

        scene.add(mesh);

    }

    scene.children.reverse();

    renderer = new THREE.WebGLRenderer();
    renderer.sortObjects = false;
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0;    //自動回転する時の速度

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function generateTexture() {

    var canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;

    var context = canvas.getContext('2d');

    for (var i = 0; i < 50000; i++) {
        //context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
        //context.fillStyle = getRandomColor();
        var x = Math.floor(Math.random() * canvas.width);
        var y = Math.floor(Math.random() * canvas.height);
        var r = Math.random() + 0.15;
        var pos = Math.floor((x / canvas.width) * 16) + Math.floor((y / canvas.height) * 16) * 16;
        var color = getRgbColor(dataSet[pos]);
        context.fillStyle = color;
        if (dataSet[pos] != "無") {
            context.beginPath();
            context.arc(x, y, r, 0, Math.PI * 2, true);
            context.fill();
        }

    }

    context.globalAlpha = 0.075;
    context.globalCompositeOperation = 'lighter';

    return canvas;

}

//

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    var time = Date.now() / 6000;

/*
    camera.position.x = 80 * Math.cos(time);
    camera.position.z = 80 * Math.sin(time);
    camera.lookAt(scene.position);
*/
    controls.update();

    
    for (var i = 0, l = scene.children.length; i < l; i++) {

        var mesh = scene.children[i];
        mesh.position.x = Math.sin(time * 4) * i * i * 0.005;
        mesh.position.z = Math.cos(time * 6) * i * i * 0.005;

    }

    renderer.render(scene, camera);

}