[簡易版] WebGL でドット絵を描いてみるテスト（gl.LINES 編）
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・描画時のオプション指定を gl.POINTS → gl.LINES」に変更
・描画関数を gl.drawArrays() → gl.drawElements() に変更
・1ドットごとに四角形（線分×4）を作成するよう対応
　＜データ作成概要＞
　box = [
　　x0, y0, // v0
　　x1, y0, // v1
　　x1, y1, // v2
　　x0, y1 // v3
　];
　
　indices = [
　　0, 1, // v0-v1
　　1, 2, // v1-v2
　　2, 3, // v2-v3
　　3, 0 // v3-v0
　];

＜参考＞
■ [簡易版] WebGL で立方体を描いてみるテスト
http://jsdo.it/cx20/dokR

■ WebGL でドット絵を描いてみるテスト（その２）
http://jsdo.it/cx20/iV0Y
