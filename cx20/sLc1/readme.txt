[WebGL] stackgl を試してみるテスト（その３）

＜対応した点＞
・立方体を stackgl の行列演算関数を用いて回転させるよう対応。

＜対応していない点＞
・本サンプルは、browserify により生成された bundle.js をベースに手修正を行っています。
　例）
　browserify index.js > bundle.js
・stackgl を理解せずに修正を行っている為、修正の仕方に問題がある（本来、生成されないコードとなっている）可能性があります。

＜参考＞
■ stack.gl
http://stack.gl/

■ [簡易版] WebGL で立方体に色を付けてみるテスト
http://jsdo.it/cx20/FPzz

