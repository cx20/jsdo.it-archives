// forked from cx20's "Matter.js でゴゴゴを物理演算してみるテスト" http://jsdo.it/cx20/dJbc
// forked from liabru's "Boxes & Beach Ball Physics" http://codepen.io/liabru/pen/Ivxib

// Matter module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Vertices = Matter.Vertices,
    MouseConstraint = Matter.MouseConstraint;

// create a Matter.js engine
var engine = Engine.create(document.body, {
    render: {
        options: {
            wireframes: false
        }
    }
});

// add a mouse controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

// some settings
var offset = 10,
    wallOptions = {
        isStatic: true,
        render: {
            visible: false
        }
    };

var offset = 5;
World.add(engine.world, [Bodies.rectangle(210, 400 + offset, 330 + 2 * offset, 20, {
    isStatic: true
})]);

for (var i = 0; i < 3; i++) {
    var x = 100 + i * 10;
    var y = 100 - i * 100;
    var shape = {
        label: 'Trapezoid Body' + i,
        position: {
            x: x,
            y: y
        },
        vertices: Vertices.fromPath('L5 10 L100 0 L95 95 L0 100 L5 80 L80 75 L85 15 L0 20'), // 「コ」
        render: {
            fillStyle: "#234"
        }
    };
    World.add(engine.world, [
        // 「コ」
        Body.create(Common.extend({}, shape)),
        // 「゛」
        Bodies.rectangle(x + 50, y - 50, 16, 32, {render: {fillStyle: "#234"}}),
        Bodies.rectangle(x + 70, y - 60, 16, 24, {render: {fillStyle: "#234"}})
    ]);
}

// run the engine
Engine.run(engine);

// forked from Mr.doob's "Clouds" http://www.mrdoob.com/lab/javascript/webgl/clouds/

if (!Detector.webgl) Detector.addGetWebGLMessage();
var container;
var camera, scene, renderer;
var mesh, geometry, material;
var mouseX = 0,
    mouseY = 0;
var start_time = Date.now();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    // Bg gradient
    var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = window.innerHeight;
    var context = canvas.getContext('2d');
    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#1e4877");
    gradient.addColorStop(0.5, "#4584b4");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
    container.style.backgroundSize = '32px 100%';
    //
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 6000;
    scene = new THREE.Scene();
    geometry = new THREE.Geometry();
    var texture = THREE.ImageUtils.loadTexture('../../assets/A/6/6/7/A667Q.png', null, animate); // cloud10.png
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    var fog = new THREE.Fog(0x4584b4, -100, 3000);
    material = new THREE.ShaderMaterial({
        uniforms: {
            "map": {
                type: "t",
                value: texture
            },
            "fogColor": {
                type: "c",
                value: fog.color
            },
            "fogNear": {
                type: "f",
                value: fog.near
            },
            "fogFar": {
                type: "f",
                value: fog.far
            }
        },
        vertexShader: document.getElementById('vs').textContent,
        fragmentShader: document.getElementById('fs').textContent,
        depthWrite: false,
        depthTest: false,
        transparent: true
    });
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64));
    for (var i = 0; i < 8000; i++) {
        plane.position.x = Math.random() * 1000 - 500;
        plane.position.y = -Math.random() * Math.random() * 200 - 15;
        plane.position.z = i;
        plane.rotation.z = Math.random() * Math.PI;
        plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
        THREE.GeometryUtils.merge(geometry, plane);
    }
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -8000;
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.25;
    mouseY = (event.clientY - windowHalfY) * 0.15;
}

function onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    position = ((Date.now() - start_time) * 0.03) % 8000;
    camera.position.x += (mouseX - camera.position.x) * 0.01;
    camera.position.y += (-mouseY - camera.position.y) * 0.01;
    camera.position.z = -position + 8000;
    renderer.render(scene, camera);
}