[WebGL] WebGL Utils を試してみるテスト（その２）

WebGL Utils は gl-matrix.js でもお馴染みの Tojiro さんによる、軽量かつ標準的な WebGL Utilities です。

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜参考＞
■ WebGL Utils
https://github.com/toji/webgl-utils

■ WebGL 軽量ライブラリ比較
http://qiita.com/cx20/items/0fa19c96aa6470d98807