[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その２）
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・頂点シェーダの mat4 変数を uniform 変数に変更し JavaScript 側にて、行列を指定するよう対応。
　＜JavaScript＞
　　var mvpMatrix = [
　　　　1.0, 0.0, 0.0, 0.5,
　　　　0.0, 1.0, 0.0, 0.0,
　　　　0.0, 0.0, 1.0, 0.0,
　　　　0.0, 0.0, 0.0, 1.0
　　];
　　uLoc = gl.getUniformLocation(p, 'mvpMatrix');
　　gl.uniformMatrix4fv(uLoc, false, new Float32Array(mvpMatrix));

　＜GLSL / 頂点シェーダ＞
　　uniform mat4 mvpMatrix;
　　void main() {
　　　　gl_Position = mvpMatrix * vec4(pos, 1.0);
　　}

＜参考＞
■ WebGLリファレンス
http://ec.nikkeibp.co.jp/nsp/dl/08513/HTML5GAMES_AppB.pdf

■ チュートリアル3：行列 | opengl-tutorial.org
http://www.opengl-tutorial.org/ja/opengl%E3%81%AE%E5%9F%BA%E7%A4%8E/%E3%83%81%E3%83%A5%E3%83%BC%E3%83%88%E3%83%AA%E3%82%A2%E3%83%AB3%EF%BC%9A%E8%A1%8C%E5%88%97/
