[WebGL] lightgl.js を試してみるテスト（その３）

＜対応した点＞
・立方体は GL.Mesh.cube() にて作成。
・ライブラリ組み込みの行列演算関数を用いて立方体を回転させるよう対応。

＜特記事項＞
・lightgl.js における GLSL は OpenGL の GLSL 風に記載するようになっているようです。
　いくつか、ライブラリ固有の組み込み変数があるので注意してください。
　＜組み込み変数＞
　gl_Vertex   … vertices をマップ
　gl_TexCoord … coords をマップ
　gl_Normal   … normals をマップ
　gl_Color    … colors をマップ
　
　＜colors 頂点バッファを使用する例＞
　var mesh = GL.Mesh.cube({colors: true});
　mesh.colors = [ [1.0, 0.0, 0.0, 1.0], ... ]; // 2次元配列で記載することに注意

＜参考＞
■ evanw/lightgl.js
https://github.com/evanw/lightgl.js/

■ lightgl cube
http://jsdo.it/yonatan/vMXZ

■ NeHe Productions: 3D Shapes (OpenGL Tutorial)
http://nehe.gamedev.net/tutorial/3d_shapes/10035/

■ [簡易版] WebGL で立方体に色を付けてみるテスト
http://jsdo.it/cx20/FPzz

■ [WebGL] 行列演算ライブラリを使用してみるテスト（glMatrix.js v2.2.2編）
http://jsdo.it/cx20/fCkX
