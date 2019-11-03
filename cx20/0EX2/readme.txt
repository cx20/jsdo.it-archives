GLBoost.js + Cannon.js でドミノっぽくドット絵を作るテスト

＜対応した点＞
・GLBoost + Cannon.js で物理演算させるよう対応。
・Cannon.js v0.4.3 → v0.6.2 変更した際、ドミノが上手く倒れない事象があった為、
　gyabo さんの指摘を参考に部分的に 0.4.3 のコードを適用するよう対応。
　

＜参考＞
■ GLBoost
https://github.com/emadurandal/GLBoost

■ cannon.js
https://github.com/schteppe/cannon.js

■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
http://qiita.com/cx20/items/3ebed669fb9c9e797935

■ forked: Three.js + Cannon.js でドミノっぽくドット絵を作るテスト（その２）（調整中）
http://jsdo.it/gbone/C2Q6
