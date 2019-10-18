// forked from cx20's "Three.js で音楽のビジュアライズを試してみるテスト" http://jsdo.it/cx20/qNBt
// forked from ryoheycc's " Web Audio APIで音楽のリアルタイム波形表示" http://jsdo.it/ryoheycc/tk3X
// forked from warinside's "Web Audio API Test+GainNode" http://jsdo.it/warinside/3AY7
//参考
//http://www.usamimi.info/~ide/programe/tinysynth/doc/audioapi-report.pdf
//http://epx.com.br/artigos/audioapi.php
//http://code.google.com/p/chromium/issues/detail?id=88122
//https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioSourceNode-section

$("#slider" ).slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function(e,ui){
    gainNode.gain.value = ui.value;
    }
});

//var context = new webkitAudioContext();
var context;

if (typeof AudioContext == "function") {
    context = new AudioContext();
} else if (typeof webkitAudioContext == "function") {
    context = new webkitAudioContext();
}


var source = context.createBufferSource();
var gainNode = context.createGain();        //音量変えるノード
var analyserNode = context.createAnalyser();
    
gainNode.gain.value = 0.5;

source.connect(gainNode);
gainNode.connect(analyserNode);        //destinationが最終的な出力
analyserNode.connect(context.destination);    //RealTimeAnalyserの出力は必要かどうか意見が求められているそうですよ

var request = new XMLHttpRequest();
var url = "../../assets/svggirl/01/svg_girl_theme.ogg";
//var url = "svg_girl_theme.ogg";

request.open("GET", url, true);
request.responseType = "arraybuffer";

request.onload = function() {
    // decode the buffer into an audio source
    context.decodeAudioData(request.response, function(buffer) {
        source.buffer = buffer;
    } );
    $("body").append("<input type='button' onclick='play()' value='play'>");
};

request.send();

/**
*FFTされたデータをもらう配列。
*要素数がfrequencyBinCount(FFTのサイズの半分 FFT結果は対称だから半分でいい)より少ないときは
*余分なデータは切り捨てられる。
*/
var timeDomainData = new Uint8Array(analyserNode.frequencyBinCount);

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
var line;
var color;

initialize();

function initialize() {
    container = document.getElementById( 'container' );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, X_MAX/Y_MAX, 0.1, 1000);
    camera.position.z = 200;
    scene.add(camera);
    if ( isWebgl() ) {
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    } else {
        renderer = new THREE.CanvasRenderer(); 
    }
    renderer.setSize(X_MAX, Y_MAX);
    container.appendChild(renderer.domElement);
    
    //To use enter the axis length
    debugaxis(100);
}

function render() {
    requestAnimationFrame(render);
    
    analyserNode.getByteTimeDomainData(timeDomainData);
    draw(timeDomainData);
    //drawLissajous();

    camera.lookAt( scene.position );
    camera.position.x = 200 * Math.sin( theta * Math.PI / 180 ) * -1; // 逆回転
    //camera.position.y = 200 * Math.sin( theta * Math.PI / 180 );
    camera.position.y = 200 * Math.sin( 10 * Math.PI / 180 );
    camera.position.z = 200 * Math.cos( theta * Math.PI / 180 );
    
    theta++;
    if ( ( theta % 90 ) === 0 ) {
        color = Math.random() * 0xFFFFFF;
    }
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


function draw(data){
    var geometry = new THREE.Geometry();
    var x, y, z;
    p1 += (Math.PI*2 * 10 / 360);
    var i = 0;
    var colors = [];
    for (i = 0; i < data.length; i++){
        colors[i] = new THREE.Color();
        x = i - 200;
        y = data[i]-128;
        z = R * Math.sin( 2 * Math.PI * (x / X_MAX));
        geometry.vertices.push( new THREE.Vector3( x, y, z ) );
        //colors[i].setHSL( Math.random(), 1.0, 0.5 );
        colors[i].setHSL( (data[i]-128) / 128, 1.0, 0.5 );
    }
    geometry.colors = colors;
    //var material = new THREE.LineBasicMaterial({color: Math.random() * 0xFFFFFF});
    //var material = new THREE.LineBasicMaterial({color: color});
    var material = new THREE.PointCloudMaterial( {
        size: 5,
        transparent: true,
        opacity: 0.7,
        vertexColors: true
    } );
    scene.remove(line);
    //line = new THREE.Line(geometry, material, THREE.LineStrip);
    line = new THREE.PointCloud(geometry, material);
    scene.add(line);
}


function play(){
    source.start(context.currentTime);   //指定した時間に再生する　もし指定した時間がcontext.currentTimeより小さい場合はすぐ再生される
    
    render();
}
