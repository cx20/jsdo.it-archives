[WebGL] lightgl.js で Wave Ball を描いてみるテスト

元のタイトルは、ドイツ語で「Wellenkugel」、英語だと「Wave Ball」となるようです。

＜対応した点＞
・lightgl.js の OpenGL immediate mode を使用して Wave Ball を描くよう対応
　x = u cos(cos(u)) cos(v)
　y = u cos(cos(u)) sin(v)
　z = u sin(cos(u))

　u is an element of the set of numbers [0, 14.5]
　v is an element of the set of numbers [0, 2 pi]

＜参考＞
■ Wellenkugel
http://www.3d-meier.de/tut3/Seite63.html

■ Parametrische Flächen und Körper
http://www.3d-meier.de/tut3/Seite0.html
