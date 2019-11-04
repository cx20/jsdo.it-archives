Three.js + Oimo.js + glTF 2.0 を試してみるテスト

＜対応した点＞
・物理演算ライブラリを Cannon.js → Oimo.js に変更
・クリック時にジャンプさせるよう対応
　applyImpulse() の使い方が分からなかった為、linearVelocity() にて対応。正しいやり方かどうかは不明です。。

＜参考＞
■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
https://qiita.com/cx20/items/3ebed669fb9c9e797935
