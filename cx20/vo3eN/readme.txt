[WebGL] lightgl.js でスライム曲面を描いてみるテスト

元のタイトルは、洋ナシ曲面でしたが、スライムっぽかったのでタイトルを変更しています。。

＜対応した点＞
・lightgl.js の OpenGL immediate mode を使用して座標をプロットするよう対応
　x = b (cos(v) (r + sin(v))) cos(u)
　y = a (r + sin(v))
　z = b (cos(v) (r + sin(v))) sin(u)
 
　The constants a, b, r and determine the appearance of the figure.

　u is an element of the set of numbers [0, 2 pi]
　v is an element of the set of numbers [-pi/2, pi/2]

＜参考＞
■ Piriform Surface
http://www.3d-meier.de/tut3/Seite181.html

■ Parametrische Flächen und Körper
http://www.3d-meier.de/tut3/Seite0.html

■ Piriform Surface -- from Wolfram MathWorld
http://mathworld.wolfram.com/PiriformSurface.html
