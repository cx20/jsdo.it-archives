[WebGL] Perlin noise を用いて頂点データを加工してみるテスト（その２）
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・球体の頂点データにノイズを加えるよう変更
　＜変更前＞
　vec3 newPosition = position * snoise(position.xyz + time / 2.0) * 2.0;
　＜変更後＞
　vec3 newPosition = position + snoise(position.xyz + time / 2.0) * 0.1;

＜参考＞
■ WebGLでSimplex NoiseのGLSLを使ってグラフィックパターンを生成する - Qiita
http://qiita.com/yuichiroharai/items/1eaf4ce7e542b11da9ac

■ ashima/webgl-noise
https://github.com/ashima/webgl-noise

■ Vertex displacement with GLSL - Blog - Clicktorelease
http://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js
