// forked from cx20's "MMLEmitter で MML を試してみるテスト（その８）" http://jsdo.it/cx20/wptb
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その７）" http://jsdo.it/cx20/3gi9
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その６）" http://jsdo.it/cx20/qzUp
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その５）" http://jsdo.it/cx20/xZ9q
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その４）" http://jsdo.it/cx20/fTYo
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その３）" http://jsdo.it/cx20/vEZU
// forked from cx20's "MMLEmitter で MML を試してみるテスト（その２）" http://jsdo.it/cx20/cjUi
// forked from cx20's "MMLEmitter で MML を試してみるテスト" http://jsdo.it/cx20/2V5t

var LENGTH = 161;          // １オクターブの幅
var PITCH  = LENGTH/7;     // 鍵盤のキーピッチ
var OFFSET = PITCH * 0.6;  // 黒鍵盤の開始位置
var WHITE_W = 24;          // 白鍵盤の幅
var WHITE_H = 100;         // 白鍵盤の高さ
var BLACK_W = 15;          // 黒鍵盤の幅
var BLACK_H = 60;          // 黒鍵盤の高さ
var baseHash = {
 0: { note:"C ", color:"white", x: PITCH * 0,          y:0 },
 1: { note:"C#", color:"black", x: PITCH * 0 + OFFSET, y:0 },
 2: { note:"D ", color:"white", x: PITCH * 1,          y:0 },
 3: { note:"D#", color:"black", x: PITCH * 1 + OFFSET, y:0 },
 4: { note:"E ", color:"white", x: PITCH * 2,          y:0 },
 5: { note:"F ", color:"white", x: PITCH * 3,          y:0 },
 6: { note:"F#", color:"black", x: PITCH * 3 + OFFSET, y:0 },
 7: { note:"G ", color:"white", x: PITCH * 4,          y:0 },
 8: { note:"G#", color:"black", x: PITCH * 4 + OFFSET, y:0 },
 9: { note:"A ", color:"white", x: PITCH * 5,          y:0 },
10: { note:"A#", color:"black", x: PITCH * 5 + OFFSET, y:0 },
11: { note:"B ", color:"white", x: PITCH * 6,          y:0 }
};
var keyboardHash = {};
for ( var i = 60; i < 96; i++ ) {
	var keyboard;
	var n = Math.floor( i / 12 ) - 5;
	var base = baseHash[i % 12];
	console.log( "x = " + base.x + ", y = " + base.y ) ;
	keyboardHash[i] = { note: base.note, color: base.color, x: LENGTH * n + base.x, y: base.y };
}

var audioContext = new AudioContext();

//var sequencer = new MMLEmitter(audioContext, "t100 l8 cege [>eg<c]2");
var sequencer;
var cnt = 0;
var s = Snap(465, 465);
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
    //drawGraph(canvas, ctx);
    drawKeyboard();
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
    drawMidiKey(e.midi);
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

var rectSet = {};
function drawKeyboard() {
	s.clear();
	var rect;
	//var t = new Snap.Matrix();
	for (var key in keyboardHash) {
		var keyboard = keyboardHash[key];
		if ( keyboard.color == "white" ) {
			rect = s.rect(keyboard.x, keyboard.y, 24, 100);
			rect.attr({fill: 'white', stroke:'black', 'fill-opacity': 0.0});
		} else if ( keyboard.color == "black" ) {
			rect = s.rect(keyboard.x, keyboard.y, 15, 70);
			rect.attr({fill: 'black'});
		}
		//t.rotate((key-60)/20, keyboard.x, keyboard.y);
		//rect.transform(t);
		rectSet[key] = rect;
	}
}

function drawMidiKey(midi) {
	drawKeyboard();
	var keyboard = keyboardHash[midi];
	var rect = rectSet[midi];
	if ( keyboard.color == "white" ) {
		rect.attr({fill: '#0000ff', 'fill-opacity': 0.5});
	} else if ( keyboard.color == "black" ) {
		rect.attr({fill: '#ff0000'});
	}
}
