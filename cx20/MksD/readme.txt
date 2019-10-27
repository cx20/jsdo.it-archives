pixi.js v4 を試してみるテスト

pixi.js は Goodboy Digital 社による 2D 描画用ライブラリです。
v4 が出たようなので試してみました。なお、本サンプルは v3→v4 への移植のみで v4 の新機能は使用していません。

＜対応した点＞
・pixi.js v3→v4 に変更。
　＜主な変更点＞
　PIXI.AbstractFilter → PIXI.Filter
　smokeFilter.uniforms.time.value → smokeFilter.uniforms.time … value は不要になった模様

＜参考＞
■ pixijs/pixi.js
https://github.com/pixijs/pixi.js

■ Custom Filter [v3] - PixiJS Examples
http://pixijs.github.io/examples/#/basics/custom-filter-v3.js

■ Custom Filter - PixiJS Examples
http://pixijs.github.io/examples/#/basics/custom-filter.js
