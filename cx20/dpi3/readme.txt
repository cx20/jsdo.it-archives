[WebGL] PhiloGL を試してみるテスト（その２）

簡易版シリーズのサンプルを「PhiloGL」を使って実装するよう対応。

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜参考＞
■ senchalabs-philogl - GitHub
https://github.com/senchalabs/philogl

■ Learning WebGL lessons implemented with PhiloGL
http://www.senchalabs.org/philogl/demos.html#lessons

■ [簡易版] WebGL で四角形に色を付けてみるテスト
http://jsdo.it/cx20/veHj
