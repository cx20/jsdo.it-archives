[簡易版] WebGL で小惑星をプロットしてみるテスト（その３）
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・透視投影行列を用いて奥行を表現するよう対応。

＜参考＞
■ gl-matrix/src/gl-matrix/mat4.js
https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js

> mat4.perspective = function (out, fovy, aspect, near, far) 
