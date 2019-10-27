[WebGL] three.js でローマ曲面を描いてみるテスト（BufferGeometry編）

＜対応した点＞
・THREE.BufferGeometry / THREE.Mesh / THREE.MeshPhongMaterial を用いてローマ曲面を描くよう対応
　x = sin(u) * cos(u) * sin(v) * sin(v)
　y = sin(u) * sin(v) * cos(v)
　z = cos(u) * sin(v) * cos(v)

＜参考＞
■ [WebGL] lightgl.js でローマ曲面を描いてみるテスト
http://jsdo.it/cx20/v0rS
■ [WebGL] Processing.js でローマ曲面を描いてみるテスト
http://jsdo.it/cx20/AXqw

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
