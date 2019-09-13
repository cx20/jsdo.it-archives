[簡易版] WebGL で立方体を描いてみるテスト
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・座標データをピラミッドから立方体に変更
・描画関数を gl.drawArrays() → gl.drawElements() に変更

＜OpenGL と WebGL の違い＞
・OpenGL では 四角形を描画する為の GL_QUADS というパラメータがあるようですが、
　WebGL では三角形の単位でしか描画できない為、頂点数が多くなる傾向があるようです。

＜参考＞
■ glDrawElementsによる描画 - OpenGL de プログラミング
http://seesaawiki.jp/w/mikk_ni3_92/d/glDrawElements%A4%CB%A4%E8%A4%EB%C9%C1%B2%E8

■ WebGL Lesson 4 - リアル３Dオブジェクト
https://sites.google.com/site/hackthewebgl/learning-webglhon-yaku/the-lessons/lesson-4

■ forked: はじめてのCube
http://jsdo.it/cx20/jahK
