[WebGL] TWGL.js を試してみるテスト（その２）

簡易版シリーズのサンプルを 軽量 WebGL ライブラリ「TWGL.js」を使って実装するよう対応。

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜参考＞
■ greggman/twgl.js
https://github.com/greggman/twgl.js

■ TWGL.js, a tiny WebGL helper library
http://twgljs.org/

■ [簡易版] WebGL で四角形に色を付けてみるテスト
http://jsdo.it/cx20/veHj
