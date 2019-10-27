[WebGL] three.js でスライム曲面を描いてみるテスト（BufferGeometry編）

＜対応した点＞
・THREE.BufferGeometry / THREE.Mesh / THREE.MeshPhongMaterial を用いてスライムを描くよう対応
　x = b (cos(v) (r + sin(v))) cos(u)
　y = a (r + sin(v))
　z = b (cos(v) (r + sin(v))) sin(u)

　The constants a, b, r and determine the appearance of the figure.

　u is an element of the set of numbers [0, 2 pi]
　v is an element of the set of numbers [-pi/2, pi/2]

＜参考＞
■ Piriform Surface
http://www.3d-meier.de/tut3/Seite181.html

■ [WebGL] lightgl.js でスライム曲面を描いてみるテスト
http://jsdo.it/cx20/vo3eN
■ [WebGL] Processing.js でスライム曲面を描いてみるテスト
http://jsdo.it/cx20/ktw0

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
