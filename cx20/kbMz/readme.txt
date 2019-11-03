[WebGL] SpiderGL を試してみるテスト（その２）

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜参考＞
■ dibenedetto/SpiderGL
https://github.com/dibenedetto/SpiderGL
■ SpiderGL - Home
http://www.spidergl.org/
■ SpiderGL - Tutorials
http://www.spidergl.org/tutorials.php

■ [簡易版] WebGL で四角形に色を付けてみるテスト
http://jsdo.it/cx20/veHj
