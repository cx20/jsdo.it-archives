[WebGL] Processing.js でスライム曲面を描いてみるテスト

元のタイトルは、洋ナシ曲面でしたが、スライムっぽかったのでタイトルを変更しています。。

＜対応した点＞
・Processing.js を使用して座標をプロットするよう対応
　x = b (cos(v) (r + sin(v))) cos(u)
　y = a (r + sin(v))
　z = b (cos(v) (r + sin(v))) sin(u)

　The constants a, b, r and determine the appearance of the figure.

　u is an element of the set of numbers [0, 2 pi]
　v is an element of the set of numbers [-pi/2, pi/2]

＜参考＞
■ [WebGL] lightgl.js でスライム曲面を描いてみるテスト
http://jsdo.it/cx20/vo3eN
■ Piriform Surface
http://www.3d-meier.de/tut3/Seite181.html
■ Parametrische Flächen und Körper
http://www.3d-meier.de/tut3/Seite0.html
■ Piriform Surface -- from Wolfram MathWorld
http://mathworld.wolfram.com/PiriformSurface.html
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
