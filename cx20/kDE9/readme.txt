[WebGL] zen-3d を試してみるテスト（その２）

zen-3d は shawn0326 さんによる軽量 WebGL ライブラリです。

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 a_Color
　varying vec4 v_Color;
　＜フラグメントシェーダ＞
　varying vec4 v_Color;

＜参考＞
■ shawn0326/zen-3d
https://github.com/shawn0326/zen-3d

■ zen-3d / examples
https://shawn0326.github.io/zen-3d/examples/

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
