[簡易版] WebGL 2.0 を試してみるテスト

いくつかのブラウザで WebGL 2.0 の実装が勧められているようなので、試してみました。

＜対応した点＞
・WebGL 2.0 を使用して三角形を描くよう対応。

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

■ webGL2 Test - jsdo.it
http://jsdo.it/gaziya/9XTH
