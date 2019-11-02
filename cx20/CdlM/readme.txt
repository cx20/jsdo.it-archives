[WebGL] glTips.js を試してみるテスト（その３）

glTips.js は WebGL の便利コードをまとめた、CC0 ライセンスな WebGL ルーチンコードスニペット集です。
WebGL のルーチン的な API 呼び出しの手順について簡素化することができます。

＜対応した点＞
・行列演算ライブラリとして glMatrix.js v2.3.1 を使用するよう対応。
・初期加処理にて深度テストを有効化するよう修正。
　gl.enable(gl.DEPTH_TEST);
・立方体に色を付けるよう対応。

＜参考＞
■ glTips.js
https://github.com/emadurandal/glTips

■ toji/gl-matrix
https://github.com/toji/gl-matrix

■ glMatrix
http://glmatrix.net/

■ WebGL 軽量ライブラリ比較
http://qiita.com/cx20/items/0fa19c96aa6470d98807
