[WebGL] GLBoost + Particle を試してみるテスト（ES6編）

GLBoost が Particle に対応したようなので試してました。

＜対応した点＞
・GLBoost の Particle サンプルをベースにテクスチャを変更。

＜対応できていない点＞
・本サンプルは ES6 の機能を使用したバージョンとなっています。一部のブラウザでは動作しないのでご注意ください。

＜動作確認＞
[OK] Windows 10 + Edge 20.10240.163840.0
[NG] Windows 10 + IE 11.0.10240.16603
[OK] Windows 10 + Chrome 47.0.2526.160 m
[OK] Windows 10 + Firefox Developer Edition 45.0a2 (2015-12-22)
[NG] Windows 10 + Firefox 43.0.2
[NG] iOS 9.2 + Safari 601.1

＜参考＞
■ GLBoost/examples/standalone/particles/
https://github.com/emadurandal/GLBoost/tree/master/examples/standalone/particles

■ Three.js + ParticleSystem でドット絵を描いてみるテスト（改）
http://jsdo.it/cx20/mEiNS
