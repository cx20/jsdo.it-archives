Snap.svg で鍵盤を作ってみるテスト（その３）

＜対応した点＞
・鍵盤の座標を定数値から計算で求めるよう変更。

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

