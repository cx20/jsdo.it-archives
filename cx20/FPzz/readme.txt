[簡易版] WebGL で立方体に色を付けてみるテスト
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・初期加処理にて深度テストを有効化するよう修正。
　これをしないと、描画した順番で色が表示されてしまい後ろに表示されるべき面が表に表示されたりする。
　gl.enable(gl.DEPTH_TEST);
・立方体に色を付けるよう対応。

＜対応できていない点＞
・最小の頂点数で立方体を作りたかったが、ベタ塗りのやり方が分からなかった為、取りやめた。

＜変更履歴＞
・2015/01/21 メモリリーク対応。gl.createBuffer() をループの外に変更。
・2015/01/20 新規作成

＜参考＞
■ [簡易版] WebGL でピラミッドに色を付けてみるテスト
http://jsdo.it/cx20/rjZl

■ WebGL Lesson 4 - リアル３Dオブジェクト
https://sites.google.com/site/hackthewebgl/learning-webglhon-yaku/the-lessons/lesson-4

■ forked: はじめてのCube
http://jsdo.it/cx20/hzlr
