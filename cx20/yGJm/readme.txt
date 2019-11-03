[WebGL] CubicVR.js を試してみるテスト（その３）

＜対応した点＞
・立方体を組み込み型（primitive / type: "box"） でなく、自前で作成するよう対応。
・立方体を CubicVR.js の行列演算関数を用いて回転させるよう対応。

＜対応していない点＞
・シェーダはライブラリに組み込みのものを使用しています。

＜参考＞
■ cjcliffe/CubicVR.js
https://github.com/cjcliffe/CubicVR.js

■ CubicVR 3D Engine
http://www.cubicvr.org/

■ CubicVR.js/samples/mesh_build/cube_arrays.html
https://github.com/cjcliffe/CubicVR.js/blob/master/samples/mesh_build/cube_arrays.html

■ [簡易版] WebGL で立方体に色を付けてみるテスト
http://jsdo.it/cx20/FPzz
