[WebGL] WebGL Helper を試してみるテスト（その２）

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜参考＞
■ edom18/WebGLHelper
https://github.com/edom18/WebGLHelper

■ WebGL Helperを自作してみる
http://jsdo.it/edo_m18/t2o8

■ HTML5 - WebGLの勉強を始めました。 - Qiita
http://qiita.com/edo_m18/items/0ae86d3d680c30eb57c1

■ [簡易版] WebGL で四角形に色を付けてみるテスト
http://jsdo.it/cx20/veHj