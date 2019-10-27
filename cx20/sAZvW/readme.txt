[WebGL] three.js でリンゴ曲面を描いてみるテスト（BufferGeometry編）

＜対応した点＞
・THREE.BufferGeometry / THREE.Mesh / THREE.MeshPhongMaterial を用いてリンゴ曲面（Apple Surface）を描くよう対応
　x = cos (u) (4 + 3.8 cos (v))
　y = sin (u) (4 + 3.8 cos (v))
　z = (cos (v) + sin (v) -1) (1 + sin (v)) log (1-pi v / 10) +7.5 sin (v)

　u is an element of the set of numbers [0, 2 pi]
　v is an element of the set of numbers [-pi, pi]

＜参考＞
■ Parametrische Flächen und Körper
http://www.3d-meier.de/tut3/Seite54.html

■ [WebGL] lightgl.js でリンゴ曲面を描いてみるテスト
http://jsdo.it/cx20/pejt
■ [WebGL] Processing.js でリンゴ曲面を描いてみるテスト
http://jsdo.it/cx20/oyuL7

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
