[WebGL] GLOW.js を試してみるテスト（その２）

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜対応できていない点＞
・四角形の描画をインデックスバッファを用いずに行いたかったが、なぜか表示されなかった為、暫定的にインデックスバッファを使用するようにしています。

＜参考＞
■ empaempa/GLOW
https://github.com/empaempa/GLOW/

■ I-AM-GLOW
http://i-am-glow.com/

■ [簡易版] WebGL で四角形に色を付けてみるテスト
http://jsdo.it/cx20/veHj