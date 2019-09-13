[簡易版] WebGL でドット絵をアニメーションさせてみるテスト（gl.POINTS 編）
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

ICS LAB さんのコードを参考にしてアニメーションさせてみました。

＜対応した点＞
・ドット絵とリサージュ図形の２つの状態を交互に表示するよう対応
　＜GLSL＞
　vec3 position = position1 + (position2 - position1) * timeScale;

＜参考＞
■ WebGLを極めるならJSライブラリを使わず書こう！モバイルでも動くHTML5の3次元スライドショーを作ってみた – ICS LAB
http://ics-web.jp/lab/archives/2663
