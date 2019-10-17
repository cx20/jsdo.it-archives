ドット絵でブロック崩しするテスト。

以下の Canvas チュートリアルのレンガをドット絵に変えてみただけです。
jQuery v2.0.2 だと IE でうまく動かなかったため、古い版に差し替えてます。


＜操作方法＞
マウスを左右に動かすとバーを移動できます。

＜参考＞
■ Canvas Tutorial - Introduction
http://billmill.org/static/canvastutorial/index.html

■ HTML5 Canvasでブロック崩しを作っていくチュートリアル  IDEAIDEA
http://www.ideaxidea.com/archives/2013/06/canvas_tutorial.html


＜対応箇所＞
var NROWS = 16;  // レンガの数を 5 → 16 に変更
var NCOLS = 16;  // レンガの数を 5 → 16 に変更

function initbricks() {
　　　:
　　// 色が設定されている場合のみレンガを配置
　　if ( dataSet[i*16+j] != "無" ) {
　　　　bricks[i][j] = 1;
　　}
　　　:
}

function drawbricks() {
　　var color;
　　for (var i = 0; i < NROWS; i++) {
　　　　//ctx.fillStyle = rowcolors[i];
　　　　for (var j = 0; j < NCOLS; j++) {
　　　　　　color = getRgbColor(dataSet[i*16+j]); // ドット絵の配列に従い色を設定
　　　　　　ctx.fillStyle = color;
　　　　　　　　　:
　　　　}
　　}
}
