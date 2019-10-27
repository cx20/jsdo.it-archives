[WebGL] lightgl.js でトーラスを描いてみるテスト

＜対応した点＞
・lightgl.js の OpenGL immediate mode を使用してトーラス（Torus）を描くよう対応
　x = (R + r cos(v)) cos(u)
　y = (R + r cos(v)) sin(u)
　z = r sin(v)

　u is an element of the set of numbers [0, 2 pi]
　v is an element of the set of numbers [0, 2 pi]
 
＜参考＞
■ Torus
http://www.3d-meier.de/tut3/Seite58.html

■ Parametrische Flächen und Körper
http://www.3d-meier.de/tut3/Seite0.html
