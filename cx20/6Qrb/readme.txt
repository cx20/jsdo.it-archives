[WebGL] Processing.js でトーラスを描いてみるテスト

lightgl.js で作ったサンプルを Processing.js 用に移植してみました。

＜対応した点＞
・Processing.js を使用してトーラス（Torus）を描くよう対応
　x = (R + r cos(v)) cos(u)
　y = (R + r cos(v)) sin(u)
　z = r sin(v)

　u is an element of the set of numbers [0, 2 pi]
　v is an element of the set of numbers [0, 2 pi]

＜参考＞
■ [WebGL] lightgl.js でトーラスを描いてみるテスト
http://jsdo.it/cx20/sssl

■ Torus
http://www.3d-meier.de/tut3/Seite58.html

■ Parametrische Flächen und Körper
http://www.3d-meier.de/tut3/Seite0.html

■ パラメトリック曲面を描くのに適した WebGL ライブラリについて
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
