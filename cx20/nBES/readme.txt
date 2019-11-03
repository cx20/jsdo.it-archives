[WebGL] stackgl を試してみるテスト（その４）

＜対応した点＞
・テクスチャ画像を立方体に貼り付けるよう対応

＜対応していない点＞
・本サンプルは、browserify により生成された bundle.js をベースに手修正を行っています。
　例）
　browserify index.js > bundle.js
・stackgl を理解せずに修正を行っている為、修正の仕方に問題がある（本来、生成されないコードとなっている）可能性があります。

＜参考＞
■ stack.gl
http://stack.gl/
■ stackgl/gl-texture2d
https://github.com/stackgl/gl-texture2d
■ [簡易版] WebGL で立方体に色を付けてみるテスト
http://jsdo.it/cx20/FPzz
■ Learning WebGL — lesson 5
http://learningwebgl.com/lessons/lesson05/index.html
■ [簡易版] WebGL でテクスチャ付き立方体を回転させてみるテスト（glMatrix.js v2.2.2編）
http://jsdo.it/cx20/jqD6

■ WebGL 軽量ライブラリを比較してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
