[WebGL] Grimoire.js で PBR を試してみるテスト（改3）（調整中）

＜対応した点＞
・ライブラリを最新化。grimoire-forward-shading.js v1.8.2 -> v1.9.1
　＜ライブラリ仕様変更箇所＞
　roughness の最小値を "0.04" とする。
　intensity の単位を変更 π -> "1.0" とする。

・縦軸：[Metal]  ↑ ↓[Non-metal]
・横軸：[Smooth] ← →[Rough]

 
＜参考＞
■ glTF-WebGL-PBR/shaders/pbr-frag.glsl
https://github.com/KhronosGroup/glTF-WebGL-PBR/blob/a94655275e5e4e8ae580b1d95ce678b74ab87426/shaders/pbr-frag.glsl#L89
■ three.js使いこなし - three.jsの物理ベースレンダリング | CodeGrid
https://app.codegrid.net/entry/threejs-1

＜他ライブラリ比較＞
■ [WebGL] three.jsで PBR を試してみるテスト（調整中）
http://jsdo.it/cx20/qCps
■ [WebGL] Babylon.js で PBR を試してみるテスト（調整中）
http://jsdo.it/cx20/ebAu
■ [WebGL] Grimoire.js で PBR を試してみるテスト（改3）（調整中）
http://jsdo.it/cx20/ATDR
■ [WebGL] GLBoost で PBR を試してみるテスト（調整中）
http://jsdo.it/cx20/YYjT
