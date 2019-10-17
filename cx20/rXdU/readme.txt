GLSL でドット絵を描いてみるテスト

GLSL Sandbox（http://glsl.heroku.com/）にて WebGL のシェーダ言語「GLSL」の勉強中です。

＜対応した点＞
・ドット絵になるよう色を変更するよう対応。

　http://glsl.heroku.com/e#14511.0 … 色付き四角形
　　　　　↓
　http://glsl.heroku.com/e#14512.0 … 複数の四角形
　　　　　↓
　http://glsl.heroku.com/e#14513.0 … ドット絵


＜対応できてない点＞
・見よう見まねでコーディングしている為、GLSL のお作法をよく分かってません。
・例えば、
　result = cols[i]; と書こうとしたら
　'[]' Index expression must be constant. （配列のインデックスは定数である必要があります。）
　と、言われるんですが、そういうものなんでしょうか。。。
 

＜参考＞
■ GLSL Sandbox Gallery
http://glsl.heroku.com/
