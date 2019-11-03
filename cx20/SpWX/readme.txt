[WebGl] TinyGL.js を試してみるテスト（その３）

TinyGL.js は OpenGL 1.1 互換 API の JavaScript ライブラリとのことです。
TinyGL.jsは、C言語版の OpenGL 実装である TinyGL を Emscripten で JavaScript にコンパイルしたものをベースにしているようです。
ソフトウェアレンダリングを行っている為、WebGL が使えない環境でも動作するようです。

＜対応した点＞
・TinyGL.js で立方体に色を付けるよう対応。

＜参考＞
■ TinyGL.js
https://github.com/humu2009/tinygl.js
■ TinyGL.js Examples
https://github.com/humu2009/tinygl.js/wiki/Examples
■ TinyGL : a Small, Free and Fast Subset of OpenGL*
http://www.bellard.org/TinyGL/
■ Example 1: 3D Shapes - 3D Graphics with OpenGL
https://www.ntu.edu.sg/home/ehchua/programming/opengl/CG_Examples.html

＜関連＞
■ [WebGL] lightgl.js を試してみるテスト（その３）
http://jsdo.it/cx20/elUj
■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807
