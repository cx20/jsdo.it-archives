[WebGL] three.js で貝殻曲面に法線ベクトルを追加してみるテスト

＜対応した点＞
　x = (a*(1-v/(2*pi))*(1+cos(u)) + c) * cos(n*v)
　y = (a*(1-v/(2*pi))*(1+cos(u)) + c) * sin(n*v)
　z = b*v/(2*pi) + a*(1-v/(2*pi)) * sin(u)

　a,b: these determine how pointy or flat the shell is (informally...)
　c: determines how much the shell overlaps with itself
　n: the number of spirals in the shell

・法線ペクトルを計算で算出するよう対応。
　geometry.computeVertexNormals();
・OrbitControls で回転できるよう対応。
・Three.js を最新化

＜参考＞
■ A pretty seashell - File Exchange - MATLAB Central
http://www.mathworks.com/matlabcentral/fileexchange/11742-a-pretty-seashell/content/seashell.m
