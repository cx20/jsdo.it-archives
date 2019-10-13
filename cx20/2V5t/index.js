var audioContext = new AudioContext();

//var sequencer = new MMLEmitter(audioContext, "t100 l8 cege [>eg<c]2");
var sequencer;

$("#hello").on("click", function() {
    var mml = $('#mml').val();
    sequencer = new MMLEmitter(audioContext, mml);
    sequencer.tracks[0].on("note", noteEventHandler); // 発音のタイミングで呼ばれる
    sequencer.start();
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

    // 音を出す部品を起動させる (鍵盤を押すみたいなイメージ)
    osc.start(when);

    // こういう感じで各部品を接続する
    // osc(tri) -> amp(decay) -> Web Audio API output
    osc.connect(amp)
    amp.connect(audioContext.destination);

    e.noteOff(function() {
        // 終わったら接続を解除する
        amp.disconnect();
    }, 0.1); // duration 経過 + 0.1秒で実行される
}