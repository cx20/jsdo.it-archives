[簡易版] WebGL 2.0 で三角形に色を付けてみるテスト

＜対応した点＞
・WebGL 2.0 で三角形に色を付けるよう対応。

＜WebGL 1.0 と大きく違う点＞
・コンテキストの初期化は c.getContext("webgl")  → c.getContext("webgl2") に変更
・GLSL ES 3.0 はコード先頭に「#version 300 es」が必要
・GLSL ES 3.0 は attribute / varying 変数は無く代わりに in / out を使用する。

＜テストした環境＞
・Chrome 45.0.2445.0 canary
　→ 起動オプションに「--enable-unsafe-es3-apis」を追加
・Firefox Developer Edition 40.0a2 (2015-06-22)
　→ about:configにて「webgl.enable-prototype-webgl2」ならびに「webgl.disable-angle」を「true」に設定

＜参考＞
■ WebGL Report 実行結果（WebGL2編） - Qiita
http://qiita.com/cx20/items/455f029cd0e037fecad9

■ Khronos WebGL Test 実行結果（WebGL2編） - Qiita
http://qiita.com/cx20/items/3888b8b8eb229af5f0e3

■ なにが変わるの WebGL 2.0
http://wgld.org/o/tools/slide/doc/005/
