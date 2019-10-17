// forked from migiyubi's "Shapes with particles" http://jsdo.it/migiyubi/mR4a
var PI2 = Math.PI * 2;
var PARTICLE_NUM = 10000;
var IMAGE_URLS = [
/*
    'http://jsrun.it/assets/q/H/h/V/qHhVH.png',
    'http://jsrun.it/assets/d/P/f/l/dPfl8.png'
*/
    '../../assets/t/j/3/y/tj3yi.png' // mario.png
];

var cos = Math.cos;
var sin = Math.sin;
var abs = Math.abs;
var floor = Math.floor;
var rand = THREE.Math.randFloat;

var width, height;
var shapes;
var shapeIndex;

var ps;
var renderer;
var scene;
var camera;

window.onload = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    var canvas = document.getElementById('canvas');
    
    preLoad(IMAGE_URLS, function(images) {
        initShapes(images);
        initEnvironment(canvas, shapes[0]);
        
        canvas.onclick = function(e) {
            shapeIndex = (shapeIndex + 1) % shapes.length;
        };
        
        start();
    });
};

function start() {
    requestAnimationFrame(draw);
}

function preLoad(urls, callback) {
    preLoadCore(urls, new Array(urls.length), callback, 0, urls.length);
}

function preLoadCore(urls, images, callback, count, maxCount) {
    if (count >= maxCount) {
        callback(images);
    }
    else {
        images[count] = new Image();
        images[count].src = urls[count];
        images[count].onload = function(){preLoadCore(urls, images, callback, count+1, maxCount);};
    }
}

function genTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    
    var context = canvas.getContext('2d');
    
    var gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0.5, 'rgba(80, 80, 128, 1.0)');
    gradient.addColorStop(1.0, 'rgba(80, 80, 128, 0.0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, 16, 16);
    
    return new THREE.Texture(canvas);
}

function initShapes(images) {
    // particleで表現する形状の頂点座標集合の集合。あらかじめ計算しておく。
    shapes = new Array(0);
    var i = 0;

    for ( ; i < images.length; i++) {
        shapes.push(new Array(PARTICLE_NUM));
        initShapeFromImage(images[i], 500*2, 500*2, -500, -500, shapes[i]);
    }

    shapes.push(new Array(PARTICLE_NUM));
    initBelt(shapes[i++]);
    
    shapes.push(new Array(PARTICLE_NUM));
    initSphere(shapes[i++]);
    
    shapeIndex = i-1;
}

function initBelt(dst) {
    var x, y, z, t;
    var r = 800;
    var h = 500;
    for (i = 0; i < PARTICLE_NUM; i++) {
        t = rand(0, PI2);
        x = r * cos(t);
        y = rand(-h, h);
        z = r * sin(t);
        dst[i] = new THREE.Vector3(x, y, z);
    }
}

function initSphere(dst) {
    var r = 400*400;
    var x, y, z;
    for (i = 0; i < PARTICLE_NUM; i++) {
        do {
            x = rand(-500, 500);
            y = rand(-500, 500);
            z = rand(-500, 500);
        } while (abs(x*x + y*y + z*z - r) > 10000);
        dst[i] = new THREE.Vector3(x, y, z);
    }
}

function initShapeFromImage(img, dstW, dstH, offsetX, offsetY, dst) {
    var buffer = document.createElement('canvas');
    var imgW = img.naturalWidth;
    var imgH = img.naturalHeight;
    buffer.width = imgW;
    buffer.height = imgH;
    
    var context = buffer.getContext('2d');
    context.drawImage(img, 0, 0);
    
    var data = context.getImageData(0, 0, imgW, imgH).data;
    
    var ratioX = imgW / dstW;
    var ratioY = imgH / dstH;
    
    var i, x, y;
    for (i = 0; i < PARTICLE_NUM; i++) {
        do {
            x = rand(offsetX, offsetX+dstW);
            y = rand(offsetY, offsetY+dstH);
        } while (data[(floor((-x-offsetX)*ratioX) + floor((-y-offsetY)*ratioY)*imgW) * 4] <= 0);

        dst[i] = new THREE.Vector3(x, y, rand(-50, 50));
    }
}

function initEnvironment(canvas, defaultShape) {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color(0x000000), 1);
    canvas.appendChild(renderer.domElement);
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(60, width/height);
    camera.position = new THREE.Vector3(0, 0, -1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    var geometry = new THREE.Geometry();
    for (i = 0; i < PARTICLE_NUM; i++) {
        geometry.vertices.push(defaultShape[i].clone());
    }
    
    var material = new THREE.ParticleBasicMaterial({
        map: THREE.ImageUtils.generateDataTexture(1, 1, new THREE.Color(0x555588)),
        //map: genTexture(),
        size: 10,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false
    });
     
    ps = new THREE.ParticleSystem(geometry, material);
    ps.position = new THREE.Vector3(0, 0, 0);
    ps.sortParticles = true;
    scene.add(ps);
}

function draw() {
    requestAnimationFrame(draw);
    
    ps.rotation.y += 0.005;
    
    var s, d;
    var dstVertices = shapes[shapeIndex];
    for (i = 0; i < PARTICLE_NUM; i++) {
        s = ps.geometry.vertices[i];
        d = dstVertices[i];
        // 簡易easing
        s.x += (d.x - s.x) / 20;
        s.y += (d.y - s.y) / 20;
        s.z += (d.z - s.z) / 20;
    }
    
    renderer.render(scene, camera);
}
