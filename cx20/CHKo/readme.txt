[WebGL] three.js でトーラスを描いてみるテスト（BufferGeometry編）

＜対応した点＞
・THREE.BufferGeometry / THREE.Mesh / THREE.MeshPhongMaterial を用いてトーラス（Torus）を描くよう対応
　x = (R + r cos(v)) cos(u)
　y = (R + r cos(v)) sin(u)
　z = r sin(v)

　u is an element of the set of numbers [0, 2 pi]
　v is an element of the set of numbers [0, 2 pi]

＜参考＞
■ Torus
http://www.3d-meier.de/tut3/Seite58.html

■ [WebGL] lightgl.js でトーラスを描いてみるテスト
http://jsdo.it/cx20/sssl
■ [WebGL] Processing.js でトーラスを描いてみるテスト
http://jsdo.it/cx20/6Qrb

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
