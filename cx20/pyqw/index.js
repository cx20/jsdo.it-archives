// forked from "shader material demo." http://threejs.org/examples/webgl_shader2.html

var container;
var camera, scene, renderer;
var uniforms1, uniforms2;
var clock = new THREE.Clock();

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 4;
    scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    uniforms1 = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
    };

    uniforms2 = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        texture: { type: "t", value: THREE.ImageUtils.loadTexture("//jsrun.it/assets/t/I/T/z/tITz0.jpg") } // disturb.jpg
    };

    uniforms2.texture.value.wrapS = uniforms2.texture.value.wrapT = THREE.RepeatWrapping;

    var params = [
        ['fragment_shader1', uniforms1]
//      ['fragment_shader2', uniforms2],
//      ['fragment_shader3', uniforms1],
//      ['fragment_shader4', uniforms1]
    ];

    for (var i = 0; i < params.length; i++) {
        var material = new THREE.ShaderMaterial({
            uniforms: params[i][1],
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById(params[i][0]).textContent
        });

        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = i - (params.length - 1) / 2;
//      mesh.position.y = i % 2 - 0.5;
        mesh.position.y = i % 2;
        scene.add(mesh);

    }

    renderer = new THREE.WebGLRenderer();
    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(event) {
    uniforms1.resolution.value.x = window.innerWidth;
    uniforms1.resolution.value.y = window.innerHeight;

    uniforms2.resolution.value.x = window.innerWidth;
    uniforms2.resolution.value.y = window.innerHeight;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = clock.getDelta();

    uniforms1.time.value += delta * 5;
    uniforms2.time.value = clock.elapsedTime;

    for (var i = 0; i < scene.children.length; i++) {
        var object = scene.children[i];
        object.rotation.y += delta * 0.5 * (i % 2 ? 1 : -1);
        object.rotation.x += delta * 0.5 * (i % 2 ? -1 : 1);
    }

    renderer.render(scene, camera);
}
