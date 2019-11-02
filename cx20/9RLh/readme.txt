[WebGL] glCubic.js を試してみるテスト（その２）

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜変更履歴＞
・2017/11/25 ライブラリを v0.0.1 → v0.1.8 に変更。関数名がスネークケース→キャメルケースの変更されたことによる対応。
・2015/05/30 新規作成。v0.0.1

＜参考＞
■ doxas/glcubic.js
https://github.com/doxas/glcubic.js

■ [簡易版] WebGL で四角形に色を付けてみるテスト
http://jsdo.it/cx20/veHj
