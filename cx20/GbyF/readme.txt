[WebGL] three.js でハーモノグラフを描いてみるテスト（BufferGeometry編）

＜対応した点＞
・THREE.BufferGeometry / THREE.Line / THREE.LineBasicMaterial を用いてハーモノグラフを描くよう対応
・動的に座標を再計算するよう対応
　x = A1 * sin(f1 * t + p1) * exp(-d1 * t) + A2 * sin(f2 * t + p2) * exp(-d2 * t)
　y = A3 * sin(f3 * t + p3) * exp(-d3 * t) + A4 * sin(f4 * t + p4) * exp(-d4 * t)

＜参考＞
■ mrdoob/three.js
https://github.com/mrdoob/three.js/

■ [WebGL] lightgl.js でハーモノグラフを描いてみるテスト
http://jsdo.it/cx20/ry8D
■ [WebGL] lightgl.js でハーモノグラフを描いてみるテスト（VBO 編）
http://jsdo.it/cx20/wZFX
■ [WebGL] Processing.js でハーモノグラフを描いてみるテスト
http://jsdo.it/cx20/spb3
■ Three.js でハーモノグラフを書いてみるテスト（その３）（改）
http://jsdo.it/cx20/9vS7
■ [簡易版] WebGL でハーモノグラフみたいな何かを描いてみるテスト
http://jsdo.it/cx20/synR
■ GLSL でハーモノグラフを描いてみるテスト
http://jsdo.it/cx20/3NOQ

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
