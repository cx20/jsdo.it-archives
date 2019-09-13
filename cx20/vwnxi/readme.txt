[簡易版] WebGL で四角形を描いてみるテスト
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・gl.TRIANGLES → gl.TRIANGLE_STRIP を使うよう変更
　//gl.drawArrays(gl.TRIANGLES, 0, 3);
　gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

　triangle strip（帯状連結三角形）は、連続した三角形を作成する場合に少ない頂点数で作成することが出来ます。

　＜頂点データ＞
　 -0.5, 0.5, 0.0, // v0
　 0.5, 0.5, 0.0, // v1 
　 -0.5,-0.5, 0.0, // v2
　 0.5,-0.5, 0.0 // v3
　
＜作成される三角形＞
　 v0,v1,v2
　 v1,v2,v3

＜参考＞
■ WebGL Lesson 1 - 三角形と四角形
https://sites.google.com/site/hackthewebgl/learning-webglhon-yaku/the-lessons/lesson-1

■ WebGLで四角形を描いてみるテスト
http://jsdo.it/cx20/bsbJ
