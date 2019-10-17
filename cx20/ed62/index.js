// forked from cx20's "Particle の絵柄をネコからドット絵に変えてみるテスト" http://jsdo.it/cx20/oiY1
// forked from kazuki_nagasawa's "Three.js 練習 ～CanvasでParticleの要素を作成～" http://jsdo.it/kazuki_nagasawa/threejs-003

var DOT_SIZE = 10;

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
    "無", "無", "無", "無", "無", "無", "無", "無", "無", "無", "無", "無", "無", "肌", "肌", "肌",
    "無", "無", "無", "無", "無", "無", "赤", "赤", "赤", "赤", "赤", "無", "無", "肌", "肌", "肌",
    "無", "無", "無", "無", "無", "赤", "赤", "赤", "赤", "赤", "赤", "赤", "赤", "赤", "肌", "肌",
    "無", "無", "無", "無", "無", "茶", "茶", "茶", "肌", "肌", "茶", "肌", "無", "赤", "赤", "赤",
    "無", "無", "無", "無", "茶", "肌", "茶", "肌", "肌", "肌", "茶", "肌", "肌", "赤", "赤", "赤",
    "無", "無", "無", "無", "茶", "肌", "茶", "茶", "肌", "肌", "肌", "茶", "肌", "肌", "肌", "赤",
    "無", "無", "無", "無", "茶", "茶", "肌", "肌", "肌", "肌", "茶", "茶", "茶", "茶", "赤", "無",
    "無", "無", "無", "無", "無", "無", "肌", "肌", "肌", "肌", "肌", "肌", "肌", "赤", "無", "無",
    "無", "無", "赤", "赤", "赤", "赤", "赤", "青", "赤", "赤", "赤", "青", "赤", "無", "無", "無",
    "無", "赤", "赤", "赤", "赤", "赤", "赤", "赤", "青", "赤", "赤", "赤", "青", "無", "無", "茶",
    "肌", "肌", "赤", "赤", "赤", "赤", "赤", "赤", "青", "青", "青", "青", "青", "無", "無", "茶",
    "肌", "肌", "肌", "無", "青", "青", "赤", "青", "青", "黄", "青", "青", "黄", "青", "茶", "茶",
    "無", "肌", "無", "茶", "青", "青", "青", "青", "青", "青", "青", "青", "青", "青", "茶", "茶",
    "無", "無", "茶", "茶", "茶", "青", "青", "青", "青", "青", "青", "青", "青", "青", "茶", "茶",
    "無", "茶", "茶", "茶", "青", "青", "青", "青", "青", "青", "青", "無", "無", "無", "無", "無",
    "無", "茶", "無", "無", "青", "青", "青", "青", "無", "無", "無", "無", "無", "無", "無", "無"
];

function getRgbColor(c) {
    var colorHash = {
        "無": "#000000",
        "白": "#ffffff",
        "肌": "#ffcccc",
        "茶": "#800000",
        "赤": "#ff0000",
        "黄": "#ffff00",
        "緑": "#00ff00",
        "水": "#00ffff",
        "青": "#0000ff",
        "紫": "#800080"
    };

    return colorHash[c];
}

var Plotter = function (element, w, h) {

    this.canvas_element = element;
    this.width = w;
    this.height = h;

    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.light = null;

    this.camera_r = 160;
    this.camera_phi = 50;
    this.camera_theta = 0;

    /*	this.controls = null; */
};

