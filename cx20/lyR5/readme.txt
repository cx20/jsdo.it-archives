[WebGL] lightgl.js で貝殻曲面を描いてみるテスト

＜対応した点＞
・lightgl.js の OpenGL immediate mode を使用して貝殻曲面（seashell）を描くよう対応
　x = (a*(1-v/(2*pi))*(1+cos(u)) + c) * cos(n*v)
　y = (a*(1-v/(2*pi))*(1+cos(u)) + c) * sin(n*v)
　z = b*v/(2*pi) + a*(1-v/(2*pi)) * sin(u)

　a,b: these determine how pointy or flat the shell is (informally...)
　c: determines how much the shell overlaps with itself
　n: the number of spirals in the shell

＜参考＞
■ Seashell surface - Wikipedia, the free encyclopedia
https://en.wikipedia.org/wiki/Seashell_surface

■ Seashell -- from Wolfram MathWorld
http://mathworld.wolfram.com/Seashell.html

■ A pretty seashell - File Exchange - MATLAB Central
http://www.mathworks.com/matlabcentral/fileexchange/11742-a-pretty-seashell/content/seashell.m
