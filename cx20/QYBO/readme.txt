[WebGL] Dan Shari GL を試してみるテスト（その２）

Dan Shari GL（断捨離GL）は kenjiSpecial さんによる軽量 WebGL ライブラリです。

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜参考＞
■ kenjiSpecial/dan-shari-gl
https://github.com/kenjiSpecial/dan-shari-gl

■ Dan Shari GL Examples
https://kenjispecial.github.io/dan-shari-gl/

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807