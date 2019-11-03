[WebGl] TinyGL.js を試してみるテスト（その２）

TinyGL.js は OpenGL 1.1 互換 API の JavaScript ライブラリとのことです。
TinyGL.jsは、C言語版の OpenGL 実装である TinyGL を Emscripten で JavaScript にコンパイルしたものをベースにしているようです。
ソフトウェアレンダリングを行っている為、WebGL が使えない環境でも動作するようです。

＜対応した点＞
・TinyGL.js で色付きの四角形を描画するよう対応。
・TinyGL.js は OpenGL のサブセットである為、WebGL では対応していないハズの gl.QUADS や gl.QUADS_STRIP を用いることが出来るようです。

＜参考＞
■ TinyGL.js
https://github.com/humu2009/tinygl.js
■ TinyGL.js Examples
https://github.com/humu2009/tinygl.js/wiki/Examples
■ TinyGL : a Small, Free and Fast Subset of OpenGL*
http://www.bellard.org/TinyGL/

＜関連＞
■ [WebGL] lightgl.js を試してみるテスト（その２）
http://jsdo.it/cx20/ejpI
■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807
