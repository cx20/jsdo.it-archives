// forked from cx20's "MMLEmitter で MML を試してみるテスト（その２）" http://jsdo.it/cx20/cjUi
// forked from cx20's "MMLEmitter で MML を試してみるテスト" http://jsdo.it/cx20/2V5t

var audioContext = new AudioContext();

//var sequencer = new MMLEmitter(audioContext, "t100 l8 cege [>eg<c]2");
var sequencer;
var cnt = 0;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var analyser = audioContext.createAnalyser();
var timeDomainData1 = new Uint8Array(analyser.frequencyBinCount);
var timeDomainData2 = new Uint8Array(analyser.frequencyBinCount);

$(document).ready(function(){
	var mml = 
		  "// Turkish March\n"
		+ "// W.A.Mozart\n"
		+ "\n"
		+ "/: o4 q6 l16 v8 @(wave='square') bag+a<\n"
		+ "   c8r8dc>b<c e8r8fed+e bag+abag+a <c4>a8<c8>\n"
		+ "   l8 [gb][f+a][eg][f+a] [gb][f+a][eg][f+a] [gb][f+a][eg][d+f+] e4 :/;\n"
		+ "\n"
		+ "r12 /: o4 q6 l16 v2 @(wave='square') bag+a<\n"
		+ "   c8r8dc>b<c e8r8fed+e bag+abag+a <c4>a8<c8>\n"
		+ "   l8 [gb][f+a][eg][f+a] [gb][f+a][eg][f+a] [gb][f+a][eg][d+f+] e4 :/;\n"
		+ "\n"
		+ "/: o3 q4 l8 r4\n"
		+ "   a<[ce][ce][ce]> a<[ce][ce][ce]> a<[ce]>a<[ce]> a<[ce][ce][ce]>\n"
		+ "   e[b<e][b<e][b<e] e[b<e][b<e][b<e] e[b<e]>b<b e4 :/;\n";
	$('#mml').val(mml);
});

$("#hello").on("click", function() {
    var mml = $('#mml').val();
    sequencer = new MMLEmitter(audioContext, mml);
    sequencer.tracks[0].on("note", noteEventHandler); // 発音のタイミングで呼ばれる
    sequencer.start();
    animationLoop();
});

/**
 * ここで Web Audio API を駆使して音を出す
 *
 * @param {object} event
 *   @param {float}    event.when      : 発音されるべき時間 (タイミング)
 *   @param {int}      event.midi      : MIDIノート番号
 *   @param {float}    event.duration  : 鳴っている時間
 *   @param {function} event.noteOff   : duration 経過後に呼ぶコールバックを設定するための関数
 *   @param {int}      event.chordIndex: 和音の場合のインデックス
 */
function noteEventHandler(e) {
    var osc = audioContext.createOscillator(); // 音を出す部品を作る
    var amp = audioContext.createGain(); // 音量を制御する部品を作る
    var when = e.when;

    // MIDIノート番号 -> 周波数 変換
    osc.frequency.value = 440 * Math.pow(2, (e.midi - 69) * 1 / 12);
    // 波形を三角波にする
    osc.type = "triangle";
    // 音量の制御, duration で減衰させる
    amp.gain.setValueAtTime(0.25, when);
    amp.gain.linearRampToValueAtTime(0.0, when + e.duration);

    // こういう感じで各部品を接続する
    // osc(tri) -> amp(decay) -> Web Audio API output
    osc.connect(amp)
    amp.connect(analyser);
    analyser.connect(audioContext.destination);

    // 音を出す部品を起動させる (鍵盤を押すみたいなイメージ)
    osc.start(when);

    e.noteOff(function() {
        // 終わったら接続を解除する
        amp.disconnect();
    }, 0.1); // duration 経過 + 0.1秒で実行される
}

/**
* ele canvas HTML Element
* ctx canvas context 2d
* data Time Damain Data
*/
function drawGraph(ele, ctx) {
    //背景
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, ele.width, ele.height);
    ctx.closePath();
    ctx.fill();

    //基準線
/*
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(0, ele.height / 2);
    ctx.lineTo(ele.width, ele.height / 2);
    ctx.closePath();
    ctx.stroke();
*/
}

function drawChart(ele, ctx, data) {
    var DOT_SIZE = 16;
    var value;
    ctx.beginPath();
    //ctx.fillStyle = '#007f00';
    ctx.fillStyle = '#ff7f00';
    for (var i = 0; i < data.length; i += DOT_SIZE) {
        value = parseInt(data[i]);
        ctx.fillRect(i, ele.height / 2 + 128, DOT_SIZE*0.9, - value);
    }
}

function drwaWave(ele, ctx, data) {
    var h = cnt % 360;
    var s = 100;
    var l = 50;
    var value;
    ctx.beginPath();
    //ctx.strokeStyle = '#7f00ff';
    ctx.strokeStyle = "hsl(" + h + "," + s + "%," + l + "%)";
    ctx.moveTo(0, ele.height / 2);
    for (var i = 0; i < data.length; ++i) {
        value = (parseInt(data[i]) - 128) + ele.height / 2;
        ctx.lineTo(i, value);
    }
    ctx.moveTo(data.length, ele.height / 2);
    ctx.closePath();
    ctx.stroke();
}

function animationLoop() {
    analyser.getByteTimeDomainData(timeDomainData1);
    analyser.getByteFrequencyData(timeDomainData2);

    drawGraph(canvas, ctx);
    drawChart(canvas, ctx, timeDomainData2);
    drwaWave(canvas, ctx, timeDomainData1);
    
    cnt++;
 
    requestAnimationFrame(animationLoop);
}
