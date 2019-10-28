[WebGL] Processing.js でリサージュ図形を描いてみるテスト

lightgl.js で作ったサンプルを Processing.js 用に移植してみました。

＜対応した点＞
・Processing.js で WebGL を用いてリサージュ図形を描くよう対応。

＜主な変更ポイント＞
　＜light.js＞
　gl.begin(gl.LINE_STRIP);
　gl.color(x+0.5, y+0.5, z+0.5, 1.0); // 0～1 で指定
　gl.vertex(x, y, z);
　gl.end();

　＜Processing.js＞
　p.noFill(); // stroke() を用いる場合、塗りつぶしを無効化する
　p.beginShape(p.LINE_STRIP);
　p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255); // 0～255 で指定
　p.vertex(x, y, z);
　p.endShape();

＜対応できていない点＞
・p5.js にも移植を試みたが 3D 版の stroke 関数が現時点では未実装の模様。

＜参考＞
■ [WebGL] lightgl.js でリサージュ図形を描いてみるテスト
http://jsdo.it/cx20/4kX2
■ Babylon.js でリサージュ図形を描いてみるテスト
http://jsdo.it/cx20/3WmL
■ Three.js でリサージュ図形を書いてみるテスト（その２）
http://jsdo.it/cx20/ciNA
■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807
■ パラメトリック曲面を描くのに適した WebGL ライブラリについて
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
