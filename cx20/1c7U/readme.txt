[WebGL] stackgl を試してみるテスト（その２）

＜対応した点＞
・色設定用の頂点バッファを追加。

＜対応していない点＞
・本サンプルは、browserify により生成された bundle.js をベースに手修正を行っています。
　例）
　browserify index.js > bundle.js
・stackgl を理解せずに修正を行っている為、修正の仕方に問題がある（本来、生成されないコードとなっている）可能性があります。

＜参考＞
■ stack.gl
http://stack.gl/

■ stackgl/learning-webgl-02
https://github.com/stackgl/learning-webgl-02

■ [簡易版] WebGL で四角形に色を付けてみるテスト
http://jsdo.it/cx20/veHj
