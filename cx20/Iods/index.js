// forked from cx20's "vox.js を試してみるテスト（その１２）" http://jsdo.it/cx20/E8nZ
// forked from cx20's "vox.js を試してみるテスト（その１１）" http://jsdo.it/cx20/04WG
// forked from cx20's "vox.js を試してみるテスト（その１０）" http://jsdo.it/cx20/q67O
// forked from cx20's "vox.js を試してみるテスト（その９）" http://jsdo.it/cx20/4LYl
// forked from cx20's "vox.js を試してみるテスト（その８）" http://jsdo.it/cx20/iEi8
// forked from cx20's "vox.js を試してみるテスト（その７）" http://jsdo.it/cx20/K6wm
// forked from cx20's "vox.js を試してみるテスト（その６）" http://jsdo.it/cx20/oZg0
// forked from cx20's "vox.js を試してみるテスト（その５）" http://jsdo.it/cx20/af9L
// forked from cx20's "vox.js を試してみるテスト（その４）" http://jsdo.it/cx20/qL0R
// forked from cx20's "vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ymYt
// forked from cx20's "vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/adwz
// forked from cx20's "vox.js を試してみるテスト" http://jsdo.it/cx20/u80n
// forked from ohisama1's "vox.js test 0" http://jsdo.it/ohisama1/e9dm

var DOT_SIZE = 16;
var meshArray = [];
var list = [];

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

    document.body.appendChild(renderer.domElement);
    var parser = new vox.Parser();
    // adobe.vox
    parser.parse("../../assets/y/l/j/y/yljy3.vox").then(function(voxelData) {
        var X_START_POS = -voxelData.size.x * DOT_SIZE / 2;
        var Y_START_POS = -voxelData.size.z * DOT_SIZE / 2;
        var Z_START_POS = -voxelData.size.y * DOT_SIZE / 2;
        
        var i = 0;
        var voxel;
        // ソート用にハッシュテーブルにセット
        var tmpArray = [];
        for ( i = 0; i  < voxelData.voxels.length; i++ ) {
            voxel = voxelData.voxels[i];
            tmpArray[voxel.x + "," + voxel.y + "," + voxel.z] = voxel;
        }
        // ハッシュテーブルの値をx,y,z順に読み込み
        i = 0;
        for ( var z = 0; z < voxelData.size.z; z++ ) {
            for ( var y = 0; y < voxelData.size.y; y++ ) {
                for ( var x = 0; x < voxelData.size.x; x++ ) {
                    voxel = tmpArray[x + "," + y + "," + z];
                    if ( voxel !== undefined ) {
                        var c = voxelData.palette[voxel.colorIndex];
                        var geometry = new THREE.BoxGeometry(DOT_SIZE * 0.8, DOT_SIZE * 0.8, DOT_SIZE * 0.8);
                        var color = new THREE.Color(c.r / 255, c.g / 255, c.b / 255);
                        var material = new THREE.MeshLambertMaterial({color: color});
                        meshArray[i] = new THREE.Mesh(geometry, material);
                        meshArray[i].position.x = voxel.x * DOT_SIZE + X_START_POS;
                        meshArray[i].position.y = voxel.z * DOT_SIZE + Y_START_POS;
                        meshArray[i].position.z = voxel.y * DOT_SIZE + Z_START_POS;
                        meshArray[i].visible = false;  // 非表示で登録
                        scene.add(meshArray[i]);
                        i++;
                    }
                }
            }
        }

        render();
    });
}

var cnt = 0;

function render() {
    if ( cnt < meshArray.length ) {
        meshArray[cnt].visible = true; // 順番に「非表示」→「表示」に変更
        cnt++;
    }

    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}


init();
