[WebGL] lightgl.js でリンゴ曲面を描いてみるテスト

＜対応した点＞
・lightgl.js の OpenGL immediate mode を使用してリンゴ曲面（Apple Surface）を描くよう対応
　x = cos (u) (4 + 3.8 cos (v))
　y = sin (u) (4 + 3.8 cos (v))
　z = (cos (v) + sin (v) -1) (1 + sin (v)) log (1-pi v / 10) +7.5 sin (v)

　u is an element of the set of numbers [0, 2 pi]
　v is an element of the set of numbers [-pi, pi]

＜参考＞
■ Parametrische Flächen und Körper
http://www.3d-meier.de/tut3/Seite54.html

■ Parametrische Flächen und Körper
http://www.3d-meier.de/tut3/Seite0.html
