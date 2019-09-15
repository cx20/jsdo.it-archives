[WebGL] GLBoost + Particle を試してみるテスト（ES6編）（その３）

＜対応した点＞
・Particle をマウスに追従するよう対応。

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
■ GLSL : 時間経過とマウスカーソル座標 - wgld.org
http://wgld.org/d/glsl/g002.html

■ [GLSL] Three.js + ParticleSystem で球体にドットを配置してみるテスト。
http://jsdo.it/cx20/596T