Plotter.prototype = {

    plotStart: function () {

        this.initThree();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initObject();

        this.plotLoop();
    },


    initThree: function () {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.sortObjects = false;
        this.renderer.setSize(this.width, this.height);
        this.canvas_element.append(this.renderer.domElement);
        this.renderer.setClearColorHex(0x000000, 1.0); // 背景黒
    },


    initScene: function () {
        this.scene = new THREE.Scene();
    },


    initCamera: function () {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 10000);

        var pos = this.getCameraPosition();
        this.camera.position.set(pos.x, pos.y, pos.z);
        this.camera.up.set(0, 0, 1);
        this.camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        });
    },


    initLight: function () {
        this.light = {};
        this.light[0] = new THREE.DirectionalLight(0xFFFFFF, 1.0, 0); // 平行光源
        this.light[0].position.set(0, 0, 1000);
        this.scene.add(this.light[0]);

        var ambient_light = new THREE.AmbientLight(0xCCCCCC); // 環境光源
        this.scene.add(ambient_light);
    },

    /*
     * ドット絵を描画
     */
    drawMario: function (ctx, x0, y0) {
        for (var i = 0; i < dataSet.length; i++) {
            var x = x0 + (i % 16) * DOT_SIZE;
            var y = y0 + Math.floor(i / 16) * DOT_SIZE;
            if (dataSet[i] != "無") {
                ctx.fillStyle = "#ffffff"; // getRgbColor(dataSet[i]);
                ctx.fillRect(x, y, DOT_SIZE * 1.0, DOT_SIZE * 1.0);
            }
        }
    },

    initObject: function () {

        /*
         * Canvas 要素を作成して、Context 取得。
         * その上に Particle で表示する図形をお絵かき。
         *
         * 背景を透過させる。背景は黒。中は白にする。
         * 白い部分は geometry で色指定。
         */
        var canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 160;

        var context = canvas.getContext('2d');

        this.drawMario(context, 0, 0);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;


        /*
         * 以下、Particle の座標と色設定。
         */
        var geometry = new THREE.Geometry();

        for (var i = 0, l = 5000; i < l; i++) {

            var vertex = new THREE.Vector3(0, 0, 0);
            vertex.x = Math.random() * 200 - 100;
            vertex.y = Math.random() * 200 - 100;
            vertex.z = Math.random() * 200 - 100;

            geometry.vertices.push(vertex);

            var color = new THREE.Color(0xFFFFFF);
            color.setRGB(Math.random() + 0.0, Math.random() + 0.0, Math.random() + 0.0);
            geometry.colors.push(color);
        }

        var material = new THREE.ParticleBasicMaterial({
            map: texture,
            size: 5,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            vertexColors: true,
            transparent: true
        });

        var particles = new THREE.ParticleSystem(geometry, material);
        particles.position.set(0, 0, 0);
        particles.sortParticles = false;
        this.scene.add(particles);

    },


    getCameraPosition: function () {

        var rad_phi = this.camera_phi * Math.PI / 180.0;
        var rad_theta = this.camera_theta * Math.PI / 180.0;

        result = new THREE.Vector3(0, 0, 0);
        result.x = this.camera_r * Math.sin(rad_phi) * Math.cos(rad_theta);
        result.y = this.camera_r * Math.sin(rad_phi) * Math.sin(rad_theta);
        result.z = this.camera_r * Math.cos(rad_phi);
        return result;
    },


    plotLoop: function () {

        /*		this.controls.update(); */


        this.camera_theta -= 0.1;

        var pos = this.getCameraPosition();
        this.camera.position.set(pos.x, pos.y, pos.z);
        this.camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        });

        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        var plotter = this;
        window.requestAnimationFrame(function () {
            plotter.plotLoop();
        });
    },


    onResize: function (width, height) {

        this.width = width;
        this.height = height;

        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
};


$(document).ready(function () {

    var canvas_element = $('#canvas-frame');
    var width = canvas_element.width();
    var height = canvas_element.height();

    var plotter = new Plotter(canvas_element, width, height);

    // Resize
    var resize_timer = false;
    $(window).resize(function () {
        if (resize_timer !== false) {
            clearTimeout(resize_timer);
        }
        resize_timer = setTimeout(function () {
            plotter.onResize(canvas_element.width(), canvas_element.height());
        }, 200);
    });

    plotter.plotStart();
});