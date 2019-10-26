[簡易版] WebGL 2.0 で立体ドット絵を描いてみるテスト（instanced arrays 編）
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・サンプルを WebGL 1.0→2.0 に移植
　　＜WebGL 1.0 + 拡張機能＞
　　ext = gl.getExtension('ANGLE_instanced_arrays');
　　ext.vertexAttribDivisorANGLE(aLoc[1], 1)
　　ext.vertexAttribDivisorANGLE(aLoc[2], 1)
　　ext.drawElementsInstancedANGLE(gl.TRIANGLES, ..);
　　　　↓
　　＜WebGL 2.0＞
　　gl.vertexAttribDivisor(aLoc[1], 1)
　　gl.vertexAttribDivisor(aLoc[2], 1)
　　gl.drawElementsInstanced(gl.TRIANGLES, ..);

＜設定方法＞
■ WebGL Report 実行結果（WebGL2編） - Qiita
http://qiita.com/cx20/items/455f029cd0e037fecad9

＜テストした環境＞
[OK] Windows 10 IP + Chrome 43.0.2357.130 m
[OK] Windows 10 IP + Chrome 45.0.2448.0 canary
[OK] Windows 10 IP + Firefox Developer Edition 41.0a2 (2015-07-03)
[OK] Windows 10 IP + Firefox 39.0

＜参考＞
■ [簡易版] WebGL でドット絵を描いてみるテスト（instanced arrays 編）
http://jsdo.it/cx20/bbGE

■ WebGL: インスタンシング(instanced arrays) - wgld.org
http://wgld.org/d/webgl/w075.html
