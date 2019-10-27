pixi.js v2 を試してみるテスト（その４）

pixi.js の描画関数は、
WebGL 対応環境であれば WebGL で、Canvas のみであれば Canvas で描画されるようです。
（WebGL で描画されているか否かは、Chrome 拡張の「WebGL Inspector」で確認することが可能です。）

＜対応した点＞
・キラキラ背景をやめて、ドット絵のみを表示するよう変更

＜参考＞
■ WebGL Inspector
https://chrome.google.com/webstore/detail/webgl-inspector/ogkcjmbhnfmlnielkjhedpcjomeaghda
