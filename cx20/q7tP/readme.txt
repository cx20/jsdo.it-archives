[WebGL] glTips.js を試してみるテスト（その２）

glTips.js は WebGL の便利コードをまとめた、CC0 ライセンスな WebGL ルーチンコードスニペット集です。
WebGL のルーチン的な API 呼び出しの手順について簡素化することができます。

＜対応した点＞
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;

＜参考＞
■ glTips.js
https://github.com/emadurandal/glTips

■ WebGL 軽量ライブラリ比較
http://qiita.com/cx20/items/0fa19c96aa6470d98807
