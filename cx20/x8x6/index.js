// forked from cx20's "Three.js で音楽のビジュアライズを試してみるテスト" http://jsdo.it/cx20/qNBt
// forked from ryoheycc's " Web Audio APIで音楽のリアルタイム波形表示" http://jsdo.it/ryoheycc/tk3X
// forked from warinside's "Web Audio API Test+GainNode" http://jsdo.it/warinside/3AY7
//参考
//http://www.usamimi.info/~ide/programe/tinysynth/doc/audioapi-report.pdf
//http://epx.com.br/artigos/audioapi.php
//http://code.google.com/p/chromium/issues/detail?id=88122
//https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioSourceNode-section

var DOT_SIZE = 3;
var X_START_POS = 50;
var Y_START_POS = -20;
var X_MAX = 440;
var Y_MAX = 440;
var MARIO_COUNT = 10;

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

var source = context.createBufferSource();
var gainNode = context.createGain();		//音量変えるノード
var analyserNode = context.createAnalyser();
    
gainNode.gain.value = 0.5;

source.connect(gainNode);
gainNode.connect(analyserNode);
analyserNode.connect(context.destination);

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
//var line;
var lines = [];
var color;
//var group;
var line;
var list = [];
var geometry, material, mesh;
var geolist = [];
var matelist = [];
var meshlist = [];

initialize();

function initialize() {
    container = document.getElementById( 'container' );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, X_MAX/Y_MAX, 0.1, 1000);
    //camera.position.z = 200;
    camera.position.z = 120;
    scene.add(camera);
    if ( isWebgl() ) {
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    } else {
        renderer = new THREE.CanvasRenderer(); 
    }
    renderer.setSize(X_MAX, Y_MAX);
    container.appendChild(renderer.domElement);
    
    //To use enter the axis length
    //debugaxis(100);

    drawMario();
}

function render() {
    analyserNode.getByteTimeDomainData(timeDomainData);
    draw(timeDomainData);

    camera.lookAt( scene.position );
    camera.position.x = 120 * Math.sin( theta * Math.PI / 180 ) * -1; // 逆回転
    camera.position.y = 120 * Math.cos( theta * Math.PI / 180 );

    theta++;
    if ( ( theta % 90 ) === 0 ) {
        color = Math.random() * 0xFFFFFF;
    }
    renderer.render( scene, camera );

    requestAnimationFrame(render);
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
    var i;
    for (i = 0; i < geolist.length; i++) {
        meshlist[i].position.x = (10 * (i % 16)) - 10 * 8 + (data[i]-128)/4;
        meshlist[i].position.y = (10 * (15 - Math.floor(i / 16))) - 10 * 8 + (data[i]-128)/4;

        meshlist[i].rotation.x = Math.PI * ((data[i])) / 256;
        meshlist[i].rotation.y = Math.PI * ((data[i])) / 256;
    }
}

function drawMario() {
    var width = X_MAX; // $(window).width();
    var height = Y_MAX; // $(window).height();
    
    geolist = new Array(16*16);
    matelist = new Array(16*16);
    meshlist = new Array(16*16);

    var i;    
    for( i = 0 ; i < geolist.length; i++)
    {
        if ( dataSet[i] != "無" ) {
            geolist[i] = new THREE.CubeGeometry(5, 5, 5);
        } else { 
            geolist[i] = new THREE.CubeGeometry(0, 0, 0);
        }
        matelist[i] = new THREE.MeshBasicMaterial({
            /* color: Math.random() * 0xFFFFFF, */
            color: getRgbColor( dataSet[i] ),
            wireframe: false
        });
        meshlist[i] = new THREE.Mesh(geolist[i], matelist[i]);
        scene.add(meshlist[i]);
    }
}

function play(){
    //source.buffer = context.createBuffer(request.response, false);	//ArrayBufferからバッファを作成　第２引数をtrueにするとモノラルに
    source.start(context.currentTime);   //指定した時間に再生する　もし指定した時間がcontext.currentTimeより小さい場合はすぐ再生される
    
    render();
}
