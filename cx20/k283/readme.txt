[WebGL] lightgl.js でクリフォードアトラクターを描いてみるテスト

＜対応した点＞
・kos さんの clifford attractor サンプルを light.js 版に移植

＜対応できていない点＞
・このサンプルはパフォーマンスを考慮していません。毎回 VBO を生成しているので重いです。

＜参考＞
■ clifford attractor WebGL版
http://jsdo.it/kos/Coyf

■ Canvas で Clifford Attractor
http://platycerium.sakura.ne.jp/node/755

■ Clifford Attractors
http://paulbourke.net/fractals/clifford/

■ パラメトリック曲面を描くのに適した WebGL ライブラリについて
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
