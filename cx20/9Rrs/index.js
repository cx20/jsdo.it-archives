// forked from cx20's "Three.js で音楽のビジュアライズを試してみるテスト（その３）" http://jsdo.it/cx20/4McZ
// forked from cx20's "Three.js で音楽のビジュアライズを試してみるテスト（その２）" http://jsdo.it/cx20/vQZL
// forked from cx20's "Three.js で音楽のビジュアライズを試してみるテスト" http://jsdo.it/cx20/qNBt
// forked from ryoheycc's " Web Audio APIで音楽のリアルタイム波形表示" http://jsdo.it/ryoheycc/tk3X
// forked from warinside's "Web Audio API Test+GainNode" http://jsdo.it/warinside/3AY7
//参考
//http://www.usamimi.info/~ide/programe/tinysynth/doc/audioapi-report.pdf
//http://epx.com.br/artigos/audioapi.php
//http://code.google.com/p/chromium/issues/detail?id=88122
//https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioSourceNode-section


function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
};
BufferLoader.prototype.loadBuffer = function(url, index){
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var loader = this;
    request.onload = function() {
	// Asynchronously decode the audio file data in request.response
	loader.context.decodeAudioData(
	    request.response,
	    function(buffer) {
		if (!buffer) {
		    alert('error decoding file data: ' + url);
		    return;
		}
		loader.bufferList[index] = buffer;
		if (++loader.loadCount == loader.urlList.length) {
			loader.onload(loader.bufferList);
		}
	    }
	);
    }
    request.onerror = function() {
	alert('BufferLoader: XHR error');
    }
    request.send();
};
BufferLoader.prototype.load = function(){
    for (var i = 0; i < this.urlList.length; ++i) {
    	this.loadBuffer(this.urlList[i], i);
    }
};

//-------------------------------------------------------------------

$("#slider" ).slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function(e,ui){
    gainNode.gain.value = ui.value;
    }
});

var context = new AudioContext();
var gainNode = context.createGain();
var analyserNode = context.createAnalyser();
var source;
var timeDomainData1;
var timeDomainData2;
//var url = "http://jsrun.it/static/assets/svggirl/01/svg_girl_theme.ogg";
var url = "../../assets/svggirl/01/svg_girl_theme.mp3";
//var url = "svg_girl_theme.ogg";

//------------------------------------------------------------------
var scene, camera, renderer;

var X_MAX = 450;
var Y_MAX = 400;
var Y_CENTER = 400/2;
var R = 100;
var A = 8;
var B = 2;
var container;

var p1 = 0;
var r = 0, g = 0, b = 0;
var theta = 0;
var meshWave;
var meshChart;
var color;
var sprite;

function initialize() {
    container = document.getElementById( 'container' );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, X_MAX/Y_MAX, 0.1, 1000);
    camera.position.z = 400;
    scene.add(camera);
    if ( isWebgl() ) {
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    } else {
        renderer = new THREE.CanvasRenderer(); 
    }
    renderer.setSize(X_MAX, Y_MAX);
    container.appendChild(renderer.domElement);
    
    // スプライト画像の読み込みは初回だけ実施
    //sprite = THREE.ImageUtils.loadTexture( "ball.png" );
    sprite = THREE.ImageUtils.loadTexture( "../../assets/4/a/w/f/4awfi.png" );
    
    //To use enter the axis length
    //debugaxis(100);
}

function render(timestamp) {
    requestAnimationFrame(render);
    
    analyserNode.getByteTimeDomainData(timeDomainData1);
    analyserNode.getByteFrequencyData(timeDomainData2);
    
    drawWave(timeDomainData1);
    drawChart(timeDomainData2);
    
    camera.lookAt( scene.position );
/*
    camera.position.x = 200 * Math.sin( theta * Math.PI / 180 ) * -1; // 逆回転
    camera.position.y = 200 * Math.sin( 10 * Math.PI / 180 );
    camera.position.z = 200 * Math.cos( theta * Math.PI / 180 );
*/
    camera.position.x = 200 * Math.sin( timestamp / 1000 ) * -1; // 逆回転
    camera.position.y = 200 * Math.sin( 10 * Math.PI / 180 );
    camera.position.z = 200 * Math.cos( timestamp / 1000 );

    theta++;

    renderer.render( scene, camera );
}

function isWebgl() {
    try { 
        return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
    } catch( e ) {
        return false;
    }
}

function debugaxis(axisLength){
    var axis =  new THREE.AxisHelper(axisLength);
    scene.add(axis);
}

function drawWave(data){
    var geometry = new THREE.Geometry();
    var x, y, z;
    p1 += (Math.PI*2 * 10 / 360);
    var i = 0;
    var colors = [];
    for (i = 0; i < data.length; i++){
        colors[i] = new THREE.Color();
        //x = i/2 - X_MAX/2;
        x = (i * X_MAX/1024) - 200;
        y = data[i]-128;
        z = 0; // R * Math.sin( 2 * Math.PI * (x / X_MAX));
        geometry.vertices.push( new THREE.Vector3( x, y, z ) );
        colors[i].setHSL( (data[i]-128) / 128, 1.0, 0.5 );
    }

    geometry.colors = colors;
    var material = new THREE.PointCloudMaterial( {
        size: 10,
        map: sprite,
        transparent: true,
        opacity: 0.7,
        depthTest: false,
        vertexColors: true
    } );
    scene.remove(meshWave);
    meshWave = new THREE.PointCloud(geometry, material);
    scene.add(meshWave);
}

function drawChart(data){
    var geometry = new THREE.Geometry();
    var x, y, z;
    p1 += (Math.PI*2 * 10 / 360);
    var i = 0;
    var ii = 0;
    var colors = [];
    for (i = 0; i < data.length; i += 2){
        colors[ii] = new THREE.Color();
        x = (i * X_MAX/1024) - 200;
        y = data[i]-128;
        z = 0;
        geometry.vertices.push( new THREE.Vector3( x, y, z ) );
        colors[ii].setHSL( (ii/data.length), 1.0, 0.5 );
        ii++;
    }

    geometry.colors = colors;
    var material = new THREE.PointCloudMaterial( {
        size: 10,
        transparent: true,
        opacity: 0.7,
        depthTest: false,
        vertexColors: true
    } );
    scene.remove(meshChart);
    meshChart = new THREE.PointCloud(geometry, material);
    scene.add(meshChart);
}

initialize();

var start = document.getElementById('start');
start.addEventListener('click', function() {
    start.disabled = true;
    stop.disabled = false;
    var bufferLoader = new BufferLoader(context, [url], function(bufferList) {
        source = context.createBufferSource();
        source.buffer = bufferList[0];	// 最初の１ファイル目を使用する。複数ファイルには対応しない。
        source.loop = true;
        // source -> gainNode -> analyserNode -> destination(最終的な出力)
        source.connect(gainNode);
        gainNode.connect(analyserNode);
        analyserNode.connect(context.destination);
        timeDomainData1 = new Uint8Array(analyserNode.frequencyBinCount);
        timeDomainData2 = new Uint8Array(analyserNode.frequencyBinCount);
        source.start(0);
        render();
    });
    bufferLoader.load();
}, false);

var stop = document.getElementById('stop');
stop.addEventListener('click', function() {
    start.disabled = false;
    stop.disabled = true;
    source.stop();
}, false);
