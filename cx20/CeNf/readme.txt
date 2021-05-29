Three.js + Cannon.js でドミノっぽくドット絵を作るテスト（その２）（失敗）

＜対応した点＞
・各ライブラリを最新化
　Three.js r56 → r82
　Cannon.js 0.4.3 → 0.6.2

＜対応できていない点＞
・うまく倒れてくれない。。。
　CANNON.Vec3.prototype.tangents() の実装が 0.4.3 → 0.5.0 に変更された際に挙動が変わっている模様。

＜参考＞
■ cannon.js
https://github.com/schteppe/cannon.js

■ Is new cannon.js weak in domino?
https://github.com/schteppe/cannon.js/issues/310

■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
http://qiita.com/cx20/items/3ebed669fb9c9e797935
