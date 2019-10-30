// forked from cx20's "forked: p5.js(instance mode) - Wave" http://jsdo.it/cx20/kqM7
// forked from clockmaker's "Processing.js - Wave" http://jsdo.it/clockmaker/processing-wave

/** 水平方向の頂点数です。 */
var n = 10;
/** 時間経過の媒介変数です。 */
var t = 0.0;
/** draw 関数が実行された回数です。 */
var cnt = 0;

/** 初期化関数です。はじめの一回だけ実行されます。 */
function setup() {
	createCanvas(innerWidth, innerHeight);
	background(0);
	noFill();
	stroke(255, 10);
}

/** エンターフレームイベントです。1/60秒毎に呼び出されます。 */
function draw() {
	push();
	// 1000回ごとに
	if (cnt++ % 1000 == 0)
		background(0); // 画面をリセット

	// 画面中央に基準点を移動させます
	translate(0, innerHeight / 2);
	beginShape();
	// 画面左端(-100px)から描きます。
	curveVertex(-100, 0);
	// 頂点数の個数分だけループ
	for (var i = 0; i <= n; i++) {
		// x座標は等分した位置に設定
		var xx = i * innerWidth / n;
		// y座標はうねうねさせたいので、noise関数で座標をランダムに決定
		// noise関数は連続した乱数が得られるので
		// 引数に頂点番号と時間経過変数を代入し、
		// ある種の連続性のあるY座標を算出する。
		var yy = innerHeight * (noise(i * 0.25, t) - 0.5);

		// 求めた座標まで曲線を描く
		curveVertex(xx, yy);
	}
	// 最後に画面右端(画面端+100px)まで描きます。
	curveVertex(innerWidth + 100, 0);
	endShape();
	// 時間経過変数を更新します。
	t += 0.01;
	pop();
}
