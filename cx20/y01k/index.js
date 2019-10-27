// forked from cx20's "Happy New Year 2015（作り方）" http://jsdo.it/cx20/HappyNewYear2015_recipe
// forked from cx20's "Happy New Year 2015" http://jsdo.it/cx20/HappyNewYear2015
// forked from cx20's "Three.js の雲のサンプルを試してみるテスト" http://jsdo.it/cx20/pArs
// forked from Mr.doob's "Clouds" http://www.mrdoob.com/lab/javascript/webgl/clouds/

var container;
var camera, scene, renderer;
var group;
var shadowMapViewer;
var controls;

var DOT_SIZE = 20;
var X_START_POS = -1 * DOT_SIZE;
var Y_START_POS = -2 * DOT_SIZE;
var Z_START_POS = -1 * DOT_SIZE;

// Windows 10 Insider Previewを試す(第32回) - UI/UXの改善が顕著な「ビルド10565」登場
// http://news.mynavi.jp/articles/2015/10/13/windows10/002.html
// 
var dataSet = [
    [
    "水","水","水",
    "水","水","水",
    "水","水","水"
    ],
    [
    "×","水","水",
    "×","水","水",
    "水","水","水"
    ],
    [
    "×","×","水",
    "×","×","水",
    "水","水","水"
    ],
];

function getRgbColor( c )
{
	var colorHash = {
		"×":"#000000",
		"黒":"#000000",
		"灰":"#808080",
		"白":"#ffffff",
		"肌":"#ffcccc",
		"茶":"#800000",
		"赤":"#ff0000",
		"黄":"#ffff00",
		"緑":"#00ff00",
		//"水":"#00ffff",
		"水":"#56d0ff",
		"青":"#0000ff",
		"紫":"#800080"
	};
	return colorHash[ c ];
}

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    // カメラを作成する
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 200;

    // シーンを作成する
    scene = new THREE.Scene();

    // 立体ドット絵を作成する
    group = createSheep();
    
    // シーンに立体ドット絵を追加する
    scene.add(group);

    // ライトを作成する
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(-100, 50, -100).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(200, -100, 200).normalize();
    scene.add(light2);

    
    // レンダラーを作成する
    renderer = new THREE.WebGLRenderer();

    // Mouse control
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    //controls.maxPolarAngle = Math.PI * 0.495;
    controls.maxPolarAngle = 1.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5.0;
    
    // 背景色を指定する（空色に変更する）
    //renderer.setClearColor(0x4584b4);
    renderer.setClearColor(0xc0e0f0);

    // レンダラーのサイズを指定する
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // HTML との紐づけを行う
    container.appendChild(renderer.domElement);
}

function createSheep() {
    // 立体ドット絵をグループ化して返却する
    var group = new THREE.Object3D();

    // 箱を用意する
    var geometry = new THREE.BoxGeometry(DOT_SIZE * 0.9, DOT_SIZE * 0.9, DOT_SIZE * 0.9);

    // ドット絵の枚数ぶんループする
    for (var j = 0; j < dataSet.length; j++) {

        // ドット絵１枚のドット数ぶんループする
        for (var i = 0; i < dataSet[j].length; i++) {

            // ドット絵の表示座標を計算する
            var x = (i % 3) * DOT_SIZE + X_START_POS;
            var y = (3 - Math.floor(i / 3)) * DOT_SIZE + Y_START_POS;
            var z = j * DOT_SIZE + Z_START_POS;

            // ドット絵の色を取得する（"赤"→"#ff0000"に変換する）
            var color = getRgbColor(dataSet[j][i]);

            // ドットが "×" でなければ
            if (dataSet[j][i] != "×") {
                // 色を指定する
                var material = new THREE.MeshLambertMaterial({color: color});

                // 箱に色をつける
                var mesh = new THREE.Mesh(geometry, material);
                
                // dataSet[1][1] の位置および角度調整
                if ( j == 1 && i == 1 ) {
                    x += 20;
                    y += 30;
                    mesh.rotation.x = Math.PI * 20/180;
                    mesh.rotation.y = Math.PI * 10/180;
                    mesh.rotation.z = Math.PI * -10/180;
                }
                // dataSet[2][2] の位置および角度調整
                else if ( j == 2 && i == 2 ) {
                    x += 10;
                    y += 10;
                    mesh.rotation.x = Math.PI * 10/180;
                    mesh.rotation.y = Math.PI * 10/180;
                    mesh.rotation.z = Math.PI * -20/180;
                }

                // 箱の位置を指定する
                mesh.position.x = x;
                mesh.position.y = y;
                mesh.position.z = z;

                // グループ化する
                group.add(mesh);
            }
        }
    }

    // 立体ドット絵を返却する
    return group;
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    render();
}

function render() {
    // 立体ドット絵をY軸に回転させる
    //group.rotation.y += Math.PI / 180;
    
    // 表示を更新する
    renderer.render(scene, camera);

    //shadowMapViewer.render(renderer);
}