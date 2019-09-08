[簡易版] WebGL で小惑星に光を当ててみるテスト
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・小惑星をポリゴンで構成するよう対応（gl.POINTS→gl.TRIANGLES）
・法線を頂点座標から算出するよう対応（GLSL レイマーチングの distance 関数を参考）
・光を当てるよう対応

＜対応できていない点＞
・内容を理解せず適当にコードを組み合わせているので、誤っているかも知れません。

＜参考＞
■ WebGL 平行光源によるライティング - wgld.org
http://wgld.org/d/webgl/w021.html

■ GLSL 法線の算出と簡単なライティング - wgld.org 
http://wgld.org/d/glsl/g010.html

■ mqo.three.js でメタセコイアのデータを表示してみるテスト（その２）
http://jsdo.it/cx20/q3bb

■ Hayabusa Project Science Data Archive JAXA
http://darts.isas.jaxa.jp/planet/project/hayabusa/shape_ja.pl
