[WebGL] GLBoost + vox.js を試してみるテスト（その３）

GLBoost の最新版でカスタムシェーダに対応したようなので試してみました。

＜対応した点＞
・カスタムシェーダ―を用いるよう対応。
・"use strict" を用いるよう対応。
・Strict モードでは callee は使えない為、requestAnimationFrame の引数を変更
　requestAnimationFrame(arguments.callee)→requestAnimationFrame(render);

＜対応できていない点＞
・ES6 の機能を使用している為、一部のブラウザでは動作しません。

＜動作確認＞
[OK] Windows 10 + Edge 20.10240.163840.0
[NG] Windows 10 + IE 11.0.10240.16603
[OK] Windows 10 + Chrome 47.0.2526.160 m
[OK] Windows 10 + Firefox Developer Edition 45.0a2 (2015-12-22)
[NG] Windows 10 + Firefox 43.0.2
[OK] iOS 9.2 + Safari 601.1

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost
https://github.com/emadurandal/GLBoost/tree/master/examples/standalone/custom_shader
https://github.com/emadurandal/GLBoost/tree/master/examples/standalone/custom_shader_2

■ [WebGL] GLBoost + vox.js を試してみるテスト（その２改3）
http://jsdo.it/cx20/oFH2
