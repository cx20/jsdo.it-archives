[WebGL] three.js で貝殻曲面を描いてみるテスト（BufferGeometry編）

＜対応した点＞
・THREE.BufferGeometry / THREE.Mesh / THREE.MeshPhongMaterial を用いて貝殻曲面（seashell）を描くよう対応
　x = (a*(1-v/(2*pi))*(1+cos(u)) + c) * cos(n*v)
　y = (a*(1-v/(2*pi))*(1+cos(u)) + c) * sin(n*v)
　z = b*v/(2*pi) + a*(1-v/(2*pi)) * sin(u)

　a,b: these determine how pointy or flat the shell is (informally...)
　c: determines how much the shell overlaps with itself
　n: the number of spirals in the shell

＜参考＞
■ A pretty seashell - File Exchange - MATLAB Central
http://www.mathworks.com/matlabcentral/fileexchange/11742-a-pretty-seashell/content/seashell.m

■ [WebGL] lightgl.js で貝殻曲面を描いてみるテスト
http://jsdo.it/cx20/lyR5
■ [WebGL] Processing.js で貝殻曲面を描いてみるテスト
http://jsdo.it/cx20/QyLv

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて - Qiita
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
