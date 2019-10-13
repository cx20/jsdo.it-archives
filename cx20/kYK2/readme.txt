[GLSL] テクスチャを合成してみるテスト（その３）

＜対応した点＞
・火星のテクスチャと Height Map を用いて、海と緑地を生成するよう対応。
　Height Map の情報を用いて時間と標高に応じて色を変えるよう対応。
・さらに大戦略っぽくエフェクトするよう対応

＜対応できていない点＞
・座標が上下逆になってしまっているっぽい。。。
　→ 暫定的に、gl.UNPACK_FLIP_Y_WEBGL で上下反転。

＜参考＞
■ GLSL で画像にフィルタをかけてみるテスト（改9）
http://jsdo.it/cx20/gXCn

■ pyalot's "Hexagon Sampling"
https://www.shadertoy.com/view/ls23Dc
