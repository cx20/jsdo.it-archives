// forked from cx20's "MMLEmitter で MML を試してみるテスト（その５）" http://jsdo.it/cx20/xZ9q
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その４）" http://jsdo.it/cx20/fTYo
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その３）" http://jsdo.it/cx20/vEZU
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その２）" http://jsdo.it/cx20/cjUi
// forked from cx20's "MMLEmitter で MML を試してみるテスト" http://jsdo.it/cx20/2V5t

var keyboardHash = {
 60: { x: 19, y:80, color:"white", note:"C " }, //  O4:C 
 61: { x: 33, y:50, color:"black", note:"C#" }, //  O4:C#
 62: { x: 43, y:80, color:"white", note:"D " }, //  O4:D 
 63: { x: 59, y:50, color:"black", note:"D#" }, //  O4:D#
 64: { x: 66, y:80, color:"white", note:"E " }, //  O4:E 
 65: { x: 90, y:80, color:"white", note:"F " }, //  O4:F 
 66: { x:105, y:50, color:"black", note:"F#" }, //  O4:F#
 67: { x:114, y:80, color:"white", note:"G " }, //  O4:G 
 68: { x:130, y:50, color:"black", note:"G#" }, //  O4:G#
 69: { x:137, y:80, color:"white", note:"A " }, //  O4:A 
 70: { x:153, y:50, color:"black", note:"A#" }, //  O4:A#
 71: { x:161, y:80, color:"white", note:"B " }, //  O4:B 
 72: { x:185, y:80, color:"white", note:"C " }, //  O5:C 
 73: { x:197, y:50, color:"black", note:"C#" }, //  O5:C#
 74: { x:208, y:80, color:"white", note:"D " }, //  O5:D 
 75: { x:221, y:50, color:"black", note:"D#" }, //  O5:D#
 76: { x:232, y:80, color:"white", note:"E " }, //  O5:E 
 77: { x:256, y:80, color:"white", note:"F " }, //  O5:F 
 78: { x:267, y:50, color:"black", note:"F#" }, //  O5:F#
 79: { x:279, y:80, color:"white", note:"G " }, //  O5:G 
 80: { x:291, y:50, color:"black", note:"G#" }, //  O5:G#
 81: { x:302, y:80, color:"white", note:"A " }, //  O5:A 
 82: { x:315, y:50, color:"black", note:"A#" }, //  O5:A#
 83: { x:326, y:80, color:"white", note:"B " }, //  O5:B 
 84: { x:349, y:80, color:"white", note:"C " }, //  O6:C 
 85: { x:363, y:50, color:"black", note:"C#" }, //  O6:C#
 86: { x:373, y:80, color:"white", note:"D " }, //  O6:D 
 87: { x:387, y:50, color:"black", note:"D#" }, //  O6:D#
 88: { x:396, y:80, color:"white", note:"E " }, //  O6:E 
 89: { x:419, y:80, color:"white", note:"F " }, //  O6:F 
 90: { x:431, y:50, color:"black", note:"F#" }, //  O6:F#
 91: { x:442, y:80, color:"white", note:"G " }, //  O6:G 
 92: { x:456, y:50, color:"black", note:"G#" }, //  O6:G#
 93: { x:466, y:80, color:"white", note:"A " }, //  O6:A 
 94: { x:480, y:50, color:"black", note:"A#" }, //  O6:A#
 95: { x:489, y:80, color:"white", note:"B " }, //  O6:B 
};

var audioContext = new AudioContext();

//var sequencer = new MMLEmitter(audioContext, "t100 l8 cege [>eg<c]2");
var sequencer;
var cnt = 0;
var canvas1 = document.getElementById('layer1');
var ctx1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('layer2');
var ctx2 = canvas2.getContext('2d');
var analyser = audioContext.createAnalyser();
var timeDomainData1 = new Uint8Array(analyser.frequencyBinCount);
var timeDomainData2 = new Uint8Array(analyser.frequencyBinCount);
var timeSeries = new TimeSeries();
createTimeline("timeSeries", "step");

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
    //drawGraph(canvas, ctx);
    drawKeyboard(canvas1, ctx1);
});

$("#hello").on("click", function() {
    var mml = $('#mml').val();
    sequencer = new MMLEmitter(audioContext, mml);
    sequencer.tracks[0].on("note", noteEventHandler); // 発音のタイミングで呼ばれる
    sequencer.start();
//    animationLoop();
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
    //console.log( e.midi );
    //drawKeyboard(canvas, ctx);
    drawMidiKey(canvas2, ctx2, e.midi);
    timeSeries.append(new Date().getTime(), (e.midi - 69) * 1 / 12);
    console.log( (e.midi - 69) * 1 / 12 - 0.5 );
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

function drawGraph(ele, ctx) {
    //背景
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, ele.width, ele.height);
    ctx.closePath();
    ctx.fill();
}

function drawKeyboard(canvas, ctx) {
	for (var i in keyboardHash) {
		var keyboard = keyboardHash[i];
		if ( keyboard.color == "white" ) {
			ctx.fillStyle = 'white';
			ctx.rect(keyboard.x, keyboard.y - 80, 24, 100);
			ctx.stroke();
		} else if ( keyboard.color == "black" ) {
			ctx.fillStyle = 'black';
			ctx.fillRect(keyboard.x, keyboard.y - 50, 15, 70);
		}
	}
}

function drawMidiKey(canvas, ctx, midi) {
	ctx.clearRect( 0, 0, 400, 400 );
	ctx.globalAlpha = 0.7;
	var keyboard = keyboardHash[midi];
	if ( keyboard.color == "white" ) {
		ctx.fillStyle = '#0000ff';
		ctx.fillRect(keyboard.x, keyboard.y - 80, 24, 100);
	} else if ( keyboard.color == "black" ) {
		ctx.fillStyle = '#ff0000';
		ctx.fillRect(keyboard.x, keyboard.y - 50, 15, 70);
	}
}

function createTimeline(id, interpolation) {
    var chart = new SmoothieChart({
        millisPerPixel: 20,
        interpolation: interpolation,
        labels: {
            disabled: true
        }
    });
    chart.addTimeSeries(timeSeries, {
        strokeStyle: 'rgba(0, 0, 255, 1)',
        fillStyle: 'rgba(0, 0, 255, 0.2)',
        lineWidth: 2
    });
    chart.streamTo(document.getElementById(id), 10 /*delay*/ );
}
