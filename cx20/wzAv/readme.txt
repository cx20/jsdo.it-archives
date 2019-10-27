[WebGL] three.js でハート曲面を描いてみるテスト（BufferGeometry編）

＜対応した点＞
・THREE.BufferGeometry / THREE.Mesh / THREE.MeshPhongMaterial を用いてハート曲面を描くよう対応
　x = cos(u) * 4(sqrt(1 - v * v))*(pow(sin(abs(u)),abs(u)))
　y = sin(u) * 4(sqrt(1 - v * v))*(pow(sin(abs(u)),abs(u)))
　z = v * 1.3

＜参考＞
■ 3DPlot - 3D math surfaces in AutoCAD
http://www.cadstudio.cz/en/apps/3dplot/

■ Heart Surface
http://jsdo.it/wellflat/qRfA

■ [WebGL] lightgl.js でハート曲面を描いてみるテスト
http://jsdo.it/cx20/woba
■ [WebGL] Processing.js でハート曲面を描いてみるテスト
http://jsdo.it/cx20/mVP0


■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
