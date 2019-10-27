[WebGL] three.js で Wave Ball を描いてみるテスト（BufferGeometry編）

＜対応した点＞
・THREE.BufferGeometry / THREE.Mesh / THREE.MeshPhongMaterial を用いて Wave Ball を描くよう対応
　x = u cos(cos(u)) cos(v)
　y = u cos(cos(u)) sin(v)
　z = u sin(cos(u))

　u is an element of the set of numbers [0, 14.5]
　v is an element of the set of numbers [0, 2 pi]

＜参考＞
■ Wellenkugel
http://www.3d-meier.de/tut3/Seite63.html

■ [WebGL] lightgl.js で Wave Ball を描いてみるテスト
http://jsdo.it/cx20/1YU6
■ [WebGL] Processing.js で Wave Ball を描いてみるテスト
http://jsdo.it/cx20/SVEe

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
