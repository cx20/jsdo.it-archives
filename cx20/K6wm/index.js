// forked from cx20's "vox.js を試してみるテスト（その６）" http://jsdo.it/cx20/oZg0
// forked from cx20's "vox.js を試してみるテスト（その５）" http://jsdo.it/cx20/af9L
// forked from cx20's "vox.js を試してみるテスト（その４）" http://jsdo.it/cx20/qL0R
// forked from cx20's "vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ymYt
// forked from cx20's "vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/adwz
// forked from cx20's "vox.js を試してみるテスト" http://jsdo.it/cx20/u80n
// forked from ohisama1's "vox.js test 0" http://jsdo.it/ohisama1/e9dm

var DOT_SIZE = 16;

var scene, camera, renderer, controls;
var ROTATE = true;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 450 / 450, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp(Math.PI * 0.1);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 4.0; //自動回転する時の速度

    renderer.setSize(465, 465);
    renderer.shadowMapEnabled = true;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 300;
    camera.lookAt(scene.position);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 100, -100);
    scene.add(spotLight);

    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(100, 100, 100).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-100, -100, -100).normalize();
    scene.add(light2);

    var geometry = new THREE.BufferGeometry();

    document.body.appendChild(renderer.domElement);
    var parser = new vox.Parser();
    // adobe.vox
    parser.parse("../../assets/y/l/j/y/yljy3.vox").then(function(voxelData) {
        var particles = voxelData.voxels.length;
        var positions = new Float32Array( particles * 3 );
        var colors = new Float32Array( particles * 3 );
        var color = new THREE.Color();
        for ( var i = 0; i  < voxelData.voxels.length; i++ ) {
            var voxel = voxelData.voxels[i];

            // positions
            var x = voxel.x * DOT_SIZE - voxelData.size.x * DOT_SIZE / 2;
            var y = voxel.z * DOT_SIZE - voxelData.size.z * DOT_SIZE / 2;
            var z = voxel.y * DOT_SIZE - voxelData.size.y * DOT_SIZE / 2;

            positions[ i * 3]     = x;
            positions[ i * 3 + 1 ] = y;
            positions[ i * 3 + 2 ] = z;

            // colors
            var c = voxelData.palette[voxel.colorIndex];

            colors[ i * 3]     = c.r / 255
            colors[ i * 3 + 1 ] = c.g / 255;
            colors[ i * 3 + 2 ] = c.b / 255;

        }

        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
        geometry.computeBoundingSphere();

        var material = new THREE.PointsMaterial( { size: 15, vertexColors: THREE.VertexColors } );

        particleSystem = new THREE.Points( geometry, material );
        scene.add( particleSystem );
    });
    render();
}

function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
